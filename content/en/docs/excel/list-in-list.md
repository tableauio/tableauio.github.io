---
title: "List in list"
description: "Excel list in list guide."
lead: "Excel nesting specification of list in list."
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7301
toc: true
---

## Nested in vertical-list

### Horizontal-list in vertical-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Name        | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
| ------------ | ----------- | ----------- | ------------- | ---------- | ------------- |
| [Item]uint32 | string      | [Prop]int32 | int64         | int32      | int64         |
| Item's ID    | Item's name | Prop1's ID  | Prop1's value | Prop2's ID | Prop2's value |
| 1            | Apple       | 1           | 10            | 2          | 20            |
| 2            | Orange      | 3           | 30            |            |               |
| 3            | Banana      |             |               |            |               |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Name        | PropID      | PropValue    |
| ---------------- | ----------- | ----------- | ------------ |
| [Item]\<uint32\> | string      | [Prop]int32 | int64        |
| Item's ID        | Item's name | Prop's ID   | Prop's value |
| 1                | Apple       | 1           | 10           |
| 2                | Orange      | 1           | 20           |
| 2                | Banana      | 2           | 30           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

### Vertical-keyed-list in vertical-keyed-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                    | Desc        | PropID           | PropNum    |
| --------------------- | ----------- | ---------------- | ---------- |
| [KeyedItem]\<uint32\> | string      | [Prop]\<uint32\> | int32      |
| Item's ID             | Item's desc | Prop's ID        | Prop's num |
| 1                     | Apple       | 10               | 100        |
| 1                     | Banana      | 11               | 110        |
| 2                     | Orange      | 20               | 200        |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated KeyedItem keyed_item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message KeyedItem {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    repeated Prop prop_list = 3 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
    message Prop {
      uint32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int32 prop_num = 2 [(tableau.field) = {name:"PropNum"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "keyedItemList": [
        {
            "id": 1,
            "desc": "Apple",
            "propList": [
                {
                    "propId": 10,
                    "propNum": 100
                },
                {
                    "propId": 11,
                    "propNum": 110
                }
            ]
        },
        {
            "id": 2,
            "desc": "Orange",
            "propList": [
                {
                    "propId": 20,
                    "propNum": 200
                }
            ]
        }
    ]
}
```

{{< /details >}}

### Incell-list in vertical-keyed-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Prop         |
| ------------ | ------------ |
| [Item]uint32 | []int32      |
| Item's ID    | Item's props |
| 1            | 10,20,30     |
| 2            | 10,20        |
| 3            | 10           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

### Incell-keyed-list in vertical-keyed-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                                    | Desc        | Tip          |
| ------------------------------------- | ----------- | ------------ |
| [KeyedItem]\<uint32\>\|{unique:false} | string      | []\<uint32\> |
| Item's ID                             | Item's desc | Item's tip   |
| 1                                     | Apple       | 1,2,3        |
| 1                                     | Banana      | 4,5          |
| 2                                     | Orange      | 1,2          |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

We want the parent struct keyed-list to aggreate incell keyed-list, so need to set the field property `unique` to `false`.

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated KeyedItem keyed_item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message KeyedItem {
    uint32 id = 1 [(tableau.field) = {name:"ID" prop:{unique:false}}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    repeated uint32 tip_list = 3 [(tableau.field) = {name:"Tip" key:"Tip" layout:LAYOUT_INCELL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "keyedItemList": [
        {
            "id": 1,
            "desc": "Apple",
            "tipList": [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            "id": 2,
            "desc": "Orange",
            "tipList": [
                1,
                2
            ]
        }
    ]
}
```

{{< /details >}}

## Nested in horizontal-list

### Horizontal-list in horizontal-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1Item1ID      | Reward1Item1Num | Reward1Item2ID | Reward1Item2Num | Reward1Name   | Reward2Item1ID | Reward2Item1Num | Reward2Name   |
| ------------------- | --------------- | -------------- | --------------- | ------------- | -------------- | --------------- | ------------- |
| [Reward][Item]int32 | int32           | int32          | int32           | string        | int32          | int32           | string        |
| Item1's ID          | Item1's num     | Item2's ID     | Item2's num     | Reward's name | Item1's ID     | Item1's num     | Reward's name |
| 1                   | 10              | 2              | 20              | Lotto         | 10             | 100             | Super Lotto   |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1Item1ID       | Reward1Item1Num | Reward1Item2ID | Reward1Item2Num | Reward1Name   | Reward2Item1ID | Reward2Item1Num | Reward2Name   |
| -------------------- | --------------- | -------------- | --------------- | ------------- | -------------- | --------------- | ------------- |
| [Reward][.Item]int32 | int32           | int32          | int32           | string        | int32          | int32           | string        |
| Item1's ID           | Item1's num     | Item2's ID     | Item2's num     | Reward's name | Item1's ID     | Item1's num     | Reward's name |
| 1                    | 10              | 2              | 20              | Lotto         | 10             | 100             | Super Lotto   |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

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

### Incell-list in horizontal-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Task1Param    | Task2Param | Task3Param |
| ------------- | ---------- | ---------- |
| [Task][]int32 | []int32    | []int32    |
| Task1         | Task2      | Task3      |
| 1,2           | 3,4        | 5,6,7      |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Task task_list = 1 [(tableau.field) = {name:"Task" layout:LAYOUT_HORIZONTAL}];
  message Task {
    repeated int32 param_list = 1 [(tableau.field) = {name:"Param" layout:LAYOUT_INCELL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "taskList": [
        {
            "paramList": [
                1,
                2
            ]
        },
        {
            "paramList": [
                3,
                4
            ]
        },
        {
            "paramList": [
                5,
                6,
                7
            ]
        }
    ]
}
```

{{< /details >}}
