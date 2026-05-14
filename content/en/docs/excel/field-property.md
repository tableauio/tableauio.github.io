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

| Option             | Type   | Description                                                                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique`           | bool   | Check field uniqueness. <br> Default: `false`. Specially for map (or KeyedList) key, default will be auto deduced.                                                                                                                           |
| `range`            | string | Format: `"left,right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - string: count of utf-8 code point.                                                                    |
| `refer`            | string | Format: `"SheetName(SheetAlias).ColumnName"`.<br>Ensure this field is in another sheet's column value space. Multiple refers are comma-separated.                                                                                            |
| `sequence`         | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                                                                                          |
| `default`          | string | Use this default value if cell is empty (not present).                                                                                                                                                                                       |
| `fixed`            | bool   | Auto-detected fixed size of horizontal list/map. <br> Default: `false`.                                                                                                                                                                      |
| `size`             | uint32 | Specify fixed size of horizontal list/map.                                                                                                                                                                                                   |
| `form`             | Form   | Specify cell data form of incell struct.<br> - `FORM_TEXT`<br> - `FORM_JSON`                                                                                                                                                                 |
| `json_name`        | string | Specify field's custom JSON name instead of lowerCamelCase name of proto field name.                                                                                                                                                         |
| `present`          | bool   | Must fill cell data explicitly if present is true. <br> Default: `false`.                                                                                                                                                                    |
| `optional`         | bool   | Whether this field is optional (field name existence).                                                                                                                                                                                       |
| `patch`            | Patch  | Field patch type. <br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                |
| `sep`              | string | Field-level separator.                                                                                                                                                                                                                       |
| `subsep`           | string | Field-level subseparator.                                                                                                                                                                                                                    |
| `pattern`          | string | Specify the pattern of scalar, list element, and map value.                                                                                                                                                                                  |
| `validate`         | string | [protovalidate](https://github.com/bufbuild/protovalidate) field-level rules for scalar and well-known types. <br>E.g.: `"string:{max_len:10}"`, `"int32:{gt:0 lte:100}"`, `"cel_expression:\"this >= timestamp('2024-01-01T00:00:00Z')\""`. |
| `validate_complex` | string | [protovalidate](https://github.com/bufbuild/protovalidate) field-level rules for complex types (list/map). <br>E.g.: `"repeated:{min_items:1}"`, `"map:{min_pairs:1}"`.                                                                      |
| `validate_message` | string | [protovalidate](https://github.com/bufbuild/protovalidate) message-level rules for the nested message of a field. <br>E.g.: `"cel_expression:\"this.start_time < this.end_time\""`.                                                          |
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

> [!WARNING]
> This check option is skipped when cell data is empty (not present). To enforce the check even on empty cells, set option `present` to `true`.

Option `range` can be specified as format: `"left,right"` (left and right are both inclusive).

Different interpretations of `range`:

- [x] **number**: value range, e.g.: `"1,10"`, `"1,~"`, `"~,10"`.
- [ ] **string**: count of utf-8 code point.
- [ ] **list**: length of list.
- [ ] **map**: length of map.

## Option `refer`

Option `refer` is similar to the **FOREIGN KEY** constraint in SQL, preventing actions that would break links between tables. Unlike SQL foreign keys, it can reference any sheet's column — not just map key columns — and supports **multiple refers** (comma-separated). It ensures this field's value exists in at least one of the referenced columns (i.e., the field value space of another sheet).

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

If option `default` is set, then use it as default value if cell is empty (not present).

## Option `fixed`

If option `fixed` is set as `true`, then auto-detect fixed size of horizontal list/map.

For example:

- [List: implicit fixed size]({{< relref "list/#implicit-fixed-size" >}})
- [Map: implicit fixed size]({{< relref "map/#implicit-fixed-size" >}})

## Option `size`

Option `size` is used to specify fixed size of horizontal list/map.

For example:

- [List: explicit fixed size]({{< relref "list/#explicit-fixed-size" >}})
- [Map: explicit fixed size]({{< relref "map/#explicit-fixed-size" >}})

## Option `form`

Option `form` is used to specify cell data form of incell struct.

Two kinds of form can be specified:

- `FORM_TEXT`: protobuf [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec).
- `FORM_JSON`: protobuf [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json).

For detailed demos, see [Advanced predefined incell struct]({{< relref "struct/#advanced-predefined-incell-struct" >}}).

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

{{< sheet colored1 >}}

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

See field-level patch in [Option Patch]({{< relref "metasheet/#option-patch" >}}).

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

## Option `pattern`

Specify the pattern of scalar field, list element, and map value.

### Wellknown version field

> For use cases, see [Wellknown types: Version]({{< relref "../excel/wellknown-types/#version" >}})

Specify the dotted-decimal pattern of current cell. Each decimal
number ranges from 0 to the corresponding part (MAX) of pattern.

Default pattern: `255.255.255`.

## Option `validate`

Tableau integrates [protovalidate](https://github.com/bufbuild/protovalidate)
to declare validation rules directly in spreadsheet field properties. The rules
are compiled into [`(buf.validate.field)`](https://buf.build/bufbuild/protovalidate)
options on generated `.proto` fields and enforced by tableau at config generation
time. CEL expressions and protovalidate's standard/predefined/custom rules are
all supported.

Option `validate` is used to specify **field-level rules for scalar and
well-known types** (e.g. `int32`, `string`, `bool`, `google.protobuf.Timestamp`,
`google.protobuf.Duration`). Its value is the [protobuf text format](https://protobuf.dev/reference/protobuf/textformat-spec/)
of [`buf.validate.FieldRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.FieldRules).

Examples:

- `int32|{validate:"int32:{gt:0 lte:100}"}`: the value must be in `(0, 100]`.
- `string|{validate:"string:{min_len:1 max_len:20}"}`: the string length must be in `[1, 20]`.
- `uint32|{validate:"uint32:{gt:0}"}`: the value must be greater than `0`.
- `datetime|{validate:"timestamp:{lt:{seconds:1893456000}}"}`: the timestamp must be earlier than `2030-01-01T00:00:00Z` (Unix seconds `1893456000`).
- `datetime|{validate:"cel_expression:\"this >= timestamp('2024-01-01T00:00:00Z')\""}`: a custom CEL expression.
- `int32|{validate:"int32:{[protoconf.is_zero]:true}"}`: a [custom rule](https://buf.build/docs/protovalidate/schemas/custom-rules/) defined as a proto extension.

> [!WARNING]
> Avoid comparing a field value against the current time (e.g.
> `timestamp:{gt_now:true}` / `lt_now:true`, or CEL expressions referencing
> `now`). Configuration is generated and validated **at build time**, so a rule
> that depends on "now" will pass or fail depending on **when** the config is
> generated, making generation flaky and irreproducible. Prefer fixed boundaries
> (absolute timestamps) or constraints between fields of the same record (e.g.
> `start_time < end_time`).

For example, a worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                                            | Name                                               | Score                                    |
| --------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| map<uint32, Item>\|{validate:"uint32:{gt:0}"} | string\|{validate:"string:{min_len:1 max_len:20}"} | int32\|{validate:"int32:{gt:0 lte:100}"} |
| Item ID                                       | Item Name                                          | Item Score                               |
| 1                                             | sword                                              | 80                                       |
| 2                                             | shield                                             | 95                                       |

{{< /sheet >}}

{{< sheet colored1 >}}

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
import "buf/validate/validate.proto";

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}, (buf.validate.field) = {uint32:{gt:0}}];
    string name = 2 [(tableau.field) = {name:"Name"}, (buf.validate.field) = {string:{min_len:1 max_len:20}}];
    int32 score = 3 [(tableau.field) = {name:"Score"}, (buf.validate.field) = {int32:{gt:0 lte:100}}];
  }
}
```

{{< /details >}}

## Option `validate_complex`

Option `validate_complex` is used to specify **field-level rules for complex
types** (i.e. `list`/`map`) — that is, rules that apply to the container itself
rather than to its elements. Its value is the text format of
[`buf.validate.FieldRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.FieldRules)
with `repeated` or `map` set.

Examples:

- `map<uint32, Item>|{validate_complex:"map:{min_pairs:1}"}`: the map must have at least one entry.
- `[]string|{validate_complex:"repeated:{min_items:1}"}`: the list must have at least one element.
- `[]string|{validate_complex:"repeated:{[protoconf.min_items_three]:true}"}`: a custom rule.

> [!NOTE]
> Use `validate` for the element/value type's own rules, and `validate_complex`
> for the container's rules. Both can be specified at the same time on a single field.

## Option `validate_message`

Option `validate_message` is used to specify **message-level rules for the nested
message of a field**. It is typically used when the field's value type is a
sub-message (e.g. a struct, or the value type of a map/list), and you want to
validate cross-field constraints by CEL. Its value is the text format of
[`buf.validate.MessageRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.MessageRules).

Examples:

- `map<uint32, Item>|{validate_message:"cel_expression:\"this.value <= 0 || this.name != ''\""}`: every map value (`Item`) must satisfy the CEL expression.
- `{Timespan}datetime|{validate_message:"cel_expression:\"this.start_time < this.end_time\""}`: every `Timespan` struct must have `start_time < end_time`.

The CEL expression operates on `this`, which refers to the nested message
instance.
