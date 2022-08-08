---
title: "List"
description: "XML list guide."
lead: "XML list guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
weight: 1920
toc: true
---

## Cross-cell list

### Input

A worksheet `RankConf` in `Rank.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<RankConf>
  <RankItem Score="[RankItem]int32"/>
</RankConf>
-->

<RankConf>
  <RankItem Score="100" Name="Tony"/>
  <RankItem Score="99" Name="Eric"/>
  <RankItem Score="98" Name="David"/>
  <RankItem Score="98" Name="Jenny"/>
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

  repeated RankItem rank_item_list = 1 [(tableau.field) = {name:"RankItem" layout:LAYOUT_VERTICAL}];
  message RankItem {
    int32 score = 1 [(tableau.field) = {name:"Score"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "rank_conf.json" >}}

```json
{
    "rankItemList":  [
        {
            "score":  100,
            "name":  "Tony"
        },
        {
            "score":  99,
            "name":  "Eric"
        },
        {
            "score":  98,
            "name":  "David"
        },
        {
            "score":  98,
            "name":  "Jenny"
        }
    ]
}
```

{{< /details >}}

**NOTE**: Duplicate key column data will be **merged** into one (only the first value taken).
          If you want duplicate values occurred, you should just use `list` instead of `keyed list`.

## In-cell list

There are two kinds of in-cell list:

1. in-cell **scalar** list, as list value type is scalar. E.g: `[]int32`.
2. in-cell **struct** list, as list value type is struct. E.g: `[Item]int32`.

### In-cell scalar list

#### Input

A worksheet `ServerConf` in `Server.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<ServerConf>
    <GameServer IP="[]string" />
</ServerConf>
-->

<ServerConf Author="David" LastBuildTime="2022-08-07 11:21:00">
    <GameServer BinPath="/home/server/bin" Cmd="./gamesvr --id='1.0.1.1'" IP="9.12.125.11,9.43.124.32,9.125.32.14" Desc="game server" />
</ServerConf>
```

The `IP` attribute's type is in-cell list `[]string`, as the list element is scalar type `string`.

#### Output

Generated protoconf is `server_conf.proto`:

{{< details "server_conf.proto" open >}}

```protobuf
// NOTE: Some trivial code snippets are eliminated.
option (tableau.workbook) = {name:"server/AutoConfig2/Server.xml"};

message ServerConf {
  option (tableau.worksheet) = {name:"ServerConf" namerow:1 typerow:2 noterow:3 datarow:4 nameline:1 typeline:1 nested:true};

  string author = 1 [(tableau.field) = {name:"Author"}];
  string last_build_time = 2 [(tableau.field) = {name:"LastBuildTime"}];
  GameServer game_server = 3 [(tableau.field) = {name:"GameServer"}];
  message GameServer {
    repeated string ip_list = 1 [(tableau.field) = {name:"IP" key:"IP" layout:LAYOUT_INCELL}];
    string bin_path = 2 [(tableau.field) = {name:"BinPath"}];
    string cmd = 3 [(tableau.field) = {name:"Cmd"}];
    string desc = 4 [(tableau.field) = {name:"Desc"}];
  }
}
```

{{< /details >}}

{{< details "server_conf.json" >}}

```json
{
    "author":  "David",
    "lastBuildTime":  "2022-08-07 11:21:00",
    "gameServer":  {
        "ipList":  [
            "9.12.125.11",
            "9.43.124.32",
            "9.125.32.14"
        ],
        "binPath":  "/home/server/bin",
        "cmd":  "./gamesvr --id='1.0.1.1'",
        "desc":  "game server"
    }
}
```

{{< /details >}}

### in-cell struct list

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

## Keyed list

Keyed list is same as normal list, except the first field of list struct is treated as
like the map key.

Pattern: `[Item]<int32>`

### Input

A worksheet `RankConf` in `Rank.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU 
<RankConf>
  <RankItem Score="[RankItem]<int32>"/>
</RankConf>
-->

<RankConf>
  <RankItem Score="100" Name="Tony"/>
  <RankItem Score="99" Name="Eric"/>
  <RankItem Score="98" Name="David"/>
  <RankItem Score="98" Name="Jenny"/>
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

  repeated RankItem rank_item_list = 1 [(tableau.field) = {name:"RankItem" key:"Score" layout:LAYOUT_VERTICAL}];
  message RankItem {
    int32 score = 1 [(tableau.field) = {name:"Score"}];
    string name = 2 [(tableau.field) = {name:"Name"}];
  }
}
```

{{< /details >}}

{{< details "rank_conf.json" >}}

```json
{
    "rankItemList":  [
        {
            "score":  100,
            "name":  "Tony"
        },
        {
            "score":  99,
            "name":  "Eric"
        },
        {
            "score":  98,
            "name":  "David"
        }
    ]
}
```

{{< /details >}}

**NOTE**: Duplicate key column data will be **merged** into one (only the first value taken).
          If you want duplicate values occurred, you should just use `list` instead of `keyed list`.
