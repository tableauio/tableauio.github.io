---
title: "枚举（Enum）"
description: "枚举基础。"
lead: "本文介绍枚举类型的基础知识。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 8300
toc: true
---

## 枚举值

tableau 解析器支持三种枚举值形式：

  1. 枚举值**名称**（name）。
  2. 枚举值**编号**（number）。
  3. 枚举值**别名**（alias）。别名可以是英文、中文或其他任意语言，通过 [tableau.evalue](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto#L26) 扩展 [google.protobuf.EnumValueOptions](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto#L669) 来指定。

例如，`common.proto` 中定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 3 [(tableau.evalue).name = "Banana"];
}
```

以上三种枚举值形式均被接受：

| 枚举值编号 | 枚举值名称         | 枚举值别名 |
| ---------- | ------------------ | ---------- |
| 0          | FRUIT_TYPE_UNKNOWN | Unknown    |
| 1          | FRUIT_TYPE_APPLE   | Apple      |
| 2          | FRUIT_TYPE_ORANGE  | Orange     |
| 3          | FRUIT_TYPE_BANANA  | Banana     |
{.table-striped}

> 注意：枚举类型必须预先定义。

了解预定义 **Enum** 类型的详细信息：[预定义类型 →]({{< relref "predefined-types" >}})。

## 校验

由于枚举类型是预先定义的，tableau 解析器会自动校验枚举值的合法性。
