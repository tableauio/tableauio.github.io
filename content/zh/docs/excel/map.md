---
title: "字典"
description: "Excel 字典指南。"
lead: "本指南演示 Excel 字典类型的不同特性。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7106
toc: true
---

## 水平字典

有几种水平字典：

1. 水平**标量**字典，字典值类型为标量。例如：`map<int32, int32>`。
2. 水平**结构体**字典，字典值类型为结构体。例如：`map<int32, Item>`。
3. 水平**预定义结构体**字典，字典值类型为预定义结构体。例如：`map<int32, .Item>`。

### 水平标量字典

无需支持，改用：`map<int32, Item>`。

### 水平结构体字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID           | Item1Name    | Item2ID    | Item2Name    | Item3ID    | Item3Name    |
| ----------------- | ------------ | ---------- | ------------ | ---------- | ------------ |
| map<uint32, Item> | string       | uint32     | string       | uint32     | string       |
| Item1's ID        | Item1's name | Item2's ID | Item2's name | Item3's ID | Item3's name |
| 1                 | Apple        | 2          | Orange       | 3          | Banana       |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
    "itemMap": {
        "1": {
            "id":1,
            "name": "Apple"
        },
        "2": {
            "id": 2,
            "name": "Orange"
        },
        "3": {
            "id": 3,
            "name": "Banana"
        }
    }
}
```

{{< /details >}}

### 水平预定义结构体字典

*common.proto* 中的 `Item` 预定义为：

```protobuf
message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    int32 num = 2 [(tableau.field) = {name:"Num"}];
}
```

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Item1ID           | Item1Num    | Item2ID    | Item2Num    | Item3ID    | Item3Num    |
| ----------------- | ----------- | ---------- | ----------- | ---------- | ----------- |
| map<int32, .Item> | int32       | int32      | int32       | int32      | int32       |
| Item1's ID        | Item1's num | Item2's ID | Item3's num | Item3's ID | Item3's num |
| 1                 | 100         | 2          | 200         | 3          | 300         |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
import "common.proto";
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<int32, protoconf.Item> item_map = 1 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}
