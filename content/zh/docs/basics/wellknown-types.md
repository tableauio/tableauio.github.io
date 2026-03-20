---
title: "Wellknown types（知名类型）"
description: "Wellknown 类型。"
lead: "Wellknown 类型是 Tableau 生态系统中广泛使用的内置通用类型。"
date: 2024-09-24T15:59:39+08:00
lastmod: 2024-09-24T15:59:39+08:00
draft: false
images: []
weight: 8400
toc: true
---

## 概述

为方便使用，Wellknown 类型是 Tableau 的内置类型，类似于 [Protocol Buffers Well-Known Types](https://protobuf.dev/reference/protobuf/google.protobuf/)。

使用时需要引入 Tableau 和 Protocol Buffers 提供的 proto 文件：

- [tableau/protobuf/wellknown.proto](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/wellknown.proto)
- [google/protobuf/timestamp.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto)
- [google/protobuf/duration.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/duration.proto)

## Datetime（日期时间）

> [!NOTE]
> 使用示例请参考 [Wellknown 类型：Datetime →]({{< relref "../excel/wellknown-types/#datetime日期时间" >}})

| 类型       | 默认值                | 说明                                                                                                        |
| ---------- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `datetime` | `0000-00-00 00:00:00` | 格式：`yyyy-MM-dd HH:mm:ss` 或 RFC3339。<br>例如：`2020-01-01 05:10:00`<br>或 `2020-01-01T05:10:00+08:00`。 |
| `date`     | `0000-00-00`          | 格式：`yyyy-MM-dd` 或 `yyyyMMdd`。<br>例如：`2020-01-01` 或 `20200101`。                                    |
| `time`     | `00:00:00`            | 格式：`HH:mm:ss` 或 `HHmmss`，`HH:mm` 或 `HHmm`。<br>例如：`05:10:00` 或 `051000`，`05:10` 或 `0510`。      |
{.table-striped}

**提示：**

- `datetime` 和 `date` 基于 [**google.protobuf.Timestamp**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp)，参考 [JSON 映射](https://developers.google.com/protocol-buffers/docs/proto3#json)。
- `time` 基于 [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration)，参考 [JSON 映射](https://developers.google.com/protocol-buffers/docs/proto3#json)。
- [RFC 3339: 互联网日期和时间戳](https://datatracker.ietf.org/doc/html/rfc3339)

## Duration（时长）

> [!NOTE]
> 使用示例请参考 [Wellknown 类型：Duration →]({{< relref "../excel/wellknown-types/#duration时长" >}})

| 类型       | 默认值 | 说明                                                                                                                                                                                                 |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `duration` | `0s`   | 格式如：`72h3m0.5s`。<br>duration 字符串是一个可带符号的十进制数序列，每个数可带可选小数和单位后缀，例如 `300ms`、`-1.5h` 或 `2h45m`。<br>有效时间单位：`ns`、`us`（或 `µs`）、`ms`、`s`、`m`、`h`。 |

**提示：**

- `duration` 基于 [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration)，参考 [JSON 映射](https://developers.google.com/protocol-buffers/docs/proto3#json)。
- [golang duration 字符串格式](https://golang.org/pkg/time/#Duration.String)。
- [golang ParseDuration](https://pkg.go.dev/time#ParseDuration)。

## Fraction（分数）

> [!NOTE]
> 使用示例请参考 [Wellknown 类型：Fraction →]({{< relref "../excel/wellknown-types/#fraction分数" >}})

分数表示整体的一部分，或更广泛地说，任意数量的等份。详见 [wiki: Fraction](https://en.wikipedia.org/wiki/Fraction)。

| 类型       | 默认值 | 说明                                                                                                                                                                                                                           |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fraction` | `0`    | 格式：<br>- `N%`：百分比，例如：`10%`<br>- `N‰`：千分比，例如：`10‰`<br>- `N‱`：万分比，例如：`10‱`<br>- `N/D`：简单分数，例如：`3/4`<br>- `N`：仅分子，例如：`3` 等同于 `3/1`<br>- `N`：浮点分子，例如：`0.01` 等同于 `1/100` |

```protobuf
message Fraction {
  int32 num = 1;  // numerator（分子）
  int32 den = 2;  // denominator（分母）
}
```

## Comparator（比较器）

> [!NOTE]
> 使用示例请参考 [Wellknown 类型：Comparator →]({{< relref "../excel/wellknown-types/#comparator比较器" >}})

comparator 包含一个 `sign`（符号）和一个分数 `value`（值），任意数字或分数均可与之比较。

| 类型         | 默认值 | 说明                                                                                  |
| ------------ | ------ | ------------------------------------------------------------------------------------- |
| `comparator` | `==0`  | 格式：`<Sign><Fraction>`。<br>例如：`==10`、`!=1/2`、`<10%`、`<=10‰`、`>10%`、`>=10‱` |

```protobuf
message Comparator {
  Sign sign = 1;
  Fraction value = 2;

  enum Sign {
    SIGN_EQUAL = 0;             // ==
    SIGN_NOT_EQUAL = 1;         // !=
    SIGN_LESS = 2;              // <
    SIGN_LESS_OR_EQUAL = 3;     // <=
    SIGN_GREATER = 4;           // >
    SIGN_GREATER_OR_EQUAL = 5;  // >=
  }
}
```

## Version（版本号）

> [!NOTE]
> 使用示例请参考 [Wellknown 类型：Version →]({{< relref "../excel/wellknown-types/#version版本号" >}})

version 表示[点分十进制表示法](https://en.wikipedia.org/wiki/Dot-decimal_notation)的版本号。
版本格式为：`<MAJOR>.<MINOR>.<PATCH>[.<OTHER>]...`。

version 字段提供三种表示形式以方便使用：

- 字符串版本：`str`
- 整数版本：`val`
- 整数版本各部分：`major`、`minor`、`patch`、`others`

可以通过字段属性 `pattern` 指定版本模式，格式为 `<MAJOR_MAX>.<MINOR_MAX>.<PATCH_MAX>[.<OTHER_MAX>]...`。

- 每个带 "MAX" 后缀的部分表示[点分十进制表示法](https://en.wikipedia.org/wiki/Dot-decimal_notation)中对应部分的最大十进制值。
- 每个 "XXX_MAX+1" 表示该部分在整数中占用的值。
- 通用模式 `<MAJOR_MAX>.<MINOR_MAX>.<PATCH_MAX>` 的整数版本公式为：`MAJOR*(MINOR_MAX+1)*(PATCH_MAX+1) + MINOR*(PATCH_MAX+1) + PATCH`

默认 `pattern` 为：`255.255.255`。

| 类型                                   | 默认值 | 说明                                                         |
| -------------------------------------- | ------ | ------------------------------------------------------------ |
| `version`                              | `""`   | 格式：`<MAJOR>.<MINOR>.<PATCH>`。<br>例如：`1.0.1`           |
| `version\|{pattern:"255.255.255.255"}` | `""`   | 格式：`<MAJOR>.<MINOR>.<PATCH>.<OTHER>`。<br>例如：`1.0.1.1` |

```protobuf
message Version {
  string str = 1;           // 字符串形式的版本号。
  uint64 val = 2;           // 整数形式的版本号。
  uint32 major = 3;         // 主版本号。
  uint32 minor = 4;         // 次版本号。
  uint32 patch = 5;         // 修订版本号。
  repeated uint32 others = 6; // 其他版本号，如构建号、资源版本号等。
}
```
