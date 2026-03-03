---
title: "Metasheet"
description: "Excel metasheet @TABLEAU 使用指南。"
lead: "Metasheet 是一个名为 \"@TABLEAU\" 的 worksheet，用于指定 tableau 解析器的 sheet 级别选项。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2024-09-03T13:59:39+08:00
draft: false
images: []
weight: 7902
toc: true
---

## 概述

以下选项可在 metasheet `@TABLEAU` 中指定，用于影响对应 worksheet 的布局、功能、loader 等。

| 选项                     | 类型                | 说明                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Sheet`                  | string              | 要处理的 worksheet 名称。特别地，`#` 表示 workbook 名称，可用于设置 workbook 的 `Alias`。                                                                                                                                                                                                                                                                                                                              |
| `Alias`                  | string              | 对于 worksheet，alias 用作 proto message 名称。对于 workbook `#`，alias 用作 proto 文件名（不含扩展名）。                                                                                                                                                                                                                                                                                                              |
| `Namerow`                | int32               | worksheet 中列名定义所在的精确行号。<br>默认值：`1`。                                                                                                                                                                                                                                                                                                                                                                  |
| `Typerow`                | int32               | worksheet 中列类型定义所在的精确行号。<br>默认值：`2`。                                                                                                                                                                                                                                                                                                                                                                |
| `Noterow`                | int32               | worksheet 中列注释定义所在的精确行号。<br>默认值：`3`。                                                                                                                                                                                                                                                                                                                                                                |
| `Datarow`                | int32               | worksheet 中数据起始行号。<br>默认值：`4`。                                                                                                                                                                                                                                                                                                                                                                            |
| `Nameline`               | int32               | 单元格中列名定义所在的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                      |
| `Typeline`               | int32               | 单元格中列类型定义所在的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                    |
| `Transpose`              | bool                | 对指定 sheet 进行行列转置。                                                                                                                                                                                                                                                                                                                                                                                            |
| `Nested`                 | bool                | **namerow** 的嵌套命名。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                                                                                          |
| `Sep`                    | string              | Sheet 级别的分隔符。                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Subsep`                 | string              | Sheet 级别的子分隔符。                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Merger`                 | []string            | 将多个具有相同结构的 sheet（逗号分隔）合并为一个。<br>每个元素可以是：<br> - 仅 workbook 文件路径或 glob 路径（相对于当前 workbook）：`<Workbook>`，此时 sheet 名称与当前 sheet 相同。<br> - workbook 文件路径（相对于当前 workbook）加 worksheet 名称：`<Workbook>#<Worksheet>`。                                                                                                                                     |
| `AdjacentKey`            | bool                | 合并具有相同 key 的相邻行。如果 key 单元格未设置，则视为与同列上方最近的 key 相同。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                               |
| `FieldPresence`          | bool                | 为了追踪基本类型（数值、字符串、bytes 和枚举）的字段存在性，生成的字段将标记为 `optional`。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                       |
| `Mode`                   | Mode                | Sheet 模式。<br>可用模式：<br> - `MODE_ENUM_TYPE` <br> - `MODE_ENUM_TYPE_MULTI` <br> - `MODE_STRUCT_TYPE` <br> - `MODE_STRUCT_TYPE_MULTI` <br> - `MODE_UNION_TYPE`<br> - `MODE_UNION_TYPE_MULTI`                                                                                                                                                                                                                       |
| `Scatter`                | []string            | 将多个具有相同 schema 的 sheet（逗号分隔）分别转换为不同的配置文件。<br>每个元素可以是：<br> - workbook 名称或 Glob（相对于当前 workbook）：`<Workbook>`，此时 sheet 名称与当前 sheet 相同。<br> - workbook 名称（相对于当前 workbook）加 worksheet 名称：`<Workbook>#<Worksheet>`。                                                                                                                                   |
| `Optional`               | bool                | 该 sheet 中所有字段是否均为可选（字段名存在性）。                                                                                                                                                                                                                                                                                                                                                                      |
| `Patch`                  | Patch               | Sheet patch 类型。<br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                                                                                                                                                                                          |
| `WithParentDir`          | bool                | confgen：导出 JSON/Bin/Text 文件时创建父目录。                                                                                                                                                                                                                                                                                                                                                                         |
| `ScatterWithoutBookName` | bool                | confgen（scatter）：导出 JSON/Bin/Text 文件名时不带 book 名称前缀。                                                                                                                                                                                                                                                                                                                                                    |
| `OrderedMap`             | bool                | 是否生成 OrderedMap 访问器。                                                                                                                                                                                                                                                                                                                                                                                           |
| `Index`                  | []string            | 生成 index 访问器。<br> - 单列 Index 格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列 Index 格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                                                   |
| `OrderedIndex`           | []string            | 生成 OrderedIndex 访问器。<br> - 单列 OrderedIndex 格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列 OrderedIndex 格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                              |
| `LangOptions`            | map<string, string> | 指定 loader 语言选项。<br>有效 key：`OrderedMap`、`Index`。<br>不同 kv 之间用 `,` 分隔，key 和 value 之间用 `:` 分隔。<br>如果某个 key 不在 map 中，表示该 loader 选项在所有语言中均支持。<br>有效 value 为 `cpp`、`go` 的任意组合（以空格分隔）。<br>示例：<br> - `OrderedMap:cpp,Index:cpp go` // ordered map 仅支持 cpp，index 支持 cpp 和 go <br> - `OrderedMap:cpp` // ordered map 仅支持 cpp，index 支持所有语言 |
{.table-striped .table-hover}

## 空 `@TABLEAU`

如果 metasheet `@TABLEAU` 为空，则同一 workbook 中的所有其他 worksheet 都会被处理。

## 简单示例

*HelloWorld.xlsx* 中有一个 worksheet `Sheet1`，我们希望将其重命名为 `ItemConf`，定义自定义分隔符为 `|`，并生成 ordered map 访问器。

因此，*HelloWorld.xlsx* 中的 metasheet `@TABLEAU` 应配置如下：

{{< spreadsheet "HelloWorld.xlsx" Sheet1 "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Alias    | Sep | OrderedMap |
| ------ | -------- | --- | ---------- |
| Sheet1 | ItemConf | \|  | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

## Workbook `Alias`

生成的 proto 文件名是输入文件名的 snake_case 形式。例如，如果 workbook 名为 *HelloWorld.xlsx*，则生成的 proto 文件名为 *hello_world.proto*。如果希望手动指定生成的 proto 文件名，可以使用 `Alias` 选项。在此场景中，`#` 表示 workbook 名称。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" Sheet1 "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Alias       |
| ------ | ----------- |
| #      | custom_conf |
| Sheet1 | ItemConf    |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "custom_conf.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

## 选项 `Mode`

Sheet mode 定义了 tableauc（protogen）解析 sheet 的方式：数据或类型。

可用模式：

- `MODE_DEFAULT`：默认模式，定义 sheet 的数据结构。
- `MODE_ENUM_TYPE`：在一个 sheet 中定义单个枚举类型，参见 [示例](../enum/#single-enum-type-in-sheet)。
- `MODE_ENUM_TYPE_MULTI`：在一个 sheet 中定义多个枚举类型，参见 [示例](../enum/#multiple-enum-types-in-sheet)。
- `MODE_STRUCT_TYPE`：在一个 sheet 中定义单个 struct 类型，参见 [示例](../struct/#single-struct-type-in-sheet)。
- `MODE_STRUCT_TYPE_MULTI`：在一个 sheet 中定义多个 struct 类型，参见 [示例](../struct/#multiple-struct-types-in-sheet)。
- `MODE_UNION_TYPE`：在一个 sheet 中定义单个 union 类型，参见 [示例](../union/#single-union-type-in-sheet)。
- `MODE_UNION_TYPE_MULTI`：在一个 sheet 中定义多个 union 类型，参见 [示例](../union/#multiple-union-types-in-sheet)。

## 选项 `Transpose`

在线性代数中，矩阵的转置是将矩阵沿对角线翻转的操作。类似地，sheet（二维矩阵）的转置意味着将行与列互换。

参见 [Excel: 将数据从行转置（旋转）到列，反之亦然](https://support.microsoft.com/en-us/office/transpose-rotate-data-from-rows-to-columns-or-vice-versa-3419f2e3-beab-4318-aae5-d0f862209744)。

在 metasheet `@TABLEAU` 中将 `Transpose` 选项设置为 `true`。

*HelloWorld.xlsx* 中的 worksheet `HeroConf`：

{{< spreadsheet "HelloWorld.xlsx" HeroConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID    | int32   | Hero's ID          | 123         |
| ----- | ------- | ------------------ | ----------- |
| Name  | string  | Hero's name        | Robin       |
| Desc  | string  | Hero's description | A big hero! |
| Skill | []int32 | Hero's skills      | 100,101,102 |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Transpose |
| -------- | --------- |
| HeroConf | true      |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message HeroConf {
  option (tableau.worksheet) = {name:"HeroConf" transpose:true};

  int32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
  repeated int32 skill_list = 4 [(tableau.field) = {name:"Skill" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "HeroConf.json" >}}

```json
{
    "id": 123,
    "name": "Robin",
    "desc": "A big hero!",
    "skillList": [100, 101, 102]
}
```

{{< /details >}}

## 选项 `Merger`

`Merger` 选项用于将多个具有相同 schema 的 sheet（逗号分隔）合并为一个。

每个元素可以是：

1. 仅 workbook 文件路径或 [Glob](https://pkg.go.dev/path/filepath#Glob) 路径（相对于当前 workbook）：`<Workbook>`，此时 sheet 名称与当前 sheet 相同。
2. workbook 文件路径（相对于当前 workbook）加 worksheet 名称：`<Workbook>#<Worksheet>`。

{{< alert icon="ⓘ" context="info" text="Glob 模式通常不应匹配主 workbook。如果匹配，tableauc 会自动排除它。" />}}

例如：

第一个（主）workbook：*MergerMain.xlsx* 中的 worksheet `ZoneConf`（含 `@TABLEAU`）：

{{< spreadsheet "MergerMain.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Merger       |
| -------- | ------------ |
| ZoneConf | Merger*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

第二个（子）workbook：*Merger2.xlsx* 中的 worksheet `ZoneConf`（不含 `@TABLEAU`）：

{{< spreadsheet "Merger2.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< /spreadsheet >}}

第三个（子）workbook：*Merger3.xlsx* 中的 worksheet `ZoneConf`（不含 `@TABLEAU`）：

{{< spreadsheet "Merger3.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 3                 | Snowfield   | 300               |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "merger_main.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ZoneConf {
  option (tableau.worksheet) = {name:"ZoneConf" merger:"Merger*.xlsx"};

  map<uint32, Zone> zone_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Zone {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 difficulty = 3 [(tableau.field) = {name:"Difficulty"}];
  }
}
```

{{< /details >}}

{{< details "ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "1": {"id": 1, "name": "Infinity", "difficulty": 100},
        "2": {"id": 2, "name": "Desert", "difficulty": 200},
        "3": {"id": 3, "name": "Snowfield", "difficulty": 300}
    }
}
```

{{< /details >}}

## 选项 `Scatter`

`Scatter` 选项用于将多个具有相同 schema 的 sheet（逗号分隔）分别转换为不同的配置文件。

每个元素可以是：

1. 仅 workbook 文件路径或 [Glob](https://pkg.go.dev/path/filepath#Glob) 路径（相对于当前 workbook）：`<Workbook>`，此时 sheet 名称与当前 sheet 相同。
2. workbook 文件路径（相对于当前 workbook）加 worksheet 名称：`<Workbook>#<Worksheet>`。

{{< alert icon="ⓘ" context="info" text="Glob 模式通常不应匹配主 workbook。如果匹配，tableauc 会自动排除它。" />}}

例如，有三个 workbook（每个具有相同的 sheet schema，*Scatter1.xlsx* 为主 workbook）：

- Scatter1.xlsx
- Scatter2.xlsx
- Scatter3.xlsx

第一个（主）workbook：*Scatter1.xlsx* 中的 worksheet `ZoneConf`（含 `@TABLEAU`）：

{{< spreadsheet "Scatter1.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Scatter       |
| -------- | ------------- |
| ZoneConf | Scatter*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

生成的 protoconf：

{{< details "scatter_1.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ZoneConf {
  option (tableau.worksheet) = {name:"ZoneConf" scatter:"Scatter*.xlsx"};

  map<uint32, Zone> zone_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Zone {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 difficulty = 3 [(tableau.field) = {name:"Difficulty"}];
  }
}
```

{{< /details >}}

预期生成三个不同的配置文件（命名模式：`<BookName>_<SheetName>`）：

{{< details "Scatter1_ZoneConf.json" >}}

```json
{"zoneMap": {"1": {"id": 1, "name": "Infinity", "difficulty": 100}}}
```

{{< /details >}}

{{< details "Scatter2_ZoneConf.json" >}}

```json
{"zoneMap": {"2": {"id": 2, "name": "Desert", "difficulty": 200}}}
```

{{< /details >}}

{{< details "Scatter3_ZoneConf.json" >}}

```json
{"zoneMap": {"3": {"id": 3, "name": "Snowfield", "difficulty": 300}}}
```

{{< /details >}}

## 选项 `OrderedMap`

> 📢 仅适用于每个层级 message 的第一个 map 字段。

如果将 `OrderedMap` 设置为 `true`，则 tableau loader 插件将生成 ordered map API：

- [C++: OrderedMap API](../../api/loader/cpp/#orderedmap)
- [Go: OrderedMap API](../../api/loader/go/#orderedmap)

## 选项 `Index`

`Index` 选项可用于生成 index 访问器。
有两种 index：

1. **单列 Index**
2. **多列 Index**（又称 Composite Index）

如果正确设置了 `Index`，则 tableau loader 插件将生成 index API：

- [C++: Index API](../../api/loader/cpp/#index)
- [Go: Index API](../../api/loader/go/#index)

每列类型可以是：

- **scalar**：数值、布尔值、字符串和 bytes。
- **enum**：例如：`enum<.FruitType>`
- **incell scalar list**：例如：`[]int32`
- **incell enum list**：例如：`[]enum<.FruitType>`

示例：*HelloWorld.xlsx* 中的两个 worksheet *ItemConf* 和 *ShopConf*：

- *ItemConf*：对 **map value** 同一 struct 的列建立 index。
- *ShopConf*：对 **list element** 同一 struct 的列建立 index。

{{< spreadsheet "HelloWorld.xlsx" ItemConf ShopConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Name        | Desc                          |
| ---------------- | ----------- | ----------------------------- |
| map<int32, Item> | string      | string                        |
| Item's ID        | Item's name | Item's desc                   |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
| ----------- | ----------- | ------------- |
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Index                                          |     |
| -------- | ---------------------------------------------- | --- |
| ItemConf | ID@Item, Name@AwardItem, (ID,Name)@SpecialItem |     |
| ShopConf | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |     |

{{< /sheet >}}

{{< /spreadsheet >}}

### 单列 Index

格式：`Column<ColumnX,ColumnY,...>@IndexName`。

`@` 是列名和 index 名之间的分隔符。如果未设置 `IndexName`，则使用该列的父 struct 类型名。可以用逗号分隔指定一个或多个 index。尖括号 `<>` 中的列指定排序列，**结果数组**按相同 index key 排序。

示例：

- `ID`
- `ID@Item`
- `ID<ID>@Item`：结果数组按 ID 排序。
- `ID<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

### 多列 Index

格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。

多列 Index（又称 Composite Index）由同一 struct（list 或 map 中）的**多列**组成，以提高查询速度。

`@` 是括号内列名和 index 名之间的分隔符。如果未设置 `IndexName`，则使用该列的父 struct 类型名。可以用逗号分隔指定一个或多个 index。尖括号 `<>` 中的列指定排序列，**结果数组**按相同 index key 排序。

示例：

- `(ID,Name)`：未设置 index 名，由父 struct 类型名决定。
- `(ID,Name)@AwardItem`
- `(ID,Name)<ID>`：结果数组按 ID 排序。
- `(ID,Type)<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID@Item, (ID,Name)@AwardItem`：一个单列 index 和一个多列 index。

## 选项 `OrderedIndex`

`OrderedIndex` 选项可用于生成 ordered index 访问器。
有两种 ordered index：

1. **单列 OrderedIndex**
2. **多列 OrderedIndex**（又称 Composite OrderedIndex）

如果正确设置了 `OrderedIndex`，则 tableau loader 插件将生成 index API：

- [C++: Index API](../../api/loader/cpp/#orderedindex)
- [Go: Index API](../../api/loader/go/#orderedindex)

### 单列 OrderedIndex

格式：`Column<ColumnX,ColumnY,...>@IndexName`。

`@` 是列名和 index 名之间的分隔符。如果未设置 `IndexName`，则使用该列的父 struct 类型名。可以用逗号分隔指定一个或多个 index。尖括号 `<>` 中的列指定排序列，**结果数组**按相同 index key 排序。

示例：

- `ID`
- `ID@Item`
- `ID<ID>@Item`：结果数组按 ID 排序。
- `ID<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

### 多列 OrderedIndex

> ⚠️ 暂不支持。

## 选项 `Patch`

```protobuf
// Sheet 级别和 field 级别的 Patch 类型。
enum Patch {
  PATCH_NONE = 0;
  // 1 Sheet 级别 patch 选项 "PATCH_REPLACE"
  //   - 替换整个 message
  // 2 顶层 field patch 选项 "PATCH_REPLACE"
  //   - list：先清空字段，然后将 src 中该 list 字段的所有元素追加到 dst 对应的 list 字段。
  //   - map：先清空字段，然后将 src 中该 map 字段的所有条目复制到 dst 对应的 map 字段。
  PATCH_REPLACE = 1;
  // 将 src 合并到 dst（必须是具有相同 descriptor 的 message）。
  //  - scalar：src 中已填充的 scalar 字段复制到 dst。
  //  - message：src 中已填充的单数 message 通过递归调用 [proto.Merge](https://pkg.go.dev/google.golang.org/protobuf/proto#Merge) 合并到 dst。
  //  - list：src 中每个 list 字段的元素追加到 dst 对应的 list 字段。
  //  - map：src 中每个 map 字段的条目复制到 dst 对应的 map 字段，可能替换已有条目。
  //  - unknown：src 的 unknown 字段追加到 dst 的 unknown 字段。
  PATCH_MERGE = 2;
}
```

## 选项 `Sep`

**Sheet 级别**的分隔符，用于分隔：

- incell list 元素（scalar 或 struct）。
- incell map 条目。

如果未设置，将使用 tableauc [yaml.config](../../tutorial/config/#confinputseq) 中的**全局级别** sep（默认：`,`）。

## 选项 `Subsep`

**Sheet 级别**的子分隔符，用于分隔：

- 每个 incell map 条目的 key-value 对。
- 每个 incell struct list 元素的 struct 字段。

如果未设置，将使用 tableauc [yaml.config](../../tutorial/config/#confinputseq) 中的**全局级别** subsep（默认：`:`）。
