---
title: "预定义类型"
description: "预定义类型。"
lead: "Tableau 支持预定义类型的导入，然后您可以在 Excel/CSV/XML/YAML 中使用它们。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 8500
toc: true
---

## 概述

您可以预先在 protoconf 文件（如 `common.proto`）中定义 `enum`、`struct` 或 `union` 类型。然后使用它们来指定工作表的列类型或跨单元格类型。

## 用法

- 语法：在工作表中使用预定义的 `CustomType` 时，在前面加一个点 `.`（即 `.CustomType`）。
- 导入：指定 **tableauc** 配置的 `protoFiles` 选项以导入公共 proto 文件，其中定义了预定义的 `enum`、`struct`、`union` 类型。请参阅 [Tableauc 配置](../../tutorial/config/#configyaml)。

## 枚举

例如，*common.proto* 中的枚举类型 `FruitType` 定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}
```

以下是一些演示如何使用预定义枚举类型的示例：

- Excel/CSV：[使用预定义枚举类型](../../excel/enum/#use-predefined-enum-type)。
- XML：[使用预定义枚举类型](../../xml/enum/#use-predefined-enum-type)
- YAML：[使用预定义枚举类型](../../yaml/enum/#use-predefined-enum-type)

## 结构体

例如，*common.proto* 中的结构体类型 `Prop` 定义如下：

```protobuf
message Prop {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 value = 2 [(tableau.field).name = "Value"];
}
```

以下是一些演示如何使用预定义结构体类型的示例：

- Excel/CSV
  - `struct`：[预定义结构体](../../excel/struct/#predefined-struct)
  - `list`：[垂直预定义结构体列表](../../excel/list/#vertical-predefined-struct-list)
  - `map`：[垂直预定义结构体字典](../../excel/map/#vertical-predefined-struct-map)
- XML
  - `struct`：[预定义结构体](../../xml/struct/#predefined-struct)
  - `list`：[预定义结构体列表](../../xml/list/#predefined-struct-list)
  - `map`：待办
- YAML
  - `struct`：[预定义结构体](../../yaml/struct/#predefined-struct)
  - `list`：[预定义结构体列表](../../yaml/list/#predefined-struct-list)
  - `map`：待办

在 `水平字典` 或 `水平列表` 中，您可以使用预定义结构体定义自定义变量名称。
请参阅 [自定义命名结构体](../../excel/struct/#custom-named-struct)。

## 联合类型

例如，*common.proto* 中的结构体类型 `Target` 定义如下：

```protobuf
// 预定义联合类型。
message Target {
  option (tableau.union) = true;

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {
      field: "Field"
    };
    Pvp pvp = 1;      // 绑定到枚举值 1：TYPE_PVP。
    Pve pve = 2;      // 绑定到枚举值 2：TYPE_PVP。
    Story story = 3;  // 绑定到枚举值 3：TYPE_STORY。
    Skill skill = 4;  // 绑定到枚举值 4：TYPE_SKILL。
  }

  enum Type {
    TYPE_NIL = 0;
    TYPE_PVP = 1 [(tableau.evalue) = { name: "PVP" }];
    TYPE_PVE = 2 [(tableau.evalue) = { name: "PVE" }];
    TYPE_STORY = 3 [(tableau.evalue) = { name: "Story" }];
    TYPE_SKILL = 4 [(tableau.evalue) = { name: "Skill" }];
  }
  message Pvp {
    int32 type = 1;                          // 标量
    int64 damage = 2;                        // 标量
    repeated protoconf.FruitType types = 3;  // 单元格内枚举列表
  }
  message Pve {
    Mission mission = 1;             // 单元格内结构体
    repeated int32 heros = 2;        // 单元格内列表
    map<int32, int64> dungeons = 3;  // 单元格内字典

    message Mission {
      int32 id = 1;
      uint32 level = 2;
      int64 damage = 3;
    }
  }
  message Story {
    protoconf.Item cost = 1;                     // 单元格内预定义结构体
    map<int32, protoconf.FruitType> fruits = 2;  // 单元格内字典，值为枚举类型
    map<int32, Flavor> flavors = 3;              // 单元格内字典，键为枚举类型
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = { name: "Key" }];
      int32 value = 2 [(tableau.field) = { name: "Value" }];
    }
  }
  message Skill {
    int32 id = 1;      // 标量
    int64 damage = 2;  // 标量
    // 无字段标签 3
  }
}
```

以下是一些演示如何使用预定义联合类型的示例：

- Excel/CSV
  - `list`：[列表中的预定义联合](../../excel/union/#predefined-union-in-list)
  - `map`：[字典中的预定义联合](../../excel/union/#predefined-union-in-map)
- XML
  - `union`：[预定义联合](../../xml/union/#predefined-union)
  - `list`：[预定义联合列表](../../xml/union/#predefined-union-list)
  - `map`：待办
- YAML
  - `union`：[预定义联合](../../yaml/union/#predefined-union)
  - `list`：[预定义联合列表](../../yaml/union/#predefined-union-list)
  - `map`：待办
