---
title: "Enum（枚举）"
description: "XML enum 使用指南。"
lead: "XML enum 使用指南。"
date: 2024-08-23T11:21:01+08:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5001
toc: true
---

## 使用预定义枚举类型

*common.proto* 中预定义的枚举类型 `FruitType`：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xml* 中的 worksheet `ItemConf`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <ID>uint32</ID>
    <Type>enum<.FruitType></Type>
    <Desc>string</Desc>
</ItemConf>
-->

<ItemConf>
    <ID>1</ID>
    <Type>FRUIT_TYPE_APPLE</Type>
    <Desc>A kind of delicious fruit.</Desc>
</ItemConf>
```

生成结果：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  protoconf.FruitType type = 2 [(tableau.field) = {name:"Type"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" open >}}

```json
{
    "id": 1,
    "type": "FRUIT_TYPE_APPLE",
    "desc": "A kind of delicious fruit."
}
```

{{< /details >}}
