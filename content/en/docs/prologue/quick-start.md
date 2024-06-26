---
title: "Quick Start"
description: "Quick Start"
lead: "One page summary of how to convert a workbook file to proto and JSON files by tableauc."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 9902
toc: true
---

## 1. Download tableauc

Select the appropriate tableauc (aka Tableau Compiler) to download:

<div class="row">
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/windows-logo.png" alt="Windows" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.7/tableauc.v0.5.7.windows.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Windows x64
            </a>
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.7/tableauc.v0.5.7.windows.386.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Windows x86
            </a>
        </p>
    </div>
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/linux-logo.png" alt="Linux" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.7/tableauc.v0.5.7.linux.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Linux x64
            </a>
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.7/tableauc.v0.5.7.linux.386.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Linux x86
            </a>
        </p>
    </div>
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/apple-logo.svg" alt="Apple" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.5.7/tableauc.v0.5.7.darwin.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> macOS
            </a>
        </p>
    </div>
</div>

> More platforms are available on [tableau releases →](https://github.com/tableauio/tableau/releases).

## 2. Add a workbook

Add **HelloWorld.xlsx** with two sheets:

- `Item`: Copy data below to this worksheet.
- `@TABLEAU`: Just leave it empty now. It is the tableau [metasheet →]({{< relref "../excel/metasheet" >}}) for specifying parser options.

{{< spreadsheet "HelloWorld.xlsx" Item "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Name        | Desc                          |
|------------------|-------------|-------------------------------|
| map<int32, Item> | string      | string                        |
| Item’s ID        | Item’s name | Item’s description            |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet >}}

{{< /sheet >}}

{{< /spreadsheet >}}

## 3. Run tableauc

Run command: `./tableauc HelloWorld.xlsx`

Then *hello_world.proto* and *Item.json* are generated:

{{< details "hello_world.proto" open >}}

```protobuf
syntax = "proto3";

package protoconf;

import "tableau/protobuf/tableau.proto";

option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message Item {
  option (tableau.worksheet) = {name:"Item" namerow:1 typerow:2 noterow:3 datarow:4};

  map<int32, Item> item_map = 1 [(tableau.field) = {key:"ID" layout:LAYOUT_VERTICAL}];
  message Item {
    int32 id = 1 [(tableau.field) = {name:"ID"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "Item.json" open >}}

```json
{
    "itemMap": {
        "1": {
            "id": 1,
            "name": "Apple",
            "desc": "A kind of delicious fruit."
        },
        "2": {
            "id": 2,
            "name": "Orange",
            "desc": "A kind of sour fruit."
        },
        "3": {
            "id": 3,
            "name": "Banana",
            "desc": "A kind of calorie-rich fruit."
        }
    }
}
```

{{< /details >}}

Congratulations! You’ve just run the `tableauc` to convert a workbook to proto and JSON files.
