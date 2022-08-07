---
title: "Struct"
description: "XML struct guide."
lead: "XML struct guide."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
weight: 1910
toc: true
---

## Cross-cell struct

Any node in XML (with or without attributes) will be converted to a struct in protobuf.

## In-cell struct

{{< alert icon="👉" context="danger" text="Not supported yet." />}}

### Input

A worksheet `ServerConf` in `Server.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!-- @TABLEAU -->

<ServerConf Author="David" LastBuildTime="2022-08-07 11:21:00">
    <GameServer BinPath="/home/server/bin" Cmd="./gamesvr --id='1.0.1.1'" Desc="game server" />
</ServerConf>
```

The `GameServer` node's type is cross-cell struct `{string BinPath,string Cmd,string Desc}GameServer`.

### Output

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
    string bin_path = 1 [(tableau.field) = {name:"BinPath"}];
    string cmd = 2 [(tableau.field) = {name:"Cmd"}];
    string desc = 3 [(tableau.field) = {name:"Desc"}];
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
        "binPath":  "/home/server/bin",
        "cmd":  "./gamesvr --id='1.0.1.1'",
        "desc":  "game server"
    }
}
```

{{< /details >}}
