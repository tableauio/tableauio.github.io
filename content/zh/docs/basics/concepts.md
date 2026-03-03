---
title: "核心概念"
description: "Tableau 核心概念。"
lead: "Tableau 核心概念。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 8100
toc: true
---

## 术语

### 基础术语

| 术语         | 定义                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `Workbook`   | 一个 Excel 文件；或一组以相同前缀命名、用 `#` 分隔的 CSV 文件；或一个 XML 文件；或一个 YAML 文件。 |
| `Worksheet`  | Excel 文件中的一个 sheet；或一个 CSV 文件；或 XML 文件的根节点；或 YAML 文件中的一个文档。         |
| `Metasheet`  | 名为 `@TABLEAU` 的特殊 worksheet，用于指定 tableau 解析器选项。                                    |
| `Row`        | sheet 中的一行。                                                                                   |
| `Column`     | sheet 中的一列。                                                                                   |
| `Cell`       | 行与列的交叉点（单元格）。                                                                         |
| `In-cell`    | 单元格内部。                                                                                       |
| `Cross-cell` | 一行或一列中连续的多个单元格。                                                                     |
{.table-striped .table-hover}

### Worksheet 相关术语

| 术语        | 定义                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| `Namerow`   | worksheet 中列名定义所在的行号。<br>⚠️ 注意：同一 worksheet 中每个列名必须唯一！<br>默认值：`1`。         |
| `Typerow`   | worksheet 中列类型定义所在的行号。<br>默认值：`2`。                                                      |
| `Noterow`   | worksheet 中列注释所在的行号。<br>默认值：`3`。                                                          |
| `Datarow`   | worksheet 中数据起始行号。<br>默认值：`4`。                                                              |
| `Nameline`  | 单元格内列名定义所在的行号，`0` 表示整个单元格。<br>默认值：`0`。                                        |
| `Typeline`  | 单元格内列类型定义所在的行号，`0` 表示整个单元格。<br>默认值：`0`。                                      |
| `Sep`       | 分隔符，用于：<br>    1. 分隔 in-cell list 的元素。<br>    2. 分隔 in-cell map 的条目。<br>默认值：`,`。 |
| `Subsep`    | 子分隔符，用于分隔 in-cell map 的 Key-Value 对。<br>默认值：`:`。                                        |
| `Nested`    | **namerow** 的嵌套命名方式。<br>默认值：`false`。                                                        |
| `Layout`    | Incell（单元格内）、vertical（跨单元格纵向）或 horizontal（跨单元格横向）。                              |
| `Transpose` | 对指定 sheet 进行行列转置。                                                                              |
{.table-striped .table-hover}

## 与 Protoconf 的映射关系

| 术语        | Protoconf                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Workbook`  | 一个 protoconf（`.proto`）文件。                                                                                                               |
| `Worksheet` | protoconf 文件中的一个顶层 [message](https://developers.google.com/protocol-buffers/docs/proto3#simple)（名为 `@TABLEAU` 的 metasheet 除外）。 |
| `column`    | [message](https://developers.google.com/protocol-buffers/docs/proto3#simple) 中的一个字段。                                                    |

## 简单映射示例

### 输入：一个 Excel 文件

一个工作簿（*HelloWorld.xlsx*），包含两个数据 worksheet（`ItemConf` 和 `ActivityConf`）以及一个空的 tableau metasheet（`@TABLEAU`）。

{{< spreadsheet "HelloWorld.xlsx" ItemConf ActivityConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name         | Type         |
| ----------------- | ------------ | ------------ |
| map<uint32, Item> | string       | int32        |
| Item's ID.        | Item's name. | Item's type. |
| 1                 | item1        | 100          |
| 2                 | item2        | 200          |
| 3                 | item3        | 300          |

{{< /sheet >}}

{{< sheet colored>}}

| ID                    | Name             | Open              |
| --------------------- | ---------------- | ----------------- |
| map<uint32, Activity> | string           | bool              |
| Activity's ID.        | Activity's name. | Activity is open? |
| 1                     | activity1        | true              |
| 2                     | activity2        | false             |
| 3                     | activity3        |                   |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

### 输出：一个 protoconf 文件

一个 protoconf 文件（`hello_world.proto`），包含两个顶层 message（`ItemConf` 和 `ActivityConf`）。

{{< details "hello_world.proto" open >}}

```protobuf
syntax = "proto3";
package protoconf;
option go_package = "github.com/tableauio/demo/examples/helloworld/protoconf";

import "tableau/protobuf/tableau.proto";

option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 type = 3 [(tableau.field) = {name:"Type"}];
  }
}

message ActivityConf {
  option (tableau.worksheet) = {name:"ActivityConf"};

  map<uint32, Activity> activity_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Activity {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    bool open = 3 [(tableau.field) = {name:"Open"}];
  }
}
```

{{< /details >}}
