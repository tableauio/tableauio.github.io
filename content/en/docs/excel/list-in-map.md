---
title: "List in map"
description: "Excel list in map guide."
lead: "Excel nesting specification of list in map."
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7302
toc: true
---

## Nested in vertical-map

### Horizontal-list in vertical-map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
| ----------------- | ----------- | ----------- | ------------- | ---------- | ------------- |
| map<uint32, Item> | string      | [Prop]int32 | int64         | int32      | int64         |
| Item's ID         | Item's name | Prop1's ID  | Prop1's value | Prop2's ID | Prop2's value |
| 1                 | Apple       | 1           | 10            | 2          | 20            |
| 2                 | Orange      | 3           | 30            |            |               |
| 3                 | Banana      |             |               |            |               |

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
            "name": "Apple",
            "propList": [
                {
                    "id": 1,
                    "value": "10"
                },
                {
                    "id": 2,
                    "value": "20"
                }
            ]
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "id": 3,
                    "value": "30"
                }
            ]
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "propList": []
        }
    }
}
```

{{< /details >}}

### Vertical-list in vertical-map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | PropID      | PropValue    |
| ----------------- | ----------- | ----------- | ------------ |
| map<uint32, Item> | string      | [Prop]int32 | int64        |
| Item's ID         | Item's name | Prop's ID   | Prop's value |
| 1                 | Apple       | 1           | 10           |
| 2                 | Orange      | 1           | 20           |
| 2                 | Banana      | 2           | 30           |

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
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "10"
                }
            ]
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "20"
                },
                {
                    "propId": 2,
                    "propValue": "30"
                }
            ]
        }
    }
}
```

{{< /details >}}

### Incell-list in vertical-map

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Prop         |
| ----------------- | ------------ |
| map<uint32, Item> | []int32      |
| Item's ID         | Item's props |
| 1                 | 10,20,30     |
| 2                 | 10,20        |
| 3                 | 10           |

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
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated int32 prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_INCELL}];
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
            "propList": [
                10,
                20,
                30
            ]
        },
        "2": {
            "id": 2,
            "propList": [
                10,
                20
            ]
        },
        "3": {
            "id": 3,
            "propList": [
                10
            ]
        }
    }
}
```

{{< /details >}}
