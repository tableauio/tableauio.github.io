---
title: "概念"
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

### 基础

| 术语         | 定义                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Workbook`   | 一个 excel 文件。<br> 一组使用相同前缀并用 `#` 分隔的 CSV 文件。<br>一个 XML 文件。<br>一个 YAML 文件。 |
| `Worksheet`  | excel 文件中的一个工作表。<br>一个 CSV 文件。<br>XML 文件的一个根节点。<br>YAML 文件中的一个文档。                   |
| `Metasheet`  | 一个名为 `@TABLEAU` 的工作表，用于指定 tableau 解析器选项。                                                        |
| `Row`        | 工作表中的一行。                                                                                                    |
| `Column`     | 工作表中的一列。                                                                                                 |
| `Cell`       | 行和列的交叉点。                                                                                |
| `In-cell`    | 单元格内部。                                                                                              |
| `Cross-cell` | 一行或一列的连续单元格。                                                                                 |
{.table-striped .table-hover}

### 工作表

| 术语        | 定义                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Namerow`   | 工作表中列名定义的确切行号。<br>⚠️ 注意：每个列名在工作表中必须唯一！<br>默认值：`1`。 |
| `Typerow`   | 工作表中列类型定义的确切行号。<br>默认值：`2`。                                                            |
| `Noterow`   | 工作表中列注释的确切行号。<br>默认值：`3`。                                                                       |
| `Datarow`   | 工作表中数据开始的行号。<br>默认值：`4`。                                                                              |
| `Nameline`  | 单元格中列名定义的行号。`0` 表示整个单元格。<br>默认值：`0`。                                        |
| `Typeline`  | 单元格中列类型定义的行号。`0` 表示整个单元格。<br>默认值：`0`。                                        |
| `Sep`       | 分隔符，用于：<br>    1. 分隔单元格内列表元素。 <br>    2. 分隔单元格内字典项。<br>默认值：`,`。                   |
| `Subsep`    | 子分隔符，用于分隔单元格内字典的键值对。<br>默认值：`:`。                                                               |
| `Nested`    | **namerow** 的嵌套命名。<br>默认值：`false`。                                                                                 |
| `Layout`    | 单元格内、垂直（跨单元格）或水平（跨单元格）。                                                                                |
| `Transpose` | 交换给定工作表的行和列。                                                                                   |
{.table-striped .table-hover}

## 字典到 Protoconf

| 术语        | Protoconf                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Workbook`  | 一个 protoconf(`.proto`) 文件。                                                                                                                                  |
| `Worksheet` | protoconf 文件中的一个顶层 [message](https://developers.google.com/protocol-buffers/docs/proto3#simple)，除了名为 `@TABLEAU` 的 tableau 元数据表。 |
| `column`    | [message](https://developers.google.com/protocol-buffers/docs/proto3#simple) 中的一个字段                                                                    |

## 一个简单的字典示例

### 输入：一个 excel 文件

一个工作簿(*HelloWorld.xlsx*)，包含两个数据工作表(`ItemConf` 和 `ActivityConf`)和一个空的 tableau 元数据表(`@TABLEAU`)。

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

### 输出：一个 protoconf 文件

一个 protoconf 文件(`hello_world.proto`)，包含两个顶层 message(`ItemConf` 和 `ActivityConf`)。

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
