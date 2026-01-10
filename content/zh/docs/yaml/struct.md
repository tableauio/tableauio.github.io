---
title: "结构体"
description: "YAML 结构体指南。"
lead: "YAML 结构体指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4300
toc: true
---

## 通用结构体

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

> 提示
>
> - 知名类型：[datetime →]({{< relref "../basics/wellknown-types/#datetime" >}})
> - 知名类型：[duration →]({{< relref "../basics/wellknown-types/#duration" >}})

生成的内容：

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

## 复用同级结构体

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 预定义结构体

*common.proto* 中的 `Item` 预定义如下：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 单元格内结构体

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
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

## 单元格内通用结构体

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
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

## 单元格内预定义结构体

*common.proto* 中的 `Item` 预定义如下：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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