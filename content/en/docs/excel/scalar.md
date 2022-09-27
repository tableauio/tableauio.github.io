---
title: "Scalar"
description: "Scalar features."
lead: "This guide demonstrates different features of scalar type."
date: 2022-09-04T13:59:39+01:00
lastmod: 2022-09-04T13:59:39+01:00
draft: false
images: []
weight: 7100
toc: true
---

## Scalar

A worksheet `Apple` in `HelloWorld.xlsx`:

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID        | Name        | Desc                       |
|-----------|-------------|----------------------------|
| uint32    | string      | string                     |
| Item's ID | Item's Name | Item's Description         |
| 1         | Apple       | A kind of delicious fruit. |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

In this worksheet, three scalar fields are defined:

1. ID: `uint32`
2. Name: `string`
3. Desc: `string`

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message Apple {
  option (tableau.worksheet) = {name:"Apple" namerow:1 typerow:2 noterow:3 datarow:4};

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

### Note

Scalar type is usually used to define fields of struct type. [Struct →]({{< relref "struct" >}})
