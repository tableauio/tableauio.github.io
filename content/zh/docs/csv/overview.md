---
title: "概览"
description: "CSV 概览。"
lead: "CSV workbook 和 worksheet 简介。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 6100
toc: true
---

## 概念

Tableau 识别 `<BookName>#<SheetName>.csv` 模式，因此一个 CSV workbook（Glob 模式）`<BookName>#*.csv` 由同一目录下的多个 CSV worksheet（文件）组成。

**示例**：

CSV workbook `HelloWorld#*.csv` 由三个 CSV worksheet 组成：

1. Worksheet `Item`：`HelloWorld#Item.csv`
2. Worksheet `Activity`：`HelloWorld#Activity.csv`
3. Worksheet `@TABLEAU`：`HelloWorld#@TABLEAU.csv`

## 指南

由于 CSV worksheet 与 Excel worksheet 相同，请直接阅读 [Excel 指南 →]({{< relref "../Excel" >}})
