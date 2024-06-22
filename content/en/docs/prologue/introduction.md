---
title: "Introduction"
description: "Intro to Tableau."
lead: "A modern configuration converter for converting <b>Excel/CSV/XML/YAML</b> to multiple formats: <a href='https://developers.google.com/protocol-buffers/docs/proto3#json'><b>JSON</b></a>, <a href='https://developers.google.com/protocol-buffers/docs/text-format-spec'><b>Text</b></a>, and <a href='https://developers.google.com/protocol-buffers/docs/encoding'><b>Bin</b></a>. Powered by <a href='https://developers.google.com/protocol-buffers/docs/proto3'>Protobuf (proto3).</a>"
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
weight: 9901
toc: true
mermaid: true
---

## tableauc

`tableauc` is the **Tableau Compiler** with **protogen** and **confgen** inside.

### protogen

`protogen` converts **Excel/CSV/XML/YAML** files to **Protoconf** files.
**Protoconf** is a dialect of [Protocol Buffers (proto3)](https://developers.google.com/protocol-buffers/docs/proto3) extended with [tableau options](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto), aimed to define the structure of Excel/CSV/XML/YAML.

```mermaid
flowchart LR
  subgraph Input
    direction RL
    I1(Excel)
    I2(CSV)
    I3(XML)
    I4(YAML)
  end
  Input --> B
  B((protogen)):::orangecalss --> C(Protoconf)
  classDef orangecalss fill:#f96;
```

### confgen

`confgen` converts **Excel/CSV/XML/YAML** with **Protoconf** files to **JSON/Text/Bin** files.

```mermaid
flowchart LR
  subgraph Input
    direction RL
    I1(Excel)
    I2(CSV)
    I3(XML)
    I4(YAML)
  end
  
  Input --> B
  A(Protoconf) --> B
  B((confgen)):::orangecalss --> Output
  classDef orangecalss fill:#f96;
  
  subgraph Output
    direction RL
    O1("JSON")
    O2("Text")
    O3("Bin")
  end
```
