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
    <Item>[int32]</Item>
</ItemConf>
-->

<ItemConf>
    <Item>1</Item>
    <Item>2</Item>
    <Item>3</Item>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated int32 item_list = 1 [(tableau.field) = {name:"Item"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
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
    <Fruit>[enum<.FruitType>]</Fruit>
</ItemConf>
-->

<ItemConf>
    <Fruit>FRUIT_TYPE_APPLE</Fruit>
    <Fruit>FRUIT_TYPE_ORANGE</Fruit>
    <Fruit>FRUIT_TYPE_BANANA</Fruit>
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

  repeated protoconf.FruitType fruit_list = 1 [(tableau.field) = {name:"Fruit"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "fruitList": [
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
    <Item>[]int32</Item>
</ItemConf>
-->

<ItemConf>
    <Item>1, 2, 3</Item>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated int32 item_list = 1 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
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
    <Fruit>[]enum<.FruitType></Fruit>
</ItemConf>
-->

<ItemConf>
    <Fruit>FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA</Fruit>
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

  repeated protoconf.FruitType fruit_list = 1 [(tableau.field) = {name:"Fruit" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "fruitList": [
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
    <Item ID="[Item]uint32" Num="int32"/>
</ItemConf>
-->

<ItemConf>
    <Item ID="1" Num="10"/>
    <Item ID="2" Num="20"/>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item item_list = 1 [(tableau.field) = {name:"Item"}];
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
    "itemList": [
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
    <Item @type="[.Item]"/>
</ItemConf>
-->

<ItemConf>
    <Item ID="1" Num="10"/>
    <Item ID="2" Num="20"/>
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

  repeated protoconf.Item item_list = 1 [(tableau.field) = {name:"Item"}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemList": [
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
    <Country Country="[Country]string" Desc="string">
        <Item Name="[Item]string" Num="int32" />
    </Country>
</ItemConf>
-->

<ItemConf>
    <Country Country="USA" Desc="A country in North America.">
        <Item Name="apple" Num="10" />
        <Item Name="orange" Num="20" />
    </Country>
    <Country Country="China" Desc="A country in East Asia.">
        <Item Name="apple" Num="100" />
        <Item Name="orange" Num="200" />
    </Country>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Country country_list = 1 [(tableau.field) = {name:"Country"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    repeated Item item_list = 3 [(tableau.field) = {name:"Item"}];
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
    "countryList": [
        {
            "country": "USA",
            "desc": "A country in North America.",
            "itemList": [
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
            "itemList": [
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
    <Country Country="[Country]string" Desc="string">
        <Item Name="map<string, Item>" Num="int32" />
    </Country>
</ItemConf>
-->

<ItemConf>
    <Country Country="USA" Desc="A country in North America.">
        <Item Name="apple" Num="10" />
        <Item Name="orange" Num="20" />
    </Country>
    <Country Country="China" Desc="A country in East Asia.">
        <Item Name="apple" Num="100" />
        <Item Name="orange" Num="200" />
    </Country>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Country country_list = 1 [(tableau.field) = {name:"Country"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    map<string, Item> item_map = 3 [(tableau.field) = {name:"Item" key:"Name"}];
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
    "countryList": [
        {
            "country": "USA",
            "desc": "A country in North America.",
            "itemMap": {
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
            "itemMap": {
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
