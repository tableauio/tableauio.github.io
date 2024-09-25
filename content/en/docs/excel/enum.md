---
title: "Enum"
description: "Enum features."
lead: "This guide demonstrates different features of Enum type."
date: 2024-09-24T14:00:00+08:00
lastmod: 2024-09-24T14:00:00+08:00
draft: false
images: []
weight: 7102
toc: true
---

## Use predefined enum type

The basic enum guide, please go to read [Enum →]({{< relref "enum" >}})

For example, enum type `FruitType` in `common.proto` is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Type              |
| ----------------- | ----------------- |
| map<uint32, Item> | enum<.FruitType>  |
| Item's ID         | Fruit's type      |
| 1                 | 1                 |
| 2                 | Orange            |
| 3                 | FRUIT_TYPE_BANANA |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    FruitType type = 2 [(tableau.field) = {name:"Type"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id":  1,
            "type":  "FRUIT_TYPE_APPLE"
        },
        "2":  {
            "id":  3,
            "type":  "FRUIT_TYPE_ORANGE"
        }
        "3":  {
            "id":  2,
            "type":  "FRUIT_TYPE_BANANA"
        },
    }
}
```

{{< /details >}}

## Define enum type in sheet

### Simple example

A worksheet `ItemType` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| Name            | Alias |
| --------------- | ----- |
| ITEM_TYPE_FRUIT | Fruit |
| ITEM_TYPE_EQUIP | Equip |
| ITEM_TYPE_BOX   | Box   |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: ItemType.
enum ItemType {
  ITEM_TYPE_INVALID = 0;
  ITEM_TYPE_FRUIT = 1 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 2 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 3 [(tableau.evalue).name = "Box"];
}
```

{{< /details >}}

### Specify Number column

A worksheet `ItemType` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType "@TABLEAU" >}}

{{< sheet colored>}}

| Number | Name              | Alias   |
| ------ | ----------------- | ------- |
| 0      | ITEM_TYPE_UNKNOWN | Unknown |
| 10     | ITEM_TYPE_FRUIT   | Fruit   |
| 20     | ITEM_TYPE_EQUIP   | Equip   |
| 30     | ITEM_TYPE_BOX     | Box     |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Mode           |
| -------- | -------------- |
| ItemType | MODE_TYPE_ENUM |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: ItemType.
enum ItemType {
  ITEM_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  ITEM_TYPE_FRUIT = 10 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 20 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 30 [(tableau.evalue).name = "Box"];
}
```

{{< /details >}}

## Define and use enum type in sheet

Two worksheets `ItemType` and `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Name            | Alias |
| --------------- | ----- |
| ITEM_TYPE_FRUIT | Fruit |
| ITEM_TYPE_EQUIP | Equip |
| ITEM_TYPE_BOX   | Box   |

{{< /sheet >}}

{{< sheet >}}

| ID               | Type            | Name        | Price        |
| ---------------- | --------------- | ----------- | ------------ |
| map<int32, Item> | enum<.ItemType> | string      | int32        |
| Item’s ID        | Item’s type     | Item’s name | Item’s price |
| 1                | Fruit           | Apple       | 40           |
| 2                | Fruit           | Orange      | 20           |
| 3                | Equip           | Sword       | 10           |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Mode           |
| -------- | -------------- |
| ItemType | MODE_TYPE_ENUM |
| ItemConf |                |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: ItemType.
enum ItemType {
  ITEM_TYPE_INVALID = 0;
  ITEM_TYPE_FRUIT = 1 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 2 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 3 [(tableau.evalue).name = "Box"];
}

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.ItemType type = 2 [(tableau.field) = {name:"Type"}];
    string name = 3 [(tableau.field) = {name:"Name"}];
    int32 price = 4 [(tableau.field) = {name:"Price"}];
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
            "type": "ITEM_TYPE_FRUIT",
            "name": "Apple",
            "price": 40
        },
        "2": {
            "id": 2,
            "type": "ITEM_TYPE_FRUIT",
            "name": "Orange",
            "price": 20
        },
        "3": {
            "id": 3,
            "type": "ITEM_TYPE_EQUIP",
            "name": "Sword",
            "price": 10
        }
    }
}
```

{{< /details >}}
