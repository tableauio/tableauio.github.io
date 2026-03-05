---
title: "Map（映射）"
description: "Excel map 使用指南。"
lead: "本文说明 Excel map 类型的各种特性。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 7106
toc: true
---

## 水平 map（Horizontal map）

水平 map 有以下几种：

1. 水平 **scalar** map，map value 类型为 scalar。例如：`map<int32, int32>`。
2. 水平 **struct** map，map value 类型为 struct。例如：`map<int32, Item>`。
3. 水平 **predefined-struct** map，map value 类型为 predefined struct。例如：`map<int32, .Item>`。

### 水平 scalar map

无需单独支持，请使用 `map<int32, Item>` 代替。

### 水平 struct map

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID           | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ----------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| map<uint32, Item> | string       | uint32     | string       | uint32     | string       |
| Item1's ID        | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                 | Apple        | 2          | Orange       | 3          | Banana       |

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

  map<uint32, Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
    "itemMap": {
        "1": {"id": 1, "name": "Apple"},
        "2": {"id": 2, "name": "Orange"},
        "3": {"id": 3, "name": "Banana"}
    }
}
```

{{< /details >}}

### 水平 predefined-struct map

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

| Item1ID           | Item1Num    | Item2ID    | Item2Num    | Item3ID    | Item3Num    |
| ----------------- | ----------- | ---------- | ----------- | ---------- | ----------- |
| map<int32, .Item> | int32       | int32      | int32       | int32      | int32       |
| Item1's ID        | Item1's num | Item2's ID | Item3's num | Item3's ID | Item3's num |
| 1                 | 100         | 2          | 200         | 3          | 300         |

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

  map<int32, protoconf.Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {"id": 1, "num": 100},
        "2": {"id": 2, "num": 200},
        "3": {"id": 3, "num": 300}
    }
}
```

{{< /details >}}

## 垂直 map（Vertical map）

垂直 map 有以下几种：

1. 垂直 **scalar** map，map value 类型为 scalar。例如：`map<int32, int32>`。
2. 垂直 **struct** map，map value 类型为 struct。例如：`map<int32, Item>`。
3. 垂直 **predefined-struct** map，map value 类型为 predefined struct。例如：`map<int32, .Item>`。

### 垂直 scalar map

无需单独支持，请使用 `map<int32, Item>` 代替。

### 垂直 struct map

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Desc                          |
| ----------------- | ----------- | ----------------------------- |
| map<uint32, Item> | string      | string                        |
| Item's ID         | Item's name | Item's desc                   |
| 1                 | Apple       | A kind of delicious fruit.    |
| 2                 | Orange      | A kind of sour fruit.         |
| 3                 | Banana      | A kind of calorie-rich fruit. |

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
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {"id": 1, "name": "Apple", "desc": "A kind of delicious fruit."},
        "2": {"id": 2, "name": "Orange", "desc": "A kind of sour fruit."},
        "3": {"id": 3, "name": "Banana", "desc": "A kind of calorie-rich fruit."}
    }
}
```

{{< /details >}}

### 垂直 predefined-struct map

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

| ID                | Num        |
| ----------------- | ---------- |
| map<int32, .Item> | int32      |
| Item's ID         | Item's num |
| 1                 | 100        |
| 2                 | 200        |
| 3                 | 300        |

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

  map<int32, protoconf.Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {"id": 1, "num": 100},
        "2": {"id": 2, "num": 200},
        "3": {"id": 3, "num": 300}
    }
}
```

{{< /details >}}

## Incell map

Incell map 有以下几种：

1. Incell **scalar** map，map value 类型为 scalar。例如：`map<int32, int32>`。
2. Incell **struct** map，map value 类型为 struct。例如：`map<int32, Item>`。

### Incell scalar map

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item                               |
| ---------------------------------- |
| map<uint32, string>                |
| Item key-value pairs               |
| 1:Apple,2:Orange,3:Banana,4,:Peach |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

`Item` 列的类型为 incell map `map<uint32, string>`，map value 为 scalar 类型 `string`。

> ⚠️ 注意：如果希望使用显式模式 `[Key:Value]...`，请将 field property `present` 设置为 true。
> 参见 [选项 `present` →]({{< relref "field-property/#选项-present" >}})。

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, string> item_map = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "itemMap": {
        "0": "Peach",
        "1": "Apple",
        "2": "Orange",
        "3": "Banana",
        "4": ""
    }
}
```

{{< /details >}}

### Incell enum map

对于 incell map，key 和 value 都可以是枚举类型。

例如，*common.proto* 中预定义的枚举类型 `FruitType` 和 `FruitFlavor`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}

enum FruitFlavor {
  FRUIT_FLAVOR_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_FLAVOR_FRAGRANT = 1 [(tableau.evalue).name = "Fragrant"];
  FRUIT_FLAVOR_SOUR = 2 [(tableau.evalue).name = "Sour"];
  FRUIT_FLAVOR_SWEET = 3 [(tableau.evalue).name = "Sweet"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Fruit                        | Flavor                         | Item                                      |
| ---------------------------- | ------------------------------ | ----------------------------------------- |
| map<enum<.FruitType>, int64> | map<int64, enum<.FruitFlavor>> | map<enum<.FruitType>, enum<.FruitFlavor>> |
| Fruits                       | Flavors                        | Items                                     |
| Apple:1,Orange:2             | 1:Fragrant,2:Sweet             | Apple:Fragrant,Orange:Sour                |

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

  map<int32, Fruit> fruit_map = 1 [(tableau.field) = {name:"Fruit" key:"Key" layout:LAYOUT_INCELL}];
  message Fruit {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"Key"}];
    int64 value = 2 [(tableau.field) = {name:"Value"}];
  }
  map<int64, protoconf.FruitFlavor> flavor_map = 2 [(tableau.field) = {name:"Flavor" layout:LAYOUT_INCELL}];
  map<int32, Item> item_map = 3 [(tableau.field) = {name:"Item" key:"Key" layout:LAYOUT_INCELL}];
  message Item {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"Key"}];
    protoconf.FruitFlavor value = 2 [(tableau.field) = {name:"Value"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "fruitMap": {
        "1": {"key": "FRUIT_TYPE_APPLE", "value": "1"},
        "3": {"key": "FRUIT_TYPE_ORANGE", "value": "2"}
    },
    "flavorMap": {
        "1": "FRUIT_FLAVOR_FRAGRANT",
        "2": "FRUIT_FLAVOR_SWEET"
    },
    "itemMap": {
        "1": {"key": "FRUIT_TYPE_APPLE", "value": "FRUIT_FLAVOR_FRAGRANT"},
        "3": {"key": "FRUIT_TYPE_ORANGE", "value": "FRUIT_FLAVOR_SOUR"}
    }
}
```

{{< /details >}}

## 空 key map

如果 map key 未配置，则视为 map key 类型的默认值。默认值参见 [Scalar types →]({{< relref "../basics/grammar-and-types/#scalar-types" >}})。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Desc        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's name |
| 1                 | Apple       |
|                   | Orange      |
| 3                 | Banana      |

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
    string desc = 2 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "0": {"id": 0, "desc": "Orange"},
        "1": {"id": 1, "desc": "Apple"},
        "3": {"id": 3, "desc": "Banana"}
    }
}
```

{{< /details >}}

## Enum key map

根据 protobuf 文档对 [map key type](https://developers.google.com/protocol-buffers/docs/proto3#maps) 的限制：

> ... `key_type` 可以是任意整数或字符串类型（即除浮点类型和 `bytes` 之外的任意 [scalar](https://developers.google.com/protocol-buffers/docs/proto3#scalar) 类型）。注意，`enum` 不是有效的 `key_type`。

然而，在某些场景下，以枚举作为 key 类型非常有用。因此我们以一种简单的方式支持它：

- 枚举类型作为 map key 类型时，视为 `int32`，
- 枚举类型保留在 map value 类型（struct）中。

例如，*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

则 `map<enum<.FruitType>, ValueType>` 会被转换为 `map<int32, ValueType>`，
且 `FruitType` 保留在 `ValueType` 中：

```protobuf
message ValueType {
  FruitType key = 1;
  ...
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Type                        | Price        |
| --------------------------- | ------------ |
| map<enum<.FruitType>, Item> | int32        |
| Item's type                 | Item's price |
| Apple                       | 100          |
| Orange                      | 200          |
| Banana                      | 300          |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, Item> item_map = 1 [(tableau.field) = {key:"Type" layout:LAYOUT_VERTICAL}];
  message Item {
    protoconf.FruitType type = 1 [(tableau.field) = {name:"Type"}];
    int32 price = 2 [(tableau.field) = {name:"Price"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {"type": "FRUIT_TYPE_APPLE", "price": 100},
        "3": {"type": "FRUIT_TYPE_ORANGE", "price": 200},
        "4": {"type": "FRUIT_TYPE_BANANA", "price": 300}
    }
}
```

{{< /details >}}

## 水平 map 大小

### 动态大小

默认情况下，所有 map 都是**动态大小类型**。Map 条目应连续存在，否则如果中间存在空条目会报错。

### 固定大小

#### 隐式固定大小（Implicit fixed size）

Map 大小由名称行中最大存在的 map 条目数量自动确定。

在下面的示例中，虽然第二个 map 条目 **Item2** 为空，但由于 field property `fixed` 设置为 `true`，这是合法的。此外，**Item2** 也会作为空 map 条目生成，可以在生成的 *ItemConf.json* 文件中看到。

{{< alert icon="👉" context="info" text="如果向 map 中插入多个空 map 条目，实际上只会生成一个空 map 条目，因为所有空 map 条目的 key 相同。这与 list 不同，请特别注意。" />}}

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                         | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ------------------------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| map<uint32, Item>\|{fixed:true} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                      | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                               | Apple        |            |              | 3          | Banana       |

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

  map<uint32, Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL prop:{fixed:true}}];
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
    "itemMap": {
        "0": {"id": 0, "name": ""},
        "1": {"id": 1, "name": "Apple"},
        "3": {"id": 3, "name": "Banana"}
    }
}
```

{{< /details >}}

#### 显式固定大小（Explicit fixed size）

Map 大小由 field property `size` 显式设置。

在下面的示例中，field property `size` 设置为 2，则第二个 map 条目 **Item2** 之后的所有 map 条目都会被截断。此外，**Item2** 也会作为空 map 条目生成，可以在生成的 *ItemConf.json* 文件中看到。

{{< alert icon="👉" context="info" text="如果向 map 中插入多个空 map 条目，实际上只会生成一个空 map 条目，因为所有空 map 条目的 key 相同。这与 list 不同，请特别注意。" />}}

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                     | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| --------------------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| map<uint32, Item>\|{size:2} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                  | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                           | Apple        |            |              | 3          | Banana       |

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

  map<uint32, Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL prop:{size:2}}];
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
    "itemMap": {
        "0": {"id": 0, "name": ""},
        "1": {"id": 1, "name": "Apple"}
    }
}
```

{{< /details >}}

## 高级特性

### 水平跳列 map（Horizontal column-skipped map）

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| D                 | Prop1ID          |              | Prop1Value    | Prop2ID    |              | Prop2Value    |
| :---------------- | :--------------- | :----------- | :------------ | :--------- | :----------- | :------------ |
| map<uint32, Item> | map<int32, Prop> |              | int32         | int32      |              | int32         |
| Item's ID         | Prop1's ID       | Prop1's name | Prop1's value | Prop2's ID | Prop2's name | Prop2's value |
| 1                 | 1                | Apple        | 100           | 2          | Orange       | 200           |
| 2                 | 3                | Banana       | 300           | 4          | Pomelo       | 400           |
| 3                 | 5                | Watermelon   | 500           |            |              |               |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    map<int32, Prop> prop_map = 2 [(tableau.field) = {name:"Prop" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
            "propMap": {
                "1": {"id": 1, "value": 100},
                "2": {"id": 2, "value": 200}
            }
        },
        "2": {
            "id": 2,
            "propMap": {
                "3": {"id": 3, "value": 300},
                "4": {"id": 4, "value": 400}
            }
        },
        "3": {
            "id": 3,
            "propMap": {
                "5": {"id": 5, "value": 500}
            }
        }
    }
}
```

{{< /details >}}

### Ordered-map

在 metasheet `@TABLEAU` 中将 `OrderedMap` 选项设置为 `true`，则会生成 ordered map 访问器。此功能由 [tableauio/loader](https://github.com/tableauio/loader) 提供支持。目前支持的编程语言：

- [x] C++
- [x] Go
- [ ] C#
- [ ] JS/TS

#### 示例

如果希望 `ItemConf` 生成 ordered map 访问器，则在 metasheet `@TABLEAU` 中将 `OrderedMap` 选项设置为 `true`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet    | OrderedMap |
| -------- | ---------- |
| ItemConf | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

更多有用的选项请参考 metasheet 章节。[Metasheet @TABLEAU →]({{< relref "metasheet" >}})
