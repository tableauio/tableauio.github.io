---
title: "结构体中的结构体"
description: "Excel 结构体中结构体指南。"
lead: "Excel 结构体中结构体的嵌套规范。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7201
toc: true
---

## 结构体中的结构体

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardID      | RewardItemID | RewardItemNum |
| ------------- | ------------ | ------------- |
| {Reward}int32 | {Item}int32  | int32         |
| 奖励的 ID     | 物品的 ID    | 物品的数量    |
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

生成结果：

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

## 结构体中的预定义结构体

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardID      | RewardItemID | RewardItemNum |
| ------------- | ------------ | ------------- |
| {Reward}int32 | {.Item}int32 | int32         |
| 奖励的 ID     | 物品的 ID    | 物品的数量    |
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

生成结果：

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

## 结构体中的单元格内结构体

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| RewardID      | RewardItem                |
| ------------- | ------------------------- |
| {Reward}int32 | {int32 ID, int32 Num}Item |
| 奖励的 ID     | 奖励的物品                |
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

生成结果：

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