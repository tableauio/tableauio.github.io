---
title: "字段属性"
description: "Tableau 字段属性指南。"
lead: "Tableau 字段属性指南。"
date: 2026-01-09T15:21:01+08:00
lastmod: 2026-01-09T23:21:01+08:00
draft: false
images: []
weight: 7901
toc: true
---

## 概述

| 选项      | 类型   | 描述                                                                                                                                                                |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique`    | bool   | 检查字段唯一性。 <br> 默认值：`false`。特别对于字典（或 KeyedList）键，默认将自动推导。                                                         |
| `range`     | string | 格式：`"left,right"`。例如：`"1,10"`、`"1,~"`、`~,10"`。 <br> 范围的不同解释： <br> - 数字：值范围。 <br> - 字符串：utf-8 码点数。 |
| `refer`     | string | 格式：`"SheetName(SheetAlias).ColumnName"`。<br>确保此字段在另一个工作表的列值空间中。多个引用用逗号分隔。                          |
| `sequence`  | int64  | 确保此字段的值是一个序列并以此值开始。                                                                                                        |
| `default`   | string | 如果单元格为空，则使用此默认值。                                                                                                                                   |
| `fixed`     | bool   | 自动检测水平列表/字典的固定大小。 <br> 默认值：`false`。                                                                                                    |
| `size`      | uint32 | 指定水平列表/字典的固定大小。                                                                                                                                 |
| `form`      | Form   | 指定单元格内结构体的单元格数据形式。<br> - `FORM_TEXT`<br> - `FORM_JSON`                                                                                               |
| `json_name` | string | 指定字段的自定义 JSON 名称，而不是 proto 字段名的 lowerCamelCase 名称。                                                                                       |
| `present`   | bool   | 如果 present 为 true，则必须显式填充单元格数据。 <br> 默认值：`false`。                                                                                                  |
| `optional`  | bool   | 此字段是否为可选的（字段名称存在性）。                                                                                                                     |
| `patch`     | Patch  | 字段修补类型。 <br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                              |
| `sep`       | string | 字段级别分隔符。                                                                                                                                                     |
| `subsep`    | string | 字段级别子分隔符。                                                                                                                                                  |
| `cross`     | int32  | 指定具有基数的复合类型（如列表和字典）的跨节点/单元格/字段的数量。                                                                     |
| `pattern`     | string  | 指定标量、列表元素和字典值的模式。                                                                     |
{.table-striped .table-hover}

## 选项 `unique`

选项 `unique` 可以在字段属性中指定为 `true` 或 `false`。它可以检查列表/字典元素中任何标量字段的唯一性。

- 如果您将 `unique` 显式设置为 `true`，则如果出现重复键，tableau 将报告错误。
- 如果您将 `unique` 显式设置为 `false`，则不会执行检查。

### 字典（或 KeyedList）键

Tableau 将自动推导字典（或 KeyedList）键的 `unique` 为 true 或 false。

**规则是**：如果字典的值类型（或 KeyedList 元素类型）没有相同布局（垂直/水平）的子字典/列表字段，则键必须是唯一的。

因此，在大多数情况下，没有必要显式配置它。

### 一般标量字段

如果您将一般标量字段的属性 `unique` 指定为 true，则 tableau 将检查字典或列表中字段的唯一性。

## 选项 `range`

{{< alert icon="⚠️️" context="warning" text="如果单元格数据为空（不存在），则不会应用此检查选项。因此，如果您仍然想检查即使单元格数据为空，则应该将选项 `present` 设置为 true。" />}}

选项 `range` 可以指定为格式：`"left,right"`（左右都包含在内）。

`range` 的不同解释：

- [x] **数字**：值范围，例如：`"1,10"`、`"1,~"`、`~,10"`。
- [ ] **字符串**：utf-8 码点数。
- [ ] **列表**：列表长度。
- [ ] **字典**：字典长度。

## 选项 `refer`

选项 `refer` 类似于 SQL 中的**外键**约束，以防止破坏表之间链接的操作。但是，tableau `refer` 可以引用任何工作表的列，即使它不是字典键列，并且**多个引用**（逗号分隔）也受支持。它用于确保此字段至少在其他工作表的列值空间（即消息的字段值空间）中。

格式：`"SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]..."`。

例如：

- `map<uint32, Reward>|{refer:"ItemConf.ID"}`：不带别名的单引用，因此**工作表名称**只是生成的 protobuf 消息名称。
- `map<uint32, Reward>|{refer:"ItemConf.ID,EquipConf.ID"}`：不带别名的多引用，因此**工作表别名**是生成的 protobuf 消息名称。
- `map<uint32, Reward>|{refer:"Sheet1(ItemConf).ID"}`：带别名的单引用，因此**工作表别名**是生成的 protobuf 消息名称。

## 选项 `sequence`

选项 `sequence` 用于确保此字段的值是一个序列并以此值开始。

它甚至可以用于嵌套列表/字典中的任何字段。

例如：

- `map<uint32, Item>|{sequence:1}`：此字典键必须遵循以值 `1` 开始的序列规则。
- `int32|{sequence:1}`：父列表/字典元素必须遵循以值 `1` 开始的序列规则。

## 选项 `default`

如果设置了选项 `default`，则在单元格为空时使用它作为默认值。

## 选项 `fixed`

如果将选项 `fixed` 设置为 `true`，则自动检测水平列表/字典的固定大小。

例如：

- [列表：隐式固定大小 →]({{< relref "list/#implicit-fixed-size" >}})
- [字典：隐式固定大小 →]({{< relref "map/#implicit-fixed-size" >}})

## 选项 `size`

选项 `size` 用于指定水平列表/字典的固定大小。

例如：

- [列表：显式固定大小 →]({{< relref "list/#explicit-fixed-size" >}})
- [字典：显式固定大小 →]({{< relref "map/#explicit-fixed-size" >}})

## 选项 `form`

选项 `form` 用于指定单元格内结构体的单元格数据形式。

可以指定两种形式：

- `FORM_TEXT`：protobuf [文本格式](https://developers.google.com/protocol-buffers/docs/text-format-spec)。
- `FORM_JSON`：protobuf [JSON 格式](https://developers.google.com/protocol-buffers/docs/proto3#json)。

有关详细演示，请参阅 [高级预定义单元格内结构体 →]({{< relref "struct/#advanced-predefined-incell-struct" >}})。

## 选项 `json_name`
默认情况下，JSON 名称通过将字段的 proto 名称转换为 camelCase 来推导。现在您可以
通过 `json_name` 属性选项显式指定它。

例如，`HelloWorld.xlsx` 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID               | Rarity_1                      | SpecialEffect_2                      |
| ---------------- | ----------------------------- | ------------------------------------ |
| map<int32, Item> | int32\|{json_name:"rarity_1"} | int32\|{json_name:"specialEffect_2"} |
| Item's ID        | Item's rarity.                | Item's special effect.               |
| 1                | 10                            | 101                                  |
| 2                | 20                            | 102                                  |
| 3                | 30                            | 103                                  |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

## 选项 `present`

如果选项 `present` 设置为 `true`，则单元格数据不能为空并且必须显式填充。
否则将报告错误。

## 选项 `optional`

指定此字段是否为可选的（字段名称存在性）。

如果设置为 true，则：
- 表格式（Excel/CSV）：字段的列可以不存在。
- 文档格式（XML/YAML）：字段的名称可以不存在。

## 选项 `patch`

请参阅字段级别修补 [选项修补 →]({{< relref "metasheet/#option-patch" >}})。

## 选项 `sep`

**字段级别**分隔符，用于分隔：
- 单元格内列表元素（标量或结构体）。
- 单元格内字典项。

如果未设置，它将使用 [元数据表](../metasheet/#option-sep) 中的**工作表级别** seq。

## 选项 `subsep`

**字段级别**子分隔符，用于分隔：
- 每个单元格内字典项的键值对。
- 每个单元格内结构体列表元素的结构体字段。

如果未设置，它将使用 [元数据表](../metasheet/#option-subsep) 中的**工作表级别** subseq。

## 选项 `cross`

指定具有基数的复合类型（如列表和字典）的跨节点/单元格/字段的数量。

### 联合列表字段

> 待办事项：示例说明。

指定联合列表字段将交叉并占用
（每个列表元素一个字段）。它还将更改此列表
字段的布局从单元格内到水平。
- 值 0 表示它是一个单元格内列表。
- 值 > 0 表示它是一个水平列表，占用 N 个字段。
- 值 < 0 表示它是一个水平列表，占用所有后续字段。

## 选项 `pattern`

指定标量字段、列表元素和字典值的模式。

### 知名版本字段

> 用法请参阅 [Excel 知名类型：版本 →]({{< relref "../excel/wellknown-types/#version" >}})

指定当前单元格的点十进制模式。每个十进制
数字范围从 0 到模式的对应部分（MAX）。

默认模式：`255.255.255`。
