---
title: "Guide"
description: "本指南通过一个简单的工作示例帮助您开始在 Go 中使用 Tableau。"
lead: "本指南通过一个简单的工作示例帮助您开始在 Go 中使用 Tableau。"
date: 2020-11-16T13:59:39+08:00
lastmod: 2020-11-16T13:59:39+08:00
draft: false
images: []
weight: 4101
toc: true
---

## 前置条件

- [Go](https://golang.org/)，Go 的 **三个最新主要** [版本](https://golang.org/doc/devel/release.html) 中的任何一个。
  - 有关安装说明，请参阅 Go 的 [入门指南](https://golang.org/doc/install)。
- [Protocol buffer](https://developers.google.com/protocol-buffers) 编译器 `protoc`，[版本 3](https://developers.google.com/protocol-buffers/docs/proto3)。
  - 有关安装说明，请参阅 [Protocol Buffer 编译器安装](https://grpc.io/docs/protoc-installation/)。
- **Go 插件** 用于协议编译器：
  1. 使用以下命令安装用于 Go 的协议编译器插件：

     ```bash
     go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
     ```

  2. 更新您的 PATH，以便 protoc 编译器可以找到插件：

     ```bash
     export PATH="$PATH:$(go env GOPATH)/bin"
     ```

## 获取示例代码

示例代码是 [tableau/demo](https://github.com/tableauio/demo) 仓库的一部分。

1. [将仓库下载为 zip 文件](https://github.com/tableauio/demo/archive/refs/heads/master.zip) 并解压缩，或者克隆仓库：

   ```bash
   git clone https://github.com/tableauio/demo
   ```

2. 切换到快速入门示例目录：

   ```bash
   cd demo/examples/helloworld
   ```

## 运行示例

从 `examples/helloworld` 目录：

1. 切换到 **excel2proto** 目录，编译并执行：

   ```bash
   go run main.go
   ```

   然后 proto 文件将生成到 `examples/helloworld/proto` 目录。

2. 切换到 **excel2conf** 目录，生成 `*.pb.go` 文件，然后编译并执行：

   ```bash
   bash gen.sh
   go run main.go
   ```

   然后 `*.pb.go` 文件将生成到 `examples/helloworld/protoconf` 目录，JSON 文件将生成到 `examples/helloworld/excel2conf/_out` 目录。

恭喜！您刚刚使用 Tableau 运行了一个现代配置转换应用程序。