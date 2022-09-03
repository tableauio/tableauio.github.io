---
title: "Field property"
description: "Different properties of tableau field."
lead: "Different properties of tableau field."
date: 2020-10-13T15:21:01+02:00
lastmod: 2022-08-24T23:21:01+02:00
draft: false
images: []
weight: 1400
toc: true
---

## Options

| Option     | Type   | Description                                                                                                                                                                                                      |
|------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `unique`   | bool   | Check map key uniqueness.                                                                                                                                                                                        |
| `range`    | string | Format: `"left, right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - repeated: size range of array. <br> - string: count of utf-8 code point. |
| `refer`    | string | Format: `"<SheetName>.<ColumnName>"`. Ensure this field is in another message's field range. E.g.: `ItemConf.ID`. </br>Supported by [tableauio/loader](https://github.com/tableauio/loader).                     |
| `sequence` | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                                                              |
| `default`  | string | Use this default value if cell is not empty.                                                                                                                                                                     |
| `fixed`    | bool   | Fixed length of horizontal list/map. </br> Default: `false`.                                                                                                                                                     |
| `length`   | uint32 | Specified fixed length of horizontal list/map.                                                                                                                                                                   |
{.table-striped .table-hover}
