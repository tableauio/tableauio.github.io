---
title: "Predefined types（预定义类型）"
description: "预定义类型。"
lead: "Tableau 支持导入预定义类型，然后在 Excel/CSV/XML/YAML 中使用。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 8500
toc: true
---

## 概述

你可以在 protoconf 文件（如 `common.proto`）中预先定义 `enum`、`struct` 或 `union` 类型，然后在 worksheet 中将其用作列类型或跨单元格类型。

## 使用方式

- 语法：在 worksheet 中使用预定义的 `CustomType` 时，需在前面加一个点 `.`（即 `.CustomType`）。
- 导入：在 **tableauc** 配置的 `protoFiles` 选项中指定公共 proto 文件，这些文件中定义了预定义的 `enum`、`struct`、`union` 类型。参考 [Tableauc 配置](../../prologue/config/#configyaml)。

## Enum

例如，`common.proto` 中定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}
```

以下示例说明如何使用预定义枚举类型：

- Excel/CSV：[使用预定义枚举类型](../../excel/enum/#使用预定义枚举类型)。
- XML：[使用预定义枚举类型](../../xml/enum/#使用预定义枚举类型)
- YAML：[使用预定义枚举类型](../../yaml/enum/#使用预定义枚举类型)

## Struct

例如，`common.proto` 中定义的 struct 类型 `Prop`：

```protobuf
message Prop {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 value = 2 [(tableau.field).name = "Value"];
}
```

以下示例说明如何使用预定义 struct 类型：

- Excel/CSV
  - `struct`：[Predefined-struct](../../excel/struct/#predefined-struct)
  - `list`：[Vertical predefined-struct list](../../excel/list/#垂直-predefined-struct-list)
  - `map`：[Vertical predefined-struct map](../../excel/map/#垂直-predefined-struct-map)
- XML
  - `struct`：[Predefined-struct](../../xml/struct/#predefined-struct)
  - `list`：[Predefined struct list](../../xml/list/#predefined-struct-list)
  - `map`：TODO
- YAML
  - `struct`：[Predefined-struct](../../yaml/struct/#predefined-struct)
  - `list`：[Predefined struct list](../../yaml/list/#predefined-struct-list)
  - `map`：TODO

在 `horizontal map` 或 `horizontal list` 中，可以为预定义 struct 指定自定义变量名。
参考 [Custom named struct](../../excel/struct/#custom-named-struct)。

## Union

例如，`common.proto` 中定义的 union 类型 `Target`：

```protobuf
// 预定义 union 类型。
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {
      field: "Field"
    };
    Pvp pvp = 1;      // 绑定到枚举值 1: TYPE_PVP。
    Pve pve = 2;      // 绑定到枚举值 2: TYPE_PVP。
    Story story = 3;  // 绑定到枚举值 3: TYPE_STORY。
    Skill skill = 4;  // 绑定到枚举值 4: TYPE_SKILL。
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

以下示例说明如何使用预定义 union 类型：

- Excel/CSV
  - `list`：[Predefined union in list](../../excel/union/#list-中的-predefined-union)
  - `map`：[Predefined union in map](../../excel/union/#map-中的-predefined-union)
- XML
  - `union`：[Predefined union](../../xml/union/#predefined-union)
  - `list`：[Predefined union list](../../xml/union/#predefined-union-list)
  - `map`：TODO
- YAML
  - `union`：[Predefined union](../../yaml/union/#predefined-union)
  - `list`：[Predefined union list](../../yaml/union/#predefined-union-list)
  - `map`：TODO
