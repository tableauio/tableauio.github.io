---
title: "标量"
description: "Excel 标量指南。"
lead: "本指南演示 Excel 标量类型的不同特性。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7101
toc: true
---

## 标量

*HelloWorld.xlsx* 中的工作表 `Apple`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID        | Name        | Desc                       |
| --------- | ----------- | -------------------------- |
| uint32    | string      | string                     |
| Item's ID | Item's Name | Item's Description         |
| 1         | Apple       | A kind of delicious fruit. |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

在此工作表中，定义了三个标量字段：

1. ID：`uint32`
2. Name：`string`
3. Desc：`string`

生成：

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

### 注意

标量类型通常用于定义结构体类型的字段。[结构体 →]({{< relref "struct" >}})
