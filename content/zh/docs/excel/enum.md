---
title: "枚举"
description: "Excel 枚举指南。"
lead: "本指南演示 Excel 枚举类型的不同特性。"
date: 2026-01-09T14:00:00+08:00
lastmod: 2026-01-09T14:00:00+08:00
draft: false
images: []
weight: 7102
toc: true
---

## 使用预定义枚举类型

基本的枚举指南，请前往阅读 [枚举 →]({{< relref "enum" >}})

例如，`common.proto` 中的枚举类型 `FruitType` 定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

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

生成：

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

## 在工作表中定义枚举类型

在元数据表 `@TABLEAU` 中有两种 `Mode` 可以在工作表中定义枚举类型：

- `MODE_ENUM_TYPE`：在工作表中定义单个枚举类型。
- `MODE_ENUM_TYPE_MULTI`：在工作表中定义多个枚举类型。

### 在工作表中定义单个枚举类型

您应该在元数据表 `@TABLEAU` 中将 `Mode` 选项指定为 `MODE_ENUM_TYPE`。

例如，*HelloWorld.xlsx* 中的工作表 `ItemType`：

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

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// 从工作表生成：ItemType。
enum ItemType {
  ITEM_TYPE_INVALID = 0;
  ITEM_TYPE_FRUIT = 1 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 2 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 3 [(tableau.evalue).name = "Box"];
}
```

{{< /details >}}

### 在工作表中定义多个枚举类型

> 一个块定义一个枚举类型，它是一系列连续的非空行。
> 因此不同的块由一个或多个空行分隔。

您应该在元数据表 `@TABLEAU` 中将 `Mode` 选项指定为 `MODE_ENUM_TYPE_MULTI`。

例如，*HelloWorld.xlsx* 中的工作表 `ItemType`：

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

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Mode                 |
| -------- | -------------------- |
| ItemType | MODE_ENUM_TYPE_MULTI |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

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

### 指定 Number 列

在 `Number` 列中，您可以指定自定义的唯一枚举值数字。

{{< alert icon="ⓘ" context="info" text="如果您未指定默认枚举值 \"0\"，它将自动生成。默认枚举值名称模式为：\"{ENUM_TYPE}_INVALID\"。" />}}

例如，*HelloWorld.xlsx* 中的工作表 `ItemType`：

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

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// 从工作表生成：ItemType。
enum ItemType {
  ITEM_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  ITEM_TYPE_FRUIT = 10 [(tableau.evalue).name = "Fruit"];
  ITEM_TYPE_EQUIP = 20 [(tableau.evalue).name = "Equip"];
  ITEM_TYPE_BOX = 30 [(tableau.evalue).name = "Box"];
}
```

{{< /details >}}

## 在工作表中定义和使用枚举类型

例如，*HelloWorld.xlsx* 中的两个工作表 `ItemType` 和 `ItemConf`：

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
| Item's ID        | Item's type     | Item's name | Item's price |
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

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

// 从工作表生成：ItemType。
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
