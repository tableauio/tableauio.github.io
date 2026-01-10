---
title: "结构体"
description: "Excel 结构体指南。"
lead: "本指南演示 Excel 结构体类型的不同特性。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7103
toc: true
---

## 跨单元格结构体

**语法**：`<StructType>ColumnType`。

每个列名都应该以相同的结构体变量名作为前缀，默认情况下，该变量名与结构体类型名相同。

例如，`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| PropertyID      | PropertyName    | PropertyDesc           |
| :-------------- | :-------------- | :--------------------- |
| {Property}int32 | string          | string                 |
| Property's ID   | Property's Name | Property's Description |
| 1               | Orange          | A kind of sour fruit.  |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

注意 `ItemConf` 中的每个列名都以结构体变量名 **Property** 作为前缀，该变量名与结构体类型名相同。

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Property property = 1 [(tableau.field) = {name:"Property"}];
  message Property {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "property":  {
        "id": 1,
        "name": "Orange",
        "desc": "A kind of sour fruit."
    }
}
```

{{< /details >}}

### 注意

跨单元格结构体通常与以下内容一起使用：

- 跨单元格水平/垂直字典，作为字典值类型。[字典 →]({{< relref "map" >}})
- 跨单元格水平/垂直列表，作为列表元素类型。[列表 →]({{< relref "list" >}})

## 单元格内结构体

结构体的每个字段类型都应该是标量值类型。

例如，`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Prop                                       |
| ---------------- | ------------------------------------------ |
| map<int32, Item> | {int32 ID,string Name,string Desc}Property |
| Item's ID        | Item's property.                           |
| 1                | 1,Orange,A good fruit.                     |
| 2                | 2,Apple                                    |
| 3                | 3                                          |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

`Property` 列的类型是单元格内结构体 `{int32 ID,string Name,string Desc}Property`。

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    Property prop = 2 [(tableau.field) = {name:"Prop" span:SPAN_INNER_CELL}];
    message Property {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      string name = 2 [(tableau.field) = {name:"Name"}];
      string desc = 3 [(tableau.field) = {name:"Desc"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id": 1,
            "prop":  {
                "id": 1,
                "name": "Apple",
                "desc": "A kind of delicious fruit."
            }
        },
        "2":  {
            "id": 2,
            "prop":  {
                "id": 2,
                "name": "Orange",
                "desc":  ""
            }
        },
        "3":  {
            "id": 3,
            "prop":  {
                "id": 3,
                "name":  "",
                "desc":  ""
            }
        }
    }
}
```

{{< /details >}}

## 预定义结构体

例如，`common.proto` 中定义的结构体类型 `Prop`：

```protobuf
message Prop {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 value = 2 [(tableau.field).name = "Value"];
}
```

`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Prop1ID      | Prop1Value    | Prop2ID    | Prop2Value    |
| ----------------- | ------------ | ------------- | ---------- | ------------- |
| map<uint32, Item> | [.Prop]int32 | int32         | int32      | int32         |
| Item's ID         | Prop1's ID   | Prop1's value | Prop2's ID | Prop2's value |
| 1                 | 1            | 100           | 2          | 200           |
| 2                 | 3            | 300           | 4          | 400           |
| 3                 | 5            | 500           |            |               |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated Prop prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id": 1,
            "propList": [
                {
                    "id": 1,
                    "value": 100
                },
                {
                    "id": 2,
                    "value": 200
                }
            ]
        },
        "2":  {
            "id": 2,
            "propList": [
                {
                    "id": 3,
                    "value": 300
                },
                {
                    "id": 4,
                    "value": 400
                }
            ]
        },
        "3":  {
            "id": 3,
            "propList": [
                {
                    "id": 5,
                    "value": 500
                }
            ]
        }
    }
}
```

{{< /details >}}

## 预定义单元格内结构体

预定义结构体的每个字段类型都应该是标量值类型。

例如，`common.proto` 中预定义的 `Property`：

```protobuf
message Property {
  int32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
}
```

`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Prop                   |
| ----------------- | ---------------------- |
| map<uint32, Item> | {.Property}            |
| Item's ID         | Item's property.       |
| 1                 | 1,Orange,A good fruit. |
| 2                 | 2,Apple                |
| 3                 | 3                      |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

`Prop` 列的类型是预定义结构体 `Property`。

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.Property prop = 2 [(tableau.field) = {name:"Prop" span:SPAN_INNER_CELL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id": 1,
            "prop":  {
                "id": 1,
                "name": "Apple",
                "desc": "A kind of delicious fruit."
            }
        },
        "2":  {
            "id": 2,
            "prop":  {
                "id": 2,
                "name": "Orange",
                "desc":  ""
            }
        },
        "3":  {
            "id": 3,
            "prop":  {
                "id": 3,
                "name":  "",
                "desc":  ""
            }
        }
    }
}
```

{{< /details >}}

## 自定义命名结构体

默认情况下，结构体变量名与结构体类型名相同，但您可以指定不同的结构体变量名。自定义命名结构体主要用于识别名称行中连续单元格的名称前缀，当 tableau (protogen) 无法自动识别变量名时。

**语法**：在结构体类型名之后，使用括号 `()` 指定结构体变量名：`VariableType(VariableName)`。

例如，预定义了 `Item`：

```protobuf
message Item {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 num = 2 [(tableau.field).name = "Num"];
}
```

`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardItemID            | RewardItemNum | CostItemID            | CostItemNum | PredefinedItemID             | PredefinedItemNum    |
| ----------------------- | ------------- | --------------------- | ----------- | ---------------------------- | -------------------- |
| {Item(RewardItem)}int32 | int32         | {Item(CostItem)}int32 | int32       | {.Item(PredefinedItem)}int32 | int32                |
| Item's ID               | Item's ID     | Cost's ID             | Cost's ID   | Predefined item's ID         | Predefined item's ID |
| 1                       | 100           | 2                     | 200         | 10                           | 20                   |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

**详情**：
在类型单元格 `{Item(RewardItem)}int32` 中，`RewardItem` 是新定义结构体 `Item` 的自定义变量名。在类型单元格 `{Item(CostItem)}int32` 中，`CostItem` 是同一作用域中已定义结构体 `Item` 的自定义变量名。最后，在类型单元格 `{.Item(PredefinedItem)}int32` 中，`PredefinedItem` 是全局（在同一 protobuf 包中）预定义结构体 `Item` 的自定义变量名。

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item reward_item = 1 [(tableau.field) = {name:"RewardItem"}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
  Item cost_item = 2 [(tableau.field) = {name:"CostItem"}];
  protoconf.Item predefined_item = 3 [(tableau.field) = {name:"PredefinedItem"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardItem": {
        "id": 1,
        "num": 100
    },
    "costItem": {
        "id": 2,
        "num": 200
    },
    "predefinedItem": {
        "id": 10,
        "num": 20
    }
}
```

{{< /details >}}

## 高级预定义单元格内结构体

在某些情况下，您可能希望在单元格中配置任何复杂的结构体，因此 tableau 支持两种 protobuf 序列化格式：[文本格式](https://developers.google.com/protocol-buffers/docs/text-format-spec) 和 [JSON 格式](https://developers.google.com/protocol-buffers/docs/proto3#json)。

**语法**：在字段属性中，指定 `form` 选项为 `FORM_TEXT` 或 `FORM_JSON`。

例如，预定义了 `Transform`：

```protobuf
message Transform {
  Vector3 position = 1;
  Vector3 rotation = 2;
  Vector3 scale = 3;
}
message Vector3 {
  float x = 1;
  float y = 2;
  float z = 3;
}
```

`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Transform1                                                        | Transform2                                                                                          |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| {.Transform}\|{form:FORM_TEXT}                                    | {.Transform}\|{form:FORM_JSON}                                                                      |
| Box's transform1                                                  | Box's transform2                                                                                    |
| position:{x:1 y:2 z:3} rotation:{x:4 y:5 z:6} scale:{x:7 y:8 z:9} | {"position":{"x":1, "y":2, "z":3}, "rotation":{"x":4, "y":5, "z":6}, "scale":{"x":7, "y":8, "z":9}} |

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

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  protoconf.Transform transform_1 = 1 [(tableau.field) = {name:"Transform1" span:SPAN_INNER_CELL prop{form:FORM_TEXT}}];
  protoconf.Transform transform_2 = 2 [(tableau.field) = {name:"Transform2" span:SPAN_INNER_CELL prop:{form:FORM_JSON}}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "transform1":  {
        "position":  {
            "x":  1,
            "y":  2,
            "z":  3
        },
        "rotation":  {
            "x":  4,
            "y":  5,
            "z":  6
        },
        "scale":  {
            "x":  7,
            "y":  8,
            "z":  9
        }
    },
    "transform2":  {
        "position":  {
            "x":  1,
            "y":  2,
            "z":  3
        },
        "rotation":  {
            "x":  4,
            "y":  5,
            "z":  6
        },
        "scale":  {
            "x":  7,
            "y":  8,
            "z":  9
        }
    }
}
```

{{< /details >}}

## 在工作表中定义结构体类型

在元数据表 `@TABLEAU` 中有两种 `Mode` 可以在工作表中定义结构体类型：

- `MODE_STRUCT_TYPE`：在工作表中定义单个结构体类型。
- `MODE_STRUCT_TYPE_MULTI`：在工作表中定义多个结构体类型。

### 在工作表中定义单个结构体类型

您应该在元数据表 `@TABLEAU` 中将 `Mode` 选项指定为 `MODE_STRUCT_TYPE`。

例如，`HelloWorld.xlsx` 中的工作表 `Item`：

{{< spreadsheet "HelloWorld.xlsx" Item "@TABLEAU" >}}

{{< sheet >}}

| Name      | Type                                                   |
| --------- | ------------------------------------------------------ |
| ID        | uint32                                                 |
| Num       | int32                                                  |
| FruitType | enum<.FruitType>                                       |
| Feature   | []int32                                                |
| Prop      | map<int32, string>                                     |
| Detail    | {enum<.ItemType> Type, string Name, string Desc}Detail |

{{< /sheet >}}

{{< sheet >}}

| Sheet | Mode             |
| ----- | ---------------- |
| Item  | MODE_STRUCT_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// 从工作表生成：Item。
message Item {
  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  int32 num = 2 [(tableau.field) = {name:"Num"}];
  protoconf.FruitType fruit_type = 3 [(tableau.field) = {name:"FruitType"}];
  repeated int32 feature_list = 4 [(tableau.field) = {name:"Feature" layout:LAYOUT_INCELL}];
  map<int32, string> prop_map = 5 [(tableau.field) = {name:"Prop" layout:LAYOUT_INCELL}];
  Detail detail = 6 [(tableau.field) = {name:"Detail" span:SPAN_INNER_CELL}];
  message Detail {
    protoconf.ItemType type = 1 [(tableau.field) = {name:"Type"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

### 在工作表中定义多个结构体类型

> 一个块定义一个结构体类型，它是一系列连续的非空行。
> 因此不同的块由一个或多个空行分隔。

您应该在元数据表 `@TABLEAU` 中将 `Mode` 选项指定为 `MODE_STRUCT_TYPE_MULTI`。

例如，`HelloWorld.xlsx` 中的工作表 `Item`：

{{< spreadsheet "HelloWorld.xlsx" Item "@TABLEAU" >}}

{{< sheet >}}

| Tree      | Tree note          |
| --------- | ------------------ |
| Name      | Type               |
| ID        | uint32             |
| Num       | int32              |
|           |                    |
| Pet       | Pet note           |
| Name      | Type               |
| Kind      | int32              |
| Tip       | []string           |
|           |                    |
| FruitShop | FruitShop note     |
| Name      | Type               |
| FruitType | enum<.FruitType>   |
| Prop      | map<int32, string> |

{{< /sheet >}}

{{< sheet >}}

| Sheet | Mode                   |
| ----- | ---------------------- |
| Item  | MODE_STRUCT_TYPE_MULTI |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message Tree {
  option (tableau.struct) = {name:"StructType" note:"Tree note"};
  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  int32 num = 2 [(tableau.field) = {name:"Num"}];
}
message Pet {
  option (tableau.struct) = {name:"StructType" note:"Pet note"};
  int32 kind = 1 [(tableau.field) = {name:"Kind"}];
  repeated string tip_list = 2 [(tableau.field) = {name:"Tip" layout:LAYOUT_INCELL}];
}
message FruitShop {
  option (tableau.struct) = {name:"StructType" note:"FruitShop note"};
  protoconf.FruitType fruit_type = 1 [(tableau.field) = {name:"FruitType"}];
  map<int32, string> prop_map = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

### 指定 Number 列

在 `Number` 列中，您可以指定自定义的唯一字段编号。

例如，`HelloWorld.xlsx` 中的工作表 `Item`：

{{< spreadsheet "HelloWorld.xlsx" Item "@TABLEAU" >}}

{{< sheet >}}

| Number | Name      | Type             |
| ------ | --------- | ---------------- |
| 1      | ID        | uint32           |
| 20     | Num       | int32            |
| 30     | FruitType | enum<.FruitType> |

{{< /sheet >}}

{{< sheet >}}

| Sheet | Mode             |
| ----- | ---------------- |
| Item  | MODE_STRUCT_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// 从工作表生成：Item。
message Item {
  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  int32 num = 20 [(tableau.field) = {name:"Num"}];
  protoconf.FruitType fruit_type = 30 [(tableau.field) = {name:"FruitType"}];
}
```

{{< /details >}}
