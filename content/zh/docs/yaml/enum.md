---
title: "枚举"
description: "YAML 枚举指南。"
lead: "YAML 枚举指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4100
toc: true
---

## 使用预定义枚举类型

*common.proto* 中的枚举类型 `FruitType` 预定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
ID: uint32
Type: "enum<.FruitType>"
Desc: string

---
"@sheet": ItemConf
ID: 1
Type: FRUIT_TYPE_APPLE
Desc: A kind of delicious fruit.
```

生成的内容：

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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