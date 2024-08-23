---
title: "List"
description: "XML list guide."
lead: "XML list guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5200
toc: true
---

## Scalar list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Items>[int32]</Items>
</ItemConf>
-->

<ItemConf>
    <Items>1</Items>
    <Items>2</Items>
    <Items>3</Items>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated int32 items = 1 [(tableau.field) = {name:"Items"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": [
        1,
        2,
        3
    ]
}
```

{{< /details >}}

## Enum list

Enum type `FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
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
    <Fruits>[enum<.FruitType>]</Fruits>
</ItemConf>
-->

<ItemConf>
    <Fruits>FRUIT_TYPE_APPLE</Fruits>
    <Fruits>FRUIT_TYPE_ORANGE</Fruits>
    <Fruits>FRUIT_TYPE_BANANA</Fruits>
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

  repeated protoconf.FruitType fruits = 1 [(tableau.field) = {name:"Fruits"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "fruits": [
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_BANANA"
    ]
}
```

{{< /details >}}

## Incell scalar list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Items>[]int32</Items>
</ItemConf>
-->

<ItemConf>
    <Items>1, 2, 3</Items>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated int32 items = 1 [(tableau.field) = {name:"Items" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": [
        1,
        2,
        3
    ]
}
```

{{< /details >}}

## Incell enum list

Enum type `FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
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
    <Fruits>[]enum<.FruitType></Fruits>
</ItemConf>
-->

<ItemConf>
    <Fruits>FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA</Fruits>
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

  repeated protoconf.FruitType fruits = 1 [(tableau.field) = {name:"Fruits" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "fruits": [
        "FRUIT_TYPE_APPLE",
        "FRUIT_TYPE_ORANGE",
        "FRUIT_TYPE_BANANA"
    ]
}
```

{{< /details >}}

## Struct list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Items ID="[Item]uint32" Num="int32"/>
</ItemConf>
-->

<ItemConf>
    <Items ID="1" Num="10"/>
    <Items ID="2" Num="20"/>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item items = 1 [(tableau.field) = {name:"Items"}];
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
    "items": [
        {
            "id": 1,
            "num": 10
        },
        {
            "id": 2,
            "num": 20
        }
    ]
}
```

{{< /details >}}

## Predefined struct list

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
    <Items @type="[.Item]"/>
</ItemConf>
-->

<ItemConf>
    <Items ID="1" Num="10"/>
    <Items ID="2" Num="20"/>
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

  repeated protoconf.Item items = 1 [(tableau.field) = {name:"Items"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": [
        {
            "id": 1,
            "num": 10
        },
        {
            "id": 2,
            "num": 20
        }
    ]
}
```

{{< /details >}}

## List in list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Countries Country="[Country]string" Desc="string">
        <Items Name="[Item]string" Num="int32" />
    </Countries>
</ItemConf>
-->

<ItemConf>
    <Countries Country="USA" Desc="A country in North America.">
        <Items Name="apple" Num="10" />
        <Items Name="orange" Num="20" />
    </Countries>
    <Countries Country="China" Desc="A country in East Asia.">
        <Items Name="apple" Num="100" />
        <Items Name="orange" Num="200" />
    </Countries>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Country countries = 1 [(tableau.field) = {name:"Countries"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    repeated Item items = 3 [(tableau.field) = {name:"Items"}];
    message Item {
      string name = 1 [(tableau.field) = {name:"Name"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "countries": [
        {
            "country": "USA",
            "desc": "A country in North America.",
            "items": [
                {
                    "name": "apple",
                    "num": 10
                },
                {
                    "name": "orange",
                    "num": 20
                }
            ]
        },
        {
            "country": "China",
            "desc": "A country in East Asia.",
            "items": [
                {
                    "name": "apple",
                    "num": 100
                },
                {
                    "name": "orange",
                    "num": 200
                }
            ]
        }
    ]
}
```

{{< /details >}}

## Map in list

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Countries Country="[Country]string" Desc="string">
        <Items Name="map<string, Item>" Num="int32" />
    </Countries>
</ItemConf>
-->

<ItemConf>
    <Countries Country="USA" Desc="A country in North America.">
        <Items Name="apple" Num="10" />
        <Items Name="orange" Num="20" />
    </Countries>
    <Countries Country="China" Desc="A country in East Asia.">
        <Items Name="apple" Num="100" />
        <Items Name="orange" Num="200" />
    </Countries>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Country countries = 1 [(tableau.field) = {name:"Countries"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    map<string, Item> items = 3 [(tableau.field) = {name:"Items" key:"Name"}];
    message Item {
      string name = 1 [(tableau.field) = {name:"Name"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "countries": [
        {
            "country": "USA",
            "desc": "A country in North America.",
            "items": {
                "apple": {
                    "name": "apple",
                    "num": 10
                },
                "orange": {
                    "name": "orange",
                    "num": 20
                }
            }
        },
        {
            "country": "China",
            "desc": "A country in East Asia.",
            "items": {
                "apple": {
                    "name": "apple",
                    "num": 100
                },
                "orange": {
                    "name": "orange",
                    "num": 200
                }
            }
        }
    ]
}
```

{{< /details >}}
