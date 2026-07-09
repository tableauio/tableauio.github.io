---
title: "字段属性（Field property）"
description: "字段属性使用指南。"
lead: "字段属性以 |{...} 语法（protobuf text format）附加在字段类型上，用于设置字段级的校验与约束选项，如 range、refer、unique、sequence 等。"
date: 2020-10-13T15:21:01+02:00
lastmod: 2022-08-24T23:21:01+02:00
draft: false
images: []
weight: 7901
toc: true
---

## 概览

字段属性以管道符 `|` 紧接在字段类型之后，再加一个 `{}` 块，块内为 [protobuf text format](https://protobuf.dev/reference/protobuf/textformat-spec/)（文本格式）内容，由若干以空白分隔的 `选项:值` 对组成：

```text
FieldType|{option1:value1 option2:value2}
```

字符串值需要加引号（`"1,10"`）；数值与布尔值不需要（`1`、`true`）。注意 `"1,10"` 中引号内的逗号属于值本身，并非选项之间的分隔符。

例如：

- `int32|{range:"1,10"}`：带值范围限制的标量字段。
- `map<uint32, Item>|{sequence:1}`：键必须从 `1` 开始成序列的映射字段。
- `string|{json_name:"rarity_1"}`：带自定义 JSON 名称的字符串字段。
- `int32|{range:"1,10" unique:true}`：在单个字段上同时指定多个选项。

可用选项见下表。

| 选项               | 类型   | 说明                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unique`           | bool   | 检查字段唯一性。<br> 默认值：`false`。对于映射（或键控列表）的键，默认值会自动推断。                                                                                                                                                                                                                                                                      |
| `range`            | string | 格式：`"left,right"`。例如：`"1,10"`、`"1,~"`、`"~,10"`。<br> range 的不同含义：<br> - 数字：值范围。<br> - 字符串：UTF-8 码点数量。                                                                                                                                                                                                                      |
| `refer`            | string | 格式：`"SheetName(SheetAlias).ColumnName"`。<br>确保该字段的值在另一个工作表的列值空间中。多个 refer 用逗号分隔。                                                                                                                                                                                                                                         |
| `sequence`         | int64  | 确保该字段的值是一个从指定值开始的序列。                                                                                                                                                                                                                                                                                                                  |
| `default`          | string | 如果单元格为空，则使用此默认值。                                                                                                                                                                                                                                                                                                                          |
| `fixed`            | bool   | 自动检测水平列表/映射的固定大小。<br> 默认值：`false`。                                                                                                                                                                                                                                                                                                   |
| `size`             | uint32 | 指定水平列表/映射的固定大小。                                                                                                                                                                                                                                                                                                                             |
| `form`             | Form   | 指定单元格内结构体的单元格数据格式。<br> - `FORM_TEXT`<br> - `FORM_JSON`                                                                                                                                                                                                                                                                                  |
| `json_name`        | string | 指定字段的自定义 JSON 名称，替代 proto 字段名的 lowerCamelCase 形式。                                                                                                                                                                                                                                                                                     |
| `present`          | bool   | 如果 present 为 true，则必须显式填写单元格数据。<br> 默认值：`false`。                                                                                                                                                                                                                                                                                    |
| `optional`         | bool   | 该字段是否为可选（字段名可缺失）。                                                                                                                                                                                                                                                                                                                        |
| `patch`            | Patch  | 字段 patch 类型。<br> - `PATCH_REPLACE` <br> - `PATCH_MERGE`                                                                                                                                                                                                                                                                                              |
| `sep`              | string | 字段级分隔符。                                                                                                                                                                                                                                                                                                                                            |
| `subsep`           | string | 字段级子分隔符。                                                                                                                                                                                                                                                                                                                                          |
| `pattern`          | string | 指定标量、列表元素和映射值的模式。                                                                                                                                                                                                                                                                                                                        |
| `order`            | Order  | 确保字段的值按行/列/元素方向有序。<br> - `ORDER_ASC`（`>=`）<br> - `ORDER_DESC`（`<=`）<br> - `ORDER_STRICTLY_ASC`（`>`）<br> - `ORDER_STRICTLY_DESC`（`<`）                                                                                                                                                                                              |
| `validate`         | string | 适用于标量和知名类型的 [protovalidate](https://github.com/bufbuild/protovalidate) 字段级校验规则。<br>例如：`"string:{max_len:10}"`、`"int32:{gt:0 lte:100}"`、`"cel_expression:\"this >= timestamp('2024-01-01T00:00:00Z')\""`。                                                                                                                         |
| `validate_complex` | string | 适用于复合类型（列表/映射）的 [protovalidate](https://github.com/bufbuild/protovalidate) 字段级校验规则。<br>例如：`"repeated:{min_items:1}"`、`"map:{min_pairs:1}"`。                                                                                                                                                                                    |
| `validate_message` | string | 适用于字段所嵌套结构体的 [protovalidate](https://github.com/bufbuild/protovalidate) message 级校验规则。<br>例如：`"cel_expression:\"this.start_time < this.end_time\""`。                                                                                                                                                                                |
| `aggregate`        | bool   | 适用于**单元格内**或**水平**的列表/映射字段。若为 `true`，当同一父记录被多行/多列重复访问时（如垂直映射/键控列表多行键相同、垂直列表跨多行、水平映射/列表跨多列等），会将每次访问产生的元素聚合到同一个集合中；若为 `false`，则要求所有行/列对该字段填写相同值，否则报 [E2023](../help/troubleshooting/#e2023-字段值跨行或列冲突)。<br> 默认值：`false`。 |
{.table-striped .table-hover}

## 选项 `unique`

选项 `unique` 可在字段属性中指定为 `true` 或 `false`，用于检查列表/映射元素中任意标量字段的唯一性。

- 如果显式设置 `unique` 为 `true`，当出现重复值时 tableau 会报错。
- 如果显式设置 `unique` 为 `false`，则不进行检查。

### 映射/键控列表的键

Tableau 会自动推断映射（或键控列表）键的 `unique` 是否为 true。

**规则是**：如果映射的值类型（或键控列表元素类型）没有相同布局（垂直/水平）的子映射/列表字段，则键必须唯一。

因此大多数情况下不需要显式配置。

### 通用标量字段

如果将通用标量字段的属性 `unique` 指定为 true，则 tableau 会检查该字段在映射或列表中的唯一性。

## 选项 `range`

> [!WARNING]
> 当单元格数据为空（未填写）时，此检查将被跳过。若需对空单元格也强制执行检查，请将选项 `present` 设置为 `true`。

选项 `range` 的格式为：`"left,right"`（左右均为闭区间）。

`range` 的不同含义：

- [x] **数字**：值范围，例如：`"1,10"`、`"1,~"`、`"~,10"`。

## 选项 `refer`

选项 `refer` 类似于 SQL 中的**外键（FOREIGN KEY）**约束，用于防止破坏表之间关联的操作。但 tableau 的 `refer` 可以引用任意工作表的列（不限于 map key 列），并且支持**多个 refer**（逗号分隔）。它用于确保该字段的值至少在其他某个工作表的列值空间（即 message 的字段值空间）中存在。

格式：`"SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]..."`。

示例：

- `map<uint32, Reward>|{refer:"ItemConf.ID"}`：无别名的单 refer，**工作表名**即为生成的 protobuf message 名。
- `map<uint32, Reward>|{refer:"ItemConf.ID,EquipConf.ID"}`：无别名的多 refer，**工作表别名**即为生成的 protobuf message 名。
- `map<uint32, Reward>|{refer:"Sheet1(ItemConf).ID"}`：有别名的单 refer，**工作表别名**即为生成的 protobuf message 名。

## 选项 `sequence`

选项 `sequence` 用于确保该字段的值是一个从指定值开始的序列，可用于任意字段，包括嵌套列表/映射中的字段。

示例：

- `map<uint32, Item>|{sequence:1}`：该映射键必须遵循从值 `1` 开始的序列规则。
- `int32|{sequence:1}`：父级列表/映射的元素必须遵循从值 `1` 开始的序列规则。

## 选项 `default`

如果设置了选项 `default`，则当单元格为空时使用该值作为默认值。

## 选项 `fixed`

如果将选项 `fixed` 设置为 `true`，则自动检测水平列表/映射的固定大小。

示例：

- [列表: 隐式固定大小]({{< relref "list/#implicit-fixed-size" >}})
- [映射: 隐式固定大小]({{< relref "map/#implicit-fixed-size" >}})

## 选项 `size`

选项 `size` 用于指定水平列表/映射的固定大小。

示例：

- [列表: 显式固定大小]({{< relref "list/#explicit-fixed-size" >}})
- [映射: 显式固定大小]({{< relref "map/#explicit-fixed-size" >}})

## 选项 `form`

选项 `form` 用于指定 incell struct 的单元格数据格式。

可指定两种格式：

- `FORM_TEXT`：protobuf [text format](https://developers.google.com/protocol-buffers/docs/text-format-spec)。
- `FORM_JSON`：protobuf [JSON format](https://developers.google.com/protocol-buffers/docs/proto3#json)。

详细示例请参考 [高级预定义单元格内结构体]({{< relref "struct/#advanced-predefined-incell-struct" >}})。

## 选项 `json_name`

默认情况下，JSON 名称由字段的 proto 名称转换为 camelCase 得到。现在可以通过 `json_name` 选项显式指定。

例如，*HelloWorld.xlsx* 中的工作表 `ItemConf`：

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

参见 [选项 Patch]({{< relref "metasheet/#选项-patch" >}}) 中的字段级 patch。

## 选项 `sep`

**字段级**分隔符，用于分隔：

- 单元格内映射的键值对。
- 单元格内列表的元素（标量或结构体）。

如果未设置，将使用 [元表](../metasheet/#选项-sep) 中的**工作表级** sep。

## 选项 `subsep`

**字段级**子分隔符，用于分隔：

- 每个单元格内映射的键和值。
- 每个单元格内结构体列表元素的结构体各字段。

如果未设置，将使用 [元表](../metasheet/#选项-subsep) 中的**工作表级** subsep。

## 选项 `pattern`

指定标量字段、列表元素和映射值的模式。

### 版本号字段

> [!NOTE]
> 使用案例请参考 [知名类型: 版本号]({{< relref "../excel/wellknown-types/#version" >}})

指定当前单元格的点分十进制模式。每个十进制数的范围从 0 到模式对应部分的最大值（MAX）。

默认模式：`255.255.255`。

## 选项 `order`

选项 `order` 用于确保字段的值沿解析方向（垂直布局按行、水平布局按列、单元格内列表/映射按元素顺序）满足指定的次序。
若后一个值相对于前一个值违反了所配置的次序，tableau 会报
[E2026]({{< relref "../help/troubleshooting/#e2026-值序非法" >}})。

支持的次序：

- `ORDER_ASC`：升序，前值必须 `<=` 后值。
- `ORDER_DESC`：降序，前值必须 `>=` 后值。
- `ORDER_STRICTLY_ASC`：严格升序，前值必须 `<` 后值。
- `ORDER_STRICTLY_DESC`：严格降序，前值必须 `>` 后值。

支持的字段类型：

- 数值标量（`int32`/`int64`/`uint32`/`uint64`/`float`/`double` 及其变体）。
- `string`（按字典序）。
- `enum`（按枚举编号比较）。
- 知名类型：[`datetime`（`google.protobuf.Timestamp`）]({{< relref "wellknown-types/#datetime" >}})
  和 [`duration`（`google.protobuf.Duration`）]({{< relref "wellknown-types/#duration" >}})。

示例：

- `map<uint32, Item>|{order:ORDER_ASC}`：映射的键列必须升序。
- `int32|{order:ORDER_STRICTLY_ASC}`：该列各行的值必须严格递增。
- `datetime|{order:ORDER_ASC}`：时间戳必须非递减。

> [!NOTE]
> `order` 与 [`sequence`]({{< relref "#选项-sequence" >}}) 不同：
> `sequence` 要求各值组成从指定起点开始的连续序列（如 `1, 2, 3, ...`），
> 而 `order` 仅约束相邻值之间的相对次序，不限定起点和步长。

## 选项 `validate`

Tableau 集成了 [protovalidate](https://github.com/bufbuild/protovalidate)，
可以直接在表格字段属性中声明校验规则。这些规则会被编译为生成 `.proto` 文件中
字段上的 [`(buf.validate.field)`](https://buf.build/bufbuild/protovalidate)
选项，并在 tableau 生成配置时强制执行。支持 CEL 表达式以及 protovalidate 提供
的标准规则、predefined 规则和自定义（custom）规则。

选项 `validate` 用于指定标量和知名类型（例如 `int32`、
`string`、`bool`、`google.protobuf.Timestamp`、`google.protobuf.Duration` 等）
的**字段级**校验规则。其值为 [`buf.validate.FieldRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.FieldRules)
的 [protobuf text format](https://protobuf.dev/reference/protobuf/textformat-spec/) 表示。

示例：

- `int32|{validate:"int32:{gt:0 lte:100}"}`：值必须在 `(0, 100]` 范围内。
- `string|{validate:"string:{min_len:1 max_len:20}"}`：字符串长度必须在 `[1, 20]` 范围内。
- `uint32|{validate:"uint32:{gt:0}"}`：值必须大于 `0`。
- `datetime|{validate:"timestamp:{lt:{seconds:1893456000}}"}`：时间戳必须早于 `2030-01-01T00:00:00Z`（Unix 秒数 `1893456000`）。
- `datetime|{validate:"cel_expression:\"this >= timestamp('2024-01-01T00:00:00Z')\""}`：自定义 CEL 表达式。
- `int32|{validate:"int32:{[protoconf.is_zero]:true}"}`：使用通过 proto 扩展定义的 [自定义规则](https://buf.build/docs/protovalidate/schemas/custom-rules/)。

> [!WARNING]
> 避免将字段值与当前时间进行比较（例如 `timestamp:{gt_now:true}` /
> `lt_now:true`，或在 CEL 表达式中引用 `now`）。配置是在**构建时**生成并校验的，
> 依赖“当前时间”的规则会因**生成时刻**不同而时而通过、时而失败，导致配置导出
> 不稳定且不可复现。建议使用固定的边界（绝对时间戳），或在同一条记录的多个
> 字段之间施加约束（例如 `start_time < end_time`）。

例如，*HelloWorld.xlsx* 中的工作表 `ItemConf`：

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored >}}

| ID                                            | Name                                               | Score                                    |
| --------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| map<uint32, Item>\|{validate:"uint32:{gt:0}"} | string\|{validate:"string:{min_len:1 max_len:20}"} | int32\|{validate:"int32:{gt:0 lte:100}"} |
| Item ID                                       | Item Name                                          | Item Score                               |
| 1                                             | sword                                              | 80                                       |
| 2                                             | shield                                             | 95                                       |

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
import "buf/validate/validate.proto";

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf"};

  map<uint32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    uint32 id = 1 [(tableau.field) = {name:"ID"}, (buf.validate.field) = {uint32:{gt:0}}];
    string name = 2 [(tableau.field) = {name:"Name"}, (buf.validate.field) = {string:{min_len:1 max_len:20}}];
    int32 score = 3 [(tableau.field) = {name:"Score"}, (buf.validate.field) = {int32:{gt:0 lte:100}}];
  }
}
```

{{< /details >}}

## 选项 `validate_complex`

选项 `validate_complex` 用于指定**复合类型**（即 `列表`/`映射`）的**字段级**校验
规则——即对容器本身（而非其元素）施加的规则。其值为
[`buf.validate.FieldRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.FieldRules)
（`repeated` 或 `map` 字段已设置）的 text format 表示。

示例：

- `map<uint32, Item>|{validate_complex:"map:{min_pairs:1}"}`：映射必须至少包含一个条目。
- `[]string|{validate_complex:"repeated:{min_items:1}"}`：列表必须至少包含一个元素。
- `[]string|{validate_complex:"repeated:{[protoconf.min_items_three]:true}"}`：使用自定义规则。

> [!NOTE]
> `validate` 用于元素/值类型自身的规则，`validate_complex` 用于容器的规则。
> 这两个选项可以在同一个字段上同时使用。

## 选项 `validate_message`

选项 `validate_message` 用于指定**字段所嵌套 message 的 message 级校验规则**。
通常在字段的值类型为子 message（例如结构体、列表元素或映射值的类型）时使用，
用于通过 CEL 表达式对 message 的多个字段进行交叉校验。其值为
[`buf.validate.MessageRules`](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate#buf.validate.MessageRules)
的 text format 表示。

示例：

- `map<uint32, Item>|{validate_message:"cel_expression:\"this.value <= 0 || this.name != ''\""}`：map 中每个 value（`Item`）都必须满足该 CEL 表达式。
- `{Timespan}datetime|{validate_message:"cel_expression:\"this.start_time < this.end_time\""}`：每个 `Timespan` struct 都必须满足 `start_time < end_time`。

CEL 表达式中的 `this` 指代被嵌套的 message 实例。

## 选项 `aggregate`

选项 `aggregate` 作用于**单元格内**（`layout:LAYOUT_INCELL`）或**水平**
（`layout:LAYOUT_HORIZONTAL`）的列表/映射字段。当同一父记录被多行/多列重复
访问时（同一映射键跨行、同一垂直/水平列表跨多行/多列等），`aggregate:true`
会把每次访问产生的元素**聚合**到父记录的同一个集合中，而不要求所有访问填写
完全相同的值。

> [!NOTE]
> 不设置 `aggregate` 时，若父记录被多行/多列重复访问，tableau 会要求所有访问
> 在该字段上填写**完全相同的值**；否则会报
> [E2023]({{< relref "../help/troubleshooting/#e2023-字段值跨行或列冲突" >}})。
> 设置 `aggregate:true` 即可跳过该一致性校验，并将该字段视为真正的跨行/跨列累加器。

### 适用场景

| 父级布局                          | `aggregate` 作用对象                                                       | 重复访问场景            |
| --------------------------------- | -------------------------------------------------------------------------- | ----------------------- |
| 垂直映射/垂直键控列表（多行同键） | 单元格内列表/映射（`LAYOUT_INCELL`）、水平列表/映射（`LAYOUT_HORIZONTAL`） | 多行落到同一父记录      |
| 水平映射（多列同键）              | 单元格内列表/映射、水平列表/映射                                           | 多列落到同一父记录      |
| 垂直/水平列表自身跨多行/多列      | 兄弟单元格内字段在每行/列被重复访问                                        | 多行/多列落到同一父记录 |

### 各类型聚合行为

| 子字段类型                  | `aggregate:true` 行为                              | 错误码                                                                       |
| --------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| 单元格内列表                | 各次访问的元素**追加**到同一列表                   | —                                                                            |
| 单元格内映射                | 各次访问的键值**合并**到同一映射；键重复报错       | [E2005]({{< relref "../help/troubleshooting/#e2005-map-key-不唯一" >}})      |
| 单元格内键控列表（`[]<T>`） | 各次访问的元素**追加**并按键**去重**；元素重复报错 | [E2028]({{< relref "../help/troubleshooting/#e2028-keyed-list-元素重复" >}}) |
| 水平列表                    | 跨行的水平列表元素**追加**到同一列表               | —                                                                            |
| 水平键控列表                | 跨行的元素**追加**并按键**去重**                   | [E2028]({{< relref "../help/troubleshooting/#e2028-keyed-list-元素重复" >}}) |
| 水平映射                    | 跨行的键值**合并**到同一映射；键重复报错           | [E2005]({{< relref "../help/troubleshooting/#e2005-map-key-不唯一" >}})      |

### 垂直聚合

端到端示例参见 **垂直列表（Vertical list）** 中的对应小节：

- [垂直标量列表]({{< relref "list/#垂直标量列表" >}}) —— 跨行聚合的 incell 标量列表。
- [垂直枚举列表]({{< relref "list/#垂直枚举列表" >}}) —— 跨行聚合的 incell 枚举列表。
- [垂直单元格内结构体列表]({{< relref "list/#垂直单元格内结构体列表" >}})
  —— 跨行聚合的 incell 内联结构体列表。
- [垂直单元格内预定义结构体列表]({{< relref "list/#垂直单元格内预定义结构体列表" >}})
  —— 跨行聚合的 incell 预定义结构体列表。

### 水平聚合

端到端示例参见映射嵌套列表/映射嵌套映射中的水平聚合用例：

- [垂直映射嵌套水平聚合列表]({{< relref "list-in-map/#horizontal-aggregate-list-in-vertical-map" >}})
  —— 跨行聚合的水平 list（`LAYOUT_HORIZONTAL`）。
- [垂直映射嵌套水平聚合映射]({{< relref "map-in-map/#horizontal-aggregate-map-in-vertical-map" >}})
  —— 跨行聚合的水平 map（`LAYOUT_HORIZONTAL`）。

### `aggregate` 与 `key` 组合（keyed-list 去重）

当 `aggregate:true` 与键控列表（`[]<T>` 语法，会自动设置字段的 `key`）一同使用时，
tableau 在聚合过程中还会对元素**去重**：

- 标量/枚举键控列表：元素本身就是键——跨行/跨列重复的元素会触发
  [E2028]({{< relref "../help/troubleshooting/#e2028-keyed-list-元素重复" >}})。
- 结构体键控列表：仅比较通过 `key` 配置的子字段。

端到端示例参见 [垂直键控列表]({{< relref "keyedlist/#vertical-keyedlist" >}})
（垂直聚合）以及 [垂直映射嵌套水平聚合列表]({{< relref "list-in-map/#horizontal-aggregate-list-in-vertical-map" >}})（水平聚合）。

### 注意

- `aggregate` 仅在**单元格内**（`layout:LAYOUT_INCELL`）或**水平**
  （`layout:LAYOUT_HORIZONTAL`）的列表/映射字段上生效。
- 父字段键跨行重复时，需要在父字段上同时设置 `prop:{unique:false}`，
  否则会被 [E2005]({{< relref "../help/troubleshooting/#e2005-map-key-不唯一" >}}) 拦截。
- 聚合后，`range`、`refer`、`unique` 等针对单元素的字段属性仍会逐元素生效。
