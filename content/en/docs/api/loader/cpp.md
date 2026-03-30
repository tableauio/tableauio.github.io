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
> See [metasheet option: OrderedMap](../../../excel/metasheet/#option-orderedmap).

- `const OrderedMapMap* GetOrderedMap() const`: Gets the whole ordered map.
- `const OrderedMapValueType* GetOrderedMap(KEY1 k1) const`: Gets the 2nd-level ordered map value. Returns `nullptr` if the key is not found.

Get the `N`th-level ordered map value. Be aware that only applies to each level message's **first map field**.

### Index

> Prerequisite: You need to set metasheet option `Index` appropriately.
>
> See [metasheet option: Index](../../../excel/metasheet/#option-index).

If index name is `Chapter`, then the accessors are:

- `const Index_ChapterMap& FindChapterMap() const`: Gets the whole hash map.
- `const vector<ParentType>* FindChapter(KEY1 k1, KEY2 k2...) const`: Finds values by key. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const`: Finds the first value by key, or `nullptr` if no value found.

If the indexed struct is nested within upper-level map containers, additional APIs are generated for each upper-level map to enable fast scoped lookup. Here `N` denotes the Nth upper-level map (e.g., `1` for the immediate parent map, `2` for the grandparent map, and so on).

- `const Index_ChapterMap* FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...) const`: Gets the whole hash map scoped to the specified upper-level map keys.
- `const vector<ParentType>* FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const`: Finds values by key within the specified upper-level map. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const`: Finds the first matching value by key within the specified upper-level map, or `nullptr` if no value found.

### OrderedIndex

> Prerequisite: You need to set metasheet option `OrderedIndex` appropriately.
>
> See [metasheet option: OrderedIndex](../../../excel/metasheet/#option-orderedindex).

If ordered index name is `Chapter`, then the accessors are:

- `const OrderedIndex_ChapterMap& FindChapterMap() const`: Gets the whole ordered map.
- `const vector<ParentType>* FindChapter(KEY1 k1, KEY2 k2...) const`: Finds values by key. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const`: Finds the first value by key, or `nullptr` if no value found.

If the indexed struct is nested within upper-level map containers, additional APIs are generated for each upper-level map to enable fast scoped lookup. Here `N` denotes the Nth upper-level map (e.g., `1` for the immediate parent map, `2` for the grandparent map, and so on).

- `const OrderedIndex_ChapterMap* FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...) const`: Gets the whole ordered map scoped to the specified upper-level map keys.
- `const vector<ParentType>* FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const`: Finds values by key within the specified upper-level map. One key may correspond to multiple values, which are returned by a vector.
- `const ParentType* FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const`: Finds the first matching value by key within the specified upper-level map, or `nullptr` if no value found.

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
