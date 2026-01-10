---
title: "列表"
description: "XML 列表指南。"
lead: "XML 列表指南。"
date: 2026-01-09T15:21:01+08:00
lastmod: 2026-01-09T15:21:01+08:00
draft: false
images: []
weight: 5200
toc: true
---

## 标量列表

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 枚举列表

*common.proto* 中的枚举类型 `FruitType` 预定义为：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 单元格内标量列表

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 单元格内枚举列表

*common.proto* 中的枚举类型 `FruitType` 预定义为：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 结构体列表

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 预定义结构体列表

*common.proto* 中的 `Item` 预定义为：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 列表中的列表

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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

## 列表中的字典

*HelloWorld.xml* 中的工作表 `ItemConf`：

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

生成：

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
