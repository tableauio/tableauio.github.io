---
title: "命名规范"
description: "命名规范。"
date: 2024-06-22T23:40:00+08:00
lastmod: 2024-06-22T23:40:00+08:00
draft: false
images: []
weight: 8110
toc: true
---

**workbook**、**worksheet**、**column** 和 **struct**（message）的所有名称，均应使用 `PascalCase`（首字母大写）命名规范。tableau 解析器会将 **worksheet** 名称作为 protoconf 的 message 名称，并自动将 `PascalCase` 转换为 `snake_case`，用于 protobuf 的 [message 字段名](https://protobuf.dev/programming-guides/style/#message-field-names)和文件名，以符合 [Protocol Buffers 风格指南](https://protobuf.dev/programming-guides/style)。

## 枚举（Enums）

枚举类型名使用 `PascalCase`（首字母大写），枚举值名使用 `CAPITALS_WITH_UNDERSCORES`（全大写加下划线）：

```protobuf
enum FooBar {
  FOO_BAR_UNSPECIFIED = 0;
  FOO_BAR_FIRST_VALUE = 1;
  FOO_BAR_SECOND_VALUE = 2;
}
```

参考 [Protobuf 风格：枚举](https://protobuf.dev/programming-guides/style/#enums)。

## 示例

| 名称             | 风格         | 示例            |
| ---------------- | ------------ | --------------- |
| workbook         | `PascalCase` | HelloWorld.xlsx |
| worksheet        | `PascalCase` | HelloWorld      |
| struct (message) | `PascalCase` | HelloWorld      |
| field (column)   | `PascalCase` | HelloWorld      |
{.table-striped}
