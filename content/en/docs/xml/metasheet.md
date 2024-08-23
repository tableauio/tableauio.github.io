---
title: "Metasheet"
description: "XML metasheet @TABLEAU guide."
lead: "XML metasheet \"@TABLEAU\" guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5400
toc: true
---

## What is a metasheet in XML?

A **metasheet** is a comment block normally written at the beginning of an XML file, which must begin with keyword `@TABLEAU` and define types of attributes of nodes in the following lines. e.g.:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="Sheet1" Alias="ItemConf" OrderedMap="true" Index="(ID,Type)@Item" />
    <Item Sheet="Sheet2" Alias="FruitConf" Sep="," Subsep=":" FieldPresence=“true” />
</@TABLEAU>

<Sheet1>
    <ID>uint32</ID>
    <Num>int32</Num>
    <Value>uint64</Value>
    <Weight>int64</Weight>
    <Percentage>float</Percentage>
    <Ratio>double</Ratio>
    <Name>string</Name>
    <Blob>bytes</Blob>
    <OK>bool</OK>
</Sheet1>

<Sheet2>
    <Countries Key="map<string, Country>" Desc="string">
        <Items Name="map<string, Item>" Num="int32" />
    </Countries>
</Sheet2>
-->
```

## Without metasheet

If one XML file has no metasheet (In other words, has no comment block beginning with `@TABLEAU`), no protobuf and json will be generated.
