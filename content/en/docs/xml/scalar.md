---
title: "Scalar"
description: "XML scalar guide."
lead: "XML scalar guide."
date: 2024-08-23T11:21:01+08:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5000
toc: true
---

## Scalar

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <ID>uint32</ID>
    <Num>int32</Num>
    <Value>uint64</Value>
    <Weight>int64</Weight>
    <Percentage>float</Percentage>
    <Ratio>double</Ratio>
    <Name>string</Name>
    <Blob>bytes</Blob>
    <OK>bool</OK>
</ItemConf>
-->

<ItemConf>
    <ID>1</ID>
    <Num>10</Num>
    <Value>20</Value>
    <Weight>30</Weight>
    <Percentage>0.5</Percentage>
    <Ratio>3.14159</Ratio>
    <Name>apple</Name>
    <Blob>VGFibGVhdQ==</Blob> <!-- # base64 of "Tableau" -->
    <OK>true</OK>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  int32 num = 2 [(tableau.field) = {name:"Num"}];
  uint64 value = 3 [(tableau.field) = {name:"Value"}];
  int64 weight = 4 [(tableau.field) = {name:"Weight"}];
  float percentage = 5 [(tableau.field) = {name:"Percentage"}];
  double ratio = 6 [(tableau.field) = {name:"Ratio"}];
  string name = 7 [(tableau.field) = {name:"Name"}];
  bytes blob = 8 [(tableau.field) = {name:"Blob"}];
  bool ok = 9 [(tableau.field) = {name:"OK"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "id": 1,
    "num": 10,
    "value": "20",
    "weight": "30",
    "percentage": 0.5,
    "ratio": 3.14159,
    "name": "apple",
    "blob": "VkdGaWJHVmhkUT09",
    "ok": true
}
```

{{< /details >}}
