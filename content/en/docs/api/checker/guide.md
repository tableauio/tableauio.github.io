---
title: "Guide"
description: "Go checker guide."
lead: "Go checker guide."
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 300
toc: true
---

## Generate scaffolding code

For example, the generated `*.check.go` of protobuf message `ItemConf` is:

```go
type ItemConf struct {
    tableau.ItemConf
}

func (x *ItemConf) Check(hub *tableau.Hub) error {
    // TODO: implement here.
    return nil
}

func (x *ItemConf) CheckCompatibility(hub, newHub *tableau.Hub) error {
    // TODO: implement here.
    return nil
}

func init() {
    // NOTE: This func is auto-generated. DO NOT EDIT.
    register(func() tableau.Messager {
        return new(ItemConf)
    })
}
```

## Plugin: protoc-gen-go-tableau-checker

An example to use this protoc plugin:
[checker/test/gen.sh](https://github.com/tableauio/checker/blob/master/test/gen.sh).

## Full example

See [go-tableau-checker](https://github.com/tableauio/checker/blob/master/test).
