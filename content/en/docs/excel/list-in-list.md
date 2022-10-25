---
title: "List in list"
description: "List in list"
lead: "Nesting examples of list in list."
date: 2022-02-26T08:48:57+00:00
lastmod: 2022-02-26T08:48:57+00:00
draft: false
images: []
weight: 7301
toc: true
---

## Nested in vertical-list

### Horizontal-list in vertical-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Name        | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
|--------------|-------------|-------------|---------------|------------|---------------|
| [Item]uint32 | string      | [Prop]int32 | int64         | int32      | int64         |
| Item's ID    | Item's name | Prop1's ID  | Prop1's value | Prop2's ID | Prop2's value |
| 1            | Apple       | 1           | 10            | 2          | 20            |
| 2            | Orange      | 3           | 30            |            |               |
| 3            | Banana      |             |               |            |               |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
    message Prop {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int64 value = 2 [(tableau.field) = {name:"Value"}];
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
            "name": "Apple",
            "propList": [
                {
                    "id": 1,
                    "value": "10"
                },
                {
                    "id": 2,
                    "value": "20"
                }
            ]
        },
        {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "id": 3,
                    "value": "30"
                }
            ]
        },
        {
            "id": 3,
            "name": "Banana",
            "propList": []
        }
    ]
}
```

{{< /details >}}

### Vertical-list in vertical-keyed-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Name        | PropID      | PropValue    |
|------------------|-------------|-------------|--------------|
| [Item]\<uint32\> | string      | [Prop]int32 | int64        |
| Item's ID        | Item's name | Prop's ID   | Prop's value |
| 1                | Apple       | 1           | 10           |
| 2                | Orange      | 1           | 20           |
| 2                | Banana      | 2           | 30           |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
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
            "name": "Apple",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "10"
                }
            ]
        },
        {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "20"
                },
                {
                    "propId": 2,
                    "propValue": "30"
                }
            ]
        }
    ]
}
```

{{< /details >}}

### Incell-list in vertical-keyed-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Prop         |
|--------------|--------------|
| [Item]uint32 | []int32      |
| Item's ID    | Item's props |
| 1            | 10,20,30     |
| 2            | 10,20        |
| 3            | 10           |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated int32 prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_INCELL}];
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
            "propList": [
                10,
                20,
                30
            ]
        },
        {
            "id": 2,
            "propList": [
                10,
                20
            ]
        },
        {
            "id": 3,
            "propList": [
                10
            ]
        }
    ]
}
```

{{< /details >}}

## First-field in horizontal-list

### Horizontal-list in horizontal-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1Item1ID      | Reward1Item1Num | Reward1Item2ID | Reward1Item2Num | Reward1Name   | Reward2Item1ID | Reward2Item1Num | Reward2Name   |
|---------------------|-----------------|----------------|-----------------|---------------|----------------|-----------------|---------------|
| [Reward][Item]int32 | int32           | int32          | int32           | string        | int32          | int32           | string        |
| Item1's ID          | Item1's num     | Item2's ID     | Item2's num     | Reward's name | Item1's ID     | Item1's num     | Reward's name |
| 1                   | 10              | 2              | 20              | Lotto         | 10             | 100             | Super Lotto   |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Reward reward_list = 1 [(tableau.field) = {name:"Reward" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}];
    message Item {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardList": [
        {
            "itemList": [
                {
                    "id": 1,
                    "num": 10
                },
                {
                    "id": 2,
                    "num": 20
                }
            ],
            "name": "Lotto"
        },
        {
            "itemList": [
                {
                    "id": 10,
                    "num": 100
                }
            ],
            "name": "Super Lotto"
        }
    ]
}
```

{{< /details >}}

### Predefined-struct-list in horizontal-list

`Item` in **common.proto** is predefined as:

```proto
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1Item1ID       | Reward1Item1Num | Reward1Item2ID | Reward1Item2Num | Reward1Name   | Reward2Item1ID | Reward2Item1Num | Reward2Name   |
|----------------------|-----------------|----------------|-----------------|---------------|----------------|-----------------|---------------|
| [Reward][.Item]int32 | int32           | int32          | int32           | string        | int32          | int32           | string        |
| Item1's ID           | Item1's num     | Item2's ID     | Item2's num     | Reward's name | Item1's ID     | Item1's num     | Reward's name |
| 1                    | 10              | 2              | 20              | Lotto         | 10             | 100             | Super Lotto   |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Reward reward_list = 1 [(tableau.field) = {name:"Reward" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    repeated protoconf.Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardList": [
        {
            "itemList": [
                {
                    "id": 1,
                    "num": 10
                },
                {
                    "id": 2,
                    "num": 20
                }
            ],
            "name": "Lotto"
        },
        {
            "itemList": [
                {
                    "id": 10,
                    "num": 100
                }
            ],
            "name": "Super Lotto"
        }
    ]
}
```

{{< /details >}}
