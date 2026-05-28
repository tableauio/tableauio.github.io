---
title: "疑难解答"
description: "常见问题的解决方案。"
lead: "常见问题的解决方案。"
date: 2020-11-12T15:22:20+01:00
lastmod: 2026-05-14T15:22:20+08:00
draft: false
images: []
weight: 1002
toc: true
---

## 错误码索引

`tableauc` 报错时，错误信息都会带有稳定的错误码（如 `E2023`）。本页按照组件
分类列出常见错误码，并说明排查方向。

| 区间           | 组件                                 |
| -------------- | ------------------------------------ |
| `E0001..E0999` | common（工作簿/工作表/列等基础检查） |
| `E1000..E1999` | protogen（proto 生成）               |
| `E2000..E2999` | confgen（配置解析与校验）            |
| `E3000..E3999` | importer（工作簿发现与读取）         |

### Common（E0xxx）

#### E0001：sheet not found in book

`tableau.worksheet.name` 或工作表指示器 `Book#Sheet` 所指定的工作表在工作簿
中不存在。请确认工作簿文件、工作表名（区分大小写）。

#### E0002：cannot unmarshal file content to given proto.Message

文件内容无法解析为目标 message。请确认文件格式（JSON/Text/Bin）与
`conf.output.formats` 配置一致，并且 proto schema 已更新。

#### E0003：列名重复

同一行中存在两列被生成出相同的列名。请重命名其中一列以保证唯一性。

### Confgen（E2xxx）

#### E2000：整数溢出

单元格值超出目标整数类型（如 `uint32`）的可表示范围。请改用更宽的类型或调整值。

#### E2001：字段属性 `refer` 配置不正确

`refer:"SheetName(SheetAlias).ColumnName"` 无法解析到任何已知工作表。
若使用 sheet 别名，请确保别名与生成的 message 名一致。

#### E2002：字段值不在引用的值空间中

单元格值不在被引用列的值空间内。请确保被引用工作表在引用方之前完成生成。

#### E2003：非法的序列号

值不满足 `prop:{sequence:N}`。序列必须从 `N` 开始，按 1 单调递增。

#### E2004：值超出范围

值违反 `prop:{range:"left,right"}`。两端均为闭区间。

#### E2005：map key 不唯一 {#e2005-map-key-不唯一}

映射出现了重复的键。请删除重复行/列；若是有意通过同一键进行行/列合并，
请确保所有被合并的行/列在非集合字段上取值一致（参见
[E2023](#e2023-字段值跨行或列冲突)），或对集合字段使用
[`prop:{aggregate:true}`]({{< relref "../excel/field-property/#选项-aggregate" >}})
进行跨行/跨列聚合（此时父映射的键字段还需配 `prop:{unique:false}`）。

> 注：键控列表元素重复改由 [E2028](#e2028-keyed-list-元素重复) 报出。

#### E2006：枚举值未在枚举类型中定义

单元格值既不是已定义的枚举数值、名称，也不是别名。请补全枚举定义或修正单元格值。

#### E2007：日期时间(datetime)格式无效

请使用 `yyyy-MM-dd HH:mm:ss` 或 RFC3339，如 `2020-01-01 01:00:00`、
`2020-01-01T01:00:00+08:00`。

#### E2008：时间段(duration)格式无效

请使用 Go duration 格式，如 `72h3m0.5s`。

#### E2009：合表时不同 sheet 出现重复 key

合表时不同工作表不允许配置相同键。

#### E2010：union 类型缺少对应的 value 字段

联合体类型值找不到对应 field number 的 value 字段，请将 value 字段绑定到该联合体
类型。

#### E2011：present 字段未显式填写

`prop:{present:true}` 要求单元格必须显式填写。

#### E2012：数值语法不合法

单元格无法按声明的数值类型解析。请检查多余字符、千分位分隔符或空单元格。

#### E2013：布尔值语法不合法

可用值：`1, t, T, TRUE, true, True, 0, f, F, FALSE, false, False`。

#### E2014：未找到工作表的列

工作表缺少必需的列。请补齐该列；若 schema 允许缺失，可设置 `prop:{optional:true}`。

#### E2015：未找到引用的列

`refer` 指定的列在被引用工作表中不存在。

#### E2016：list 元素未连续出现

水平列表一旦出现首个空元素，后续所有元素也必须为空。请将数据紧凑排列或补齐。

#### E2017：map 包含多个空 key

映射不允许多个空键。如确需多个零值键，请显式填充。

#### E2018：map key 字段缺失

映射元素缺少键子字段，请补齐键列/单元格。

#### E2019：分数模式无效

支持的形式：`0.5`、`5`、`5/6`、`10%`、`10‰`、`10‱`。

#### E2020：比较式模式无效

支持的形式：`==5`、`!=5`、`<3/5`、`<=10%`、`>10‰`、`>=10‱`。

#### E2021：枚举值别名重复

同一枚举类型中出现重复的别名，请保证别名在枚举内唯一。

#### E2022：map value 或 list element 子字段值不唯一

被标记 `prop:{unique:true}` 的标量子字段在映射值/列表元素中
出现了重复值。

#### E2023：字段值跨行或列冲突 {#e2023-字段值跨行或列冲突}

当同一父记录被多行（垂直）或多列（水平）重复访问时，tableau 默认要求所有
**非集合**字段（标量/结构体/联合体）以及未开启聚合的列表/映射字段在每次访问中
取值**完全一致**。两种解决方法：

1. 修改数据，让所有被合并的行/列在该字段上保持一致；或
2. 若该字段本意就是跨行/跨列**累加**的列表/映射（无论是 `LAYOUT_INCELL` 还是
   `LAYOUT_HORIZONTAL`），请设置
   [`prop:{aggregate:true}`]({{< relref "../excel/field-property/#选项-aggregate" >}})。

#### E2024：版本号模式无效

版本号必须为点分十进制：`<MAJOR>.<MINOR>.<PATCH>[.<OTHER>]...`。

#### E2025：版本号与模式不匹配

输入版本号不符合配置的模式，或某段超出位上限。

#### E2026：值序非法 {#e2026-值序非法}

值序违反 `prop:{order:...}`（`ORDER_ASC`、`ORDER_DESC`、`ORDER_STRICTLY_ASC`、
`ORDER_STRICTLY_DESC`）。

#### E2027：protovalidate 校验失败

[protovalidate](https://github.com/bufbuild/protovalidate) 的 `validate` /
`validate_complex` / `validate_message` 规则未通过。错误信息中会附带具体
的违规值和未满足的规则。

#### E2028：keyed-list 元素重复 {#e2028-keyed-list-元素重复}

键控列表（`[]<T>` 语法，会自动设置字段 `key`）出现了重复元素：

- 标量/枚举键控列表：元素本身即键。
- 结构体键控列表：仅比较通过 `key` 配置的子字段。

触发场景：

- **单元格内**键控列表：单个单元格内出现重复元素。
- **水平/垂直** 键控列表在开启
  [`prop:{aggregate:true}`]({{< relref "../excel/field-property/#选项-aggregate" >}})
  跨行/跨列聚合时，聚合后的元素出现重复。

### Importer（E3xxx）

#### E3000：未匹配到工作簿文件

工作表指示器 `<BookNamePattern>[#SheetNamePattern]` 未匹配到任何文件。请检查
indir 与通配符。

#### E3001：工作簿中无对应工作表

匹配到的工作簿中找不到指定 sheet。

#### E3002：文件打开失败

操作系统层面的文件打开错误（不存在、权限不足、被占用等）。

#### E3003：CSV 工作簿通配符无匹配

CSV 工作簿通配符没有匹配到任何文件。请检查通配符与工作目录。

## 升级 tableauc 配置时遇到的问题

> TODO ...

## 加载器相关问题

> TODO ...
