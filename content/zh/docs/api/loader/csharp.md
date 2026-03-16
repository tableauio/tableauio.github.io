---
title: "C#"
description: "C# loader 使用指南。"
lead: "C# loader 使用指南。"
date: 2022-03-10T08:00:00+08:00
lastmod: 2026-03-16T08:00:00+08:00
draft: false
images: []
weight: 3240
toc: true
---

## API

### Data

`public ref readonly ProtobufMessage Data()`

获取内部 protobuf message 数据。

### Map

- `public MapValueType? Get1(KEY1 k1)`：获取第 1 层 map 的值。找不到 key 时返回 `null`。
- `public MapValueType? Get2(KEY1 k1, KEY2 k2)`：获取第 2 层 map 的值。找不到 key 时返回 `null`。
- ...

获取第 `N` 层 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### OrderedMap

> 前提条件：需要在 metasheet 中将 `OrderedMap` 选项设置为 `true`。
>
> 参考 [metasheet 选项：OrderedMap](../../../excel/metasheet/#选项-orderedmap)。

- `public ref readonly OrderedMapMap GetOrderedMap()`：获取整个有序 map。
- `public OrderedMapValueType? GetOrderedMap1(KEY1 k1)`：获取第 1 层有序 map 的值。找不到 key 时返回 `null`。
- ...

获取第 `N` 层有序 map 的值。注意：仅适用于每层 message 的**第一个 map 字段**。

### Index

> 前提条件：需要在 metasheet 中适当设置 `Index` 选项。
>
> 参考 [metasheet 选项：Index](../../../excel/metasheet/#选项-index)。

如果 index 名称为 `Chapter`，则访问器为：

- `public ref readonly Index_ChapterMap FindChapterMap()`：获取整个 hash map。
- `public List<ParentType>? FindChapter(KEY1 k1, KEY2 k2...)`：按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。
- `public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)`：按 key 查找第一个值，找不到时返回 `null`。

### OrderedIndex

> 前提条件：需要在 metasheet 中适当设置 `OrderedIndex` 选项。
>
> 参考 [metasheet 选项：OrderedIndex](../../../excel/metasheet/#选项-orderedindex)。

如果有序 index 名称为 `Chapter`，则访问器为：

- `public ref readonly OrderedIndex_ChapterMap FindChapterMap()`：获取整个有序 map。
- `public List<ParentType>? FindChapter(KEY1 k1, KEY2 k2...)`：按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。
- `public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)`：按 key 查找第一个值，找不到时返回 `null`。

## 自定义 messager

如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。

示例：[csharp-tableau-loader/hub/custom](https://github.com/tableauio/loader/tree/master/test/csharp-tableau-loader/src/hub/custom)

**CustomXXXConf.cs**：

```csharp
using Tableau;

public class CustomXXXConf : Messager, IMessagerName
{
    public string Name() => "CustomXXXConf";

    public override bool ProcessAfterLoadAll(Hub hub)
    {
        // TODO: 在此实现。
        return true;
    }

    // TODO: 添加自定义数据字段。
}
```

在初始化代码中注册：

```csharp
Registry.Register<CustomXXXConf>();
```

## 插件：protoc-gen-csharp-tableau-loader

使用此 protoc 插件的示例：
[csharp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/csharp-tableau-loader/gen.sh)。

## 完整示例

参考 [csharp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/csharp-tableau-loader)。
