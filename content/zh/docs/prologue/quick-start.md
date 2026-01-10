---
title: "快速开始"
description: "快速开始"
lead: "如何通过tableauc将工作簿文件转换为proto和JSON文件的一页总结。"
date: 2020-11-16T13:59:39+08:00
lastmod: 2020-11-16T13:59:39+08:00
draft: false
images: []
weight: 9902
toc: true
---

## 1. 下载 tableauc

选择合适的 tableauc（又称 Tableau 编译器）进行下载：

<div class="row">
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/windows-logo.png" alt="Windows" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.windows.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Windows x64
            </a>
        </p>
        <!-- <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.windows.386.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Windows x86
            </a>
        </p> -->
    </div>
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/linux-logo.png" alt="Linux" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.linux.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Linux x64
            </a>
        </p>
        <!-- <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.linux.386.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> Linux x86
            </a>
        </p> -->
    </div>
    <div class="col-lg-5 col-xl-5 col-sm-6 text-center">
        <p>
            <img height="100px" src="/images/logo/apple-logo.svg" alt="Apple" />
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.darwin.amd64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> macOS x64
            </a>
        </p>
        <p>
            <a class="btn btn-outline-info btn-lg" role="button"
                href="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2Fv0.14.3/tableauc.v0.14.3.darwin.arm64.tar.gz">
                <image height="25px" src="/images/download_blue.svg" alt="Download" /> macOS arm64
            </a>
        </p>
    </div>
</div>

> 更多平台可在 [tableau releases →](https://github.com/tableauio/tableau/releases) 获取。

## 2. 添加工作簿

添加 **HelloWorld.xlsx** 文件，包含两个工作表：

- `Item`：将以下数据复制到该工作表。
- `@TABLEAU`：现在可以留空。它是 tableau 的 [元表 →]({{< relref "../excel/metasheet" >}})，用于指定解析器选项。

{{< spreadsheet "HelloWorld.xlsx" Item "@TABLEAU" >}}

{{< sheet colored>}}

| ID               | Name        | Desc                          |
| ---------------- | ----------- | ----------------------------- |
| map<int32, Item> | string      | string                        |
| Item 的 ID       | Item 的名称 | Item 的描述                   |
| 1                | Apple       | A kind of delicious fruit.    |
| 2                | Orange      | A kind of sour fruit.         |
| 3                | Banana      | A kind of calorie-rich fruit. |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

## 3. 运行 tableauc

执行命令：`./tableauc HelloWorld.xlsx`

然后会生成 *hello_world.proto* 和 *Item.json* 文件：

{{< details "hello_world.proto" open >}}

```protobuf
syntax = "proto3";

package protoconf;

import "tableau/protobuf/tableau.proto";

option (tableau.workbook) = {name:"HelloWorld.xlsx" namerow:1 typerow:2 noterow:3 datarow:4};

message Item {
  option (tableau.worksheet) = {name:"Item"};

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

恭喜！您已经成功使用 `tableauc` 将工作簿转换为 proto 和 JSON 文件。