---
title: "Struct in list"
description: "Excel struct in list guide."
lead: "Excel nesting specification of struct in list."
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7202
toc: true
---

## Nested in vertical-list

### Struct in vertical-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Name        | PropID      | PropValue    |
| ------------ | ----------- | ----------- | ------------ |
| [Item]uint32 | string      | {Prop}int32 | int64        |
| Item's ID    | Item's name | Prop's ID   | Prop's value |
| 1            | Apple       | 1           | 10           |
| 2            | Orange      | 2           | 20           |
| 3            | Banana      |             |              |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    Prop prop = 3 [(tableau.field) = {name:"Prop"}];
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
            "prop": {
                "id": 1,
                "value": "10"
            }
        },
        {
            "id": 2,
            "name": "Orange",
            "prop": {
                "id": 2,
                "value": "20"
            }
        },
        {
            "id": 3,
            "name": "Banana",
            "prop": null
        }
    ]
}
```

{{< /details >}}

### Incell-struct in vertical-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID           | Name        | PropID                     |
| ------------ | ----------- | -------------------------- |
| [Item]uint32 | string      | {int32 ID,int64 Value}Prop |
| Item's ID    | Item's name | Prop's ID                  |
| 1            | Apple       | 1,100                      |
| 2            | Orange      | 2,200                      |
| 3            | Banana      |                            |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    Prop prop_id = 3 [(tableau.field) = {name:"PropID" span:SPAN_INNER_CELL}];
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
            "propId": {
                "id": 1,
                "value": "100"
            }
        },
        {
            "id": 2,
            "name": "Orange",
            "propId": {
                "id": 2,
                "value": "200"
            }
        },
        {
            "id": 3,
            "name": "Banana",
            "propId": null
        }
    ]
}
```

{{< /details >}}

## First-field in horizontal-list

### Struct in horizontal-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ItemID       | Reward1ItemNum | Reward1Name   | Reward2ItemID | Reward2ItemNum | Reward2Name   |
| ------------------- | -------------- | ------------- | ------------- | -------------- | ------------- |
| [Reward]{Item}int32 | int32          | string        | int32         | int32          | string        |
| Item1's ID          | Item1's num    | Reward's name | Item1's ID    | Item1's num    | Reward's name |
| 1                   | 10             | Lotto         | 10            | 100            | Super Lotto   |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Reward reward_list = 1 [(tableau.field) = {name:"Reward" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    Item item = 1 [(tableau.field) = {name:"Item"}];
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
            "item": {
                "id": 1,
                "num": 10
            },
            "name": "Lotto"
        },
        {
            "item": {
                "id": 10,
                "num": 100
            },
            "name": "Super Lotto"
        }
    ]
}
```

{{< /details >}}

### Predefined-struct in horizontal-list

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

| Reward1ItemID        | Reward1ItemNum | Reward1Name   | Reward2ItemID | Reward2ItemNum | Reward2Name   |
| -------------------- | -------------- | ------------- | ------------- | -------------- | ------------- |
| [Reward]{.Item}int32 | int32          | string        | int32         | int32          | string        |
| Item1's ID           | Item1's num    | Reward's name | Item1's ID    | Item1's num    | Reward's name |
| 1                    | 10             | Lotto         | 10            | 100            | Super Lotto   |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Reward reward_list = 1 [(tableau.field) = {name:"Reward" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    protoconf.Item item = 1 [(tableau.field) = {name:"Item"}];
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
            "item": {
                "id": 1,
                "num": 10
            },
            "name": "Lotto"
        },
        {
            "item": {
                "id": 10,
                "num": 100
            },
            "name": "Super Lotto"
        }
    ]
}
```

{{< /details >}}

### Incell-struct in horizontal-list

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1Item                       | Reward1Name   | Reward2Item    | Reward2Name   |
| --------------------------------- | ------------- | -------------- | ------------- |
| [Reward]{int32 ID, int32 Num}Item | string        | Item           | string        |
| Reward1's item                    | Reward's name | Reward2's item | Reward's name |
| 1,10                              | Lotto         | 2,20           | Super Lotto   |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    Prop prop_id = 3 [(tableau.field) = {name:"PropID" span:SPAN_INNER_CELL}];
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
    "rewardList": [
        {
            "item": {
                "id": 1,
                "num": 10
            },
            "name": "Lotto"
        },
        {
            "item": {
                "id": 2,
                "num": 20
            },
            "name": "Super Lotto"
        }
    ]
}
```

{{< /details >}}
