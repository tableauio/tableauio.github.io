---
title: "Metadata"
description: "一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。"
lead: "一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。"
date: 2022-01-09T19:39:57+08:00
lastmod: 2022-01-09T19:39:57+08:00
draft: false
images: []
weight: 3002
toc: true
mermaid: false
---

## 符号说明

语法使用[扩展巴科斯-瑙尔范式（EBNF）](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form)描述。

## Workbook -> Protoconf

### 基础

workbook：`(AliasTest)DemoTest`，worksheet：`(AliasActivity)DemoActivity`

- protoconf 文件名为 `alias_test.proto`。若无 `()`，则名称为 `demo_test.proto`
- 配置 message 名称为 `AliasActivity`。若无 `()`，则名称为 `DemoActivity`
- list：`[ELEM-TYPE]COLUMN-TYPE`，COLUMN-TYPE 为列类型，ELEM-TYPE 为 message 名称和 list 前缀（不得与 protobuf 关键字冲突）。
- map：`map<KEY-TYPE,VALUE-TYPE>`，KEY-TYPE 必须为标量类型，VALUE-TYPE 为 message 名称和 map 前缀（不得与内置标量类型冲突）。
- 导入 message 类型：`.TYPE`，例如：`.Item` 表示已在同一 protobuf package 中定义的 message `Item`，不应重新定义。
- wellknown 类型
  - Timestamp：`google.protobuf.Timestamp`
  - Duration：`google.protobuf.Duration`

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

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

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

### Incell

workbook：`(AliasTest)DemoTest`，worksheet：`(Env)Environment`

{{< sheet colored >}}

| ID     | Name   | IncellMessage                         | IncellList | IncellMap         | IncellMessageList            | IncellMessageMap                       |
| ------ | ------ | ------------------------------------- | ---------- | ----------------- | ---------------------------- | -------------------------------------- |
| uint32 | string | {int32 id,string desc,int32 value}Msg | []int32    | map<int32,string> | []{int32 id,string desc}Elem | map<int32,Value{int32 id,string desc}> |
| 1      | Earth  | 1,desc,100                            | 1,2,3      | 1:hello,2:world   | {1,hello},{2,world}          | 1:{1,hello},2:{2,world}                |

{{< /sheet >}}

#### IncellMessage

语法：*TODO: EBNF*
类型：message 类型
值：逗号分隔的字段值，例如：`1,desc,100`

#### IncellList

语法：`[]Type`
类型：任意标量类型
值：逗号分隔的列表元素，例如：`1,2,3`

#### IncellMap

语法：`map<Type,Type>`
类型：任意标量类型
值：逗号分隔的 key-value 对，key 和 value 用冒号分隔，例如：`1:hello,2:world`

#### IncellMessageList

TODO...

#### IncellMessageMap

TODO...

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

    // default name: field + <tagid>
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

## Protoconf -> Workbook

TODO...
