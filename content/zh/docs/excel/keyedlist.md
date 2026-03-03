---
title: "KeyedList"
description: "Excel keyed list 使用指南。"
lead: "本文说明 Excel keyed list 类型的各种特性。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2025-04-12T13:59:39+08:00
draft: false
images: []
weight: 7107
toc: true
---

## 语法

Keyed list 与普通 list 相同，区别在于 `ColumnType`（第一个字段类型）被尖括号 `<>` 包围，并作为 map key 处理。

**语法**：`[ElemType]<ColumnType>`

## 水平 list

> TODO...

## 垂直 KeyedList

### 垂直 scalar KeyedList

> 定义方式与 [Incell scalar KeyedList](#incell-scalar-keyedlist) 相同，但如果提供了多行数据，会进行聚合。

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           |
| ------------ |
| []\<uint32\> |
| ID           |
| 1,2,3        |
| 4,5          |
| 6            |

{{< /sheet >}}

{{< sheet >}}

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

  repeated uint32 id_list = 1 [(tableau.field) = {name:"ID" key:"ID" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "idList": [1, 2, 3, 4, 5, 6]
}
```

{{< /details >}}

### 垂直 enum KeyedList

> 定义方式与 [Incell enum KeyedList](#incell-enum-keyedlist) 相同，但如果提供了多行数据，会进行聚合。

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Type                     |
| ------------------------ |
| []\<enum\<.FruitType\>\> |
| Type                     |
| Apple,Orange             |
| FRUIT_TYPE_BANANA        |
| 0                        |

{{< /sheet >}}

{{< sheet >}}

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

  repeated protoconf.FruitType type_list = 1 [(tableau.field) = {name:"Type" key:"Type" layout:LAYOUT_INCELL}];
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
        "FRUIT_TYPE_UNKNOWN"
    ]
}
```

{{< /details >}}

### 垂直 struct KeyedList

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | PropID           | PropName    |
| ---------------- | ---------------- | ----------- |
| [Item]\<uint32\> | map<int32, Prop> | string      |
| Item's ID        | Prop's ID        | Prop's name |
| 1                | 1                | sweet       |
| 2                | 1                | sweet       |
| 2                | 2                | delicious   |

{{< /sheet >}}

{{< sheet >}}

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

  repeated Item item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    map<int32, Prop> prop_map = 2 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      string prop_name = 2 [(tableau.field) = {name:"PropName"}];
    }
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
            "propMap": {"1": {"propId": 1, "propName": "sweet"}}
        },
        {
            "id": 2,
            "propMap": {
                "1": {"propId": 1, "propName": "sweet"},
                "2": {"propId": 2, "propName": "delicious"}
            }
        }
    ]
}
```

{{< /details >}}

## Incell KeyedList

### Incell scalar KeyedList

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           |
| ------------ |
| []\<uint32\> |
| ID list      |
| 1,2,3        |

{{< /sheet >}}

{{< sheet >}}

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

  repeated uint32 id_list = 1 [(tableau.field) = {name:"ID" key:"ID" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "idList": [1, 2, 3]
}
```

{{< /details >}}

### Incell enum KeyedList

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

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

`Param` 列的类型为 incell list `[]enum<.FruitType>`，list 元素为预定义枚举类型 `FruitType`。

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.FruitType type_list = 1 [(tableau.field) = {name:"Type" key:"Type" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "typeList": [
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_BANANA"
    ]
}
```

{{< /details >}}
