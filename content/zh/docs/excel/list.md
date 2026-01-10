---
title: "列表"
description: "Excel 列表指南。"
lead: "本指南演示 Excel 列表类型的不同特性。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7105
toc: true
---

## 水平列表

注意：水平列表的列名**必须**有一个从 `1` 开始的数字后缀。

水平列表语法概述：

| 列表元素类型                                                     | 语法示例                  |
| --------------------------------------------------------------------- | ------------------------------- |
| [标量](#horizontal-scalar-list)                                     | `[]uint32`                      |
| [枚举](#horizontal-enum-list)                                         | `[]enum<.FruitType>`           |
| [结构体](#horizontal-struct-list)                                     | `[Item]uint32`                  |
| [预定义结构体](#horizontal-predefined-struct-list)               | `[.Item]uint32`                 |
| [单元格内结构体](#horizontal-incell-struct-list)                       | `[]{uint32 ID, string Num}Item` |
| [单元格内预定义结构体](#horizontal-incell-predefined-struct-list) | `[]{.Item}`                     |
{.table-striped .table-hover}

### 水平标量列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID1         | ID2         | ID3         |
| ----------- | ----------- | ----------- |
| []uint32    | uint32      | uint32      |
| ID1's value | ID2's value | ID3's value |
| 1           | 2           | 3           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated uint32 id_list = 1 [(tableau.field) = {name:"ID" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "idList": [
        1,
        2,
        3
    ]
}
```

{{< /details >}}

### 水平枚举列表

`common.proto` 中的 `FruitType` 预定义为：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Param1             | Param2            | Param3           |
| ------------------ | ----------------- | ---------------- |
| []enum<.FruitType> | enum<.FruitType>  | enum<.FruitType> |
| Param1's value     | Param2's value    | Param3's value   |
| 1                  | FRUIT_TYPE_ORANGE | Banana           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.FruitType param_list = 1 [(tableau.field) = {name:"Param" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "paramList": [
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_BANANA"
    ]
}
```

{{< /details >}}

### 水平结构体列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID      | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ------------ | ------------ | ---------- | ------------ | ---------- | ------------ |
| [Item]uint32 | string       | uint32     | string       | uint32     | string       |
| Item1's ID   | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1            | Apple        | 2          | Orange       | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id":1,
            "name": "Apple"
        },
        {
            "id": 2,
            "name": "Orange"
        },
        {
            "id": 3,
            "name": "Banana"
        }
    ]
}
```

{{< /details >}}

### 水平预定义结构体列表

`common.proto` 中的 `Item` 预定义为：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID      | Item1Num    | Item2ID    | Item2Num    | Item3ID    | Item3Num    |
| ------------ | ----------- | ---------- | ----------- | ---------- | ----------- |
| [.Item]int32 | int32       | int32      | int32       | int32      | int32       |
| Item1's ID   | Item1's num | Item2's ID | Item3's num | Item3's ID | Item3's num |
| 1            | 100         | 2          | 200         | 3          | 300         |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "ItemList": [
        {
            "id":1,
            "num": 100
        },
        {
            "id": 2,
            "num": 200
        },
        {
            "id": 3,
            "num": 300
        }
    ]
}
```

{{< /details >}}
