---
title: "Infinite nesting"
description: "Excel 无限嵌套使用指南。"
lead: "Excel 复合类型的无限嵌套特性。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7500
toc: true
---

## 概述

现在，水平/垂直 list 元素的第一个字段可以是任意类型，包括 struct、list 和 map。

- List 元素的第一个字段是 struct：`[Reward]{Icon}int32`
- List 元素的第一个字段是 predefined struct：`[Cost]{.Item}uint32`
- List 元素的第一个字段是 incell struct：`[Magic]{int32 Id, int32 Num}Ability`
- List 元素的第一个字段是 list：`[Reward][Item]uint32`
- List 元素的第一个字段是元素为 predefined struct 的 list：`[Power][.Item]uint32`
- List 元素的第一个字段是 map：`[Superpower]map<uint32, Ability>`

> TODO: 补充清晰的示例。

## 嵌套命名

*common.proto* 中的预定义类型：

```protobuf
// --snip--
enum ConfType {
  CONF_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  CONF_TYPE_CLOUD = 1 [(tableau.evalue).name = "Cloud"];
  CONF_TYPE_LOCAL = 2 [(tableau.evalue).name = "Local"];
  CONF_TYPE_REMOTE = 3 [(tableau.evalue).name = "Remote"];
}

enum ServerType {
  SERVER_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  SERVER_TYPE_GAME = 1 [(tableau.evalue).name = "GameServer"];
  SERVER_TYPE_ACTIVITY = 2 [(tableau.evalue).name = "ActivityServer"];
  SERVER_TYPE_MATCH = 3 [(tableau.evalue).name = "MatchServer"];
}
```

{{< spreadsheet "HelloWorld.xlsx" LoaderConf "@TABLEAU" >}}

{{< sheet colored >}}

| ServerType                     | ServerConfType          | ServerConfConditionType | ServerConfConditionValue |
| ------------------------------ | ----------------------- | ----------------------- | ------------------------ |
| map<enum<.ServerType>, Server> | [Conf]<enum<.ConfType>> | [Condition]<int32>      | int32                    |
| Server name                    | Sheet name              | Condition type          | Condition value          |
|                                |                         |                         |                          |
| SERVER_TYPE_GAME               | CONF_TYPE_CLOUD         | 0                       | 113                      |
|                                |                         | 0                       | 134                      |
| SERVER_TYPE_ACTIVITY           | CONF_TYPE_CLOUD         |                         |                          |
|                                | 1                       |                         |                          |
|                                | CONF_TYPE_LOCAL         | 9                       | 34                       |
|                                | CONF_TYPE_LOCAL         | 9                       | 12                       |
|                                | CONF_TYPE_LOCAL         |                         |                          |
|                                | Remote                  |                         |                          |
| MatchServer                    | CONF_TYPE_UNKNOWN       |                         |                          |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet      | Nested |
| ---------- | ------ |
| LoaderConf | true   |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message LoaderConf {
  option (tableau.worksheet) = {name:"LoaderConf" nested:true};

  map<int32, Server> server_map = 1 [(tableau.field) = {name:"Server" key:"Type" layout:LAYOUT_VERTICAL}];
  message Server {
    ServerType type = 1 [(tableau.field) = {name:"Type"}];
    repeated Conf conf_list = 2 [(tableau.field) = {name:"Conf" key:"Type" layout:LAYOUT_VERTICAL}];
    message Conf {
      ConfType type = 1 [(tableau.field) = {name:"Type"}];
      repeated Condition condition_list = 2 [(tableau.field) = {name:"Condition" key:"Type" layout:LAYOUT_VERTICAL}];
      message Condition {
        int32 type = 1 [(tableau.field) = {name:"Type"}];
        int32 value = 2 [(tableau.field) = {name:"Value"}];
      }
    }
  }
}
```

{{< /details >}}

{{< details "loader_conf.json" >}}

```json
{
    "serverMap": {
        "1": {
            "type": "SERVER_TYPE_GAME",
            "confList": [
                {
                    "type": "CONF_TYPE_CLOUD",
                    "conditionList": [{"type": 0, "value": 113}]
                }
            ]
        },
        "2": {
            "type": "SERVER_TYPE_ACTIVITY",
            "confList": [
                {"type": "CONF_TYPE_CLOUD", "conditionList": []},
                {"type": "CONF_TYPE_LOCAL", "conditionList": [{"type": 9, "value": 34}]},
                {"type": "CONF_TYPE_REMOTE", "conditionList": []}
            ]
        },
        "3": {
            "type": "SERVER_TYPE_MATCH",
            "confList": []
        }
    }
}
```

{{< /details >}}
