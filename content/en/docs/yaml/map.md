---
title: "Map"
description: "YAML map guide."
lead: "YAML map guide."
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4500
toc: true
---

## Scalar map

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items: "map<uint32, string>"

---
"@sheet": ItemConf
Items:
  1: dog
  2: bird
  3: cat
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, string> items = 1 [(tableau.field) = {name:"Items"}];
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

## Enum key map

Enum type `FruitType` in *common.proto* is predefined as:

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
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items: "map<enum<.FruitType>, string>"

---
"@sheet": ItemConf
Items:
  FRUIT_TYPE_APPLE: apple
  FRUIT_TYPE_ORANGE: orange
  FRUIT_TYPE_BANANA: banana
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, ItemsValue> items = 1 [(tableau.field) = {name:"Items" key:"@key" span:SPAN_INNER_CELL}];
  message ItemsValue {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"@key"}];
    string value = 2 [(tableau.field) = {name:"@value"}];
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
            "value": "apple"
        },
        "3": {
            "key": "FRUIT_TYPE_ORANGE",
            "value": "orange"
        },
        "4": {
            "key": "FRUIT_TYPE_BANANA",
            "value": "banana"
        }
    }
}
```

{{< /details >}}

## Enum key-value map

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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items: "map<enum<.FruitType>, enum<.FruitFlavor>>"

---
"@sheet": ItemConf
Items:
  FRUIT_TYPE_APPLE: FRUIT_FLAVOR_FRAGRANT
  FRUIT_TYPE_ORANGE: FRUIT_FLAVOR_SOUR
  FRUIT_TYPE_BANANA: FRUIT_FLAVOR_SWEET
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, ItemsValue> items = 1 [(tableau.field) = {name:"Items" key:"@key" span:SPAN_INNER_CELL}];
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
        },
        "4": {
            "key": "FRUIT_TYPE_BANANA",
            "value": "FRUIT_FLAVOR_SWEET"
        }
    }
}
```

{{< /details >}}

## Incell scalar map

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "map<uint32, string>"
  "@incell": true

---
"@sheet": ItemConf
Items: "1:dog,2:bird,3:cat"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "map<enum<.FruitType>, enum<.FruitFlavor>>"
  "@struct": CustomMapValue
  "@incell": true

---
"@sheet": ItemConf
Items: "FRUIT_TYPE_APPLE:FRUIT_FLAVOR_FRAGRANT, FRUIT_TYPE_ORANGE:FRUIT_FLAVOR_SOUR"
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, CustomMapValue> items = 1 [(tableau.field) = {name:"Items" key:"@key" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
  message CustomMapValue {
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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "map<uint32, Item>"
  "@struct":
    Name: string
    Num: int32

---
"@sheet": ItemConf
Items:
  1:
    Name: apple
    Num: 10
  2:
    Name: orange
    Num: 20
  3:
    Name: banana
    Num: 30
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> items = 1 [(tableau.field) = {name:"Items" key:"@key"}];
  message Item {
    uint32 key = 1 [(tableau.field) = {name:"@key"}];
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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "map<enum<.FruitType>, EnumItem>"
  "@struct":
    Name: string
    Num: int32

---
"@sheet": ItemConf
Items:
  FRUIT_TYPE_APPLE:
    Name: apple
    Num: 10
  FRUIT_TYPE_ORANGE:
    Name: orange
    Num: 20
  FRUIT_TYPE_BANANA:
    Name: banana
    Num: 30
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, EnumItem> items = 1 [(tableau.field) = {name:"Items" key:"@key"}];
  message EnumItem {
    protoconf.FruitType key = 1 [(tableau.field) = {name:"@key"}];
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

## Custom key struct map

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "map<uint32, Item>"
  "@struct":
    "@key": CustomKey
    Name: string
    Num: int32

---
"@sheet": ItemConf
Items:
  1:
    Name: apple
    Num: 10
  2:
    Name: orange
    Num: 20
  3:
    Name: banana
    Num: 30
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> items = 1 [(tableau.field) = {name:"Items" key:"CustomKey"}];
  message Item {
    uint32 custom_key = 1 [(tableau.field) = {name:"CustomKey"}];
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

## List in map

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Countries:
  "@type": "map<string, Country>"
  "@struct":
    Desc: string
    Items:
      "@type": "[Item]"
      "@struct":
        Name: string
        Num: int32

---
"@sheet": ItemConf
Countries:
  USA:
    Desc: A country in North America.
    Items:
      - Name: apple
        Num: 10
      - Name: orange
        Num: 20
  China:
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

  map<uint32, Country> countries = 1 [(tableau.field) = {name:"Countries" key:"@key"}];
  message Country {
    string key = 1 [(tableau.field) = {name:"@key"}];
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

A worksheet `ItemConf` in *HelloWorld.yaml*:

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Countries:
  "@type": "map<string, Country>"
  "@struct":
    Desc: string
    Items:
      "@type": "map<string, Item>"
      "@struct":
        "@key": Name
        Num: int32

---
"@sheet": ItemConf
Countries:
  USA:
    Desc: A country in North America.
    Items:
      apple:
        Num: 10
      orange:
        Num: 20
  China:
    Desc: A country in East Asia.
    Items:
      apple:
        Num: 100
      orange:
        Num: 200
```

Generated:

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<string, Country> countries = 1 [(tableau.field) = {name:"Countries" key:"@key"}];
  message Country {
    string key = 1 [(tableau.field) = {name:"@key"}];
    string desc = 2 [(tableau.field) = {name:"Desc"}];
    map<string, Item> items = 3 [(tableau.field) = {name:"Items" key:"@key"}];
    message Item {
      string name = 1 [(tableau.field) = {name:"@key"}];
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
