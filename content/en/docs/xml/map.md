---
title: "Map"
description: "XML map guide."
lead: "XML map guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
weight: 5300
toc: true
---

## Cross-cell map

### Input

A worksheet `RankConf` in `Rank.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<RankConf>
  <RankItem ID="map<uint32, RankItem>"/>
</RankConf>
-->

<RankConf>
  <RankItem ID="1" Score="100" Name="Tony"/>
  <RankItem ID="2" Score="99" Name="Eric"/>
  <RankItem ID="3" Score="98" Name="David"/>
  <RankItem ID="4" Score="98" Name="Jenny"/>
</RankConf>
```

### Output

Generated protoconf is `rank_conf.proto`:

{{< details "rank_conf.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"server/AutoConfig2/Server.xml"};

message RankConf {
  option (tableau.worksheet) = {name:"RankConf" namerow:1 typerow:2 noterow:3 datarow:4 nameline:1 typeline:1 nested:true};

  map<uint32, RankItem> rank_item_map = 1 [(tableau.field) = {name:"RankItem" key:"Id" layout:LAYOUT_VERTICAL}];
  message RankItem {
    uint32 id = 1 [(tableau.field) = {name:"Id"}];
    int32 score = 2 [(tableau.field) = {name:"Score"}];
    string name = 3 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "rank_conf.json" >}}

```json
{
    "rankItemMap":  {
        "1":  {
            "id":  1,
            "score":  100,
            "name":  "Tony"
        },
        "2":  {
            "id":  2,
            "score":  99,
            "name":  "Eric"
        },
        "3":  {
            "id":  3,
            "score":  98,
            "name":  "David"
        },
        "4":  {
            "id":  4,
            "score":  98,
            "name":  "Jenny"
        }
    }
}
```

{{< /details >}}

## In-cell map

There are two kinds of in-cell map:

1. in-cell **scalar** map, as map value type is scalar. E.g: `map<uint32, int32>`.
2. in-cell **struct** map, as map value type is struct. E.g: `map<uint32, Item>`.

### In-cell scalar map

#### Input

A worksheet `RankConf` in `Rank.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<RankConf>
  <RankItem ID="map<uint32, RankItem>" Subject="map<string, int32>"/>
</RankConf>
-->

<RankConf>
  <RankItem ID="1" Score="100" Name="Tony" Subject="Math:80,English:20"/>
  <RankItem ID="2" Score="99" Name="Eric" Subject="Math:80,English:19"/>
  <RankItem ID="3" Score="98" Name="David" Subject="Math:80,English:18"/>
  <RankItem ID="4" Score="98" Name="Jenny" Subject="Math:80,English:18"/>
</RankConf>
```

The `Subject` attribute's type is in-cell map `map<string, int32>`, as the map value-type is scalar type.

#### Output

Generated protoconf is `rank_conf.proto`:

{{< details "rank_conf.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"server/AutoConfig2/Server.xml"};

message RankConf {
  option (tableau.worksheet) = {name:"RankConf" namerow:1 typerow:2 noterow:3 datarow:4 nameline:1 typeline:1 nested:true};

  map<uint32, RankItem> rank_item_map = 1 [(tableau.field) = {name:"RankItem" key:"Id" layout:LAYOUT_VERTICAL}];
  message RankItem {
    uint32 id = 1 [(tableau.field) = {name:"Id"}];
    map<string, int32> subject_map = 2 [(tableau.field) = {name:"Subject" layout:LAYOUT_INCELL}];
    int32 score = 3 [(tableau.field) = {name:"Score"}];
    string name = 4 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "rank_conf.json" >}}

```json
{
    "rankItemMap":  {
        "1":  {
            "id":  1,
            "subjectMap":  {
                "English":  20,
                "Math":  80
            },
            "score":  100,
            "name":  "Tony"
        },
        "2":  {
            "id":  2,
            "subjectMap":  {
                "English":  19,
                "Math":  80
            },
            "score":  99,
            "name":  "Eric"
        },
        "3":  {
            "id":  3,
            "subjectMap":  {
                "English":  18,
                "Math":  80
            },
            "score":  98,
            "name":  "David"
        },
        "4":  {
            "id":  4,
            "subjectMap":  {
                "English":  18,
                "Math":  80
            },
            "score":  98,
            "name":  "Jenny"
        }
    }
}
```

{{< /details >}}

### in-cell struct list

{{< alert icon="👉" context="danger" text="Not supported yet." />}}
