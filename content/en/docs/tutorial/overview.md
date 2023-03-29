---
title: "Overview"
description: "Overview"
lead: "Welcome to Tableau! This tutorial will guide you through setting up and running tableauc, loader, and checker."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 9801
toc: true
---

## Configure tableauc

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
    # Header options of worksheet.
    header:
      # Exact row number of column name definition at a worksheet.
      # Default: 1.
      namerow: 1
      # Exact row number of column type definition at a worksheet.
      # Default: 2.
      typerow: 2
      # Exact row number of column note at a worksheet.
      # Default: 3.
      noterow: 3
      # Start row number of data at a worksheet.
      # Default: 4.
      datarow: 4
      # The line number of column name definition in a cell.
      # Value 0 means the whole cell.
      # Default: 0.
      nameline: 0
      # The line number of column type definition in a cell.
      # Value 0 means the whole cell.
      # Default: 0.
      typeline: 0
    # The proto paths are used to search for dependencies that are referenced in import
    # statements in proto source files. If no import paths are provided then
    # "." (current directory) is assumed to be the only import path.
    # Default: nil.
    protoPaths: [.]
    # The enums and messages in protoFiles can be used in Excel/CSV/XML as
    # common types.
    # Default: nil.
    protoFiles: []
    # Specify input file formats.
    # Note: recognize all formats (Excel/CSV/XML) if not set (value is nil).
    # Default: nil.
    formats: []
    # Specify only these subdirs (relative to input dir) to be processed.
    # Default: nil.
    subdirs: []
    # Specify rewrite subdir path (relative to input dir).
    # Default: nil.
    subdirRewrites: {}
    # Follow the symbolic links when traversing directories recursively.
    # WARN: be careful to use this option, it may lead to infinite loop.
    # Default: false.
    followSymlink: false
  output:
    # Specify subdir (relative to output dir) for generated proto files.
    # Default: "".
    subdir: ""
    # Dir separator `/` or `\`  in filename is replaced by "__".
    # Default: false.
    filenameWithSubdirPrefix: false
    # Append suffix to each generated proto filename.
    # Default: "".
    filenameSuffix: ""
    # Specify proto file options.
    # Example: go_package, csharp_namespace...
    #
    # Default: nil.
    fileOptions: {}
# Options for generating conf files.
conf:
  input:
    # The proto paths are used to search for dependencies that are referenced in import
    # statements in proto source files. If no import paths are provided then
    # "." (current directory) is assumed to be the only import path.
    #
    # Default: nil.
    protoPaths: [.]
    # The files to be parsed to generate configurations.
    #
    # NOTE:
    #  - Recognize "*.proto" pattern if not set (value is nil).
    #  - Glob patterns is supported, which can specify sets
    #    of filenames with wildcard characters.
    #
    # Default: nil.
    protoFiles: ["*.proto"]
    # The files not to be parsed to generate configurations.
    #
    # NOTE: Glob patterns is supported, which can specify sets
    # of filenames with wildcard characters.
    #
    # Default: nil.
    excludedProtoFiles: []
    # Specify input file formats to be parsed.
    # Note: recognize all formats ("xlsx", "csv", or "xml") if not set (value is nil).
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
    # Default: "".
    subdir: ""
    # Specify generated conf file formats. If not set, it will generate all
    # formats: "json", "bin", or "txt".
    #
    # Default: nil.
    formats: [json]
    # Output pretty format of JSON, with multiline and indent.
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
    # UseProtoNames uses proto field name instead of lowerCamelCase name in JSON
    # field names.
    useProtoNames: false
    # UseEnumNumbers emits enum values as numbers.
    useEnumNumbers: false
```
