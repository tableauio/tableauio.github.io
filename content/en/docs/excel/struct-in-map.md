---
title: "Struct in map"
description: "Struct in map"
lead: "Nesting examples of struct in map."
date: 2022-02-26T08:48:57+00:00
lastmod: 2022-02-26T08:48:57+00:00
draft: false
images: []
weight: 7511
toc: true
---

## Nested in vertical-map

### Struct in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                 | ItemID      | ItemNum    |
|--------------------|-------------|------------|
| map<int32, Reward> | {Item}int32 | int32      |
| Reward's ID        | Item's ID   | Item's Num |
| 1                  | 1           | 10         |
| 2                  | 2           | 20         |
| 3                  |             |            |

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

  map<int32, Reward> reward_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Reward {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    Item item = 2 [(tableau.field) = {name:"Item"}];
    message Item {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
            "item": {
                "id": 1,
                "num": 10
            }
        },
        "2": {
            "id": 2,
            "item": {
                "id": 2,
                "num": 20
            }
        },
        "3": {
            "id": 3,
            "item": null
        }
    }
}
```

{{< /details >}}

### Predefined-struct in vertical-map

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

| ID                 | ItemID       | ItemNum    |
|--------------------|--------------|------------|
| map<int32, Reward> | {.Item}int32 | int32      |
| Reward's ID        | Item's ID    | Item's Num |
| 1                  | 1            | 10         |
| 2                  | 2            | 20         |
| 3                  |              |            |

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

  map<int32, Reward> reward_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Reward {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.Item item = 2 [(tableau.field) = {name:"Item"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
            "item": {
                "id": 1,
                "num": 10
            }
        },
        "2": {
            "id": 2,
            "item": {
                "id": 2,
                "num": 20
            }
        },
        "3": {
            "id": 3,
            "item": null
        }
    }
}
```

{{< /details >}}

### Incell-struct in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                 | Item                      |
|--------------------|---------------------------|
| map<int32, Reward> | {int32 ID, int32 Num}Item |
| Reward's ID        | Item's info               |
| 1                  | 1,100                     |
| 2                  | 2,200                     |
| 3                  |                           |

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

  map<int32, Reward> reward_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Reward {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    Item item = 2 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
    message Item {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
            "item": {
                "id": 1,
                "num": 100
            }
        },
        "2": {
            "id": 2,
            "item": {
                "id": 2,
                "num": 200
            }
        },
        "3": {
            "id": 3,
            "item": null
        }
    }
}
```

{{< /details >}}
