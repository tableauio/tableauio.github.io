---
title: "Nesting"
description: "Infinite nesting of composite types."
lead: "Infinite nesting of composite types."
date: 2022-02-26T08:48:57+00:00
lastmod: 2022-02-26T08:48:57+00:00
draft: false
images: []
weight: 7500
toc: true
---

## Overview

Now, the horizontal/vertical list element's first field can be any type, even as struct, list, and map.

- List element's first field is struct: `[Reward]{Icon}int32`
- List element's first field is predefined struct: `[Cost]{.Item}uint32`
- List element's first field is in-cell struct: `[Magic]{int32 Id, int32 Num}Ability`
- List element's first field is list: `[Reward][Item]uint32`
- List element's first field is list with element as predefined struct: `[Power][.Item]uint32`
- List element's first field is map: `[Superpower]map<uint32, Ability>`

> TODO: some clear examples.

## Map in map

### Horizontal-map in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID               | Name         | Prop1ID          | Prop1Value    | Prop2ID    | Prop2Value    |
|------------------|--------------|------------------|---------------|------------|---------------|
| map<int32, Item> | string       | map<int32, Prop> | int64         | int32      | int64         |
| Item's id.       | Item's name. | Prop's id.       | Prop's value. | Prop's id. | Prop's value. |
| 1                | item1        | 10               | 100           | 20         | 200           |
| 2                | item2        | 30               | 300           | 40         | 400           |
| 3                | item3        | 50               | 500           |            |               |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    map<int32, Prop> prop_map = 3 [(tableau.field) = {name:"Prop" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
    "itemMap":  {
        "1":  {
            "id":  1,
            "name":  "item1",
            "propMap":  {
                "10":  {
                    "id":  10,
                    "value":  "100"
                },
                "20":  {
                    "id":  20,
                    "value":  "200"
                }
            }
        },
        "2":  {
            "id":  2,
            "name":  "item2",
            "propMap":  {
                "30":  {
                    "id":  30,
                    "value":  "300"
                },
                "40":  {
                    "id":  40,
                    "value":  "400"
                }
            }
        },
        "3":  {
            "id":  3,
            "name":  "item3",
            "propMap":  {
                "50":  {
                    "id":  50,
                    "value":  "500"
                }
            }
        }
    }
}
```

{{< /details >}}

### Vertical-map in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name         | PropID           | PropValue     |
|-------------------|--------------|------------------|---------------|
| map<uint32, Item> | string       | map<int32, Prop> | int64         |
| Item's id.        | Item's name. | Prop's id.       | Prop's value. |
| 1                 | item1        | 10               | 100           |
| 2                 | item2        | 10               | 100           |
| 2                 | item2        | 20               | 200           |
| 2                 | item2        | 30               | 300           |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    map<int32, Prop> prop_map = 3 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id":  1,
            "name":  "item1",
            "propMap":  {
                "10":  {
                    "propId":  10,
                    "propValue":  "100"
                }
            }
        },
        "2":  {
            "id":  2,
            "name":  "item2",
            "propMap":  {
                "10":  {
                    "propId":  10,
                    "propValue":  "100"
                },
                "20":  {
                    "propId":  20,
                    "propValue":  "200"
                },
                "30":  {
                    "propId":  30,
                    "propValue":  "300"
                }
            }
        }
    }
}
```

{{< /details >}}

## List in map

### Horizontal-list in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name         | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
|-------------------|--------------|-------------|---------------|------------|---------------|
| map<uint32, Item> | string       | [Prop]int32 | int64         | int32      | int64         |
| Item's id.        | Item's name. | Prop's id.  | Prop's value. | Prop's id. | Prop's value. |
| 1                 | item1        | 10          | 100           | 20         | 200           |
| 2                 | item2        | 30          | 300           | 40         | 400           |
| 3                 | item3        | 50          | 500           |            |               |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
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
    "itemMap": {
        "1": {
            "id": 1,
            "name": "item1",
            "propList": [
                {
                    "id": 10,
                    "value": "100"
                },
                {
                    "id": 20,
                    "value": "200"
                }
            ]
        },
        "2": {
            "id": 2,
            "name": "item2",
            "propList": [
                {
                    "id": 30,
                    "value": "300"
                },
                {
                    "id": 40,
                    "value": "400"
                }
            ]
        },
        "3": {
            "id": 3,
            "name": "item3",
            "propList": [
                {
                    "id": 50,
                    "value": "500"
                }
            ]
        }
    }
}
```

{{< /details >}}

### Vertical-list in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name         | PropID      | PropValue     |
|-------------------|--------------|-------------|---------------|
| map<uint32, Item> | string       | [Prop]int32 | int64         |
| Item's id.        | Item's name. | Prop's id.  | Prop's value. |
| 1                 | item1        | 10          | 100           |
| 2                 | item2        | 10          | 100           |
| 2                 | item2        | 20          | 200           |
| 2                 | item2        | 30          | 300           |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap":  {
        "1":  {
            "id":  1,
            "name":  "item1",
            "propList":  [
                {
                    "propId":  10,
                    "propValue":  "100"
                }
            ]
        },
        "2":  {
            "id":  2,
            "name":  "item2",
            "propList":  [
                {
                    "propId":  10,
                    "propValue":  "100"
                },
                {
                    "propId":  20,
                    "propValue":  "200"
                },
                {
                    "propId":  30,
                    "propValue":  "300"
                }
            ]
        }
    }
}
```

{{< /details >}}

## Map in list

### Horizontal-map in vertical-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID          | Name         | Prop1ID          | Prop1Value    | Prop2ID    | Prop2Value    |
|-------------|--------------|------------------|---------------|------------|---------------|
| [Item]int32 | string       | map<int32, Prop> | int64         | int32      | int64         |
| Item's id.  | Item's name. | Prop's id.       | Prop's value. | Prop's id. | Prop's value. |
| 1           | item1        | 10               | 100           | 20         | 200           |
| 2           | item2        | 30               | 300           | 40         | 400           |
| 3           | item3        | 50               | 500           |            |               |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    map<int32, Prop> prop_map = 3 [(tableau.field) = {name:"Prop" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
            "name": "item1",
            "propMap": {
                "10": {
                    "id": 10,
                    "value": "100"
                },
                "20": {
                    "id": 20,
                    "value": "200"
                }
            }
        },
        {
            "id": 2,
            "name": "item2",
            "propMap": {
                "30": {
                    "id": 30,
                    "value": "300"
                },
                "40": {
                    "id": 40,
                    "value": "400"
                }
            }
        },
        {
            "id": 3,
            "name": "item3",
            "propMap": {
                "50": {
                    "id": 50,
                    "value": "500"
                }
            }
        }
    ]
}
```

{{< /details >}}

### Vertical-map in vertical-keyed-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID               | Name         | PropID             | PropValue     |
|------------------|--------------|--------------------|---------------|
| [Item]\<uint32\> | string       | map\<int32, Prop\> | int64         |
| Item's id.       | Item's name. | Prop's id.         | Prop's value. |
| 1                | item1        | 10                 | 100           |
| 2                | item2        | 10                 | 100           |
| 2                | item2        | 20                 | 200           |
| 2                | item2        | 30                 | 300           |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    map<int32, Prop> prop_map = 3 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
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
            "name": "item1",
            "propMap": {
                "10": {
                    "propId": 10,
                    "propValue": "100"
                }
            }
        },
        {
            "id": 2,
            "name": "item2",
            "propMap": {
                "10": {
                    "propId": 10,
                    "propValue": "100"
                },
                "20": {
                    "propId": 20,
                    "propValue": "200"
                },
                "30": {
                    "propId": 30,
                    "propValue": "300"
                }
            }
        }
    ]
}
```

{{< /details >}}

## List in list

### Horizontal-list in vertical-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID           | Name         | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
|--------------|--------------|-------------|---------------|------------|---------------|
| [Item]uint32 | string       | [Prop]int32 | int64         | int32      | int64         |
| Item's id.   | Item's name. | Prop's id.  | Prop's value. | Prop's id. | Prop's value. |
| 1            | item1        | 10          | 100           | 20         | 200           |
| 2            | item2        | 30          | 300           | 40         | 400           |
| 3            | item3        | 50          | 500           |            |               |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
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
    "itemList":  [
        {
            "id":  1,
            "name":  "item1",
            "propList":  [
                {
                    "id":  10,
                    "value":  "100"
                },
                {
                    "id":  20,
                    "value":  "200"
                }
            ]
        },
        {
            "id":  2,
            "name":  "item2",
            "propList":  [
                {
                    "id":  30,
                    "value":  "300"
                },
                {
                    "id":  40,
                    "value":  "400"
                }
            ]
        },
        {
            "id":  3,
            "name":  "item3",
            "propList":  [
                {
                    "id":  50,
                    "value":  "500"
                }
            ]
        }
    ]
}
```

{{< /details >}}

### Vertical-list in vertical-keyed-list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID               | Name         | PropID      | PropValue     |
|------------------|--------------|-------------|---------------|
| [Item]\<uint32\> | string       | [Prop]int32 | int64         |
| Item's id.       | Item's name. | Prop's id.  | Prop's value. |
| 1                | item1        | 10          | 100           |
| 2                | item2        | 10          | 100           |
| 2                | item2        | 20          | 200           |
| 2                | item2        | 30          | 300           |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList":  [
        {
            "id":  1,
            "name":  "item1",
            "propList":  [
                {
                    "propId":  10,
                    "propValue":  "100"
                }
            ]
        },
        {
            "id":  2,
            "name":  "item2",
            "propList":  [
                {
                    "propId":  10,
                    "propValue":  "100"
                },
                {
                    "propId":  20,
                    "propValue":  "200"
                },
                {
                    "propId":  30,
                    "propValue":  "300"
                }
            ]
        }
    ]
}
```

{{< /details >}}

## Nested naming

Predefined types in "common.proto":

```protobuf
// NOTE: Some trivial code snippets are eliminated.
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

{{< details "worksheet <b>LoaderConf</b> in <b>HelloWorld.xlsx</b>" >}}

<div class="table-responsive">

| ServerType                     | ServerConfType          | ServerConfConditionType | ServerConfConditionValue |
|--------------------------------|-------------------------|-------------------------|--------------------------|
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
{.table-bordered .table-success}

</div>

{{< /details >}}

{{< details "metasheet <b>@TABLEAU</b> in <b>HelloWorld.xlsx</b>" >}}

| Sheet      | Nested |
|------------|--------|
| LoaderConf | true   |
{.table-bordered .table-success}

{{< /details >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message LoaderConf {
  option (tableau.worksheet) = {name:"LoaderConf" namerow:1 typerow:2 noterow:3 datarow:4 nested:true};

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
    "serverMap":  {
        "1":  {
            "type":  "SERVER_TYPE_GAME",
            "confList":  [
                {
                    "type":  "CONF_TYPE_CLOUD",
                    "conditionList":  [
                        {
                            "type":  0,
                            "value":  113
                        }
                    ]
                }
            ]
        },
        "2":  {
            "type":  "SERVER_TYPE_ACTIVITY",
            "confList":  [
                {
                    "type":  "CONF_TYPE_CLOUD",
                    "conditionList":  []
                },
                {
                    "type":  "CONF_TYPE_LOCAL",
                    "conditionList":  [
                        {
                            "type":  9,
                            "value":  34
                        }
                    ]
                },
                {
                    "type":  "CONF_TYPE_REMOTE",
                    "conditionList":  []
                }
            ]
        },
        "3":  {
            "type":  "SERVER_TYPE_MATCH",
            "confList":  []
        }
    }
}
```

{{< /details >}}
