---
title: "Struct"
description: "Struct features."
lead: "This guide demonstrates different features of struct type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 7102
toc: true
---

## Cross-cell struct

**Syntax**: `<StructType>ColumnType`.

Each column name should be prefixed with the same struct variable name, which is just the same as struct type name by default.

For example, a worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| PropertyID      | PropertyName    | PropertyDesc           |
|:----------------|:----------------|:-----------------------|
| {Property}int32 | string          | string                 |
| Property's ID   | Property's Name | Property's Description |
| 1               | Orange          | A kind of sour fruit.  |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Note that each column name in `ItemConf` is prefixed with struct variable name **Property** which is same as struct type name.

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "id":  1,
        "name":  "Orange",
        "desc":  "A kind of sour fruit."
    }
}
```

{{< /details >}}

### Note

Cross-cell struct is usually used together with:

- cross-cell horizontal/vertical map, as map value type. [Map →]({{< relref "map" >}})
- cross-cell horizontal/vertical list, as list element type. [List →]({{< relref "list" >}})

## Incell struct

Each field type of the struct should be scalar type.

For example, a worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Prop                                       |
|------------------|--------------------------------------------|
| map<int32, Item> | {int32 ID,string Name,string Desc}Property |
| Item's ID        | Item's property.                           |
| 1                | 1,Orange,A good fruit.                     |
| 2                | 2,Apple                                    |
| 3                | 3                                          |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

The `Property` column's type is in-cell struct `{int32 ID,string Name,string Desc}Property`.

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
            "id":  1,
            "prop":  {
                "id":  1,
                "name":  "Apple",
                "desc":  "A kind of delicious fruit."
            }
        },
        "2":  {
            "id":  2,
            "prop":  {
                "id":  2,
                "name":  "Orange",
                "desc":  ""
            }
        },
        "3":  {
            "id":  3,
            "prop":  {
                "id":  3,
                "name":  "",
                "desc":  ""
            }
        }
    }
}
```

{{< /details >}}

## Predefined incell struct

Each field type of the predefined struct should be scalar type.

For example, `Property` in *common.proto* is predefined as:

```protobuf
message Property {
  int32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Prop                   |
|-------------------|------------------------|
| map<uint32, Item> | {.Property}            |
| Item's ID         | Item's property.       |
| 1                 | 1,Orange,A good fruit. |
| 2                 | 2,Apple                |
| 3                 | 3                      |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

The `Prop` column's type is a predefined struct `Property`.

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
            "id":  1,
            "prop":  {
                "id":  1,
                "name":  "Apple",
                "desc":  "A kind of delicious fruit."
            }
        },
        "2":  {
            "id":  2,
            "prop":  {
                "id":  2,
                "name":  "Orange",
                "desc":  ""
            }
        },
        "3":  {
            "id":  3,
            "prop":  {
                "id":  3,
                "name":  "",
                "desc":  ""
            }
        }
    }
}
```

{{< /details >}}

## Custom named struct

By default, struct variable name is same as struct type name, but you can specify a different struct variable name. Custom named struct is mainly used to identify name prefix of continuous cells in name row, when the tableau (protogen) can't auto-recognize the variable name.

**Syntax**: just after struct type name, use parentheses `()` to specify struct variable name: `VariableType(VariableName)`.

For example, `Item` is predefined:

```protobuf
message Item {
  int32 id = 1 [(tableau.field).name = "ID"];
  int32 num = 2 [(tableau.field).name = "Num"];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardItemID            | RewardItemNum | CostItemID            | CostItemNum | PredefinedItemID             | PredefinedItemNum    |
|-------------------------|---------------|-----------------------|-------------|------------------------------|----------------------|
| {Item(RewardItem)}int32 | int32         | {Item(CostItem)}int32 | int32       | {.Item(PredefinedItem)}int32 | int32                |
| Item's ID               | Item's ID     | Cost's ID             | Cost's ID   | Predefined item's ID         | Predefined item's ID |
| 1                       | 100           | 2                     | 200         | 10                           | 20                   |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

**Details**:
In type cell `{Item(RewardItem)}int32`, `RewardItem` is the custom variable name of new defined struct `Item`. And in type cell `{Item(CostItem)}int32`, `CostItem` is the custom variable name of just already defined struct `Item` in the same scope. Finally, in type cell `{.Item(PredefinedItem)}int32`, `PredefinedItem` is the custom variable name of predefined struct `Item` at global (at the same protobuf package).

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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

## Advanced predefined incell struct

In some situations, you may want to configure any complex struct in a cell, so tableau support two kinds of protobuf serialized formats: [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec), and [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).

**Syntax**: in field prop, specify `form` option as `FORM_TEXT` or `FORM_JSON`.

For example, `Transform` is predefined as:

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

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Transform1                                                        | Transform2                                                                                          |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| {.Transform}\|{form:FORM_TEXT}                                    | {.Transform}\|{form:FORM_JSON}                                                                      |
| Box's transform1                                                  | Box's transform2                                                                                    |
| position:{x:1 y:2 z:3} rotation:{x:4 y:5 z:6} scale:{x:7 y:8 z:9} | {"position":{"x":1, "y":2, "z":3}, "rotation":{"x":4, "y":5, "z":6}, "scale":{"x":7, "y":8, "z":9}} |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
