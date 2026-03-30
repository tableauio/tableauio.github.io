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

`func Data() *ProtobufMessage`

Get the internal protobuf message data.

### Map

`func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)`

Get the `N`th-level map value. Be aware that only applies to each level message's **first map field**.

### OrderedMap

> Prerequisite: You need to set metasheet option `OrderedMap` to `true`.
>
> See [metasheet option: OrderedMap](../../../excel/metasheet/#option-orderedmap).

`func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)`

Get the `N`th-level ordered map value. Be aware that only applies to each level message's **first map field**.

### Index

> Prerequisite: You need to set metasheet option `Index` appropriately.
>
> See [metasheet option: Index](../../../excel/metasheet/#option-index).

If index name is `Chapter`, and the indexed keys are `k1, k2 ...`, then the accessors are:

- `func FindChapterMap() *Index_ChapterMap`: Gets the whole hash map.
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`: Finds values by key. One key may correspond to multiple values, which are returned as a slice.
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`: Finds the first value by key.

If the indexed struct is nested within upper-level map containers, additional APIs are generated for each upper-level map to enable fast scoped lookup. Here `N` denotes the Nth upper-level map (e.g., `1` for the immediate parent map, `2` for the grandparent map, and so on).

- `func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *Index_ChapterMap`: Gets the whole hash map scoped to the specified upper-level map keys.
- `func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType`: Finds values by key within the specified upper-level map. One key may correspond to multiple values, which are returned as a slice.
- `func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType`: Finds the first matching value by key within the specified upper-level map.

### OrderedIndex

> Prerequisite: You need to set metasheet option `OrderedIndex` appropriately.
>
> See [metasheet option: OrderedIndex](../../../excel/metasheet/#option-orderedindex).

If ordered index name is `Chapter`, and the indexed keys are `k1, k2 ...`, then the accessors are:

- `func FindChapterMap() *OrderedIndex_ChapterMap`: Gets the whole ordered map.
- `func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType`: Finds values by key. One key may correspond to multiple values, which are returned as a slice.
- `func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType`: Finds the first value by key.

If the indexed struct is nested within upper-level map containers, additional APIs are generated for each upper-level map to enable fast scoped lookup. Here `N` denotes the Nth upper-level map (e.g., `1` for the immediate parent map, `2` for the grandparent map, and so on).

- `func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *OrderedIndex_ChapterMap`: Gets the whole ordered map scoped to the specified upper-level map keys.
- `func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType`: Finds values by key within the specified upper-level map. One key may correspond to multiple values, which are returned as a slice.
- `func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType`: Finds the first matching value by key within the specified upper-level map.

## Custom messager

If the built-in APIs are not sufficient for your business logic, then you
can add a custom messager, where you can write preprocess logic based on
loaded config objects.

Example: [go-tableau-loader/customconf](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader/customconf)

**custom_xxx_conf.go**:

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

## Plugin: protoc-gen-go-tableau-loader

An example to use this protoc plugin:
[go-tableau-loader/gen.sh](https://github.com/tableauio/loader/blob/master/test/go-tableau-loader/gen.sh).

## Full example

See [go-tableau-loader](https://github.com/tableauio/loader/tree/master/test/go-tableau-loader).
