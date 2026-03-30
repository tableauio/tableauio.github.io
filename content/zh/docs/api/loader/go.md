---
title: "Go"
description: "Go loader 使用指南。"
lead: "Go loader 使用指南。"
date: 2022-03-10T08:00:00+08:00
lastmod: 2026-03-16T08:00:00+08:00
draft: false
images: []
weight: 3230
toc: true
---

## API

### Data

`func Data() *ProtobufMessage`

获取内部 protobuf message 数据。

### Map

`func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)`

获取第 `N` 层 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### OrderedMap

> 前置条件：需要在 metasheet 中将 `OrderedMap` 选项设置为 `true`。
>
> 参考 [metasheet 选项：OrderedMap](../../../excel/metasheet/#选项-orderedmap)。

`func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)`

获取第 `N` 层有序 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### Index

> 前置条件：需要在 metasheet 中适当设置 `Index` 选项。
>
> 参考 [metasheet 选项：Index](../../../excel/metasheet/#选项-index)。

若 index 名称为 `Chapter`，且被索引的 key 为 `k1, k2 ...`，则访问器为：

- `func FindChapterMap() *Index_ChapterMap`：获取整个 hash map。
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`：按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`：按 key 查找第一个值。

若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 `N` 表示第 N 层上层 map（例如，`1` 表示直接父级 map，`2` 表示祖父级 map，以此类推）。

- `func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *Index_ChapterMap`：获取限定在指定上层 map key 范围内的整个 hash map。
- `func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType`：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。
- `func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType`：在指定上层 map 范围内按 key 查找第一个匹配值。

### OrderedIndex

> 前置条件：需要在 metasheet 中适当设置 `OrderedIndex` 选项。
>
> 参考 [metasheet 选项：OrderedIndex](../../../excel/metasheet/#选项-orderedindex)。

若有序 index 名称为 `Chapter`，且被索引的 key 为 `k1, k2 ...`，则访问器为：

- `func FindChapterMap() *OrderedIndex_ChapterMap`：获取整个有序 map。
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`：按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`：按 key 查找第一个值。

若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 `N` 表示第 N 层上层 map（例如，`1` 表示直接父级 map，`2` 表示祖父级 map，以此类推）。

- `func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *OrderedIndex_ChapterMap`：获取限定在指定上层 map key 范围内的整个有序 map。
- `func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType`：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。
- `func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType`：在指定上层 map 范围内按 key 查找第一个匹配值。

## 自定义 messager

如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。

示例：[go-tableau-loader/customconf](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader/customconf)

**custom_xxx_conf.go**：

```go
type CustomXXXConf struct {
    tableau.UnimplementedMessager
    // TODO: add custom data fields.
}

func (x *CustomItemConf) Name() string {
    return "CustomXXXConf"
}

func (x *CustomItemConf) ProcessAfterLoadAll(hub *tableau.Hub) error {
    // TODO: implement here.
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

参考 [go-tableau-loader](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader)。
