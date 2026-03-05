---
title: "C++"
description: "C++ loader 使用指南。"
lead: "C++ loader 使用指南。"
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 3220
toc: true
---

## API

### Data

`const ProtobufMessage& Data()`

获取内部 protobuf message 数据。

### Map

`const MapValueType* Get(k1 KEY1, k2 KEY2...) const`

获取第 `N` 层 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### OrderedMap

> 前提条件：需要在 metasheet 中将 `OrderedMap` 选项设置为 `true`。
>
> 参考 [metasheet 选项：OrderedMap](../../../excel/metasheet/#选项-orderedmap)。

`const OrderedMapValueType* GetOrderedMap(k1 KEY1, k2 KEY2...) const`

获取第 `N` 层有序 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### Index

> 前提条件：需要在 metasheet 中适当设置 `Index` 选项。
>
> 参考 [metasheet 选项：Index](../../../excel/metasheet/#选项-index)。

如果 index 名称为 `Chapter`，则访问器为：

- `const Index_ChapterMap& FindChapter() const`：获取整个 hash map。
- `const vector<ParentType>* FindChapter(k1 KEY1, k2 KEY2...) const`：按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。
- `const ParentType* FindFirstChapter(k1 KEY1, k2 KEY2...) const`：按 key 查找第一个值。

### OrderedIndex

> 前提条件：需要在 metasheet 中适当设置 `OrderedIndex` 选项。
>
> 参考 [metasheet 选项：OrderedIndex](../../../excel/metasheet/#选项-orderedindex)。

如果有序 index 名称为 `Chapter`，则访问器为：

- `const OrderedIndex_ChapterMap& FindChapter() const`：获取整个有序 map。
- `const vector<ParentType>* FindChapter(k1 KEY1, k2 KEY2...) const`：按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。
- `const ParentType* FindFirstChapter(k1 KEY1, k2 KEY2...) const`：按 key 查找第一个值。

## 自定义 messager

如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。

示例：[cpp-tableau-loader/hub/custom](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader/src/hub/custom)

**custom_xxx_conf.h**：

```cpp
#pragma once
#include "protoconf/hub.pc.h"
#include "protoconf/xxx_conf.pc.h"
class CustomXXXConf : public tableau::Messager {
 public:
  static const std::string& Name() { return kCustomName; };
  virtual bool Load(const std::string& dir, tableau::Format fmt,
                    const tableau::LoadOptions* options = nullptr) override {
    return true;
  }
  virtual bool ProcessAfterLoadAll(const tableau::Hub& hub) override;

 private:
  static const std::string kCustomName;
  // TODO: 添加自定义数据字段。
};
```

**custom_xxx_conf.cpp**：

```cpp
#include "hub/custom/xxx/custom_xxx_conf.h"

const std::string CustomXXXConf::kCustomName = "CustomXXXConf";

bool CustomItemConf::ProcessAfterLoadAll(const tableau::Hub& hub) {
  // TODO: 在此实现。
  return true;
}
```

## 插件：protoc-gen-cpp-tableau-loader

使用此 protoc 插件的示例：
[cpp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/cpp-tableau-loader/gen.sh)。

## 完整示例

参考 [cpp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader)。
