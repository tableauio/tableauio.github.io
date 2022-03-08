---
title: "List"
description: "List features."
lead: "This guide demonstrates different features of list type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1720
toc: true
---

## Cross-cell list

### Horizontal list

{{< alert icon="👉" context="info" text="Vertical layout is list's default layout." />}}

There are two kinds of cross-cell horizontal map:

1. cross-cell horizontal **scalar** list, as element type is scalar. E.g: `[]int32`.
2. cross-cell horizontal **struct** list, as element type is struct. E.g: `[Item]int32`.

#### Cross-cell horizontal scalar list

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

#### Cross-cell horizontal struct list

##### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1ID      | Item1Name     | Item2ID     | Item2Name     |
|--------------|---------------|-------------|---------------|
| [Item]uint32 | string        | uint32      | string        |
| Item1's ID.  | Item1's name. | Item2's ID. | Item2's name. |
| 1            | item1         | 2           | item2         |
{.table-bordered .table-success}

##### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

### Vertical list

There are two kinds of cross-cell vertical list:

1. cross-cell vertical **scalar** list, as list element type is scalar. E.g: `[]int32`.
2. cross-cell vertical **struct** list, as list element type is struct. E.g: `[Item]int32`.

#### Cross-cell vertical scalar list

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

#### Cross-cell vertical struct list

##### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID           | Name         | Type         |
|--------------|--------------|--------------|
| [Item]uint32 | string       | int32        |
| Item's ID.   | Item's name. | Item's type. |
| 1            | item1        | 100          |
| 2            | item2        | 200          |
| 3            | item3        | 300          |
{.table-bordered .table-success}

##### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  repeated Item item_list = 1 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 type = 3 [(tableau.field) = {name:"Type"}];
  }
}
```

{{< /details >}}

## In-cell list

There are two kinds of in-cell list:

1. in-cell **scalar** list, as list value type is scalar. E.g: `[]int32`.
2. in-cell **struct** list, as list value type is struct. E.g: `[Item]int32`.

### In-cell scalar list

#### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Props         |
|-------------------|---------------|
| map<uint32, Item> | []int32       |
| Item's ID.        | Item's props. |
| 1                 | 1,2,3         |
| 2                 | 4,5           |
| 3                 | 6             |
{.table-bordered .table-success}

The `Props` column's type is in-cell list `[]int32`, as the list element is scalar type `int32`.

#### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated int32 props = 2 [(tableau.field) = {name:"Props" type:TYPE_INCELL_LIST}];
  }
}
```

{{< /details >}}

### in-cell struct list

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

## Keyed list

Keyed list is same as normal list, except the first field of list struct is treated as
like the map key.

Pattern: `[Item]<int32>`

### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID             | PropID           | PropName          |
|----------------|------------------|-------------------|
| [Item]<uint32> | map<int32, Prop> | string            |
| Item's ID.     | Item's prop.     | Item's prop name. |
| 1              | 1                | prop1             |
| 2              | 1                | prop1             |
| 2              | 2                | prop2             |
| 2              | 3                | prop13            |
{.table-bordered .table-success}

### Output

Generated protoconf is `hello_world.proto`:

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
