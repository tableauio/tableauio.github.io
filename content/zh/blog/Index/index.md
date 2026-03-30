---
title: "使用 Index 快速查询配置数据"
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
- 查找某个道具下所有 `PropID == 2` 的属性

如果每次都遍历整张表，性能开销较大。Tableau 提供了 **Index** metasheet 选项，让 loader 插件在加载时自动构建索引，实现 O(1) 的快速查询。

---

## Index

### 配置方式

在 `@TABLEAU` metasheet 中，通过 `Index` 列为指定 sheet 设置索引列。

**格式：**

- 单列 Index：`Column@IndexName`
- 多列 Index（Composite Index）：`(Column1,Column2)@IndexName`
- 多个 Index 用逗号分隔：`Type@ThemeShop, (ID,Type)@SpecialShop`

> **注意**：被索引的列必须是同一 struct（message）内的 scalar 或 enum 字段。

### 示例

*HelloWorld.xlsx* 中的 `List` sheet（list 布局）以及 `@TABLEAU` metasheet 配置：

{{< spreadsheet "HelloWorld.xlsx" List "@TABLEAU" >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
| ----------- | ----------- | ------------- |
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet | Index                                          |
| ----- | ---------------------------------------------- |
| List  | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |

{{< /sheet >}}

{{< /spreadsheet >}}

这样会生成三个索引：

| Index 名      | 索引键      | 说明                |
| ------------- | ----------- | ------------------- |
| `Shop`        | `ID`        | 按 ID 查找商店      |
| `ThemeShop`   | `Type`      | 按类型查找商店列表  |
| `SpecialShop` | `(ID,Type)` | 按 ID+Type 组合查找 |

### 生成的 API（Go 示例）

```go
// 获取完整索引 map
indexMap := conf.FindThemeShopMap()

// 按 Type 查找所有匹配的商店（返回 slice）
shops := conf.FindThemeShop(1)

// 按 Type 查找第一个匹配的商店
shop := conf.FindFirstThemeShop(1)
```

对于嵌套在上层 map 中的 struct，还会生成带作用域的查询 API：

```go
// 在指定上层 map key 范围内查找
shops := conf.FindThemeShop1(itemID, shopType)
```

---

## 复杂嵌套示例：map → list → map → list

当索引目标深埋在多层嵌套结构中时，Tableau 会为每一层上级 map 自动生成**带作用域的查询 API**，方便在指定范围内精确查找。

### 数据结构

以 `ChapterConf` sheet 为例，结构为：

```bash
ChapterConf
└── map<uint32, Chapter>          # 第1层：章 map（key: ChapterID）
    └── [Section]uint32           # 第2层：节 list（key: SectionID）
        └── map<int32, Prop>      # 第3层：属性 map（key: PropID）
            └── [Tag]int32        # 第4层：标签 list（key: TagID）
                ├── TagID
                └── Type          ← 对此字段建立 Index
```

### 配置示例

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

`Type@TagByType` 表示：对 `Tag` struct 中的 `Type` 字段建立名为 `TagByType` 的索引。

### 生成的 API（Go 示例）

由于 `Tag` 嵌套在 **2 层上级 map**（`Chapter` map 和 `Prop` map）中，Tableau 会生成全局查询 API 以及带作用域的 API：

```go
// 全局查询：跨所有章节和属性，按 Type 查找所有 Tag
tags := conf.FindTagByType(10)

// 按 Type 查找第一个 Tag（全局）
tag := conf.FindFirstTagByType(10)

// 带作用域查询（1 层上级 map：Prop map）
// 在指定 ChapterID + SectionID + PropID 范围内，按 Type 查找
tags1 := conf.FindTagByType1(chapterID, sectionID, propID, 10)

// 带作用域查询（2 层上级 map：Chapter map）
// 在指定 ChapterID 范围内，按 Type 查找
tags2 := conf.FindTagByType2(chapterID, 10)
```

> **说明**：`FindTagByTypeN` 中的 `N` 表示从最近的上级 map 往上数第 N 层。`N=1` 为直接父级 map（`Prop` map），`N=2` 为祖父级 map（`Chapter` map）。

---

## 支持的列类型

Index 和 OrderedIndex 均支持以下列类型：

- **scalar**：数值、布尔值、字符串、bytes
- **enum**：如 `enum<.FruitType>`
- **incell scalar list**：如 `[]int32`
- **incell enum list**：如 `[]enum<.FruitType>`

---

## 参考文档

- [Metasheet 选项：Index](../../docs/excel/metasheet/#选项-index)

- [Go Loader API: OrderedIndex](../../docs/api/loader/go/#orderedindex)
