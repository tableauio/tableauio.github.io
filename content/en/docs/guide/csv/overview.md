---
title: "Overview"
description: "CSV overview."
lead: "Intro to CSV workbook and worksheet."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1810
toc: true
---

## Concepts

As Tableau recognizes the pattern `<BookName>#<SheetName>.csv`, so a CSV workbook (Glob Pattern) `<BookName>#*.csv` is composed of multiple CSV worksheets (files) in the same directory.

**E.g.**:

A CSV workbook `HelloWorld#*.csv` is composed of three CSV worksheets:

1. Worksheet `Item`: `HelloWorld#Item.csv`
2. Worksheet `Activity`: `HelloWorld#Activity.csv`
3. Worksheet `@TABLEAU`: `HelloWorld#@TABLEAU.csv`

## Guide

As the CSV worksheet is same as the Excel worksheet, so just read [Excel Guide →]({{< relref "../Excel" >}})
