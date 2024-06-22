---
title: "简介"
description: "Intro to Tableau."
lead: "Tableau是一款功能强大的现代化配置转换器。基于<a href='https://developers.google.com/protocol-buffers/docs/proto3'>Protobuf (proto3)</a>，它能够将 <b>Excel/CSV/XML/YAML</b> 转换成多种格式：<a href='https://developers.google.com/protocol-buffers/docs/proto3#json'><b>JSON</b></a>，<a href='https://developers.google.com/protocol-buffers/docs/text-format-spec'><b>Text</b></a> 和 <a href='https://developers.google.com/protocol-buffers/docs/encoding'><b>Bin</b></a>。"
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
weight: 110
toc: true
mermaid: true
---

## tableauc

tableau命令行工具 `tableauc` 是 tableau 转换器（tableau converter）的缩写，主要由以下两个转换模块组成：

1. **protogen**：分析 Excel/CSV/XML/YAML 文件，提取文件结构信息，转换为 Protoconf 文件。
2. **confgen**：分析 Excel/CSV/XML/YAML 文件和对应的元信息文件 Protoconf，提取文件数据信息，转换为 JSON/Text/Bin 文件。

### protogen

`protogen` convert **Excel/CSV/XML/YAML** files to **Protoconf** files.
**Protoconf** is a dialect of [Protocol Buffers (proto3)](https://developers.google.com/protocol-buffers/docs/proto3) extended with [tableau options](https://github.com/tableauio/tableau/blob/master/proto/tableau/protobuf/tableau.proto), aimed to define the structure of Excel/CSV/XML/YAML.

```mermaid
flowchart LR
  subgraph Input
    direction RL
    I1(Excel)
    I2(CSV)
    I3(XML)
  end
  Input --> B
  B((protogen)):::orangecalss --> C(Protoconf)
  classDef orangecalss fill:#f96;
```

### confgen

```mermaid
flowchart LR
  subgraph Input
    direction RL
    I1(Excel)
    I2(CSV)
    I3(XML)
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
