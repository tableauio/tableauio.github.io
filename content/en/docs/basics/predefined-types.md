---
title: "Predefined types"
description: "Predefined types."
lead: "Tableau support predefined types to be imported, then you can use it in Excel/CSV/XML/YAML."
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 8500
toc: true
---

## Overview

You can define `enum`, `struct`, or `union` types in a protoconf file (such as `common.proto`) ahead. Then use them to specify the column type or cross-cell type of a worksheet.

## Usage

- Syntax: prepend a dot `.` to predefined `CustomType` (a.k.a. `.CustomType`) when you use it in a worksheet.
- Import: specify the `protoFiles` option of **tableauc** config to import the common proto files, where predefined `enum`, `struct`, `union` types are defined. See [Tableauc config](../../tutorial/config/#configyaml).

## Enum

For example, enum type `FruitType` in *common.proto* is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}
```

There are some examples to demonstrate how to use predefined enum types:

- Excel/CSV: [Use predefined enum type](../../excel/enum/#use-predefined-enum-type).
- XML: [Use predefined enum type](../../xml/enum/#use-predefined-enum-type)
- YAML: [Use predefined enum type](../../yaml/enum/#use-predefined-enum-type)

## Struct

For example, struct type `Prop` in *common.proto* is defined as:

```protobuf
message Prop {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 value = 2 [(tableau.field).name = "Value"];
}
```

There are some examples to demonstrate how to use predefined struct types:

- Excel/CSV
  - `struct`: [Predefined-struct](../../excel/struct/#predefined-struct)
  - `list`: [Vertical predefined-struct list](../../excel/list/#vertical-predefined-struct-list)
  - `map`: [Vertical predefined-struct map](../../excel/map/#vertical-predefined-struct-map)
- XML
  - `struct`: [Predefined-struct](../../xml/struct/#predefined-struct)
  - `list`: [Predefined struct list](../../xml/list/#predefined-struct-list)
  - `map`: TODO
- YAML
  - `struct`: [Predefined-struct](../../yaml/struct/#predefined-struct)
  - `list`: [Predefined struct list](../../yaml/list/#predefined-struct-list)
  - `map`: TODO

In `horizontal map` or `horizontal list`, you can define custom variable name with the predefined struct.
See [Custom named struct](../../excel/struct/#custom-named-struct).

## Union

For example, struct type `Target` in *common.proto* is defined as:

```protobuf
// Predefined union type.
message Target {
  option (tableau.union) = true;

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {
      field: "Field"
    };
    Pvp pvp = 1;      // Bound to enum value 1: TYPE_PVP.
    Pve pve = 2;      // Bound to enum value 2: TYPE_PVP.
    Story story = 3;  // Bound to enum value 3: TYPE_STORY.
    Skill skill = 4;  // Bound to enum value 4: TYPE_SKILL.
  }

  enum Type {
    TYPE_NIL = 0;
    TYPE_PVP = 1 [(tableau.evalue) = { name: "PVP" }];
    TYPE_PVE = 2 [(tableau.evalue) = { name: "PVE" }];
    TYPE_STORY = 3 [(tableau.evalue) = { name: "Story" }];
    TYPE_SKILL = 4 [(tableau.evalue) = { name: "Skill" }];
  }
  message Pvp {
    int32 type = 1;                          // scalar
    int64 damage = 2;                        // scalar
    repeated protoconf.FruitType types = 3;  // incell enum list
  }
  message Pve {
    Mission mission = 1;             // incell struct
    repeated int32 heros = 2;        // incell list
    map<int32, int64> dungeons = 3;  // incell map

    message Mission {
      int32 id = 1;
      uint32 level = 2;
      int64 damage = 3;
    }
  }
  message Story {
    protoconf.Item cost = 1;                     // incell predefined struct
    map<int32, protoconf.FruitType> fruits = 2;  // incell map with value as enum type
    map<int32, Flavor> flavors = 3;              // incell map with key as enum type
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = { name: "Key" }];
      int32 value = 2 [(tableau.field) = { name: "Value" }];
    }
  }
  message Skill {
    int32 id = 1;      // scalar
    int64 damage = 2;  // scalar
    // no field tag 3
  }
}
```

There are some examples to demonstrate how to use predefined union types:

- Excel/CSV
  - `list`: [Predefined union in list](../../excel/union/#predefined-union-in-list)
  - `map`: [Predefined union in map](../../excel/union/#predefined-union-in-map)
- XML
  - `union`: [Predefined union](../../xml/union/#predefined-union)
  - `list`: [Predefined union list](../../xml/union/#predefined-union-list)
  - `map`: TODO
- YAML
  - `union`: [Predefined union](../../yaml/union/#predefined-union)
  - `list`: [Predefined union list](../../yaml/union/#predefined-union-list)
  - `map`: TODO
