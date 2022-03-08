---
title: "Metasheet"
description: "Metasheet @TABLEAU."
lead: "The tableau metasheet is a worksheet named \"@TABLEAU\" to specify tableau parser options."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1790
toc: true
---

## Options

| Option       | Function                                                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `Sheet`      | The worksheet name needed to be processed.                                                                                               |
| `Alias`      | Rename worksheet to be used as the generated protoconf message name.                                                                     |
| `Nameline`   | The line number of column name definition in a cell. `0` means the whole cell.<br>Default: `0`.                                          |
| `Typeline`   | The line number of column type definition in a cell. `0` means the whole cell.<br>Default: `0`.                                          |
| `Transpose`  | Interchanging the rows and columns of a given sheet.                                                                                     |
| `Nested`     | Nested naming of the **namerow**.<br>Default: `false`.                                                                                   |
| `Sep`        | Separator for:<br> &nbsp;&nbsp; 1. separating in-cell list elements. <br> &nbsp;&nbsp; 2. separating in-cell map items.<br>Default: `,`. |
| `Subsep`     | Subseparator for separating in-cell map Key-Value pair.<br>Default: `:`.                                                                 |
| `OrderedMap` | Generate OrderedMap accessers or not.<br>Default: `false`.                                                                               |
{.table-striped .table-hover}

## Empty `@TABLEAU`

If metasheet `@TABLEAU` is empty, then all other worksheets in the same workbook will be processed.

## A simple example

There is a worksheet `Sheet1` in `HelloWorld.xlsx`, we want to rename sheet to `ItemConf`,
define custom seperator as `|`, and generate ordered map accessers.

So the metasheet `@TABLEAU` in `HelloWorld.xlsx` should be configured as:

{{< details "@TABLEAU" open >}}

| Sheet  | Alias    | Sep | OrderedMap |
|--------|----------|-----|------------|
| Sheet1 | ItemConf | \|  | true       |
{.table-bordered .table-success}

{{< /details >}}
