---
title: "C++"
description: "C++ 加载器指南。"
lead: "C++ 加载器指南。"
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

获取内部的 protobuf 消息数据。

### Map

`const MapValueType* Get(k1 KEY1, k2 KEY2...) const`

获取第 N 级的映射值。请注意，这仅适用于每个级别消息的**第一个映射字段**。

### OrderedMap

> 前提条件：你需要将元表选项 `OrderedMap` 设置为 `true`。
>
> 请参阅 [元表选项：OrderedMap](../../../excel/metasheet/#option-orderedmap)。

`const OrderedMapValueType* GetOrderedMap(k1 KEY1, k2 KEY2...) const`

获取第 N 级的有序映射值。请注意，这仅适用于每个级别消息的**第一个映射字段**。

### Index

> 前提条件：你需要适当设置元表选项 `Index`。
>
> 请参阅 [元表选项：Index](../../../excel/metasheet/#option-index)。

如果索引名称是 `Chapter`，则访问器如下：

- `const Index_ChapterMap& FindChapter() const`：获取整个哈希映射。
- `const vector<ParentType>* FindChapter(k1 KEY1, k2 KEY2...) const`：通过键查找值。一个键可能对应多个值，这些值通过向量返回。
- `const ParentType* FindFirstChapter(k1 KEY1, k2 KEY2...) const`：通过键查找第一个值。

### OrderedIndex

> 前提条件：你需要适当设置元表选项 `OrderedIndex`。
>
> 请参阅 [元表选项：OrderedIndex](../../../excel/metasheet/#option-orderedindex)。

如果有序索引名称是 `Chapter`，则访问器如下：

- `const OrderedIndex_ChapterMap& FindChapter() const`：获取整个有序映射。
- `const vector<ParentType>* FindChapter(k1 KEY1, k2 KEY2...) const`：通过键查找值。一个键可能对应多个值，这些值通过向量返回。
- `const ParentType* FindFirstChapter(k1 KEY1, k2 KEY2...) const`：通过键查找第一个值。

## 自定义消息器

如果内置 API 不足以满足你的业务逻辑，你可以添加一个自定义消息器，在其中可以基于加载的配置对象编写预处理逻辑。

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
  // TODO: 在此处实现。
  return true;
}
```

## 插件：protoc-gen-cpp-tableau-loader

使用此 protoc 插件的示例：
[cpp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/cpp-tableau-loader/gen.sh)。

## 完整示例

请查看 [cpp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/cpp-tableau-loader)。
