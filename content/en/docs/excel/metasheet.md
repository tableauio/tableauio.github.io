---
title: "Metasheet"
description: "Excel metasheet @TABLEAU guide."
lead: "The metasheet is a worksheet named \"@TABLEAU\" to specify sheet-level options of tableau parser."
date: 2022-02-26T13:59:39+08:00
lastmod: 2024-09-03T13:59:39+08:00
draft: false
images: []
weight: 7902
toc: true
---

## Overview

Options below can be specified in the metasheet `@TABLEAU` to affect the corresponding worksheet's layout, ability, loader and so on.

| Option                   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Sheet`                  | string              | The worksheet name to be processed. Specially, `#` refers to the workbook name, so you can set workbook's `Alias`.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Alias`                  | string              | For worksheet, alias is used as proto message name. For workbook `#`, alias is used as proto file name (without file extension).                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Namerow`                | int32               | Exact row number of column name definition at a worksheet.<br>Default: `1`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Typerow`                | int32               | Exact row number of column type definition at a worksheet.<br>Default: `2`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Noterow`                | int32               | Exact row number of column note definition at a worksheet.<br>Default: `3`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Datarow`                | int32               | Start row number of data at a worksheet.<br>Default: `4`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Nameline`               | int32               | The line number of column name definition in a cell. `0` means the whole cell.<br>Default: `0`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Typeline`               | int32               | The line number of column type definition in a cell. `0` means the whole cell.<br>Default: `0`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Transpose`              | bool                | Interchanging the rows and columns of a given sheet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Nested`                 | bool                | Nested naming of the **namerow**.<br>Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Sep`                    | string              | Sheet-level separator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Subsep`                 | string              | Sheet-level subseparator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Merger`                 | []string            | Merge multiple sheets (comma-separated) into one with the same structure. <br> Each element can be:<br> - just a workbook file path or glob path (relative to this workbook): `<Workbook>`, then the sheet name is the same as this sheet.<br> - a workbook file path (relative to this workbook) with a worksheet name: `<Workbook>#<Worksheet>`.                                                                                                                                                                                                                     |
| `AdjacentKey`            | bool                | Merge adjacent rows with the same key. If the key cell is not set, it will be treated the same as the nearest key above the same column.<br>Default:`false`.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `FieldPresence`          | bool                | In order to track field presence of basic types (numeric, string, bytes, and enums), the generated field will be labeled `optional`.<br>Default:`false`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `Mode`                   | Mode                | Sheet mode. <br> Available modes: <br> - `MODE_ENUM_TYPE` <br> - `MODE_ENUM_TYPE_MULTI` <br> - `MODE_STRUCT_TYPE` <br> - `MODE_STRUCT_TYPE_MULTI` <br> - `MODE_UNION_TYPE`<br> - `MODE_UNION_TYPE_MULTI`                                                                                                                                                                                                                                                                                                                                                               |
| `Scatter`                | []string            | Convert multiple sheets separately with same schema. <br> Each element can be: <br> - a workbook name or Glob which is relative to this workbook: `<Workbook>`, then the sheet name is the same as this sheet. <br> - or a workbook name which is relative to this workbook with a worksheet name: `<Workbook>#<Worksheet>`.                                                                                                                                                                                                                                           |
| `Optional`               | bool                | Whether all fields in this sheet are optional (field name existence).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Patch`                  | Patch               | Sheet patch type.  <br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `WithParentDir`          | bool                | confgen: export JSON/Bin/Text files with parent dir created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ScatterWithoutBookName` | bool                | confgen(scatter): export JSON/Bin/Text filenames without book name prefix.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OrderedMap`             | bool                | Generate OrderedMap accessers or not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Index`                  | []string            | Generate index accessers, and multiple indexes are comma-separated. <br> - Single-column index is in the forma: `<ColumnName>[@IndexName]`, if `IndexName` is not set, it will be this column's parent struct type name.<br> - Multi-column index (or composite index) is in the form: `([column1, column2, column3,...])[@IndexName]`<br>E.g.: <br> - `ID`<br> - `ID@Item`<br> - `(ID,Type)`<br> - `(ID,Type)@Item`<br> - `ID, (ID,Type)@Item`<br> Supported: `C++, Go`.                                                                                              |
| `LangOptions`            | map<string, string> | Specify loader language options. <br> Valid keys are: `OrderedMap`, `Index`. <br> Different kvs must be seperated by `,` and one key value must be seperated by `:`. <br> If one key doesn't exist in map, it means that this loader option is supported in all languages. <br> Valid values are all combinations of `cpp`, `go` with space as seperator. <br> Examples: <br> - `OrderedMap:cpp,Index:cpp go` // ordered map supported in cpp, index supported in cpp and go <br> - `OrderedMap:cpp` // ordered map supported in cpp, index supported in all languages |
{.table-striped .table-hover}

## Empty `@TABLEAU`

If metasheet `@TABLEAU` is empty, then all other worksheets in the same workbook will be processed.

## A simple example

There is a worksheet `Sheet1` in *HelloWorld.xlsx*, we want to rename sheet to
`ItemConf`, define custom seperator as `|`, and generate ordered map accessers.

So the metasheet `@TABLEAU` in *HelloWorld.xlsx* should be configured as:

{{< spreadsheet "HelloWorld.xlsx" Sheet1 "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Alias    | Sep | OrderedMap |
| ------ | -------- | --- | ---------- |
| Sheet1 | ItemConf | \|  | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

## Workbook `Alias`

The generated proto file name is the snake case of input file name. For example, if you have a workbook named *HelloWorld.xlsx*, the generated proto file name is *hello_world.proto*. If you want to manually specify a name for the generated proto file, you can also use the `Alias` option. In this scenario, `#` refers to the workbook name.

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" Sheet1 "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
| ----------------- | ----------- |
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Alias       |
| ------ | ----------- |
| #      | custom_conf |
| Sheet1 | ItemConf    |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "custom_conf.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

## Option `Mode`

Sheet mode defines how tableauc (protogen) parses the sheet: data or types.

Available modes:

- `MODE_DEFAULT`: Default mode, which defines sheet's data structure.
- `MODE_ENUM_TYPE`: Define single enum type in a sheet, see [Example](../enum/#single-enum-type-in-sheet).
- `MODE_ENUM_TYPE_MULTI`: Define multiple enum types in a sheet, see [Example](../enum/#multiple-enum-types-in-sheet).
- `MODE_STRUCT_TYPE`: Define single struct type in a sheet, see [Example](../struct/#single-struct-type-in-sheet).
- `MODE_STRUCT_TYPE_MULTI`: Define multiple struct types in a sheet, see [Example](../struct/#multiple-struct-types-in-sheet).
- `MODE_UNION_TYPE`: Define single union type in a sheet, see [Example](../union/#single-union-type-in-sheet).
- `MODE_UNION_TYPE_MULTI`: Define multiple union types in a sheet, see [Example](../union/#multiple-union-types-in-sheet).

## Option `Transpose`

In linear algebra, transpose of a matrix is an operator which flips a matrix over its diagonal. Likewise, transpose of a sheet (2D matrix) means interchanging its rows into columns or vice versa.

See more details about [Excel: Transpose (rotate) data from rows to columns or vice versa](https://support.microsoft.com/en-us/office/transpose-rotate-data-from-rows-to-columns-or-vice-versa-3419f2e3-beab-4318-aae5-d0f862209744).

Option `Transpose` is specified as `true` in the metasheet `@TABLEAU`.

A worksheet `HeroConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" HeroConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID    | int32   | Hero's ID          | 123         |
| ----- | ------- | ------------------ | ----------- |
| Name  | string  | Hero's name        | Robin       |
| Desc  | string  | Hero's description | A big hero! |
| Skill | []int32 | Hero's skills      | 100,101,102 |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Transpose |
| -------- | --------- |
| HeroConf | true      |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message HeroConf {
  option (tableau.worksheet) = {name:"HeroConf" transpose:true};

  int32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
  repeated int32 skill_list = 4 [(tableau.field) = {name:"Skill" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "HeroConf.json" >}}

```json
{
    "id": 123,
    "name": "Robin",
    "desc": "A big hero!",
    "skillList": [
        100,
        101,
        102
    ]
}
```

{{< /details >}}

## Option `Merger`

Option `Merger` is used to merge multiple sheets (comma-separated) with same schema to one.

Each element can be:

1. just a workbook file path or [Glob](https://pkg.go.dev/path/filepath#Glob) path (relative to this workbook): `<Workbook>`,
   then the sheet name is the same as this sheet.
2. a workbook file path (relative to this workbook) with a worksheet name: `<Workbook>#<Worksheet>`.

{{< alert icon="ⓘ" context="info" text="Glob pattern usually should not match the main workbook. If matched, then tableauc will auto eliminate it." />}}

For example:

The first (main) workbook: a worksheet `ZoneConf` in *MergerMain.xlsx* (with `@TABLEAU`):

{{< spreadsheet "MergerMain.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Merger       |
| -------- | ------------ |
| ZoneConf | Merger*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

The second (sub) workbook: a worksheet `ZoneConf` in *Merger2.xlsx* (without `@TABLEAU`):

{{< spreadsheet "Merger2.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< /spreadsheet >}}

The third (sub) workbook: a worksheet `ZoneConf` in *Merger3.xlsx* (without `@TABLEAU`):

{{< spreadsheet "Merger3.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 3                 | Snowfield   | 300               |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "merger_main.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ZoneConf {
  option (tableau.worksheet) = {name:"ZoneConf" merger:"Merger*.xlsx"};

  map<uint32, Zone> zone_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Zone {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 difficulty = 3 [(tableau.field) = {name:"Difficulty"}];
  }
}
```

{{< /details >}}

{{< details "HeroConf.json" >}}

```json
{
    "zoneMap": {
        "1": {
            "id": 1,
            "name": "Infinity",
            "difficulty": 100
        },
        "2": {
            "id": 2,
            "name": "Desert",
            "difficulty": 200
        },
        "3": {
            "id": 3,
            "name": "Snowfield",
            "difficulty": 300
        }
    }
}
```

{{< /details >}}

## Option `Scatter`

Option `Scatter` is used to scatter multiple sheets (comma-separated) with same schema to different generated config files.

Each element can be:

1. just a workbook file path or [Glob](https://pkg.go.dev/path/filepath#Glob) path (relative to this workbook): `<Workbook>`,
   then the sheet name is the same as this sheet.
2. a workbook file path (relative to this workbook) with a worksheet name: `<Workbook>#<Worksheet>`.

{{< alert icon="ⓘ" context="info" text="Glob pattern usually should not match the main workbook. If matched, then tableauc will auto eliminate it." />}}

For example, there are three workbooks (each with same sheet schema, and *Scatter1.xlsx* is the main workbook):

- Scatter1.xlsx
- Scatter2.xlsx
- Scatter3.xlsx

The first (main) workbook: a worksheet `ZoneConf` in *Scatter1.xlsx* (with `@TABLEAU`):

{{< spreadsheet "Scatter1.xlsx" ZoneConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 1                 | Infinity    | 100               |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Scatter       |
| -------- | ------------- |
| ZoneConf | Scatter*.xlsx |

{{< /sheet >}}

{{< /spreadsheet >}}

The second (sub) workbook: a worksheet `ZoneConf` in *Scatter2.xlsx* (without `@TABLEAU`):

{{< spreadsheet "Scatter2.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 2                 | Desert      | 200               |

{{< /sheet >}}

{{< /spreadsheet >}}

The third (sub) workbook: a worksheet `ZoneConf` in *Scatter3.xlsx* (without `@TABLEAU`):

{{< spreadsheet "Scatter3.xlsx" ZoneConf >}}

{{< sheet colored>}}

| ID                | Name        | Difficulty        |
| ----------------- | ----------- | ----------------- |
| map<uint32, Zone> | string      | int32             |
| Zone’s ID         | Zone’s name | Zone’s difficulty |
| 3                 | Snowfield   | 300               |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated protoconf:

{{< details "scatter_1.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ZoneConf {
  option (tableau.worksheet) = {name:"ZoneConf" scatter:"Scatter*.xlsx"};

  map<uint32, Zone> zone_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Zone {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 difficulty = 3 [(tableau.field) = {name:"Difficulty"}];
  }
}
```

{{< /details >}}

It is supposed to generate three different config files (name pattern: `<BookName>_<SheetName>`):

{{< details "Scatter1_ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "1": {
            "id": 1,
            "name": "Infinity",
            "difficulty": 100
        }
    }
}
```

{{< /details >}}

{{< details "Scatter2_ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "2": {
            "id": 2,
            "name": "Desert",
            "difficulty": 200
        }
    }
}
```

{{< /details >}}

{{< details "Scatter3_ZoneConf.json" >}}

```json
{
    "zoneMap": {
        "3": {
            "id": 3,
            "name": "Snowfield",
            "difficulty": 300
        }
    }
}
```

{{< /details >}}

## Option `OrderedMap`

If you set `OrderedMap` to `true`, then tableau loader plugins will generate ordered map APIs:

- [C++: OrderedMap API](../../api/loader/cpp/#orderedmap)
- [Go: OrderedMap API](../../api/loader/go/#orderedmap)

## Option `Index`

Option `Index` can be specified to generate index accessers, and multiple indexes are comma-separated.
There are two kinds of indexes in tableau: one is **single-column index**, and another is **multi-column index** (aka composite index).

If you set `Index` appropriately, then tableau loader plugins will generate index APIs:

- [C++: Index API](../../api/loader/cpp/#index)
- [Go: Index API](../../api/loader/go/#index)

Each column type can be:

- **scalar**: numbers, booleans, strings, and bytes.
- **enum**: e.g.: `enum<.FruiteType>`
- **incell scalar list**: e.g: `[]int32`
- **incell enum list**: e.g: `[]enum<.FruiteType>`

Example: two worksheets *ItemConf* and *ShopConf* in HelloWorld.xlsx:

- *ItemConf*: index on columns of the same struct as **map value**.
- *ShopConf*: index on columns of the same struct as **list element**.

{{< spreadsheet "HelloWorld.xlsx" ItemConf ShopConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Name        | Desc                          |
| ---------------- | ----------- | ----------------------------- |
| map<int32, Item> | string      | string                        |
| Item's ID        | Item's name | Item's desc                   |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
| ----------- | ----------- | ------------- |
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Index                                          |     |
| -------- | ---------------------------------------------- | --- |
| ItemConf | ID@Item, Name@AwardItem, (ID,Name)@SpecialItem |     |
| ShopConf | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |     |

{{< /sheet >}}

{{< /spreadsheet >}}

### Single-column index

Format: `Column<ColumnX,ColumnY,...>@IndexName`.

The sign `@` is the separator between column name and index name. if `IndexName` is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule. The columns in the angle brackets `<>` specify the sorting columns which the index sort by.

Examples:

- `ID`
- `ID@Item`
- `ID<ID>@Item`: sort index by ID.
- `ID<Type,Priority>@Item`: sort index by Type and Priority.
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

### Multi-column index

Format: `(Column1,Column2,...)<ColumnX,ColumnY,...>@IndexName`.

Multi-column index (or composite index) is composed of **multiple columns in the same struct** (in list or map) to increase query speed.

The sign `@` is the separator between enclosed column names by parentheses and index name. if `IndexName` is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule. The columns in the angle brackets `<>` specify the sorting columns which the index sort by.

Examples:

- `(ID,Name)`: index name not set, then determined by parent struct type name.
- `(ID,Name)@AwardItem`
- `(ID,Name)<ID>`: sort index by ID.
- `(ID,Type)<Type,Priority>@Item`: sort index by Type and Priority.
- `ID@Item, (ID,Name)@AwardItem`: one single-column index and one multi-column index.

## Option `Patch`

```protobuf
// Patch type for both sheet-level and field-level.
enum Patch {
  PATCH_NONE = 0;
  // 1 Sheet-level patch option "PATCH_REPLACE"
  //   - replace whole message
  // 2 Top-field patch option "PATCH_REPLACE"
  //   - list: Clear field firstly, and then all elements of this list field
  //     in src are appended to the corresponded list fields in dst.
  //   - map: Clear field firstly, and then all entries of this map field in src
  //     are copied into the corresponding map field in dst.
  PATCH_REPLACE = 1;
  // Merge src into dst, which must be a message with the same descriptor.
  //  - scalar: Populated scalar fields in src are copied to dst.
  //  - message: Populated singular messages in src are merged into dst by
  //     recursively calling [proto.Merge](https://pkg.go.dev/google.golang.org/protobuf/proto#Merge).
  //  - list: The elements of every list field in src are appended to the
  //     corresponded list fields in dst.
  //  - map: The entries of every map field in src are copied into the
  //     corresponding map field in dst, possibly replacing existing entries.
  //  - unknown: The unknown fields of src are appended to the unknown
  //     fields of dst.
  PATCH_MERGE = 2;
}
```

## Option `Sep`

**Sheet-level** separator for separating:

- incell list elements (scalar or struct).
- incell map items.

If not set, it will use **global-level** seq (default: `,`)  in tableauc [yaml.config](../../tutorial/config/#confinputseq).

## Option `Subsep`

**Sheet-level** subseparator for separating:

- key-value pair of each incell map item.
- struct fields of each incell struct list element.

If not set, it will use **global-level** subseq (default: `:`) in tableauc [yaml.config](../../tutorial/config/#confinputseq).
