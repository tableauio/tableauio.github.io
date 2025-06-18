---
title: "Wellknown types"
description: "Wellknown types."
lead: "Wellknown types contain common types that are used throughout the Tableau ecosystem."
date: 2024-09-24T15:59:39+08:00
lastmod: 2024-09-24T15:59:39+08:00
draft: false
images: []
weight: 8400
toc: true
---

## Overview

For easy use, Wellknown types are built-in types in Tableau.
This concept is much like [Protocol Buffers Well-Known Types](https://protobuf.dev/reference/protobuf/google.protobuf/).

You should include the proto files provided by Tableau and Protocol Buffers:

- [tableau/protobuf/wellknown.proto](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/wellknown.proto)
- [google/protobuf/timestamp.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto)
- [google/protobuf/duration.proto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/duration.proto)

## Datetime

| Type       | Default               | Description                                                                                             |
| ---------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `datetime` | `0000-00-00 00:00:00` | Format: `yyyy-MM-dd HH:mm:ss` or RFC3339. <br>e.g.: `2020-01-01 05:10:00` or `2020-01-01T05:10:00Z`.    |
| `date`     | `0000-00-00`          | Format: `yyyy-MM-dd` or `yyyyMMdd`. <br>e.g.: `2020-01-01` or `20200101`.                               |
| `time`     | `00:00:00`            | Format: `HH:mm:ss` or `HHmmss`, `HH:mm` or `HHmm`. <br>e.g.: `05:10:00` or `051000`, `05:10` or `0510`. |
{.table-striped}

### Tips

- `datetime` and `date` are based on [**google.protobuf.Timestamp**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).
- `time`  is based on [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).

## Duration

| Type       | Default | Description                                                                                                                                                                                                                                               |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `duration` | `0s`    | Format like: `72h3m0.5s`. <br>A duration string is a possibly signed sequence of decimal numbers, each with optional fraction and a unit suffix, such as `300ms`, `-1.5h` or `2h45m`. <br>Valid time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`. |

### Tips

- `duration` is based on [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).
- [golang duration string form](https://golang.org/pkg/time/#Duration.String).
- [golang ParseDuration](https://pkg.go.dev/time#ParseDuration).

## Fraction

A fraction represents a part of a whole or, more generally, any number of equal parts. See [wiki: Fraction](https://en.wikipedia.org/wiki/Fraction) for more details.

| Type       | Default | Description                                                                                                                                                                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fraction` | `0`     | Format:  <br>- `N%`: percentage, e.g.: `10%` <br>- `N‰`: per thounsand, e.g.: `10‰` <br>- `N‱`: per ten thounsand, e.g.: `10‱`<br>- `N/D`: simple fraction, e.g.: `3/4`<br>- `N`: only numerator, e.g.: `3` is same to `3/1` |

```protobuf
message Fraction {
  int32 num = 1;  // numerator
  int32 den = 2;  // denominator
}
```

## Comparator

A comparator holds a `sign` and a fraction `value`. Any number or fraction can compare with it.

| Type         | Default | Description                                                                             |
| ------------ | ------- | --------------------------------------------------------------------------------------- |
| `comparator` | `==0`   | Format: `<Sign><Fraction>`. <br>e.g.: `==10`, `!=1/2`, `<10%`, `<=10‰`, `>10%`, `>=10‱` |

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

## Version

A version holds a version data with 3 formats: string, value interger and value list. A `pattern` option is required to parse the string into value interger, otherwise the default pattern `255.255.255` will be used.

| Type     | Default | Description                                                                                                                                                                                                                         |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`    | `""`    | Format: `<MAJOR>.<MINOR>.<PATCH>[.<OTHER>]...`. <br>e.g.: `1.0.1`                                                                                                                                                                   |
| `val`    | `0`     | Value interger of the version, see the conversion algorithm [here](https://github.com/tableauio/tableau/commit/444a01ff8c4947a249e8d0ea5c4c8c491cea69d3#diff-fd73b99348b802b948424f1740df144f17b6df75a8ff86316cd858f19fe7f87cR471). |
| `major`  | `0`     | Major version value, the 1st interger value of version string.                                                                                                                                                                      |
| `minor`  | `0`     | Minor version value, the 2nd interger value of version string. Zero if there is no 2nd interger value in pattern.                                                                                                                   |
| `patch`  | `0`     | Patch version value, the 3rd interger value of version string. Zero if there is no 3rd interger value in pattern.                                                                                                                   |
| `others` | `[]`    | Other version values, the 4rd or following interger values of version string. Nil if there is no 4rd or following interger values in pattern.                                                                                       |

```protobuf
message Version {
  string str = 1; // Version in string form.
  uint64 val = 2; // Version in integer form.
  uint32 major = 3; // Major version number.
  uint32 minor = 4; // Minor version number.
  uint32 patch = 5; // Patch version number.
  repeated uint32 others = 6; // Other version numbers, such as build number, resource version, and so on.
}
```
