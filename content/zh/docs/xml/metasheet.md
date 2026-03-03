---
title: "Metasheet"
description: "XML metasheet @TABLEAU 使用指南。"
lead: "XML metasheet \"@TABLEAU\" 使用指南。"
date: 2020-10-13T15:21:01+02:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5400
toc: true
---

## XML 中的 metasheet 是什么？

**metasheet** 是通常写在 XML 文件开头的注释块，必须以关键字 `@TABLEAU` 开头，并在后续行中定义节点属性的类型。例如：

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="Sheet1" Alias="ItemConf" OrderedMap="true" Index="(ID,Type)@Item" />
    <Item Sheet="Sheet2" Alias="FruitConf" Sep="," Subsep=":" FieldPresence="true" />
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

## 没有 metasheet 的情况

如果一个 XML 文件没有 metasheet（即没有以 `@TABLEAU` 开头的注释块），则不会生成任何 protobuf 和 JSON 文件。
