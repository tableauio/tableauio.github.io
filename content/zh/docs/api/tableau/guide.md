---
title: "指南"
description: "Tableau Go API 使用指南。"
lead: "Tableau Go API 使用指南。"
date: 2020-11-16T13:59:39+08:00
lastmod: 2020-11-16T13:59:39+08:00
draft: false
images: []
weight: 4101
toc: true
---

## 前置条件

- [Go](https://golang.org/)，任意**最新三个主要版本**之一，参考 [Go 发布记录](https://golang.org/doc/devel/release.html)。
  - 安装说明请参考 Go 的 [Getting Started](https://golang.org/doc/install) 指南。
- [Protocol buffer](https://developers.google.com/protocol-buffers) 编译器 `protoc`，[版本 3](https://developers.google.com/protocol-buffers/docs/proto3)。
  - 安装说明请参考 [Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/)。
- 协议编译器的 **Go 插件**：
  1. 使用以下命令安装 Go 的协议编译器插件：

     ```bash
     go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
     ```

  2. 更新 PATH，使 protoc 编译器能找到插件：

     ```bash
     export PATH="$PATH:$(go env GOPATH)/bin"
     ```

## 获取示例代码

示例代码位于 [tableau/demo](https://github.com/tableauio/demo) 仓库。

1. [下载仓库 zip 包](https://github.com/tableauio/demo/archive/refs/heads/master.zip) 并解压，或克隆仓库：

   ```bash
   git clone https://github.com/tableauio/demo
   ```

2. 切换到快速开始示例目录：

   ```bash
   cd demo/examples/helloworld
   ```

## 运行示例

在 `examples/helloworld` 目录下：

1. 切换到 **excel2proto** 目录，编译并执行：

   ```bash
   go run main.go
   ```

   proto 文件将生成到 `examples/helloworld/proto`。

2. 切换到 **excel2conf** 目录，生成 `*.pb.go` 后编译并执行：

   ```bash
   bash gen.sh
   go run main.go
   ```

   `*.pb.go` 文件将生成到 `examples/helloworld/protoconf`，JSON 文件将生成到 `examples/helloworld/excel2conf/_out`。

恭喜！你已经成功运行了一个使用 Tableau 的现代化配置转换应用。
