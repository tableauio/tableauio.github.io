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
    <Item2 ID="{OtherItem}uint32" Name="string" />
</ItemConf>
-->

<ItemConf>
    <Item ID="1" StartTime="2024-10-01 10:10:10">
      <Expiry>1h</Expiry>
    </Item>
    <Item2 ID="1" Name="gold" />
</ItemConf>
```

> Tips
>
> - Well-known type: [datetime →]({{< relref "../basics/wellknown-types/#datetime" >}})
> - Well-known type: [duration →]({{< relref "../basics/wellknown-types/#duration" >}})

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
  OtherItem item_2 = 2 [(tableau.field) = {name:"Item2"}];
  message OtherItem {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
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
    },
    "item2": {
        "id": 1,
        "name": "gold"
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
    <OtherItem ID="{Item}uint32" StartTime="datetime">
      <Expiry>duration</Expiry>
    </OtherItem>
</ItemConf>
-->

<ItemConf>
    <Item ID="1" StartTime="2024-10-01 10:10:10">
      <Expiry>1h</Expiry>
    </Item>
    <NewItem ID="2" StartTime="2026-10-01 10:10:10">
      <Expiry>2h</Expiry>
    </NewItem>
    <OtherItem ID="3" StartTime="2028-10-01 10:10:10">
      <Expiry>3h</Expiry>
    </OtherItem>
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
  Item other_item = 3 [(tableau.field) = {name:"OtherItem"}];
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
    },
    "otherItem": {
        "id": 3,
        "startTime": "2028-10-01T02:10:10Z",
        "expiry": "10800s"
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
    <Item2 ID="{.Item}int32" Num="int32"  />
</ItemConf>
-->

<ItemConf>
    <Item ID="1" Num="10" />
    <Item2 ID="2" Num="20" />
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
  protoconf.Item item_2 = 2 [(tableau.field) = {name:"Item2"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 1,
        "num": 10
    },
    "item2": {
        "id": 2,
        "num": 20
    }
}
```

{{< /details >}}

## Incell struct

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf Item="{uint32 ID, int32 Num}Item" >
    <Item2>{uint32 ID, int32 Num}OtherItem</Item2>
</ItemConf>
-->

<ItemConf Item="2, 20">
    <Item2>1, 10</Item2>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
  }
  OtherItem item_2 = 2 [(tableau.field) = {name:"Item2" span:SPAN_INNER_CELL}];
  message OtherItem {
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
        "id": 2,
        "num": 20
    },
    "item2": {
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

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf Item="{.Item}">
    <Item2>{.Item}</Item2>
</ItemConf>
-->

<ItemConf Item="2, 20">
    <Item2>1, 10</Item2>
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

  protoconf.Item item = 1 [(tableau.field) = {name:"Item" span:SPAN_INNER_CELL}];
  protoconf.Item item_2 = 2 [(tableau.field) = {name:"Item2" span:SPAN_INNER_CELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "item": {
        "id": 2,
        "num": 20
    },
    "item2": {
        "id": 1,
        "num": 10
    }
}
```

{{< /details >}}
