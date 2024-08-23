---
title: "Map"
description: "XML map guide."
lead: "XML map guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2024-08-23T11:21:01+08:00
draft: false
images: []
weight: 5300
toc: true
---

## Incell scalar map

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Items>map<uint32, string></Items>
</ItemConf>
-->

<ItemConf>
    <Items>1:dog,2:bird,3:cat</Items>
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, string> items = 1 [(tableau.field) = {name:"Items" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": {
        "1": "dog",
        "2": "bird",
        "3": "cat"
    }
}
```

{{< /details >}}

## Incell enum map

Enum types Enum type `FruitType` and `FruitFlavor` in *common.proto* are predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}

enum FruitFlavor {
  FRUIT_FLAVOR_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_FLAVOR_FRAGRANT = 1 [(tableau.evalue).name = "Fragrant"];
  FRUIT_FLAVOR_SOUR = 2 [(tableau.evalue).name = "Sour"];
  FRUIT_FLAVOR_SWEET = 3 [(tableau.evalue).name = "Sweet"];
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
    <Items>map<enum<.FruitType>, enum<.FruitFlavor>></Items>
</ItemConf>
-->

<ItemConf>
    <Items>FRUIT_TYPE_APPLE:FRUIT_FLAVOR_FRAGRANT, FRUIT_TYPE_ORANGE:FRUIT_FLAVOR_SOUR</Items>
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

  map<int32, ItemsValue> items = 1 [(tableau.field) = {name:"Items" key:"@key" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
  message ItemsValue {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"@key"}];
    protoconf.FruitFlavor value = 2 [(tableau.field) = {name:"@value"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": {
        "1": {
            "key": "FRUIT_TYPE_APPLE",
            "value": "FRUIT_FLAVOR_FRAGRANT"
        },
        "3": {
            "key": "FRUIT_TYPE_ORANGE",
            "value": "FRUIT_FLAVOR_SOUR"
        }
    }
}
```

{{< /details >}}

## Struct map

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Items Key="map<uint32, Item>" Name="string" Num="int32" />
</ItemConf>
-->

<ItemConf>
    <Items Key="1" Name="apple" Num="10" />
    <Items Key="2" Name="orange" Num="20" />
    <Items Key="3" Name="banana" Num="30" />
</ItemConf>
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> items = 1 [(tableau.field) = {name:"Items" key:"Key"}];
  message Item {
    uint32 key = 1 [(tableau.field) = {name:"Key"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 num = 3 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": {
        "1": {
            "key": 1,
            "name": "apple",
            "num": 10
        },
        "2": {
            "key": 2,
            "name": "orange",
            "num": 20
        },
        "3": {
            "key": 3,
            "name": "banana",
            "num": 30
        }
    }
}
```

{{< /details >}}

## Enum key struct map

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
    <Items Key="map<enum<.FruitType>, EnumItem>" Name="string" Num="int32" />
</ItemConf>
-->

<ItemConf>
    <Items Key="FRUIT_TYPE_APPLE" Name="apple" Num="10" />
    <Items Key="FRUIT_TYPE_ORANGE" Name="orange" Num="20" />
    <Items Key="FRUIT_TYPE_BANANA" Name="banana" Num="30" />
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

  map<int32, EnumItem> items = 1 [(tableau.field) = {name:"Items" key:"Key"}];
  message EnumItem {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"Key"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    int32 num = 3 [(tableau.field) = {name:"Num"}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "items": {
        "1": {
            "key": "FRUIT_TYPE_APPLE",
            "name": "apple",
            "num": 10
        },
        "3": {
            "key": "FRUIT_TYPE_ORANGE",
            "name": "orange",
            "num": 20
        },
        "4": {
            "key": "FRUIT_TYPE_BANANA",
            "name": "banana",
            "num": 30
        }
    }
}
```

{{< /details >}}

## List in map

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Countries Key="map<string, Country>" Desc="string">
        <Items Name="[Item]string" Num="int32" />
    </Countries>
</ItemConf>
-->

<ItemConf>
    <Countries Key="USA" Desc="A country in North America.">
        <Items Name="apple" Num="10" />
        <Items Name="orange" Num="20" />
    </Countries>
    <Countries Key="China" Desc="A country in East Asia.">
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

  map<string, Country> countries = 1 [(tableau.field) = {name:"Countries" key:"Key"}];
  message Country {
    string key = 1 [(tableau.field) = {name:"Key"}];
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
    "countries": {
        "China": {
            "key": "China",
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
        },
        "USA": {
            "key": "USA",
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
        }
    }
}
```

{{< /details >}}

## Map in map

A worksheet `ItemConf` in *HelloWorld.xml*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
<@TABLEAU>
    <Item Sheet="ItemConf" />
</@TABLEAU>

<ItemConf>
    <Countries Key="map<string, Country>" Desc="string">
        <Items Name="map<string, Item>" Num="int32" />
    </Countries>
</ItemConf>
-->

<ItemConf>
    <Countries Key="USA" Desc="A country in North America.">
        <Items Name="apple" Num="10" />
        <Items Name="orange" Num="20" />
    </Countries>
    <Countries Key="China" Desc="A country in East Asia.">
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

  map<string, Country> countries = 1 [(tableau.field) = {name:"Countries" key:"Key"}];
  message Country {
    string key = 1 [(tableau.field) = {name:"Key"}];
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
    "countries": {
        "China": {
            "key": "China",
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
        },
        "USA": {
            "key": "USA",
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
        }
    }
}
```

{{< /details >}}
