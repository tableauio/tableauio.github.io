---
title: "Troubleshooting"
description: "Solutions to common problems."
lead: "Solutions to common problems."
date: 2020-11-12T15:22:20+08:00
lastmod: 2026-05-14T15:22:20+08:00
draft: false
images: []
weight: 1002
toc: true
---

## Error code index

When `tableauc` aborts with an error, the message is prefixed by a stable error
code (e.g. `E2023`). This page lists the most frequently encountered codes,
groups them by component, and explains the typical fixes.

| Range          | Component                                 |
| -------------- | ----------------------------------------- |
| `E0001..E0999` | common (workbook / sheet / column basics) |
| `E1000..E1999` | protogen (proto generation)               |
| `E2000..E2999` | confgen (config parsing & validation)     |
| `E3000..E3999` | importer (workbook discovery & I/O)       |

### Common (E0xxx)

#### E0001: sheet not found in book

The sheet referenced by `tableau.worksheet.name` (or by sheet specifier
`Book#Sheet`) does not exist in the workbook. Check both the workbook file
and the sheet name (case-sensitive).

#### E0002: cannot unmarshal file content to given proto.Message

The file content cannot be parsed into the target message. Verify the file
format (JSON / text / bin) matches `conf.output.formats` and that the proto
schema is up to date.

#### E0003: duplicate column name

Two columns share the same generated name in the same name row. Rename one of
them so column names are unique.

### Confgen (E2xxx)

#### E2000: integer overflow

The cell value is outside the representable range of the target integer type
(e.g. `uint32`). Pick a wider type or a smaller value.

#### E2001: field prop "refer" not configured correctly

The `refer:"SheetName(SheetAlias).ColumnName"` cannot be resolved to any
known sheet. If the sheet is referenced by alias, make sure the alias matches
the generated message name.

#### E2002: field value not in referred space

The cell value is not present in the referenced column's value space. Make
sure the referred sheet is generated **before** the referencing sheet.

#### E2003: illegal sequence number

The value does not satisfy `prop:{sequence:N}`. Sequences must start at `N`
and increase monotonically by 1.

#### E2004: value is out of range

The value violates `prop:{range:"left,right"}`. Both ends are inclusive.

#### E2005: map key not unique {#e2005-map-key-not-unique}

A duplicate map key was found. Either remove the duplicate row/column, or —
if the duplication is intentional and the rows/columns should be merged —
make sure all merged rows/columns are consistent on non-collection fields
(see also [E2023](#e2023-field-value-conflict-across-rows-or-columns)) or
set [`prop:{aggregate:true}`]({{< relref "../excel/field-property/#option-aggregate" >}})
on the cross-row/cross-column collection field (also set
`prop:{unique:false}` on the parent map key field).

> Note: duplicate keyed-list elements are reported by
> [E2028](#e2028-duplicate-elements-in-keyed-list) instead.

#### E2006: enum value not defined in enum type

The cell value is neither a defined enum number, name, nor alias. Add the
value to the enum definition or fix the cell.

#### E2007: invalid datetime format

Use `yyyy-MM-dd HH:mm:ss` or RFC3339, e.g. `2020-01-01 01:00:00` or
`2020-01-01T01:00:00+08:00`.

#### E2008: invalid duration format

Use Go duration format, e.g. `72h3m0.5s`.

#### E2009: duplicate key exists in different sheets

The same key appears in multiple sheets being merged. Different sheets
participating in a merge must have disjoint keys.

#### E2010: union type has no corresponding value field

A union type value has no value field bound to that field number. Bind the
value field to the union type.

#### E2011: field presence required but cell not filled

`prop:{present:true}` requires the cell to be explicitly filled.

#### E2012: invalid syntax of numerical value

The cell cannot be parsed as the declared numeric type. Check for trailing
characters, locale-specific separators, or empty cells.

#### E2013: invalid syntax of boolean value

Accepted: `1, t, T, TRUE, true, True, 0, f, F, FALSE, false, False`.

#### E2014: sheet column not found

A required column is missing on the worksheet. Add it, or — if it is
optional in the schema — set `prop:{optional:true}`.

#### E2015: referred sheet column not found

The column declared by `refer` does not exist on the referenced sheet.

#### E2016: list elements are not present continuously

Once a horizontal list slot is empty, all subsequent slots must also be
empty. Compact the data or fill the gap.

#### E2017: map contains multiple empty keys

A map cannot contain multiple empty keys. If multiple zero-keyed entries are
intentional, fill the keys explicitly.

#### E2018: map key not exists

A map element is missing its key sub-field. Add the key column/cell.

#### E2019: invalid fraction pattern

Supported fraction forms: `0.5`, `5`, `5/6`, `10%`, `10‰`, `10‱`.

#### E2020: invalid comparator pattern

Supported comparator forms: `==5`, `!=5`, `<3/5`, `<=10%`, `>10‰`, `>=10‱`.

#### E2021: duplicate enum value alias

Two enum values declare the same alias. Aliases must be unique within an
enum.

#### E2022: sub-field's value not unique in map values or list elements

A scalar sub-field marked `prop:{unique:true}` has a duplicated value across
map values or list elements.

#### E2023: field value conflict across rows or columns {#e2023-field-value-conflict-across-rows-or-columns}

When the same parent record is visited across multiple rows (vertical) or
columns (horizontal), tableau by default requires all **non-collection**
fields (scalar/struct/union) and non-aggregating list/map fields to carry
**identical** values across every visit. Two fixes:

1. Make the values consistent across all merged rows/columns; or
2. If the field is meant to **accumulate** across rows/columns (either
   `LAYOUT_INCELL` or `LAYOUT_HORIZONTAL` list/map), set
   [`prop:{aggregate:true}`]({{< relref "../excel/field-property/#option-aggregate" >}})
   on it instead.

#### E2024: invalid version pattern

Version pattern must be dotted-decimal: `<MAJOR>.<MINOR>.<PATCH>[.<OTHER>]...`.

#### E2025: version value mismatches pattern

The version value does not match the configured pattern, or some component
exceeds the per-position MAX.

#### E2026: illegally ordered values {#e2026-illegally-ordered-values}

The value sequence violates `prop:{order:...}` (`ORDER_ASC`, `ORDER_DESC`,
`ORDER_STRICTLY_ASC`, `ORDER_STRICTLY_DESC`).

#### E2027: protovalidate violation

A `validate` / `validate_complex` / `validate_message` rule from
[protovalidate](https://github.com/bufbuild/protovalidate) failed. The error
message includes the offending value and the violated rule.

#### E2028: duplicate elements in keyed-list {#e2028-duplicate-elements-in-keyed-list}

A keyed-list (`[]<T>` syntax, which auto-sets the `key` on the field)
contains duplicate elements:

- Scalar / enum keyed-list: the element itself is the key.
- Message keyed-list: only the configured `key` sub-field is compared.

This error is raised in either of these scenarios:

- **incell** keyed-list: duplicate elements within one cell.
- **horizontal / vertical** keyed-list with
  [`prop:{aggregate:true}`]({{< relref "../excel/field-property/#option-aggregate" >}})
  enabled: duplicate elements appear after cross-row/cross-column
  aggregation.

### Importer (E3xxx)

#### E3000: no workbook file found about sheet specifier

The sheet specifier `<BookNamePattern>[#SheetNamePattern]` matched no file.
Check the indir and the glob pattern.

#### E3001: no worksheet found in workbook

The named worksheet does not exist in the matched workbook.

#### E3002: failed to open file

OS-level error opening the file (permission, missing, locked, etc.).

#### E3003: CSV workbook glob pattern matches no files

A CSV workbook glob produced an empty file set. Check the pattern and the
working directory.

## Problems updating tableauc config

> TODO ...

## Problems with loader

> TODO ...
