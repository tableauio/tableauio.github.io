---
title: "字典"
description: "YAML 字典指南。"
lead: "YAML 字典指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4500
toc: true
---

## 标量字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 枚举键字典

*common.proto* 中的枚举类型 `FruitType` 预定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 枚举键值字典

*common.proto* 中的枚举类型 `FruitType` 和 `FruitFlavor` 预定义如下：

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

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 单元格内标量字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 单元格内枚举字典

*common.proto* 中的枚举类型 `FruitType` 和 `FruitFlavor` 预定义如下：

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

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 结构体字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 枚举键结构体字典

*common.proto* 中的枚举类型 `FruitType` 预定义如下：

```protobuf
enum FruitType {
  FRUIT_TYPE_UNKNOWN = 0 [(tableau.evalue).name = "Unknown"];
  FRUIT_TYPE_APPLE   = 1 [(tableau.evalue).name = "Apple"];
  FRUIT_TYPE_ORANGE  = 3 [(tableau.evalue).name = "Orange"];
  FRUIT_TYPE_BANANA  = 4 [(tableau.evalue).name = "Banana"];
}
```

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 自定义键结构体字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 字典嵌套列表

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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

## 字典嵌套字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

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

生成的内容：

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