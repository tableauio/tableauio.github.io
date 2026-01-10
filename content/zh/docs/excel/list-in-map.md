---
title: "字典中的列表"
description: "Excel 字典中列表指南。"
lead: "Excel 字典中列表的嵌套规范。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7302
toc: true
---

## 垂直字典中的嵌套

### 垂直字典中的水平列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Prop1ID     | Prop1Value    | Prop2ID    | Prop2Value    |
| ----------------- | ----------- | ----------- | ------------- | ---------- | ------------- |
| map<uint32, Item> | string      | [Prop]int32 | int64         | int32      | int64         |
| Item 的 ID        | Item 的名称 | Prop1 的 ID | Prop1 的值    | Prop2 的 ID | Prop2 的值    |
| 1                 | Apple       | 1           | 10            | 2          | 20            |
| 2                 | Orange      | 3           | 30            |            |               |
| 3                 | Banana      |             |               |            |               |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {name:"Prop" layout:LAYOUT_HORIZONTAL}];
    message Prop {
      int32 id = 1 [(tableau.field) = {name:"ID"}];
      int64 value = 2 [(tableau.field) = {name:"Value"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "propList": [
                {
                    "id": 1,
                    "value": "10"
                },
                {
                    "id": 2,
                    "value": "20"
                }
            ]
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "id": 3,
                    "value": "30"
                }
            ]
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "propList": []
        }
    }
}
```

{{< /details >}}

### 垂直字典中的垂直列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | PropID      | PropValue    |
| ----------------- | ----------- | ----------- | ------------ |
| map<uint32, Item> | string      | [Prop]int32 | int64        |
| Item 的 ID        | Item 的名称 | Prop 的 ID  | Prop 的值    |
| 1                 | Apple       | 1           | 10           |
| 2                 | Orange      | 1           | 20           |
| 2                 | Banana      | 2           | 30           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    repeated Prop prop_list = 3 [(tableau.field) = {layout:LAYOUT_VERTICAL}];
    message Prop {
      int32 prop_id = 1 [(tableau.field) = {name:"PropID"}];
      int64 prop_value = 2 [(tableau.field) = {name:"PropValue"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "10"
                }
            ]
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propList": [
                {
                    "propId": 1,
                    "propValue": "20"
                },
                {
                    "propId": 2,
                    "propValue": "30"
                }
            ]
        }
    }
}
```

{{< /details >}}

### 垂直字典中的单元格内列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Prop         |
| ----------------- | ------------ |
| map<uint32, Item> | []int32      |
| Item 的 ID        | Item 的属性  |
| 1                 | 10,20,30     |
| 2                 | 10,20        |
| 3                 | 10           |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated int32 prop_list = 2 [(tableau.field) = {name:"Prop" layout:LAYOUT_INCELL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "propList": [
                10,
                20,
                30
            ]
        },
        "2": {
            "id": 2,
            "propList": [
                10,
                20
            ]
        },
        "3": {
            "id": 3,
            "propList": [
                10
            ]
        }
    }
}
```

{{< /details >}}

### 垂直字典中的单元格内结构体列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                  | Item                        |
| ------------------- | --------------------------- |
| map<uint32, Reward> | []{uint32 ID,int32 Num}Item |
| 奖励的 ID           | 奖励的物品                  |
| 1                   | 1001:10,1002:20,1003:30     |
| 2                   | 2001:10,2002:20             |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Reward> reward_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Reward {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    repeated Item item_list = 2 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}];
    message Item {
      uint32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
            "itemList": [
                {
                    "id": 1001,
                    "num": 10
                },
                {
                    "id": 1002,
                    "num": 20
                },
                {
                    "id": 1003,
                    "num": 30
                }
            ]
        },
        "2": {
            "id": 2,
            "itemList": [
                {
                    "id": 2001,
                    "num": 10
                },
                {
                    "id": 2002,
                    "num": 20
                }
            ]
        }
    }
}
```

{{< /details >}}

## 水平字典中的嵌套

### 水平字典中的水平列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item1ID   | Reward1Item1Num   | Reward1Item2ID   | Reward1Item2Num   | Reward2ID  | Reward2Item1ID   | Reward2Item1Num   |
| ------------------- | ---------------- | ----------------- | ---------------- | ----------------- | ---------- | ---------------- | ----------------- |
| map<uint32, Reward> | [Item]uint32     | int32             | uint32           | int32             | uint32     | uint32           | int32             |
| Reward1 的 ID       | Reward1 物品1 的 ID | Reward1 物品1 的数量 | Reward1 物品2 的 ID | Reward1 物品2 的数量 | Reward2 的 ID | Reward2 物品1 的 ID | Reward2 物品1 的数量 |
| 1                   | 1                | 10                | 2                | 20                | 2          | 3                | 30                |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Reward> reward_map = 1 [(tableau.field) = {name:"Reward" key:"ID" layout:LAYOUT_HORIZONTAL}]; // Reward
  message Reward {
    uint32 id = 1 [(tableau.field) = {name:"ID"}]; // ID
    repeated Item item_list = 2 [(tableau.field) = {name:"Item" layout:LAYOUT_HORIZONTAL}]; // item
    message Item {
      uint32 id = 1 [(tableau.field) = {name:"ID"}]; // ID
      int32 num = 2 [(tableau.field) = {name:"Num"}]; // num
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
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
        },
        "2": {
            "id": 2,
            "itemList": [
                {
                    "id": 3,
                    "num": 30
                }
            ]
        }
    }
}
```

{{< /details >}}

### 水平字典中的单元格内列表

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item                 | Reward2ID  | Reward2Item   |
| ------------------- | --------------------------- | ---------- | ------------- |
| map<uint32, Reward> | []{uint32 ID,int32 Num}Item | uint32     | []Item        |
| Reward1 的 ID       | Reward1 的物品              | Reward2 的 ID | Reward2 的物品 |
| 1                   | 1:10,2:20                   | 2          | 3:30          |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

对于预定义结构体列表，您可以使用 `[]{.Item}` 代替 `[]{uint32 ID,int32 Num}Item`。

生成结果：

{{< details "hello_world.proto" >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Reward> reward_map = 1 [(tableau.field) = {name:"Reward" key:"ID" layout:LAYOUT_HORIZONTAL}]; // Reward
  message Reward {
    uint32 id = 1 [(tableau.field) = {name:"ID"}]; // ID
    repeated Item item_list = 2 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL span:SPAN_INNER_CELL}]; // items
    message Item {
      uint32 id = 1 [(tableau.field) = {name:"ID"}];
      int32 num = 2 [(tableau.field) = {name:"Num"}];
    }
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {
            "id": 1,
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
        },
        "2": {
            "id": 2,
            "itemList": [
                {
                    "id": 3,
                    "num": 30
                }
            ]
        }
    }
}
```

{{< /details >}}