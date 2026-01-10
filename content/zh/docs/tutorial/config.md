---
title: "Tableauc 配置"
description: "Tableauc 配置详细信息"
lead: ""
date: 2026-01-09T13:59:39+08:00
lastmod: 2026-01-09T13:59:39+08:00
draft: false
images: []
weight: 9801
toc: true
---

## config.yaml

创建一个名为 *config.yaml* 的文件，并将以下配置复制到其中：

```yaml
# locale BCP 47 语言标签：en, zh。
lang: en
# location 表示地理区域中使用的时区偏移量集合。
#  - 如果 name 为 "" 或 "UTC"，LoadLocation 返回 UTC。
#  - 如果 name 为 "Local"，LoadLocation 返回 Local。
#  - 否则，name 被视为对应于 IANA 时区数据库中文件的
#    位置名称，例如 "America/New_York"、"Asia/Shanghai" 等。
#
# 参见 https://go.dev/src/time/zoneinfo_abbrs_windows.go。
locationName: Local
# 配置您的自定义缩写。开箱即用，"ID" -> "id" 已自动配置。
# 例如，如果您配置 K8s -> k8s，那么 PascalCase 中的字段名 "InK8s"
# 将转换为 snake_case "in_k8s" 但不是 "in_k_8_s"。
acronyms: {}
# 日志选项。
log:
  # 日志模式：SIMPLE, FULL。
  mode: SIMPLE
  # 日志级别：DEBUG, INFO, WARN, ERROR。
  level: INFO
  # 日志文件名：如果您想将日志消息写入文件，请设置此项。
  filename: ""
  # 日志输出：CONSOLE, FILE 和 MULTI。
  sink: CONSOLE
# 生成 proto 文件的选项。
proto:
  input:
    # 工作表和工作簿的标题选项。
    header:
      # 工作表中列名定义的确切行号。
      namerow: 1
      # 工作表中列类型定义的确切行号。
      typerow: 2
      # 工作表中列注释的确切行号。
      noterow: 3
      # 工作表中数据开始的行号。
      datarow: 4
      # 单元格中列名定义的行号。
      # 值 0 表示整个单元格。
      nameline: 0
      # 单元格中列类型定义的行号。
      # 值 0 表示整个单元格。
      typeline: 0
      # 单元格中列注释定义的行号。
      # 值 0 表示整个单元格。
      noteline: 0
      # 分隔符，用于分隔：
      #  - 单元格内列表元素（标量或结构体）。
      #  - 单元格内字典项。
      #
      # 默认值：","
      sep: ""
      # 子分隔符，用于分隔：
      #  - 每个单元格内字典项的键值对。
      #  - 每个单元格内结构体列表元素的结构体字段。
      #
      # 默认值：:"
      subsep: ""
    # proto 路径用于搜索在 proto 源文件的 import 语句中引用的依赖项。
    # 如果未提供导入路径，则假定 "."（当前目录）是唯一的导入路径。
    protoPaths: [.]
    # protoFiles 中的枚举和消息可以在 Excel/CSV/XML/YAML 中作为
    # 公共类型使用。
    protoFiles: []
    # 指定要解析的输入文件格式。如果未设置，它将识别所有格式。
    # 可用格式："xlsx"、"csv"、"xml" 和 "yaml"。
    formats: [xlsx]
    # 指定仅处理这些子目录（相对于输入目录）。
    subdirs: []
    # 指定重写子目录路径（相对于输入目录）。
    subdirRewrites: {}
    # 递归遍历目录时是否遵循符号链接。
    # 警告：请小心使用此选项，它可能导致无限循环。
    followSymlink: false
    # 指定元数据表名称。
    metasheetName: "@TABLEAU"
    # 指定第一遍模式，在生成指定配置文件时解析预定义类型。
    # 在底层，解析的预定义类型将在第二遍中被识别和使用。
    #
    # 第一遍模式可以是：
    #
    #  - ""：默认模式，基于指定的配置文件解析。
    #  - "normal"：基于所有配置文件解析。
    #  - "advanced"：基于所有先前生成的 proto 文件解析。
    firstPassMode: ""
    # 指定消息的名称模式（支持正则表达式）。如果生成的
    # 消息名称不匹配此模式，将报告错误。
    # 示例："Conf$"
    messagerPattern: ""
  output:
    # 指定生成的 proto 文件的子目录（相对于输出目录）。
    subdir: ""
    # 文件名中的目录分隔符 `/` 或 `\` 被替换为 "__"。
    filenameWithSubdirPrefix: false
    # 为每个生成的 proto 文件名附加后缀。
    filenameSuffix: ""
    # 指定 proto 文件选项。
    # 示例：go_package、csharp_namespace...
    fileOptions: {}
    # 是否在每个枚举值名称前添加枚举类型的 "UPPER_SNAKE_CASE" 前缀。
    #
    # 如果设置，枚举值名称将添加 "ENUM_TYPE_" 前缀。例如：
    # 枚举 ItemType 有一个值 "EQUIP"，则转换为 "ITEM_TYPE_EQUIP"。
    # 如果枚举值名称已经添加了 "ENUM_TYPE_" 前缀，则不会
    # 再次添加前缀。
    enumValueWithPrefix: false
# 生成配置文件的选项。
conf:
  input:
    # proto 路径用于搜索在 proto 源文件的 import 语句中引用的依赖项。
    # 如果未提供导入路径，则假定 "."（当前目录）是唯一的导入路径。
    protoPaths: [.]
    # 要解析以生成配置的文件。
    #
    # 注意：
    #  - 如果未设置，则识别 "*.proto" 模式。
    #  - 支持通配符模式，可以使用通配符字符指定
    #    文件名集合。
    protoFiles: ["*.proto"]
    # 不解析以生成配置的文件。
    #
    # 注意：支持通配符模式，可以使用通配符字符指定
    # 文件名集合。
    excludedProtoFiles: []
    # 指定要解析的输入文件格式。如果未设置，它将识别所有格式。
    # 可用格式："xlsx"、"csv"、"xml" 和 "yaml"。
    formats: [xlsx]
    # 指定仅处理这些子目录（相对于 proto 文件中的工作簿名称选项）。
    subdirs: []
    # 指定重写子目录路径（相对于 proto 文件中的工作簿名称选项）。
    subdirRewrites: {}
  output:
    # 指定生成的配置文件的子目录（相对于输出目录）。
    subdir: ""
    # 指定生成的配置文件格式。如果未设置，它将生成所有格式。
    # 参考：https://protobuf.dev/programming-guides/techniques/#suffixes
    # 可用格式："json"、"binpb" 和 "txtpb"。
    formats: [json]
    # 是否输出 JSON 的美化格式，包括多行和缩进。
    pretty: true
    # EmitUnpopulated 指定是否发出未填充的字段。它不会
    # 发出未填充的 oneof 字段或未填充的扩展字段。
    # 为未填充字段发出的 JSON 值如下：
    #  ╔═══════╤════════════════════════════╗
    #  ║ JSON  │ Protobuf 字段             ║
    #  ╠═══════╪════════════════════════════╣
    #  ║ false │ proto3 布尔字段            ║
    #  ║ 0     │ proto3 数值字段            ║
    #  ║ ""    │ proto3 字符串/字节字段       ║
    #  ║ null  │ proto2 标量字段            ║
    #  ║ null  │ 消息字段                   ║
    #  ║ []    │ 列表字段                   ║
    #  ║ {}    │ 字典字段                   ║
    #  ╚═══════╧════════════════════════════╝
    #
    # 注意：FieldPresence 设置为 true 的工作表忽略此选项。
    #
    # 参考：https://github.com/protocolbuffers/protobuf/blob/main/docs/field_presence.md
    emitUnpopulated: false
    # 是否以带时区的字符串格式发出时间戳（由偏移量指示）。
    emitTimezones: false
    # 是否在 JSON 字段名称中使用 proto 字段名而不是 lowerCamelCase 名称。
    useProtoNames: false
    # 是否将枚举值作为数字发出。
    useEnumNumbers: false
    # 指定试运行模式：
    #  - "patch"：如果指定了工作表选项：修补 (PATCH_MERGE) 和分散
    dryRun: ""
```

### proto.input.header.seq

默认值：`,`

**全局级别**分隔符，用于分隔：
- 单元格内列表元素（标量或结构体）。
- 单元格内字典项。

还支持**工作表级别**和**字段级别**分隔符选项：
- [元数据表中的工作表级别分隔符](../../excel/metasheet/#option-sep)
- [字段属性中的字段级别分隔符](../../excel/field-property/#option-sep)

### proto.input.header.subseq

默认值：`:`

**全局级别**子分隔符，用于分隔：

- 每个单元格内字典项的键值对。
- 每个单元格内结构体列表元素的结构体字段。

还支持**工作表级别**和**字段级别**子分隔符选项：

- [元数据表中的工作表级别子分隔符](../../excel/metasheet/#option-subsep)
- [字段属性中的字段级别子分隔符](../../excel/field-property/#option-subsep)
