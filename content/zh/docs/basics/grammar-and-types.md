---
title: "语法与类型"
description: "语法与类型。"
lead: "本文介绍 Tableau 的基本语法、变量声明和数据类型。"
date: 2022-02-26T13:59:39+08:00
lastmod: 2022-02-26T13:59:39+08:00
draft: false
images: []
weight: 8200
toc: true
---

## 概述

Tableau 的大部分语法和类型借鉴自 [Protocol Buffers (proto3)](https://developers.google.com/protocol-buffers/docs/proto3) 和 [Golang](https://go.dev/)。

## Scalar types（标量类型）

> 详细说明请参考 [Protocol Buffers Proto3 Scalar](https://developers.google.com/protocol-buffers/docs/proto3#scalar)。

| 类别   | 类型                                                        | 默认值              |
| ------ | ----------------------------------------------------------- | ------------------- |
| 数值   | `int32`, `uint32`<br>`int64`, `uint64`<br>`float`, `double` | `0`<br>`0`<br>`0.0` |
| 布尔值 | `bool`                                                      | `false`             |
| 字符串 | `string`                                                    | `""`                |
| 字节   | `bytes`                                                     | `""`                |
{.table-striped}

## Composite types（复合类型）

| 类型     | 说明                                        |
| -------- | ------------------------------------------- |
| `struct` | struct 映射为 protobuf 的 **message**。     |
| `list`   | list 映射为 protobuf 的 **repeated** 字段。 |
| `map`    | map 映射为 protobuf 的 **map** 字段。       |
{.table-striped}

### Struct（结构体）

| 特性                          | 说明                                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 水平布局（Horizontal layout） | 每个标量字段占一个单元格。                                                                                                                                           |
| 简单 in-cell struct           | 每个字段必须是**标量**类型。<br>以逗号分隔的字段列表，例如：`1,test,3.0`。<br>若数据列表长度与 struct 字段数不一致，则按顺序填充，未配置的字段使用标量类型的默认值。 |
{.table-striped}

### List（列表）

| 特性                          | 说明                                                              |
| ----------------------------- | ----------------------------------------------------------------- |
| 水平布局（Horizontal layout） | list 的默认布局。<br>元素类型可以是 **struct** 或**标量**。       |
| 垂直布局（Vertical layout）   | list 的元素类型应为 **struct**。                                  |
| 简单 in-cell list             | 元素类型必须是**标量**。<br>以逗号分隔的元素列表，例如：`1,2,3`。 |
| 可扩展（Scalable）            | 支持动态大小的 list。                                             |
| 忽略空元素                    | 智能识别任意位置的空元素。                                        |
{.table-striped}

### Map（映射）

| 特性                          | 说明                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| 水平布局（Horizontal layout） |                                                                                                  |
| 垂直布局（Vertical layout）   | map 的默认布局。                                                                                 |
| Hash map                      | 实现为无序 map 或 hash map。                                                                     |
| Ordered map                   | 由 [tableauio/loader](https://github.com/tableauio/loader) 支持。<br>- C++                       |
| 简单 in-cell map              | key 和 value 都必须是**标量**类型。<br>以逗号分隔的 `key:value` 对列表，例如：`1:10,2:20,3:30`。 |
| 可扩展（Scalable）            | 支持动态大小的 map。                                                                             |
| 忽略空条目                    | 智能识别任意位置的空条目。                                                                       |
{.table-striped}

## Enumeration（枚举）

| 特性           | 说明                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| 三种枚举值形式 | 1. 枚举值编号（number）。<br>2. 枚举值名称（name）。<br>3. 枚举值别名（alias，通过 EnumValueOptions 指定）。 |
| 校验           | 自动检查枚举值的合法性。                                                                                     |
{.table-striped}

## Empty value（空值）

| 类型    | 说明                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------- |
| scalar  | 空标量将使用该标量类型的默认值填充。                                                           |
| struct  | 若所有字段均为空，则不会生成该 struct。                                                        |
| list    | 若 list 大小为 0，则不会生成该 list。<br>若 list 的元素（struct 类型）为空，则不会追加该元素。 |
| map     | 若 map 大小为 0，则不会生成该 map。若 map 的 value（struct 类型）为空，则不会插入该条目。      |
| nesting | 递归地判断是否为空。                                                                           |
{.table-striped}
