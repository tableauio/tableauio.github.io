---
title: "Union"
description: "Excel union guide."
lead: "This guide demonstrates different features of excel union type."
date: 2022-09-04T13:59:39+08:00
lastmod: 2022-09-04T13:59:39+08:00
draft: false
images: []
weight: 7104
toc: true
---

## Theory

In protoconf, `union` type means the **tagged union**: a data structure used to hold a value that could take on several different, but fixed, types. Only one of the types can be in use at any one time, and a **tag** field explicitly indicates which one is in use. More details can be learned from wikipedia [Tagged union](https://en.wikipedia.org/wiki/Tagged_union).

**Tagged union** in different programming languages:

- C++: [std::variant](https://en.cppreference.com/w/cpp/utility/variant).
- Rust: [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html).

Tableau use protobuf `message` to bundle `enum` type and [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) type together to implement **tagged union**. By default, each enum value (>0) is bound to a field with the same tag number of [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) type.

## Union definition

For example, union type `Target` in *common.proto* is predefined as:

```protobuf
// Predefined union type.
message Target {
  option (tableau.union) = true;

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

## Predefined union in list

> Based on [predefined union type `Target`]({{< relref "union/#union-definition" >}}).

A worksheet `TaskConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Target1Type                 | Target1Field1    | Target1Field2    | Target1Field3       | Target2Type        | Target2Field1    | Target2Field2    | Target2Field3    |
| ---------------- | --------------------------- | ---------------- | ---------------- | ------------------- | ------------------ | ---------------- | ---------------- | ---------------- |
| map<int32, Task> | [.Target]enum<.Target.Type> | union            | union            | union               | enum<.Target.Type> | union            | union            | union            |
| ID               | Target1's type              | Target1's field1 | Target1's field2 | Target1's field3    | Target2's type     | Target2's field1 | Target2's field2 | Target2's field3 |
| 1                | PVP                         | 1                | 10               | Apple,Orange,Banana | PVE                | 1,100,999        | 1,2,3            | 1:10,2:20,3:30   |
| 2                | Story                       | 1001,10          | 1:Apple,2:Orange | Fragrant:1,Sour:2   | Skill              | 1                | 2                |                  |

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

## Predefined union in map

> Based on [predefined union type `Target`]({{< relref "union/#union-definition" >}}).

A worksheet `TaskConf` in *HelloWorld.xlsx*:

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

## Predefined incell union in map

> Based on [predefined union type `Target`]({{< relref "union/#union-definition" >}}).

A worksheet `TaskConf` in *HelloWorld.xlsx*:

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

## Define union type in sheet

In order to generate union type definition, you should specify `Mode` option to `MODE_UNION_TYPE` in metasheet `@TABLEAU`.

You can define each union field by following types:

- [Scalar →]({{< relref "scalar" >}})
- [Enum →]({{< relref "enum" >}})
- [Wellknown types →]({{< relref "wellknown-types" >}})
- [Incell struct →]({{< relref "struct/#incell-struct" >}})
- [Incell list →]({{< relref "list/#incell-list" >}})
- [Incell map →]({{< relref "map/#incell-map" >}})

### Single union type in sheet

For example, a worksheet `Target` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Target "@TABLEAU" >}}

{{< sheet >}}

| Name  | Alias      | Field1                        | Field2                               | Field3                           |
| ----- | ---------- | ----------------------------- | ------------------------------------ | -------------------------------- |
| PVP   | AliasPVP   | ID<br>uint32<br>Note          | Damage<br>int64<br>Note              | Type<br>enum<.FruitType><br>Note |
| PVE   | AliasPVE   | Hero<br>[]uint32<br>Note      | Dungeon<br>map<int32, int64><br>Note |                                  |
| Skill | AliasSkill | StartTime<br>datetime<br>Note | Duration<br>duration<br>Note         |                                  |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = true;

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

### Multiple union types in sheet

> TODO...

### Specify Number column

> TODO...

### Complex union type in sheet

For example, two worksheets `Target` and `TaskConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Target TaskConf "@TABLEAU" >}}

{{< sheet >}}

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

{{< sheet >}}

| Sheet  | Mode            |
| ------ | --------------- |
| Target | MODE_UNION_TYPE |
| Task   |                 |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

// Generated from sheet: Target.
message Target {
  option (tableau.union) = true;

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
