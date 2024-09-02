---
title: "Union"
description: "XML union guide."
lead: "XML union guide."
date: 2024-09-02T19:21:01+08:00
lastmod: 2024-09-02T19:21:01+08:00
draft: false
images: []
weight: 5150
toc: true
---

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

## Predefined union

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Target @type="{.Target}" />
</ItemConf>
-->

<ItemConf>
    <Target Type="PVP" Field1="1" Field2="10" Field3="Apple,Orange,Banana"/>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  protoconf.Target target = 1 [(tableau.field) = {name:"Target"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "target": {
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
    }
}
```

{{< /details >}}

## Predefined incell union

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Target>{.Target}|{form:FORM_TEXT}</Target>
</ItemConf>
-->

<ItemConf>
    <Target>type:TYPE_PVE pve:{mission:{id:1 level:100 damage:999} heros:1 heros:2 heros:3 dungeons:{key:1 value:10} dungeons:{key:2 value:20} dungeons:{key:3 value:30}}</Target>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  protoconf.Target target = 1 [(tableau.field) = {name:"Target" span:SPAN_INNER_CELL prop:{form:FORM_TEXT}}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "target": {
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
}
```

{{< /details >}}

## Predefined union list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Target @type="[.Target]" />
</ItemConf>
-->

<ItemConf>
    <Target Type="Story" Field1="1001,10" Field2="1:Apple,2:Orange" Field3="Fragrant:1,Sour:2"/>
    <Target Type="Skill" Field1="1" Field2="2"/>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Target target_list = 1 [(tableau.field) = {name:"Target"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
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
```

{{< /details >}}
