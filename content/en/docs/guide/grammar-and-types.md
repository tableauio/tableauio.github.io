---
title: "Grammar and types"
description: "Grammar and types."
lead: "This guide discusses Tableau's basic grammar, variable declarations, and data types."
date: 2022-02-26T13:59:39+01:00
lastmod: 2022-02-26T13:59:39+01:00
draft: false
images: []
weight: 1200
toc: true
---

## Overview

Tableau borrows most of its syntax and types from [Protocol Buffers (proto3)](https://developers.google.com/protocol-buffers/docs/proto3) and [Golang](https://go.dev/).

## Scalar types

> Details disccused at [Protocol Buffers Proto3 Scalar](https://developers.google.com/protocol-buffers/docs/proto3#scalar).

| Kind     | Types                                                       | Default             |
|----------|-------------------------------------------------------------|---------------------|
| Numbers  | `int32`, `uint32`<br>`int64`, `uint64`<br>`float`, `double` | `0`<br>`0`<br>`0.0` |
| Booleans | `bool`                                                      | `false`             |
| Strings  | `string`                                                    | `""`                |
| Bytes    | `bytes`                                                     | `""`                |

## Well-known types

### Datetime

| Type       | Default               | Description                                                             |
|------------|-----------------------|-------------------------------------------------------------------------|
| `datetime` | `0000-00-00 00:00:00` | Format: `yyyy-MM-dd HH:mm:ss`, <br>e.g.: `2020-01-01 05:10:00`.         |
| `date`     | `0000-00-00`          | Format: `yyyy-MM-dd` or `yyMMdd`, <br>e.g.: `2020-01-01` or `20200101`. |
| `time`     | `00:00:00`            | Format: `HH:mm:ss` or `HHmmss`, <br>e.g.: `05:10:00` or `051000`.       |
{.table-striped}

#### Tips

- `datetime` and `date` are based on [**google.protobuf.Timestamp**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).
- `time`  is based on [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).

### Duration

| Type       | Default | Description                                                                                                        |
|------------|---------|--------------------------------------------------------------------------------------------------------------------|
| `duration` | `0s`    | Format like: `"72h3m0.5s"`. <br>Refer [golang duration string form](https://golang.org/pkg/time/#Duration.String). |
{.table-striped}

#### Tips

- `duration` is based on [**google.protobuf.Duration**](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration), see [JSON mapping](https://developers.google.com/protocol-buffers/docs/proto3#json).

## Composite types

| Type     | Description                                        |
|----------|----------------------------------------------------|
| `struct` | A struct is mapped to a protobuf **message**.      |
| `list`   | A list is mapped to a protobuf **repeated** field. |
| `map`    | A map is mapped to a protobuf **map** field.       |

### struct

| Feature              | Description                                                                                                                                                                                                                                                                           |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Horizontal layout    | Each scalar field located in one cell.                                                                                                                                                                                                                                                |
| Simple incell struct | Each field must be **scalar** type. <br>It is a comma-separated list of fields. E.g.: `1,test,3.0`. <br>If the data list's size is not same as struct's fields, then fields will be filled in order. Fields not configured will be filled with default values due to its scalar type. |
{.table-striped}

### list

| Feature              | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| Horizontal layout    | This is list's default layout. <br>Element type can be **struct** or **scalar**.              |
| Vertical layout      | List's element type should be **struct**.                                                     |
| Simple incell list   | Element type must be **scalar**. <br>It is a comma-separated list of elements. E.g.: `1,2,3`. |
| Scalable             | Scalable or dynamic list size.                                                                |
| Ignore empty element | Smart recognition of empty element at any position.                                           |
{.table-striped}

### map

| Feature           | Description                                                                                                                    |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Horizontal layout |                                                                                                                                |
| Vertical layout   | This is map's default layout.                                                                                                  |
| Hash map          | Implemented as unordered map or hash map.                                                                                      |
| Ordered map       | Supported by [tableauio/loader](https://github.com/tableauio/loader).<br>- C++                                                 |
| Simple incell map | Both key and value must be **scalar** type. <br>It is a comma-separated list of `key:value` pairs. <br>E.g.: `1:10,2:20,3:30`. |
| Scalable          | Scalable or dynamic map size.                                                                                                  |
| Ignore empty item | Smart recognition of empty item at any position.                                                                               |
{.table-striped}

## Enumeration

| Feature                   | Description                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------|
| Three forms of enum value | 1. Enum value number.<br>2. Enum value name.<br>3. Enum value alias name (with EnumValueOptions specified). |
| Validation                | Auto-check legality of enum values.                                                                         |
{.table-striped}

## Empty value

| Type    | Description                                                                                                                       |
|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| scalar  | Empty scalar will be emplaced with scalar type's default value.                                                                   |
| struct  | Empty struct will not be spawned if all fields are empty.                                                                         |
| list    | Empty list will not be spawned if list's size is 0.<br>Empty struct will not be appended if list's element(struct type) is empty. |
| map     | Empty map will not be spawned if map's size is 0. Empty struct will not be inserted if map's value(struct type) is empty.         |
| nesting | Recursively empty.                                                                                                                |
{.table-striped}
