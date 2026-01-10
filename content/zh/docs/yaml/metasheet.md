---
title: "元表"
description: "YAML 元表 @TABLEAU 指南。"
lead: "YAML 元表 \"@TABLEAU\" 指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4600
toc: true
---

## 概述

名为 "@TABLEAU" 的元表用于指定 Tableau 解析器选项。
详细信息请阅读 [元表 →]({{< relref "../excel/metasheet" >}})。

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

## 待办事项

> 更多详情...
