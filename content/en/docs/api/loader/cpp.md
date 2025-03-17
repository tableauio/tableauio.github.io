---
title: "C++"
description: "C++ loader guide."
lead: "C++ loader guide."
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 3220
toc: true
---


## API

### Data

Accessor: `const ProtobufMessage& Data()`

Description: Get the internal protobuf message data.

### Map

Accessor: `const MapValueType* Get(k1 KEY1, k2 KEY2...) const`

Description: Get the `N`th-level map value.

### OrderedMap

Accessor: `const OrderedMapValueType* GetOrderedMap(k1 KEY1, k2 KEY2...) const`

Description: Get the `N`th-level ordered map value.

### Index

If index name is `Chapter`, then the accessers are:

- `const vector<ParentType>* FindChapter(k1 KEY1, k2 KEY2...) const`
- `const ParentType* FindFirstChapter(k1 KEY1, k2 KEY2...) const`

## Custom messager

You can add custom messager which can proprocess the loaded config objects.

Example: [cpp-tableau-loader/hub/custom](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader/src/hub/custom)

## Plugin: protoc-gen-cpp-tableau-loader

An example to use this protoc plugin:
[cpp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/cpp-tableau-loader/gen.sh).

## Full example

See [cpp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader).
