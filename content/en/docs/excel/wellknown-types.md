---
title: "Wellknown types"
description: "Wellknown guide."
lead: "This guide demonstrates different features of wellknown types."
date: 2024-09-24T14:00:00+08:00
lastmod: 2024-09-24T14:00:00+08:00
draft: false
images: []
weight: 7108
toc: true
---

## Datetime

### Datetime

> See [Basics: Datetime →]({{< relref "../basics/wellknown-types/#datetime" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| BeginDatetime       | EndDatetime         | Datetime                                |
| ------------------- | ------------------- | --------------------------------------- |
| datetime            | datetime            | []datetime                              |
| Begin datetime      | End datetime        | Datetime                                |
| 2020-01-01 10:25:00 | 2022-10-10 05:10:00 | 2020-01-01 10:25:00,2022-10-10 05:10:00 |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  google.protobuf.Timestamp begin_datetime = 1 [(tableau.field) = {name:"BeginDatetime"}];
  google.protobuf.Timestamp end_datetime = 2 [(tableau.field) = {name:"EndDatetime"}];
  repeated google.protobuf.Timestamp datetime_list = 3 [(tableau.field) = {name:"Datetime" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "beginDatetime": "2020-01-01T02:25:00Z",
    "endDatetime": "2022-10-09T21:10:00Z",
    "datetimeList": [
        "2020-01-01T02:25:00Z",
        "2022-10-09T21:10:00Z"
    ]
}
```

{{< /details >}}

### Date

> See [Basics: Datetime →]({{< relref "../basics/wellknown-types/#datetime" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| BeginDate  | EndDate  | Date                |
| ---------- | -------- | ------------------- |
| date       | date     | []date              |
| Begin date | End date | Date                |
| 2020-01-01 | 20221010 | 2020-01-01,20221010 |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  google.protobuf.Timestamp begin_date = 1 [(tableau.field) = {name:"BeginDate"}];
  google.protobuf.Timestamp end_date = 2 [(tableau.field) = {name:"EndDate"}];
  repeated google.protobuf.Timestamp date_list = 3 [(tableau.field) = {name:"Date" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "beginDate": "2019-12-31T16:00:00Z",
    "endDate": "2022-10-09T16:00:00Z",
    "dateList": [
        "2019-12-31T16:00:00Z",
        "2022-10-09T16:00:00Z"
    ]
}
```

{{< /details >}}

### Time

> See [Basics: Datetime →]({{< relref "../basics/wellknown-types/#datetime" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| BeginTime  | EndTime  | Time          |
| ---------- | -------- | ------------- |
| time       | time     | []time        |
| Begin time | End time | Time          |
| 10:25:00   | 1125     | 10:25:00,1125 |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  google.protobuf.Duration begin_time = 1 [(tableau.field) = {name:"BeginTime"}];
  google.protobuf.Duration end_time = 2 [(tableau.field) = {name:"EndTime"}];
  repeated google.protobuf.Duration time_list = 3 [(tableau.field) = {name:"Time" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "beginTime": "37500s",
    "endTime": "41100s",
    "timeList": [
        "37500s",
        "41100s"
    ]
}
```

{{< /details >}}

## Duration

> See [Basics: Duration →]({{< relref "../basics/wellknown-types/#duration" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| Duration1  | Duration2  | Duration         |
| ---------- | ---------- | ---------------- |
| duration   | duration   | []duration       |
| Duration 1 | Duration 2 | Duration         |
| 1h2m3s     | 4ms5us6ns  | 1h2m3s,4ms5us6ns |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  google.protobuf.Duration duration_1 = 1 [(tableau.field) = {name:"Duration1"}];
  google.protobuf.Duration duration_2 = 2 [(tableau.field) = {name:"Duration2"}];
  repeated google.protobuf.Duration duration_list = 3 [(tableau.field) = {name:"Duration" layout:LAYOUT_INCELL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "duration1": "3723s",
    "duration2": "0.004005006s",
    "durationList": [
        "3723s",
        "0.004005006s"
    ]
}
```

{{< /details >}}

## Fraction

> See [Basics: Fraction →]({{< relref "../basics/wellknown-types/#fraction" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| MinRatio  | Ratio1     | Ratio2   | Ratio3   | Ratio4   |
| --------- | ---------- | -------- | -------- | -------- |
| fraction  | []fraction | fraction | fraction | fraction |
| min ratio | ratio1     | ratio 2  | ratio 3  | ratio 4  |
| 1/4       | 10%        | 10‰      | 10‱      | 10       |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  tableau.Fraction min_ratio = 1 [(tableau.field) = {name:"MinRatio"}];
  repeated tableau.Fraction ratio_list = 2 [(tableau.field) = {name:"Ratio" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "minRatio": {
        "num": 1,
        "den": 4
    },
    "ratioList": [
        {
            "num": 10,
            "den": 100
        },
        {
            "num": 10,
            "den": 1000
        },
        {
            "num": 10,
            "den": 10000
        },
        {
            "num": 10,
            "den": 1
        }
    ]
}
```

{{< /details >}}

## Comparator

> See [Basics: Comparator →]({{< relref "../basics/wellknown-types/#comparator" >}})

A worksheet `ItemConf` in *HelloWorld.xlsx*:

{{< spreadsheet "HelloWorld.xlsx" ItemConf "@TABLEAU" >}}

{{< sheet colored>}}

| MinRatio   | Ratio1       | Ratio2     | Ratio3     | Ratio4     | Ratio5     |
| ---------- | ------------ | ---------- | ---------- | ---------- | ---------- |
| comparator | []comparator | comparator | comparator | comparator | comparator |
| min ratio  | ratio1       | ratio 2    | ratio 3    | ratio 4    | ratio 5    |
| !=1/4      | <10%         | <=10‰      | >10‱       | >=10       | ==3/5      |

{{< /sheet >}}

{{< sheet >}}

|     |     |     |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

{{< /sheet >}}

{{< /spreadsheet >}}

Generated:

{{< details "hello_world.proto" open >}}

```protobuf
// --snip--
option (tableau.workbook) = {name:"HelloWorld.xlsx"};

message ItemConf {
  option (tableau.worksheet) = {name:"ItemConf" namerow:1 typerow:2 noterow:3 datarow:4};

  tableau.Comparator min_ratio = 1 [(tableau.field) = {name:"MinRatio"}];
  repeated tableau.Comparator ratio_list = 2 [(tableau.field) = {name:"Ratio" layout:LAYOUT_HORIZONTAL}];
}
```

{{< /details >}}

{{< details "ItemConf.json" >}}

```json
{
    "minRatio": {
        "sign": "SIGN_NOT_EQUAL",
        "value": {
            "num": 1,
            "den": 4
        }
    },
    "ratioList": [
        {
            "sign": "SIGN_LESS",
            "value": {
                "num": 10,
                "den": 100
            }
        },
        {
            "sign": "SIGN_LESS_OR_EQUAL",
            "value": {
                "num": 10,
                "den": 1000
            }
        },
        {
            "sign": "SIGN_GREATER",
            "value": {
                "num": 10,
                "den": 10000
            }
        },
        {
            "sign": "SIGN_GREATER_OR_EQUAL",
            "value": {
                "num": 10,
                "den": 1
            }
        },
        {
            "sign": "SIGN_EQUAL",
            "value": {
                "num": 3,
                "den": 5
            }
        }
    ]
}
```

{{< /details >}}
