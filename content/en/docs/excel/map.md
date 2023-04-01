---
title: "Map"
description: "Map features."
lead: "This guide demonstrates different features of map type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 7105
toc: true
---

## Horizontal map

There are some kinds of horizontal map:

1. Horizontal **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. Horizontal **struct** map, as map value type is struct. E.g: `map<int32, Item>`.
3. Horizontal **predefined-struct** map, as map value type is predefined struct. E.g: `map<int32, .Item>`.

### Horizontal scalar map

No need to support, use this instead: `map<int32, Item>`.

### Horizontal struct map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID           | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
|-------------------|--------------|------------|--------------|------------|--------------|
| map<uint32, Item> | string       | uint32     | string       | uint32     | string       |
| Item1's ID        | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                 | Apple        | 2          | Orange       | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "1": {
            "id": 1,
            "name": "Apple"
        },
        "2": {
            "id": 2,
            "name": "Orange"
        },
        "3": {
            "id": 3,
            "name": "Banana"
        }
    }
}
```

{{< /details >}}

### Horizontal predefined-struct map

`Item` in *common.proto* is predefined as:

```proto
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID           | Item1Num    | Item2ID    | Item2Num    | Item3ID    | Item3Num    |
|-------------------|-------------|------------|-------------|------------|-------------|
| map<int32, .Item> | int32       | int32      | int32       | int32      | int32       |
| Item1's ID        | Item1's num | Item2's ID | Item3's num | Item3's ID | Item3's num |
| 1                 | 100         | 2          | 200         | 3          | 300         |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, protoconf.Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "num": 100
        },
        "2": {
            "id": 2,
            "num": 200
        },
        "3": {
            "id": 3,
            "num": 300
        }
    }
}
```

{{< /details >}}

## Vertical map

There are some kinds of vertical map:

1. Vertical **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. Vertical **struct** map, as map value type is struct. E.g: `map<int32, Item>`.
3. Vertical **predefined-struct** map, as map value type is predefined struct. E.g: `map<int32, .Item>`.

### Vertical scalar map

No need to support, use `map<int32, Item>` instead.

### Vertical struct map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Desc                          |
|-------------------|-------------|-------------------------------|
| map<uint32, Item> | string      | string                        |
| Item’s ID         | Item’s name | Item’s desc                   |
| 1                 | Apple       | A kind of delicious fruit.    |
| 2                 | Orange      | A kind of sour fruit.         |
| 3                 | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "1": {
            "id": 1,
            "name": "Apple",
            "desc": "A kind of delicious fruit."
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "desc": "A kind of sour fruit."
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "desc": "A kind of calorie-rich fruit."
        }
    }
}
```

{{< /details >}}

### Vertical predefined-struct map

`Item` in *common.proto* is predefined as:

```proto
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Num        |
|-------------------|------------|
| map<int32, .Item> | int32      |
| Item's ID         | Item's num |
| 1                 | 100        |
| 2                 | 200        |
| 3                 | 300        |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, protoconf.Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "num": 100
        },
        "2": {
            "id": 2,
            "num": 200
        },
        "3": {
            "id": 3,
            "num": 300
        }
    }
}
```

{{< /details >}}

## Incell map

There are some kinds of in-cell map:

1. in-cell **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. in-cell **struct** map, as map value type is struct. E.g: `map<int32, Item>`.

### Incell scalar map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Items                              |
|------------------------------------|
| map<uint32, string>                |
| Items                              |
| 1:Apple,2:Orange,3:Banana,4,:Peach |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

The `Items` column's type is in-cell map `map<uint32, string>`, as the map value is scalar type `string`.

> ⚠️ NOTE: If you want explicit pattern like: `[Key:Value]...`, then set the field property `present` as true.
> See [Option `present` →]({{< relref "field-property/#option-present" >}}).

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, string> items_map = 1 [(tableau.field) = {name:"Items" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "itemsMap": {
        "0":  "Peach",
        "1": "Apple",
        "2": "Orange",
        "3": "Banana",
        "4":  ""
    }
}
```

{{< /details >}}

### Incell enum map

The key and value of incell map can be enum types.

For example, predefined enum types `FruitType` and `FruitFlavor` in *common.proto* are:

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

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Fruit                        | Flavor                         | Item                                      |
|------------------------------|--------------------------------|-------------------------------------------|
| map<enum<.FruitType>, int64> | map<int64, enum<.FruitFlavor>> | map<enum<.FruitType>, enum<.FruitFlavor>> |
| Fruits                       | Flavors                        | Items                                     |
| Apple:1,Orange:2             | 1:Fragrant,2:Sweet             | Apple:Fragrant,Orange:Sour                |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "1": {
            "key": "FRUIT_TYPE_APPLE",
            "value": "1"
        },
        "3": {
            "key": "FRUIT_TYPE_ORANGE",
            "value": "2"
        }
    },
    "flavorMap": {
        "1": "FRUIT_FLAVOR_FRAGRANT",
        "2": "FRUIT_FLAVOR_SWEET"
    },
    "itemMap": {
        "1": {
            "key": "FRUIT_TYPE_APPLE",
            "value": "FRUIT_FLAVOR_FRAGRANT"
        },
        "3": {
            "key": "FRUIT_TYPE_ORANGE",
            "value": "FRUIT_FLAVOR_SOUR"
        }
    }
}
```

{{< /details >}}

## Empty key map

If map key is not configured, then it will be treated as default value of map key type. Default value is illustrated at [Scalar types →]({{< relref "../basics/grammar-and-types/#scalar-types" >}}).

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Desc        |
|-------------------|-------------|
| map<uint32, Item> | string      |
| Item's ID         | Item's name |
| 1                 | Apple       |
|                   | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "0": {
            "id": 0,
            "desc": "Orange"
        },
        "1": {
            "id": 1,
            "desc": "Apple"
        },
        "3": {
            "id": 3,
            "desc": "Banana"
        }
    }
}
```

{{< /details >}}

## Enum key map

As the protobuf documents the restrictions of [map key type](https://developers.google.com/protocol-buffers/docs/proto3#maps):

> ... the `key_type` can be any integral or string type (so, any
> [scalar](https://developers.google.com/protocol-buffers/docs/proto3#scalar) type
> except for floating point types and `bytes`). Note that `enum` is not a valid `key_type`.

However, key type as enum is very useful in some situations. So we
support it in a simple way:

- enum type is treated as `int32` as map key type，
- enum type is keeped in map value type (struct).

For example, `FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

then `map<enum<.FruitType>, ValueType>` will be converted to `map<int32, ValueType>`,
and `FruitType` is keeped in `ValueType`:

```protobuf
message ValueType {
  FruitType key = 1;
  ...
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Type                        | Price        |
|-----------------------------|--------------|
| map<enum<.FruitType>, Item> | int32        |
| Item's type                 | Item's price |
| Apple                       | 100          |
| Orange                      | 200          |
| Banana                      | 300          |

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
        "1": {
            "type": "FRUIT_TYPE_APPLE",
            "price": 100
        },
        "3": {
            "type": "FRUIT_TYPE_ORANGE",
            "price": 200
        },
        "4": {
            "type": "FRUIT_TYPE_BANANA",
            "price": 300
        }
    }
}
```

{{< /details >}}

## Horizontal map size

### Dynamic size

By default, all maps are **Dynamically Sized Types**. Map items should be present continuously, otherwise an error is reported if an empty item is existed in between.

### Fixed size

#### Implicit fixed size

The map size is auto resolved by the max map items present in name row.

In this example below, though the second map item **Item2** is empty, it is legal as the field property `fixed` is set `true`. Besides, **Item2** will also be generated as an empty map item. You can see it in the generated file *ItemConf.json*.

{{< alert icon="👉" context="info" text="If more than one empty map items are inserted into map, then only one empty map item is really generated. Because all the empty map items's keys are same. This is different from list, you should pay special attention to it." />}}

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                         | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
|---------------------------------|--------------|------------|--------------|------------|--------------|
| map<uint32, Item>\|{fixed:true} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                      | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                               | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "0": {
            "id": 0,
            "name": ""
        },
        "1": {
            "id": 1,
            "name": "Apple"
        },
        "3": {
            "id": 3,
            "name": "Banana"
        }
    }
}
```

{{< /details >}}

#### Explicit fixed size

The map size is explicitly set by field property `size`.

In this example below, field property `size` is set as 2, then map items after the second item **Item2** will all be truncated. Besides, **Item2** will also be generated as an empty map item. You can see it in the generated file *ItemConf.json*.

{{< alert icon="👉" context="info" text="If more than one empty map items are inserted into map, then only one empty map item is really generated. Because all the empty map items's keys are same. This is different from list, you should pay special attention to it." />}}

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID                     | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
|-----------------------------|--------------|------------|--------------|------------|--------------|
| map<uint32, Item>\|{size:2} | string       | uint32     | string       | uint32     | string       |
| Item1's ID                  | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                           | Apple        |            |              | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
        "0": {
            "id": 0,
            "name": ""
        },
        "1": {
            "id": 1,
            "name": "Apple"
        }
    }
}
```

{{< /details >}}

## Advanced features

### Horizontal column-skipped map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| D                 | Prop1ID          |              | Prop1Value    | Prop2ID    |              | Prop2Value    |
|:------------------|:-----------------|:-------------|:--------------|:-----------|:-------------|:--------------|
| map<uint32, Item> | map<int32, Prop> |              | int32         | int32      |              | int32         |
| Item's ID         | Prop1’s ID       | Prop1’s name | Prop1’s value | Prop2’s ID | Prop2’s name | Prop2’s value |
| 1                 | 1                | Apple        | 100           | 2          | Orange       | 200           |
| 2                 | 3                | Banana       | 300           | 4          | Pomelo       | 400           |
| 3                 | 5                | Watermelon   | 500           |            |              |               |

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

{{< details "HeroConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "desc": "item1",
            "propertyMap": {
                "1": {
                    "id": 1,
                    "value": "10"
                },
                "2": {
                    "id": 2,
                    "value": "20"
                }
            }
        },
        "2": {
            "id": 2,
            "desc": "item2",
            "propertyMap": {
                "3": {
                    "id": 3,
                    "value": "30"
                },
                "4": {
                    "id": 4,
                    "value": "40"
                }
            }
        },
        "3": {
            "id": 3,
            "desc": "item3",
            "propertyMap": {
                "5": {
                    "id": 5,
                    "value": "50"
                }
            }
        }
    }
}
```

{{< /details >}}

### Ordered-map

In the metasheet `@TABLEAU`, set the `OrderedMap` option to `true`, then
ordered map accessers will be generated. This feature is powered by [tableauio/loader](https://github.com/tableauio/loader). Currently supported programming languages are:

- [x] C++
- [ ] Golang
- [ ] C#

#### Example

If we want `ItemConf` to generate ordered map accessers, then set
`OrderedMap` option to `true` of metasheet `@TABLEAU`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
|-------------------|-------------|
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | OrderedMap |
|----------|------------|
| ItemConf | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

More useful options are illustrated at metasheet chapter. [Metasheet @TABLEAU →]({{< relref "metasheet" >}})
