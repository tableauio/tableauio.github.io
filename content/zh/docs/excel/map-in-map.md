---
title: "字典中的字典"
description: "Excel 字典中字典指南。"
lead: "Excel 字典中字典的嵌套规范。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7402
toc: true
---

## 垂直字典中的嵌套

### 垂直字典中的水平字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Prop1ID          | Prop1Value    | Prop2ID    | Prop2Value    |
| ----------------- | ----------- | ---------------- | ------------- | ---------- | ------------- |
| map<uint32, Item> | string      | map<int32, Prop> | int64         | int32      | int64         |
| Item 的 ID        | Item 的名称 | Prop1 的 ID      | Prop1 的值    | Prop2 的 ID | Prop2 的值    |
| 1                 | Apple       | 1                | 10            | 2          | 20            |
| 2                 | Orange      | 3                | 30            |            |               |
| 3                 | Banana      |                  |               |            |               |

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
    map<int32, Prop> prop_map = 3 [(tableau.field) = {name:"Prop" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
            "propMap": {
                "1": {
                    "id": 1,
                    "value": "10"
                },
                "2": {
                    "id": 2,
                    "value": "20"
                }
            }
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propMap": {
                "3": {
                    "id": 3,
                    "value": "30"
                }
            }
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "propMap": {}
        }
    }
}
```

{{< /details >}}

### 垂直字典中的垂直字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | PropID           | PropValue    |
| ----------------- | ----------- | ---------------- | ------------ |
| map<uint32, Item> | string      | map<int32, Prop> | int64        |
| Item 的 ID        | Item 的名称 | Prop 的 ID       | Prop 的值    |
| 1                 | Apple       | 1                | 10           |
| 2                 | Orange      | 1                | 20           |
| 2                 | Orange      | 2                | 30           |

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
    map<int32, Prop> prop_map = 3 [(tableau.field) = {key:"PropID" layout:LAYOUT_VERTICAL}];
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
            "propMap": {
                "1": {
                    "propId": 1,
                    "propValue": "10"
                }
            }
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "propMap": {
                "1": {
                    "propId": 1,
                    "propValue": "20"
                },
                "2": {
                    "propId": 2,
                    "propValue": "30"
                }
            }
        }
    }
}
```

{{< /details >}}

### 垂直字典中的单元格内字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Props                      |
| ----------------- | -------------------------- |
| map<uint32, Item> | map<int32, string>         |
| Item 的 ID        | Item 的属性                |
| 1                 | 1:sour,2:sweet,3:delicious |
| 2                 | 1:sour,2:sweet             |
| 3                 | 1:sour                     |

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
    map<int32, string> props_map = 2 [(tableau.field) = {name:"Props" layout:LAYOUT_INCELL}];
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
            "propsMap": {
                "1": "sour",
                "2": "sweet",
                "3": "delicious"
            }
        },
        "2": {
            "id": 2,
            "propsMap": {
                "1": "sour",
                "2": "sweet"
            }
        },
        "3": {
            "id": 3,
            "propsMap": {
                "1": "sour"
            }
        }
    }
}
```

{{< /details >}}

## 水平字典中的嵌套

### 水平字典中的水平字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item1ID    | Reward1Item1Num   | Reward1Item2ID   | Reward1Item2Num   | Reward2ID  | Reward2Item1ID   | Reward2Item1Num   |
| ------------------- | ----------------- | ----------------- | ---------------- | ----------------- | ---------- | ---------------- | ----------------- |
| map<uint32, Reward> | map<uint32, Item> | int32             | uint32           | int32             | uint32     | uint32           | int32             |
| Reward1 的 ID       | Reward1 物品1 的 ID | Reward1 物品1 的数量 | Reward1 物品2 的 ID | Reward1 物品2 的数量 | Reward2 的 ID | Reward2 物品1 的 ID | Reward2 物品1 的数量 |
| 1                   | 1                 | 10                | 2                | 20                | 2          | 3                | 30                |

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
    map<uint32, Item> item_map = 2 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}]; // item
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
            "itemMap": {
                "1": {
                    "id": 1,
                    "num": 10
                },
                "2": {
                    "id": 2,
                    "num": 20
                }
            }
        },
        "2": {
            "id": 2,
            "itemMap": {
                "3": {
                    "id": 3,
                    "num": 30
                }
            }
        }
    }
}
```

{{< /details >}}

### 水平字典中的单元格内字典

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item        | Reward2ID  | Reward2Item        |
| ------------------- | ------------------ | ---------- | ------------------ |
| map<uint32, Reward> | map<uint32, int32> | uint32     | map<uint32, int32> |
| Reward1 的 ID       | Reward1 的物品     | Reward2 的 ID | Reward2 的物品     |
| 1                   | 1:10,2:20          | 2          | 3:30               |

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
    map<uint32, int32> item_map = 2 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL}]; // Reward1 items
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
            "itemMap": {
                "1": 10,
                "2": 20
            }
        },
        "2": {
            "id": 2,
            "itemMap": {
                "3": 30
            }
        }
    }
}
```

{{< /details >}}