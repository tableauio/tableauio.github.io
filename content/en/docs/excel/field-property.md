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

## Options

| Option     | Type   | Description                                                                                                                                                                                    |
|------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `unique`   | bool   | Check map key uniqueness.                                                                                                                                                                      |
| `range`    | string | Format: `"left, right"`. E.g.: `"1,10"`, `"1,~"`, `"~,10"`. <br> Different interpretations of range: <br> - number: value range. <br> - string: count of utf-8 code point.                     |
| `refer`    | string | Format: `"SheetName(SheetAlias).ColumnName"`.<br>Ensure this field is in another sheet's column value space (aka message's field value space). <br>E.g.:<br> - `"ItemConf.ID"`: sheet name is unique.<br> - `"Item(ItemConf).ID"`: different workbooks have the same sheet name, but sheet alias is unique inherently.|
| `sequence` | int64  | Ensure this field's value is a sequence and begins with this value.                                                                                                                            |
| `default`  | string | Use this default value if cell is empty.                                                                                                                                                   |
| `fixed`    | bool   | Auto-detected fixed size of horizontal list/map. <br> Default: `false`.                                                                                                                       |
| `size`     | uint32 | Specified fixed size of horizontal list/map.                                                                                                                                                   |
{.table-striped .table-hover}
