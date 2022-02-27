---
title: "Enum"
description: "Enum features."
lead: "This guide demonstrates different features of enum type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1390
toc: true
---

## Enum value

The tableau parser accepts three enum value forms:

  1. enum value number.
  2. enum value name.
  3. enum value alias name (with EnumValueOptions specified).

Enum type `FruitType` is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKOWN = 0 [(tableau.evalue).name = "unknown"];
  FRUIT_TYPE_ORANGE = 1 [(tableau.evalue).name = "orange"];
  FRUIT_TYPE_APPLE  = 2 [(tableau.evalue).name = "apple"];
  FRUIT_TYPE_BANANA = 3 [(tableau.evalue).name = "banana"];
}
```

Then the three forms of enum value are all accepted:

| Enum value number | Enum value name   | Enum value alias |
|-------------------|-------------------|------------------|
| 0                 | FRUIT_TYPE_UNKOWN | unknown          |
| 1                 | FRUIT_TYPE_ORANGE | orange           |
| 2                 | FRUIT_TYPE_APPLE  | apple            |
| 3                 | FRUIT_TYPE_BANANA | banana           |

{{< alert icon="👉" context="warning" text="Enum type must be predefined." />}}

Go to read details about predefiend **Enum** type. [Predefined types →]({{< relref "predefined-types" >}})

### Input

A worksheet `FruitConf` in `HelloWorld.xlsx`:

| ID                 | Type             |
|--------------------|------------------|
| map<uint32, Fruit> | enum<.FruitType> |
| Fruit's ID.        | Fruit's type.    |
| 1                  | 1                |
| 2                  | FRUIT_TYPE_APPLE |
| 3                  | banana           |
{.table-bordered .table-success}

### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"FruitConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Fruit> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
   message Fruit {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    FruitType type = 2 [(tableau.field) = {name:"Type"}];
  }
}
```

{{< /details >}}

## Validation

As enum type is predefined, so the tableau parser will auto validate the enum value.
