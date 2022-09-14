---
title: "Map in map"
description: "Map in map."
lead: "Nesting examples of map in map."
date: 2022-02-26T08:48:57+00:00
lastmod: 2022-02-26T08:48:57+00:00
draft: false
images: []
weight: 7531
toc: true
---

## Nested in vertical-map

### Horizontal-map in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name        | Prop1ID          | Prop1Value    | Prop2ID    | Prop2Value    |
|-------------------|-------------|------------------|---------------|------------|---------------|
| map<uint32, Item> | string      | map<int32, Prop> | int64         | int32      | int64         |
| Item's ID         | Item's name | Prop1's ID       | Prop1's value | Prop2's ID | Prop2's value |
| 1                 | Apple       | 1                | 10            | 2          | 20            |
| 2                 | Orange      | 3                | 30            |            |               |
| 3                 | Banana      |                  |               |            |               |
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
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "propMap": {
                "1": {
                    "id": 1,
                    "value": "10"
                },
                "2": {
                    "id": 2,
                    "value": "20"
                }
            }
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propMap": {
                "3": {
                    "id": 3,
                    "value": "30"
                }
            }
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "propMap": {}
        }
    }
}
```

{{< /details >}}

### Vertical-map in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name        | PropID           | PropValue    |
|-------------------|-------------|------------------|--------------|
| map<uint32, Item> | string      | map<int32, Prop> | int64        |
| Item's ID         | Item's name | Prop's ID        | Prop's value |
| 1                 | Apple       | 1                | 10           |
| 2                 | Orange      | 1                | 20           |
| 2                 | Banana      | 2                | 30           |
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
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "propMap": {
                "1": {
                    "propId": 1,
                    "propValue": "10"
                }
            }
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propMap": {
                "1": {
                    "propId": 1,
                    "propValue": "20"
                },
                "2": {
                    "propId": 2,
                    "propValue": "30"
                }
            }
        }
    }
}
```

{{< /details >}}

### Incell-map in vertical-map

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Props                      |
|-------------------|----------------------------|
| map<uint32, Item> | map<int32, string>         |
| Item's ID         | Item's props               |
| 1                 | 1:sour,2:sweet,3:delicious |
| 2                 | 1:sour,2:sweet             |
| 3                 | 1:sour                     |
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
    map<int32, string> props_map = 2 [(tableau.field) = {name:"Props" layout:LAYOUT_INCELL}];
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
            "propsMap": {
                "1": "sour",
                "2": "sweet",
                "3": "delicious"
            }
        },
        "2": {
            "id": 2,
            "propsMap": {
                "1": "sour",
                "2": "sweet"
            }
        },
        "3": {
            "id": 3,
            "propsMap": {
                "1": "sour"
            }
        }
    }
}
```

{{< /details >}}
