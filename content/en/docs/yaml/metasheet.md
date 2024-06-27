---
title: "Metasheet"
description: "YAML metasheet @TABLEAU guide."
lead: "YAML metasheet \"@TABLEAU\" guide."
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4600
toc: true
---

## Overview

The metasheet named "@TABLEAU" is designed to specify tableau parser options.
Go to read details about [Metatsheet →]({{< relref "../excel/metasheet" >}}).

A YAML metasheet example:

```yaml
# define metasheet
"@sheet": "@TABLEAU"
Sheet1:
  Alias: ItemConf
  OrderedMap: true
  Index: "(ID,Type)@Item"
Sheet2:
  Alias: FruitConf
  Sep: ","
  Subsep: ":"
  FieldPresence: true
```

## TODO

> More details...
