---
title: "Overview"
description: "Overview"
lead: "Welcome to Tableau! This tutorial will guide you through setting up and running tableauc, loader, and checker."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 110
toc: true
---

## 1. Download tableauc

Select the appropriate tableauc (a.k.a. Tableau Compiler) to download:

| Platform    | Tableauc                                                                                                                                                                                                                                                                                                                                                                              |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Windows x64 | <a href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.4/tableauc.v0.5.4.windows.amd64.tar.gz"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" id="Layer_1" viewBox="0 0 16 16"><style>.st0{fill:#0071BC}</style><path class="st0" d="M13 8.5l-1.3-1.4L8.9 10V0H7.1v10L4.3 7.1 3 8.5l5 5zM3.6 14.1h8.8V16H3.6z"/></svg>Download</a> |
| Linux x64   | <a href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.4/tableauc.v0.5.4.linux.amd64.tar.gz"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" id="Layer_1" viewBox="0 0 16 16"><style>.st0{fill:#0071BC}</style><path class="st0" d="M13 8.5l-1.3-1.4L8.9 10V0H7.1v10L4.3 7.1 3 8.5l5 5zM3.6 14.1h8.8V16H3.6z"/></svg>Download</a>   |
| macOS       | <a href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.4/tableauc.v0.5.4.darwin.amd64.tar.gz"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" id="Layer_1" viewBox="0 0 16 16"><style>.st0{fill:#0071BC}</style><path class="st0" d="M13 8.5l-1.3-1.4L8.9 10V0H7.1v10L4.3 7.1 3 8.5l5 5zM3.6 14.1h8.8V16H3.6z"/></svg>Download</a>  |

> More platforms are available on [tableau releases](https://github.com/tableauio/tableau/releases).

## 2. Configure tableauc

Create a file named *config.yaml*, and copy configurations below to it:

```yaml
# Location represents the collection of time offsets in use in a geographical area.
# If the name is "" or "UTC", LoadLocation returns UTC.
# If the name is "Local", LoadLocation returns Local.
#
# Default: Local.
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
  # Log language: en, zh.
  # Default: en.
  lang: en
input:
  # Input options for generating proto files.
  proto:
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
    # The enums and messages in ImportedProtoFiles can be used in Excel/CSV/XML as
    # common types.
    # Default: nil.
    importedProtoFiles: []
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
  # Input options for generating conf files.
  conf:
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
    # Note: recognize all formats (Excel/CSV/XML) if not set (value is nil).
    #
    # Default: nil.
    formats: []
    # Specify only these subdirs (relative to workbook name option in proto file).
    #
    # Default: nil.
    subdirs: []
    # Specify rewrite subdir path (relative to workbook name option in proto file).
    #
    # Default: nil.
    subdirRewrites: {}
output:
  proto:
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
  conf:
    # Specify subdir (relative to output dir) for generated configuration files.
    # Default: "".
    subdir: ""
    # Specify generated conf file formats. If not set, it will generate all
    # formats (JSON/Text/Bin).
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
```

## 3. Add a workbook

A worksheet `ItemConf` in `HelloWorld.xlsx`:

{{< sheet >}}

| ID        | Name        | Desc                       |
|-----------|-------------|----------------------------|
| uint32    | string      | string                     |
| Item's ID | Item's name | Item's description         |
| 1         | Apple       | A kind of delicious fruit. |

{{< /sheet >}}

## 4. Run tableauc

Run `./tableauc -c config.yaml`

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message Apple {
  option (tableau.worksheet) = {name:"Apple" namerow:1 typerow:2 noterow:3 datarow:4};

  uint32 id = 1 [(tableau.field) = {name:"ID"}];
  string name = 2 [(tableau.field) = {name:"Name"}];
  string desc = 3 [(tableau.field) = {name:"Desc"}];
}
```

{{< /details >}}

{{< details "Apple.json" >}}

```json
{
    "id": 1,
    "name": "Apple",
    "desc": "A kind of delicious fruit."
}
```

{{< /details >}}

Congratulations! You’ve just run the tableauc to convert a workbook to proto and JSON files.
