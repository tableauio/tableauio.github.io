---
title: "Struct"
description: "Struct features."
lead: "This guide demonstrates different features of struct type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1710
toc: true
---

## Cross-cell struct

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ItemID       | ItemName    | ItemDesc              |
|:-------------|:------------|:----------------------|
| {Item}uint32 | string      | string                |
| Item’s ID    | Item’s Name | Item’s Description    |
| 1            | Orange      | A kind of sour fruit. |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  Item item = 1;
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "name": "Orange",
        "desc": "A kind of sour fruit."
    }
}
```

{{< /details >}}

### Note

Cross-cell struct is usually used together with:

- cross-cell horizontal/vertical map, as map value type. [Map →]({{< relref "map" >}})
- cross-cell horizontal/vertical list, as list element type. [List →]({{< relref "list" >}})

## In-cell struct

Each field type of the struct should be scalar type.

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Property                                   |
|-------------------|--------------------------------------------|
| map<uint32, Item> | {int32 ID,string Name,string Desc}Property |
| Item's ID         | Item's property.                           |
| 1                 | 1,Orange,A good fruit.                     |
| 2                 | 2,Apple                                    |
| 3                 | 3                                          |
{.table-bordered .table-success}

The `Property` column's type is in-cell struct `{int32 ID,string Name,string Desc}Property`.

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    Property property = 2 [(tableau.field) = {name:"Property" span:SPAN_INNER_CELL}];
    message Property {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      string name = 2 [(tableau.field) = {name:"Name"}];
      string desc = 3 [(tableau.field) = {name:"Desc"}];
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
            "property": {
                "id": 1,
                "name": "Apple",
                "desc": "A kind of delicious fruit."
            }
        },
        "2": {
            "id": 2,
            "property": {
                "id": 2,
                "name": "Orange",
                "desc": ""
            }
        },
        "3": {
            "id": 3,
            "property": {
                "id": 3,
                "name": "",
                "desc": ""
            }
        }
    }
}
```

{{< /details >}}
