---
title: "List"
description: "Excel list guide."
lead: "This guide demonstrates different features of excel list type."
date: 2022-02-26T13:59:39+08:00
lastmod: 2025-04-12T13:59:39+08:00
draft: false
images: []
weight: 7105
toc: true
---


## Horizontal list

NOTE: Column name of horizontal list **MUST** have a digit suffix which started at `1`.

Overview of horizontal list syntax:

| List element type                                                     | Syntax example                  |
| --------------------------------------------------------------------- | ------------------------------- |
| [scalar](#horizontal-scalar-list)                                     | `[]uint32`                      |
| [enum](#horizontal-enum-list)                                         | `[]enum<.FruiteType>`           |
| [struct](#horizontal-struct-list)                                     | `[Item]uint32`                  |
| [predefined struct](#horizontal-predefined-struct-list)               | `[.Item]uint32`                 |
| [incell struct](#horizontal-incell-struct-list)                       | `[]{uint32 ID, string Num}Item` |
| [incell predefined struct](#horizontal-incell-predefined-struct-list) | `[]{.Item}`                     |
{.table-striped .table-hover}

### Horizontal scalar list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

Generated:

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

### Horizontal enum list

`FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

Generated:

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

### Horizontal struct list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

Generated:

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

### Horizontal predefined-struct list

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

Generated:

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

### Horizontal incell-struct list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1                         | Item2        | Item3        |
| ----------------------------- | ------------ | ------------ |
| []{int32 ID, string Name}Item | Item         | Item         |
| Item1's info                  | Item2's info | Item3's info |
| 1,Apple                       | 2,Orange     | 3,Banana     |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Horizontal incell-predefined-struct list

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1      | Reward2      | Reward3      |
| ------------ | ------------ | ------------ |
| []{.Item}    | .Item        | .Item        |
| Item1's info | Item2's info | Item3's info |
| 1,100        | 2,200        | 3,300        |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

## Vertical list

NOTE: Column name of horizontal list **MUST NOT** have a digit suffix which started at `1`.

Overview of horizontal list syntax:

> TODO: table form

### Vertical scalar list

> It's defined same as [Incell scalar list](#incell-scalar-list), but will aggregate multiple rows if provided.

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Vertical enum list

> It's defined same as [Incell enum list](#incell-enum-list), but will aggregate multiple rows if provided.

`FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Vertical struct list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Vertical predefined-struct list

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Vertical incell-struct list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item                       |
| -------------------------- |
| []{int32 ID,int32 Num}Item |
| Item list                  |
| 1:100                      |
| 2:200,3:300                |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Vertical incell-predefined-struct list

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item        |
| ----------- |
| []{.Item}   |
| Item's info |
| 1:100       |
| 2:200,3:300 |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

## Incell list

NOTE: Column name of horizontal list **MUST NOT** have a digit suffix which started at `1`.

Overview of incell list syntax:

> TODO: table form

There are 4 kinds of incell list:

1. Incell **scalar** list, each element type is scalar. E.g: `[]int32`.
2. Incell **enum** list, each element type is enum. E.g: `[]enum<.FruitType>`.
3. Incell **struct** list, each element type is struct. E.g: `[]{int32 ID,int32 Num}Item`.
4. Incell **predefined-struct** list, each element type is predefined struct. E.g.: `[]{.Item}`.

### Incell scalar list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

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

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

The `Param` column's type is incell list `[]int32`, as the list element is scalar type `int32`.

Generated:

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

### Incell enum list

`FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Param                      |
| -------------------------- |
| []enum<.FruitType>         |
| Param list                 |
| 1,FRUIT_TYPE_ORANGE,Banana |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

The `Param` column's type is incell list `[]enum<.FruitType>`, as the list element is the predefined enum type `FruitType`.

Generated:

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

### Incell struct list

> For more advanced incell data parsing, see [Advanced predefined incell struct →]({{< relref "struct/#advanced-predefined-incell-struct" >}}).

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item                       |
| -------------------------- |
| []{int32 ID,int32 Num}Item |
| Item's info                |
| 1:100,2:200,3:300          |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

### Incell predefined-struct list

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item              |
| ----------------- |
| []{.Item}         |
| Item's info       |
| 1:100,2:200,3:300 |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

## Horizontal list size

### Dynamic size

By default, all lists are **Dynamically Sized Types**. List elements should be present continuously, otherwise an error is reported if an empty element is existed in between.

### Fixed size

#### Implicit fixed size

The list size is auto resolved by the max present list elements in name row.

In this example below, though the second element **Item2** is empty, it is legal as the field property `fixed` is set `true`. Besides, **Item2** will also be generated as an empty element. You can see it in the generated file *ItemConf.json*.

A worksheet `ItemConf` in *HelloWorld.xlsx*.

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                    | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| :------------------------- | :----------- | :--------- | :----------- | :--------- | :----------- |
| [Item]uint32\|{fixed:true} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                 | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                          | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

#### Explicit fixed size

The list size is explicitly set by field property `size`.

In this example below, field property `size` is set as 2, then list elements after the second element **Item2** will all be truncated. Besides, **Item2** will also be generated as an empty element. You can see it in the generated file *ItemConf.json*.

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ---------------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| [Item]uint32\|{size:2} | string       | uint32     | string       | uint32     | string       |
| Item1's ID             | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                      | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

## Advanced features

### Horizontal column-skipped list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| D                 | Prop1ID     |              | Prop1Value    | Prop2ID    |              | Prop2Value    |
| :---------------- | :---------- | :----------- | :------------ | :--------- | :----------- | :------------ |
| map<uint32, Item> | [Prop]int32 |              | int32         | int32      |              | int32         |
| Item's ID         | Prop1’s ID  | Prop1’s name | Prop1’s value | Prop2’s ID | Prop2’s name | Prop2’s value |
| 1                 | 1           | Apple        | 100           | 2          | Orange       | 200           |
| 2                 | 3           | Banana       | 300           | 4          | Pomelo       | 400           |
| 3                 | 5           | Watermelon   | 500           |            |              |               |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

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

{{< details "HeroConf.json" >}}

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
