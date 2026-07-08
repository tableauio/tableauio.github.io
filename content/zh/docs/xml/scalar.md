---
title: "标量（Scalar）"
description: "XML scalar 使用指南。"
lead: "XML 标量使用指南。"
date: 2024-08-23T11:21:01+08:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5000
toc: true
---

## 标量（Scalar）

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成结果：

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

## 字段注释（Note）

自 [v0.16.2](https://github.com/tableauio/tableau/releases/tag/v0.16.2) 起，写在元表注释块中的 `@note` 元属性会被提取为生成 proto 文件中对应字段的注释。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <ID @note="Item's ID">uint32</ID>
    <Name @note="Item's Name">string</Name>
</ItemConf>
-->

<ItemConf>
    <ID>1</ID>
    <Name>Apple</Name>
</ItemConf>
```

生成结果：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  uint32 id = 1 [(tableau.field) = {name:"ID"}]; // Item's ID
  string name = 2 [(tableau.field) = {name:"Name"}]; // Item's Name
}
```

{{< /details >}}

> 提示
>
> - 对于以 XML **属性**（而非子元素）定义的字段（例如 `ID="uint32"`），需要用 `@note.<属性名>`（例如 `@note.ID="Item's ID"`）标注，而不是 `@note`，因为写在父元素上的 `@note` 会被当作父字段自身的注释。
