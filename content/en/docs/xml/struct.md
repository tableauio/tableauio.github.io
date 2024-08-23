---
title: "Struct"
description: "XML struct guide."
lead: "XML struct guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5100
toc: true
---

## General struct

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Item ID="uint32" StartTime="datetime">
      <Expiry>duration</Expiry>
    </Item>
</ItemConf>
-->

<ItemConf>
    <Item ID="1" StartTime="2024-10-01 10:10:10">
      <Expiry>1h</Expiry>
    </Item>
</ItemConf>
```

> Tips
>
> - Well-known type: [datetime →]({{< relref "../basics/grammar-and-types/#datetime" >}})
> - Well-known type: [duration →]({{< relref "../basics/grammar-and-types/#duration" >}})

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

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

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Item ID="uint32" StartTime="datetime">
      <Expiry>duration</Expiry>
    </Item>
    <NewItem @type="{Item}" />
</ItemConf>
-->

<ItemConf>
    <Item ID="1" StartTime="2024-10-01 10:10:10">
      <Expiry>1h</Expiry>
    </Item>
    <NewItem ID="2" StartTime="2026-10-01 10:10:10">
      <Expiry>2h</Expiry>
    </NewItem>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

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

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Item @type="{.Item}" />
</ItemConf>
-->

<ItemConf>
    <Item ID="1" Num="10" />
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xml"};

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

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

## Incell general struct

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

## Incell predefined struct

{{< alert icon="👉" context="danger" text="Not supported yet." />}}
