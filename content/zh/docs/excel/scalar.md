---
title: "Scalar（标量）"
description: "Excel scalar 使用指南。"
lead: "本文说明 Excel scalar 类型的各种特性。"
date: 2022-09-04T13:59:39+08:00
lastmod: 2022-09-04T13:59:39+08:00
draft: false
images: []
weight: 7101
toc: true
---

## Scalar

*HelloWorld.xlsx* 中的 worksheet `Apple`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID        | Name        | Desc                       |
| --------- | ----------- | -------------------------- |
| uint32    | string      | string                     |
| Item's ID | Item's Name | Item's Description         |
| 1         | Apple       | A kind of delicious fruit. |

{{< /sheet >}}

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

该 worksheet 中定义了三个 scalar 字段：

1. ID：`uint32`
2. Name：`string`
3. Desc：`string`

生成结果：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message Apple {
  option (tableau.worksheet) = {name:"Apple"};

  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
}
```

{{< /details >}}

{{< details "Apple.json" >}}

```json
{
    "id": 1,
    "name": "Apple",
    "desc": "A kind of delicious fruit."
}
```

{{< /details >}}

### 说明

Scalar 类型通常用于定义 struct 类型的字段。[Struct →]({{< relref "struct" >}})
