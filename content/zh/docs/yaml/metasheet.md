---
title: "Metasheet"
description: "YAML metasheet @TABLEAU 使用指南。"
lead: "YAML metasheet \"@TABLEAU\" 使用指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4600
toc: true
---

## 概述

名为 "@TABLEAU" 的 metasheet 用于指定 tableau 解析器选项。
详细信息请参考 [Metasheet →]({{< relref "../excel/metasheet" >}})。

YAML metasheet 示例：

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

> 更多详情...
