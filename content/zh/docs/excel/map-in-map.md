---
title: "映射嵌套映射（Map in map）"
description: "Excel map in map 使用指南。"
lead: "Excel 映射中嵌套映射的规范说明。"
date: 2022-02-26T08:48:57+08:00
lastmod: 2022-02-26T08:48:57+08:00
draft: false
images: []
weight: 7402
toc: true
---

## 垂直映射中的嵌套

### 垂直映射嵌套水平映射（Horizontal-map in vertical-map）

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | Prop1ID          | Prop1Value    | Prop2ID    | Prop2Value    |
| ----------------- | ----------- | ---------------- | ------------- | ---------- | ------------- |
| map<uint32, Item> | string      | map<int32, Prop> | int64         | int32      | int64         |
| Item's ID         | Item's name | Prop1's ID       | Prop1's value | Prop2's ID | Prop2's value |
| 1                 | Apple       | 1                | 10            | 2          | 20            |
| 2                 | Orange      | 3                | 30            |            |               |
| 3                 | Banana      |                  |               |            |               |

{{< /sheet >}}

{{< sheet colored1 >}}

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
        "1": {"id": 1, "name": "Apple", "propMap": {"1": {"id": 1, "value": "10"}, "2": {"id": 2, "value": "20"}}},
        "2": {"id": 2, "name": "Orange", "propMap": {"3": {"id": 3, "value": "30"}}},
        "3": {"id": 3, "name": "Banana", "propMap": {}}
    }
}
```

{{< /details >}}

### 垂直映射嵌套水平聚合映射（Horizontal-aggregate-map in vertical-map） {#horizontal-aggregate-map-in-vertical-map}

> [!NOTE]
> 当键相同的多行需要把**水平展开**的子映射元素**跨行合并**到同一个父记录时，
> 在水平映射字段上设置 [`prop:{aggregate:true}`]({{< relref "field-property/#选项-aggregate" >}})，
> 父映射的键字段同时设置 `prop:{unique:false}` 允许重复键。
>
> 子映射的键跨行重复会触发 [E2005]({{< relref "../help/troubleshooting/#e2005-map-key-不唯一" >}})。

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                                | Name        | Prop1ID                            | Prop1Value    | Prop2ID    | Prop2Value    |
| --------------------------------- | ----------- | ---------------------------------- | ------------- | ---------- | ------------- |
| map<uint32, Item>\|{unique:false} | string      | map<int32, Prop>\|{aggregate:true} | int64         | int32      | int64         |
| Item's ID                         | Item's name | Prop1's ID                         | Prop1's value | Prop2's ID | Prop2's value |
| 1                                 | Apple       | 1                                  | 10            |            |               |
| 1                                 |             | 2                                  | 20            |            |               |
| 2                                 | Orange      | 3                                  | 30            | 4          | 40            |
| 3                                 | Banana      | 5                                  | 50            |            |               |

{{< /sheet >}}

{{< sheet colored1 >}}

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
    uint32 id = 1 [(tableau.field) = {name:"ID" prop:{unique:false}}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    map<int32, Prop> prop_map = 3 [(tableau.field) = {name:"Prop" key:"ID" layout:LAYOUT_HORIZONTAL prop:{aggregate:true}}];
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
        "1": {"id": 1, "name": "Apple", "propMap": {"1": {"id": 1, "value": "10"}, "2": {"id": 2, "value": "20"}}},
        "2": {"id": 2, "name": "Orange", "propMap": {"3": {"id": 3, "value": "30"}, "4": {"id": 4, "value": "40"}}},
        "3": {"id": 3, "name": "Banana", "propMap": {"5": {"id": 5, "value": "50"}}}
    }
}
```

{{< /details >}}

### 垂直映射嵌套垂直映射（Vertical-map in vertical-map）

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Name        | PropID           | PropValue    |
| ----------------- | ----------- | ---------------- | ------------ |
| map<uint32, Item> | string      | map<int32, Prop> | int64        |
| Item's ID         | Item's name | Prop's ID        | Prop's value |
| 1                 | Apple       | 1                | 10           |
| 2                 | Orange      | 1                | 20           |
| 2                 | Orange      | 2                | 30           |

{{< /sheet >}}

{{< sheet colored1 >}}

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
        "1": {"id": 1, "name": "Apple", "propMap": {"1": {"propId": 1, "propValue": "10"}}},
        "2": {"id": 2, "name": "Orange", "propMap": {"1": {"propId": 1, "propValue": "20"}, "2": {"propId": 2, "propValue": "30"}}}
    }
}
```

{{< /details >}}

### 垂直映射嵌套单元格内映射（Incell-map in vertical-map）

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                | Props                      |
| ----------------- | -------------------------- |
| map<uint32, Item> | map<int32, string>         |
| Item's ID         | Item's props               |
| 1                 | 1:sour,2:sweet,3:delicious |
| 2                 | 1:sour,2:sweet             |
| 3                 | 1:sour                     |

{{< /sheet >}}

{{< sheet colored1 >}}

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
        "1": {"id": 1, "propsMap": {"1": "sour", "2": "sweet", "3": "delicious"}},
        "2": {"id": 2, "propsMap": {"1": "sour", "2": "sweet"}},
        "3": {"id": 3, "propsMap": {"1": "sour"}}
    }
}
```

{{< /details >}}

## 水平映射中的嵌套

### 水平映射嵌套水平映射（Horizontal-map in horizontal-map）

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item1ID    | Reward1Item1Num   | Reward1Item2ID   | Reward1Item2Num   | Reward2ID  | Reward2Item1ID   | Reward2Item1Num   |
| ------------------- | ----------------- | ----------------- | ---------------- | ----------------- | ---------- | ---------------- | ----------------- |
| map<uint32, Reward> | map<uint32, Item> | int32             | uint32           | int32             | uint32     | uint32           | int32             |
| Reward1 ID          | Reward1 item1 ID  | Reward1 item1 num | Reward1 item2 ID | Reward1 item2 num | Reward2 ID | Reward2 item1 ID | Reward2 item1 num |
| 1                   | 1                 | 10                | 2                | 20                | 2          | 3                | 30                |

{{< /sheet >}}

{{< sheet colored1 >}}

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

  map<uint32, Reward> reward_map = 1 [(tableau.field) = {name:"Reward" key:"ID" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    map<uint32, Item> item_map = 2 [(tableau.field) = {name:"Item" key:"ID" layout:LAYOUT_HORIZONTAL}];
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
        "1": {"id": 1, "itemMap": {"1": {"id": 1, "num": 10}, "2": {"id": 2, "num": 20}}},
        "2": {"id": 2, "itemMap": {"3": {"id": 3, "num": 30}}}
    }
}
```

{{< /details >}}

### 水平映射嵌套单元格内映射（Incell-map in horizontal-map）

*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| Reward1ID           | Reward1Item        | Reward2ID  | Reward2Item        |
| ------------------- | ------------------ | ---------- | ------------------ |
| map<uint32, Reward> | map<uint32, int32> | uint32     | map<uint32, int32> |
| Reward1 ID          | Reward1 items      | Reward2 ID | Reward2 items      |
| 1                   | 1:10,2:20          | 2          | 3:30               |

{{< /sheet >}}

{{< sheet colored1 >}}

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

  map<uint32, Reward> reward_map = 1 [(tableau.field) = {name:"Reward" key:"ID" layout:LAYOUT_HORIZONTAL}];
  message Reward {
    uint32 id = 1 [(tableau.field) = {name:"ID"}];
    map<uint32, int32> item_map = 2 [(tableau.field) = {name:"Item" layout:LAYOUT_INCELL}];
  }
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "rewardMap": {
        "1": {"id": 1, "itemMap": {"1": 10, "2": 20}},
        "2": {"id": 2, "itemMap": {"3": 30}}
    }
}
```

{{< /details >}}
