---
title: "快速开始"
description: "This guide gets you started with Tableau in Go with a simple working example."
lead: "This guide gets you started with Tableau in Go with a simple working example."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 100
toc: true
---

## Prerequisites

- [Go](https://golang.org/), any one of the **three latest major**  [releases of Go](https://golang.org/doc/devel/release.html).
  - For installation instructions, see Go’s [Getting Started](https://golang.org/doc/install) guide.
- [Protocol buffer](https://developers.google.com/protocol-buffers)  compiler,  `protoc`,  [version 3](https://developers.google.com/protocol-buffers/docs/proto3).
  - For installation instructions, see  [Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/).
- **Go plugins** for the protocol compiler:
  1. Install the protocol compiler plugins for Go using the following commands:

     ```bash
     go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
     ```

  2. Update your PATH so that the protoc compiler can find the plugins:

     ```bash
     export PATH="$PATH:$(go env GOPATH)/bin"
     ```

## Get the example code

The example code is part of the [tableau/demo](https://github.com/tableauio/demo) repo.

1. [Download the repo as a zip file](https://github.com/tableauio/demo/archive/refs/heads/master.zip) and unzip it, or clone the repo:

   ```bash
   git clone https://github.com/tableauio/demo
   ```

2. Change to the quick start example directory:

   ```bash
   cd demo/examples/helloworld
   ```

## Run the example

From the `examples/helloworld` directory:

1. Change dir to **excel2proto**, compile and execute:

   ```bash
   go run main.go
   ```

   Then proto files will be generated to `examples/helloworld/proto`.

2. Change dir to **excel2conf**, generate `*.pb.go` and then compile and execute:

   ```bash
   bash gen.sh
   go run main.go
   ```

   Then `*.pb.go` files will be generated to `examples/helloworld/protoconf`, and JSON files will be generated to `examples/helloworld/excel2conf/_out`.

Congratulations! You’ve just run a modern configuration converter application with Tableau.
