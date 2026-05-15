---
title: "元表（Metasheet）"
description: "Excel 元表 @TABLEAU 使用指南。"
lead: "元表是一个名为 \"@TABLEAU\" 的工作表，用于指定 tableau 解析器的工作表选项。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2024-09-03T13:59:39+08:00
draft: false
images: []
weight: 7902
toc: true
---

## 概述

以下选项可在元表 `@TABLEAU` 中指定，用于影响对应工作表的布局、功能、loader 等。

| 选项                     | 类型                | 说明                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Sheet`                  | string              | 要处理的工作表名称。特别地，`#` 表示工作簿名称，可用于设置工作簿的 `Alias`。                                                                                                                                                                                                                                                                                                                                           |
| `Alias`                  | string              | 对于工作表，alias 用作 proto message 名称。对于工作簿 `#`，alias 用作 proto 文件名（不含扩展名）。                                                                                                                                                                                                                                                                                                                     |
| `Namerow`                | int32               | 工作表中列名定义所在的精确行号。<br>默认值：`1`。                                                                                                                                                                                                                                                                                                                                                                      |
| `Typerow`                | int32               | 工作表中列类型定义所在的精确行号。<br>默认值：`2`。                                                                                                                                                                                                                                                                                                                                                                    |
| `Noterow`                | int32               | 工作表中列注释定义所在的精确行号。<br>默认值：`3`。                                                                                                                                                                                                                                                                                                                                                                    |
| `Datarow`                | int32               | 工作表中数据起始行号。<br>默认值：`4`。                                                                                                                                                                                                                                                                                                                                                                                |
| `Nameline`               | int32               | 单元格中列名定义所在的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                      |
| `Typeline`               | int32               | 单元格中列类型定义所在的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                    |
| `Transpose`              | bool                | 对指定工作表进行行列转置。                                                                                                                                                                                                                                                                                                                                                                                             |
| `Nested`                 | bool                | **namerow** 的嵌套命名。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                                                                                          |
| `Sep`                    | string              | 工作表的分隔符。                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Subsep`                 | string              | 工作表的子分隔符。                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Merger`                 | []string            | 将多个具有相同结构的工作表（逗号分隔）合并为一个。<br>每个元素可以是：<br> - 仅工作簿文件路径或 glob 路径（相对于当前工作簿）：`<Workbook>`，此时工作表名称与当前工作表相同。<br> - 工作簿文件路径（相对于当前工作簿）加工作表名称：`<Workbook>#<Worksheet>`。                                                                                                                                                         |
| `AdjacentKey`            | bool                | 合并具有相同 key 的相邻行。如果 key 单元格未设置，则视为与同列上方最近的 key 相同。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                               |
| `FieldPresence`          | bool                | 为了追踪基本类型（数值、字符串、bytes 和枚举）的字段存在性，生成的字段将标记为 `optional`。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                       |
| `Mode`                   | Mode                | 工作表模式。<br>可用模式：<br> - `MODE_ENUM_TYPE` <br> - `MODE_ENUM_TYPE_MULTI` <br> - `MODE_STRUCT_TYPE` <br> - `MODE_STRUCT_TYPE_MULTI` <br> - `MODE_UNION_TYPE`<br> - `MODE_UNION_TYPE_MULTI`                                                                                                                                                                                                                       |
| `Scatter`                | []string            | 将多个具有相同 schema 的工作表（逗号分隔）分别转换为不同的配置文件。<br>每个元素可以是：<br> - 工作簿名称或 Glob（相对于当前工作簿）：`<Workbook>`，此时工作表名称与当前工作表相同。<br> - 工作簿名称（相对于当前工作簿）加工作表名称：`<Workbook>#<Worksheet>`。                                                                                                                                                      |
| `Optional`               | bool                | 该工作表中所有字段是否均为可选（字段名存在性）。                                                                                                                                                                                                                                                                                                                                                                       |
| `Patch`                  | Patch               | 工作表 patch 类型。<br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                                                                                                                                                                                         |
| `WithParentDir`          | bool                | confgen：导出 JSON/Bin/Text 文件时创建父目录。                                                                                                                                                                                                                                                                                                                                                                         |
| `ScatterWithoutBookName` | bool                | confgen（scatter）：导出 JSON/Bin/Text 文件名时不带 book 名称前缀。                                                                                                                                                                                                                                                                                                                                                    |
| `OrderedMap`             | bool                | 是否生成 OrderedMap 访问器。                                                                                                                                                                                                                                                                                                                                                                                           |
| `Index`                  | []string            | 生成 index 访问器。<br> - 单列 Index 格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列 Index 格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                                                   |
| `OrderedIndex`           | []string            | 生成 OrderedIndex 访问器。<br> - 单列 OrderedIndex 格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列 OrderedIndex 格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                              |
| `LangOptions`            | map<string, string> | 指定 loader 语言选项。<br>有效 key：`OrderedMap`、`Index`。<br>不同 kv 之间用 `,` 分隔，key 和 value 之间用 `:` 分隔。<br>如果某个 key 不在 map 中，表示该 loader 选项在所有语言中均支持。<br>有效 value 为 `cpp`、`go` 的任意组合（以空格分隔）。<br>示例：<br> - `OrderedMap:cpp,Index:cpp go` // ordered map 仅支持 cpp，index 支持 cpp 和 go <br> - `OrderedMap:cpp` // ordered map 仅支持 cpp，index 支持所有语言 |
| `Validate`               | string              | 工作表/messager 级别的 [protovalidate](https://github.com/bufbuild/protovalidate) message 级校验规则。其值为 [`buf.validate.MessageRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.MessageRules) 的 text format 表示，例如：`cel_expression:"this.item_map.size() > 0"`。也支持在 `MODE_STRUCT_TYPE`/`MODE_UNION_TYPE` 等工作表上使用。                                           |
{.table-striped .table-hover}

## 空 `@TABLEAU`

如果元表 `@TABLEAU` 为空，则同一工作簿中的所有其他工作表都会被处理。

## 简单示例

*HelloWorld.xlsx* 中有一个工作表 `Sheet1`，我们希望将其重命名为 `ItemConf`，定义自定义分隔符为 `|`，并生成 ordered map 访问器。

因此，*HelloWorld.xlsx* 中的元表 `@TABLEAU` 应配置如下：

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

{{< sheet colored1 >}}

| Sheet  | Alias    | Sep | OrderedMap |
| ------ | -------- | --- | ---------- |
| Sheet1 | ItemConf | \|  | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

## 选项 `Alias`

生成的 proto 文件名是输入文件名的 snake_case 形式。例如，如果工作簿名为 *HelloWorld.xlsx*，则生成的 proto 文件名为 *hello_world.proto*。如果希望手动指定生成的 proto 文件名，可以使用 `Alias` 选项。在此场景中，`#` 表示工作簿名称。

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

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

{{< sheet colored1 >}}

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

工作表模式定义了 tableauc（protogen）解析工作表的方式：数据或类型。

可用模式：

- `MODE_DEFAULT`：默认模式，定义工作表的数据结构。
- `MODE_ENUM_TYPE`：在一个工作表中定义单个枚举类型，参见 [示例](../enum/#单个枚举类型)。
- `MODE_ENUM_TYPE_MULTI`：在一个工作表中定义多个枚举类型，参见 [示例](../enum/#多个枚举类型)。
- `MODE_STRUCT_TYPE`：在一个工作表中定义单个 struct 类型，参见 [示例](../struct/#单个-struct-类型)。
- `MODE_STRUCT_TYPE_MULTI`：在一个工作表中定义多个 struct 类型，参见 [示例](../struct/#多个-struct-类型)。
- `MODE_UNION_TYPE`：在一个工作表中定义单个 union 类型，参见 [示例](../union/#单个-union-类型)。
- `MODE_UNION_TYPE_MULTI`：在一个工作表中定义多个 union 类型，参见 [示例](../union/#多个-union-类型)。

## 选项 `Transpose`

在线性代数中，矩阵的转置是将矩阵沿对角线翻转的操作。类似地，工作表（二维矩阵）的转置意味着将行与列互换。

参见 [Excel: 将数据从行转置（旋转）到列，反之亦然](https://support.microsoft.com/en-us/office/transpose-rotate-data-from-rows-to-columns-or-vice-versa-3419f2e3-beab-4318-aae5-d0f862209744)。

在元表 `@TABLEAU` 中将 `Transpose` 选项设置为 `true`。

*HelloWorld.xlsx* 中的工作表 `HeroConf`：

{{< spreadsheet "HelloWorld.xlsx" HeroConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID    | int32   | Hero's ID          | 123         |
| ----- | ------- | ------------------ | ----------- |
| Name  | string  | Hero's name        | Robin       |
| Desc  | string  | Hero's description | A big hero! |
| Skill | []int32 | Hero's skills      | 100,101,102 |

{{< /sheet >}}

{{< sheet colored1 >}}

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
    "skillList": [
        100,
        101,
        102
    ]
}
```

{{< /details >}}

## 选项 `Merger`

`Merger` 选项用于将多个具有相同 schema 的工作表（逗号分隔）合并为一个。

每个元素可以是：

1. 仅工作簿文件路径或 [Glob](https://pkg.go.dev/path/filepath#Glob) 路径（相对于当前工作簿）：`<Workbook>`，此时工作表名称与当前工作表相同。
2. 工作簿文件路径（相对于当前工作簿）加工作表名称：`<Workbook>#<Worksheet>`。

> [!NOTE]
> Glob 模式通常不应匹配主工作簿。如果匹配，`tableauc` 会自动排除它。

### 合并多个工作簿

例如，有三个工作簿，每个都包含一个具有相同 schema 的工作表 `ZoneConf`：

- **MergerMain.xlsx**（主）：包含 `@TABLEAU` 元表，在 `Merger` 列中使用 Glob 模式 `Merger*.xlsx` 匹配所有子工作簿。
- **Merger2.xlsx**（子）：仅包含数据工作表，无需 `@TABLEAU` 元表。
- **Merger3.xlsx**（子）：仅包含数据工作表，无需 `@TABLEAU` 元表。

第一个（主）工作簿：*MergerMain.xlsx* 中的工作表 `ZoneConf`（含 `@TABLEAU`）：

{{< spreadsheet "MergerMain.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Merger       |
| -------- | ------------ |
| ZoneConf | Merger*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

第二个（子）工作簿：*Merger2.xlsx* 中的工作表 `ZoneConf`（不含 `@TABLEAU`）：

{{< spreadsheet "Merger2.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< /spreadsheet >}}

第三个（子）工作簿：*Merger3.xlsx* 中的工作表 `ZoneConf`（不含 `@TABLEAU`）：

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
        "1": {
            "id": 1,
            "name": "Infinity",
            "difficulty": 100
        },
        "2": {
            "id": 2,
            "name": "Desert",
            "difficulty": 200
        },
        "3": {
            "id": 3,
            "name": "Snowfield",
            "difficulty": 300
        }
    }
}
```

{{< /details >}}

### 合并同一工作簿中的多个工作表

例如，同一工作簿 *Merger.xlsx* 中有三个具有相同 schema 的工作表：

- `ZoneConf`（主工作表，含 `@TABLEAU`）
- `ZoneConf2`（子工作表）
- `ZoneConf3`（子工作表）

主（也是唯一的）工作簿：*Merger.xlsx* 中的工作表 `ZoneConf`、`ZoneConf2`、`ZoneConf3` 和 `@TABLEAU`：

{{< spreadsheet "Merger.xlsx" ZoneConf ZoneConf2 ZoneConf3 "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 3                 | Snowfield   | 300               |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Merger                                      |
| -------- | ------------------------------------------- |
| ZoneConf | Merger.xlsx#ZoneConf2,Merger.xlsx#ZoneConf3 |

{{< /sheet >}}

{{< /spreadsheet >}}

> [!NOTE]
> 使用 `<Workbook>#<Worksheet>` 引用工作簿中的特定工作表。

生成结果：

{{< details "merger_same.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"Merger.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ZoneConf {
  option (tableau.worksheet) = {name:"ZoneConf" merger:"Merger.xlsx#ZoneConf2,Merger.xlsx#ZoneConf3"};

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
        "1": {
            "id": 1,
            "name": "Infinity",
            "difficulty": 100
        },
        "2": {
            "id": 2,
            "name": "Desert",
            "difficulty": 200
        },
        "3": {
            "id": 3,
            "name": "Snowfield",
            "difficulty": 300
        }
    }
}
```

{{< /details >}}

## 选项 `Scatter`

`Scatter` 选项用于将多个具有相同 schema 的工作表（逗号分隔）分别转换为不同的配置文件。

每个元素可以是：

1. 仅工作簿文件路径或 [Glob](https://pkg.go.dev/path/filepath#Glob) 路径（相对于当前工作簿）：`<Workbook>`，此时工作表名称与当前工作表相同。
2. 工作簿文件路径（相对于当前工作簿）加工作表名称：`<Workbook>#<Worksheet>`。

> [!NOTE]
> Glob 模式通常不应匹配主工作簿。如果匹配，`tableauc` 会自动排除它。

例如，有三个工作簿（每个具有相同的工作表 schema，*Scatter1.xlsx* 为主工作簿）：

- Scatter1.xlsx
- Scatter2.xlsx
- Scatter3.xlsx

第一个（主）工作簿：*Scatter1.xlsx* 中的工作表 `ZoneConf`（含 `@TABLEAU`）：

{{< spreadsheet "Scatter1.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Scatter       |
| -------- | ------------- |
| ZoneConf | Scatter*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

第二个（子）工作簿：*Scatter2.xlsx* 中的工作表 `ZoneConf`（不含 `@TABLEAU`）：

{{< spreadsheet "Scatter2.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< /spreadsheet >}}

第三个（子）工作簿：*Scatter3.xlsx* 中的工作表 `ZoneConf`（不含 `@TABLEAU`）：

{{< spreadsheet "Scatter3.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone's ID         | Zone's name | Zone's difficulty |
| 3                 | Snowfield   | 300               |

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
{
    "zoneMap": {
        "1": {
            "id": 1,
            "name": "Infinity",
            "difficulty": 100
        }
    }
}
```

{{< /details >}}

{{< details "Scatter2_ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "2": {
            "id": 2,
            "name": "Desert",
            "difficulty": 200
        }
    }
}
```

{{< /details >}}

{{< details "Scatter3_ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "3": {
            "id": 3,
            "name": "Snowfield",
            "difficulty": 300
        }
    }
}
```

{{< /details >}}

## 选项 `OrderedMap`

> [!IMPORTANT]
> 仅适用于每个层级 message 的第一个映射字段。

如果将 `OrderedMap` 设置为 `true`，则 tableau loader 插件将生成有序映射 API：

- [C++: OrderedMap API](../../api/loader/cpp/#orderedmap)
- [Go: OrderedMap API](../../api/loader/go/#orderedmap)

例如，*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | PropID           | PropValue    |
| ----------------- | ----------- | ---------------- | ------------ |
| map<uint32, Item> | string      | map<int32, Prop> | int64        |
| Item's ID         | Item's name | Prop's ID        | Prop's value |
| 1                 | Apple       | 1                | 10           |
| 2                 | Orange      | 1                | 20           |
| 2                 | Orange      | 2                | 30           |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | OrderedMap |
| -------- | ---------- |
| ItemConf | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

## 选项 `Index`

> [!IMPORTANT]
> 被索引的列必须是同一结构体（message）内的标量或枚举。

`Index` 选项可用于生成索引访问器。
有两种索引：

1. **单列索引**
2. **多列索引**（又称复合索引）

如果正确设置了 `Index`，则 tableau loader 插件将生成索引 API：

- [C++: 索引 API](../../api/loader/cpp/#index)
- [Go: 索引 API](../../api/loader/go/#index)

每列类型可以是：

- **标量**：数值、布尔值、字符串和 bytes。
- **枚举**：例如：`enum<.FruitType>`
- **单元格内标量列表**：例如：`[]int32`
- **单元格内枚举列表**：例如：`[]enum<.FruitType>`

示例：对 *HelloWorld.xlsx* 中不同布局的工作表设置索引列：

{{< spreadsheet "HelloWorld.xlsx" List MapInMap ListInMap "@TABLEAU" >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
| ----------- | ----------- | ------------- |
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet colored >}}

| ID                | Name        | PropID           | Type        | Bonus        |
| ----------------- | ----------- | ---------------- | ----------- | ------------ |
| map<uint32, Item> | string      | map<int32, Prop> | int64       | int32        |
| Item's ID         | Item's name | Prop's ID        | Prop's type | prop's bonus |
| 1                 | Apple       | 1                | 10          | 100          |
| 2                 | Orange      | 1                | 20          | 200          |
| 2                 | Orange      | 2                | 30          | 300          |

{{< /sheet >}}

{{< sheet colored >}}

| ID                | Name        | PropID      | Type        | Bonus        |
| ----------------- | ----------- | ----------- | ----------- | ------------ |
| map<uint32, Item> | string      | [Prop]int32 | int64       | int32        |
| Item's ID         | Item's name | Prop's ID   | Prop's type | prop's bonus |
| 1                 | Apple       | 1           | 10          | 100          |
| 2                 | Orange      | 1           | 20          | 200          |
| 2                 | Orange      | 2           | 30          | 300          |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet     | Index                                          |
| --------- | ---------------------------------------------- |
| List      | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |
| MapInMap  | Type@Prop, (PropID,Type)@SpecialProp           |
| ListInMap | Type@Prop, (PropID,Type)@SpecialProp           |

{{< /sheet >}}

{{< /spreadsheet >}}

### 单列索引

格式：`Column<ColumnX,ColumnY,...>@IndexName`。

`@` 是列名和 index 名之间的分隔符。如果未设置 `IndexName`，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 `<>` 中的列指定排序列，相同索引的**结果数组**按排序列的值排序。

示例：

- `ID`
- `ID@Item`
- `ID<ID>@Item`：结果数组按 ID 排序。
- `ID<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

### 多列索引

格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。

多列索引（又称复合索引）由同一结构体（列表或映射中）的**多列**组成，以提高查询速度。

`@` 是括号内列名和索引名之间的分隔符。如果未设置 `IndexName`，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 `<>` 中的列指定排序列，相同索引的**结果数组**按排序列的值排序。

示例：

- `(ID,Name)`：未设置索引名，由父结构体类型名决定。
- `(ID,Name)@AwardItem`
- `(ID,Name)<ID>`：结果数组按 ID 排序。
- `(ID,Type)<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID@Item, (ID,Name)@AwardItem`：一个单列索引和一个多列索引。

## 选项 `OrderedIndex`

> [!IMPORTANT]
> 被索引的列必须是同一结构体（message）内的标量或枚举。

`OrderedIndex` 选项可用于生成有序索引访问器。
有两种有序索引：

1. **单列有序索引**
2. **多列有序索引**（又称复合有序索引）

如果正确设置了 `OrderedIndex`，则 tableau loader 插件将生成有序索引 API：

- [C++: 有序索引 API](../../api/loader/cpp/#orderedindex)
- [Go: 有序索引 API](../../api/loader/go/#orderedindex)

每列类型可以是：

- **标量**：数值、布尔值、字符串和 bytes。
- **枚举**：例如：`enum<.FruitType>`
- **单元格内标量列表**：例如：`[]int32`
- **单元格内枚举列表**：例如：`[]enum<.FruitType>`

示例：对 *HelloWorld.xlsx* 中不同布局的工作表设置有序索引列：

{{< spreadsheet "HelloWorld.xlsx" List MapInMap ListInMap "@TABLEAU" >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
| ----------- | ----------- | ------------- |
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet colored >}}

| ID                | Name        | PropID           | Type        | Bonus        |
| ----------------- | ----------- | ---------------- | ----------- | ------------ |
| map<uint32, Item> | string      | map<int32, Prop> | int64       | int32        |
| Item's ID         | Item's name | Prop's ID        | Prop's type | prop's bonus |
| 1                 | Apple       | 1                | 10          | 100          |
| 2                 | Orange      | 1                | 20          | 200          |
| 2                 | Orange      | 2                | 30          | 300          |

{{< /sheet >}}

{{< sheet colored >}}

| ID                | Name        | PropID      | Type        | Bonus        |
| ----------------- | ----------- | ----------- | ----------- | ------------ |
| map<uint32, Item> | string      | [Prop]int32 | int64       | int32        |
| Item's ID         | Item's name | Prop's ID   | Prop's type | prop's bonus |
| 1                 | Apple       | 1           | 10          | 100          |
| 2                 | Orange      | 1           | 20          | 200          |
| 2                 | Orange      | 2           | 30          | 300          |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet     | OrderedIndex                                   |
| --------- | ---------------------------------------------- |
| List      | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |
| MapInMap  | Type@Prop, (PropID,Type)@SpecialProp           |
| ListInMap | Type@Prop, (PropID,Type)@SpecialProp           |

{{< /sheet >}}

{{< /spreadsheet >}}

带排序的示例：*HelloWorld.xlsx* 中的两个工作表 *ItemConf* 和 *ShopConf*，
使用 `<>` 语法对结果数组进行排序：

- *ItemConf*：有序索引结果按 `Name` 列排序。
- *ShopConf*：有序索引结果按 `Type` 和 `ID` 列排序。

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

{{< sheet colored1 >}}

| Sheet    | OrderedIndex                                                           |     |
| -------- | ---------------------------------------------------------------------- | --- |
| ItemConf | ID<Name>@Item, (ID,Name)<Name>@SpecialItem                             |     |
| ShopConf | ID<Type,ID>@Shop, (ID,Type)<Type,ID>@SpecialShop, (ID,Type)<Type>@Shop |     |

{{< /sheet >}}

{{< /spreadsheet >}}

### 单列有序索引

格式：`Column<ColumnX,ColumnY,...>@IndexName`。

`@` 是列名和索引名之间的分隔符。如果未设置 `IndexName`，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 `<>` 中的列指定排序列，相同索引的**结果数组**按排序列的值排序。

示例：

- `ID`
- `ID@Item`
- `ID<ID>@Item`：结果数组按 ID 排序。
- `ID<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

带排序的示例：*HelloWorld.xlsx* 中的工作表 *ItemConf*，使用 `<>` 语法对结果数组进行排序：

- `ID<Name>@Item`：对 `ID` 列建立单列有序索引，结果数组按 `Name` 排序。

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Name        | Desc                          |
| ---------------- | ----------- | ----------------------------- |
| map<int32, Item> | string      | string                        |
| Item's ID        | Item's name | Item's desc                   |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | OrderedIndex  |
| -------- | ------------- |
| ItemConf | ID<Name>@Item |

{{< /sheet >}}

{{< /spreadsheet >}}

### 多列有序索引

格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。

多列有序索引（又称复合有序索引）由同一结构体（列表或映射中）的**多列**组成，以提高查询速度，查询结果以**有序数组**形式返回。

`@` 是括号内列名和索引名之间的分隔符。如果未设置 `IndexName`，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 `<>` 中的列指定排序列，相同索引的**结果数组**按排序列的值排序。

示例：

- `(ID,Name)`：未设置索引名，由父结构体类型名决定。
- `(ID,Name)@AwardItem`
- `(ID,Name)<ID>`：结果数组按 ID 排序。
- `(ID,Type)<Type>@Shop`：结果数组按 Type 排序。
- `(ID,Type)<Type,Priority>@Item`：结果数组按 Type 和 Priority 排序。
- `ID@Item, (ID,Name)@AwardItem`：一个单列有序索引和一个多列有序索引。

#### 示例：多列有序索引

*HelloWorld.xlsx* 中的两个工作表 *ItemConf* 和 *ShopConf*：

- *ItemConf*：对 **map value** 同一结构体的列建立多列有序索引。
- *ShopConf*：对 **list element** 同一结构体的列建立多列有序索引。

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

{{< sheet colored1 >}}

| Sheet    | OrderedIndex                                |
| -------- | ------------------------------------------- |
| ItemConf | (ID,Name)@SpecialItem                       |
| ShopConf | (ID,Type)@SpecialShop, (ID,Type)<Type>@Shop |

{{< /sheet >}}

{{< /spreadsheet >}}

#### 示例：多列有序索引使用 `<>` 语法

*HelloWorld.xlsx* 中的工作表 *ShopConf*，使用 `<>` 语法对结果数组进行排序：

- `(ID,Type)<Type>@Shop`：对 `(ID, Type)` 列建立多列有序索引，结果数组按 `Type` 排序。
- `(ID,Type)<Type,ID>@SpecialShop`：对 `(ID, Type)` 列建立多列有序索引，结果数组按 `Type` 然后 `ID` 排序。

{{< spreadsheet "HelloWorld.xlsx" ShopConf "@TABLEAU" >}}

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

| Sheet    | OrderedIndex                                         |
| -------- | ---------------------------------------------------- |
| ShopConf | (ID,Type)<Type>@Shop, (ID,Type)<Type,ID>@SpecialShop |

{{< /sheet >}}

{{< /spreadsheet >}}

## 选项 `Patch`

```protobuf
// 工作表和字段级别的 Patch 类型。
enum Patch {
  PATCH_NONE = 0;
  // 1 工作表 patch 选项 "PATCH_REPLACE"
  //   - 替换整个 message
  // 2 顶层字段 patch 选项 "PATCH_REPLACE"
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

**工作表**的分隔符，用于分隔：

- 单元格内列表元素（标量或结构体）。
- 单元格内映射元素。

如果未设置，将使用 [Tableauc 配置](../../prologue/config/#protoinputheadersep) 中的**全局级别**分隔符（默认：`,`）。

## 选项 `Subsep`

**工作表**的子分隔符，用于分隔：

- 每个单元格内映射元素的键值对。
- 每个单元格内结构体列表元素的结构体字段。

如果未设置，将使用 [Tableauc 配置](../../prologue/config/#protoinputheadersubsep) 中的**全局级别**子分隔符（默认：`:`）。

## 选项 `Validate`

Tableau 集成了 [protovalidate](https://github.com/bufbuild/protovalidate)，
可以直接在表格中声明校验规则。选项 `Validate` 是字段级
[`validate_message`]({{< relref "field-property/#选项-validate_message" >}})
选项在**工作表/messager 级别**的对应版本。它会被编译为生成工作表对应 proto
message 上的 [`(buf.validate.message)`](https://buf.build/bufbuild/protovalidate)
选项，并在 tableau 生成配置时强制执行。

其值为 [`buf.validate.MessageRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.MessageRules)
的 [protobuf text format](https://protobuf.dev/reference/protobuf/textformat-spec/)
表示，通常包含一个或多个 `cel_expression`（或 `cel`）项。CEL 表达式中的 `this`
指代整张工作表对应的顶层 message 实例。

`Validate` 也支持在以下 `Mode` 的工作表上使用：

- `MODE_STRUCT_TYPE` / `MODE_STRUCT_TYPE_MULTI`
- `MODE_UNION_TYPE` / `MODE_UNION_TYPE_MULTI`

例如，*HelloWorld.xlsx* 中的元表 `@TABLEAU`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name      |
| ----------------- | --------- |
| map<uint32, Item> | string    |
| Item ID           | Item Name |
| 1                 | Apple     |
| 2                 | Orange    |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | Validate                                    |
| -------- | ------------------------------------------- |
| ItemConf | `cel_expression:"this.item_map.size() > 0"` |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "buf/validate/validate.proto";

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};
  option (buf.validate.message) = {cel_expression:"this.item_map.size() > 0"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}
