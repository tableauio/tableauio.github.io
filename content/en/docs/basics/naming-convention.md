---
title: "Naming convention"
description: "Naming convention."
date: 2024-06-22T23:40:00+08:00
lastmod: 2024-06-22T23:40:00+08:00
draft: false
images: []
weight: 8110
toc: true
---

All names of **workbook**, **worksheet**, **column**, and **struct** (message), should use `PascalCase` (with an initial capital) naming convention. So the tableau parser will treat the **worksheet** name as protoconf message name, and auto converts `PascalCase`  to `snake_case` for protobuf [message field names](https://protobuf.dev/programming-guides/style/#message-field-names) and file names, in order to comply with [Protocol Buffers Style Guide](https://protobuf.dev/programming-guides/style).
