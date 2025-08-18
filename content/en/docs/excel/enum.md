---
title: "Enum"
description: "Excel enum guide."
lead: "This guide demonstrates different features of excel enum type."
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

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

There are two kinds of `Mode` (in metasheet `@TABLEAU`) to define enum types in a sheet:

- `MODE_ENUM_TYPE`: define single enum type in a sheet.
- `MODE_ENUM_TYPE_MULTI`: define multiple enum types in a sheet.

### Single enum type in sheet

You should specify `Mode` option to `MODE_ENUM_TYPE` in metasheet `@TABLEAU`.

For example, a worksheet `ItemType` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType "@TABLEAU" >}}

{{< sheet >}}

| Name            | Alias |
| --------------- | ----- |
| ITEM_TYPE_FRUIT | Fruit |
| ITEM_TYPE_EQUIP | Equip |
| ITEM_TYPE_BOX   | Box   |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Mode           |
| -------- | -------------- |
| ItemType | MODE_ENUM_TYPE |

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

### Multiple enum types in sheet

> A block defines an enum type, and it is a series of contiguous non-empty rows.
> So different blocks are seperated by one or more empty rows.

You should specify `Mode` option to `MODE_ENUM_TYPE_MULTI` in metasheet `@TABLEAU`.

For example, a worksheet `ItemType` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType "@TABLEAU" >}}

{{< sheet >}}

| CatType              | CatType note              |            |
| -------------------- | ------------------------- | ---------- |
| Number               | Name                      | Alias      |
| 1                    | CAT_TYPE_RAGDOLL          | Ragdoll    |
| 2                    | CAT_TYPE_PERSIAN          | Persian    |
| 3                    | CAT_TYPE_SPHYNX           | Sphynx     |
|                      |                           |            |
| DogType              | DogType note              |            |
| Number               | Name                      | Alias      |
| 1                    | DOG_TYPE_POODLE           | Poodle     |
| 2                    | DOG_TYPE_BULLDOG          | Bulldog    |
| 3                    | DOG_TYPE_DACHSHUND        | Dachshund  |
|                      |                           |            |
| BirdType             | BirdType note             |            |
| Number               | Name                      | Alias      |
| 1                    | CANARY                    | Canary     |
| 2                    | WOODPECKER                | Woodpecker |
| 3                    | OWL                       | Owl        |
|                      |                           |            |
| ColumnDisorderedEnum | ColumnDisorderedEnum note |            |
| Alias                | Number                    | Name       |
| Large                | 1                         | LARGE      |
| Medium               | 2                         | MEDIUM     |
| Small                | 3                         | SMALL      |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Mode                 |
| -------- | -------------------- |
| ItemType | MODE_ENUM_TYPE_MULTI |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// CatType note
enum CatType {
  option (tableau.etype) = {name:"EnumType" note:"CatType note"};

  CAT_TYPE_INVALID = 0;
  CAT_TYPE_RAGDOLL = 1 [(tableau.evalue).name = "Ragdoll"]; // Ragdoll
  CAT_TYPE_PERSIAN = 2 [(tableau.evalue).name = "Persian"]; // Persian
  CAT_TYPE_SPHYNX = 3 [(tableau.evalue).name = "Sphynx"]; // Sphynx
}

// DogType note
enum DogType {
  option (tableau.etype) = {name:"EnumType" note:"DogType note"};

  DOG_TYPE_INVALID = 0;
  DOG_TYPE_POODLE = 1 [(tableau.evalue).name = "Poodle"]; // Poodle
  DOG_TYPE_BULLDOG = 2 [(tableau.evalue).name = "Bulldog"]; // Bulldog
  DOG_TYPE_DACHSHUND = 3 [(tableau.evalue).name = "Dachshund"]; // Dachshund
}

// BirdType note
enum BirdType {
  option (tableau.etype) = {name:"EnumType" note:"BirdType note"};

  BIRD_TYPE_INVALID = 0;
  BIRD_TYPE_CANARY = 1 [(tableau.evalue).name = "Canary"]; // Canary
  BIRD_TYPE_WOODPECKER = 2 [(tableau.evalue).name = "Woodpecker"]; // Woodpecker
  BIRD_TYPE_OWL = 3 [(tableau.evalue).name = "Owl"]; // Owl
}
```

{{< /details >}}

### Specify Number column

In `Number` column, you can specify custom unique enum value number.

{{< alert icon="ⓘ" context="info" text="If you not specify default enum value \"0\", it will be auto generated. And the default enum value name pattern is: \"{ENUM_TYPE}_INVALID\"." />}}

For example, a worksheet `ItemType` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType "@TABLEAU" >}}

{{< sheet >}}

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
| ItemType | MODE_ENUM_TYPE |

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

For example, two worksheets `ItemType` and `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemType ItemConf "@TABLEAU" >}}

{{< sheet >}}

| Number | Name            | Alias |
| ------ | --------------- | ----- |
| 1      | ITEM_TYPE_FRUIT | Fruit |
| 2      | ITEM_TYPE_EQUIP | Equip |
| 3      | ITEM_TYPE_BOX   | Box   |

{{< /sheet >}}

{{< sheet colored >}}

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
| ItemType | MODE_ENUM_TYPE |
| ItemConf |                |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

// Generated from sheet: ItemType.
enum ItemType {
  ITEM_TYPE_INVALID = 0;
  ITEM_TYPE_FRUIT = 1 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 2 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 3 [(tableau.evalue).name = "Box"];
}

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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
