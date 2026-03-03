---
title: "Struct in map"
description: "Excel struct in map 使用指南。"
lead: "Excel map 中嵌套 struct 的规范说明。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7203
toc: true
---

## 垂直 map 中的嵌套

### 垂直 map 中的 struct

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                 | ItemID      | ItemNum    |
| ------------------ | ----------- | ---------- |
| map<int32, Reward> | {Item}int32 | int32      |
| Reward's ID        | Item's ID   | Item's Num |
| 1                  | 1           | 10         |
| 2                  | 2           | 20         |
| 3                  |             |            |

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
        "1": {"id": 1, "item": {"id": 1, "num": 10}},
        "2": {"id": 2, "item": {"id": 2, "num": 20}},
        "3": {"id": 3, "item": null}
    }
}
```

{{< /details >}}

### 垂直 map 中的 predefined struct

*common.proto* 中预定义的 `Item`：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                 | ItemID       | ItemNum    |
| ------------------ | ------------ | ---------- |
| map<int32, Reward> | {.Item}int32 | int32      |
| Reward's ID        | Item's ID    | Item's Num |
| 1                  | 1            | 10         |
| 2                  | 2            | 20         |
| 3                  |              |            |

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
        "1": {"id": 1, "item": {"id": 1, "num": 10}},
        "2": {"id": 2, "item": {"id": 2, "num": 20}},
        "3": {"id": 3, "item": null}
    }
}
```

{{< /details >}}

### 垂直 map 中的 incell struct

*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                 | Item                      |
| ------------------ | ------------------------- |
| map<int32, Reward> | {int32 ID, int32 Num}Item |
| Reward's ID        | Item's info               |
| 1                  | 1,100                     |
| 2                  | 2,200                     |
| 3                  |                           |

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
        "1": {"id": 1, "item": {"id": 1, "num": 100}},
        "2": {"id": 2, "item": {"id": 2, "num": 200}},
        "3": {"id": 3, "item": null}
    }
}
```

{{< /details >}}
