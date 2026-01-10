---
title: "概述"
description: "CSV 概述。"
lead: "CSV 工作簿和工作表简介。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 6100
toc: true
---

## 概念

由于 Tableau 识别模式 `<BookName>#<SheetName>.csv`，因此 CSV 工作簿（Glob 模式）`<BookName>#*.csv` 由同一目录中的多个 CSV 工作表（文件）组成。

**例如**：

一个 CSV 工作簿 `HelloWorld#*.csv` 由三个 CSV 工作表组成：

1. 工作表 `Item`：`HelloWorld#Item.csv`
2. 工作表 `Activity`：`HelloWorld#Activity.csv`
3. 工作表 `@TABLEAU`：`HelloWorld#@TABLEAU.csv`

## 指南

由于 CSV 工作表与 Excel 工作表相同，因此只需阅读 [Excel 指南 →]({{< relref "../Excel" >}})
