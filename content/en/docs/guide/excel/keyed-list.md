---
title: "KeyedList"
description: "KeyedList features."
lead: "This guide demonstrates different features of KeyedList type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1721
toc: true
---

## Scalar keyed list

A worksheet `PropConf` in `HelloWorld.xlsx`:

| Prop        |
|-------------|
| []\<int32\> |
| Props.      |
| 1,2,3       |
{.table-bordered .table-success}

## Struct keyed list

Keyed list is same as normal list, except the first field of list struct is treated as
like the map key.

Pattern: `[Item]<int32>`

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID               | PropID           | PropName          |
|------------------|------------------|-------------------|
| [Item]\<uint32\> | map<int32, Prop> | string            |
| Item's ID.       | Item's prop.     | Item's prop name. |
| 1                | 1                | prop1             |
| 2                | 1                | prop1             |
| 2                | 2                | prop2             |
| 2                | 3                | prop13            |
{.table-bordered .table-success}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    map<int32, Prop> prop_map = 2 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      string prop_name = 2 [(tableau.field) = {name:"PropName"}];
    }
  }
}
```

{{< /details >}}

{{< details "item_conf.json" >}}

```json
{
    "itemList":  [
        {
            "id":  1,
            "propMap":  {
                "1":  {
                    "propId":  1,
                    "propName":  "prop1"
                }
            }
        },
        {
            "id":  2,
            "propMap":  {
                "1":  {
                    "propId":  1,
                    "propName":  "prop1"
                },
                "2":  {
                    "propId":  2,
                    "propName":  "prop2"
                },
                "3":  {
                    "propId":  3,
                    "propName":  "prop13"
                }
            }
        }
    ]
}
```

{{< /details >}}
