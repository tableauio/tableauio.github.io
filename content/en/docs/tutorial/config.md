---
title: "Tableauc config"
description: "Tableauc config details"
lead: ""
date: 2020-11-16T13:59:39+08:00
lastmod: 2020-11-16T13:59:39+08:00
draft: false
images: []
weight: 9801
toc: true
---

## config.yaml

Create a file named *config.yaml*, and copy configurations below to it:

```yaml
# locale BCP 47 language tags: en, zh.
lang: en
# Location represents the collection of time offsets in use in a geographical area.
#  - If the name is "" or "UTC", LoadLocation returns UTC.
#  - If the name is "Local", LoadLocation returns Local.
#  - Otherwise, the name is taken to be a location name corresponding to a file in the
#    IANA Time Zone database, such as "America/New_York", "Asia/Shanghai", and so on.
#
# See https://go.dev/src/time/zoneinfo_abbrs_windows.go.
locationName: Local
# Configure your custom acronyms. Out of the box, "ID" -> "id" is auto configured.
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
# Options for generating proto files.
proto:
  input:
    # Header options for worksheet and workbook.
    header:
      # Exact row number of column name definition at a worksheet.
      namerow: 1
      # Exact row number of column type definition at a worksheet.
      typerow: 2
      # Exact row number of column note at a worksheet.
      noterow: 3
      # Start row number of data at a worksheet.
      datarow: 4
      # The line number of column name definition in a cell.
      # Value 0 means the whole cell.
      nameline: 0
      # The line number of column type definition in a cell.
      # Value 0 means the whole cell.
      typeline: 0
      # The line number of column note definition in a cell.
      # Value 0 means the whole cell.
      noteline: 0
      # Separator for separating:
      #  - incell list elements (scalar or struct).
      #  - incell map items.
      #
      # Default: ","
      sep: ""
      # Subseparator for separating:
      #  - key-value pair of each incell map item.
      #  - struct fields of each incell struct list element.
      #
      # Default: ":"
      subsep: ""
    # The proto paths are used to search for dependencies that are referenced in import
    # statements in proto source files. If no import paths are provided then
    # "." (current directory) is assumed to be the only import path.
    protoPaths: [.]
    # The enums and messages in protoFiles can be used in Excel/CSV/XML/YAML as
    # common types.
    protoFiles: []
    # Specify input file formats to be parsed. It will recognize all formats
    # if not set.
    #
    # Available formats: "xlsx", "csv", "xml", and "yaml".
    formats: [xlsx]
    # Specify only these subdirs (relative to input dir) to be processed.
    subdirs: []
    # Specify rewrite subdir path (relative to input dir).
    subdirRewrites: {}
    # Whether to follow the symbolic links when traversing directories recursively.
    # WARN: be careful to use this option, it may lead to infinite loop.
    followSymlink: false
    # Specify metasheet name.
    metasheetName: "@TABLEAU"
  output:
    # Specify subdir (relative to output dir) for generated proto files.
    subdir: ""
    # Dir separator `/` or `\`  in filename is replaced by "__".
    filenameWithSubdirPrefix: false
    # Append suffix to each generated proto filename.
    filenameSuffix: ""
    # Specify proto file options.
    # Example: go_package, csharp_namespace...
    fileOptions: {}
    # Whether to prepend prefix "UPPER_SNAKE_CASE of EnumType" to each enum value name.
    #
    # If set, the enum value name is prepended with "ENUM_TYPE_". For example:
    # enum ItemType has a value "EQUIP", then converted to "ITEM_TYPE_EQUIP".
    # If the enum value name is already prefixed with "ENUM_TYPE_", then it will
    # not be prefixed again.
    enumValueWithPrefix: false
# Options for generating conf files.
conf:
  input:
    # The proto paths are used to search for dependencies that are referenced in import
    # statements in proto source files. If no import paths are provided then
    # "." (current directory) is assumed to be the only import path.
    protoPaths: [.]
    # The files to be parsed to generate configurations.
    #
    # NOTE:
    #  - Recognize "*.proto" pattern if not set.
    #  - Glob patterns is supported, which can specify sets
    #    of filenames with wildcard characters.
    protoFiles: ["*.proto"]
    # The files not to be parsed to generate configurations.
    #
    # NOTE: Glob patterns is supported, which can specify sets
    # of filenames with wildcard characters.
    excludedProtoFiles: []
    # Specify input file formats to be parsed. It will recognize all formats
    # if not set.
    #
    # Available formats: "xlsx", "csv", "xml", and "yaml".
    formats: [xlsx]
    # Specify only these subdirs (relative to workbook name option in proto file).
    subdirs: []
    # Specify rewrite subdir path (relative to workbook name option in proto file).
    subdirRewrites: {}
  output:
    # Specify subdir (relative to output dir) for generated configuration files.
    subdir: ""
    # Specify generated conf file formats. It will generate all formats if not set.
    # Available formats: "xlsx", "csv", "xml", and "yaml".
    formats: [json]
    # Whether to output pretty format of JSON, with multiline and indent.
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
    emitUnpopulated: false
    # Whether to emit timestamp in string format with timezones (as indicated by an offset).
    emitTimezones: false
    # Whether to use proto field name instead of lowerCamelCase name in JSON field names.
    useProtoNames: false
    # Whether to emit enum values as numbers.
    useEnumNumbers: false
    # Specify dry run mode:
    #  - patch: if sheet options are specified: Patch (PATCH_MERGE) and Scatter
    dryRun: ""
```

### proto.input.header.seq

Default: `,`

**Global-level** separator for separating:

- incell list elements (scalar or struct).
- incell map items.

**Sheet-level** and **field-level** separator options are also supported:

- [Sheet-level separator in metasheet](../../excel/metasheet/#option-sep)
- [Field-level separator in field property](../../excel/field-property/#option-sep)

### proto.input.header.subseq

Default: `:`

Global-level subseparator for separating:

- key-value pair of each incell map item.
- struct fields of each incell struct list element.

**Sheet-level** and **field-level** subseparator options are also supported:

- [Sheet-level subseparator in metasheet](../../excel/metasheet/#option-subsep)
- [Field-level subseparator in field property](../../excel/field-property/#option-subsep)
