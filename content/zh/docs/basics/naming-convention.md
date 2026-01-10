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

**工作簿**、**工作表**、**列**和**结构体**（message）的所有名称都应使用 `PascalCase`（首字母大写）命名规范。因此，tableau 解析器会将**工作表**名称视为 protoconf message 名称，并自动将 `PascalCase` 转换为 `snake_case`，用于 protobuf [message 字段名称](https://protobuf.dev/programming-guides/style/#message-field-names)和文件名，以符合 [Protocol Buffers 样式指南](https://protobuf.dev/programming-guides/style)。

## 枚举

枚举类型名称使用 `PascalCase`（首字母大写），值名称使用 CAPITALS_WITH_UNDERSCORES：

```protobuf
enum FooBar {
  FOO_BAR_UNSPECIFIED = 0;
  FOO_BAR_FIRST_VALUE = 1;
  FOO_BAR_SECOND_VALUE = 2;
}
```

请参阅 [Protobuf 样式：枚举](https://protobuf.dev/programming-guides/style/#enums)。

## 示例

| 名称             | 样式        | 示例         |
| ---------------- | ------------ | --------------- |
| 工作簿         | `PascalCase` | HelloWorld.xlsx |
| 工作表        | `PascalCase` | HelloWorld      |
| 结构体 (message) | `PascalCase` | HelloWorld      |
| 字段 (column)   | `PascalCase` | HelloWorld      |
{.table-striped}
