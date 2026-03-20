---
title: "Union（联合体）"
description: "Excel union 使用指南。"
lead: "本文说明 Excel union 类型的各种特性。"
date: 2022-09-04T13:59:39+08:00
lastmod: 2022-09-04T13:59:39+08:00
draft: false
images: []
weight: 7104
toc: true
---

## 原理

在 protoconf 中，`union` 类型是指**带标签的联合体（tagged union）**：一种用于保存可以取多种不同但固定类型值的数据结构。任意时刻只有一种类型在使用，且一个 **tag** 字段明确指示当前使用的是哪种类型。更多详情请参考维基百科 [Tagged union](https://en.wikipedia.org/wiki/Tagged_union)。

**Tagged union** 在不同编程语言中的对应：

- C++: [std::variant](https://en.cppreference.com/w/cpp/utility/variant)
- Rust: [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)

Tableau 使用 protobuf `message` 将 [enum](https://protobuf.dev/programming-guides/proto3/#enum) 类型和 [oneof](https://protobuf.dev/programming-guides/proto3/#oneof) 类型绑定在一起，以实现 **tagged union**。默认情况下，每个枚举值（>0）与 `oneof` 类型中具有相同 tag 编号的字段绑定。

## Union 定义

例如，*common.proto* 中预定义的 union 类型 `Target`：

```protobuf
// Predefined union type.
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {
      field: "Field"
    };
    Pvp pvp = 1;      // Bound to enum value 1: TYPE_PVP.
    Pve pve = 2;      // Bound to enum value 2: TYPE_PVP.
    Story story = 3;  // Bound to enum value 3: TYPE_STORY.
    Skill skill = 4;  // Bound to enum value 4: TYPE_SKILL.
  }

  enum Type {
    TYPE_NIL = 0;
    TYPE_PVP = 1 [(tableau.evalue) = { name: "PVP" }];
    TYPE_PVE = 2 [(tableau.evalue) = { name: "PVE" }];
    TYPE_STORY = 3 [(tableau.evalue) = { name: "Story" }];
    TYPE_SKILL = 4 [(tableau.evalue) = { name: "Skill" }];
  }
  message Pvp {
    int32 type = 1;                          // scalar
    int64 damage = 2;                        // scalar
    repeated protoconf.FruitType types = 3;  // incell enum list
  }
  message Pve {
    Mission mission = 1;             // incell struct
    repeated int32 heros = 2;        // incell list
    map<int32, int64> dungeons = 3;  // incell map

    message Mission {
      int32 id = 1;
      uint32 level = 2;
      int64 damage = 3;
    }
  }
  message Story {
    protoconf.Item cost = 1;                     // incell predefined struct
    map<int32, protoconf.FruitType> fruits = 2;  // incell map with value as enum type
    map<int32, Flavor> flavors = 3;              // incell map with key as enum type
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = { name: "Key" }];
      int32 value = 2 [(tableau.field) = { name: "Value" }];
    }
  }
  message Skill {
    int32 id = 1;      // scalar
    int64 damage = 2;  // scalar
    // no field tag 3
  }
}
```

## List 中的 predefined union

> [!NOTE]
> 基于 [predefined union 类型 `Target`]({{< relref "union/#union-定义" >}})。

*HelloWorld.xlsx* 中的 worksheet `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Target1Type                 | Target1Field1    | Target1Field2    | Target1Field3       | Target2Type        | Target2Field1    | Target2Field2    | Target2Field3    |
| ---------------- | --------------------------- | ---------------- | ---------------- | ------------------- | ------------------ | ---------------- | ---------------- | ---------------- |
| map<int32, Task> | [.Target]enum<.Target.Type> | union            | union            | union               | enum<.Target.Type> | union            | union            | union            |
| ID               | Target1's type              | Target1's field1 | Target1's field2 | Target1's field3    | Target2's type     | Target2's field1 | Target2's field2 | Target2's field3 |
| 1                | PVP                         | 1                | 10               | Apple,Orange,Banana | PVE                | 1,100,999        | 1,2,3            | 1:10,2:20,3:30   |
| 2                | Story                       | 1001,10          | 1:Apple,2:Orange | Fragrant:1,Sour:2   | Skill              | 1                | 2                |                  |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message TaskConf {
  option (tableau.worksheet) = {name:"TaskConf"};

  map<int32, Task> task_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Task {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated protoconf.Target target_list = 2 [(tableau.field) = {name:"Target" layout:LAYOUT_HORIZONTAL}];
  }
}
```

{{< /details >}}

{{< details "TaskConf.json" >}}

```json
{
    "taskMap": {
        "1": {
            "id": 1,
            "targetList": [
                {
                    "type": "TYPE_PVP",
                    "pvp": {
                        "type": 1,
                        "damage": "10",
                        "types": [
                            "FRUIT_TYPE_APPLE",
                            "FRUIT_TYPE_ORANGE",
                            "FRUIT_TYPE_BANANA"
                        ]
                    }
                },
                {
                    "type": "TYPE_PVE",
                    "pve": {
                        "mission": {
                            "id": 1,
                            "level": 100,
                            "damage": "999"
                        },
                        "heros": [
                            1,
                            2,
                            3
                        ],
                        "dungeons": {
                            "1": "10",
                            "2": "20",
                            "3": "30"
                        }
                    }
                }
            ]
        },
        "2": {
            "id": 2,
            "targetList": [
                {
                    "type": "TYPE_STORY",
                    "story": {
                        "cost": {
                            "id": 1001,
                            "num": 10
                        },
                        "fruits": {
                            "1": "FRUIT_TYPE_APPLE",
                            "2": "FRUIT_TYPE_ORANGE"
                        },
                        "flavors": {
                            "1": {
                                "key": "FRUIT_FLAVOR_FRAGRANT",
                                "value": 1
                            },
                            "2": {
                                "key": "FRUIT_FLAVOR_SOUR",
                                "value": 2
                            }
                        }
                    }
                },
                {
                    "type": "TYPE_SKILL",
                    "skill": {
                        "id": 1,
                        "damage": "2"
                    }
                }
            ]
        }
    }
}
```

{{< /details >}}

{{< details "TaskConf.txt" >}}

```prototxt
task_map: {
  key: 1
  value: {
    id: 1
    target_list: {
      type: TYPE_PVP
      pvp: {
        type: 1
        damage: 10
        types: FRUIT_TYPE_APPLE
        types: FRUIT_TYPE_ORANGE
        types: FRUIT_TYPE_BANANA
      }
    }
    target_list: {
      type: TYPE_PVE
      pve: {
        mission: {
          id: 1
          level: 100
          damage: 999
        }
        heros: 1
        heros: 2
        heros: 3
        dungeons: {
          key: 1
          value: 10
        }
        dungeons: {
          key: 2
          value: 20
        }
        dungeons: {
          key: 3
          value: 30
        }
      }
    }
  }
}
task_map: {
  key: 2
  value: {
    id: 2
    target_list: {
      type: TYPE_STORY
      story: {
        cost: {
          id: 1001
          num: 10
        }
        fruits: {
          key: 1
          value: FRUIT_TYPE_APPLE
        }
        fruits: {
          key: 2
          value: FRUIT_TYPE_ORANGE
        }
        flavors: {
          key: 1
          value: {
            key: FRUIT_FLAVOR_FRAGRANT
            value: 1
          }
        }
        flavors: {
          key: 2
          value: {
            key: FRUIT_FLAVOR_SOUR
            value: 2
          }
        }
      }
    }
    target_list: {
      type: TYPE_SKILL
      skill: {
        id: 1
        damage: 2
      }
    }
  }
}
```

{{< /details >}}

## Map 中的 predefined union

> [!NOTE]
> 基于 [predefined union 类型 `Target`]({{< relref "union/#union-定义" >}})。

*HelloWorld.xlsx* 中的 worksheet `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | TargetType                  | TargetField1    | TargetField2     | TargetField3        | Progress |
| ---------------- | --------------------------- | --------------- | ---------------- | ------------------- | -------- |
| map<int32, Task> | {.Target}enum<.Target.Type> | union           | union            | union               | int32    |
| ID               | Target's type               | Target's field1 | Target's field2  | Target's field3     | Progress |
| 1                | PVP                         | 1               | 10               | Apple,Orange,Banana | 3        |
| 2                | PVE                         | 1,100,999       | 1,2,3            | 1:10,2:20,3:30      | 10       |
| 3                | Story                       | 1001,10         | 1:Apple,2:Orange | Fragrant:1,Sour:2   | 10       |
| 4                | Skill                       | 1               | 2                |                     | 8        |

{{< /sheet >}}

{{< sheet colored1 >}}

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

message TaskConf {
  option (tableau.worksheet) = {name:"TaskConf"};

  map<int32, Task> task_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Task {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.Target target = 2 [(tableau.field) = {name:"Target"}];
    int32 progress = 3 [(tableau.field) = {name:"Progress"}];
  }
}
```

{{< /details >}}

{{< details "TaskConf.json" >}}

```json
{
    "taskMap":  {
        "1":  {
            "id":  1,
            "target":  {
                "type":  "TYPE_PVP",
                "pvp":  {
                    "type":  1,
                    "damage":  "10",
                    "types":  [
                        "FRUIT_TYPE_APPLE",
                        "FRUIT_TYPE_ORANGE",
                        "FRUIT_TYPE_BANANA"
                    ]
                }
            },
            "progress":  3
        },
        "2":  {
            "id":  2,
            "target":  {
                "type":  "TYPE_PVE",
                "pve":  {
                    "mission":  {
                        "id":  1,
                        "level":  100,
                        "damage":  "999"
                    },
                    "heros":  [
                        1,
                        2,
                        3
                    ],
                    "dungeons":  {
                        "1":  "10",
                        "2":  "20",
                        "3":  "30"
                    }
                }
            },
            "progress":  10
        },
        "3":  {
            "id":  3,
            "target":  {
                "type":  "TYPE_STORY",
                "story":  {
                    "cost":  {
                        "id":  1001,
                        "num":  10
                    },
                    "fruits":  {
                        "1":  "FRUIT_TYPE_APPLE",
                        "2":  "FRUIT_TYPE_ORANGE"
                    },
                    "flavors":  {
                        "1":  {
                            "key":  "FRUIT_FLAVOR_FRAGRANT",
                            "value":  1
                        },
                        "2":  {
                            "key":  "FRUIT_FLAVOR_SOUR",
                            "value":  2
                        }
                    }
                }
            },
            "progress":  10
        },
        "4":  {
            "id":  4,
            "target":  {
                "type":  "TYPE_SKILL",
                "skill":  {
                    "id":  1,
                    "damage":  "2"
                }
            },
            "progress":  8
        }
    }
}
```

{{< /details >}}

{{< details "TaskConf.txt" >}}

```prototxt
task_map:  {
    key:  1
    value:  {
        id:  1
        target:  {
            type:  TYPE_PVP
            pvp:  {
                type:  1
                damage:  10
                types:  FRUIT_TYPE_APPLE
                types:  FRUIT_TYPE_ORANGE
                types:  FRUIT_TYPE_BANANA
            }
        }
        progress:  3
    }
}
task_map:  {
    key:  2
    value:  {
        id:  2
        target:  {
            type:  TYPE_PVE
            pve:  {
                mission:  {
                    id:  1
                    level:  100
                    damage:  999
                }
                heros:  1
                heros:  2
                heros:  3
                dungeons:  {
                    key:  1
                    value:  10
                }
                dungeons:  {
                    key:  2
                    value:  20
                }
                dungeons:  {
                    key:  3
                    value:  30
                }
            }
        }
        progress:  10
    }
}
task_map:  {
    key:  3
    value:  {
        id:  3
        target:  {
            type:  TYPE_STORY
            story:  {
                cost:  {
                    id:  1001
                    num:  10
                }
                fruits:  {
                    key:  1
                    value:  FRUIT_TYPE_APPLE
                }
                fruits:  {
                    key:  2
                    value:  FRUIT_TYPE_ORANGE
                }
                flavors:  {
                    key:  1
                    value:  {
                        key:  FRUIT_FLAVOR_FRAGRANT
                        value:  1
                    }
                }
                flavors:  {
                    key:  2
                    value:  {
                        key:  FRUIT_FLAVOR_SOUR
                        value:  2
                    }
                }
            }
        }
        progress:  10
    }
}
task_map:  {
    key:  4
    value:  {
        id:  4
        target:  {
            type:  TYPE_SKILL
            skill:  {
                id:  1
                damage:  2
            }
        }
        progress:  8
    }
}
```

{{< /details >}}

## Map 中的 predefined incell union

> [!NOTE]
> 基于 [predefined union 类型 `Target`]({{< relref "union/#union-定义" >}})。

*HelloWorld.xlsx* 中的 worksheet `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Target1                                                                                                                                                                                                                                    | Target2                                                                                                                                                                                                                   | Progress |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| map<int32, Task> | {.Target}\|{form:FORM_TEXT}                                                                                                                                                                                                                | {.Target}\|{form:FORM_JSON}                                                                                                                                                                                               | int32    |
| ID               | Target1                                                                                                                                                                                                                                    | Target2                                                                                                                                                                                                                   | Progress |
| 1                | type:TYPE_PVP pvp:{type:1 damage:10 types:FRUIT_TYPE_APPLE types:FRUIT_TYPE_ORANGE types:FRUIT_TYPE_BANANA}                                                                                                                                | {"type":"TYPE_PVP","pvp":{"type":1,"damage":"10","types":["FRUIT_TYPE_APPLE","FRUIT_TYPE_ORANGE","FRUIT_TYPE_BANANA"]}}                                                                                                   | 3        |
| 2                | type:TYPE_PVE pve:{mission:{id:1 level:100 damage:999} heros:1 heros:2 heros:3 dungeons:{key:1 value:10} dungeons:{key:2 value:20} dungeons:{key:3 value:30}}                                                                              | {"type":"TYPE_PVE","pve":{"mission":{"id":1,"level":100,"damage":"999"},"heros":[1,2,3],"dungeons":{"1":"10","2":"20","3":"30"}}}                                                                                         | 10       |
| 3                | type:TYPE_STORY story:{cost:{id:1001 num:10} fruits:{key:1 value:FRUIT_TYPE_APPLE} fruits:{key:2 value:FRUIT_TYPE_ORANGE} flavors:{key:1 value:{key:FRUIT_FLAVOR_FRAGRANT value:1}} flavors:{key:2 value:{key:FRUIT_FLAVOR_SOUR value:2}}} | {"type":"TYPE_STORY","story":{"cost":{"id":1001,"num":10},"fruits":{"1":"FRUIT_TYPE_APPLE","2":"FRUIT_TYPE_ORANGE"},"flavors":{"1":{"key":"FRUIT_FLAVOR_FRAGRANT","value":1},"2":{"key":"FRUIT_FLAVOR_SOUR","value":2}}}} | 10       |
| 4                | type:TYPE_SKILL skill:{id:1 damage:2}                                                                                                                                                                                                      | {"type":"TYPE_SKILL","skill":{"id":1,"damage":"2"}}                                                                                                                                                                       | 8        |

{{< /sheet >}}

{{< sheet colored1 >}}

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

message TaskConf {
  option (tableau.worksheet) = {name:"TaskConf"};

  map<int32, Task> task_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Task {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.Target target_1 = 2 [(tableau.field) = {name:"Target1" span:SPAN_INNER_CELL prop:{form:FORM_TEXT}}];
    protoconf.Target target_2 = 3 [(tableau.field) = {name:"Target2" span:SPAN_INNER_CELL prop:{form:FORM_JSON}}];
    int32 progress = 4 [(tableau.field) = {name:"Progress"}];
  }
}
```

{{< /details >}}

{{< details "TaskConf.json" >}}

```json
{
    "taskMap":  {
        "1":  {
            "id":  1,
            "target1":  {
                "type":  "TYPE_PVP",
                "pvp":  {
                    "type":  1,
                    "damage":  "10",
                    "types":  [
                        "FRUIT_TYPE_APPLE",
                        "FRUIT_TYPE_ORANGE",
                        "FRUIT_TYPE_BANANA"
                    ]
                }
            },
            "target2":  {
                "type":  "TYPE_PVP",
                "pvp":  {
                    "type":  1,
                    "damage":  "10",
                    "types":  [
                        "FRUIT_TYPE_APPLE",
                        "FRUIT_TYPE_ORANGE",
                        "FRUIT_TYPE_BANANA"
                    ]
                }
            },
            "progress":  3
        },
        "2":  {
            "id":  2,
            "target1":  {
                "type":  "TYPE_PVE",
                "pve":  {
                    "mission":  {
                        "id":  1,
                        "level":  100,
                        "damage":  "999"
                    },
                    "heros":  [
                        1,
                        2,
                        3
                    ],
                    "dungeons":  {
                        "1":  "10",
                        "2":  "20",
                        "3":  "30"
                    }
                }
            },
            "target2":  {
                "type":  "TYPE_PVE",
                "pve":  {
                    "mission":  {
                        "id":  1,
                        "level":  100,
                        "damage":  "999"
                    },
                    "heros":  [
                        1,
                        2,
                        3
                    ],
                    "dungeons":  {
                        "1":  "10",
                        "2":  "20",
                        "3":  "30"
                    }
                }
            },
            "progress":  10
        },
        "3":  {
            "id":  3,
            "target1":  {
                "type":  "TYPE_STORY",
                "story":  {
                    "cost":  {
                        "id":  1001,
                        "num":  10
                    },
                    "fruits":  {
                        "1":  "FRUIT_TYPE_APPLE",
                        "2":  "FRUIT_TYPE_ORANGE"
                    },
                    "flavors":  {
                        "1":  {
                            "key":  "FRUIT_FLAVOR_FRAGRANT",
                            "value":  1
                        },
                        "2":  {
                            "key":  "FRUIT_FLAVOR_SOUR",
                            "value":  2
                        }
                    }
                }
            },
            "target2":  {
                "type":  "TYPE_STORY",
                "story":  {
                    "cost":  {
                        "id":  1001,
                        "num":  10
                    },
                    "fruits":  {
                        "1":  "FRUIT_TYPE_APPLE",
                        "2":  "FRUIT_TYPE_ORANGE"
                    },
                    "flavors":  {
                        "1":  {
                            "key":  "FRUIT_FLAVOR_FRAGRANT",
                            "value":  1
                        },
                        "2":  {
                            "key":  "FRUIT_FLAVOR_SOUR",
                            "value":  2
                        }
                    }
                }
            },
            "progress":  10
        },
        "4":  {
            "id":  4,
            "target1":  {
                "type":  "TYPE_SKILL",
                "skill":  {
                    "id":  1,
                    "damage":  "2"
                }
            },
            "target2":  {
                "type":  "TYPE_SKILL",
                "skill":  {
                    "id":  1,
                    "damage":  "2"
                }
            },
            "progress":  8
        }
    }
}
```

{{< /details >}}

## 在 sheet 中定义 union 类型

在 metasheet `@TABLEAU` 中有两种 `Mode` 可用于在 sheet 中定义 union 类型：

- `MODE_UNION_TYPE`：在一个 sheet 中定义单个 union 类型。
- `MODE_UNION_TYPE_MULTI`：在一个 sheet 中定义多个 union 类型。

每个 union 字段可以使用以下类型定义：

- [Scalar]({{< relref "scalar" >}})
- [Enum]({{< relref "../basics/enum" >}})
- [Wellknown types]({{< relref "wellknown-types" >}})
- [Incell struct]({{< relref "struct/#incell-struct" >}})
- [Incell list]({{< relref "list/#incell-list" >}})
- [Incell map]({{< relref "map/#incell-map" >}})

### 单个 union 类型

需要在 metasheet `@TABLEAU` 中将 `Mode` 选项设置为 `MODE_UNION_TYPE`。

例如，*HelloWorld.xlsx* 中的 worksheet `Target`：

{{< spreadsheet "HelloWorld.xlsx" Target "@TABLEAU" >}}

{{< sheet colored1 >}}

| Name  | Alias      | Field1                        | Field2                               | Field3                           |
| ----- | ---------- | ----------------------------- | ------------------------------------ | -------------------------------- |
| PVP   | AliasPVP   | ID<br>uint32<br>Note          | Damage<br>int64<br>Note              | Type<br>enum<.FruitType><br>Note |
| PVE   | AliasPVE   | Hero<br>[]uint32<br>Note      | Dungeon<br>map<int32, int64><br>Note |                                  |
| Skill | AliasSkill | StartTime<br>datetime<br>Note | Duration<br>duration<br>Note         |                                  |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {field: "Field"};

    PVP pvp = 1; // Bound to enum value: TYPE_PVP.
    PVE pve = 2; // Bound to enum value: TYPE_PVE.
    Skill skill = 3; // Bound to enum value: TYPE_SKILL.
  }
  enum Type {
    TYPE_INVALID = 0;
    TYPE_PVP = 1 [(tableau.evalue).name = "AliasPVP"];
    TYPE_PVE = 2 [(tableau.evalue).name = "AliasPVE"];
    TYPE_SKILL = 3 [(tableau.evalue).name = "AliasSkill"];
  }

  message PVP {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int64 damage = 2 [(tableau.field) = {name:"Damage"}];
    protoconf.FruitType type = 3 [(tableau.field) = {name:"Type"}];
  }
  message PVE {
    repeated uint32 hero_list = 1 [(tableau.field) = {name:"Hero" layout:LAYOUT_INCELL}];
    map<int32, int64> dungeon_map = 2 [(tableau.field) = {name:"Dungeon" layout:LAYOUT_INCELL}];
  }
  message Skill {
    google.protobuf.Timestamp start_time = 1 [(tableau.field) = {name:"StartTime"}];
    google.protobuf.Duration duration = 2 [(tableau.field) = {name:"Duration"}];
  }
}
```

{{< /details >}}

### 多个 union 类型

> [!IMPORTANT]
> 一个 block 定义一个 union 类型，由一系列连续的非空行组成。
> 不同的 block 之间由**一行或多行空行分隔**。

需要在 metasheet `@TABLEAU` 中将 `Mode` 选项设置为 `MODE_UNION_TYPE_MULTI`。

例如，*HelloWorld.xlsx* 中的 worksheet `Union`：

{{< spreadsheet "HelloWorld.xlsx" Union "@TABLEAU" >}}

{{< sheet multicolored2 >}}

| WishTarget   | WishTarget note   |                   |                              |                                       |
| ------------ | ----------------- | ----------------- | ---------------------------- | ------------------------------------- |
| Name         | Alias             | Field1            | Field2                       | Field3                                |
| Higher       | WishHigher        | Height<br>int32   |                              |                                       |
| Richer       | WishRicher        | ID<br>uint32      | Bank<br>map<int32, string>   |                                       |
|              |                   |                   |                              |                                       |
| HeroTarget   | HeroTarget note   |                   |                              |                                       |
| Name         | Alias             | Field1            | Field2                       | Field3                                |
| StarUp       | HeroStarUp        | ID<br>uint32      | Star<br>int32                |                                       |
| LevelUp      | HeroLevelUp       | ID<br>[]uint32    | Level<br>int32               | Super<br>bool                         |
|              |                   |                   |                              |                                       |
| BattleTarget | BattleTarget note |                   |                              |                                       |
| Name         | Alias             | Field1            | Field2                       | Field3                                |
| PVP          | BattlePVP         | BattleID<br>int32 | Damage<br>int64              |                                       |
| PVE          | BattlePVE         | HeroID<br>[]int32 | Dungeon<br>map<int32, int64> | Boss<br>{uint32 ID, int64 Damage}Boss |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet | Mode                  |
| ----- | --------------------- |
| Union | MODE_UNION_TYPE_MULTI |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message WishTarget {
  option (tableau.union) = {name:"UnionType" note:"WishTarget note"};

  Type type = 9999 [(tableau.field) = {name:"Type"}];
  oneof value {
    option (tableau.oneof) = {note:"WishTarget note" field:"Field"};

    Higher higher = 1; // Bound to enum value: TYPE_HIGHER.
    Richer richer = 2; // Bound to enum value: TYPE_RICHER.
  }

  enum Type {
    TYPE_INVALID = 0;
    TYPE_HIGHER = 1 [(tableau.evalue).name = "WishHigher"]; // WishHigher
    TYPE_RICHER = 2 [(tableau.evalue).name = "WishRicher"]; // WishRicher
  }

  message Higher {
    int32 height = 1 [(tableau.field) = {name:"Height"}];
  }
  message Richer {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    map<int32, string> bank_map = 2 [(tableau.field) = {name:"Bank" layout:LAYOUT_INCELL}];
  }
}

message HeroTarget {
  option (tableau.union) = {name:"UnionType" note:"HeroTarget note"};

  Type type = 9999 [(tableau.field) = {name:"Type"}];
  oneof value {
    option (tableau.oneof) = {note:"HeroTarget note" field:"Field"};

    StarUp star_up = 1; // Bound to enum value: TYPE_STAR_UP.
    LevelUp level_up = 2; // Bound to enum value: TYPE_LEVEL_UP.
  }

  enum Type {
    TYPE_INVALID = 0;
    TYPE_STAR_UP = 1 [(tableau.evalue).name = "HeroStarUp"]; // HeroStarUp
    TYPE_LEVEL_UP = 2 [(tableau.evalue).name = "HeroLevelUp"]; // HeroLevelUp
  }

  message StarUp {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 star = 2 [(tableau.field) = {name:"Star"}];
  }
  message LevelUp {
    repeated uint32 id_list = 1 [(tableau.field) = {name:"ID" layout:LAYOUT_INCELL}];
    int32 level = 2 [(tableau.field) = {name:"Level"}];
    bool super = 3 [(tableau.field) = {name:"Super"}];
  }
}

message BattleTarget {
  option (tableau.union) = {name:"UnionType" note:"BattleTarget note"};

  Type type = 9999 [(tableau.field) = {name:"Type"}];
  oneof value {
    option (tableau.oneof) = {note:"BattleTarget note" field:"Field"};

    PVP pvp = 1; // Bound to enum value: TYPE_PVP.
    PVE pve = 2; // Bound to enum value: TYPE_PVE.
  }

  enum Type {
    TYPE_INVALID = 0;
    TYPE_PVP = 1 [(tableau.evalue).name = "BattlePVP"]; // BattlePVP
    TYPE_PVE = 2 [(tableau.evalue).name = "BattlePVE"]; // BattlePVE
  }

  message PVP {
    int32 battle_id = 1 [(tableau.field) = {name:"BattleID"}];
    int64 damage = 2 [(tableau.field) = {name:"Damage"}];
  }
  message PVE {
    repeated int32 hero_id_list = 1 [(tableau.field) = {name:"HeroID" layout:LAYOUT_INCELL}];
    map<int32, int64> dungeon_map = 2 [(tableau.field) = {name:"Dungeon" layout:LAYOUT_INCELL}];
    Boss boss = 3 [(tableau.field) = {name:"Boss" span:SPAN_INNER_CELL}];
    message Boss {
      uint32 id = 1 [(tableau.field) = {name:"ID"}];
      int64 damage = 2 [(tableau.field) = {name:"Damage"}];
    }
  }
}
```

{{< /details >}}

### 指定 Number 列

在 `Number` 列中，可以指定自定义的唯一字段编号和对应的枚举值编号。

例如，*HelloWorld.xlsx* 中的 worksheet `Target`：

{{< spreadsheet "HelloWorld.xlsx" Target "@TABLEAU" >}}

{{< sheet colored1 >}}

| Number | Name  | Alias      | Field1                        | Field2                               | Field3                           |
| ------ | ----- | ---------- | ----------------------------- | ------------------------------------ | -------------------------------- |
| 1      | PVP   | AliasPVP   | ID<br>uint32<br>Note          | Damage<br>int64<br>Note              | Type<br>enum<.FruitType><br>Note |
| 20     | PVE   | AliasPVE   | Hero<br>[]uint32<br>Note      | Dungeon<br>map<int32, int64><br>Note |                                  |
| 30     | Skill | AliasSkill | StartTime<br>datetime<br>Note | Duration<br>duration<br>Note         |                                  |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {field: "Field"};

    PVP pvp = 1; // Bound to enum value: TYPE_PVP.
    PVE pve = 20; // Bound to enum value: TYPE_PVE.
    Skill skill = 30; // Bound to enum value: TYPE_SKILL.
  }
  enum Type {
    TYPE_INVALID = 0;
    TYPE_PVP = 1 [(tableau.evalue).name = "AliasPVP"];
    TYPE_PVE = 20 [(tableau.evalue).name = "AliasPVE"];
    TYPE_SKILL = 30 [(tableau.evalue).name = "AliasSkill"];
  }

  message PVP {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int64 damage = 2 [(tableau.field) = {name:"Damage"}];
    protoconf.FruitType type = 3 [(tableau.field) = {name:"Type"}];
  }
  message PVE {
    repeated uint32 hero_list = 1 [(tableau.field) = {name:"Hero" layout:LAYOUT_INCELL}];
    map<int32, int64> dungeon_map = 2 [(tableau.field) = {name:"Dungeon" layout:LAYOUT_INCELL}];
  }
  message Skill {
    google.protobuf.Timestamp start_time = 1 [(tableau.field) = {name:"StartTime"}];
    google.protobuf.Duration duration = 2 [(tableau.field) = {name:"Duration"}];
  }
}
```

{{< /details >}}

### 指定 Type 列

默认情况下，每个 union 的 oneof 字段是一个以 `Name` 列指定名称的 message 类型。
现在，你可以添加 `Type` 列并指定自定义的 oneof 字段类型：

- scalar
- enum
- 全局 predefined struct
- 自定义命名 struct
- 同级的本地 predefined struct

例如，*HelloWorld.xlsx* 中的 worksheet `Target`：

{{< spreadsheet "HelloWorld.xlsx" Target "@TABLEAU" >}}

{{< sheet colored1 >}}

| Name    | Alias   | Type             | Field1             | Field2            | #Note                                               |
| ------- | ------- | ---------------- | ------------------ | ----------------- | --------------------------------------------------- |
| Fruit   | Fruit   | enum<.FruitType> |                    |                   | Bound to enum                                       |
| Point   | Point   | int32            |                    |                   | Bound to scalar                                     |
| Item    | Item    | .Item            |                    |                   | Bound to global predefined struct                   |
| Player  | Player  |                  | ID <br> uint32     | Name <br> string  | Bound to local defined struct                       |
| Friend  | Friend  | Player           |                    |                   | Bound to local predefined in the same level         |
| Monster | Monster | CustomMonster    | Health <br> uint32 | Attack <br> int32 | Bound to local defined struct with custom type name |
| Boss    | Boss    | CustomMonster    |                    |                   | Bound to local predefined struct in the same level  |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = {name:"Type"}];
  oneof value {
    option (tableau.oneof) = {field:"Field"};

    protoconf.FruitType fruit = 1; // Bound to enum value: TYPE_FRUIT.
    int32 point = 2;               // Bound to enum value: TYPE_POINT.
    protoconf.Item item = 3;       // Bound to enum value: TYPE_ITEM.
    Player player = 4;             // Bound to enum value: TYPE_PLAYER.
    Player friend = 5;             // Bound to enum value: TYPE_FRIEND.
    CustomMonster monster = 6;     // Bound to enum value: TYPE_MONSTER.
    CustomMonster boss = 7;        // Bound to enum value: TYPE_BOSS.
  }

  enum Type {
    TYPE_INVALID = 0;
    TYPE_FRUIT = 1 [(tableau.evalue).name = "Fruit"];
    TYPE_POINT = 2 [(tableau.evalue).name = "Point"];
    TYPE_ITEM = 3 [(tableau.evalue).name = "Item"];
    TYPE_PLAYER = 4 [(tableau.evalue).name = "Player"];
    TYPE_FRIEND = 5 [(tableau.evalue).name = "Friend"];
    TYPE_MONSTER = 6 [(tableau.evalue).name = "Monster"];
    TYPE_BOSS = 7 [(tableau.evalue).name = "Boss"];
  }

  message Player {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
  message CustomMonster {
    int32 health = 1 [(tableau.field) = {name:"Health"}];
    int32 attack = 2 [(tableau.field) = {name:"Attack"}];
  }
}
```

{{< /details >}}

### 复杂 union 类型

例如，*HelloWorld.xlsx* 中的两个 worksheet `Target` 和 `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Target TaskConf "@TABLEAU" >}}

{{< sheet colored1 >}}

| Name  | Alias      | Field1                                                      | Field2                                        | Field3                                                      |
| ----- | ---------- | ----------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| PVP   | AliasPVP   | ID<br>uint32<br>Note                                        | Damage<br>int64<br>Note                       | Type<br>[]enum<.FruitType><br>Note                          |
| PVE   | AliasPVE   | Mission<br>{uint32 ID, enum<.ItemType> Type}Mission<br>Note | Hero<br>[]uint32<br>Note                      | Dungeon<br>map<int32, int64><br>Note                        |
| Story | AliasStory | Cost<br>{.Item}<br>Note                                     | Fruit<br>map<int32, enum<.FruitType>><br>Note | Flavor<br>map<enum<.FruitFlavor>, enum<.FruitType>><br>Note |
| Hobby | AliasHobby | Flavor<br>map<enum<.FruitFlavor>, enum<.FruitType>><br>Note | StartTime<br>datetime<br>Note                 | Duration<br>duration<br>Note                                |
| Skill | AliasSkill | ID<br>uint32<br>Note                                        | Damage<br>int64<br>Note                       |                                                             |
| Empty | AliasEmpty |                                                             |                                               |                                                             |

{{< /sheet >}}

{{< sheet colored >}}

| ID               | TargetType                  | TargetField1               | TargetField2        | TargetField3               | Progress |
| ---------------- | --------------------------- | -------------------------- | ------------------- | -------------------------- | -------- |
| map<int32, Task> | {.Target}enum<.Target.Type> | union                      | union               | union                      | int32    |
| ID               | Target's type               | Target's field1            | Target's field2     | Target's field3            | Progress |
| 1                | AliasPVP                    | 1                          | 10                  | Apple,Orange,Banana        | 3        |
| 2                | AliasPVE                    | 1,Equip                    | 1,2,3               | 1:10,2:20,3:30             | 10       |
| 3                | AliasStory                  | 1001,10                    | 1:Apple,2:Orange    | Fragrant:Apple,Sour:Orange | 10       |
| 4                | AliasHobby                  | Fragrant:Apple,Sour:Orange | 2023-06-01 10:00:00 | 22s                        | 12       |
| 5                | AliasSkill                  | 1                          | 200                 |                            | 8        |
| 6                | AliasEmpty                  |                            |                     |                            |          |

{{< /sheet >}}

{{< sheet colored1 >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |
| Task   |                 |
{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = {name:"Target"};

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {field: "Field"};

    PVP pvp = 1; // Bound to enum value: TYPE_PVP.
    PVE pve = 2; // Bound to enum value: TYPE_PVE.
    Story story = 3; // Bound to enum value: TYPE_STORY.
    Hobby hobby = 4; // Bound to enum value: TYPE_HOBBY.
    Skill skill = 5; // Bound to enum value: TYPE_SKILL.
    Empty empty = 6; // Bound to enum value: TYPE_EMPTY.
  }
  enum Type {
    TYPE_INVALID = 0;
    TYPE_PVP = 1 [(tableau.evalue).name = "AliasPVP"];
    TYPE_PVE = 2 [(tableau.evalue).name = "AliasPVE"];
    TYPE_STORY = 3 [(tableau.evalue).name = "AliasStory"];
    TYPE_HOBBY = 4 [(tableau.evalue).name = "AliasHobby"];
    TYPE_SKILL = 5 [(tableau.evalue).name = "AliasSkill"];
    TYPE_EMPTY = 6 [(tableau.evalue).name = "AliasEmpty"];
  }

  message PVP {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int64 damage = 2 [(tableau.field) = {name:"Damage"}];
    repeated protoconf.FruitType type_list = 3 [(tableau.field) = {name:"Type" layout:LAYOUT_INCELL}];
  }
  message PVE {
    Mission mission = 1 [(tableau.field) = {name:"Mission" span:SPAN_INNER_CELL}];
    message Mission {
      uint32 id = 1 [(tableau.field) = {name:"ID"}];
      protoconf.ItemType type = 2 [(tableau.field) = {name:"Type"}];
    }
    repeated uint32 hero_list = 2 [(tableau.field) = {name:"Hero" layout:LAYOUT_INCELL}];
    map<int32, int64> dungeon_map = 3 [(tableau.field) = {name:"Dungeon" layout:LAYOUT_INCELL}];
  }
  message Story {
    protoconf.Item cost = 1 [(tableau.field) = {name:"Cost" span:SPAN_INNER_CELL}];
    map<int32, protoconf.FruitType> fruit_map = 2 [(tableau.field) = {name:"Fruit" layout:LAYOUT_INCELL}];
    map<int32, Flavor> flavor_map = 3 [(tableau.field) = {name:"Flavor" key:"Key" layout:LAYOUT_INCELL}];
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = {name:"Key"}];
      protoconf.FruitType value = 2 [(tableau.field) = {name:"Value"}];
    }
  }
  message Hobby {
    map<int32, Flavor> flavor_map = 1 [(tableau.field) = {name:"Flavor" key:"Key" layout:LAYOUT_INCELL}];
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = {name:"Key"}];
      protoconf.FruitType value = 2 [(tableau.field) = {name:"Value"}];
    }
    google.protobuf.Timestamp start_time = 2 [(tableau.field) = {name:"StartTime"}];
    google.protobuf.Duration duration = 3 [(tableau.field) = {name:"Duration"}];
  }
  message Skill {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int64 damage = 2 [(tableau.field) = {name:"Damage"}];
  }
  message Empty {
  }
}

message TaskConf {
  option (tableau.worksheet) = {name:"TaskConf"};

  map<int32, Task> task_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Task {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    protoconf.Target target = 2 [(tableau.field) = {name:"Target"}];
    int32 progress = 3 [(tableau.field) = {name:"Progress"}];
  }
}
```

{{< /details >}}

{{< details "TaskConf.json" >}}

```json
{
    "taskMap": {
        "1": {
            "id": 1,
            "target": {
                "type": "TYPE_PVP",
                "pvp": {
                    "id": 1,
                    "damage": "10",
                    "typeList": [
                        "FRUIT_TYPE_APPLE",
                        "FRUIT_TYPE_ORANGE",
                        "FRUIT_TYPE_BANANA"
                    ]
                }
            },
            "progress": 3
        },
        "2": {
            "id": 2,
            "target": {
                "type": "TYPE_PVE",
                "pve": {
                    "mission": {
                        "id": 1,
                        "type": "ITEM_TYPE_EQUIP"
                    },
                    "heroList": [
                        1,
                        2,
                        3
                    ],
                    "dungeonMap": {
                        "1": "10",
                        "2": "20",
                        "3": "30"
                    }
                }
            },
            "progress": 10
        },
        "3": {
            "id": 3,
            "target": {
                "type": "TYPE_STORY",
                "story": {
                    "cost": {
                        "id": 1001,
                        "num": 10
                    },
                    "fruitMap": {
                        "1": "FRUIT_TYPE_APPLE",
                        "2": "FRUIT_TYPE_ORANGE"
                    },
                    "flavorMap": {
                        "1": {
                            "key": "FRUIT_FLAVOR_FRAGRANT",
                            "value": "FRUIT_TYPE_APPLE"
                        },
                        "2": {
                            "key": "FRUIT_FLAVOR_SOUR",
                            "value": "FRUIT_TYPE_ORANGE"
                        }
                    }
                }
            },
            "progress": 10
        },
        "4": {
            "id": 4,
            "target": {
                "type": "TYPE_HOBBY",
                "hobby": {
                    "flavorMap": {
                        "1": {
                            "key": "FRUIT_FLAVOR_FRAGRANT",
                            "value": "FRUIT_TYPE_APPLE"
                        },
                        "2": {
                            "key": "FRUIT_FLAVOR_SOUR",
                            "value": "FRUIT_TYPE_ORANGE"
                        }
                    },
                    "startTime": "2023-06-01T02:00:00Z",
                    "duration": "22s"
                }
            },
            "progress": 12
        },
        "5": {
            "id": 5,
            "target": {
                "type": "TYPE_SKILL",
                "skill": {
                    "id": 1,
                    "damage": "200"
                }
            },
            "progress": 8
        },
        "6": {
            "id": 6,
            "target": {
                "type": "TYPE_EMPTY",
                "empty": {}
            },
            "progress": 0
        }
    }
}
```

{{< /details >}}
