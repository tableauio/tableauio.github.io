---
title: "Field property"
description: "Tableau field property guide."
lead: "Tableau field property guide."
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
| `unique`    | bool   | Check field uniqueness. <br> Default: `false`. Specially for map (or KeyedList) key, default will be auto deduced.                                                         |
| `range`     | string | Format: `"left, right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - string: count of utf-8 code point. |
| `refer`     | string | Format: `"SheetName(SheetAlias).ColumnName"`.<br>Ensure this field is in another sheet's column value space. Multiple refers are comma-separated.                          |
| `sequence`  | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                        |
| `default`   | string | Use this default value if cell is empty.                                                                                                                                   |
| `fixed`     | bool   | Auto-detected fixed size of horizontal list/map. <br> Default: `false`.                                                                                                    |
| `size`      | uint32 | Specify fixed size of horizontal list/map.                                                                                                                                 |
| `form`      | Form   | Specify cell data form of incell struct.<br> - `FORM_TEXT`<br> - `FORM_JSON`                                                                                               |
| `json_name` | string | Specify field's custom JSON name instead of lowerCamelCase name of proto field name.                                                                                       |
| `present`   | bool   | Must fill cell data explicitly if present is true. <br> Default: `false`.                                                                                                  |
| `optional`  | bool   | Whether this field is optional (field name existence).                                                                                                                     |
| `patch`     | Patch  | Field patch type. <br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                              |
| `sep`       | string | Field-level separator.                                                                                                                                                     |
| `subsep`    | string | Field-level subseparator.                                                                                                                                                  |
| `cross`     | int32  | Specify count of crossed nodes/cells/fields of composite types with cardinality, such as list and map.                                                                     |
| `pattern`     | string  | Specify the pattern of scalar, list element, and map value.                                                                     |
{.table-striped .table-hover}

## Option `unique`

Option `unique` can be specified as `true` or `false` in the field property. It can check the uniqueness of any scalar field in list/map element.

- If you set `unique` to `true` explicitly, tableau will report an error if a duplicate key appears.
- If you set `unique` to `false` explicitly, no check will be performed.

### Map (or KeyedList) key

Tableau will auto deduce the map (or KeyedList) key's `unique` as true or not.

**The rule is**: if a map's value type (or KeyedList element type) has no sub map/list field of the same layout (vertical/horizontal), then the key must be unique.

So in most cases, it's not neccessary to config it explicitly.

### General scalar field

If you specify a general scalar field's property `unique` as true, then tableau will check the field's uniquness in map or list.

## Option `range`

{{< alert icon="⚠️️" context="warning" text="This check option will not be applied if cell data is empty (not present). So if you still want to check even if cell data is empty, then you should set option `present` to true." />}}

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

Option `sequence` is used to ensure this field’s value is a sequence and begins with this value.
It can be used for any fields even in nested list/map.

For example:

- `map<uint32, Item>|{sequence:1}`: this map key must follow the sequence rule which begins with value `1`.
- `int32|{sequence:1}`: the parent list/map elements must follow the sequence rule which begins with value `1`.

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

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

## Option `present`

If option `present` is set as `true`, then cell data cannot be empty and must be filled explicitly.
Otherwise an error will be reported.

## Option `optional`

Specify whether this field is optional (field name existence).

If set to true, then:

- table formats (Excel/CSV): field's column can be absent.
- document formats (XML/YAML): field's name can be absent.

## Option `patch`

See field-level patch in [Option Patch →]({{< relref "metasheet/#option-patch" >}}).

## Option `sep`

**Field-level** separator for separating:

- incell list elements (scalar or struct).
- incell map items.

If not set, it will use **sheet-level** seq in [metasheet](../metasheet/#option-sep).

## Option `subsep`

**Field-level** subseparator for separating:

- key-value pair of each incell map item.
- struct fields of each incell struct list element.

If not set, it will use **sheet-level** subseq in [metasheet](../metasheet/#option-subsep).

## Option `cross`

Specify count of crossed nodes/cells/fields of composite types with
cardinality, such as list and map.

### union list field

> TODO: example illustrated.

Specify the count of union fields the list will cross and occupy
(one list element for each field). It will also change this list
field's layout from incell to horizontal.

- Value 0 means it is an incell list.
- Value > 0 means it is a horizontal list occupying N fields.
- Value < 0 means it is a horizontal list occupying all following fields.

## Option `pattern`

Specify the pattern of scalar field, list element, and map value.

### Wellknown version field

> For use cases, see [Excel wellknown types: Version →]({{< relref "../excel/wellknown-types/#version" >}})

Specify the dotted-decimal pattern of current cell. Each decimal
number ranges from 0 to the corresponding part (MAX) of pattern.

Default pattern: `255.255.255`.
  