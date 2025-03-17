---
title: "Go"
description: "Go loader guide."
lead: "Go loader guide."
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 3230
toc: true
---

## API

### Data

Accessor: `func Data() *ProtobufMessage`

Description: Get the internal protobuf message data.

### Map

Accessor: `func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)`

Description: Get the `N`th-level map value..

### OrderedMap

Accessor: `func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)`

Description: Get the `N`th-level ordered map value.

### Index

If index name is `Chapter`, then the accessers are:

- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`

## Custom messager

You can add custom messager which can proprocess the loaded config objects.

Example: [go-tableau-loader/customconf](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader/customconf)

## Plugin: protoc-gen-go-tableau-loader

An example to use this protoc plugin:
[go-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/go-tableau-loader/gen.sh).

## Full example

See [go-tableau-loader](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader).
