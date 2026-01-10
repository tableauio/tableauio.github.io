---
title: "元数据"
description: "一种称为 Protoconf 的 IDL，用于描述配置的结构（元数据），基于 Protobuf。"
lead: "一种称为 Protoconf 的 IDL，用于描述配置的结构（元数据），基于 Protobuf。"
date: 2022-01-09T19:39:57+08:00
lastmod: 2022-01-09T19:39:57+08:00
draft: false
images: []
weight: 3002
toc: true
mermaid: false
---

## 表示法

语法使用 [扩展巴克斯-诺尔形式 (EBNF)](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) 指定。

## 工作簿 -> Protoconf

### 基础

工作簿：`(AliasTest)DemoTest`，工作表：`(AliasActivity)DemoActivity`

- protoconf 文件名为 `alias_test.proto`。如果没有 `()`，名称将为 `demo_test.proto`
- 配置消息名称为 `AliasActivity`。如果没有 `()`，名称将为 `DemoActivity`
- 列表：`[ELEM-TYPE]COLUMN-TYPE`，COLUMN-TYPE 是列类型，ELEM-TYPE 是消息名称和列表前缀（不得与 protobuf 关键字冲突）。
- 字典：`map<KEY-TYPE,VALUE-TYPE>`，KEY-TYPE 必须是标量值类型，VALUE-TYPE 是消息名称和字典前缀（不得与内置标量值类型冲突）。
- 导入消息类型：`.TYPE`，例如：`.Item` 表示在同一 protobuf 包中已定义的消息 `Item`，不应重新定义它。
- 知名类型
  - 时间戳：`google.protobuf.Timestamp`
  - 持续时间：`google.protobuf.Duration`

{{< spreadsheet "Activity.xlsx" Activity "@TABLEAU" >}}

{{< sheet colored >}}

| ActivityID           | ActivityName | ActivityBeginTime   | ActivityDuration | ChapterID           | ChapterName | SectionID       | SectionName | SectionItem1Id | SectionItem1Num | SectionItem2Id | SectionItem2Num |
| -------------------- | ------------ | ------------------- | ---------------- | ------------------- | ----------- | --------------- | ----------- | -------------- | --------------- | -------------- | --------------- |
| map<uint32,Activity> | string       | timestamp           | duration         | map<uint32,Chapter> | string      | [Section]uint32 | int32       | [.Item]int32   | int32           | int32          | int32           |
| 1                    | activity1    | 2020-01-01 05:00:00 | 72h              | 1                   | chapter1    | 1               | section1    | 1001           | 1               | 1002           | 2               |
| 1                    | activity1    | 2020-01-01 05:00:00 | 72h              | 1                   | chapter1    | 2               | section2    | 1001           | 1               | 1002           | 2               |
| 1                    | activity1    | 2020-01-01 05:00:00 | 72h              | 2                   | chapter2    | 1               | section1    | 1001           | 1               | 1002           | 2               |
| 2                    | activity2    | 2020-01-01 05:00:00 | 72h3m0.5s        | 1                   | chapter1    | 1               | section1    | 1001           | 1               | 1002           | 2               |

{{< /sheet >}}

{{< sheet >}}

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

{{< /sheet >}}

{{< /spreadsheet >}}

```protobuf
// common.proto
message Item {
  int32 id = 1 [(tableau.field).name = "Id"];
  int32 num= 2 [(tableau.field).name = "Num"];
}
```

#### 不带前缀的输出

```protobuf
// demo_test.proto
import "common.proto"

message DemoActivity{
  map<uint32, Activity> activity_map = 1 [(key) = "ActivityID"];
  message Activity {
    uint32 id= 1 [(tableau.field).name = "ActivityID"];
    string name = 2 [(tableau.field).name = "ActivityName"];
    map<uint32, Chapter> chapter_map = 3 [(tableau.field).key = "ChapterID"];
  }
  message Chapter {
    uint32 id= 1 [(tableau.field).name = "ChapterID"];
    string name = 2 [(tableau.field).name = "ChapterName"];
    repeated Section section_list = 3 [(tableau.field).layout = LAYOUT_VERTICAL];
  }
  message Section {
    uint32 id= 1 [(tableau.field).name = "SectionID"];
    string name = 2 [(tableau.field).name = "SectionName"];
    repeated Item item_list = 3 [(tableau.field).name = "SectionItem"];
  }
}
```

#### 带前缀的输出

```protobuf
// demo_test.proto
message DemoActivity{
  map<uint32, Activity> activity_map = 1 [(key) = "ActivityID"];
  message Activity {
    uint32 activity_id= 1 [(tableau.field).name = "ActivityID"];
    string activity_name = 2 [(tableau.field).name = "ActivityName"];
    map<uint32, Chapter> chapter_map = 3 [(tableau.field).key = "ChapterID"];
  }
  message Chapter {
    uint32 chapter_id= 1 [(tableau.field).name = "ChapterID"];
    string chapter_name = 2 [(tableau.field).name = "ChapterName"];
    repeated Section section_list = 3 [(tableau.field).layout = LAYOUT_VERTICAL];
  }
  message Section {
    uint32 section_id= 1 [(tableau.field).name = "SectionID"];
    string section_name = 2 [(tableau.field).name = "SectionName"];
    repeated Item section_item_list = 3 [(tableau.field).name = "SectionItem"];
  }
}
```

### 单元格内

工作簿：`(AliasTest)DemoTest`，工作表：`(Env)Environment`

{{< sheet colored >}}

| ID     | Name   | IncellMessage                         | IncellList | IncellMap         | IncellMessageList            | IncellMessageMap                       |
| ------ | ------ | ------------------------------------- | ---------- | ----------------- | ---------------------------- | -------------------------------------- |
| uint32 | string | {int32 id,string desc,int32 value}Msg | []int32    | map<int32,string> | []{int32 id,string desc}Elem | map<int32,Value{int32 id,string desc}> |
| 1      | Earth  | 1,desc,100                            | 1,2,3      | 1:hello,2:world   | {1,hello},{2,world}          | 1:{1,hello},2:{2,world}                |

{{< /sheet >}}

#### IncellMessage

语法：*待办事项：EBNF*
类型：消息类型
值：逗号分隔的字段值，例如：`1,desc,100`
规则：
| 默认类型 | 值                      |
| ------------ | -------------------------- |
| int32        | 可以解析为数字    |
| string       | 不能解析为数字 |

#### IncellList

语法：`[]Type`
类型：任何标量值类型
值：逗号分隔的列表项，例如：`1,2,3`

#### IncellMap

语法：`map<Type,Type>`
类型：任何标量类型
值：逗号分隔的键值对，键值之间用冒号分隔。例如：`1:hello,2:world`

#### IncellMessageList

待办事项...

#### IncellMessageMap

待办事项...

#### 输出

```protobuf
// demo_test.proto
message Env {
  uint32 ID = 1 [(tableau.field).name = "ID"];
  string name = 2 [(tableau.field).name = "Name"];
  Msg incell_message= 3 [(tableau.field).name = "IncellMessage"];
  repeated int32 incell_list= 4 [(tableau.field).name = "IncellList"];
  map<int32, string> incell_map = 5 [(tableau.field).name = "IncellMap"];
  repeated Elem incell_message_list= 6 [(tableau.field).name = "IncellMessageList"];
    map<int32, Value> incell_message_map = 7 [(tableau.field).name = "IncellMessageMap"];

    // 默认名称：field + <tagid>
  message Msg {
    int32 id = 1;
    string desc= 2; 
    int32 value= 3;
  }
  message Elem {
    int32 id = 1;
    string desc= 2;
  }
  message Value {
    int32 id = 1;
    string desc= 2;
  }
}
```

- 单元格内消息：逗号分隔的序列：`{TYPE [NAME],TYPE [NAME]}`，NAME 是可选的，如果未指定，将自动生成为 `field + <tagid>`。
- 单元格内列表：`[]TYPE`，TYPE 必须是标量值类型。
- 单元格内字典：`map[KEY]VALUE`，KEY 和 VALUE 必须是标量值类型。
- 单元格内消息列表：`[]TYPE`，TYPE 必须是消息类型。
- 单元格内消息字典：`map[KEY]VALUE`，KEY 是标量，VALUE 必须是消息类型。

## Protoconf -> 工作簿

待办事项...
