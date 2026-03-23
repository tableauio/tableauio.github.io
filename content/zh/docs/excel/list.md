---
title: "List（列表）"
description: "列表使用指南。"
lead: "List（列表）是一种有序且长度可变的容器，主要用于存储和管理一组顺序相关、允许重复的数据。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2025-04-12T13:59:39+08:00
draft: false
images: []
weight: 7105
toc: true
---

## 水平列表（Horizontal list）

> [!IMPORTANT]
> 水平 list 的列名中，列表元素名**必须**带有从 `1` 开始的数字后缀。
>
> 例如：`Item1ID`、`Item2ID`、`Item3ID`（struct list，元素名：`Item`）；`ID1`、`ID2`、`ID3`（scalar list，元素名：`ID`）。

水平列表语法概览：

| List 元素类型                                             | 语法示例                        |
| --------------------------------------------------------- | ------------------------------- |
| [scalar](#水平标量列表)                                   | `[]uint32`                      |
| [enum](#水平枚举列表)                                     | `[]enum<.FruitType>`            |
| [struct](#水平结构体列表)                                 | `[Item]uint32`                  |
| [predefined struct](#水平预定义结构体列表)                | `[.Item]uint32`                 |
| [incell struct](#水平单元格内结构体列表)                  | `[]{uint32 ID, string Num}Item` |
| [incell predefined struct](#水平单元格内预定义结构体列表) | `[]{.Item}`                     |
{.table-striped .table-hover}

### 水平标量列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID1         | ID2         | ID3         |
| ----------- | ----------- | ----------- |
| []uint32    | uint32      | uint32      |
| ID1's value | ID2's value | ID3's value |
| 1           | 2           | 3           |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

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

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Param1             | Param2            | Param3           |
| ------------------ | ----------------- | ---------------- |
| []enum<.FruitType> | enum<.FruitType>  | enum<.FruitType> |
| Param1's value     | Param2's value    | Param3's value   |
| 1                  | FRUIT_TYPE_ORANGE | Banana           |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

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

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID      | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ------------ | ------------ | ---------- | ------------ | ---------- | ------------ |
| [Item]uint32 | string       | uint32     | string       | uint32     | string       |
| Item1's ID   | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1            | Apple        | 2          | Orange       | 3          | Banana       |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

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
            "id": 1,
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

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID      | Item1Num    | Item2ID    | Item2Num    | Item3ID    | Item3Num    |
| ------------ | ----------- | ---------- | ----------- | ---------- | ----------- |
| [.Item]int32 | int32       | int32      | int32       | int32      | int32       |
| Item1's ID   | Item1's num | Item2's ID | Item3's num | Item3's ID | Item3's num |
| 1            | 100         | 2          | 200         | 3          | 300         |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

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
            "id": 1,
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

### 水平单元格内结构体列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1                         | Item2        | Item3        |
| ----------------------------- | ------------ | ------------ |
| []{int32 ID, string Name}Item | Item         | Item         |
| Item1's info                  | Item2's info | Item3's info |
| 1,Apple                       | 2,Orange     | 3,Banana     |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL span:SPAN_INNER_CELL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
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
            "id": 1,
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

### 水平单元格内预定义结构体列表

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1      | Reward2      | Reward3      |
| ------------ | ------------ | ------------ |
| []{.Item}    | .Item        | .Item        |
| Item1's info | Item2's info | Item3's info |
| 1,100        | 2,200        | 3,300        |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item reward_list = 1 [(tableau.field) = {name:"Reward" layout:LAYOUT_HORIZONTAL span:SPAN_INNER_CELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardList": [
        {
            "id": 1,
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

## 垂直列表（Vertical list）

垂直列表语法概览：

| List 元素类型                                             | 语法示例                     |
| --------------------------------------------------------- | ---------------------------- |
| [scalar](#垂直标量列表)                                   | `[]uint32`                   |
| [enum](#垂直枚举列表)                                     | `[]enum<.FruitType>`         |
| [struct](#垂直结构体列表)                                 | `[Item]uint32`               |
| [predefined struct](#垂直预定义结构体列表)                | `[.Item]int32`               |
| [incell struct](#垂直单元格内结构体列表)                  | `[]{int32 ID,int32 Num}Item` |
| [incell predefined struct](#垂直单元格内预定义结构体列表) | `[]{.Item}`                  |
{.table-striped .table-hover}

### 垂直标量列表

> [!NOTE]
> 定义方式与 [Incell scalar list](#incell-scalar-list) 相同，但如果提供了多行数据，会聚合多行。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID       |
| -------- |
| []uint32 |
| ID       |
| 1,2,3    |
| 1,2      |
| 1        |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated uint32 id_list = 1 [(tableau.field) = {name:"ID" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "idList": [
        1,
        2,
        3,
        1,
        2,
        1
    ]
}
```

{{< /details >}}

### 垂直枚举列表

> [!NOTE]
> 定义方式与 [Incell enum list](#incell-enum-list) 相同，但如果提供了多行数据，会聚合多行。

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Type                               |
| ---------------------------------- |
| []enum\<.FruitType\>               |
| Type                               |
| Apple,Orange,Banana                |
| FRUIT_TYPE_APPLE,FRUIT_TYPE_ORANGE |
| 1                                  |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.FruitType type_list = 1 [(tableau.field) = {name:"Type" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "typeList": [
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_BANANA",
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_APPLE"
    ]
}
```

{{< /details >}}

### 垂直结构体列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Name        | Desc                          |
| ------------ | ----------- | ----------------------------- |
| [Item]uint32 | string      | string                        |
| Item's ID    | Item's name | Item's desc                   |
| 1            | Apple       | A kind of delicious fruit.    |
| 2            | Orange      | A kind of sour fruit.         |
| 3            | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id": 1,
            "name": "Apple",
            "desc": "A kind of delicious fruit."
        },
        {
            "id": 2,
            "name": "Orange",
            "desc": "A kind of sour fruit."
        },
        {
            "id": 3,
            "name": "Banana",
            "desc": "A kind of calorie-rich fruit."
        }
    ]
}
```

{{< /details >}}

### 垂直预定义结构体列表

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Num        |
| ------------ | ---------- |
| [.Item]int32 | int32      |
| Item's ID    | Item's num |
| 1            | 100        |
| 2            | 200        |
| 3            | 300        |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item _item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "ItemList": [
        {
            "id": 1,
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

### 垂直单元格内结构体列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item                       |
| -------------------------- |
| []{int32 ID,int32 Num}Item |
| Item list                  |
| 1:100                      |
| 2:200,3:300                |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id": 1,
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

### 垂直单元格内预定义结构体列表

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item        |
| ----------- |
| []{.Item}   |
| Item's info |
| 1:100       |
| 2:200,3:300 |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id": 1,
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

## 单元格内列表（Incell list）

单元格内列表语法概览：

| List 元素类型                                         | 语法示例                     |
| ----------------------------------------------------- | ---------------------------- |
| [scalar](#单元格内标量列表)                           | `[]int32`                    |
| [enum](#单元格内枚举列表)                             | `[]enum<.FruitType>`         |
| [incell struct](#单元格内结构体列表)                  | `[]{int32 ID,int32 Num}Item` |
| [incell predefined struct](#单元格内预定义结构体列表) | `[]{.Item}`                  |
{.table-striped .table-hover}

### 单元格内标量列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Param      |
| ---------- |
| []int32    |
| Param list |
| 1,2,3      |
| 4,5        |
| 6          |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

`Param` 列的类型为 incell list `[]int32`，list 元素为 scalar 类型 `int32`。

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated int32 param_list = 1 [(tableau.field) = {name:"Param" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "paramList": [
        1,
        2,
        3,
        4,
        5,
        6
    ]
}
```

{{< /details >}}

### 单元格内枚举列表

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Param                      |
| -------------------------- |
| []enum<.FruitType>         |
| Param list                 |
| 1,FRUIT_TYPE_ORANGE,Banana |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

`Param` 列的类型为 incell list `[]enum<.FruitType>`，list 元素为预定义枚举类型 `FruitType`。

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.FruitType param_list = 1 [(tableau.field) = {name:"Param" layout:LAYOUT_INCELL}];
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

### 单元格内结构体列表

> [!NOTE]
> 更高级的 incell 数据解析，请参考 [高级 predefined incell struct]({{< relref "struct/#advanced-predefined-incell-struct" >}})。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item                       |
| -------------------------- |
| []{int32 ID,int32 Num}Item |
| Item's info                |
| 1:100,2:200,3:300          |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id": 1,
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

### 单元格内预定义结构体列表

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item              |
| ----------------- |
| []{.Item}         |
| Item's info       |
| 1:100,2:200,3:300 |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
        {
            "id": 1,
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

## 水平列表大小

### 动态大小

默认情况下，所有 list 都是**动态大小类型**。List 元素应连续存在，否则如果中间存在空元素会报错。

### 固定大小

#### 隐式固定大小

List 大小由名称行中最大存在的 list 元素数量自动确定。

在下面的示例中，虽然第二个元素 **Item2** 为空，但由于 field property `fixed` 设置为 `true`，这是合法的。此外，**Item2** 也会作为空元素生成，可以在生成的 *ItemConf.json* 文件中看到。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                    | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| :------------------------- | :----------- | :--------- | :----------- | :--------- | :----------- |
| [Item]uint32\|{fixed:true} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                 | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                          | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL prop:{fixed:true}}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "itemList":  [
        {
            "id":  1,
            "name":  "Apple"
        },
        {
            "id":  0,
            "name":  ""
        },
        {
            "id":  3,
            "name":  "Banana"
        }
    ]
}
```

{{< /details >}}

#### 显式固定大小

List 大小由 field property `size` 显式设置。

在下面的示例中，field property `size` 设置为 2，则第二个元素 **Item2** 之后的所有 list 元素都会被截断。此外，**Item2** 也会作为空元素生成，可以在生成的 *ItemConf.json* 文件中看到。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ---------------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| [Item]uint32\|{size:2} | string       | uint32     | string       | uint32     | string       |
| Item1's ID             | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                      | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL prop:{size:2}}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "itemList":  [
        {
            "id":  1,
            "name":  "Apple"
        },
        {
            "id":  0,
            "name":  ""
        }
    ]
}
```

{{< /details >}}

## 高级特性

### 水平跳列列表

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| D                 | Prop1ID     |              | Prop1Value    | Prop2ID    |              | Prop2Value    |
| :---------------- | :---------- | :----------- | :------------ | :--------- | :----------- | :------------ |
| map<uint32, Item> | [Prop]int32 |              | int32         | int32      |              | int32         |
| Item's ID         | Prop1's ID  | Prop1's name | Prop1's value | Prop2's ID | Prop2's name | Prop2's value |
| 1                 | 1           | Apple        | 100           | 2          | Orange       | 200           |
| 2                 | 3           | Banana       | 300           | 4          | Pomelo       | 400           |
| 3                 | 5           | Watermelon   | 500           |            |              |               |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated Prop prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
    message Prop {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 value = 2 [(tableau.field) = {name:"Value"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "propList": [
                {
                    "id": 1,
                    "value": 100
                },
                {
                    "id": 2,
                    "value": 200
                }
            ]
        },
        "2": {
            "id": 2,
            "propList": [
                {
                    "id": 3,
                    "value": 300
                },
                {
                    "id": 4,
                    "value": 400
                }
            ]
        },
        "3": {
            "id": 3,
            "propList": [
                {
                    "id": 5,
                    "value": 500
                }
            ]
        }
    }
}
```

{{< /details >}}
