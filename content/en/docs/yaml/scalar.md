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
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
ID: uint32
Name: string

---
"@sheet": ItemConf
ID: 1
Name: apple
```

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "id": 1,
    "name": "apple"
}
```

{{< /details >}}
