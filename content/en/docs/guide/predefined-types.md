---
title: "Predefined types"
description: "Predefined types."
lead: "Tableau support predefined types to be imported, then you can use it in Excel/CSV/XML."
date: 2022-02-26T08:48:57+00:00
lastmod: 2022-02-26T08:48:57+00:00
draft: false
images: []
weight: 1300
toc: true
---

## Overview

You can define `enum` or `struct` types in a protoconf file (such as `common.proto`) previously. It means you create custom types, and then can use them to specify the
column type or cross-cell struct type of a worksheet.

## Usage

- Prepend a dot `.` to `CustomType` when you use it in a worksheet.
- Specify the `Imports` option when call `tableau.GenProto` func, to import the common proto files, where custom `enum` or `struct` types are defined. Refer: [Tableau Options](https://github.com/tableauio/tableau/blob/master/options/options.go#L105).

## Enum

The basic enum guide, please go to read [Enum →]({{< relref "enum" >}})

For example, enum type `FruitType` in `common.proto` is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKOWN = 0 [(tableau.evalue).name = "unknown"];
  FRUIT_TYPE_ORANGE = 1 [(tableau.evalue).name = "orange"];
  FRUIT_TYPE_APPLE  = 2 [(tableau.evalue).name = "apple"];
  FRUIT_TYPE_BANANA = 3 [(tableau.evalue).name = "banana"];
}
```

### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Type             |
|-------------------|------------------|
| map<uint32, Item> | enum<.FruitType> |
| Item's ID.        | Fruit's type.    |
| 1                 | 1                |
| 2                 | FRUIT_TYPE_APPLE |
| 3                 | banana           |
{.table-bordered .table-success}

### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
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

{{< details "item_conf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id":  1,
            "type":  "FRUIT_TYPE_ORANGE"
        },
        "2":  {
            "id":  2,
            "type":  "FRUIT_TYPE_APPLE"
        },
        "3":  {
            "id":  3,
            "type":  "FRUIT_TYPE_BANANA"
        }
    }
}
```

{{< /details >}}

## Struct

For example, struct type `Prop` in `common.proto` is defined as:

```protobuf
message Prop {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 value = 2 [(tableau.field).name = "Value"];
}
```

### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Prop1ID      | Prop1Value    | Prop2ID    | Prop2Value   |
|-------------------|--------------|---------------|------------|--------------|
| map<uint32, Item> | [.Prop]int32 | int32         | int32      | int32        |
| Item's id.        | Prop's id.   | Prop's value. | Prop's id. | Prop's value |
| 1                 | 1            | 100           | 2          | 200          |
| 2                 | 3            | 300           | 4          | 400          |
| 3                 | 5            | 500           |            |              |
{.table-bordered .table-success}

### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated Prop prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
  }
}
```

{{< /details >}}

{{< details "item_conf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id":  1,
            "propList":  [
                {
                    "id":  1,
                    "value":  100
                },
                {
                    "id":  2,
                    "value":  200
                }
            ]
        },
        "2":  {
            "id":  2,
            "propList":  [
                {
                    "id":  3,
                    "value":  300
                },
                {
                    "id":  4,
                    "value":  400
                }
            ]
        },
        "3":  {
            "id":  3,
            "propList":  [
                {
                    "id":  5,
                    "value":  500
                }
            ]
        }
    }
}
```

{{< /details >}}

### Variable naming

In `horizontal map` or `horizontal list`, you can define custom variable name with the predefined struct.
