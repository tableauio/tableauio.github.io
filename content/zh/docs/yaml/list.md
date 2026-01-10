---
title: "列表"
description: "YAML 列表指南。"
lead: "YAML 列表指南。"
date: 2024-06-22T10:00:00+08:00
lastmod: 2024-06-22T10:00:00+08:00
draft: false
images: []
weight: 4400
toc: true
---

## 标量列表

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
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

生成的内容：

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

## 枚举列表

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
Fruits: "[enum<.FruitType>"

---
"@sheet": ItemConf
Fruits: [FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA]
```

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
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

## 单元格内标量列表

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
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

生成的内容：

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

## 单元格内枚举列表

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
Fruits: "[]enum<.FruitType>"

---
"@sheet": ItemConf
Fruits: "FRUIT_TYPE_APPLE, FRUIT_TYPE_ORANGE, FRUIT_TYPE_BANANA"
```

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
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

## 结构体列表

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Items:
  "@type": "[Item]"
  "@struct":
    ID: uint32
    Num: int32

---
"@sheet": ItemConf
Items:
  - ID: 1
    Num: 10
  - ID: 2
    Num: 20
```

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

## 预定义结构体列表

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
Items: "[.Item]"

---
"@sheet": ItemConf
Items:
  - ID: 1
    Num: 10
  - ID: 2
    Num: 20
```

生成的内容：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.yaml"};

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

## 列表嵌套列表

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
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

生成的内容：

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

## 列表嵌套字典

*HelloWorld.yaml* 中的工作表 `ItemConf`：

```yaml
# define metasheet: generate all sheets
"@sheet": "@TABLEAU"
---
# define schema
"@sheet": "@ItemConf"
Countries:
  "@type": "[Country]"
  "@struct":
    Country: string
    Desc: string
    Items:
      "@type": "map<string, Item>"
      "@struct":
        "@key": Name
        Num: int32

---
"@sheet": ItemConf
Countries:
  - Country: USA
    Desc: A country in North America.
    Items:
      apple:
        Num: 10
      orange:
        Num: 20
  - Country: China
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

  repeated Country countries = 1 [(tableau.field) = {name:"Countries"}];
  message Country {
    string country = 1 [(tableau.field) = {name:"Country"}];
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