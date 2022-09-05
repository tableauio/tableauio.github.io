---
title: "Enum"
description: "Enum features."
lead: "This guide demonstrates different features of enum type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 8210
toc: true
---

## Enum value

The tableau parser accepts three enum value forms:

  1. enum value **name**.
  2. enum value **number**.
  3. enum value **alias**. It is another name in English, Chinese, or any other language, which can be specified by [tableau.evalue](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto#L26) by extending [google.protobuf.EnumValueOptions](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto#L669).

For example, enum type `FruitType` in `common.proto` is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "苹果"];
  FRUIT_TYPE_ORANGE  = 2 [(tableau.evalue).name = "orange"];
}
```

Then the three forms of enum value are all accepted:

| Enum value number | Enum value name    | Enum value alias |
|-------------------|--------------------|------------------|
| 0                 | FRUIT_TYPE_UNKNOWN | unknown          |
| 1                 | FRUIT_TYPE_APPLE   | 苹果             |
| 2                 | FRUIT_TYPE_ORANGE  | orange           |

> NOTE: Enum type must be predefined.

Go to read details about predefiend **Enum** type. [Predefined types →]({{< relref "predefined-types" >}})

## Validation

As enum type is predefined, so the tableau parser will auto validate the enum value.
