---
title: "概览"
description: "CSV 概览。"
lead: "CSV 工作簿和工作表简介。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 6100
toc: true
---

## 概念

Tableau 识别 `<BookName>#<SheetName>.csv` 模式，因此一个 CSV 工作簿（Glob 模式）`<BookName>#*.csv` 由同一目录下的多个 CSV 工作表（文件）组成。

**示例**：

CSV 工作簿 `HelloWorld#*.csv` 由三个 CSV 工作表组成：

1. 工作表 `Item`：`HelloWorld#Item.csv`
2. 工作表 `Activity`：`HelloWorld#Activity.csv`
3. 工作表 `@TABLEAU`：`HelloWorld#@TABLEAU.csv`

## 指南

由于 CSV 工作表与 Excel 工作表相同，请直接阅读 [Excel 指南]({{< relref "../Excel" >}})
