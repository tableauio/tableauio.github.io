---
title: "Field property"
description: "Tableau field property 使用指南。"
lead: "Tableau field property 使用指南。"
date: 2020-10-13T15:21:01+02:00
lastmod: 2022-08-24T23:21:01+02:00
draft: false
images: []
weight: 7901
toc: true
---

## 概览

| 选项        | 类型   | 说明                                                                                                                                 |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `unique`    | bool   | 检查字段唯一性。<br> 默认值：`false`。对于 map（或 KeyedList）的 key，默认值会自动推断。                                             |
| `range`     | string | 格式：`"left,right"`。例如：`"1,10"`、`"1,~"`、`"~,10"`。<br> range 的不同含义：<br> - 数字：值范围。<br> - 字符串：UTF-8 码点数量。 |
| `refer`     | string | 格式：`"SheetName(SheetAlias).ColumnName"`。<br>确保该字段的值在另一个 sheet 的列值空间中。多个 refer 用逗号分隔。                   |
| `sequence`  | int64  | 确保该字段的值是一个从指定值开始的序列。                                                                                             |
| `default`   | string | 如果单元格为空，则使用此默认值。                                                                                                     |
| `fixed`     | bool   | 自动检测水平 list/map 的固定大小。<br> 默认值：`false`。                                                                             |
| `size`      | uint32 | 指定水平 list/map 的固定大小。                                                                                                       |
| `form`      | Form   | 指定 incell struct 的单元格数据格式。<br> - `FORM_TEXT`<br> - `FORM_JSON`                                                            |
| `json_name` | string | 指定字段的自定义 JSON 名称，替代 proto 字段名的 lowerCamelCase 形式。                                                                |
| `present`   | bool   | 如果 present 为 true，则必须显式填写单元格数据。<br> 默认值：`false`。                                                               |
| `optional`  | bool   | 该字段是否为可选（字段名可缺失）。                                                                                                   |
| `patch`     | Patch  | 字段 patch 类型。<br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                         |
| `sep`       | string | 字段级分隔符。                                                                                                                       |
| `subsep`    | string | 字段级子分隔符。                                                                                                                     |
| `cross`     | int32  | 指定具有基数的复合类型（如 list 和 map）跨越的节点/单元格/字段数量。                                                                 |
| `pattern`   | string | 指定 scalar、list 元素和 map value 的模式。                                                                                          |
{.table-striped .table-hover}

## 选项 `unique`

选项 `unique` 可在 field property 中指定为 `true` 或 `false`，用于检查 list/map 元素中任意 scalar 字段的唯一性。

- 如果显式设置 `unique` 为 `true`，当出现重复 key 时 tableau 会报错。
- 如果显式设置 `unique` 为 `false`，则不进行检查。

### Map（或 KeyedList）的 key

Tableau 会自动推断 map（或 KeyedList）key 的 `unique` 是否为 true。

**规则是**：如果 map 的 value 类型（或 KeyedList 元素类型）没有相同布局（垂直/水平）的子 map/list 字段，则 key 必须唯一。

因此大多数情况下不需要显式配置。

### 通用 scalar 字段

如果将通用 scalar 字段的属性 `unique` 指定为 true，则 tableau 会检查该字段在 map 或 list 中的唯一性。

## 选项 `range`

{{< alert icon="⚠️️" context="warning" text="如果单元格数据为空（未填写），此检查选项将不会生效。如果希望在单元格为空时也进行检查，请将选项 `present` 设置为 true。" />}}

选项 `range` 的格式为：`"left,right"`（左右均为闭区间）。

`range` 的不同含义：

- [x] **数字**：值范围，例如：`"1,10"`、`"1,~"`、`"~,10"`。
- [ ] **字符串**：UTF-8 码点数量。
- [ ] **list**：list 的长度。
- [ ] **map**：map 的长度。

## 选项 `refer`

选项 `refer` 类似于 SQL 中的**外键（FOREIGN KEY）**约束，用于防止破坏表之间关联的操作。但 tableau 的 `refer` 可以引用任意 sheet 的列（不限于 map key 列），并且支持**多个 refer**（逗号分隔）。它用于确保该字段的值至少在其他某个 sheet 的列值空间（即 message 的字段值空间）中存在。

格式：`"SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]..."`。

示例：

- `map<uint32, Reward>|{refer:"ItemConf.ID"}`：无别名的单 refer，**sheet 名**即为生成的 protobuf message 名。
- `map<uint32, Reward>|{refer:"ItemConf.ID,EquipConf.ID"}`：无别名的多 refer，**sheet 别名**即为生成的 protobuf message 名。
- `map<uint32, Reward>|{refer:"Sheet1(ItemConf).ID"}`：有别名的单 refer，**sheet 别名**即为生成的 protobuf message 名。

## 选项 `sequence`

选项 `sequence` 用于确保该字段的值是一个从指定值开始的序列，可用于任意字段，包括嵌套 list/map 中的字段。

示例：

- `map<uint32, Item>|{sequence:1}`：该 map key 必须遵循从值 `1` 开始的序列规则。
- `int32|{sequence:1}`：父级 list/map 的元素必须遵循从值 `1` 开始的序列规则。

## 选项 `default`

如果设置了选项 `default`，则当单元格为空时使用该值作为默认值。

## 选项 `fixed`

如果将选项 `fixed` 设置为 `true`，则自动检测水平 list/map 的固定大小。

示例：

- [List: 隐式固定大小 →]({{< relref "list/#隐式固定大小implicit-fixed-size" >}})
- [Map: 隐式固定大小 →]({{< relref "map/#隐式固定大小implicit-fixed-size" >}})

## 选项 `size`

选项 `size` 用于指定水平 list/map 的固定大小。

示例：

- [List: 显式固定大小 →]({{< relref "list/#显式固定大小explicit-fixed-size" >}})
- [Map: 显式固定大小 →]({{< relref "map/#显式固定大小explicit-fixed-size" >}})

## 选项 `form`

选项 `form` 用于指定 incell struct 的单元格数据格式。

可指定两种格式：

- `FORM_TEXT`：protobuf [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec)。
- `FORM_JSON`：protobuf [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json)。

详细示例请参考 [高级 predefined incell struct →]({{< relref "struct/#advanced-predefined-incell-struct" >}})。

## 选项 `json_name`

默认情况下，JSON 名称由字段的 proto 名称转换为 camelCase 得到。现在可以通过 `json_name` prop 选项显式指定。

例如，*HelloWorld.xlsx* 中的 worksheet `ItemConf`：

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

{{< sheet colored1 >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

## 选项 `present`

如果将选项 `present` 设置为 `true`，则单元格数据不能为空，必须显式填写，否则会报错。

## 选项 `optional`

指定该字段是否为可选（字段名可缺失）。

如果设置为 true，则：

- 表格格式（Excel/CSV）：字段的列可以缺失。
- 文档格式（XML/YAML）：字段名可以缺失。

## 选项 `patch`

参见 [选项 Patch →]({{< relref "metasheet/#选项-patch" >}}) 中的字段级 patch。

## 选项 `sep`

**字段级**分隔符，用于分隔：

- incell list 元素（scalar 或 struct）。
- incell map 条目。

如果未设置，将使用 [metasheet](../metasheet/#选项-sep) 中的**sheet 级** sep。

## 选项 `subsep`

**字段级**子分隔符，用于分隔：

- 每个 incell map 条目的 key-value 对。
- 每个 incell struct list 元素的 struct 字段。

如果未设置，将使用 [metasheet](../metasheet/#选项-subsep) 中的**sheet 级** subsep。

## 选项 `cross`

指定具有基数的复合类型（如 list 和 map）跨越的节点/单元格/字段数量。

### union list 字段

> TODO: 示例待补充。

指定 list 将跨越并占用的 union 字段数量（每个字段对应一个 list 元素）。这也会将该 list 字段的布局从 incell 改为水平。

- 值为 0 表示是 incell list。
- 值 > 0 表示是占用 N 个字段的水平 list。
- 值 < 0 表示是占用所有后续字段的水平 list。

## 选项 `pattern`

指定 scalar 字段、list 元素和 map value 的模式。

### Wellknown version 字段

> 使用案例请参考 [Wellknown types: Version →]({{< relref "../excel/wellknown-types/#version" >}})

指定当前单元格的点分十进制模式。每个十进制数的范围从 0 到模式对应部分的最大值（MAX）。

默认模式：`255.255.255`。
