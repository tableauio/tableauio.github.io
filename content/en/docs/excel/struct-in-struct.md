---
title: "Struct in struct"
description: "Excel struct in struct guide."
lead: "Excel nesting specification of struct in struct."
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7201
toc: true
---

## Struct in struct

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardID      | RewardItemID | RewardItemNum |
| ------------- | ------------ | ------------- |
| {Reward}int32 | {Item}int32  | int32         |
| Reward's ID   | Item's ID    | Item's num    |
| 1             | 1            | 10            |

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

  Reward reward = 1 [(tableau.field) = {name:"Reward"}];
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
    "reward": {
        "id": 1,
        "item": {
            "id": 1,
            "num": 10
        }
    }
}
```

{{< /details >}}

## Predefined-struct in struct

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

| RewardID      | RewardItemID | RewardItemNum |
| ------------- | ------------ | ------------- |
| {Reward}int32 | {.Item}int32 | int32         |
| Reward's ID   | Item's ID    | Item's num    |
| 1             | 1            | 10            |

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

  Reward reward = 1 [(tableau.field) = {name:"Reward"}];
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
    "reward": {
        "id": 1,
        "item": {
            "id": 1,
            "num": 10
        }
    }
}
```

{{< /details >}}

## Incell-struct in struct

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardID      | RewardItem                |
| ------------- | ------------------------- |
| {Reward}int32 | {int32 ID, int32 Num}Item |
| Reward's ID   | Reward's item             |
| 1             | 1,100                     |
|               | 2,200                     |

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

  Reward reward = 1 [(tableau.field) = {name:"Reward"}];
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
    "reward": {
        "id": 1,
        "item": {
            "id": 2,
            "num": 200
        }
    }
}
```

{{< /details >}}
