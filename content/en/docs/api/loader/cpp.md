---
title: "C++"
description: "C++ loader guide."
lead: "C++ loader guide."
date: 2022-03-10T08:00:00+08:00
lastmod: 2026-03-16T08:00:00+08:00
draft: false
images: []
weight: 3220
toc: true
---


## API

### Data

`const ProtobufMessage& Data() const`

Get the internal protobuf message data.

### Map

`const MapValueType* Get(KEY1 k1, KEY2 k2...) const`

Get the `N`th-level map value. Returns `nullptr` if the key is not found. Be aware that only applies to each level message's **first map field**.

### OrderedMap

> Prerequisite: You need to set metasheet option `OrderedMap` to `true`.
>
> See [metatsheet option: OrderedMap](../../../excel/metasheet/#option-orderedmap).

- `const OrderedMapMap* GetOrderedMap() const`: Gets the whole ordered map.
- `const OrderedMapValueType* GetOrderedMap(KEY1 k1) const`: Gets the 2nd-level ordered map value. Returns `nullptr` if the key is not found.

Get the `N`th-level ordered map value. Be aware that only applies to each level message's **first map field**.

### Index

> Prerequisite: You need to set metatsheet option `Index` appropriately.
>
> See [metatsheet option: Index](../../../excel/metasheet/#option-index).

If index name is `Chapter`, then the accessers are:

- `const Index_ChapterMap& FindChapterMap() const`: Gets the whole hash map.
- `const Index_ChapterMap* FindChapterMap(KEY1 k1, KEY2 k2...) const`: Gets the hash map scoped to the upper `N`th-level map specified by the given key(s).
- `const vector<ParentType>* FindChapter(KEY1 k1, KEY2 k2...) const`: Finds values by key. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const`: Finds the first value by key, or `nullptr` if no value found.

### OrderedIndex

> Prerequisite: You need to set metatsheet option `OrderedIndex` appropriately.
>
> See [metatsheet option: OrderedIndex](../../../excel/metasheet/#option-orderedindex).

If ordered index name is `Chapter`, then the accessers are:

- `const OrderedIndex_ChapterMap& FindChapterMap() const`: Gets the whole ordered map.
- `const OrderedIndex_ChapterMap* FindChapterMap(KEY1 k1, KEY2 k2...) const`: Gets the ordered map scoped to the upper `N`th-level map specified by the given key(s).
- `const vector<ParentType>* FindChapter(KEY1 k1, KEY2 k2...) const`: Finds values by key. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const`: Finds the first value by key, or `nullptr` if no value found.

## Custom messager

If the built-in APIs are not sufficient for your business logic, then you
can add a custom messager, where you can write preprocess logic based on
loaded config objects.

Example: [cpp-tableau-loader/hub/custom](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader/src/hub/custom)

**custom_xxx_conf.h**:

```cpp
#pragma once
#include "protoconf/hub.pc.h"
#include "protoconf/xxx_conf.pc.h"
class CustomXXXConf : public tableau::Messager {
 public:
  static const std::string& Name() { return kCustomName; }
  virtual bool Load(const std::filesystem::path&, tableau::Format,
                    std::shared_ptr<const tableau::load::MessagerOptions> options = nullptr) override {
    return true;
  }
  virtual bool ProcessAfterLoadAll(const tableau::Hub& hub) override;

 private:
  static const std::string kCustomName;
  // TODO: add custom data fields.
};
```

**custom_xxx_conf.cpp**:

```cpp
#include "hub/custom/xxx/custom_xxx_conf.h"

const std::string CustomXXXConf::kCustomName = "CustomXXXConf";

bool CustomXXXConf::ProcessAfterLoadAll(const tableau::Hub& hub) {
  // TODO: implement here.
  return true;
}
```

## Plugin: protoc-gen-cpp-tableau-loader

An example to use this protoc plugin:
[cpp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/cpp-tableau-loader/gen.sh).

## Full example

See [cpp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader).
