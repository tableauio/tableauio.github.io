---
title: "Metasheet"
description: "The metasheet is a worksheet named \"@TABLEAU\" to specify tableau parser options."
lead: "The metasheet is a worksheet named \"@TABLEAU\" to specify tableau parser options."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 7902
toc: true
---

## Overview

Options below can be specified in the metasheet `@TABLEAU` to affect the corresponding worksheet's layout, ability, loader and so on.

| Option          | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Sheet`         | string   | The worksheet name needed to be processed.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Alias`         | string   | Rename worksheet to be used as the generated protoconf message name.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Namerow`       | int32    | Exact row number of column name definition at a worksheet.<br>Default: `1`.                                                                                                                                                                                                                                                                                                                                                                                           |
| `Typerow`       | int32    | Exact row number of column type definition at a worksheet.<br>Default: `2`.                                                                                                                                                                                                                                                                                                                                                                                           |
| `Noterow`       | int32    | Exact row number of column note definition at a worksheet.<br>Default: `3`.                                                                                                                                                                                                                                                                                                                                                                                           |
| `Datarow`       | int32    | Start row number of data at a worksheet.<br>Default: `4`.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Nameline`      | int32    | The line number of column name definition in a cell. `0` means the whole cell.<br>Default: `0`.                                                                                                                                                                                                                                                                                                                                                                       |
| `Typeline`      | int32    | The line number of column type definition in a cell. `0` means the whole cell.<br>Default: `0`.                                                                                                                                                                                                                                                                                                                                                                       |
| `Transpose`     | bool     | Interchanging the rows and columns of a given sheet.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Nested`        | bool     | Nested naming of the **namerow**.<br>Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `Sep`           | string   | Separator for:<br> &nbsp;&nbsp; 1. separating in-cell list elements. <br> &nbsp;&nbsp; 2. separating in-cell map items.<br>Default: `,`.                                                                                                                                                                                                                                                                                                                              |
| `Subsep`        | string   | Subseparator for separating in-cell map Key-Value pair.<br>Default: `:`.                                                                                                                                                                                                                                                                                                                                                                                              |
| `Merger`        | []string | Merge multiple workbook sheets (comma-separated) into this one with the same structure.<br>E.g.: `Item1.xlsx,Item2.xlsx`.                                                                                                                                                                                                                                                                                                                                             |
| `AdjacentKey`   | bool     | Merge adjacent rows with the same key. If the key cell is not set, it will be treated the same as the nearest key above the same column.<br>Default:`false`.                                                                                                                                                                                                                                                                                                          |
| `FieldPresence` | bool     | In order to track field presence of basic types (numeric, string, bytes, and enums), the generated field will be labeled `optional`.<br>Default:`false`.                                                                                                                                                                                                                                                                                                              |
| `OrderedMap`    | bool     | Generate OrderedMap accessers or not.<br>Default: `false`.<br> Supported: `C++`.                                                                                                                                                                                                                                                                                                                                                                                      |
| `Index`         | []string | Generate index accessers, and multiple indexes are comma-separated. <br> - Single-column index is in the forma: `<ColumnName>[@IndexName]`, if `IndexName` is not set, it will be this column's parent struct type name.<br> - Multi-column index (or composite index) is in the form: `([column1, column2, column3,...])[@IndexName]`<br>E.g.: <br> - `ID`<br> - `ID@Item`<br> - `(ID,Type)`<br> - `(ID,Type)@Item`<br> - `ID, (ID,Type)@Item`<br> Supported: `C++`. |
{.table-striped .table-hover}

## Empty `@TABLEAU`

If metasheet `@TABLEAU` is empty, then all other worksheets in the same workbook will be processed.

## A simple example

There is a worksheet `Sheet1` in `HelloWorld.xlsx`, we want to rename sheet to
`ItemConf`, define custom seperator as `|`, and generate ordered map accessers.

So the metasheet `@TABLEAU` in `HelloWorld.xlsx` should be configured as:

{{< spreadsheet "HelloWorld.xlsx" Sheet1 "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        |
|-------------------|-------------|
| map<uint32, Item> | string      |
| Item's ID         | Item's Name |
| 1                 | Apple       |
| 2                 | Orange      |
| 3                 | Banana      |

{{< /sheet >}}

{{< sheet >}}

| Sheet  | Alias    | Sep | OrderedMap |
|--------|----------|-----|------------|
| Sheet1 | ItemConf | \|  | true       |

{{< /sheet >}}

{{< /spreadsheet >}}

## Option `Transpose`

Option `Transpose` is specified as `true` in the metasheet `@TABLEAU`.

A worksheet `HeroConf` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" HeroConf "@TABLEAU" >}}

{{< sheet colored>}}

| ID    | int32   | Hero's ID          | 123         |
|-------|---------|--------------------|-------------|
| Name  | string  | Hero's name        | Robin       |
| Desc  | string  | Hero's description | A big hero! |
| Skill | []int32 | Hero's skills      | 100,101,102 |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Transpose |
|----------|-----------|
| HeroConf | true      |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message HeroConf {
  option (tableau.worksheet) = {name:"HeroConf" namerow:1 typerow:2 noterow:3 datarow:4 transpose:true};

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

## Option `Index`

Option `Index` can be specified to generate index accessers, and multiple indexes are comma-separated.
There are two kinds of indexes in tableau: one is **single-column index**, and another is **multi-column index** (aka composite index).

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
|------------------|-------------|-------------------------------|
| map<int32, Item> | string      | string                        |
| Item's ID        | Item's name | Item's desc                   |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet colored >}}

| ID          | Type        | Desc          |
|-------------|-------------|---------------|
| [Shop]int32 | int32       | string        |
| Shop's ID   | Shop's type | Shop's desc   |
| 1           | 1           | Shoes shop.   |
| 2           | 1           | T-Shirt shop. |
| 3           | 2           | Fruite shop.  |

{{< /sheet >}}

{{< sheet >}}

| Sheet    | Index                                          |   |
|----------|------------------------------------------------|---|
| ItemConf | ID@Item, Name@AwardItem, (ID,Name)@SpecialItem |   |
| ShopConf | ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop |   |

{{< /sheet >}}

{{< /spreadsheet >}}

### Single-column index

Format: `<ColumnName>[@IndexName]`.

The sign `@` is the separator between column name and index name. if `IndexName` is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule.

Examples:

- `ID`
- `ID@Item`
- `ID, Name@AwardItem`
- `ID@Item, Name@AwardItem`

### Multi-column index

Format: `([ColumnName1, ColumnName2, ColumnName3,...])[@IndexName]`.

Multi-column index (or composite index) is composed of **multiple columns in the same struct** (in list or map) to increase query speed.

The sign `@` is the separator between enclosed column names by parentheses and index name. if `IndexName` is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule.

Examples:

- `(ID,Name)`
- `(ID,Name)@AwardItem`
- `ID@Item, (ID,Name)@AwardItem`: one single-column index and one multi-column index.
