---
title: "Tableauc 配置"
description: "Tableauc 配置详解"
lead: ""
date: 2020-11-16T13:59:39+08:00
lastmod: 2020-11-16T13:59:39+08:00
draft: false
images: []
weight: 9903
toc: true
---

## config.yaml

创建名为 *config.yaml* 的文件，并将以下配置复制到其中：

```yaml
# locale BCP 47 language tags: en, zh.
#
# Default: "en".
lang: en
# Location represents the collection of time offsets in use in a geographical area.
#  - If the name is "" or "UTC", LoadLocation returns UTC.
#  - If the name is "Local", LoadLocation returns Local.
#  - Otherwise, the name is taken to be a location name corresponding to a file in the
#    IANA Time Zone database, such as "America/New_York", "Asia/Shanghai", and so on.
#
# See https://go.dev/src/time/zoneinfo_abbrs_windows.go.
#
# Default: "Local".
locationName: Local
# Configure your custom acronyms (regexp supported). Out of the box,
# "ID" -> "id" is auto configured.
# For example, if you configure K8s -> k8s, then the field name in PascalCase "InK8s"
# will be converted to snake_case "in_k8s" but not "in_k_8_s".
acronyms: {}
# Log options.
log:
  # Log mode: SIMPLE, FULL.
  mode: SIMPLE
  # Log level: DEBUG, INFO, WARN, ERROR.
  level: INFO
  # Log filename: set this if you want to write log messages to files.
  filename: ""
  # Log sink: CONSOLE, FILE, and MULTI.
  sink: CONSOLE
# Options for generating proto files. Only for protogen.
proto:
  input:
    # Header options of worksheet.
    header:
      # Exact row number of column name definition at a worksheet.
      #
      # Default: 1.
      namerow: 1
      # Exact row number of column type definition at a worksheet.
      #
      # Default: 2.
      typerow: 2
      # Exact row number of column note at a worksheet.
      #
      # Default: 3.
      noterow: 3
      # Start row number of data at a worksheet.
      #
      # Default: 4.
      datarow: 4
      # The line number of column name definition in a cell.
      # Value 0 means the whole cell.
      #
      # Default: 0.
      nameline: 0
      # The line number of column type definition in a cell.
      # Value 0 means the whole cell.
      #
      # Default: 0.
      typeline: 0
      # The line number of column note definition in a cell.
      # Value 0 means the whole cell.
      #
      # Default: 0.
      noteline: 0
      # Separator for separating:
      #  - incell list elements (scalar or struct).
      #  - incell map items.
      #
      # Default: ",".
      sep: ""
      # Subseparator for separating:
      #  - key-value pair of each incell map item.
      #  - struct fields of each incell struct list element.
      #
      # Default: ":".
      subsep: ""
    # The proto paths are used to search for dependencies that are referenced in import
    # statements in proto source files. If no import paths are provided then
    # "." (current directory) is assumed to be the only import path.
    #
    # Default: nil.
    protoPaths: [.]
    # The enums and messages in protoFiles can be used in Excel/CSV/XML/YAML
    # as common types.
    #
    # NOTE: Glob patterns are supported, which can specify sets
    # of filenames with wildcard characters.
    #
    # Default: nil.
    protoFiles: []
    # Specify input file formats.
    # Note: recognize all formats (Excel/CSV/XML/YAML) if not set
    # (value is nil).
    # Available formats: "xlsx", "csv", "xml", and "yaml".
    #
    # Default: nil.
    formats: [xlsx]
    # Specify only these subdirs (relative to input dir) to be processed.
    #
    # Default: nil.
    subdirs: []
    # Specify rewrite subdir path (relative to input dir).
    #
    # Default: nil.
    subdirRewrites: {}
    # Follow the symbolic links when traversing directories recursively.
    # WARN: be careful to use this option, it may lead to infinite loop.
    #
    # Default: false.
    followSymlink: false
    # Specify metasheet name. Metasheet is "@TABLEAU" if not set.
    # NOTE: metasheet name must start with '@'.
    #
    # Default: "".
    metasheetName: "@TABLEAU"
    # Specify the first-pass mode to parse predefined types when generate
    # specified config files. Under the hood, the parsed predefined types will
    # be recognized and used in the second-pass.
    #
    # The first-pass mode can be:
    #
    #  - "": default mode, parse based on specified config files.
    #  - "normal": parse based on all config files.
    #  - "advanced": parse based on all previous generated proto files.
    #
    # Default: "".
    firstPassMode: ""
    # Specify the name pattern for messager (regexp supported). If the generated
    # messager name does not match this pattern, an error will be reported.
    # Example: "Conf$"
    #
    # Default: "".
    messagerPattern: ""
  output:
    # Specify subdir (relative to output dir) for generated proto files.
    #
    # Default: "".
    subdir: ""
    # Dir separator `/` or `\`  in filename is replaced by "__".
    #
    # Default: false.
    filenameWithSubdirPrefix: false
    # Append suffix to each generated proto filename.
    #
    # Default: "".
    filenameSuffix: ""
    # Specify the generated protobuf file's edition.
    # See https://protobuf.dev/editions/overview/.
    #
    # Default: "".
    edition: ""
    # Specify options (including features) at file level.
    # Examples: "go_package", "csharp_namespace",
    #           "features.(pb.go).strip_enum_prefix" etc.
    #
    # References:
    #  - https://protobuf.dev/programming-guides/proto3/#options
    #  - https://protobuf.dev/editions/features/
    #
    # Default: nil.
    fileOptions: {}
    # Whether to prepend prefix "UPPER_SNAKE_CASE of EnumType" to each enum value name.
    #
    # If set, the enum value name is prepended with "ENUM_TYPE_". For example:
    # enum ItemType has a value "EQUIP", then converted to "ITEM_TYPE_EQUIP".
    # If the enum value name is already prefixed with "ENUM_TYPE_", then it will
    # not be prefixed again.
    #
    # Default: false.
    enumValueWithPrefix: false
    # In Protocol Buffers (Protobuf), to guarantee both backward and forward
    # compatibility, field numbers must be preserved because they are used as
    # unique identifiers in the binary wire format. Changing a field number
    # breaks backward compatibility with any existing data that uses the old
    # numbering. Compared with the old generated proto message, if a new field
    # name occurs, then assign the max field number plus 1 in the same level.
    #
    # Default: false.
    preserveFieldNumbers: false
# Options for generating conf files. Only for confgen.
conf:
  input:
    # The proto paths are used to search for dependencies that are referenced
    # in import statements in proto source files. If no import paths are
    # provided then "." (current directory) is assumed to be the only import
    # path.
    #
    # Default: nil.
    protoPaths: [.]
    # The files to be parsed to generate configurations.
    #
    # NOTE:
    #  - By default, recognize "*.proto" pattern if not set.
    #  - Glob patterns are supported, which can specify sets of filenames
    #    with wildcard characters. Double asterisk (**) for recursive
    #    globbing is not supported.
    #
    # Default: nil.
    protoFiles: ["*.proto"]
    # The files not to be parsed to generate configurations.
    #
    # NOTE: Glob patterns are supported, which can specify sets of filenames
    # with wildcard characters. Double asterisk (**) for recursive globbing
    # is not supported.
    #
    # Default: nil.
    excludedProtoFiles: []
    # Specify input file formats to be parsed.
    # Note: recognize all formats (Excel/CSV/XML/YAML) if not set
    # (value is nil).
    # Available formats: "xlsx", "csv", "xml", and "yaml".
    #
    # Default: nil.
    formats: [xlsx]
    # Specify only these subdirs (relative to workbook name option in proto file).
    #
    # Default: nil.
    subdirs: []
    # Specify rewrite subdir path (relative to workbook name option in proto file).
    #
    # Default: nil.
    subdirRewrites: {}
  output:
    # Specify subdir (relative to output dir) for generated configuration files.
    #
    # Default: "".
    subdir: ""
    # Specify generated conf file formats. If not set, it will generate all
    # formats (JSON/Text/Bin).
    # Refer: https://protobuf.dev/programming-guides/techniques/#suffixes
    # Available formats: "json", "binpb", and "txtpb".
    #
    # Default: nil.
    formats: [json]
    # Specify generated conf file formats in messager level. This overrides
    # the formats option above.
    # Example:
    #   messagerFormats:
    #     ItemConf: [json, binpb]
    #     ActivityConf: [txtpb]
    #
    # Default: nil.
    messagerFormats: {}
    # Output pretty format of JSON and Text, with multiline and indent.
    #
    # Default: false.
    pretty: true
    # EmitUnpopulated specifies whether to emit unpopulated fields. It does not
    # emit unpopulated oneof fields or unpopulated extension fields.
    # The JSON value emitted for unpopulated fields are as follows:
    #  ╔═══════╤════════════════════════════╗
    #  ║ JSON  │ Protobuf field             ║
    #  ╠═══════╪════════════════════════════╣
    #  ║ false │ proto3 boolean fields      ║
    #  ║ 0     │ proto3 numeric fields      ║
    #  ║ ""    │ proto3 string/bytes fields ║
    #  ║ null  │ proto2 scalar fields       ║
    #  ║ null  │ message fields             ║
    #  ║ []    │ list fields                ║
    #  ║ {}    │ map fields                 ║
    #  ╚═══════╧════════════════════════════╝
    #
    # NOTE: worksheet with FieldPresence set as true ignore this option.
    #
    # Refer: https://github.com/protocolbuffers/protobuf/blob/main/docs/field_presence.md
    #
    # Default: false.
    emitUnpopulated: false
    # EmitTimezones specifies whether to emit timestamp in string format with
    # timezones (as indicated by an offset).
    #
    # Default: false.
    emitTimezones: false
    # UseProtoNames uses proto field name instead of lowerCamelCase name
    # in JSON field names.
    #
    # Default: false.
    useProtoNames: false
    # UseEnumNumbers emits enum values as numbers.
    #
    # Default: false.
    useEnumNumbers: false
    # Specify dry run mode:
    #  - "patch": if sheet options are specified: Patch (PATCH_MERGE) and Scatter
    #
    # Default: "".
    dryRun: ""
```

### proto.input.header.sep

默认值：`,`

**全局级别**的分隔符，用于分隔：

- in-cell list 的元素（标量或结构体）。
- in-cell map 的条目。

同时也支持**工作表级别**和**字段级别**的分隔符选项：

- [Metasheet 中的工作表级别分隔符](../../excel/metasheet/#选项-sep)
- [Field property 中的字段级别分隔符](../../excel/field-property/#选项-sep)

### proto.input.header.subsep

默认值：`:`

**全局级别**的子分隔符，用于分隔：

- in-cell map 每个元素的键值对。
- in-cell struct list 每个元素的结构体字段。

同时也支持 **工作表级别**和**字段级别**的子分隔符选项：

- [Metasheet 中的工作表级别子分隔符](../../excel/metasheet/#选项-subsep)
- [Field property 中的字段级别子分隔符](../../excel/field-property/#选项-subsep)
