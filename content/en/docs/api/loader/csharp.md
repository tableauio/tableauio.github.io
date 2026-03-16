---
title: "C#"
description: "C# loader guide."
lead: "C# loader guide."
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

Get the internal protobuf message data.

### Map

- `public MapValueType? Get1(KEY1 k1)`: Gets the 1st-level map value. Returns `null` if the key is not found.
- `public MapValueType? Get2(KEY1 k1, KEY2 k2)`: Gets the 2nd-level map value. Returns `null` if the key is not found.
- ...

Get the `N`th-level map value. Be aware that only applies to each level message's **first map field**.

### OrderedMap

> Prerequisite: You need to set metasheet option `OrderedMap` to `true`.
>
> See [metatsheet option: OrderedMap](../../../excel/metasheet/#option-orderedmap).

- `public ref readonly OrderedMapMap GetOrderedMap()`: Gets the whole ordered map.
- `public OrderedMapValueType? GetOrderedMap1(KEY1 k1)`: Gets the 1st-level ordered map value. Returns `null` if the key is not found.
- ...

Get the `N`th-level ordered map value. Be aware that only applies to each level message's **first map field**.

### Index

> Prerequisite: You need to set metatsheet option `Index` appropriately.
>
> See [metatsheet option: Index](../../../excel/metasheet/#option-index).

If index name is `Chapter`, then the accessers are:

- `public ref readonly Index_ChapterMap FindChapterMap()`: Gets the whole hash map.
- `public List<ParentType>? FindChapter(KEY1 k1, KEY2 k2...)`: Finds values by key. One key may correspond to multiple values, which are returned by a list.
- `public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)`: Finds the first value by key, or `null` if no value found.

### OrderedIndex

> Prerequisite: You need to set metatsheet option `OrderedIndex` appropriately.
>
> See [metatsheet option: OrderedIndex](../../../excel/metasheet/#option-orderedindex).

If ordered index name is `Chapter`, then the accessers are:

- `public ref readonly OrderedIndex_ChapterMap FindChapterMap()`: Gets the whole ordered map.
- `public List<ParentType>? FindChapter(KEY1 k1, KEY2 k2...)`: Finds values by key. One key may correspond to multiple values, which are returned by a list.
- `public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)`: Finds the first value by key, or `null` if no value found.

## Custom messager

If the built-in APIs are not sufficient for your business logic, then you
can add a custom messager, where you can write preprocess logic based on
loaded config objects.

Example: [csharp-tableau-loader/hub/custom](https://github.com/tableauio/loader/tree/master/test/csharp-tableau-loader/src/hub/custom)

**CustomXXXConf.cs**:

```csharp
using Tableau;

public class CustomXXXConf : Messager, IMessagerName
{
    public string Name() => "CustomXXXConf";

    public override bool ProcessAfterLoadAll(Hub hub)
    {
        // TODO: implement here.
        return true;
    }

    // TODO: add custom data fields.
}
```

Register in your initialization code:

```csharp
Registry.Register<CustomXXXConf>();
```

## Plugin: protoc-gen-csharp-tableau-loader

An example to use this protoc plugin:
[csharp-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/csharp-tableau-loader/gen.sh).

## Full example

See [csharp-tableau-loader](https://github.com/tableauio/loader/tree/master/test/csharp-tableau-loader).
