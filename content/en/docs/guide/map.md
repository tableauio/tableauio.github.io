---
title: "Map"
description: "Map features."
lead: "This guide demonstrates different features of map type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1390
toc: true
---

## Cross-cell map

### Horizontal map

- cross-cell scalar map
- cross-cell struct map

### Vertical map

- cross-cell scalar map: `map<int32, int32>`
- cross-cell struct map: `map<int32, Item>`

Vertical layout is map's default layout.

#### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name         | Type         |
| ----------------- | ------------ | ------------ |
| map<uint32, Item> | string       | int32        |
| Item's ID.        | Item's name. | Item's type. |
| 1                 | item1        | 100          |
| 2                 | item2        | 200          |
| 3                 | item3        | 300          |
{.table-bordered .table-success}

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
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 type = 3 [(tableau.field) = {name:"Type"}];
  }
}
```

{{< /details >}}

## In-cell map

- in-cell scalar map
- in-cell struct map

## Ordered map

## Enum key map

- key: support enum type (excluding map with just scalar value type)
