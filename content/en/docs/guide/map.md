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

There are two kinds of cross-cell horizontal map:

1. cross-cell horizontal **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. cross-cell horizontal **struct** map, as map value type is struct. E.g: `map<int32, Item>`.

#### Cross-cell horizontal scalar map

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

#### Cross-cell horizontal struct map

> NOTE: need to be tested enough.

##### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Item1ID           | Item1Name     | Item2ID     | Item2Name     |
|-------------------|---------------|-------------|---------------|
| map<uint32, Item> | string        | uint32      | string        |
| Item1's ID.       | Item1's name. | Item2's ID. | Item2's name. |
| 1                 | item1         | 2           | item2         |
{.table-bordered .table-success}

##### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_HORIZONTAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

### Vertical map

{{< alert icon="👉" context="info" text="Vertical layout is map's default layout." />}}

There are two kinds of cross-cell vertical map:

1. cross-cell vertical **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. cross-cell vertical **struct** map, as map value type is struct. E.g: `map<int32, Item>`.

#### Cross-cell vertical scalar map

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

##### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                  | Name         |
|---------------------|--------------|
| map<uint32, string> | string       |
| Item's ID.          | Item's name. |
| 1                   | item1        |
| 2                   | item2        |
| 3                   | item3        |
{.table-bordered .table-success}

##### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, string> item_map = 1 [(tableau.field) = {key:"ID" value:"Name" layout:LAYOUT_VERTICAL}];
}
```

{{< /details >}}

#### Cross-cell vertical struct map

##### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Name         | Type         |
|-------------------|--------------|--------------|
| map<uint32, Item> | string       | int32        |
| Item's ID.        | Item's name. | Item's type. |
| 1                 | item1        | 100          |
| 2                 | item2        | 200          |
| 3                 | item3        | 300          |
{.table-bordered .table-success}

##### Output

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

There are two kinds of in-cell map:

1. in-cell **scalar** map, as map value type is scalar. E.g: `map<int32, int32>`.
2. in-cell **struct** map, as map value type is struct. E.g: `map<int32, Item>`.

### In-cell scalar map

#### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| ID                | Props                |
|-------------------|----------------------|
| map<uint32, Item> | map<string, int32>   |
| Item's ID.        | Item's props.        |
| 1                 | hp:1,power:2,magic:3 |
| 2                 | hp:10,power:20       |
| 3                 | hp:30                |
{.table-bordered .table-success}

The `Props` column's type is in-cell map `map<string, int32>`, as the map value is scalar type `int32`.

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
    map<string, int32> props = 2 [(tableau.field) = {name:"Props" type:TYPE_INCELL_MAP}];
  }
}
```

{{< /details >}}

### In-cell struct map

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

## Ordered map

In the metasheet `@TABLEAU`, set the `OrderedMap` option to `true`, then
ordered map accessers will be generated. This feature is powered by [tableauio/loader](https://github.com/tableauio/loader). Currently supported programming languages are:

- [x] C++
- [ ] Golang
- [ ] C#

### Example

If we want `ItemConf` to generate ordered map accessers, then set
`OrderedMap` option to `true` of metasheet `@TABLEAU`:

| Sheet    | OrderedMap |
|----------|------------|
| ItemConf | true       |
{.table-bordered .table-success}

More useful options are illustrated at metasheet chapter. [Metasheet @TABLEAU →]({{< relref "metasheet" >}})

## Enum key map

As the protobuf documents the restrictions of [map key type](https://developers.google.com/protocol-buffers/docs/proto3#maps):

> ... the `key_type` can be any integral or string type (so, any
> **scalar** type except for floating point types and `bytes`). Note
> that enum is not a valid `key_type`.

However, key type as enum is very useful in some situations. So we
support it in a simple way: enum type is treated as `int32` as
key type, but enum type is included in value type (struct).

If `EnumKeyType` is predefined as:

```protobuf
enum EnumKeyType {
  ENUM_KEY_TYPE_UNKOWN = 0 [(tableau.evalue).name = "unknown"];
  ENUM_KEY_TYPE_ORANGE = 1 [(tableau.evalue).name = "orange"];
  ENUM_KEY_TYPE_APPLE  = 2 [(tableau.evalue).name = "apple"];
  ENUM_KEY_TYPE_BANANA = 3 [(tableau.evalue).name = "banana"];
}
```

then `map<.EnumKeyType, ValueType>` will be converted to `map<int32, ValueType>`,
and `EnumKeyType` is included in `ValueType` as:

```protobuf
enum ValueType {
  EnumKeyType key = 1;
  ...
}
```

### Input

A worksheet `ItemConf` in `HelloWorld.xlsx`:

| Type                          | Price         |
|-------------------------------|---------------|
| map<enum<.EnumKeyType>, Item> | int32         |
| Item's type.                  | Item's price. |
| orange                        | 100           |
| apple                         | 200           |
| banana                        | 300           |
{.table-bordered .table-success}

### Output

Generated protoconf is `hello_world.proto`:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, Item> item_map = 1 [(tableau.field) = {key:"Type" layout:LAYOUT_VERTICAL}];
   message Item {
    EnumKeyType type = 1 [(tableau.field) = {name:"Type"}];
    int32 price = 2 [(tableau.field) = {name:"Price"}];
  }
}
```

{{< /details >}}
