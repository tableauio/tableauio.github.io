---
title: "Enum"
description: "Enum features."
lead: "This guide demonstrates different features of enum type."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1210
toc: true
---

## Enum value

The tableau parser accepts three enum value forms:

  1. enum value number.
  2. enum value name.
  3. enum value alias name (with EnumValueOptions specified).

For example, enum type `FruitType` in `common.proto` is defined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKOWN = 0 [(tableau.evalue).name = "unknown"];
  FRUIT_TYPE_ORANGE = 1 [(tableau.evalue).name = "orange"];
  FRUIT_TYPE_APPLE  = 2 [(tableau.evalue).name = "apple"];
  FRUIT_TYPE_BANANA = 3 [(tableau.evalue).name = "banana"];
}
```

Then the three forms of enum value are all accepted:

| Enum value number | Enum value name   | Enum value alias |
|-------------------|-------------------|------------------|
| 0                 | FRUIT_TYPE_UNKOWN | unknown          |
| 1                 | FRUIT_TYPE_ORANGE | orange           |
| 2                 | FRUIT_TYPE_APPLE  | apple            |
| 3                 | FRUIT_TYPE_BANANA | banana           |

{{< alert icon="👉" context="warning" text="Enum type must be predefined." />}}

Go to read details about predefiend **Enum** type. [Predefined types →]({{< relref "predefined-types" >}})

## Validation

As enum type is predefined, so the tableau parser will auto validate the enum value.
