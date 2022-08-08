---
title: "Metasheet"
description: "XML metasheet @TABLEAU guide."
lead: "XML metasheet \"@TABLEAU\" guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
weight: 1950
toc: true
---

## What is a Metasheet in XML?

A **Metasheet** is a comment block normally written at the beginning of an XML file, which must begin with keyword `@TABLEAU` and define types of attributes of nodes in the following lines. e.g.:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<RankConf>
  <RankItem Score="[RankItem]int32"/>
</RankConf>
-->
```

## Without Metasheet

If one XML file has no Metasheet (In other words, has no comment block beginning with `@TABLEAU`), no protobuf and json will be generated.

## Empty Metasheet

An empty Metasheet is like that:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU -->
```

If one XML file has an empty Metasheet, then types of all attributes of all nodes in the file will be automatically inferred (e.g.: `int32` for 128, `int64` for 1.8e15, and `string` for "123fdt53g" etc.).
