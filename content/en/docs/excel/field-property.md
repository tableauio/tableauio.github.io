---
title: "Field property"
description: "Different properties of tableau field."
lead: "Different properties of tableau field."
date: 2020-10-13T15:21:01+02:00
lastmod: 2022-08-24T23:21:01+02:00
draft: false
images: []
weight: 7901
toc: true
---

## Overview

| Option     | Type   | Description                                                                                                                                                                                                                                                                                                            |
|------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `unique`   | bool   | Check map key uniqueness.                                                                                                                                                                                                                                                                                              |
| `range`    | string | Format: `"left, right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - string: count of utf-8 code point.                                                                                                                                             |
| `refer`    | string | Format: `"SheetName(SheetAlias).ColumnName"`.<br>Ensure this field is in another sheet's column value space (aka message's field value space). <br>E.g.:<br> - `"ItemConf.ID"`: sheet name is unique.<br> - `"Item(ItemConf).ID"`: different workbooks have the same sheet name, but sheet alias is unique inherently. |
| `sequence` | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                                                                                                                                                                    |
| `default`  | string | Use this default value if cell is empty.                                                                                                                                                                                                                                                                               |
| `fixed`    | bool   | Auto-detected fixed size of horizontal list/map. <br> Default: `false`.                                                                                                                                                                                                                                                |
| `size`     | uint32 | Specified fixed size of horizontal list/map.                                                                                                                                                                                                                                                                           |
| `form`     | Form   | Specify cell data form of incell struct.<br> -  `FORM_TEXT`<br> - `FORM_JSON`                                                                                                                                                                                                                                          |

{.table-striped .table-hover}

## Option `unique`

Option `unique` can be specified as `true` in the map field property. Then the tableauc will report an error if a duplicate key is appeared.

## Option `range`

> TODO

## Option `refer`

> TODO

## Option `sequence`

> TODO

## Option `default`

> TODO

## Option `fixed`

- [List: implicit fixed size →]({{< relref "list/#implicit-fixed-size" >}})
- [Map: implicit fixed size →]({{< relref "map/#implicit-fixed-size" >}})

## Option `size`

- [List: explicit fixed size →]({{< relref "list/#explicit-fixed-size" >}})
- [Map: explicit fixed size →]({{< relref "map/#explicit-fixed-size" >}})

## Option `form`

Option `form` is used to specify cell data form of incell struct.

Two kinds of form can be specified:

- `FORM_TEXT`: protobuf [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec).
- `FORM_JSON`: protobuf [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).
