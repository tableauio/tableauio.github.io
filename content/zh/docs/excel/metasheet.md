---
title: "元数据表"
description: "Excel 元数据表 @TABLEAU 指南。"
lead: "元数据表是一个名为 \"@TABLEAU\" 的工作表，用于指定 tableau 解析器的工作表级别选项。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7902
toc: true
---

## 概述

以下选项可以在元数据表 `@TABLEAU` 中指定，以影响相应工作表的布局、能力、加载器等。

| 选项                   | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Sheet`                  | string              | 要处理的工作表名称。特别地，`#` 引用工作簿名称，因此您可以设置工作簿的 `Alias`。                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Alias`                  | string              | 对于工作表，别名用作 proto 消息名称。对于工作簿 `#`，别名用作 proto 文件名（不带文件扩展名）。                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Namerow`                | int32               | 工作表中列名定义的确切行号。<br>默认值：`1`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Typerow`                | int32               | 工作表中列类型定义的确切行号。<br>默认值：`2`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Noterow`                | int32               | 工作表中列注释定义的确切行号。<br>默认值：`3`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Datarow`                | int32               | 工作表中数据开始的行号。<br>默认值：`4`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Nameline`               | int32               | 单元格中列名定义的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Typeline`               | int32               | 单元格中列类型定义的行号。`0` 表示整个单元格。<br>默认值：`0`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Transpose`              | bool                | 交换给定工作表的行和列。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Nested`                 | bool                | **namerow** 的嵌套命名。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Sep`                    | string              | 工作表级别分隔符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Subsep`                 | string              | 工作表级别子分隔符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Merger`                 | []string            | 将多个工作表（逗号分隔）合并为一个具有相同结构的工作表。 <br> 每个元素可以是：<br> - 只是一个工作簿文件路径或 glob 路径（相对于此工作簿）：`<Workbook>`，然后工作表名称与此工作表相同。<br> - 一个工作簿文件路径（相对于此工作簿）和一个工作表名称：`<Workbook>#<Worksheet>`。                                                                                                                                                                                                                     |
| `AdjacentKey`            | bool                | 合并具有相同键的相邻行。如果未设置键单元格，则将其视为与同一列中最接近的键相同。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                                                                                                                           |
| `FieldPresence`          | bool                | 为了跟踪基本类型（数字、字符串、字节和枚举）的字段存在性，生成的字段将被标记为 `optional`。<br>默认值：`false`。                                                                                                                                                                                                                                                                                                                                                                                                               |
| `Mode`                   | Mode                | 工作表模式。 <br> 可用模式： <br> - `MODE_ENUM_TYPE` <br> - `MODE_ENUM_TYPE_MULTI` <br> - `MODE_STRUCT_TYPE` <br> - `MODE_STRUCT_TYPE_MULTI` <br> - `MODE_UNION_TYPE`<br> - `MODE_UNION_TYPE_MULTI`                                                                                                                                                                                                                                                                                                                                                               |
| `Scatter`                | []string            | 使用相同的架构分别转换多个工作表。 <br> 每个元素可以是： <br> - 一个工作簿名称或相对于此工作簿的 Glob：`<Workbook>`，然后工作表名称与此工作表相同。 <br> - 或一个相对于此工作簿的工作簿名称和一个工作表名称：`<Workbook>#<Worksheet>`。                                                                                                                                                                                                                                           |
| `Optional`               | bool                | 此工作表中的所有字段是否都是可选的（字段名称存在性）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Patch`                  | Patch               | 工作表修补类型。  <br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `WithParentDir`          | bool                | confgen：导出 JSON/Bin/Text 文件时创建父目录。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ScatterWithoutBookName` | bool                | confgen(scatter)：导出 JSON/Bin/Text 文件名时不带工作簿名称前缀。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OrderedMap`             | bool                | 是否生成 OrderedMap 访问器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Index`                  | []string            | 生成索引访问器。 <br> - 单列索引格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列索引格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                                                                                                                                                                         |
| `OrderedIndex`           | []string            | 生成 OrderedIndex 访问器。 <br> - 单列 OrderedIndex 格式：`Column<ColumnX,ColumnY,...>@IndexName`。<br> - 多列 OrderedIndex 格式：`(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`。                                                                                                                                                                                                                                                                                                                                                    |
| `LangOptions`            | map<string, string> | 指定加载器语言选项。 <br> 有效键为：`OrderedMap`、`Index`。 <br> 不同的键值对必须用 `,` 分隔，一个键值必须用 `:` 分隔。 <br> 如果一个键在字典中不存在，则表示此加载器选项在所有语言中都受支持。 <br> 有效值为 `cpp`、`go` 的所有组合，以空格作为分隔符。 <br> 示例： <br> - `OrderedMap:cpp,Index:cpp go` // cpp 中支持有序字典，cpp 和 go 中支持索引 <br> - `OrderedMap:cpp` // cpp 中支持有序字典，所有语言中都支持索引 |
{.table-striped .table-hover}

## 空的 `@TABLEAU`

如果元数据表 `@TABLEAU` 为空，则同一工作簿中的所有其他工作表都将被处理。

## 一个简单的示例

*HelloWorld.xlsx* 中有一个工作表 `Sheet1`，我们想将工作表重命名为
`ItemConf`，定义自定义分隔符为 `|`，并生成有序字典访问器。

因此，*HelloWorld.xlsx* 中的元数据表 `@TABLEAU` 应配置为：

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

## 工作簿 `Alias`

生成的 proto 文件名是输入文件名的 snake case。例如，如果您有一个名为 *HelloWorld.xlsx* 的工作簿，生成的 proto 文件名是 *hello_world.proto*。如果您想为生成的 proto 文件手动指定名称，也可以使用 `Alias` 选项。在这种情况下，`#` 引用工作簿名称。

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

{{< sheet >}}

| Sheet  | Alias       |
| ------ | ----------- |
| #      | custom_conf |
| Sheet1 | ItemConf    |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

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

工作表模式定义 tableauc (protogen) 如何解析工作表：数据或类型。

可用模式：

- `MODE_DEFAULT`：默认模式，定义工作表的数据结构。
- `MODE_ENUM_TYPE`：在工作表中定义单个枚举类型，请参阅 [示例](../enum/#single-enum-type-in-sheet)。
- `MODE_ENUM_TYPE_MULTI`：在工作表中定义多个枚举类型，请参阅 [示例](../enum/#multiple-enum-types-in-sheet)。
- `MODE_STRUCT_TYPE`：在工作表中定义单个结构体类型，请参阅 [示例](../struct/#single-struct-type-in-sheet)。
- `MODE_STRUCT_TYPE_MULTI`：在工作表中定义多个结构体类型，请参阅 [示例](../struct/#multiple-struct-types-in-sheet)。
- `MODE_UNION_TYPE`：在工作表中定义单个联合类型，请参阅 [示例](../union/#single-union-type-in-sheet)。
- `MODE_UNION_TYPE_MULTI`：在工作表中定义多个联合类型，请参阅 [示例](../union/#multiple-union-types-in-sheet)。

## 选项 `Transpose`

在线性代数中，矩阵的转置是沿其对角线翻转矩阵的运算符。同样，工作表（2D 矩阵）的转置意味着将其行转换为列，反之亦然。
