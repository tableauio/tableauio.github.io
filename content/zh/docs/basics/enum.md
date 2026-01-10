---
title: "枚举"
description: "枚举基础。"
lead: "本指南演示枚举类型的基础知识。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 8300
toc: true
---

## 枚举值

tableau 解析器接受三种枚举值形式：

  1. 枚举值**名称**。
  2. 枚举值**数字**。
  3. 枚举值**别名**。它是英语、中文或任何其他语言的另一个名称，可以通过扩展 [google.protobuf.EnumValueOptions](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto#L669) 来指定 [tableau.evalue](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto#L26)。

例如，`common.proto` 中的枚举类型 `FruitType` 定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}
```

然后这三种形式的枚举值都可以被接受：

| 枚举值数字 | 枚举值名称    | 枚举值别名 |
| ----------------- | ------------------ | ---------------- |
| 0                 | FRUIT_TYPE_UNKNOWN | Unknown          |
| 1                 | FRUIT_TYPE_APPLE   | Apple            |
| 2                 | FRUIT_TYPE_ORANGE  | Orange           |
| 3                 | FRUIT_TYPE_BANANA  | Banana           |
{.table-striped}

> 注意：枚举类型必须预先定义。

前往阅读关于预定义**枚举**类型的详细信息：[预定义类型 →]({{< relref "predefined-types" >}})。

## 验证

由于枚举类型是预先定义的，因此 tableau 解析器会自动验证枚举值。
