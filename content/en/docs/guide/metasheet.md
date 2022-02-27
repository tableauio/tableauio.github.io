---
title: "Metasheet @TABLEAU"
description: "Metasheet @TABLEAU."
lead: "The tableau metasheet is a worksheet named \"@TABLEAU\" to specify tableau parser options."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1900
toc: true
---

## Overview

| Option       | Function                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `Sheet`      | The worksheet name needed to be processed.                                                      |
| `Alias`      | Rename worksheet to be used as the generated protoconf message name.                            |
| `Nameline`   | The line number of column name definition in a cell. `0` means the whole cell.<br>Default: `0`. |
| `Typeline`   | The line number of column type definition in a cell. `0` means the whole cell.<br>Default: `0`. |
| `Transpose`  | Interchanging the rows and columns of a given sheet.                                            |
| `Nested`     | Nested naming of the **namerow**.<br>Default: `false`.                                          |
| `Sep`        | Separator for in-cell list or map item.<br>Default: `,`.                                        |
| `Subsep`     | Subseparator for separating in-cell map Key-Value pair.<br>Default: `:`.                        |
| `OrderedMap` |      Whether generate OrderedMap accessers.<br>Default: `false`.                                                                                           |
{.table-striped .table-hover}
