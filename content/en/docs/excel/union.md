---
title: "Union"
description: "Union type features."
lead: "This guide demonstrates different features of union type."
date: 2022-09-04T13:59:39+01:00
lastmod: 2022-09-04T13:59:39+01:00
draft: false
images: []
weight: 7103
toc: true
---

## Theory

In protoconf, `union` type means the **tagged union**: a data structure used to hold a value that could take on several different, but fixed, types. Only one of the types can be in use at any one time, and a **tag** field explicitly indicates which one is in use. More details can be learned from wikipedia [Tagged union](https://en.wikipedia.org/wiki/Tagged_union).

**Tagged union** in different programming languages:

- C++: [std::variant](https://en.cppreference.com/w/cpp/utility/variant)
- Rust: [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)

Tableau use protobuf `message` to bundle `enum` type and [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) type together to implement **tagged union**. By default,  each enum value (>0) is binded to a field with the same tag number of [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) type.

## Predefined union in map

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
    Pvp pvp = 1;      // Binded to enum value 1: TYPE_PVP.
    Pve pve = 2;      // Binded to enum value 2: TYPE_PVP.
    Story story = 3;  // Binded to enum value 3: TYPE_STORY.
    Skill skill = 4;  // Binded to enum value 4: TYPE_SKILL.
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

A worksheet `TaskConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | TargetType                  | TargetField1    | TargetField2     | TargetField3        | Progress |
|------------------|-----------------------------|-----------------|------------------|---------------------|----------|
| map<int32, Task> | {.Target}enum<.Target.Type> | union           | union            | union               | int32    |
| ID               | Target's type               | Target's field1 | Target's field2  | Target's field3     | Progress |
| 1                | PVP                         | 1               | 10               | Apple,Orange,Banana | 3        |
| 2                | PVE                         | 1,100,999       | 1,2,3            | 1:10,2:20,3:30      | 10       |
| 3                | Story                       | 1001,10         | 1:Apple,2:Orange | Fragrant:1,Sour:2   | 10       |
| 4                | Skill                       | 1               | 2                |                     | 8        |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message TaskConf {
  option (tableau.worksheet) = {name:"TaskConf" namerow:1 typerow:2 noterow:3 datarow:4};

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
