---
title: "Struct"
description: "YAML struct guide."
lead: "YAML struct guide."
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4300
toc: true
---

## General struct

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item:
  "@type": "{Item}"
  ID: uint32
  StartTime: datetime
  Expiry: duration

---
"@sheet": ItemConf
Item:
  ID: 1
  StartTime: 2024-10-01 10:10:10
  Expiry: 1h
```

> Tips
>
> - Well-known type: [datetime →]({{< relref "../basics/grammar-and-types/#datetime" >}})
> - Well-known type: [duration →]({{< relref "../basics/grammar-and-types/#duration" >}})

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item"}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    google.protobuf.Timestamp start_time = 2 [(tableau.field) = {name:"StartTime"}];
    google.protobuf.Duration expiry = 3 [(tableau.field) = {name:"Expiry"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "startTime": "2024-10-01T02:10:10Z",
        "expiry": "3600s"
    }
}
```

{{< /details >}}

## Reuse same-level struct

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item:
  "@type": "{Item}"
  ID: uint32
  StartTime: datetime
  Expiry: duration
NewItem: "{Item}" # reuse predefined struct type Item above

---
"@sheet": ItemConf
Item:
  ID: 1
  StartTime: 2024-10-01 10:10:10
  Expiry: 1h
NewItem:
  ID: 2
  StartTime: 2026-10-01 10:10:10
  Expiry: 2h
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item"}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    google.protobuf.Timestamp start_time = 2 [(tableau.field) = {name:"StartTime"}];
    google.protobuf.Duration expiry = 3 [(tableau.field) = {name:"Expiry"}];
  }
  Item new_item = 2 [(tableau.field) = {name:"NewItem"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "startTime": "2024-10-01T02:10:10Z",
        "expiry": "3600s"
    },
    "newItem": {
        "id": 2,
        "startTime": "2026-10-01T02:10:10Z",
        "expiry": "7200s"
    }
}
```

{{< /details >}}

## Predefined struct

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item: "{.Item}"

---
"@sheet": ItemConf
Item:
  ID: 1
  Num: 10
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  protoconf.Item item = 1 [(tableau.field) = {name:"Item"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "num": 10
    }
}
```

{{< /details >}}

## Incell struct

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item: "{uint32 ID, int32 Num}Item"

---
"@sheet": ItemConf
Item: "1, 10"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "num": 10
    }
}
```

{{< /details >}}

## Incell general struct

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item:
  "@type": "{Item}"
  "@incell": true
  ID: uint32
  Num: int32

---
"@sheet": ItemConf
Item: "1, 10"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "num": 10
    }
}
```

{{< /details >}}

## Incell predefined struct

`Item` in *common.proto* is predefined as:

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Item:
  "@type": "{.Item}"
  "@incell": true

---
"@sheet": ItemConf
Item: "1, 10"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  protoconf.Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "num": 10
    }
}
```

{{< /details >}}
