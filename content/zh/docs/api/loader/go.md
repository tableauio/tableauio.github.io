---
title: "Go"
description: "Go 加载器指南。"
lead: "Go 加载器指南。"
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 3230
toc: true
---

## API

### Data

`func Data() *ProtobufMessage`

获取内部的 protobuf 消息数据。

### Map

`func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)`

获取第 N 级的映射值。请注意，这仅适用于每个级别消息的**第一个映射字段**。

### OrderedMap

> 前提条件：你需要将元表选项 `OrderedMap` 设置为 `true`。
>
> 请参阅 [元表选项：OrderedMap](../../../excel/metasheet/#option-orderedmap)。

`func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)`

获取第 N 级的有序映射值。请注意，这仅适用于每个级别消息的**第一个映射字段**。

### Index

> 前提条件：你需要适当设置元表选项 `Index`。
>
> 请参阅 [元表选项：Index](../../../excel/metasheet/#option-index)。

如果索引名称是 `Chapter`，则访问器如下：

- `func FindChapterMap() *Index_ChapterMap`：获取整个哈希映射。
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`：通过键查找值。一个键可能对应多个值，这些值通过切片返回。
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`：通过键查找第一个值。

### OrderedIndex

> 前提条件：你需要适当设置元表选项 `OrderedIndex`。
>
> 请参阅 [元表选项：OrderedIndex](../../../excel/metasheet/#option-orderedindex)。

如果有序索引名称是 `Chapter`，则访问器如下：

- `func FindChapterMap() *OrderedIndex_ChapterMap`：获取整个有序映射。
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`：通过键查找值。一个键可能对应多个值，这些值通过切片返回。
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`：通过键查找第一个值。

## 自定义消息器

如果内置 API 不足以满足你的业务逻辑，你可以添加一个自定义消息器，在其中可以基于加载的配置对象编写预处理逻辑。

示例：[go-tableau-loader/customconf](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader/customconf)

**custom_xxx_conf.go**：

```go
type CustomXXXConf struct {
    tableau.UnimplementedMessager
    // TODO: 添加自定义数据字段。
}

func (x *CustomItemConf) Name() string {
    return "CustomXXXConf"
}

func (x *CustomItemConf) ProcessAfterLoadAll(hub *tableau.Hub) error {
    // TODO: 在此处实现。
    return nil
}

func init() {
    tableau.Register(func() tableau.Messager {
        return new(CustomXXXConf)
    })
}
```

## 插件：protoc-gen-go-tableau-loader

使用此 protoc 插件的示例：
[go-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/go-tableau-loader/gen.sh)。

## 完整示例

请查看 [go-tableau-loader](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader)。
