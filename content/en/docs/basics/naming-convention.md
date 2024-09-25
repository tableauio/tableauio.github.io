---
title: "Naming convention"
description: "Naming convention."
date: 2024-06-22T23:40:00+08:00
lastmod: 2024-06-22T23:40:00+08:00
draft: false
images: []
weight: 8110
toc: true
---

All names of **workbook**, **worksheet**, **column**, and **struct** (message), should use `PascalCase` (with an initial capital) naming convention. So the tableau parser will treat the **worksheet** name as protoconf message name, and auto converts `PascalCase`  to `snake_case` for protobuf [message field names](https://protobuf.dev/programming-guides/style/#message-field-names) and file names, in order to comply with [Protocol Buffers Style Guide](https://protobuf.dev/programming-guides/style).

## Enums

Use `PascalCase` (with an initial capital) for enum type names and CAPITALS_WITH_UNDERSCORES for value names:

```protobuf
enum FooBar {
  FOO_BAR_UNSPECIFIED = 0;
  FOO_BAR_FIRST_VALUE = 1;
  FOO_BAR_SECOND_VALUE = 2;
}
```

See [Protobuf style: enums](https://protobuf.dev/programming-guides/style/#enums).

## Examples

| Name             | Style        | Example         |
| ---------------- | ------------ | --------------- |
| workbook         | `PascalCase` | HelloWorld.xlsx |
| worksheet        | `PascalCase` | HelloWorld      |
| struct (message) | `PascalCase` | HelloWorld      |
| field (column)   | `PascalCase` | HelloWorld      |
{.table-striped}
