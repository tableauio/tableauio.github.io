---
title: "Concepts"
description: "Core concepts of Tableau."
lead: "Core concepts of Tableau."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1100
toc: true
---

## Terminology

### Basics

| Term         | Definition                                                                                       |
|--------------|--------------------------------------------------------------------------------------------------|
| `workbook`   | An excel file.<br>A XML file.<br> A bundle of CSV files named with same prefix seperated by `#`. |
| `worksheet`  | A sheet in a excel file.<br>A root node of a XML file.<br>A CSV file.                      |
| `metasheet`  | A worksheet named `@TABLEAU` to specify tableau parser options.                                  |
| `row`        | The row in a sheet.                                                                              |
| `column`     | The column in a sheet.                                                                           |
| `cell`       | The intersection of a row and a column.                                                      |
| `in-cell`    | The inner-side of a cell.                                                                        |
| `cross-cell` | Continuous cells of a row or a column.                                                       |
{.table-striped .table-hover}

### Worksheet

| Term        | Definition                                                                                                                             |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `namerow`   | Exact row number of column name definition at a worksheet.<br>⚠️NOTE: each column name must be unique in a worksheet!<br>Default: `1`. |
| `typerow`   | Exact row number of column type definition at a worksheet.<br>Default: `2`.                                                            |
| `noterow`   | Exact row number of column note at a worksheet.<br>Default: `3`.                                                                       |
| `datarow`   | Start row number of data at a worksheet.<br>Default: `4`.                                                                              |
| `nameline`  | The line number of column name definition in a cell. `0` means the whole cell.<br>Default: `0`.                                        |
| `typeline`  | The line number of column type definition in a cell. `0` means the whole cell.<br>Default: `0`.                                        |
| `sep`       | Separator for:<br> &nbsp;&nbsp; 1. separating in-cell list elements. <br> &nbsp;&nbsp; 2. separating in-cell map items.<br>Default: `,`.                       |
| `subsep`    | Subseparator for separating in-cell map Key-Value pair.<br>Default: `:`.                                                               |
| `nested`    | Nested naming of the **namerow**.<br>Default: `false`.                                                                                 |
| `layout`    | Incell, vertical(cross-cell) or horizontal(cross-cell).                                                                                |
| `transpose` | Interchanging the rows and columns of a given sheet.                                                                                   |
{.table-striped .table-hover}

## Mappings to Protoconf

| Term        | Protoconf                                                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `workbook`  | One protoconf(`.proto`) file.                                                                                                                                  |
| `worksheet` | One top-level [message](https://developers.google.com/protocol-buffers/docs/proto3#simple) in a protoconf file, except the tableau metasheet named `@TABLEAU`. |
| `column`    | One field in a [message](https://developers.google.com/protocol-buffers/docs/proto3#simple).                                                                   |

## A simple mapping example

### Input: an excel file

A workbook(`HelloWorld.xlsx`) with two data worksheets(`ItemConf` and `ActivityConf`) and an empty tableau metasheet(`@TABLEAU`).

- First worksheet `ItemConf`:

| ID                | Name         | Type         |
|-------------------|--------------|--------------|
| map<uint32, Item> | string       | int32        |
| Item's ID.        | Item's name. | Item's type. |
| 1                 | item1        | 100          |
| 2                 | item2        | 200          |
| 3                 | item3        | 300          |
{.table-bordered .table-success}

- Second worksheet `ActivityConf`:

| ID                    | Name             | Open              |
|-----------------------|------------------|-------------------|
| map<uint32, Activity> | string           | bool              |
| Activity's ID.        | Activity's name. | Activity is open? |
| 1                     | activity1        | true              |
| 2                     | activity2        | false             |
| 3                     | activity3        |                   |
{.table-bordered .table-success}

### Output: a protoconf file

A protoconf file(`hello_world.proto`) with two top-level messages(`ItemConf` and `ActivityConf`).

{{< details "hello_world.proto" open >}}

```protobuf
// Generated by tableauc 0.2.1. DO NOT EDIT.
syntax = "proto3";
package protoconf;
option go_package = "github.com/tableauio/demo/examples/helloworld/protoconf";

import "tableau/protobuf/tableau.proto";

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

message ActivityConf {
  option (tableau.worksheet) = {name:"ActivityConf" namerow:1 typerow:2 noterow:3 datarow:4};

  map<uint32, Activity> activity_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Activity {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    bool open = 3 [(tableau.field) = {name:"Open"}];
  }
}
```

{{< /details >}}

## Naming convention

All names of **workbook**, **worksheet**, **column**, and **struct**(message), should use the `CamelCase` style naming convention. So the tableau parser can keep the worksheet name as protoconf message name, and exactly convert `CamelCase`  to `snake_case` for protoconf field name and filename, which is suggested by [Protocol Buffers Style Guide](https://developers.google.com/protocol-buffers/docs/style).