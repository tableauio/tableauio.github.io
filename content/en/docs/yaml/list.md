---
title: "List"
description: "YAML list guide."
lead: "YAML list guide."
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4400
toc: true
---

## Scalar list

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items: "[int32]"

---
"@sheet": ItemConf
Items: [1, 2, 3]
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

`FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Fruits: "[enum<.FruitType>]"

---
"@sheet": ItemConf
Fruits: [FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA]
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items: "[]int32"

---
"@sheet": ItemConf
Items: "1, 2, 3"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

`FruitType` in *common.proto* is predefined as:

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Fruits: "[]enum<.FruitType>"

---
"@sheet": ItemConf
Fruits: "FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
Items:
  "@type": "[Item]"
  "@struct":
    ID: uint32
    Name: string

---
"@sheet": ItemConf
Items:
  - ID: 1
    Num: 10
  - ID: 2
    Num: 20
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Item items = 1 [(tableau.field) = {name:"Items"}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
Items: "[.Item]"

---
"@sheet": ItemConf
Items:
  - ID: 1
    Num: 10
  - ID: 2
    Num: 20
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated protoconf.Item items = 1 [(tableau.field) = {name:"Items" layout:LAYOUT_INCELL}];
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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
Countries:
  "@type": "[Country]"
  "@struct":
    Country: string 
    Desc: string
    Items:
      "@type": "[Item]"
      "@struct":
        Name: string
        Num: int32

---
"@sheet": ItemConf
Countries:
  - Country: USA
    Desc: A country in North America.
    Items:
      - Name: apple
        Num: 10
      - Name: orange
        Num: 20
  - Country: China
    Desc: A country in East Asia.
    Items:
      - Name: apple
        Num: 100
      - Name: orange
        Num: 200
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
---
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
Countries:
  "@type": "[Country2]"
  "@struct":
    Country: string 
    Desc: string
    Items:
      "@type": "map<uint32, Item>"
      "@struct":
        Name: string
        Num: int32

---
"@sheet": ItemConf
Countries:
  - Country: USA
    Desc: A country in North America.
    Items:
      1:
        Name: apple
        Num: 10
      2:
        Name: orange
        Num: 20
  - Country: China
    Desc: A country in East Asia.
    Items:
      1:
        Name: apple
        Num: 100
      2:
        Name: orange
        Num: 200
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  repeated Country countries = 1 [(tableau.field) = {name:"Countries"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    map<uint32, Item> items = 3 [(tableau.field) = {name:"Items" key:"@key"}];
    message Item {
      uint32 key = 1 [(tableau.field) = {name:"@key"}];
      string name = 2 [(tableau.field) = {name:"Name"}];
      int32 num = 3 [(tableau.field) = {name:"Num"}];
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
                "1": {
                    "key": 1,
                    "name": "apple",
                    "num": 10
                },
                "2": {
                    "key": 2,
                    "name": "orange",
                    "num": 20
                }
            }
        },
        {
            "country": "China",
            "desc": "A country in East Asia.",
            "items": {
                "1": {
                    "key": 1,
                    "name": "apple",
                    "num": 100
                },
                "2": {
                    "key": 2,
                    "name": "orange",
                    "num": 200
                }
            }
        }
    ]
}
```

{{< /details >}}
