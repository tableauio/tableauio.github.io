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

> Vertical layout is list's default layout.

There are three kinds of cross-cell horizontal map:

1. cross-cell horizontal **scalar/enum** list, as element type is scalar. E.g: `[]int32`.
2. cross-cell horizontal **incell struct** list, as element type is incell struct. E.g: `[]{int32 ID, string Name}Item`.
3. cross-cell horizontal **struct** list, as element type is struct. E.g: `[Item]int32`.

#### Cross-cell horizontal scalar/enum list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Param1          | Param2          | Param3          |
|-----------------|-----------------|-----------------|
| []int32         | int32           | int32           |
| Param1's value. | Param2's value. | Param3's value. |
| 1               | 2               | 3               |
{.table-bordered .table-success}

#### Cross-cell horizontal incell struct list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1                         | Item2                       | Item3                       |
|-------------------------------|-----------------------------|-----------------------------|
| []{int32 Id, string Name}Item | {int32 Id, string Name}Item | {int32 Id, string Name}Item |
| Item1's info.                 | Item2's info.               | Item2's info.               |
| 1,apple                       | 2,banana                    | 3,peach                     |
{.table-bordered .table-success}

#### Cross-cell horizontal incell predefined-struct list

`Item` is predefined as:

```proto
message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
}
```

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1         | Item2         | Item3         |
|---------------|---------------|---------------|
| []{.Item}     | {.Item}       | {.Item}       |
| Item1's info. | Item2's info. | Item2's info. |
| 1,apple       | 2,banana      | 3,peach       |
{.table-bordered .table-success}

#### Cross-cell horizontal struct list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1ID      | Item1Name     | Item2ID     | Item2Name     |
|--------------|---------------|-------------|---------------|
| [Item]uint32 | string        | uint32      | string        |
| Item1's ID.  | Item1's name. | Item2's ID. | Item2's name. |
| 1            | item1         | 2           | item2         |
{.table-bordered .table-success}

Generated::

{{< details "hello_world.proto" >}}

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

No need to support, use this instead: `[Item]int32`.

#### Cross-cell vertical struct list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID           | Name         | Type         |
|--------------|--------------|--------------|
| [Item]uint32 | string       | int32        |
| Item's ID.   | Item's name. | Item's type. |
| 1            | item1        | 100          |
| 2            | item2        | 200          |
| 3            | item3        | 300          |
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
    int32 type = 3 [(tableau.field) = {name:"Type"}];
  }
}
```

{{< /details >}}

#### Cross-cell vertical incell struct list

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Reward                        |
|-------------------------------|
| []{int32 Id, int32 Num}Reward |
| Reward info.                  |
| 1,100                         |
| 2,200                         |
| 3,300                         |
{.table-bordered .table-success}

## In-cell list

There are two kinds of in-cell list:

1. in-cell **scalar** list, as list value type is scalar. E.g: `[]int32`.
2. in-cell **struct** list, as list value type is struct. E.g: `[Item]int32`.

### In-cell scalar list

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
    repeated int32 props = 2 [(tableau.field) = {name:"Props" type:TYPE_INCELL_LIST}];
  }
}
```

{{< /details >}}

### In-cell struct list

No need to support.

## Horizontal list size

### Dynamic size

Defaultly, all lists are dynamic sized. List items should be present continuously, and report error if an empty item is inserted.

### Fixed size

#### Implicit fixed size

The list size is auto resolved by the max present list items in `Namerow`.

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1ID                    | Item1Name     | Item2ID     | Item2Name     |
|----------------------------|---------------|-------------|---------------|
| [Item]uint32\|{fixed:true} | string        | uint32      | string        |
| Item1's ID.                | Item1's name. | Item2's ID. | Item2's name. |
| 1                          | item1         | 2           | item2         |
{.table-bordered .table-success}

#### Explicit fixed size

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1ID                  | Item1Name     | Item2ID     | Item2Name     |
|--------------------------|---------------|-------------|---------------|
| [Item]uint32\|{length:2} | string        | uint32      | string        |
| Item1's ID.              | Item1's name. | Item2's ID. | Item2's name. |
| 1                        | item1         | 2           | item2         |
{.table-bordered .table-success}
