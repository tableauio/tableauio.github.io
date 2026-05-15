---
title: "元表（Metasheet）"
description: "YAML 元表 @TABLEAU 使用指南。"
lead: "YAML 元表 \"@TABLEAU\" 使用指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4600
toc: true
---

## 概述

名为 "@TABLEAU" 的元表用于指定 tableau 解析器选项。
详细信息请参考 [元表]({{< relref "../excel/metasheet" >}})。

YAML 元表示例：

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
