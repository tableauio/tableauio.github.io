---
title: "Scalar"
description: "YAML scalar guide."
lead: "YAML scalar guide."
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4000
toc: true
---

## Scalar

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
ID: uint32
Num: int32
Value: uint64
Weight: int64
Percentage: float
Ratio: double
Name: string
Blob: bytes
OK: bool

---
"@sheet": ItemConf
ID: 1
Num: 10
Value: 20
Weight: 30
Percentage: 0.5
Ratio: 3.14159
Name: apple
Blob: "VGFibGVhdQ==" # base64 of "Tableau"
OK: true
```

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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
