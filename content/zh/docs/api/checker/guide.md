---
title: "指南"
description: "Go checker 使用指南。"
lead: "Go checker 使用指南。"
date: 2022-03-10T08:00:00+08:00
lastmod: 2022-03-10T08:00:00+08:00
draft: false
images: []
weight: 300
toc: true
---

## 生成脚手架代码

例如，protobuf message `ItemConf` 生成的 `*.check.go` 文件内容如下：

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

## 插件：protoc-gen-go-tableau-checker

使用此 protoc 插件的示例：
[checker/test/gen.sh](https://github.com/tableauio/checker/blob/master/test/gen.sh)。

## 完整示例

参考 [go-tableau-checker](https://github.com/tableauio/checker/blob/master/test)。
