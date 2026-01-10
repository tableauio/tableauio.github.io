---
title: "联合类型"
description: "Excel 联合类型指南。"
lead: "本指南演示 Excel 联合类型的不同特性。"
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 7104
toc: true
---

## 理论

在 protoconf 中，`union` 类型意味着**标记联合**：一种用于保存可以采用几种不同但固定类型的值的数据结构。任何时候只能使用其中一种类型，并且一个**标记**字段明确指示正在使用哪一种类型。更多详细信息可以从 wikipedia [标记联合](https://en.wikipedia.org/wiki/Tagged_union) 中学习。

不同编程语言中的**标记联合**：

- C++：[std::variant](https://en.cppreference.com/w/cpp/utility/variant)。
- Rust：[定义枚举](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)。

Tableau 使用 protobuf `message` 将 `enum` 类型和 [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) 类型捆绑在一起来实现**标记联合**。默认情况下，每个枚举值（> 0）都绑定到 [`oneof`](https://protobuf.dev/programming-guides/proto3/#oneof) 类型中具有相同标签号的字段。

## 联合类型定义

例如，*common.proto* 中预定义的联合类型 `Target`：

```protobuf
// 预定义联合类型。
message Target {
  option (tableau.union) = true;

  Type type = 9999 [(tableau.field) = { name: "Type" }];
  oneof value {
    option (tableau.oneof) = {
      field: "Field"
    };
    Pvp pvp = 1;      // 绑定到枚举值 1：TYPE_PVP。
    Pve pve = 2;      // 绑定到枚举值 2：TYPE_PVE。
    Story story = 3;  // 绑定到枚举值 3：TYPE_STORY。
    Skill skill = 4;  // 绑定到枚举值 4：TYPE_SKILL。
  }

  enum Type {
    TYPE_NIL = 0;
    TYPE_PVP = 1 [(tableau.evalue) = { name: "PVP" }];
    TYPE_PVE = 2 [(tableau.evalue) = { name: "PVE" }];
    TYPE_STORY = 3 [(tableau.evalue) = { name: "Story" }];
    TYPE_SKILL = 4 [(tableau.evalue) = { name: "Skill" }];
  }
  message Pvp {
    int32 type = 1;                          // 标量
    int64 damage = 2;                        // 标量
    repeated protoconf.FruitType types = 3;  // 单元格内枚举列表
  }
  message Pve {
    Mission mission = 1;             // 单元格内结构体
    repeated int32 heros = 2;        // 单元格内列表
    map<int32, int64> dungeons = 3;  // 单元格内字典

    message Mission {
      int32 id = 1;
      uint32 level = 2;
      int64 damage = 3;
    }
  }
  message Story {
    protoconf.Item cost = 1;                     // 单元格内预定义结构体
    map<int32, protoconf.FruitType> fruits = 2;  // 单元格内字典，值为枚举类型
    map<int32, Flavor> flavors = 3;              // 单元格内字典，键为枚举类型
    message Flavor {
      protoconf.FruitFlavor key = 1 [(tableau.field) = { name: "Key" }];
      int32 value = 2 [(tableau.field) = { name: "Value" }];
    }
  }
  message Skill {
    int32 id = 1;      // 标量
    int64 damage = 2;  // 标量
    // 无字段标签 3
  }
}
```

## 列表中的预定义联合类型

> 基于 [预定义联合类型 `Target`]({{< relref "union/#union-definition" >}})。

*HelloWorld.xlsx* 中的工作表 `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Target1Type                 | Target1Field1    | Target1Field2    | Target1Field3       | Target2Type        | Target2Field1    | Target2Field2    | Target2Field3    |
| ---------------- | --------------------------- | ---------------- | ---------------- | ------------------- | ------------------ | ---------------- | ---------------- | ---------------- |
| map<int32, Task> | [.Target]enum<.Target.Type> | union            | union            | union               | enum<.Target.Type> | union            | union            | union            |
| ID               | Target1's type              | Target1's field1 | Target1's field2 | Target1's field3    | Target2's type     | Target2's field1 | Target2's field2 | Target2's field3 |
| 1                | PVP                         | 1                | 10               | Apple,Orange,Banana | PVE                | 1,100,999        | 1,2,3            | 1:10,2:20,3:30   |
| 2                | Story                       | 1001,10          | 1:Apple,2:Orange | Fragrant:1,Sour:2   | Skill              | 1                | 2                |                  |

{{< /sheet >}}

{{< /spreadsheet >}}

## 字典中的预定义联合类型

> 基于 [预定义联合类型 `Target`]({{< relref "union/#union-definition" >}})。

*HelloWorld.xlsx* 中的工作表 `TaskConf`：

{{< spreadsheet "HelloWorld.xlsx" Apple "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Target1Type                 | Target1Field1    | Target1Field2    | Target1Field3       | Target2Type        | Target2Field1    | Target2Field2    | Target2Field3    |
| ---------------- | --------------------------- | ---------------- | ---------------- | ------------------- | ---------------- | ---------------- | ------------------- | ---------------- | ---------------- |
| map<int32, Task> | [.Target]enum<.Target.Type> | union            | union            | union               | enum<.Target.Type> | union            | union            | union            |
| ID               | Target1's type              | Target1's field1 | Target1's field2 | Target1's field3    | Target2's type     | Target2's field1 | Target2's field2 | Target2's field3 |
| 1                | PVP                         | 1                | 10               | Apple,Orange,Banana | PVE                | 1,100,999        | 1,2,3            | 1:10,2:20,3:30   |
| 2                | Story                       | 1001,10          | 1:Apple,2:Orange | Fragrant:1,Sour:2   | Skill              | 1                | 2                |                  |

{{< /sheet >}}

{{< /spreadsheet >}}
