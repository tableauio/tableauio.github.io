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

| Option      | Type   | Description                                                                                                                                                                |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique`    | bool   | Check map key uniqueness. <br> Default: `false`.                                                                                                                           |
| `range`     | string | Format: `"left, right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - string: count of utf-8 code point. |
| `refer`     | string | Format: `"SheetName(SheetAlias).ColumnName"`.<br>Ensure this field is in another sheet's column value space. Multiple refers are comma-separated.                          |
| `sequence`  | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                        |
| `default`   | string | Use this default value if cell is empty.                                                                                                                                   |
| `fixed`     | bool   | Auto-detected fixed size of horizontal list/map. <br> Default: `false`.                                                                                                    |
| `size`      | uint32 | Specify fixed size of horizontal list/map.                                                                                                                                 |
| `form`      | Form   | Specify cell data form of incell struct.<br> -  `FORM_TEXT`<br> - `FORM_JSON`                                                                                              |
| `json_name` | string | Specify field's custom JSON name instead of lowerCamelCase name of proto field name.                                                                                       |
| `present`   | bool   | Must fill cell data explicitly if present is true. <br> Default: `false`.                                                                                                  |

{.table-striped .table-hover}

## Option `unique`

Option `unique` can be specified as `true` in the map field property. Then the tableauc will report an error if a duplicate key is appeared.

## Option `range`

{{< alert icon="⚠️️" context="info" text="This check option will not be applied if cell data is empty (not present). So if you still want to check even if cell data is empty (not present), then you need to set present option to true." />}}

Option `range` can be specified as format: `"left, right"` (left and right are both inclusive).

Different interpretations of `range`:

- [x] **number**: value range, e.g.: `"1,10"`, `"1,~"`, `"~,10"`.
- [ ] **string**: count of utf-8 code point.
- [ ] **list**: length of list.
- [ ] **map**: length of map.

## Option `refer`

Option `refer` is some like the **FOREIGN KEY** constraint in SQL to prevent actions that would destroy links between tables. However, tableau `refer` can refer to any sheet's column even if it is not map key column, and **multiple refers** (comma-separated) are also supported. It is used to ensure this field is at least in one of the other sheets' column value space (aka message's field value space).

Format: `"SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]..."`.

For example:

- `map<uint32, Reward>|{refer:"ItemConf.ID"}`: single-refer without alias, so **sheet name** is just the generated protobuf message name.
- `map<uint32, Reward>|{refer:"ItemConf.ID,EquipConf.ID"}`: multi-refer without alias, then **sheet alias** is the generated protobuf message name.
- `map<uint32, Reward>|{refer:"Sheet1(ItemConf).ID"}`: single-refer with alias, then **sheet alias** is the generated protobuf message name.

## Option `sequence`

Option `sequence` is used to ensure this field’s value is a sequence and begins with this value,
and mainly used for map key and list element.

For example:

- `map<uint32, Item>|{sequence:1}`: this map key must follow the sequence rule which begins with value `1`.

## Option `default`

If option `default` is set, then use it as default value if cell is empty.

## Option `fixed`

If option `fixed` is set as `true`, then auto-detect fixed size of horizontal list/map.

For example:

- [List: implicit fixed size →]({{< relref "list/#implicit-fixed-size" >}})
- [Map: implicit fixed size →]({{< relref "map/#implicit-fixed-size" >}})

## Option `size`

Option `size` is used to specify fixed size of horizontal list/map.

For example:

- [List: explicit fixed size →]({{< relref "list/#explicit-fixed-size" >}})
- [Map: explicit fixed size →]({{< relref "map/#explicit-fixed-size" >}})

## Option `form`

Option `form` is used to specify cell data form of incell struct.

Two kinds of form can be specified:

- `FORM_TEXT`: protobuf [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec).
- `FORM_JSON`: protobuf [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).

For detailed demos, see [Advanced predefined incell struct →]({{< relref "struct/#advanced-predefined-incell-struct" >}}).

## Option `json_name`

By default, JSON name is deduced from the field's proto name by converting it to camelCase. Now you
can explicitly specify it by `json_name` prop option.

For example:

For example, a worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Rarity_1                      | SpecialEffect_2                      |
| ---------------- | ----------------------------- | ------------------------------------ |
| map<int32, Item> | int32\|{json_name:"rarity_1"} | int32\|{json_name:"specialEffect_2"} |
| Item's ID        | Item's rarity.                | Item's special effect.               |
| 1                | 10                            | 101                                  |
| 2                | 20                            | 102                                  |
| 3                | 30                            | 103                                  |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

## Option `present`

If option `present` is set as `true`, then cell data cannot be empty and must be filled explicitly.
Otherwise an error will be reported.
