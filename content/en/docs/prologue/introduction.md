---
title: "Introduction"
description: "Intro to Tableau."
lead: "Tableau is a modern configuration converter powered by <a href='https://developers.google.com/protocol-buffers/docs/proto3'>Protobuf(proto3)</a>, which can convert <b>Excel/CSV/XML</b> to multiple formats: <a href='https://developers.google.com/protocol-buffers/docs/proto3#json'><b>JSON(protojson)</b></a>, <a href='https://pkg.go.dev/google.golang.org/protobuf/encoding/prototext'><b>Text(prototext)</b></a>, and <a href='https://pkg.go.dev/google.golang.org/protobuf/encoding/protowire'><b>Wire(protowire)</b></a>."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
weight: 110
toc: true
mermaid: true
---

## Get started

### tableauc (protogen)

The `tableauc` is the tableau compiler with **protogen** inside, which can convert **Excel/CSV/XML** files to **Protoconf** files.
**Protoconf** is a dialect of [Protocol Buffers (proto3)](https://developers.google.com/protocol-buffers/docs/proto3) extended with [tableau options](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto), aimed to define the structure of Excel/CSV/XML.

```mermaid
flowchart LR
  subgraph Input
    direction RL
    I1(Excel)
    I2(CSV)
    I3(XML)
  end
  Input --> B
  B((tableauc)):::orangecalss --> C(Protoconf)
  classDef orangecalss fill:#f96;
```

### confgen

```mermaid
flowchart LR
  A(Protoconf) --> B
  B((confgen)):::orangecalss --> Output
  classDef orangecalss fill:#f96;
  
  subgraph Output
    direction RL
    O1("JSON(protojson)")
    O2("Text(prototext)")
    O3("Wire(protowire)")
  end
```
