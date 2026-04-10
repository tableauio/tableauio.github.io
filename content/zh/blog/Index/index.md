---
title: "Index（索引）使用指南"
description: "介绍 Tableau 的 Index 功能，实现对配置表的高效索引查询。"
lead: "介绍 Tableau 的 Index 功能，实现对配置表的高效索引查询。"
date: 2026-03-30T15:00:00+08:00
lastmod: 2026-03-30T15:00:00+08:00
draft: false
contributors: ["Wenchy"]
---

## 背景

在游戏或业务配置中，我们经常需要根据**非主键字段**快速查找数据。例如：

- 查找所有 `Type == 1` 的商店
- 查找某个道具下所有 `Param == 2` 的属性

如果每次都遍历整张表，性能开销较大。Tableau 提供了 **Index** metasheet 选项，让 loader 插件在加载时自动构建索引，实现 O(1) 的快速查询。

---

## 配置语法

在 `@TABLEAU` metasheet 中，通过 `Index` 选项指定列索引。

**完整格式：**

- `Column<SortedCol>@IndexName`
- `(Column1,Column2)<SortedCol1,SortedCol2>@IndexName`

| 组成部分                           | 说明                                | 是否必填 |
| ---------------------------------- | ----------------------------------- | -------- |
| `Column` 或<br>`(Column1,Column2)` | 索引键列（单列或多列）              | ✅        |
| `<SortedCol>`                      | 对结果 slice 按指定列排序           |          |
| `@IndexName`                       | 自定义索引名称（默认用 message 名） |          |

> [!IMPORTANT]
> 被索引的列必须是同一 struct（message）内的 scalar、enum 或 incell/enum list 字段。

## 单列索引（Single Column Index）

### 配置示例

*HelloWorld.xlsx* 中的 `ItemConf` sheet（map 布局）以及 `@TABLEAU` metasheet 配置：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID          | Type             | Param        | Name        |
| ----------- | ---------------- | ------------ | ----------- |
| map<uint32> | enum<.FruitType> | int32        | string      |
| Item's ID   | Item's type      | Item's param | Item's name |
| 1001        | 1                | 10           | Sword       |
| 1002        | 1                | 20           | Shield      |
| 1003        | 2                | 10           | Potion      |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Index                         |
| -------- | ----------------------------- |
| ItemConf | Type@Item, Param<ID>@ItemInfo |

{{< /sheet >}}

{{< /spreadsheet >}}

这里配置了两个单列 Index：

| 配置语法             | 索引键  | 排序列       | 索引名     | 说明                           |
| -------------------- | ------- | ------------ | ---------- | ------------------------------ |
| `Type@Item`          | `Type`  | 无           | `Item`     | 按类型查找道具列表             |
| `Param<ID>@ItemInfo` | `Param` | `ID`（升序） | `ItemInfo` | 按参数查找道具，结果按 ID 排序 |

### 生成的 API（Go 示例）

```go
// --- Index: Type@Item ---

// 获取完整索引 map（key=Type, value=[]*Item）
indexMap := conf.FindItemMap()

// 按 Type 查找所有匹配的道具（返回 slice）
items := conf.FindItem(protoconf.FruitType_FRUIT_TYPE_SWORD) // Type=1

// 按 Type 查找第一个匹配的道具
item := conf.FindFirstItem(protoconf.FruitType_FRUIT_TYPE_SWORD)

// --- Index: Param<ID>@ItemInfo（带 sort）---

// 按 Param 查找所有匹配的道具，结果 slice 已按 ID 升序排序
items := conf.FindItemInfo(10) // 返回 [Item{ID:1001}, Item{ID:1003}]，按 ID 排序

// 按 Param 查找第一个道具（即 ID 最小的那个）
item := conf.FindFirstItemInfo(10) // 返回 Item{ID:1001}
```

> **Sort 说明**：`<SortedCol>` 语法会在加载时对每个 key 对应的 value slice 按指定列**升序**排序。多个排序列时按顺序依次比较，如 `<Type,ID>` 先按 Type 排，Type 相同再按 ID 排。

---

## 多列索引（Multiple Column Index）

当需要用多个字段的组合作为索引键时，使用括号包裹多列：`(Column1,Column2)@IndexName`。

### 配置示例

继续使用 `ItemConf`，新增两个多列 Index：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID          | Type             | Param        | Name        |
| ----------- | ---------------- | ------------ | ----------- |
| map<uint32> | enum<.FruitType> | int32        | string      |
| Item's ID   | Item's type      | Item's param | Item's name |
| 1001        | 1                | 10           | Sword       |
| 1002        | 1                | 20           | Shield      |
| 1003        | 2                | 10           | Potion      |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Index                                                  |
| -------- | ------------------------------------------------------ |
| ItemConf | (ID,Name)<Type>@AwardItem, (ID,Type,Param)@SpecialItem |

{{< /sheet >}}

{{< /spreadsheet >}}

| 配置语法                      | 索引键                   | 排序列         | 索引名        |
| ----------------------------- | ------------------------ | -------------- | ------------- |
| `(ID,Name)<Type>@AwardItem`   | `(ID, Name)` 组合        | `Type`（升序） | `AwardItem`   |
| `(ID,Type,Param)@SpecialItem` | `(ID, Type, Param)` 组合 | 无             | `SpecialItem` |

### 生成的 API（Go 示例）

多列 Index 会自动生成一个 **Key struct** 作为 map 的键类型：

```go
// 自动生成的 Key struct（多列 Index 专用）
type ItemConf_Index_AwardItemKey struct {
    Id   uint32
    Name string
}

// --- Index: (ID,Name)<Type>@AwardItem ---

// 获取完整索引 map（key=AwardItemKey{ID,Name}, value=[]*Item）
indexMap := conf.FindAwardItemMap()

// 按 (ID, Name) 组合查找所有匹配的道具，结果按 Type 升序排序
items := conf.FindAwardItem(1001, "Sword")

// 按 (ID, Name) 组合查找第一个道具（即 Type 最小的那个）
item := conf.FindFirstAwardItem(1001, "Sword")

// --- Index: (ID,Type,Param)@SpecialItem ---

// 按三列组合查找
items := conf.FindSpecialItem(1001, protoconf.FruitType_FRUIT_TYPE_SWORD, 10)

// 查找第一个
item := conf.FindFirstSpecialItem(1001, protoconf.FruitType_FRUIT_TYPE_SWORD, 10)
```

> **Key struct 说明**：多列索引的 map key 是一个自动生成的 struct，字段名与列名对应。Go 的 map 要求 key 必须是 comparable 类型，struct 满足此要求。

---

## 带作用域的查询 API（Scoped Finders）

当索引目标嵌套在上级 **map** 中时，Tableau loader 会为每一层上级 map 额外生成**带作用域的查询 API**，方便在指定范围内精确查找。

### 规则

- 每个上级 **map**（不含 list）对应一个 scoped finder，编号从 1 开始
- `FindXxxN(mapKey1, ..., mapKeyN, indexKey)` 表示在前 N 层 map 限定的范围内查找
- list 层不计入编号 N

### 示例：map → map

`FruitConf` 结构为 `map<FruitType, Fruit> → map<ID, Item>`，对 `Item.Price` 建立 Index `Price<ID>`：

```go
// 全局查询（跨所有 Fruit）
items := conf.FindItem(price)
item  := conf.FindFirstItem(price)
m     := conf.FindItemMap()

// Scoped N=1：限定在指定 FruitType 的 Fruit map 范围内
items := conf.FindItem1(fruitType, price)
item  := conf.FindFirstItem1(fruitType, price)
m     := conf.FindItemMap1(fruitType)
```

### 示例：map → list → map → list（复杂嵌套）

当结构中混有 list 层时，list 不增加 N 的编号。

以 `ChapterConf` 为例，结构为：

```shell
ChapterConf
└── map<uint32, Chapter>          # 第1层 map（k1=ChapterID）
    └── [Section]uint32           # list（不计入 N）
        └── map<int32, Prop>      # 第2层 map（k2=PropID）
            └── [Tag]int32        # list（不计入 N）
                └── Type          ← 对此字段建立 Index: Type@TagByType
```

{{< spreadsheet "HelloWorld.xlsx" ChapterConf "@TABLEAU" >}}

{{< sheet colored >}}

| ChapterID            | SectionID       | PropID           | TagID      | Type       |
| -------------------- | --------------- | ---------------- | ---------- | ---------- |
| map<uint32, Chapter> | [Section]uint32 | map<int32, Prop> | [Tag]int32 | int32      |
| Chapter's ID         | Section's ID    | Prop's ID        | Tag's ID   | Tag's type |
| 1                    | 1               | 1                | 1          | 10         |
| 1                    | 1               | 1                | 2          | 20         |
| 1                    | 1               | 2                | 3          | 10         |
| 1                    | 2               | 1                | 4          | 30         |
| 2                    | 1               | 1                | 5          | 10         |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet       | Index          |
| ----------- | -------------- |
| ChapterConf | Type@TagByType |

{{< /sheet >}}

{{< /spreadsheet >}}

生成的 API：

```go
// 全局查询：跨所有章节和属性，按 Type 查找所有 Tag
tags := conf.FindTagByType(10)
tag  := conf.FindFirstTagByType(10)
m    := conf.FindTagByTypeMap()

// Scoped N=1：限定在指定 ChapterID（第1层 map）范围内
tags := conf.FindTagByType1(chapterID, 10)
tag  := conf.FindFirstTagByType1(chapterID, 10)
m    := conf.FindTagByTypeMap1(chapterID)

// Scoped N=2：限定在指定 ChapterID + PropID（前2层 map）范围内
tags := conf.FindTagByType2(chapterID, propID, 10)
tag  := conf.FindFirstTagByType2(chapterID, propID, 10)
m    := conf.FindTagByTypeMap2(chapterID, propID)
```

> **说明**：`N` 表示从根往下数第 N 个上级 **map** 的 key。`Section` list 不是 map，不计入 N。因此 `N=1` 对应 `Chapter` map（key=`ChapterID`），`N=2` 对应 `Prop` map（key=`ChapterID + PropID`）。

---

## 支持的列类型

Index 支持以下列类型作为索引键：

| 类型               | 示例                                         |
| ------------------ | -------------------------------------------- |
| scalar             | `int32`, `uint32`, `string`, `bool`, `bytes` |
| enum               | `enum<.FruitType>`                           |
| incell scalar list | `[]int32`（每个元素都会建立索引）            |
| incell enum list   | `[]enum<.FruitType>`                         |

---

## 参考文档

- [Metasheet 选项：Index](../../docs/excel/metasheet/#选项-index)
- [Go Loader API: Index](../../docs/api/loader/go/#index)
