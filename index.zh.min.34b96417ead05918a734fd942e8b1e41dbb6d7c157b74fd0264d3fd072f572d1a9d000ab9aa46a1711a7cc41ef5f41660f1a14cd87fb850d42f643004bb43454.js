document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=document.getElementById("suggestions");if(!s)return;const o=document.getElementById("search-modal"),i=!o||!o.classList.contains("show");if(i)return;const t=[...s.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var n=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description","content"],index:["title","description","content"]}});n.add({id:0,href:"/zh/docs/api/checker/guide/#生成脚手架代码",title:"指南 / 生成脚手架代码 ",description:"Go checker 使用指南。",content:` 例如，protobuf message ItemConf 生成的 *.check.go 文件内容如下：
`}).add({id:1,href:"/zh/docs/api/checker/guide/#插件protoc-gen-go-tableau-checker",title:"指南 / 插件：protoc-gen-go-tableau-checker ",description:"Go checker 使用指南。",content:` 使用此 protoc 插件的示例： checker/test/gen.sh。
`}).add({id:2,href:"/zh/docs/api/checker/guide/#完整示例",title:"指南 / 完整示例 ",description:"Go checker 使用指南。",content:` 参考 go-tableau-checker。
`}).add({id:3,href:"/zh/docs/help/",title:"帮助",description:"Help Doks.",content:""}).add({id:4,href:"/zh/docs/help/how-to-update/#tableauc",title:"如何更新 / tableauc ",description:"Regularly update the installed toolchain to keep your tableau stable, usable, and secure.",content:` TODO &hellip;
`}).add({id:5,href:"/zh/docs/help/troubleshooting/#错误码索引",title:"疑难解答 / 错误码索引 ",description:"常见问题的解决方案。",content:` tableauc 报错时，错误信息都会带有稳定的错误码（如 E2023）。本页按照组件 分类列出常见错误码，并说明排查方向。
区间 组件 E0001..E0999 common（工作簿/工作表/列等基础检查） E1000..E1999 protogen（proto 生成） E2000..E2999 confgen（配置解析与校验） E3000..E3999 importer（工作簿发现与读取） `}).add({id:6,href:"/zh/docs/help/troubleshooting/#commone0xxx",title:"疑难解答 / Common（E0xxx） ",description:"常见问题的解决方案。",content:` E0001：sheet not found in book # tableau.worksheet.name 或工作表指示器 Book#Sheet 所指定的工作表在工作簿 中不存在。请确认工作簿文件、工作表名（区分大小写）。
E0002：cannot unmarshal file content to given proto.Message # 文件内容无法解析为目标 message。请确认文件格式（JSON/Text/Bin）与 conf.output.formats 配置一致，并且 proto schema 已更新。
E0003：列名重复 # 同一行中存在两列被生成出相同的列名。请重命名其中一列以保证唯一性。
`}).add({id:7,href:"/zh/docs/help/troubleshooting/#confgene2xxx",title:"疑难解答 / Confgen（E2xxx） ",description:"常见问题的解决方案。",content:` E2000：整数溢出 # 单元格值超出目标整数类型（如 uint32）的可表示范围。请改用更宽的类型或调整值。
E2001：字段属性 refer 配置不正确 # refer:&quot;SheetName(SheetAlias).ColumnName&quot; 无法解析到任何已知工作表。 若使用 sheet 别名，请确保别名与生成的 message 名一致。
E2002：字段值不在引用的值空间中 # 单元格值不在被引用列的值空间内。请确保被引用工作表在引用方之前完成生成。
E2003：非法的序列号 # 值不满足 prop:{sequence:N}。序列必须从 N 开始，按 1 单调递增。
E2004：值超出范围 # 值违反 prop:{range:&quot;left,right&quot;}。两端均为闭区间。
E2005：map key 不唯一 # 映射出现了重复的键。请删除重复行/列；若是有意通过同一键进行行/列合并， 请确保所有被合并的行/列在非集合字段上取值一致（参见 E2023），或对集合字段使用 prop:{aggregate:true} 进行跨行/跨列聚合（此时父映射的键字段还需配 prop:{unique:false}）。
注：键控列表元素重复改由 E2028 报出。
E2006：枚举值未在枚举类型中定义 # 单元格值既不是已定义的枚举数值、名称，也不是别名。请补全枚举定义或修正单元格值。
E2007：日期时间(datetime)格式无效 # 请使用 yyyy-MM-dd HH:mm:ss 或 RFC3339，如 2020-01-01 01:00:00、 2020-01-01T01:00:00+08:00。
E2008：时间段(duration)格式无效 # 请使用 Go duration 格式，如 72h3m0.5s。
E2009：合表时不同 sheet 出现重复 key # 合表时不同工作表不允许配置相同键。
E2010：union 类型缺少对应的 value 字段 # 联合体类型值找不到对应 field number 的 value 字段，请将 value 字段绑定到该联合体 类型。
E2011：present 字段未显式填写 # prop:{present:true} 要求单元格必须显式填写。
E2012：数值语法不合法 # 单元格无法按声明的数值类型解析。请检查多余字符、千分位分隔符或空单元格。
E2013：布尔值语法不合法 # 可用值：1, t, T, TRUE, true, True, 0, f, F, FALSE, false, False。
E2014：未找到工作表的列 # 工作表缺少必需的列。请补齐该列；若 schema 允许缺失，可设置 prop:{optional:true}。
E2015：未找到引用的列 # refer 指定的列在被引用工作表中不存在。
E2016：list 元素未连续出现 # 水平列表一旦出现首个空元素，后续所有元素也必须为空。请将数据紧凑排列或补齐。
E2017：map 包含多个空 key # 映射不允许多个空键。如确需多个零值键，请显式填充。
E2018：map key 字段缺失 # 映射元素缺少键子字段，请补齐键列/单元格。
E2019：分数模式无效 # 支持的形式：0.5、5、5/6、10%、10‰、10‱。
E2020：比较式模式无效 # 支持的形式：==5、!=5、&lt;3/5、&lt;=10%、&gt;10‰、&gt;=10‱。
E2021：枚举值别名重复 # 同一枚举类型中出现重复的别名，请保证别名在枚举内唯一。
E2022：map value 或 list element 子字段值不唯一 # 被标记 prop:{unique:true} 的标量子字段在映射值/列表元素中 出现了重复值。
E2023：字段值跨行或列冲突 # 当同一父记录被多行（垂直）或多列（水平）重复访问时，tableau 默认要求所有 非集合字段（标量/结构体/联合体）以及未开启聚合的列表/映射字段在每次访问中 取值完全一致。两种解决方法：
修改数据，让所有被合并的行/列在该字段上保持一致；或 若该字段本意就是跨行/跨列累加的列表/映射（无论是 LAYOUT_INCELL 还是 LAYOUT_HORIZONTAL），请设置 prop:{aggregate:true}。 E2024：版本号模式无效 # 版本号必须为点分十进制：&lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;[.&lt;OTHER&gt;]...。
E2025：版本号与模式不匹配 # 输入版本号不符合配置的模式，或某段超出位上限。
E2026：值序非法 # 值序违反 prop:{order:...}（ORDER_ASC、ORDER_DESC、ORDER_STRICTLY_ASC、 ORDER_STRICTLY_DESC）。
E2027：protovalidate 校验失败 # protovalidate 的 validate / validate_complex / validate_message 规则未通过。错误信息中会附带具体 的违规值和未满足的规则。
E2028：keyed-list 元素重复 # 键控列表（[]&lt;T&gt; 语法，会自动设置字段 key）出现了重复元素：
标量/枚举键控列表：元素本身即键。 结构体键控列表：仅比较通过 key 配置的子字段。 触发场景：
单元格内键控列表：单个单元格内出现重复元素。 水平/垂直 键控列表在开启 prop:{aggregate:true} 跨行/跨列聚合时，聚合后的元素出现重复。 `}).add({id:8,href:"/zh/docs/help/troubleshooting/#importere3xxx",title:"疑难解答 / Importer（E3xxx） ",description:"常见问题的解决方案。",content:` E3000：未匹配到工作簿文件 # 工作表指示器 &lt;BookNamePattern&gt;[#SheetNamePattern] 未匹配到任何文件。请检查 indir 与通配符。
E3001：工作簿中无对应工作表 # 匹配到的工作簿中找不到指定 sheet。
E3002：文件打开失败 # 操作系统层面的文件打开错误（不存在、权限不足、被占用等）。
E3003：CSV 工作簿通配符无匹配 # CSV 工作簿通配符没有匹配到任何文件。请检查通配符与工作目录。
`}).add({id:9,href:"/zh/docs/help/troubleshooting/#升级-tableauc-配置时遇到的问题",title:"疑难解答 / 升级 tableauc 配置时遇到的问题 ",description:"常见问题的解决方案。",content:` TODO &hellip;
`}).add({id:10,href:"/zh/docs/help/troubleshooting/#加载器相关问题",title:"疑难解答 / 加载器相关问题 ",description:"常见问题的解决方案。",content:` TODO &hellip;
`}).add({id:11,href:"/zh/docs/help/faq/#问题-1-",title:"常见问题 / 问题 1 ? ",description:"常见问题答疑。",content:` TODO &hellip;
`}).add({id:12,href:"/zh/docs/design/",title:"设计",description:"Tableau 设计文档。",content:""}).add({id:13,href:"/zh/docs/api/",title:"API",description:"API 使用指南。",content:""}).add({id:14,href:"/zh/docs/design/overview/#特性",title:"概览 / 特性 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 将 Excel/CSV/XML/YAML 转换为 JSON/Text/Bin。 使用 Protobuf 定义 Excel/CSV/XML/YAML 的结构。 使用 Golang 开发转换引擎。 得益于 Protobuf (proto3)，支持多种编程语言。 "}).add({id:15,href:"/zh/docs/design/overview/#概念",title:"概览 / 概念 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" Importer（导入器）： 将 Excel/CSV 文件导入为内存中的 Table 工作表集合。 将 XML/YAML 文件导入为内存中的 Document 工作表集合。 Parsers（解析器）： protogen：将 Excel/CSV/XML/YAML 文件转换为 Protoconf 文件。 confgen：将 Excel/CSV/XML/YAML 与 Protoconf 文件一起转换为 JSON/Text/Bin 文件。 Exporter（导出器）： protogen：将 tableau.Workbook 导出为 proto 文件。 confgen：将 protobuf message 导出为 JSON/Text/Bin 文件。 Protoconf：Protocol Buffers (proto3) 的一种方言，通过 tableau options 进行扩展，用于描述 Excel/CSV/XML/YAML 的结构。 "}).add({id:16,href:"/zh/docs/design/overview/#工作流程",title:"概览 / 工作流程 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:`

`}).add({id:17,href:"/zh/docs/design/overview/#类型",title:"概览 / 类型 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" Scalar（标量） Message（struct，消息） List（列表） Map（无序映射） Timestamp（时间戳） Duration（时长） "}).add({id:18,href:"/zh/docs/design/overview/#todo",title:"概览 / TODO ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:`
`}).add({id:19,href:"/zh/docs/design/overview/#protoc-插件",title:"概览 / protoc 插件 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" Golang C++ C#/.NET Python Lua Javascript/Typescript/Node Java "}).add({id:20,href:"/zh/docs/design/overview/#metadata",title:"概览 / Metadata ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:` metatable：描述工作表元数据的 message。 metafield：描述 caption 元数据的 message。 captrow：caption 行，工作表中 caption 所在的精确行号。caption 中允许换行以提高可读性，转换时会被去除。 descrow：description 行，工作表中描述所在的精确行号。 datarow：data 行，数据的起始行号。 主流操作系统中的换行符：
操作系统 缩写 转义序列 Unix (linux, OS X) LF \\n Microsoft Windows CRLF \\r\\n classic Mac OS/OS X CR \\r LF：Line Feed（换行），CR：Carriage Return（回车）。
`}).add({id:21,href:"/zh/docs/design/overview/#generator",title:"概览 / Generator ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 通过 Excel（表头）生成 protoconf：Excel -&gt; protoconf 通过 protoconf 生成 Excel（表头）：protoconf -&gt; Excel "}).add({id:22,href:"/zh/docs/design/overview/#conversion",title:"概览 / Conversion ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" Excel -&gt; JSON（默认格式，人类可读） Excel -&gt; protowire（体积小） Excel -&gt; prototext（人类调试用） JSON -&gt; Excel protowire -&gt; Excel prototext -&gt; Excel "}).add({id:23,href:"/zh/docs/design/overview/#pretty-print",title:"概览 / Pretty Print ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" Multiline：每个文本元素单独一行 Indent：4 个空格字符 JSON 支持 prototext 支持 "}).add({id:24,href:"/zh/docs/design/overview/#emitunpopulated",title:"概览 / EmitUnpopulated ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" JSON：EmitUnpopulated 指定是否输出未填充的字段。 "}).add({id:25,href:"/zh/docs/design/overview/#标量类型",title:"概览 / 标量类型 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 整数：int32、uint32、int64 和 uint64 浮点数：float 和 double bool string bytes datetime、date、time、duration "}).add({id:26,href:"/zh/docs/design/overview/#枚举",title:"概览 / 枚举 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" enum：解析器接受三种枚举值形式： 枚举值编号 枚举值名称 枚举值别名（通过 EnumValueOptions 指定） enum：校验枚举值。 "}).add({id:27,href:"/zh/docs/design/overview/#复合类型",title:"概览 / 复合类型 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" message：水平（行方向）布局，字段位于单元格中。 message：简单 in-cell message，每个字段必须是标量类型。以逗号分隔的字段列表，例如：1,test,3.0。列表大小无需与字段数相等，字段按顺序填充，未配置的字段使用标量类型的默认值。 list：水平（行方向）布局，这是 list 的默认布局，每个元素可以是 message 或标量。 list：垂直（列方向）布局，每个元素应为 message。 list：简单 in-cell list，元素必须是标量类型。以逗号分隔的元素列表，例如：1,2,3。 list：可扩展或动态大小。 list：智能识别任意位置的空元素。 map：水平（行方向）布局。 map：垂直（列方向）布局，这是 map 的默认布局。 map：无序 map 或 hash map。 map：简单 in-cell map，key 和 value 都必须是标量类型。以逗号分隔的 key:value 对列表，例如：1:10,2:20,3:30。 map：可扩展或动态大小。 map：智能识别任意位置的空值。 nesting：message、list 和 map 的无限嵌套。 "}).add({id:28,href:"/zh/docs/design/overview/#默认值",title:"概览 / 默认值 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:` 每种标量类型的默认值与 protobuf 相同。
整数：0 浮点数：0.0 bool：false string：&quot;&quot; bytes：&quot;&quot; in-cell message：每个字段的默认值与 protobuf 相同 in-cell list：元素的默认值与 protobuf 相同 in-cell map：key 和 value 的默认值与 protobuf 相同 message：所有字段均有默认值 `}).add({id:29,href:"/zh/docs/design/overview/#空值",title:"概览 / 空值 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" scalar：默认值与 protobuf 相同。 message：若所有字段均为空，则不会生成该 message。 list：若 list 大小为 0，则不会生成该 list。 list：若 list 的元素（message 类型）为空，则不会追加该元素。 map：若 map 大小为 0，则不会生成该 map。 map：若 map 的 value（message 类型）为空，则不会插入该条目。 nesting：递归地判断是否为空。 "}).add({id:30,href:"/zh/docs/design/overview/#合并",title:"概览 / 合并 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 合并具有相同工作表名称的多个工作簿 合并同一工作簿中的多个工作表 "}).add({id:31,href:"/zh/docs/design/overview/#workbook-meta",title:"概览 / Workbook meta ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:` workbook meta sheet @TABLEAU：
指定要解析的工作表 为每个工作表指定解析器选项 Sheet Alias Nameline Typeline Sheet1 ExchangeInfo 2 2 `}).add({id:32,href:"/zh/docs/design/overview/#datetime",title:"概览 / Datetime ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:` 使用 RFC 3339，遵循 ISO 8601。
Timestamp：基于 google.protobuf.Timestamp，参考 JSON 映射 Timezone：参考 ParseInLocation Datetime：Excel 格式：yyyy-MM-dd HH:mm:ss，例如：2020-01-01 05:10:00 Date：Excel 格式：yyyy-MM-dd 或 yyyyMMdd，例如：2020-01-01 或 20200101 Time：Excel 格式：HH:mm:ss 或 HHmmss，例如：05:10:00 或 051000 Duration：基于 google.protobuf.Duration，参考 JSON 映射 Duration：Excel 格式：&quot;72h3m0.5s&quot; 形式，参考 golang duration 字符串格式 `}).add({id:33,href:"/zh/docs/design/overview/#transpose",title:"概览 / Transpose ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 对工作表进行行列转置。 "}).add({id:34,href:"/zh/docs/design/overview/#校验",title:"概览 / 校验 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" unique：检查 map key 的唯一性。 range：[left,right]。 refer：XXXConf.ID。待 tableauio/loader 支持。 "}).add({id:35,href:"/zh/docs/design/overview/#错误信息",title:"概览 / 错误信息 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 转换失败时报告清晰精确的错误信息，参考编程语言编译器的做法 使用 golang template 定义错误信息模板 多语言支持，重点支持英文和简体中文 "}).add({id:36,href:"/zh/docs/design/overview/#性能",title:"概览 / 性能 ",description:"Tableau 是一款基于 Protobuf (proto3) 的强大配置转换器。",content:" 压力测试 每个 goroutine 处理一个工作表 多进程模型 "}).add({id:37,href:"/zh/docs/design/metadata/#符号说明",title:"Metadata / 符号说明 ",description:"一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。",content:` 语法使用扩展巴科斯-瑙尔范式（EBNF）描述。
`}).add({id:38,href:"/zh/docs/design/metadata/#workbook---protoconf",title:"Metadata / Workbook -&gt; Protoconf ",description:"一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。",content:`
`}).add({id:39,href:"/zh/docs/design/metadata/#基础",title:"Metadata / 基础 ",description:"一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。",content:` workbook：(AliasTest)DemoTest，worksheet：(AliasActivity)DemoActivity
protoconf 文件名为 alias_test.proto。若无 ()，则名称为 demo_test.proto 配置 message 名称为 AliasActivity。若无 ()，则名称为 DemoActivity list：[ELEM-TYPE]COLUMN-TYPE，COLUMN-TYPE 为列类型，ELEM-TYPE 为 message 名称和 list 前缀（不得与 protobuf 关键字冲突）。 map：map&lt;KEY-TYPE,VALUE-TYPE&gt;，KEY-TYPE 必须为标量类型，VALUE-TYPE 为 message 名称和 map 前缀（不得与内置标量类型冲突）。 导入 message 类型：.TYPE，例如：.Item 表示已在同一 protobuf package 中定义的 message Item，不应重新定义。 wellknown 类型 Timestamp：google.protobuf.Timestamp Duration：google.protobuf.Duration Activity.xlsx&nbsp; Activity @TABLEAU ActivityID ActivityName ActivityBeginTime ActivityDuration ChapterID ChapterName SectionID SectionName SectionItem1Id SectionItem1Num SectionItem2Id SectionItem2Num map&lt;uint32,Activity&gt; string timestamp duration map&lt;uint32,Chapter&gt; string [Section]uint32 int32 [.Item]int32 int32 int32 int32 1 activity1 2020-01-01 05:00:00 72h 1 chapter1 1 section1 1001 1 1002 2 1 activity1 2020-01-01 05:00:00 72h 1 chapter1 2 section2 1001 1 1002 2 1 activity1 2020-01-01 05:00:00 72h 2 chapter2 1 section1 1001 1 1002 2 2 activity2 2020-01-01 05:00:00 72h3m0.5s 1 chapter1 1 section1 1001 1 1002 2 不带前缀的输出 # 带前缀的输出 # `}).add({id:40,href:"/zh/docs/design/metadata/#incell",title:"Metadata / Incell ",description:"一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。",content:` workbook：(AliasTest)DemoTest，worksheet：(Env)Environment
ID Name IncellMessage IncellList IncellMap IncellMessageList IncellMessageMap uint32 string {int32 id,string desc,int32 value}Msg []int32 map&lt;int32,string&gt; []{int32 id,string desc}Elem map&lt;int32,Value{int32 id,string desc}&gt; 1 Earth 1,desc,100 1,2,3 1:hello,2:world {1,hello},{2,world} 1:{1,hello},2:{2,world} --break-me-here--
IncellMessage # 语法：TODO: EBNF 类型：message 类型 值：逗号分隔的字段值，例如：1,desc,100
IncellList # 语法：[]Type 类型：任意标量类型 值：逗号分隔的列表元素，例如：1,2,3
IncellMap # 语法：map&lt;Type,Type&gt; 类型：任意标量类型 值：逗号分隔的 key-value 对，key 和 value 用冒号分隔，例如：1:hello,2:world
IncellMessageList # TODO&hellip;
IncellMessageMap # TODO&hellip;
输出 # `}).add({id:41,href:"/zh/docs/design/metadata/#protoconf---workbook",title:"Metadata / Protoconf -&gt; Workbook ",description:"一种名为 Protoconf 的 IDL，基于 Protobuf 描述配置的结构（元数据）。",content:` TODO&hellip;
`}).add({id:42,href:"/zh/docs/api/tableau/",title:"Tableau",description:"Tableau 使用指南。",content:""}).add({id:43,href:"/zh/docs/api/loader/",title:"Loader",description:"Loader 使用指南。",content:""}).add({id:44,href:"/zh/docs/api/loader/overview/#支持的-api",title:"概览 / 支持的 API ",description:"Tableau loader API 概览。",content:" 语言 Map OrderedMap Index OrderedIndex C++ ✔️ ✔️ ✔️ ✔️ Go ✔️ ✔️ ✔️ ✔️ C# TypeScript Lua "}).add({id:45,href:"/zh/docs/api/loader/cpp/#api",title:"C++ / API ",description:"C++ loader 使用指南。",content:`
`}).add({id:46,href:"/zh/docs/api/loader/cpp/#data",title:"C++ / Data ",description:"C++ loader 使用指南。",content:` const ProtobufMessage&amp; Data() const
获取内部 protobuf message 数据。
`}).add({id:47,href:"/zh/docs/api/loader/cpp/#map",title:"C++ / Map ",description:"C++ loader 使用指南。",content:` const MapValueType* Get(KEY1 k1, KEY2 k2...) const
获取第 N 层 map 的值。找不到 key 时返回 nullptr。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:48,href:"/zh/docs/api/loader/cpp/#orderedmap",title:"C++ / OrderedMap ",description:"C++ loader 使用指南。",content:` 前提条件：需要在元表中将 OrderedMap 选项设置为 true。
参考 元表选项：OrderedMap。
const OrderedMapMap* GetOrderedMap() const：获取整个有序 map。 const OrderedMapValueType* GetOrderedMap(KEY1 k1) const：获取第 2 层有序 map 的值。找不到 key 时返回 nullptr。 获取第 N 层有序 map 的值。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:49,href:"/zh/docs/api/loader/cpp/#index",title:"C++ / Index ",description:"C++ loader 使用指南。",content:` 前提条件：需要在元表中适当设置 Index 选项。
参考 元表选项：Index。
如果 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
const Index_ChapterMap&amp; FindChapterMap() const：获取整个 hash map。 const vector&lt;ParentType&gt;* FindChapter(KEY1 k1, KEY2 k2...) const：按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。 const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const：按 key 查找第一个值，找不到时返回 nullptr。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
const Index_ChapterMap* FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...) const：获取限定在指定上层 map key 范围内的整个 hash map。 const vector&lt;ParentType&gt;* FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。 const ParentType* FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const：在指定上层 map 范围内按 key 查找第一个匹配值，找不到时返回 nullptr。 `}).add({id:50,href:"/zh/docs/api/loader/cpp/#orderedindex",title:"C++ / OrderedIndex ",description:"C++ loader 使用指南。",content:` 前提条件：需要在元表中适当设置 OrderedIndex 选项。
参考 元表选项：OrderedIndex。
如果有序 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
const OrderedIndex_ChapterMap&amp; FindChapterMap() const：获取整个有序 map。 const vector&lt;ParentType&gt;* FindChapter(KEY1 k1, KEY2 k2...) const：按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。 const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const：按 key 查找第一个值，找不到时返回 nullptr。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
const OrderedIndex_ChapterMap* FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...) const：获取限定在指定上层 map key 范围内的整个有序 map。 const vector&lt;ParentType&gt;* FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 vector 形式返回。 const ParentType* FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...) const：在指定上层 map 范围内按 key 查找第一个匹配值，找不到时返回 nullptr。 `}).add({id:51,href:"/zh/docs/api/loader/cpp/#自定义-messager",title:"C++ / 自定义 messager ",description:"C++ loader 使用指南。",content:` 如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。
示例：cpp-tableau-loader/hub/custom
custom_xxx_conf.h：
custom_xxx_conf.cpp：
`}).add({id:52,href:"/zh/docs/api/loader/cpp/#插件protoc-gen-cpp-tableau-loader",title:"C++ / 插件：protoc-gen-cpp-tableau-loader ",description:"C++ loader 使用指南。",content:` 使用此 protoc 插件的示例： cpp-tableau-loader/gen.sh。
`}).add({id:53,href:"/zh/docs/api/loader/cpp/#完整示例",title:"C++ / 完整示例 ",description:"C++ loader 使用指南。",content:` 参考 cpp-tableau-loader。
`}).add({id:54,href:"/zh/docs/api/loader/go/#api",title:"Go / API ",description:"Go loader 使用指南。",content:`
`}).add({id:55,href:"/zh/docs/api/loader/go/#data",title:"Go / Data ",description:"Go loader 使用指南。",content:` func Data() *ProtobufMessage
获取内部 protobuf message 数据。
`}).add({id:56,href:"/zh/docs/api/loader/go/#map",title:"Go / Map ",description:"Go loader 使用指南。",content:` func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)
获取第 N 层 map 的值。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:57,href:"/zh/docs/api/loader/go/#orderedmap",title:"Go / OrderedMap ",description:"Go loader 使用指南。",content:` 前置条件：需要在元表中将 OrderedMap 选项设置为 true。
参考 元表选项：OrderedMap。
func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)
获取第 N 层有序 map 的值。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:58,href:"/zh/docs/api/loader/go/#index",title:"Go / Index ",description:"Go loader 使用指南。",content:` 前置条件：需要在元表中适当设置 Index 选项。
参考 元表选项：Index。
若 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
func FindChapterMap() *Index_ChapterMap：获取整个 hash map。 func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType：按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。 func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType：按 key 查找第一个值。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *Index_ChapterMap：获取限定在指定上层 map key 范围内的整个 hash map。 func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。 func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType：在指定上层 map 范围内按 key 查找第一个匹配值。 `}).add({id:59,href:"/zh/docs/api/loader/go/#orderedindex",title:"Go / OrderedIndex ",description:"Go loader 使用指南。",content:` 前置条件：需要在元表中适当设置 OrderedIndex 选项。
参考 元表选项：OrderedIndex。
若有序 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
func FindChapterMap() *OrderedIndex_ChapterMap：获取整个有序 map。 func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType：按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。 func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType：按 key 查找第一个值。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
func FindChapterMapN(mapKey1 MapKey1Type, mapKey2 MapKey2Type...) *OrderedIndex_ChapterMap：获取限定在指定上层 map key 范围内的整个有序 map。 func FindChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) []*ParentType：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 slice 形式返回。 func FindFirstChapterN(mapKey1 MapKey1Type, mapKey2 MapKey2Type..., k1 KEY1, k2 KEY2...) *ParentType：在指定上层 map 范围内按 key 查找第一个匹配值。 `}).add({id:60,href:"/zh/docs/api/loader/go/#自定义-messager",title:"Go / 自定义 messager ",description:"Go loader 使用指南。",content:` 如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。
示例：go-tableau-loader/customconf
custom_xxx_conf.go：
`}).add({id:61,href:"/zh/docs/api/loader/go/#插件protoc-gen-go-tableau-loader",title:"Go / 插件：protoc-gen-go-tableau-loader ",description:"Go loader 使用指南。",content:` 使用此 protoc 插件的示例： go-tableau-loader/gen.sh。
`}).add({id:62,href:"/zh/docs/api/loader/go/#完整示例",title:"Go / 完整示例 ",description:"Go loader 使用指南。",content:` 参考 go-tableau-loader。
`}).add({id:63,href:"/zh/docs/api/loader/csharp/#api",title:"C# / API ",description:"C# loader 使用指南。",content:`
`}).add({id:64,href:"/zh/docs/api/loader/csharp/#data",title:"C# / Data ",description:"C# loader 使用指南。",content:` public ref readonly ProtobufMessage Data()
获取内部 protobuf message 数据。
`}).add({id:65,href:"/zh/docs/api/loader/csharp/#map",title:"C# / Map ",description:"C# loader 使用指南。",content:` public MapValueType? Get1(KEY1 k1)：获取第 1 层 map 的值。找不到 key 时返回 null。 public MapValueType? Get2(KEY1 k1, KEY2 k2)：获取第 2 层 map 的值。找不到 key 时返回 null。 &hellip; 获取第 N 层 map 的值。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:66,href:"/zh/docs/api/loader/csharp/#orderedmap",title:"C# / OrderedMap ",description:"C# loader 使用指南。",content:` 前提条件：需要在元表中将 OrderedMap 选项设置为 true。
参考 元表选项：OrderedMap。
public ref readonly OrderedMapMap GetOrderedMap()：获取整个有序 map。 public OrderedMapValueType? GetOrderedMap1(KEY1 k1)：获取第 1 层有序 map 的值。找不到 key 时返回 null。 &hellip; 获取第 N 层有序 map 的值。注意：仅适用于每层 message 的第一个 map 字段。
`}).add({id:67,href:"/zh/docs/api/loader/csharp/#index",title:"C# / Index ",description:"C# loader 使用指南。",content:` 前提条件：需要在元表中适当设置 Index 选项。
参考 元表选项：Index。
如果 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
public ref readonly Index_ChapterMap FindChapterMap()：获取整个 hash map。 public List&lt;ParentType&gt;? FindChapter(KEY1 k1, KEY2 k2...)：按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。 public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)：按 key 查找第一个值，找不到时返回 null。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
public Index_ChapterMap? FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...)：获取限定在指定上层 map key 范围内的整个 hash map。 public List&lt;ParentType&gt;? FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...)：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。 public ParentType? FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...)：在指定上层 map 范围内按 key 查找第一个匹配值，找不到时返回 null。 `}).add({id:68,href:"/zh/docs/api/loader/csharp/#orderedindex",title:"C# / OrderedIndex ",description:"C# loader 使用指南。",content:` 前提条件：需要在元表中适当设置 OrderedIndex 选项。
参考 元表选项：OrderedIndex。
如果有序 index 名称为 Chapter，且被索引的 key 为 k1, k2 ...，则访问器为：
public ref readonly OrderedIndex_ChapterMap FindChapterMap()：获取整个有序 map。 public List&lt;ParentType&gt;? FindChapter(KEY1 k1, KEY2 k2...)：按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。 public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...)：按 key 查找第一个值，找不到时返回 null。 若被索引的 struct 嵌套在上层 map 容器中，则会为每个上层 map 生成额外的 API，以支持快速范围查找。此处 N 表示第 N 层上层 map（例如，1 表示直接父级 map，2 表示祖父级 map，以此类推）。
public OrderedIndex_ChapterMap? FindChapterMapN(MapKey1Type mapKey1, MapKey2Type mapKey2...)：获取限定在指定上层 map key 范围内的整个有序 map。 public List&lt;ParentType&gt;? FindChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...)：在指定上层 map 范围内按 key 查找值。一个 key 可能对应多个值，以 list 形式返回。 public ParentType? FindFirstChapterN(MapKey1Type mapKey1, MapKey2Type mapKey2..., KEY1 k1, KEY2 k2...)：在指定上层 map 范围内按 key 查找第一个匹配值，找不到时返回 null。 `}).add({id:69,href:"/zh/docs/api/loader/csharp/#自定义-messager",title:"C# / 自定义 messager ",description:"C# loader 使用指南。",content:` 如果内置 API 不能满足业务逻辑需求，可以添加自定义 messager，在其中编写基于已加载配置对象的预处理逻辑。
示例：csharp-tableau-loader/hub/custom
CustomXXXConf.cs：
在初始化代码中注册：
`}).add({id:70,href:"/zh/docs/api/loader/csharp/#插件protoc-gen-csharp-tableau-loader",title:"C# / 插件：protoc-gen-csharp-tableau-loader ",description:"C# loader 使用指南。",content:` 使用此 protoc 插件的示例： csharp-tableau-loader/gen.sh。
`}).add({id:71,href:"/zh/docs/api/loader/csharp/#完整示例",title:"C# / 完整示例 ",description:"C# loader 使用指南。",content:` 参考 csharp-tableau-loader。
`}).add({id:72,href:"/zh/docs/api/loader/ts/#概述",title:"TypeScript / 概述 ",description:"TypeScript loader 使用指南。",content:` TODO：参考 Tableau loader。
`}).add({id:73,href:"/zh/docs/api/loader/lua/#概述",title:"Lua / 概述 ",description:"Lua loader 使用指南。",content:` TODO：参考 Tableau loader。
`}).add({id:74,href:"/zh/docs/api/checker/",title:"Checker",description:"Checker 使用指南。",content:""}).add({id:75,href:"/zh/docs/yaml/",title:"YAML",description:"YAML 使用指南。",content:""}).add({id:76,href:"/zh/docs/yaml/scalar/#标量scalar",title:"标量（Scalar） / 标量（Scalar） ",description:"YAML scalar 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:77,href:"/zh/docs/yaml/scalar/#字段注释note",title:"标量（Scalar） / 字段注释（Note） ",description:"YAML scalar 使用指南。",content:` 自 v0.16.2 起，写在 schema 字段上的 # 注释会被提取为生成 proto 文件中对应字段的注释。可以写成同一行的行尾注释，也可以写成字段正上方独立一行的注释。
生成结果：
hello_world.proto `}).add({id:78,href:"/zh/docs/yaml/enum/#使用预定义枚举类型",title:"枚举（Enum） / 使用预定义枚举类型 ",description:"YAML enum 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:79,href:"/zh/docs/api/tableau/guide/#前置条件",title:"指南 / 前置条件 ",description:"Tableau Go API 使用指南。",content:` Go，任意最新三个主要版本之一，参考 Go 发布记录。 安装说明请参考 Go 的 Getting Started 指南。 Protocol buffer 编译器 protoc，版本 3。 安装说明请参考 Protocol Buffer Compiler Installation。 协议编译器的 Go 插件： 使用以下命令安装 Go 的协议编译器插件：
更新 PATH，使 protoc 编译器能找到插件：
`}).add({id:80,href:"/zh/docs/api/tableau/guide/#获取示例代码",title:"指南 / 获取示例代码 ",description:"Tableau Go API 使用指南。",content:` 示例代码位于 tableau/demo 仓库。
下载仓库 zip 包 并解压，或克隆仓库：
切换到快速开始示例目录：
`}).add({id:81,href:"/zh/docs/api/tableau/guide/#运行示例",title:"指南 / 运行示例 ",description:"Tableau Go API 使用指南。",content:` 在 examples/helloworld 目录下：
切换到 excel2proto 目录，编译并执行：
proto 文件将生成到 examples/helloworld/proto。
切换到 excel2conf 目录，生成 *.pb.go 后编译并执行：
*.pb.go 文件将生成到 examples/helloworld/protoconf，JSON 文件将生成到 examples/helloworld/excel2conf/_out。
恭喜！你已经成功运行了一个使用 Tableau 的现代化配置转换应用。
`}).add({id:82,href:"/zh/docs/yaml/struct/#通用结构体",title:"结构体（Struct） / 通用结构体 ",description:"YAML struct 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
提示
Wellknown 类型：datetime Wellknown 类型：duration 生成结果：
hello_world.proto ItemConf.json `}).add({id:83,href:"/zh/docs/yaml/struct/#复用同级结构体",title:"结构体（Struct） / 复用同级结构体 ",description:"YAML struct 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:84,href:"/zh/docs/yaml/struct/#predefined-struct",title:"结构体（Struct） / 预定义结构体（Predefined struct） ",description:"YAML struct 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:85,href:"/zh/docs/yaml/struct/#单元格内结构体incell-struct",title:"结构体（Struct） / 单元格内结构体（Incell struct） ",description:"YAML struct 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:86,href:"/zh/docs/yaml/struct/#单元格内通用结构体incell-general-struct",title:"结构体（Struct） / 单元格内通用结构体（Incell general struct） ",description:"YAML struct 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:87,href:"/zh/docs/yaml/struct/#单元格内预定义结构体incell-predefined-struct",title:"结构体（Struct） / 单元格内预定义结构体（Incell predefined struct） ",description:"YAML struct 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:88,href:"/zh/docs/yaml/union/#联合体定义union-definition",title:"联合体（Union） / 联合体定义（Union definition） ",description:"YAML union 使用指南。",content:` 例如，common.proto 中预定义的联合体类型 Target：
`}).add({id:89,href:"/zh/docs/yaml/union/#predefined-union",title:"联合体（Union） / 预定义联合体（Predefined union） ",description:"YAML union 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:90,href:"/zh/docs/yaml/union/#预定义单元格内联合体predefined-incell-union",title:"联合体（Union） / 预定义单元格内联合体（Predefined incell union） ",description:"YAML union 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:91,href:"/zh/docs/yaml/union/#predefined-union-list",title:"联合体（Union） / 预定义联合体列表（Predefined union list） ",description:"YAML union 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:92,href:"/zh/docs/yaml/list/#标量列表scalar-list",title:"列表（List） / 标量列表（Scalar list） ",description:"YAML list 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:93,href:"/zh/docs/yaml/list/#枚举列表enum-list",title:"列表（List） / 枚举列表（Enum list） ",description:"YAML list 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:94,href:"/zh/docs/yaml/list/#单元格内标量列表incell-scalar-list",title:"列表（List） / 单元格内标量列表（Incell scalar list） ",description:"YAML list 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:95,href:"/zh/docs/yaml/list/#单元格内枚举列表incell-enum-list",title:"列表（List） / 单元格内枚举列表（Incell enum list） ",description:"YAML list 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:96,href:"/zh/docs/yaml/list/#结构体列表struct-list",title:"列表（List） / 结构体列表（Struct list） ",description:"YAML list 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:97,href:"/zh/docs/yaml/list/#predefined-struct-list",title:"列表（List） / 预定义结构体列表（Predefined struct list） ",description:"YAML list 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:98,href:"/zh/docs/yaml/list/#列表嵌套列表list-in-list",title:"列表（List） / 列表嵌套列表（List in list） ",description:"YAML list 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:99,href:"/zh/docs/yaml/list/#列表嵌套映射map-in-list",title:"列表（List） / 列表嵌套映射（Map in list） ",description:"YAML list 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:100,href:"/zh/docs/yaml/map/#标量映射scalar-map",title:"映射（Map） / 标量映射（Scalar map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:101,href:"/zh/docs/yaml/map/#枚举键映射enum-key-map",title:"映射（Map） / 枚举键映射（Enum key map） ",description:"YAML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:102,href:"/zh/docs/yaml/map/#枚举键值映射enum-key-value-map",title:"映射（Map） / 枚举键值映射（Enum key-value map） ",description:"YAML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType 和 FruitFlavor：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:103,href:"/zh/docs/yaml/map/#单元格内标量映射incell-scalar-map",title:"映射（Map） / 单元格内标量映射（Incell scalar map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:104,href:"/zh/docs/yaml/map/#单元格内枚举映射incell-enum-map",title:"映射（Map） / 单元格内枚举映射（Incell enum map） ",description:"YAML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType 和 FruitFlavor：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:105,href:"/zh/docs/yaml/map/#结构体映射struct-map",title:"映射（Map） / 结构体映射（Struct map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:106,href:"/zh/docs/yaml/map/#枚举键结构体映射enum-key-struct-map",title:"映射（Map） / 枚举键结构体映射（Enum key struct map） ",description:"YAML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:107,href:"/zh/docs/yaml/map/#自定义键结构体映射custom-key-struct-map",title:"映射（Map） / 自定义键结构体映射（Custom key struct map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:108,href:"/zh/docs/yaml/map/#映射嵌套列表list-in-map",title:"映射（Map） / 映射嵌套列表（List in map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:109,href:"/zh/docs/yaml/map/#映射嵌套映射map-in-map",title:"映射（Map） / 映射嵌套映射（Map in map） ",description:"YAML map 使用指南。",content:` HelloWorld.yaml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:110,href:"/zh/docs/yaml/metasheet/#概述",title:"元表（Metasheet） / 概述 ",description:"YAML 元表 @TABLEAU 使用指南。",content:` 名为 &ldquo;@TABLEAU&rdquo; 的元表用于指定 tableau 解析器选项。 详细信息请参考 元表。
YAML 元表示例：
`}).add({id:111,href:"/zh/docs/yaml/metasheet/#todo",title:"元表（Metasheet） / TODO ",description:"YAML 元表 @TABLEAU 使用指南。",content:` 更多详情&hellip;
`}).add({id:112,href:"/zh/docs/xml/scalar/#标量scalar",title:"标量（Scalar） / 标量（Scalar） ",description:"XML scalar 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:113,href:"/zh/docs/xml/scalar/#字段注释note",title:"标量（Scalar） / 字段注释（Note） ",description:"XML scalar 使用指南。",content:` 自 v0.16.2 起，写在元表注释块中的 @note 元属性会被提取为生成 proto 文件中对应字段的注释。
生成结果：
hello_world.proto 提示
对于以 XML 属性（而非子元素）定义的字段（例如 ID=&quot;uint32&quot;），需要用 @note.&lt;属性名&gt;（例如 @note.ID=&quot;Item's ID&quot;）标注，而不是 @note，因为写在父元素上的 @note 会被当作父字段自身的注释。 `}).add({id:114,href:"/zh/docs/xml/",title:"XML",description:"XML 使用指南。",content:""}).add({id:115,href:"/zh/docs/xml/enum/#使用预定义枚举类型",title:"枚举（Enum） / 使用预定义枚举类型 ",description:"XML enum 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:116,href:"/zh/docs/xml/struct/#通用结构体",title:"结构体（Struct） / 通用结构体 ",description:"XML struct 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
提示
Wellknown 类型：datetime Wellknown 类型：duration 生成结果：
hello_world.proto ItemConf.json `}).add({id:117,href:"/zh/docs/xml/struct/#复用同级结构体",title:"结构体（Struct） / 复用同级结构体 ",description:"XML struct 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:118,href:"/zh/docs/xml/struct/#predefined-struct",title:"结构体（Struct） / 预定义结构体（Predefined struct） ",description:"XML struct 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:119,href:"/zh/docs/xml/struct/#单元格内结构体incell-struct",title:"结构体（Struct） / 单元格内结构体（Incell struct） ",description:"XML struct 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:120,href:"/zh/docs/xml/struct/#单元格内预定义结构体incell-predefined-struct",title:"结构体（Struct） / 单元格内预定义结构体（Incell predefined struct） ",description:"XML struct 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:121,href:"/zh/docs/xml/union/#联合体定义",title:"联合体（Union） / 联合体定义 ",description:"XML union 使用指南。",content:` 例如，common.proto 中预定义的 union 类型 Target：
`}).add({id:122,href:"/zh/docs/xml/union/#predefined-union",title:"联合体（Union） / 预定义联合体（Predefined union） ",description:"XML union 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:123,href:"/zh/docs/xml/union/#预定义单元格内联合体predefined-incell-union",title:"联合体（Union） / 预定义单元格内联合体（Predefined incell union） ",description:"XML union 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:124,href:"/zh/docs/xml/union/#predefined-union-list",title:"联合体（Union） / 预定义联合体列表（Predefined union list） ",description:"XML union 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:125,href:"/zh/docs/xml/list/#标量列表scalar-list",title:"列表（List） / 标量列表（Scalar list） ",description:"XML list 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:126,href:"/zh/docs/xml/list/#枚举列表enum-list",title:"列表（List） / 枚举列表（Enum list） ",description:"XML list 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:127,href:"/zh/docs/xml/list/#单元格内标量列表incell-scalar-list",title:"列表（List） / 单元格内标量列表（Incell scalar list） ",description:"XML list 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:128,href:"/zh/docs/xml/list/#单元格内枚举列表incell-enum-list",title:"列表（List） / 单元格内枚举列表（Incell enum list） ",description:"XML list 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:129,href:"/zh/docs/xml/list/#结构体列表struct-list",title:"列表（List） / 结构体列表（Struct list） ",description:"XML list 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:130,href:"/zh/docs/xml/list/#predefined-struct-list",title:"列表（List） / 预定义结构体列表（Predefined struct list） ",description:"XML list 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:131,href:"/zh/docs/xml/list/#列表嵌套列表list-in-list",title:"列表（List） / 列表嵌套列表（List in list） ",description:"XML list 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:132,href:"/zh/docs/xml/list/#列表嵌套映射map-in-list",title:"列表（List） / 列表嵌套映射（Map in list） ",description:"XML list 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:133,href:"/zh/docs/xml/map/#单元格内标量映射incell-scalar-map",title:"映射（Map） / 单元格内标量映射（Incell scalar map） ",description:"XML map 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:134,href:"/zh/docs/xml/map/#单元格内枚举映射incell-enum-map",title:"映射（Map） / 单元格内枚举映射（Incell enum map） ",description:"XML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType 和 FruitFlavor：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:135,href:"/zh/docs/xml/map/#结构体映射struct-map",title:"映射（Map） / 结构体映射（Struct map） ",description:"XML map 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:136,href:"/zh/docs/xml/map/#枚举键结构体映射enum-key-struct-map",title:"映射（Map） / 枚举键结构体映射（Enum key struct map） ",description:"XML map 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:137,href:"/zh/docs/xml/map/#映射嵌套列表list-in-map",title:"映射（Map） / 映射嵌套列表（List in map） ",description:"XML map 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:138,href:"/zh/docs/xml/map/#映射嵌套映射map-in-map",title:"映射（Map） / 映射嵌套映射（Map in map） ",description:"XML map 使用指南。",content:` HelloWorld.xml 中的工作表 ItemConf：
生成结果：
hello_world.proto ItemConf.json `}).add({id:139,href:"/zh/docs/xml/metasheet/#xml-中的元表是什么",title:"元表（Metasheet） / XML 中的元表是什么？ ",description:"XML 元表 @TABLEAU 使用指南。",content:` 元表 是通常写在 XML 文件开头的注释块，必须以关键字 @TABLEAU 开头，并在后续行中定义节点属性的类型。例如：
`}).add({id:140,href:"/zh/docs/xml/metasheet/#没有元表的情况",title:"元表（Metasheet） / 没有元表的情况 ",description:"XML 元表 @TABLEAU 使用指南。",content:` 如果一个 XML 文件没有元表（即没有以 @TABLEAU 开头的注释块），则不会生成任何 protobuf 和 JSON 文件。
`}).add({id:141,href:"/zh/docs/csv/",title:"CSV",description:"CSV 使用指南。",content:""}).add({id:142,href:"/zh/docs/csv/overview/#概念",title:"概览 / 概念 ",description:"CSV 概览。",content:` Tableau 识别 &lt;BookName&gt;#&lt;SheetName&gt;.csv 模式，因此一个 CSV 工作簿（Glob 模式）&lt;BookName&gt;#*.csv 由同一目录下的多个 CSV 工作表（文件）组成。
示例：
CSV 工作簿 HelloWorld#*.csv 由三个 CSV 工作表组成：
工作表 Item：HelloWorld#Item.csv 工作表 Activity：HelloWorld#Activity.csv 工作表 @TABLEAU：HelloWorld#@TABLEAU.csv `}).add({id:143,href:"/zh/docs/csv/overview/#指南",title:"概览 / 指南 ",description:"CSV 概览。",content:` 由于 CSV 工作表与 Excel 工作表相同，请直接阅读 Excel 指南
`}).add({id:144,href:"/zh/docs/excel/",title:"Excel",description:"Excel 使用指南。",content:""}).add({id:145,href:"/zh/docs/excel/scalar/#标量scalar",title:"标量（Scalar） / 标量（Scalar） ",description:"Excel scalar 使用指南。",content:` HelloWorld.xlsx 中的工作表 Apple：
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Name Desc uint32 string string Item&rsquo;s ID Item&rsquo;s Name Item&rsquo;s Description 1 Apple A kind of delicious fruit. 该工作表中定义了三个标量字段：
ID：uint32 Name：string Desc：string 生成结果：
hello_world.proto Apple.json `}).add({id:146,href:"/zh/docs/excel/scalar/#说明",title:"标量（Scalar） / 说明 ",description:"Excel scalar 使用指南。",content:` 标量类型通常用于定义结构体类型的字段。
`}).add({id:147,href:"/zh/docs/excel/enum/#使用预定义枚举类型",title:"枚举（Enum） / 使用预定义枚举类型 ",description:"Excel enum 使用指南。",content:` [!NOTE] 枚举基础知识请参考 枚举 。
例如，common.proto 中定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Type map&lt;uint32, Item&gt; enum&lt;.FruitType&gt; Item&rsquo;s ID Fruit&rsquo;s type 1 1 2 Orange 3 FRUIT_TYPE_BANANA 生成结果：
hello_world.proto ItemConf.json `}).add({id:148,href:"/zh/docs/excel/enum/#在工作表中定义枚举类型",title:"枚举（Enum） / 在工作表中定义枚举类型 ",description:"Excel enum 使用指南。",content:` 在元表 @TABLEAU 中有两种 Mode 可用于在工作表中定义枚举类型：
MODE_ENUM_TYPE：在一个工作表中定义单个枚举类型。 MODE_ENUM_TYPE_MULTI：在一个工作表中定义多个枚举类型。 `}).add({id:149,href:"/zh/docs/excel/enum/#单个枚举类型single-enum-type-in-sheet",title:"枚举（Enum） / 单个枚举类型（Single enum type in sheet） ",description:"Excel enum 使用指南。",content:` [!Note]
Number 列是可选的，用于指定枚举值编号。省略时从 1 开始自动递增。 如果未显式定义默认枚举值 0，则会自动生成，命名模式为 {ENUM_TYPE}_INVALID。 需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_ENUM_TYPE。
例如，HelloWorld.xlsx 中的工作表 ItemType：
HelloWorld.xlsx&nbsp; ItemType @TABLEAU Number Name Alias 1 ITEM_TYPE_FRUIT 水果 2 ITEM_TYPE_EQUIP 装备 3 ITEM_TYPE_BOX 箱子 Sheet Mode ItemType MODE_ENUM_TYPE 生成结果：
hello_world.proto `}).add({id:150,href:"/zh/docs/excel/enum/#多个枚举类型",title:"枚举（Enum） / 多个枚举类型 ",description:"Excel enum 使用指南。",content:` [!IMPORTANT] 每个枚举类型由一个 block 定义，即一系列连续的非空行。不同的 block 之间由一行或多行空行分隔。
需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_ENUM_TYPE_MULTI。
例如，HelloWorld.xlsx 中的工作表 Enum：
HelloWorld.xlsx&nbsp; Enum @TABLEAU CatType 猫类 Number Name Alias 1 CAT_TYPE_RAGDOLL 布偶猫 2 CAT_TYPE_PERSIAN 波斯猫 3 CAT_TYPE_SPHYNX 无毛猫 DogType 犬类 Number Name Alias 1 DOG_TYPE_POODLE 贵宾犬 2 DOG_TYPE_BULLDOG 牛头犬 3 DOG_TYPE_DACHSHUND 腊肠犬 BirdType 鸟类 Number Name Alias 1 BIRD_TYPE_CANARY 金丝雀 2 BIRD_TYPE_WOODPECKER 啄木鸟 3 BIRD_TYPE_OWL 猫头鹰 Sheet Mode Enum MODE_ENUM_TYPE_MULTI 生成结果：
hello_world.proto `}).add({id:151,href:"/zh/docs/excel/enum/#在工作表中定义并使用枚举类型",title:"枚举（Enum） / 在工作表中定义并使用枚举类型 ",description:"Excel enum 使用指南。",content:` 例如，HelloWorld.xlsx 中的两个工作表 ItemType 和 ItemConf：
HelloWorld.xlsx&nbsp; ItemType ItemConf @TABLEAU Number Name Alias 1 ITEM_TYPE_FRUIT Fruit 2 ITEM_TYPE_EQUIP Equip 3 ITEM_TYPE_BOX Box ID Type Name Price map&lt;int32, Item&gt; enum&lt;.ItemType&gt; string int32 Item&rsquo;s ID Item&rsquo;s type Item&rsquo;s name Item&rsquo;s price 1 Fruit Apple 40 2 Fruit Orange 20 3 Equip Sword 10 Sheet Mode ItemType MODE_ENUM_TYPE ItemConf 生成结果：
hello_world.proto ItemConf.json `}).add({id:152,href:"/zh/docs/excel/struct/#跨单元格结构体cross-cell-struct",title:"结构体（Struct） / 跨单元格结构体（Cross-cell struct） ",description:"Excel struct 使用指南。",content:` 语法：&lt;StructType&gt;ColumnType。
每个列名应以相同的结构体变量名作为前缀，默认情况下变量名与结构体类型名相同。
例如，HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU PropertyID PropertyName PropertyDesc {Property}int32 string string Property&rsquo;s ID Property&rsquo;s Name Property&rsquo;s Description 1 Orange A kind of sour fruit. 注意 ItemConf 中每个列名都以结构体变量名 Property 作为前缀，该变量名与结构体类型名相同。
生成结果：
hello_world.proto ItemConf.json `}).add({id:153,href:"/zh/docs/excel/struct/#说明",title:"结构体（Struct） / 说明 ",description:"Excel struct 使用指南。",content:` 跨单元格结构体通常与以下类型配合使用：
跨单元格水平/垂直映射，作为映射的值类型。Map 跨单元格水平/垂直列表，作为列表的元素类型。List `}).add({id:154,href:"/zh/docs/excel/struct/#incell-struct",title:"结构体（Struct） / 单元格内结构体（Incell struct） ",description:"Excel struct 使用指南。",content:` 结构体的每个字段类型应为标量类型。
例如，HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;int32, Item&gt; {int32 ID,string Name,string Desc}Property Item&rsquo;s ID Item&rsquo;s property. 1 1,Orange,A good fruit. 2 2,Apple 3 3 Property 列的类型为单元格内结构体 {int32 ID,string Name,string Desc}Property。
生成结果：
hello_world.proto ItemConf.json `}).add({id:155,href:"/zh/docs/excel/struct/#predefined-struct",title:"结构体（Struct） / 预定义结构体（Predefined struct） ",description:"Excel struct 使用指南。",content:` 例如，common.proto 中定义的结构体类型 Prop：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; [.Prop]int32 int32 int32 int32 Item&rsquo;s ID Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 1 100 2 200 2 3 300 4 400 3 5 500 生成结果：
hello_world.proto ItemConf.json `}).add({id:156,href:"/zh/docs/excel/struct/#预定义单元格内结构体predefined-incell-struct",title:"结构体（Struct） / 预定义单元格内结构体（Predefined incell struct） ",description:"Excel struct 使用指南。",content:` 预定义结构体的每个字段类型应为标量类型。
例如，common.proto 中预定义的 Property：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;uint32, Item&gt; {.Property} Item&rsquo;s ID Item&rsquo;s property. 1 1,Orange,A good fruit. 2 2,Apple 3 3 Prop 列的类型为预定义结构体 Property。
生成结果：
hello_world.proto ItemConf.json `}).add({id:157,href:"/zh/docs/excel/struct/#custom-named-struct",title:"结构体（Struct） / 自定义命名结构体（Custom named struct） ",description:"Excel struct 使用指南。",content:` 默认情况下，结构体变量名与结构体类型名相同，但你可以指定不同的结构体变量名。自定义命名结构体主要用于在 tableau（protogen）无法自动识别变量名时，标识 name row 中连续单元格的名称前缀。
语法：在结构体类型名后面，使用括号 () 指定结构体变量名：VariableType(VariableName)。
例如，Item 已预定义：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardItemID RewardItemNum CostItemID CostItemNum PredefinedItemID PredefinedItemNum {Item(RewardItem)}int32 int32 {Item(CostItem)}int32 int32 {.Item(PredefinedItem)}int32 int32 Item&rsquo;s ID Item&rsquo;s ID Cost&rsquo;s ID Cost&rsquo;s ID Predefined item&rsquo;s ID Predefined item&rsquo;s ID 1 100 2 200 10 20 详细说明： 在类型单元格 {Item(RewardItem)}int32 中，RewardItem 是新定义的结构体 Item 的自定义变量名。在类型单元格 {Item(CostItem)}int32 中，CostItem 是同一作用域内已定义的结构体 Item 的自定义变量名。最后，在类型单元格 {.Item(PredefinedItem)}int32 中，PredefinedItem 是全局（同一 protobuf package）预定义结构体 Item 的自定义变量名。
生成结果：
hello_world.proto ItemConf.json `}).add({id:158,href:"/zh/docs/excel/struct/#advanced-predefined-incell-struct",title:"结构体（Struct） / 高级预定义单元格内结构体（Advanced predefined incell struct） ",description:"Excel struct 使用指南。",content:` 在某些情况下，你可能希望在单元格中配置任意复杂的结构体，因此 tableau 支持两种 protobuf 序列化格式：text format 和 JSON format。
语法：在字段属性中，将 form 选项指定为 FORM_TEXT 或 FORM_JSON。
例如，Transform 预定义为：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Transform1 Transform2 {.Transform}|{form:FORM_TEXT} {.Transform}|{form:FORM_JSON} Box&rsquo;s transform1 Box&rsquo;s transform2 position:{x:1 y:2 z:3} rotation:{x:4 y:5 z:6} scale:{x:7 y:8 z:9} {&ldquo;position&rdquo;:{&ldquo;x&rdquo;:1, &ldquo;y&rdquo;:2, &ldquo;z&rdquo;:3}, &ldquo;rotation&rdquo;:{&ldquo;x&rdquo;:4, &ldquo;y&rdquo;:5, &ldquo;z&rdquo;:6}, &ldquo;scale&rdquo;:{&ldquo;x&rdquo;:7, &ldquo;y&rdquo;:8, &ldquo;z&rdquo;:9}} 生成结果：
hello_world.proto ItemConf.json `}).add({id:159,href:"/zh/docs/excel/struct/#在工作表中定义结构体类型define-struct-type-in-sheet",title:"结构体（Struct） / 在工作表中定义结构体类型（Define struct type in sheet） ",description:"Excel struct 使用指南。",content:` 在元表 @TABLEAU 中有两种 Mode 可用于在工作表中定义结构体类型：
MODE_STRUCT_TYPE：在一个工作表中定义单个结构体类型。 MODE_STRUCT_TYPE_MULTI：在一个工作表中定义多个结构体类型。 `}).add({id:160,href:"/zh/docs/excel/struct/#单个结构体类型single-struct-type-in-sheet",title:"结构体（Struct） / 单个结构体类型（Single struct type in sheet） ",description:"Excel struct 使用指南。",content:` [!Note] Number 列是可选的，用于指定字段编号。省略时从 1 开始自动递增。
需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_STRUCT_TYPE。
例如，HelloWorld.xlsx 中的工作表 Item：
HelloWorld.xlsx&nbsp; Item @TABLEAU Number Name Type 1 ID uint32 2 Num int32 3 FruitType enum&lt;.FruitType&gt; 4 Feature []int32 5 Prop map&lt;int32, string&gt; 6 Detail {enum&lt;.ItemType&gt; Type, string Name, string Desc}Detail Sheet Mode Item MODE_STRUCT_TYPE 生成结果：
hello_world.proto `}).add({id:161,href:"/zh/docs/excel/struct/#多个结构体类型multiple-struct-types-in-sheet",title:"结构体（Struct） / 多个结构体类型（Multiple struct types in sheet） ",description:"Excel struct 使用指南。",content:` [!IMPORTANT] 每个结构体类型由一个 block 定义，即一系列连续的非空行。不同的 block 之间由一行或多行空行分隔。
需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_STRUCT_TYPE_MULTI。
例如，HelloWorld.xlsx 中的工作表 Struct：
HelloWorld.xlsx&nbsp; Struct @TABLEAU Tree Tree note Number Name Type 1 ID uint32 2 Num int32 Pet Pet note Number Name Type 1 Kind int32 2 Tip []string FruitShop FruitShop note Number Name Type 1 FruitType enum&lt;.FruitType&gt; 2 Prop map&lt;int32, string&gt; Sheet Mode Struct MODE_STRUCT_TYPE_MULTI 生成结果：
hello_world.proto `}).add({id:162,href:"/zh/docs/excel/union/#原理",title:"联合体（Union） / 原理 ",description:"Excel union 使用指南。",content:` 在 protoconf 中，union 类型是指带标签的联合体（tagged union）：一种用于保存可以取多种不同但固定类型值的数据结构。任意时刻只有一种类型在使用，且一个 tag 字段明确指示当前使用的是哪种类型。更多详情请参考维基百科 Tagged union。
Tagged union 在不同编程语言中的对应：
C++: std::variant Rust: Defining an Enum Tableau 使用 protobuf message 将 enum 类型和 oneof 类型绑定在一起，以实现 tagged union。默认情况下，每个枚举值（&gt;0）与 oneof 类型中具有相同 tag 编号的字段绑定。
`}).add({id:163,href:"/zh/docs/excel/union/#union-definition",title:"联合体（Union） / 联合体定义（Union definition） ",description:"Excel union 使用指南。",content:` 例如，common.proto 中预定义的联合体类型 Target：
`}).add({id:164,href:"/zh/docs/excel/union/#predefined-union-in-list",title:"联合体（Union） / 列表嵌套预定义联合体（Predefined-union in list） ",description:"Excel union 使用指南。",content:` [!NOTE] 基于 predefined union 类型 Target。
HelloWorld.xlsx 中的工作表 TaskConf：
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Target1Type Target1Field1 Target1Field2 Target1Field3 Target2Type Target2Field1 Target2Field2 Target2Field3 map&lt;int32, Task&gt; [.Target]enum&lt;.Target.Type&gt; union union union enum&lt;.Target.Type&gt; union union union ID Target1&rsquo;s type Target1&rsquo;s field1 Target1&rsquo;s field2 Target1&rsquo;s field3 Target2&rsquo;s type Target2&rsquo;s field1 Target2&rsquo;s field2 Target2&rsquo;s field3 1 PVP 1 10 Apple,Orange,Banana PVE 1,100,999 1,2,3 1:10,2:20,3:30 2 Story 1001,10 1:Apple,2:Orange Fragrant:1,Sour:2 Skill 1 2 生成结果：
hello_world.proto TaskConf.json TaskConf.txt `}).add({id:165,href:"/zh/docs/excel/union/#predefined-union-in-map",title:"联合体（Union） / 映射嵌套预定义联合体（Predefined-union in map） ",description:"Excel union 使用指南。",content:` [!NOTE] 基于 predefined union 类型 Target。
HelloWorld.xlsx 中的工作表 TaskConf：
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID TargetType TargetField1 TargetField2 TargetField3 Progress map&lt;int32, Task&gt; {.Target}enum&lt;.Target.Type&gt; union union union int32 ID Target&rsquo;s type Target&rsquo;s field1 Target&rsquo;s field2 Target&rsquo;s field3 Progress 1 PVP 1 10 Apple,Orange,Banana 3 2 PVE 1,100,999 1,2,3 1:10,2:20,3:30 10 3 Story 1001,10 1:Apple,2:Orange Fragrant:1,Sour:2 10 4 Skill 1 2 8 生成结果：
hello_world.proto TaskConf.json TaskConf.txt `}).add({id:166,href:"/zh/docs/excel/union/#predefined-incell-union-in-map",title:"联合体（Union） / 映射嵌套预定义单元格内联合体（Predefined-incell-union in map） ",description:"Excel union 使用指南。",content:` [!NOTE] 基于 predefined union 类型 Target。
HelloWorld.xlsx 中的工作表 TaskConf：
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Target1 Target2 Progress map&lt;int32, Task&gt; {.Target}|{form:FORM_TEXT} {.Target}|{form:FORM_JSON} int32 ID Target1 Target2 Progress 1 type:TYPE_PVP pvp:{type:1 damage:10 types:FRUIT_TYPE_APPLE types:FRUIT_TYPE_ORANGE types:FRUIT_TYPE_BANANA} {&ldquo;type&rdquo;:&ldquo;TYPE_PVP&rdquo;,&ldquo;pvp&rdquo;:{&ldquo;type&rdquo;:1,&ldquo;damage&rdquo;:&ldquo;10&rdquo;,&ldquo;types&rdquo;:[&ldquo;FRUIT_TYPE_APPLE&rdquo;,&ldquo;FRUIT_TYPE_ORANGE&rdquo;,&ldquo;FRUIT_TYPE_BANANA&rdquo;]}} 3 2 type:TYPE_PVE pve:{mission:{id:1 level:100 damage:999} heros:1 heros:2 heros:3 dungeons:{key:1 value:10} dungeons:{key:2 value:20} dungeons:{key:3 value:30}} {&ldquo;type&rdquo;:&ldquo;TYPE_PVE&rdquo;,&ldquo;pve&rdquo;:{&ldquo;mission&rdquo;:{&ldquo;id&rdquo;:1,&ldquo;level&rdquo;:100,&ldquo;damage&rdquo;:&ldquo;999&rdquo;},&ldquo;heros&rdquo;:[1,2,3],&ldquo;dungeons&rdquo;:{&ldquo;1&rdquo;:&ldquo;10&rdquo;,&ldquo;2&rdquo;:&ldquo;20&rdquo;,&ldquo;3&rdquo;:&ldquo;30&rdquo;}}} 10 3 type:TYPE_STORY story:{cost:{id:1001 num:10} fruits:{key:1 value:FRUIT_TYPE_APPLE} fruits:{key:2 value:FRUIT_TYPE_ORANGE} flavors:{key:1 value:{key:FRUIT_FLAVOR_FRAGRANT value:1}} flavors:{key:2 value:{key:FRUIT_FLAVOR_SOUR value:2}}} {&ldquo;type&rdquo;:&ldquo;TYPE_STORY&rdquo;,&ldquo;story&rdquo;:{&ldquo;cost&rdquo;:{&ldquo;id&rdquo;:1001,&ldquo;num&rdquo;:10},&ldquo;fruits&rdquo;:{&ldquo;1&rdquo;:&ldquo;FRUIT_TYPE_APPLE&rdquo;,&ldquo;2&rdquo;:&ldquo;FRUIT_TYPE_ORANGE&rdquo;},&ldquo;flavors&rdquo;:{&ldquo;1&rdquo;:{&ldquo;key&rdquo;:&ldquo;FRUIT_FLAVOR_FRAGRANT&rdquo;,&ldquo;value&rdquo;:1},&ldquo;2&rdquo;:{&ldquo;key&rdquo;:&ldquo;FRUIT_FLAVOR_SOUR&rdquo;,&ldquo;value&rdquo;:2}}}} 10 4 type:TYPE_SKILL skill:{id:1 damage:2} {&ldquo;type&rdquo;:&ldquo;TYPE_SKILL&rdquo;,&ldquo;skill&rdquo;:{&ldquo;id&rdquo;:1,&ldquo;damage&rdquo;:&ldquo;2&rdquo;}} 8 生成结果：
hello_world.proto TaskConf.json `}).add({id:167,href:"/zh/docs/excel/union/#在工作表中定义联合体类型define-union-type-in-sheet",title:"联合体（Union） / 在工作表中定义联合体类型（Define union type in sheet） ",description:"Excel union 使用指南。",content:` 在元表 @TABLEAU 中有两种 Mode 可用于在工作表中定义联合体类型：
MODE_UNION_TYPE：在一个工作表中定义单个联合体类型。 MODE_UNION_TYPE_MULTI：在一个工作表中定义多个联合体类型。 每个联合体字段可以使用以下类型定义：
Scalar Enum Wellknown types Incell struct Incell list Incell map `}).add({id:168,href:"/zh/docs/excel/union/#单个联合体类型single-union-type-in-sheet",title:"联合体（Union） / 单个联合体类型（Single union type in sheet） ",description:"Excel union 使用指南。",content:` [!Note] Number 列是可选的，用于指定字段编号及对应的枚举值编号。省略时从 1 开始自动递增。
需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_UNION_TYPE。
例如，HelloWorld.xlsx 中的工作表 Target：
HelloWorld.xlsx&nbsp; Target @TABLEAU Number Name Alias Field1 Field2 Field3 1 PVP PVP战斗 ID
uint32
战斗ID Damage
int64
伤害 Type
enum&lt;.FruitType&gt;
水果类型 2 PVE PVE战斗 Hero
[]uint32
英雄列表 Dungeon
map&lt;int32, int64&gt;
副本映射 3 Skill 技能 StartTime
datetime
开始时间 Duration
duration
持续时间 Sheet Mode Target MODE_UNION_TYPE 生成结果：
hello_world.proto `}).add({id:169,href:"/zh/docs/excel/union/#多个联合体类型multiple-union-types-in-sheet",title:"联合体（Union） / 多个联合体类型（Multiple union types in sheet） ",description:"Excel union 使用指南。",content:` [!IMPORTANT] 每个 union 类型由一个 block 定义，即一系列连续的非空行。不同的 block 之间由一行或多行空行分隔。
需要在元表 @TABLEAU 中将 Mode 选项设置为 MODE_UNION_TYPE_MULTI。
例如，HelloWorld.xlsx 中的工作表 Union：
HelloWorld.xlsx&nbsp; Union @TABLEAU HeroTarget 英雄目标 Number Name Alias Field1 Field2 Field3 1 StarUp 升星 ID
uint32
英雄ID Star
int32星级 2 LevelUp 升级 ID
uint32
英雄ID Level
int32 等级 Super
bool
是否绝品 BattleTarget 战斗目标 Number Name Alias Field1 Field2 Field3 1 PVP PVP战斗 BattleID
int32
战斗ID Damage
int64
伤害 2 PVE PVE战斗 HeroID
[]int32
英雄ID列表 Dungeon
map&lt;int32, int64&gt;
副本映射 Boss
{uint32 ID, int64 Damage}Boss
特定Boss伤害 Sheet Mode Union MODE_UNION_TYPE_MULTI 生成结果：
hello_world.proto `}).add({id:170,href:"/zh/docs/excel/union/#指定-type-列specify-type-column",title:"联合体（Union） / 指定 Type 列（Specify Type column） ",description:"Excel union 使用指南。",content:` 默认情况下，每个联合体的 oneof 字段是一个以 Name 列指定名称的 message 类型。 现在，你可以添加 Type 列并指定自定义的 oneof 字段类型：
标量 枚举 全局预定义结构体 自定义命名结构体 同级的本地预定义结构体 例如，HelloWorld.xlsx 中的工作表 Target：
HelloWorld.xlsx&nbsp; Target @TABLEAU Name Alias Type Field1 Field2 #Note Fruit Fruit enum&lt;.FruitType&gt; Bound to enum Point Point int32 Bound to scalar Item Item .Item Bound to global predefined struct Player Player ID uint32 Name string Bound to local defined struct Friend Friend Player Bound to local predefined in the same level Monster Monster CustomMonster Health uint32 Attack int32 Bound to local defined struct with custom type name Boss Boss CustomMonster Bound to local predefined struct in the same level Sheet Mode Target MODE_UNION_TYPE 生成结果：
hello_world.proto `}).add({id:171,href:"/zh/docs/excel/union/#复杂联合体类型complex-union-type-in-sheet",title:"联合体（Union） / 复杂联合体类型（Complex union type in sheet） ",description:"Excel union 使用指南。",content:` 例如，HelloWorld.xlsx 中的两个工作表 Target 和 TaskConf：
HelloWorld.xlsx&nbsp; Target TaskConf @TABLEAU Name Alias Field1 Field2 Field3 PVP AliasPVP ID
uint32
Note Damage
int64
Note Type
[]enum&lt;.FruitType&gt;
Note PVE AliasPVE Mission
{uint32 ID, enum&lt;.ItemType&gt; Type}Mission
Note Hero
[]uint32
Note Dungeon
map&lt;int32, int64&gt;
Note Story AliasStory Cost
{.Item}
Note Fruit
map&lt;int32, enum&lt;.FruitType&raquo;
Note Flavor
map&lt;enum&lt;.FruitFlavor&gt;, enum&lt;.FruitType&raquo;
Note Hobby AliasHobby Flavor
map&lt;enum&lt;.FruitFlavor&gt;, enum&lt;.FruitType&raquo;
Note StartTime
datetime
Note Duration
duration
Note Skill AliasSkill ID
uint32
Note Damage
int64
Note Empty AliasEmpty ID TargetType TargetField1 TargetField2 TargetField3 Progress map&lt;int32, Task&gt; {.Target}enum&lt;.Target.Type&gt; union union union int32 ID Target&rsquo;s type Target&rsquo;s field1 Target&rsquo;s field2 Target&rsquo;s field3 Progress 1 AliasPVP 1 10 Apple,Orange,Banana 3 2 AliasPVE 1,Equip 1,2,3 1:10,2:20,3:30 10 3 AliasStory 1001,10 1:Apple,2:Orange Fragrant:Apple,Sour:Orange 10 4 AliasHobby Fragrant:Apple,Sour:Orange 2023-06-01 10:00:00 22s 12 5 AliasSkill 1 200 8 6 AliasEmpty Sheet Mode Target MODE_UNION_TYPE Task 生成结果：
hello_world.proto TaskConf.json `}).add({id:172,href:"/zh/docs/excel/list/#水平列表horizontal-list",title:"列表（List） / 水平列表（Horizontal list） ",description:"列表使用指南。",content:` [!IMPORTANT] 水平列表的列名中，列表元素名必须带有从 1 开始的数字后缀。
例如：Item1ID、Item2ID、Item3ID（结构体列表，元素名：Item）；ID1、ID2、ID3（标量列表，元素名：ID）。
水平列表语法概览：
List 元素类型 语法示例 scalar []uint32 enum []enum&lt;.FruitType&gt; struct [Item]uint32 predefined struct [.Item]uint32 incell struct []{uint32 ID, string Num}Item incell predefined struct []{.Item} `}).add({id:173,href:"/zh/docs/excel/list/#水平标量列表horizontal-scalar-list",title:"列表（List） / 水平标量列表（Horizontal scalar list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID1 ID2 ID3 []uint32 uint32 uint32 ID1&rsquo;s value ID2&rsquo;s value ID3&rsquo;s value 1 2 3 生成结果：
hello_world.proto ItemConf.json `}).add({id:174,href:"/zh/docs/excel/list/#水平枚举列表horizontal-enum-list",title:"列表（List） / 水平枚举列表（Horizontal enum list） ",description:"列表使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param1 Param2 Param3 []enum&lt;.FruitType&gt; enum&lt;.FruitType&gt; enum&lt;.FruitType&gt; Param1&rsquo;s value Param2&rsquo;s value Param3&rsquo;s value 1 FRUIT_TYPE_ORANGE Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:175,href:"/zh/docs/excel/list/#水平结构体列表horizontal-struct-list",title:"列表（List） / 水平结构体列表（Horizontal struct list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32 string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 2 Orange 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:176,href:"/zh/docs/excel/list/#水平预定义结构体列表horizontal-predefined-struct-list",title:"列表（List） / 水平预定义结构体列表（Horizontal predefined-struct list） ",description:"列表使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Num Item2ID Item2Num Item3ID Item3Num [.Item]int32 int32 int32 int32 int32 int32 Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item3&rsquo;s num Item3&rsquo;s ID Item3&rsquo;s num 1 100 2 200 3 300 生成结果：
hello_world.proto ItemConf.json `}).add({id:177,href:"/zh/docs/excel/list/#水平单元格内结构体列表horizontal-incell-struct-list",title:"列表（List） / 水平单元格内结构体列表（Horizontal incell-struct list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1 Item2 Item3 []{int32 ID, string Name}Item Item Item Item1&rsquo;s info Item2&rsquo;s info Item3&rsquo;s info 1,Apple 2,Orange 3,Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:178,href:"/zh/docs/excel/list/#水平单元格内预定义结构体列表horizontal-incell-predefined-struct-list",title:"列表（List） / 水平单元格内预定义结构体列表（Horizontal incell-predefined-struct list） ",description:"列表使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1 Reward2 Reward3 []{.Item} .Item .Item Item1&rsquo;s info Item2&rsquo;s info Item3&rsquo;s info 1,100 2,200 3,300 生成结果：
hello_world.proto ItemConf.json `}).add({id:179,href:"/zh/docs/excel/list/#垂直列表vertical-list",title:"列表（List） / 垂直列表（Vertical list） ",description:"列表使用指南。",content:` 垂直列表语法概览：
List 元素类型 语法示例 标量 []uint32 枚举 []enum&lt;.FruitType&gt; 结构体 [Item]uint32 预定义结构体 [.Item]int32 单元格内结构体 []{int32 ID,int32 Num}Item 单元格内预定义结构体 []{.Item} `}).add({id:180,href:"/zh/docs/excel/list/#垂直标量列表vertical-scalar-list",title:"列表（List） / 垂直标量列表（Vertical scalar list） ",description:"列表使用指南。",content:` [!NOTE] 定义方式与 单元格内标量列表 相同，但需要显式开启字段属性 aggregate:true， 才会把每一行的 incell list 合并到同一条记录的扁平列表中。 如果未设置 aggregate:true，同一父记录的多行数据会因一致性校验失败而报 E2023。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []uint32|{aggregate:true} ID 1,2,3 1,2 1 生成结果：
hello_world.proto ItemConf.json `}).add({id:181,href:"/zh/docs/excel/list/#垂直枚举列表vertical-enum-list",title:"列表（List） / 垂直枚举列表（Vertical enum list） ",description:"列表使用指南。",content:` [!NOTE] 定义方式与 单元格内枚举列表 相同，但需要显式开启字段属性 aggregate:true， 才会把每一行的 incell list 合并到同一条记录的扁平列表中。 如果未设置 aggregate:true，同一父记录的多行数据会因一致性校验失败而报 E2023。
common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type []enum&lt;.FruitType&gt;|{aggregate:true} Type Apple,Orange,Banana FRUIT_TYPE_APPLE,FRUIT_TYPE_ORANGE 1 生成结果：
hello_world.proto ItemConf.json `}).add({id:182,href:"/zh/docs/excel/list/#垂直结构体列表vertical-struct-list",title:"列表（List） / 垂直结构体列表（Vertical struct list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Desc [Item]uint32 string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. 生成结果：
hello_world.proto ItemConf.json `}).add({id:183,href:"/zh/docs/excel/list/#垂直预定义结构体列表vertical-predefined-struct-list",title:"列表（List） / 垂直预定义结构体列表（Vertical predefined-struct list） ",description:"列表使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Num [.Item]int32 int32 Item&rsquo;s ID Item&rsquo;s num 1 100 2 200 3 300 生成结果：
hello_world.proto ItemConf.json `}).add({id:184,href:"/zh/docs/excel/list/#垂直单元格内结构体列表vertical-incell-struct-list",title:"列表（List） / 垂直单元格内结构体列表（Vertical incell-struct list） ",description:"列表使用指南。",content:` [!NOTE] 定义方式与 单元格内结构体列表 相同，但需要显式开启字段属性 aggregate:true， 才会把每一行的 incell list 合并到同一条记录的扁平列表中。 如果未设置 aggregate:true，同一父记录的多行数据会因一致性校验失败而报 E2023。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{int32 ID,int32 Num}Item|{aggregate:true} Item list 1:100 2:200,3:300 生成结果：
hello_world.proto ItemConf.json `}).add({id:185,href:"/zh/docs/excel/list/#垂直单元格内预定义结构体列表vertical-incell-predefined-struct-list",title:"列表（List） / 垂直单元格内预定义结构体列表（Vertical incell-predefined-struct list） ",description:"列表使用指南。",content:` [!NOTE] 定义方式与 单元格内预定义结构体列表 相同，但需要显式开启字段属性 aggregate:true， 才会把每一行的 incell list 合并到同一条记录的扁平列表中。 如果未设置 aggregate:true，同一父记录的多行数据会因一致性校验失败而报 E2023。
common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{.Item}|{aggregate:true} Item&rsquo;s info 1:100 2:200,3:300 生成结果：
hello_world.proto ItemConf.json `}).add({id:186,href:"/zh/docs/excel/list/#incell-list",title:"列表（List） / 单元格内列表（Incell list） ",description:"列表使用指南。",content:` 单元格内列表语法概览：
List 元素类型 语法示例 标量 []int32 枚举 []enum&lt;.FruitType&gt; 结构体 []{int32 ID,int32 Num}Item 预定义结构体 []{.Item} `}).add({id:187,href:"/zh/docs/excel/list/#单元格内标量列表incell-scalar-list",title:"列表（List） / 单元格内标量列表（Incell scalar list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []int32 Param list 1,2,3 4,5 6 Param 列的类型为 incell list []int32，list 元素为 scalar 类型 int32。
生成结果：
hello_world.proto ItemConf.json `}).add({id:188,href:"/zh/docs/excel/list/#单元格内枚举列表incell-enum-list",title:"列表（List） / 单元格内枚举列表（Incell enum list） ",description:"列表使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []enum&lt;.FruitType&gt; Param list 1,FRUIT_TYPE_ORANGE,Banana Param 列的类型为 incell list []enum&lt;.FruitType&gt;，list 元素为预定义枚举类型 FruitType。
生成结果：
hello_world.proto ItemConf.json `}).add({id:189,href:"/zh/docs/excel/list/#单元格内结构体列表incell-struct-list",title:"列表（List） / 单元格内结构体列表（Incell struct list） ",description:"列表使用指南。",content:` [!NOTE] 更高级的 incell 数据解析，请参考 高级 predefined incell struct。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{int32 ID,int32 Num}Item Item&rsquo;s info 1:100,2:200,3:300 生成结果：
hello_world.proto ItemConf.json `}).add({id:190,href:"/zh/docs/excel/list/#单元格内预定义结构体列表incell-predefined-struct-list",title:"列表（List） / 单元格内预定义结构体列表（Incell predefined-struct list） ",description:"列表使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{.Item} Item&rsquo;s info 1:100,2:200,3:300 生成结果：
hello_world.proto ItemConf.json `}).add({id:191,href:"/zh/docs/excel/list/#水平列表大小",title:"列表（List） / 水平列表大小 ",description:"列表使用指南。",content:`
`}).add({id:192,href:"/zh/docs/excel/list/#动态大小",title:"列表（List） / 动态大小 ",description:"列表使用指南。",content:` 默认情况下，所有列表都是动态大小类型。列表元素应连续存在，否则如果中间存在空元素会报错。
`}).add({id:193,href:"/zh/docs/excel/list/#固定大小",title:"列表（List） / 固定大小 ",description:"列表使用指南。",content:` 隐式固定大小 # 列表大小由名称行中最大存在的列表元素数量自动确定。
在下面的示例中，虽然第二个元素 Item2 为空，但由于 field property fixed 设置为 true，这是合法的。此外，Item2 也会作为空元素生成，可以在生成的 ItemConf.json 文件中看到。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32|{fixed:true} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana 生成结果：
hello_world.proto ItemConf.json 显式固定大小 # 列表大小由字段属性 size 显式设置。
在下面的示例中，字段属性 size 设置为 2，则第二个元素 Item2 之后的所有列表元素都会被截断。此外，Item2 也会作为空元素生成，可以在生成的 ItemConf.json 文件中看到。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32|{size:2} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:194,href:"/zh/docs/excel/list/#高级特性",title:"列表（List） / 高级特性 ",description:"列表使用指南。",content:`
`}).add({id:195,href:"/zh/docs/excel/list/#水平跳列列表horizontal-column-skipped-list",title:"列表（List） / 水平跳列列表（Horizontal column-skipped list） ",description:"列表使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU D Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; [Prop]int32 int32 int32 int32 Item&rsquo;s ID Prop1&rsquo;s ID Prop1&rsquo;s name Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s name Prop2&rsquo;s value 1 1 Apple 100 2 Orange 200 2 3 Banana 300 4 Pomelo 400 3 5 Watermelon 500 生成结果：
hello_world.proto ItemConf.json `}).add({id:196,href:"/zh/docs/excel/map/#水平映射horizontal-map",title:"映射（Map） / 水平映射（Horizontal map） ",description:"映射使用指南。",content:` [!IMPORTANT] 水平映射的列名中，映射值名必须带有从 1 开始的数字后缀。
例如：Item1ID、Item1Name、Item2ID、Item2Name（结构体映射，值名：Item）。
水平映射有以下几种：
水平标量映射，映射值类型为标量。例如：map&lt;int32, int32&gt;。 水平结构体映射，映射值类型为结构体。例如：map&lt;int32, Item&gt;。 水平预定义结构体映射，映射值类型为预定义结构体。例如：map&lt;int32, .Item&gt;。 `}).add({id:197,href:"/zh/docs/excel/map/#水平标量映射horizontal-scalar-map",title:"映射（Map） / 水平标量映射（Horizontal scalar map） ",description:"映射使用指南。",content:` 无需单独支持，请使用 map&lt;int32, Item&gt; 代替。
`}).add({id:198,href:"/zh/docs/excel/map/#水平结构体映射horizontal-struct-map",title:"映射（Map） / 水平结构体映射（Horizontal struct map） ",description:"映射使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt; string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 2 Orange 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:199,href:"/zh/docs/excel/map/#水平预定义结构体映射horizontal-predefined-struct-map",title:"映射（Map） / 水平预定义结构体映射（Horizontal predefined-struct map） ",description:"映射使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Num Item2ID Item2Num Item3ID Item3Num map&lt;int32, .Item&gt; int32 int32 int32 int32 int32 Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item3&rsquo;s num Item3&rsquo;s ID Item3&rsquo;s num 1 100 2 200 3 300 生成结果：
hello_world.proto ItemConf.json `}).add({id:200,href:"/zh/docs/excel/map/#垂直映射vertical-map",title:"映射（Map） / 垂直映射（Vertical map） ",description:"映射使用指南。",content:` 垂直映射有以下几种：
垂直标量映射，映射值类型为标量。例如：map&lt;int32, int32&gt;。 垂直结构体映射，映射值类型为结构体。例如：map&lt;int32, Item&gt;。 垂直预定义结构体映射，映射值类型为预定义结构体。例如：map&lt;int32, .Item&gt;。 `}).add({id:201,href:"/zh/docs/excel/map/#垂直标量映射vertical-scalar-map",title:"映射（Map） / 垂直标量映射（Vertical scalar map） ",description:"映射使用指南。",content:` 无需单独支持，请使用 map&lt;int32, Item&gt; 代替。
`}).add({id:202,href:"/zh/docs/excel/map/#垂直结构体映射vertical-struct-map",title:"映射（Map） / 垂直结构体映射（Vertical struct map） ",description:"映射使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Desc map&lt;uint32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. 生成结果：
hello_world.proto ItemConf.json `}).add({id:203,href:"/zh/docs/excel/map/#垂直预定义结构体映射vertical-predefined-struct-map",title:"映射（Map） / 垂直预定义结构体映射（Vertical predefined-struct map） ",description:"映射使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Num map&lt;int32, .Item&gt; int32 Item&rsquo;s ID Item&rsquo;s num 1 100 2 200 3 300 生成结果：
hello_world.proto ItemConf.json `}).add({id:204,href:"/zh/docs/excel/map/#incell-map",title:"映射（Map） / 单元格内映射（Incell map） ",description:"映射使用指南。",content:` 单元格内映射有以下几种：
单元格内标量映射，映射值类型为标量。例如：map&lt;int32, int32&gt;。 单元格内结构体映射，映射值类型为结构体。例如：map&lt;int32, Item&gt;。 `}).add({id:205,href:"/zh/docs/excel/map/#单元格内标量映射incell-scalar-map",title:"映射（Map） / 单元格内标量映射（Incell scalar map） ",description:"映射使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item map&lt;uint32, string&gt; Item key-value pairs 1:Apple,2:Orange,3:Banana,4,:Peach Item 列的类型为单元格内映射 map&lt;uint32, string&gt;，映射值为标量类型 string。
[!IMPORTANT] 如果希望使用显式模式 [Key:Value]...，请将字段属性 present 设置为 true。 参见 选项 present。
生成结果：
hello_world.proto ItemConf.json `}).add({id:206,href:"/zh/docs/excel/map/#单元格内枚举映射incell-enum-map",title:"映射（Map） / 单元格内枚举映射（Incell enum map） ",description:"映射使用指南。",content:` 对于单元格内映射，键和值都可以是枚举类型。
例如，common.proto 中预定义的枚举类型 FruitType 和 FruitFlavor：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Fruit Flavor Item map&lt;enum&lt;.FruitType&gt;, int64&gt; map&lt;int64, enum&lt;.FruitFlavor&raquo; map&lt;enum&lt;.FruitType&gt;, enum&lt;.FruitFlavor&raquo; Fruits Flavors Items Apple:1,Orange:2 1:Fragrant,2:Sweet Apple:Fragrant,Orange:Sour 生成结果：
hello_world.proto ItemConf.json `}).add({id:207,href:"/zh/docs/excel/map/#空键映射empty-key-map",title:"映射（Map） / 空键映射（Empty key map） ",description:"映射使用指南。",content:` 如果映射的键未配置，则视为键类型的默认值。默认值参见 标量类型。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s name 1 Apple Orange 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:208,href:"/zh/docs/excel/map/#枚举键映射enum-key-map",title:"映射（Map） / 枚举键映射（Enum key map） ",description:"映射使用指南。",content:` 根据 protobuf 文档对 映射键的类型 的限制：
&hellip; key_type 可以是任意整数或字符串类型（即除浮点类型和 bytes 之外的任意 标量 类型）。注意，enum 不是有效的 key_type。
然而，在某些场景下，以枚举作为键类型非常有用。因此我们以一种简单的方式支持它：
枚举类型作为映射键类型时，视为 int32， 枚举类型保留在映射值类型（结构体）中。 例如，common.proto 中预定义的枚举类型 FruitType：
则 map&lt;enum&lt;.FruitType&gt;, ValueType&gt; 会被转换为 map&lt;int32, ValueType&gt;， 且 FruitType 保留在 ValueType 中：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type Price map&lt;enum&lt;.FruitType&gt;, Item&gt; int32 Item&rsquo;s type Item&rsquo;s price Apple 100 Orange 200 Banana 300 生成结果：
hello_world.proto ItemConf.json `}).add({id:209,href:"/zh/docs/excel/map/#水平映射大小",title:"映射（Map） / 水平映射大小 ",description:"映射使用指南。",content:`
`}).add({id:210,href:"/zh/docs/excel/map/#动态大小",title:"映射（Map） / 动态大小 ",description:"映射使用指南。",content:` 默认情况下，所有映射都是动态大小类型。Map 条目应连续存在，否则如果中间存在空条目会报错。
`}).add({id:211,href:"/zh/docs/excel/map/#固定大小",title:"映射（Map） / 固定大小 ",description:"映射使用指南。",content:` 隐式固定大小 # Map 大小由名称行中最大存在的映射条目数量自动确定。
在下面的示例中，虽然第二个映射条目 Item2 为空，但由于字段属性 fixed 设置为 true，这是合法的。此外，Item2 也会作为空映射条目生成，可以在生成的 ItemConf.json 文件中看到。
[!CAUTION] 若插入多个空映射条目，实际上只会生成一个——因为所有空映射条目的键相同。这与列表的行为不同，请特别注意。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt;|{fixed:true} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana 生成结果：
hello_world.proto ItemConf.json 显式固定大小 # Map 大小由字段属性 size 显式设置。
在下面的示例中，字段属性 size 设置为 2，则第二个映射条目 Item2 之后的所有映射条目都会被截断。此外，Item2 也会作为空映射条目生成，可以在生成的 ItemConf.json 文件中看到。
[!CAUTION] 若插入多个空映射条目，实际上只会生成一个——因为所有空映射条目的键相同。这与列表的行为不同，请特别注意。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt;|{size:2} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:212,href:"/zh/docs/excel/map/#高级特性",title:"映射（Map） / 高级特性 ",description:"映射使用指南。",content:`
`}).add({id:213,href:"/zh/docs/excel/map/#水平跳列映射horizontal-column-skipped-map",title:"映射（Map） / 水平跳列映射（Horizontal column-skipped map） ",description:"映射使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU D Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; map&lt;int32, Prop&gt; int32 int32 int32 Item&rsquo;s ID Prop1&rsquo;s ID Prop1&rsquo;s name Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s name Prop2&rsquo;s value 1 1 Apple 100 2 Orange 200 2 3 Banana 300 4 Pomelo 400 3 5 Watermelon 500 生成结果：
hello_world.proto ItemConf.json `}).add({id:214,href:"/zh/docs/excel/keyedlist/#语法",title:"键控列表（KeyedList） / 语法 ",description:"Excel keyed list 使用指南。",content:` 键控列表与普通列表相同，区别在于 ColumnType（第一个字段类型）被尖括号 &lt;&gt; 包围，并作为键处理。
语法：[ElemType]&lt;ColumnType&gt;
`}).add({id:215,href:"/zh/docs/excel/keyedlist/#水平键控列表horizontal-keyedlist",title:"键控列表（KeyedList） / 水平键控列表（Horizontal KeyedList） ",description:"Excel keyed list 使用指南。",content:` TODO&hellip;
`}).add({id:216,href:"/zh/docs/excel/keyedlist/#vertical-keyedlist",title:"键控列表（KeyedList） / 垂直键控列表（Vertical KeyedList） ",description:"Excel keyed list 使用指南。",content:`
`}).add({id:217,href:"/zh/docs/excel/keyedlist/#垂直标量键控列表vertical-scalar-keyedlist",title:"键控列表（KeyedList） / 垂直标量键控列表（Vertical scalar KeyedList） ",description:"Excel keyed list 使用指南。",content:` [!NOTE] 定义方式与 单元格内标量键控列表 相同，但如果提供了多行数据，会进行聚合。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []&lt;uint32&gt; ID 1,2,3 4,5 6 生成结果：
hello_world.proto ItemConf.json `}).add({id:218,href:"/zh/docs/excel/keyedlist/#垂直枚举键控列表vertical-enum-keyedlist",title:"键控列表（KeyedList） / 垂直枚举键控列表（Vertical enum KeyedList） ",description:"Excel keyed list 使用指南。",content:` [!NOTE] 定义方式与 单元格内枚举键控列表 相同，但如果提供了多行数据，会进行聚合。
common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type []&lt;enum&lt;.FruitType&gt;&gt; Type Apple,Orange FRUIT_TYPE_BANANA 0 生成结果：
hello_world.proto ItemConf.json `}).add({id:219,href:"/zh/docs/excel/keyedlist/#垂直结构体键控列表vertical-struct-keyedlist",title:"键控列表（KeyedList） / 垂直结构体键控列表（Vertical struct KeyedList） ",description:"Excel keyed list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID PropID PropName [Item]&lt;uint32&gt; map&lt;int32, Prop&gt; string Item&rsquo;s ID Prop&rsquo;s ID Prop&rsquo;s name 1 1 sweet 2 1 sweet 2 2 delicious 生成结果：
hello_world.proto ItemConf.json `}).add({id:220,href:"/zh/docs/excel/keyedlist/#单元格内键控列表incell-keyedlist",title:"键控列表（KeyedList） / 单元格内键控列表（Incell KeyedList） ",description:"Excel keyed list 使用指南。",content:`
`}).add({id:221,href:"/zh/docs/excel/keyedlist/#单元格内标量键控列表",title:"键控列表（KeyedList） / 单元格内标量键控列表（Incell scalar KeyedList） ",description:"Excel keyed list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []&lt;uint32&gt; ID list 1,2,3 生成结果：
hello_world.proto ItemConf.json `}).add({id:222,href:"/zh/docs/excel/keyedlist/#单元格内枚举键控列表",title:"键控列表（KeyedList） / 单元格内枚举键控列表（Incell enum KeyedList） ",description:"Excel keyed list 使用指南。",content:` common.proto 中预定义的枚举类型 FruitType：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []enum&lt;.FruitType&gt; Param list 1,FRUIT_TYPE_ORANGE,Banana Param 列的类型为 incell list []enum&lt;.FruitType&gt;，list 元素为预定义枚举类型 FruitType。
生成结果：
hello_world.proto ItemConf.json `}).add({id:223,href:"/zh/docs/excel/wellknown-types/#datetime",title:"知名类型（Wellknown types） / 日期时间（Datetime） ",description:"Wellknown types 使用指南。",content:`
`}).add({id:224,href:"/zh/docs/excel/wellknown-types/#datetime-1",title:"知名类型（Wellknown types） / 日期时间（Datetime） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 日期时间
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginDatetime EndDatetime Datetime datetime datetime []datetime Begin datetime End datetime Datetime 2020-01-01 10:25:00 2022-10-10 05:10:00 2020-01-01 10:25:00,2022-10-10 05:10:00 生成结果：
hello_world.proto ItemConf.json `}).add({id:225,href:"/zh/docs/excel/wellknown-types/#date",title:"知名类型（Wellknown types） / 日期（Date） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 日期时间
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginDate EndDate Date date date []date Begin date End date Date 2020-01-01 20221010 2020-01-01,20221010 生成结果：
hello_world.proto ItemConf.json `}).add({id:226,href:"/zh/docs/excel/wellknown-types/#time",title:"知名类型（Wellknown types） / 时间（Time） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 日期时间
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginTime EndTime Time time time []time Begin time End time Time 10:25:00 1125 10:25:00,1125 生成结果：
hello_world.proto ItemConf.json `}).add({id:227,href:"/zh/docs/excel/wellknown-types/#duration",title:"知名类型（Wellknown types） / 时长（Duration） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 时长
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Duration1 Duration2 Duration duration duration []duration Duration 1 Duration 2 Duration 1h2m3s 4ms5us6ns 1h2m3s,4ms5us6ns 生成结果：
hello_world.proto ItemConf.json `}).add({id:228,href:"/zh/docs/excel/wellknown-types/#fraction",title:"知名类型（Wellknown types） / 分数（Fraction） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 分数
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU MinRatio Ratio1 Ratio2 Ratio3 Ratio4 Ratio5 fraction []fraction fraction fraction fraction fraction min ratio ratio1 ratio 2 ratio 3 ratio 4 ratio 5 1/4 10% 10‰ 10‱ 10 0.01 生成结果：
hello_world.proto ItemConf.json `}).add({id:229,href:"/zh/docs/excel/wellknown-types/#comparator",title:"知名类型（Wellknown types） / 比较器（Comparator） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 比较器
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU MinRatio Ratio1 Ratio2 Ratio3 Ratio4 Ratio5 comparator []comparator comparator comparator comparator comparator min ratio ratio1 ratio 2 ratio 3 ratio 4 ratio 5 !=1/4 &lt;10% &lt;=10‰ &gt;10‱ &gt;=10 ==3/5 生成结果：
hello_world.proto ItemConf.json `}).add({id:230,href:"/zh/docs/excel/wellknown-types/#version",title:"知名类型（Wellknown types） / 版本号（Version） ",description:"Wellknown types 使用指南。",content:` [!NOTE] 参考 Basics: 版本号
默认 pattern 为：255.255.255。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Version CustomVersion IncellVersion HorizontalVersion1 HorizontalVersion2 HorizontalVersion3 version version|{pattern:&ldquo;99.999.99.999.99.999&rdquo;} []version|{pattern:&ldquo;999.999.999&rdquo;} []version|{pattern:&ldquo;999.999.999&rdquo;} version version default version custom version incell version horizontal version1 horizontal version2 horizontal version3 1.0.3 1.2.3.4.5.6 1.2.3,4.5.6 1.0.0 1.2.3 2.0.3 生成结果：
hello_world.proto ItemConf.json `}).add({id:231,href:"/zh/docs/excel/struct-in-struct/#结构体嵌套结构体struct-in-struct",title:"结构体嵌套结构体（Struct in struct） / 结构体嵌套结构体（Struct in struct） ",description:"Excel struct in struct 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItemID RewardItemNum {Reward}int32 {Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s num 1 1 10 生成结果：
hello_world.proto ItemConf.json `}).add({id:232,href:"/zh/docs/excel/struct-in-struct/#结构体嵌套预定义结构体predefined-struct-in-struct",title:"结构体嵌套结构体（Struct in struct） / 结构体嵌套预定义结构体（Predefined-struct in struct） ",description:"Excel struct in struct 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItemID RewardItemNum {Reward}int32 {.Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s num 1 1 10 生成结果：
hello_world.proto ItemConf.json `}).add({id:233,href:"/zh/docs/excel/struct-in-struct/#结构体嵌套单元格内结构体incell-struct-in-struct",title:"结构体嵌套结构体（Struct in struct） / 结构体嵌套单元格内结构体（Incell-struct in struct） ",description:"Excel struct in struct 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItem {Reward}int32 {int32 ID, int32 Num}Item Reward&rsquo;s ID Reward&rsquo;s item 1 1,100 2,200 生成结果：
hello_world.proto ItemConf.json `}).add({id:234,href:"/zh/docs/excel/struct-in-list/#垂直列表中的嵌套",title:"列表嵌套结构体（Struct in list） / 垂直列表中的嵌套 ",description:"Excel struct in list 使用指南。",content:`
`}).add({id:235,href:"/zh/docs/excel/struct-in-list/#垂直列表嵌套结构体struct-in-vertical-list",title:"列表嵌套结构体（Struct in list） / 垂直列表嵌套结构体（Struct in vertical-list） ",description:"Excel struct in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]uint32 string {Prop}int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 2 20 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:236,href:"/zh/docs/excel/struct-in-list/#垂直列表嵌套单元格内结构体incell-struct-in-vertical-list",title:"列表嵌套结构体（Struct in list） / 垂直列表嵌套单元格内结构体（Incell-struct in vertical-list） ",description:"Excel struct in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID [Item]uint32 string {int32 ID,int64 Value}Prop Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID 1 Apple 1,100 2 Orange 2,200 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:237,href:"/zh/docs/excel/struct-in-list/#水平列表的第一个字段",title:"列表嵌套结构体（Struct in list） / 水平列表的第一个字段 ",description:"Excel struct in list 使用指南。",content:`
`}).add({id:238,href:"/zh/docs/excel/struct-in-list/#水平列表嵌套结构体struct-in-horizontal-list",title:"列表嵌套结构体（Struct in list） / 水平列表嵌套结构体（Struct in horizontal-list） ",description:"Excel struct in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ItemID Reward1ItemNum Reward1Name Reward2ItemID Reward2ItemNum Reward2Name [Reward]{Item}int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:239,href:"/zh/docs/excel/struct-in-list/#水平列表嵌套预定义结构体predefined-struct-in-horizontal-list",title:"列表嵌套结构体（Struct in list） / 水平列表嵌套预定义结构体（Predefined-struct in horizontal-list） ",description:"Excel struct in list 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ItemID Reward1ItemNum Reward1Name Reward2ItemID Reward2ItemNum Reward2Name [Reward]{.Item}int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:240,href:"/zh/docs/excel/struct-in-list/#水平列表嵌套单元格内结构体incell-struct-in-horizontal-list",title:"列表嵌套结构体（Struct in list） / 水平列表嵌套单元格内结构体（Incell-struct in horizontal-list） ",description:"Excel struct in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item Reward1Name Reward2Item Reward2Name [Reward]{int32 ID, int32 Num}Item string Item string Reward1&rsquo;s item Reward&rsquo;s name Reward2&rsquo;s item Reward&rsquo;s name 1,10 Lotto 2,20 Super Lotto 生成结果：
ItemConf.json `}).add({id:241,href:"/zh/docs/excel/struct-in-map/#垂直映射中的嵌套",title:"映射嵌套结构体（Struct in map） / 垂直映射中的嵌套 ",description:"Excel struct in map 使用指南。",content:`
`}).add({id:242,href:"/zh/docs/excel/struct-in-map/#垂直映射嵌套结构体struct-in-vertical-map",title:"映射嵌套结构体（Struct in map） / 垂直映射嵌套结构体（Struct in vertical-map） ",description:"Excel struct in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID ItemID ItemNum map&lt;int32, Reward&gt; {Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s Num 1 1 10 2 2 20 3 生成结果：
hello_world.proto ItemConf.json `}).add({id:243,href:"/zh/docs/excel/struct-in-map/#垂直映射嵌套预定义结构体predefined-struct-in-vertical-map",title:"映射嵌套结构体（Struct in map） / 垂直映射嵌套预定义结构体（Predefined-struct in vertical-map） ",description:"Excel struct in map 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID ItemID ItemNum map&lt;int32, Reward&gt; {.Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s Num 1 1 10 2 2 20 3 生成结果：
hello_world.proto ItemConf.json `}).add({id:244,href:"/zh/docs/excel/struct-in-map/#垂直映射嵌套单元格内结构体incell-struct-in-vertical-map",title:"映射嵌套结构体（Struct in map） / 垂直映射嵌套单元格内结构体（Incell-struct in vertical-map） ",description:"Excel struct in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Item map&lt;int32, Reward&gt; {int32 ID, int32 Num}Item Reward&rsquo;s ID Item&rsquo;s info 1 1,100 2 2,200 3 生成结果：
hello_world.proto ItemConf.json `}).add({id:245,href:"/zh/docs/excel/list-in-list/#垂直列表中的嵌套",title:"列表嵌套列表（List in list） / 垂直列表中的嵌套 ",description:"Excel list in list 使用指南。",content:`
`}).add({id:246,href:"/zh/docs/excel/list-in-list/#垂直列表嵌套水平列表horizontal-list-in-vertical-list",title:"列表嵌套列表（List in list） / 垂直列表嵌套水平列表（Horizontal-list in vertical-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value [Item]uint32 string [Prop]int32 int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:247,href:"/zh/docs/excel/list-in-list/#垂直键控列表嵌套垂直列表vertical-list-in-vertical-keyed-list",title:"列表嵌套列表（List in list） / 垂直键控列表嵌套垂直列表（Vertical-list in vertical-keyed-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]&lt;uint32&gt; string [Prop]int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:248,href:"/zh/docs/excel/list-in-list/#垂直键控列表嵌套垂直键控列表vertical-keyed-list-in-vertical-keyed-list",title:"列表嵌套列表（List in list） / 垂直键控列表嵌套垂直键控列表（Vertical-keyed-list in vertical-keyed-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc PropID PropNum [KeyedItem]&lt;uint32&gt; string [Prop]&lt;uint32&gt; int32 Item&rsquo;s ID Item&rsquo;s desc Prop&rsquo;s ID Prop&rsquo;s num 1 Apple 10 100 1 Banana 11 110 2 Orange 20 200 生成结果：
hello_world.proto ItemConf.json `}).add({id:249,href:"/zh/docs/excel/list-in-list/#垂直键控列表嵌套单元格内列表incell-list-in-vertical-keyed-list",title:"列表嵌套列表（List in list） / 垂直键控列表嵌套单元格内列表（Incell-list in vertical-keyed-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop [Item]uint32 []int32 Item&rsquo;s ID Item&rsquo;s props 1 10,20,30 2 10,20 3 10 生成结果：
hello_world.proto ItemConf.json `}).add({id:250,href:"/zh/docs/excel/list-in-list/#垂直键控列表嵌套单元格内键控列表incell-keyed-list-in-vertical-keyed-list",title:"列表嵌套列表（List in list） / 垂直键控列表嵌套单元格内键控列表（Incell-keyed-list in vertical-keyed-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc Tip [KeyedItem]&lt;uint32&gt;|{unique:false} string []&lt;uint32&gt; Item&rsquo;s ID Item&rsquo;s desc Item&rsquo;s tip 1 Apple 1,2,3 1 Banana 4,5 2 Orange 1,2 父级 struct keyed-list 需要聚合 incell keyed-list，因此需要将字段属性 unique 设置为 false。
生成结果：
hello_world.proto ItemConf.json `}).add({id:251,href:"/zh/docs/excel/list-in-list/#水平列表中的嵌套",title:"列表嵌套列表（List in list） / 水平列表中的嵌套 ",description:"Excel list in list 使用指南。",content:`
`}).add({id:252,href:"/zh/docs/excel/list-in-list/#水平列表嵌套水平列表horizontal-list-in-horizontal-list",title:"列表嵌套列表（List in list） / 水平列表嵌套水平列表（Horizontal-list in horizontal-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward][Item]int32 int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:253,href:"/zh/docs/excel/list-in-list/#水平列表嵌套预定义结构体列表predefined-struct-list-in-horizontal-list",title:"列表嵌套列表（List in list） / 水平列表嵌套预定义结构体列表（Predefined-struct-list in horizontal-list） ",description:"Excel list in list 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward][.Item]int32 int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:254,href:"/zh/docs/excel/list-in-list/#水平列表嵌套单元格内列表incell-list-in-horizontal-list",title:"列表嵌套列表（List in list） / 水平列表嵌套单元格内列表（Incell-list in horizontal-list） ",description:"Excel list in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Task1Param Task2Param Task3Param [Task][]int32 []int32 []int32 Task1 Task2 Task3 1,2 3,4 5,6,7 生成结果：
hello_world.proto ItemConf.json `}).add({id:255,href:"/zh/docs/excel/list-in-map/#垂直映射中的嵌套",title:"映射嵌套列表（List in map） / 垂直映射中的嵌套 ",description:"Excel list in map 使用指南。",content:`
`}).add({id:256,href:"/zh/docs/excel/list-in-map/#垂直映射嵌套水平列表horizontal-list-in-vertical-map",title:"映射嵌套列表（List in map） / 垂直映射嵌套水平列表（Horizontal-list in vertical-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; string [Prop]int32 int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:257,href:"/zh/docs/excel/list-in-map/#horizontal-aggregate-list-in-vertical-map",title:"映射嵌套列表（List in map） / 垂直映射嵌套水平聚合列表（Horizontal-aggregate-list in vertical-map） ",description:"Excel list in map 使用指南。",content:` [!NOTE] 当键相同的多行需要把水平展开的键控列表元素跨行追加到同一个父记录时， 在水平列表字段上设置 prop:{aggregate:true}， 父映射的键字段同时设置 prop:{unique:false} 允许重复键。
重复键控列表素会触发 E2028。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Param1ID Param1Num Param2ID Param2Num map&lt;uint32, Item&gt;|{unique:false} string [Param]uint32|{aggregate:true} int32 uint32 int32 Item&rsquo;s ID Item&rsquo;s name Param1&rsquo;s ID Param1&rsquo;s num Param2&rsquo;s ID Param2&rsquo;s num 1 Apple 101 10 1 102 20 2 Orange 201 30 202 40 3 Banana 301 50 生成结果：
hello_world.proto ItemConf.json `}).add({id:258,href:"/zh/docs/excel/list-in-map/#垂直映射嵌套垂直列表vertical-list-in-vertical-map",title:"映射嵌套列表（List in map） / 垂直映射嵌套垂直列表（Vertical-list in vertical-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue map&lt;uint32, Item&gt; string [Prop]int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:259,href:"/zh/docs/excel/list-in-map/#垂直映射嵌套单元格内列表incell-list-in-vertical-map",title:"映射嵌套列表（List in map） / 垂直映射嵌套单元格内列表（Incell-list in vertical-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;uint32, Item&gt; []int32 Item&rsquo;s ID Item&rsquo;s props 1 10,20,30 2 10,20 3 10 生成结果：
hello_world.proto ItemConf.json `}).add({id:260,href:"/zh/docs/excel/list-in-map/#垂直映射嵌套单元格内结构体列表incell-struct-list-in-vertical-map",title:"映射嵌套列表（List in map） / 垂直映射嵌套单元格内结构体列表（Incell-struct-list in vertical-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Item map&lt;uint32, Reward&gt; []{uint32 ID,int32 Num}Item Reward&rsquo;s ID Reward&rsquo;s items 1 1001:10,1002:20,1003:30 2 2001:10,2002:20 生成结果：
hello_world.proto ItemConf.json `}).add({id:261,href:"/zh/docs/excel/list-in-map/#水平映射中的嵌套",title:"映射嵌套列表（List in map） / 水平映射中的嵌套 ",description:"Excel list in map 使用指南。",content:`
`}).add({id:262,href:"/zh/docs/excel/list-in-map/#水平映射嵌套水平列表horizontal-list-in-horizontal-map",title:"映射嵌套列表（List in map） / 水平映射嵌套水平列表（Horizontal-list in horizontal-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward2ID Reward2Item1ID Reward2Item1Num map&lt;uint32, Reward&gt; [Item]uint32 int32 uint32 int32 uint32 uint32 int32 Reward1 ID Reward1 item1 ID Reward1 item1 num Reward1 item2 ID Reward1 item2 num Reward2 ID Reward2 item1 ID Reward2 item1 num 1 1 10 2 20 2 3 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:263,href:"/zh/docs/excel/list-in-map/#水平映射嵌套单元格内列表incell-list-in-horizontal-map",title:"映射嵌套列表（List in map） / 水平映射嵌套单元格内列表（Incell-list in horizontal-map） ",description:"Excel list in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item Reward2ID Reward2Item map&lt;uint32, Reward&gt; []{uint32 ID,int32 Num}Item uint32 []Item Reward1 ID Reward1 items Reward2 ID Reward2 items 1 1:10,2:20 2 3:30 对于 predefined struct list，可以使用 []{.Item} 代替 []{uint32 ID,int32 Num}Item。
生成结果：
hello_world.proto ItemConf.json `}).add({id:264,href:"/zh/docs/excel/map-in-list/#垂直列表中的嵌套",title:"列表嵌套映射（Map in list） / 垂直列表中的嵌套 ",description:"Excel map in list 使用指南。",content:`
`}).add({id:265,href:"/zh/docs/excel/map-in-list/#垂直列表嵌套水平映射horizontal-map-in-vertical-list",title:"列表嵌套映射（Map in list） / 垂直列表嵌套水平映射（Horizontal-map in vertical-list） ",description:"Excel map in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value [Item]uint32 string map&lt;int32, Prop&gt; int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:266,href:"/zh/docs/excel/map-in-list/#垂直键控列表嵌套垂直映射vertical-map-in-vertical-keyed-list",title:"列表嵌套映射（Map in list） / 垂直键控列表嵌套垂直映射（Vertical-map in vertical-keyed-list） ",description:"Excel map in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]&lt;uint32&gt; string map&lt;int32, Prop&gt; int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:267,href:"/zh/docs/excel/map-in-list/#垂直列表嵌套单元格内映射incell-map-in-vertical-list",title:"列表嵌套映射（Map in list） / 垂直列表嵌套单元格内映射（Incell-map in vertical-list） ",description:"Excel map in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Props [Item]uint32 map&lt;int32, string&gt; Item&rsquo;s ID Item&rsquo;s props 1 1:sour,2:sweet,3:delicious 2 1:sour,2:sweet 3 1:sour 生成结果：
hello_world.proto ItemConf.json `}).add({id:268,href:"/zh/docs/excel/map-in-list/#水平列表的第一个字段",title:"列表嵌套映射（Map in list） / 水平列表的第一个字段 ",description:"Excel map in list 使用指南。",content:`
`}).add({id:269,href:"/zh/docs/excel/map-in-list/#水平列表嵌套水平映射horizontal-map-in-horizontal-list",title:"列表嵌套映射（Map in list） / 水平列表嵌套水平映射（Horizontal-map in horizontal-list） ",description:"Excel map in list 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward]map&lt;int32, Item&gt; int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:270,href:"/zh/docs/excel/map-in-list/#水平列表嵌套预定义结构体映射predefined-struct-map-in-horizontal-list",title:"列表嵌套映射（Map in list） / 水平列表嵌套预定义结构体映射（Predefined-struct-map in horizontal-list） ",description:"Excel map in list 使用指南。",content:` common.proto 中预定义的 Item：
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward]map&lt;int32, .Item&gt; int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto 生成结果：
hello_world.proto ItemConf.json `}).add({id:271,href:"/zh/docs/excel/map-in-map/#垂直映射中的嵌套",title:"映射嵌套映射（Map in map） / 垂直映射中的嵌套 ",description:"Excel map in map 使用指南。",content:`
`}).add({id:272,href:"/zh/docs/excel/map-in-map/#垂直映射嵌套水平映射horizontal-map-in-vertical-map",title:"映射嵌套映射（Map in map） / 垂直映射嵌套水平映射（Horizontal-map in vertical-map） ",description:"Excel map in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana 生成结果：
hello_world.proto ItemConf.json `}).add({id:273,href:"/zh/docs/excel/map-in-map/#horizontal-aggregate-map-in-vertical-map",title:"映射嵌套映射（Map in map） / 垂直映射嵌套水平聚合映射（Horizontal-aggregate-map in vertical-map） ",description:"Excel map in map 使用指南。",content:` [!NOTE] 当键相同的多行需要把水平展开的子映射元素跨行合并到同一个父记录时， 在水平映射字段上设置 prop:{aggregate:true}， 父映射的键字段同时设置 prop:{unique:false} 允许重复键。
子映射的键跨行重复会触发 E2005。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt;|{unique:false} string map&lt;int32, Prop&gt;|{aggregate:true} int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 1 2 20 2 Orange 3 30 4 40 3 Banana 5 50 生成结果：
hello_world.proto ItemConf.json `}).add({id:274,href:"/zh/docs/excel/map-in-map/#垂直映射嵌套垂直映射vertical-map-in-vertical-map",title:"映射嵌套映射（Map in map） / 垂直映射嵌套垂直映射（Vertical-map in vertical-map） ",description:"Excel map in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Orange 2 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:275,href:"/zh/docs/excel/map-in-map/#垂直映射嵌套单元格内映射incell-map-in-vertical-map",title:"映射嵌套映射（Map in map） / 垂直映射嵌套单元格内映射（Incell-map in vertical-map） ",description:"Excel map in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Props map&lt;uint32, Item&gt; map&lt;int32, string&gt; Item&rsquo;s ID Item&rsquo;s props 1 1:sour,2:sweet,3:delicious 2 1:sour,2:sweet 3 1:sour 生成结果：
hello_world.proto ItemConf.json `}).add({id:276,href:"/zh/docs/excel/map-in-map/#水平映射中的嵌套",title:"映射嵌套映射（Map in map） / 水平映射中的嵌套 ",description:"Excel map in map 使用指南。",content:`
`}).add({id:277,href:"/zh/docs/excel/map-in-map/#水平映射嵌套水平映射horizontal-map-in-horizontal-map",title:"映射嵌套映射（Map in map） / 水平映射嵌套水平映射（Horizontal-map in horizontal-map） ",description:"Excel map in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward2ID Reward2Item1ID Reward2Item1Num map&lt;uint32, Reward&gt; map&lt;uint32, Item&gt; int32 uint32 int32 uint32 uint32 int32 Reward1 ID Reward1 item1 ID Reward1 item1 num Reward1 item2 ID Reward1 item2 num Reward2 ID Reward2 item1 ID Reward2 item1 num 1 1 10 2 20 2 3 30 生成结果：
hello_world.proto ItemConf.json `}).add({id:278,href:"/zh/docs/excel/map-in-map/#水平映射嵌套单元格内映射incell-map-in-horizontal-map",title:"映射嵌套映射（Map in map） / 水平映射嵌套单元格内映射（Incell-map in horizontal-map） ",description:"Excel map in map 使用指南。",content:` HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item Reward2ID Reward2Item map&lt;uint32, Reward&gt; map&lt;uint32, int32&gt; uint32 map&lt;uint32, int32&gt; Reward1 ID Reward1 items Reward2 ID Reward2 items 1 1:10,2:20 2 3:30 生成结果：
hello_world.proto ItemConf.json `}).add({id:279,href:"/zh/docs/excel/infinite-nesting/#概述",title:"无限嵌套 / 概述 ",description:"Excel 无限嵌套使用指南。",content:` 现在，水平/垂直列表元素的第一个字段可以是任意类型，包括结构体、列表和映射。
列表元素的第一个字段是结构体：[Reward]{Icon}int32 列表元素的第一个字段是预定义结构体：[Cost]{.Item}uint32 列表元素的第一个字段是单元格内结构体：[Magic]{int32 Id, int32 Num}Ability 列表元素的第一个字段是列表：[Reward][Item]uint32 列表元素的第一个字段是元素为预定义结构体的列表：[Power][.Item]uint32 列表元素的第一个字段是映射：[Superpower]map&lt;uint32, Ability&gt; TODO: 补充清晰的示例。
`}).add({id:280,href:"/zh/docs/excel/infinite-nesting/#嵌套命名",title:"无限嵌套 / 嵌套命名 ",description:"Excel 无限嵌套使用指南。",content:` common.proto 中的预定义类型：
HelloWorld.xlsx&nbsp; LoaderConf @TABLEAU ServerType ServerConfType ServerConfConditionType ServerConfConditionValue map&lt;enum&lt;.ServerType&gt;, Server&gt; [Conf]&lt;enum&lt;.ConfType&raquo; [Condition] int32 Server name Sheet name Condition type Condition value SERVER_TYPE_GAME CONF_TYPE_CLOUD 0 113 0 134 SERVER_TYPE_ACTIVITY CONF_TYPE_CLOUD 1 CONF_TYPE_LOCAL 9 34 CONF_TYPE_LOCAL 9 12 CONF_TYPE_LOCAL Remote MatchServer CONF_TYPE_UNKNOWN Sheet Nested LoaderConf true 生成结果：
hello_world.proto loader_conf.json `}).add({id:281,href:"/zh/docs/excel/field-property/#概览",title:"字段属性（Field property） / 概览 ",description:"Tableau field property 使用指南。",content:` 选项 类型 说明 unique bool 检查字段唯一性。
默认值：false。对于映射（或键控列表）的键，默认值会自动推断。 range string 格式：&quot;left,right&quot;。例如：&quot;1,10&quot;、&quot;1,~&quot;、&quot;~,10&quot;。
range 的不同含义：
- 数字：值范围。
- 字符串：UTF-8 码点数量。 refer string 格式：&quot;SheetName(SheetAlias).ColumnName&quot;。
确保该字段的值在另一个工作表的列值空间中。多个 refer 用逗号分隔。 sequence int64 确保该字段的值是一个从指定值开始的序列。 default string 如果单元格为空，则使用此默认值。 fixed bool 自动检测水平列表/映射的固定大小。
默认值：false。 size uint32 指定水平列表/映射的固定大小。 form Form 指定单元格内结构体的单元格数据格式。
- FORM_TEXT
- FORM_JSON json_name string 指定字段的自定义 JSON 名称，替代 proto 字段名的 lowerCamelCase 形式。 present bool 如果 present 为 true，则必须显式填写单元格数据。
默认值：false。 optional bool 该字段是否为可选（字段名可缺失）。 patch Patch 字段 patch 类型。
- PATCH_REPLACE - PATCH_MERGE sep string 字段级分隔符。 subsep string 字段级子分隔符。 pattern string 指定标量、列表元素和映射值的模式。 order Order 确保字段的值按行/列/元素方向有序。
- ORDER_ASC（&gt;=）
- ORDER_DESC（&lt;=）
- ORDER_STRICTLY_ASC（&gt;）
- ORDER_STRICTLY_DESC（&lt;） validate string 适用于标量和知名类型的 protovalidate 字段级校验规则。
例如：&quot;string:{max_len:10}&quot;、&quot;int32:{gt:0 lte:100}&quot;、&quot;cel_expression:\\&quot;this &gt;= timestamp('2024-01-01T00:00:00Z')\\&quot;&quot;。 validate_complex string 适用于复合类型（列表/映射）的 protovalidate 字段级校验规则。
例如：&quot;repeated:{min_items:1}&quot;、&quot;map:{min_pairs:1}&quot;。 validate_message string 适用于字段所嵌套结构体的 protovalidate message 级校验规则。
例如：&quot;cel_expression:\\&quot;this.start_time &lt; this.end_time\\&quot;&quot;。 aggregate bool 适用于单元格内或水平的列表/映射字段。若为 true，当同一父记录被多行/多列重复访问时（如垂直映射/键控列表多行键相同、垂直列表跨多行、水平映射/列表跨多列等），会将每次访问产生的元素聚合到同一个集合中；若为 false，则要求所有行/列对该字段填写相同值，否则报 E2023。
默认值：false。 `}).add({id:282,href:"/zh/docs/excel/field-property/#选项-unique",title:"字段属性（Field property） / 选项 unique ",description:"Tableau field property 使用指南。",content:` 选项 unique 可在字段属性中指定为 true 或 false，用于检查列表/映射元素中任意标量字段的唯一性。
如果显式设置 unique 为 true，当出现重复值时 tableau 会报错。 如果显式设置 unique 为 false，则不进行检查。 `}).add({id:283,href:"/zh/docs/excel/field-property/#映射键控列表的键",title:"字段属性（Field property） / 映射/键控列表的键 ",description:"Tableau field property 使用指南。",content:` Tableau 会自动推断映射（或键控列表）键的 unique 是否为 true。
规则是：如果映射的值类型（或键控列表元素类型）没有相同布局（垂直/水平）的子映射/列表字段，则键必须唯一。
因此大多数情况下不需要显式配置。
`}).add({id:284,href:"/zh/docs/excel/field-property/#通用标量字段",title:"字段属性（Field property） / 通用标量字段 ",description:"Tableau field property 使用指南。",content:` 如果将通用标量字段的属性 unique 指定为 true，则 tableau 会检查该字段在映射或列表中的唯一性。
`}).add({id:285,href:"/zh/docs/excel/field-property/#选项-range",title:"字段属性（Field property） / 选项 range ",description:"Tableau field property 使用指南。",content:` [!WARNING] 当单元格数据为空（未填写）时，此检查将被跳过。若需对空单元格也强制执行检查，请将选项 present 设置为 true。
选项 range 的格式为：&quot;left,right&quot;（左右均为闭区间）。
range 的不同含义：
数字：值范围，例如：&quot;1,10&quot;、&quot;1,~&quot;、&quot;~,10&quot;。 `}).add({id:286,href:"/zh/docs/excel/field-property/#选项-refer",title:"字段属性（Field property） / 选项 refer ",description:"Tableau field property 使用指南。",content:` 选项 refer 类似于 SQL 中的外键（FOREIGN KEY）约束，用于防止破坏表之间关联的操作。但 tableau 的 refer 可以引用任意工作表的列（不限于 map key 列），并且支持多个 refer（逗号分隔）。它用于确保该字段的值至少在其他某个工作表的列值空间（即 message 的字段值空间）中存在。
格式：&quot;SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]...&quot;。
示例：
map&lt;uint32, Reward&gt;|{refer:&quot;ItemConf.ID&quot;}：无别名的单 refer，工作表名即为生成的 protobuf message 名。 map&lt;uint32, Reward&gt;|{refer:&quot;ItemConf.ID,EquipConf.ID&quot;}：无别名的多 refer，工作表别名即为生成的 protobuf message 名。 map&lt;uint32, Reward&gt;|{refer:&quot;Sheet1(ItemConf).ID&quot;}：有别名的单 refer，工作表别名即为生成的 protobuf message 名。 `}).add({id:287,href:"/zh/docs/excel/field-property/#选项-sequence",title:"字段属性（Field property） / 选项 sequence ",description:"Tableau field property 使用指南。",content:` 选项 sequence 用于确保该字段的值是一个从指定值开始的序列，可用于任意字段，包括嵌套列表/映射中的字段。
示例：
map&lt;uint32, Item&gt;|{sequence:1}：该映射键必须遵循从值 1 开始的序列规则。 int32|{sequence:1}：父级列表/映射的元素必须遵循从值 1 开始的序列规则。 `}).add({id:288,href:"/zh/docs/excel/field-property/#选项-default",title:"字段属性（Field property） / 选项 default ",description:"Tableau field property 使用指南。",content:` 如果设置了选项 default，则当单元格为空时使用该值作为默认值。
`}).add({id:289,href:"/zh/docs/excel/field-property/#选项-fixed",title:"字段属性（Field property） / 选项 fixed ",description:"Tableau field property 使用指南。",content:` 如果将选项 fixed 设置为 true，则自动检测水平列表/映射的固定大小。
示例：
列表: 隐式固定大小 映射: 隐式固定大小 `}).add({id:290,href:"/zh/docs/excel/field-property/#选项-size",title:"字段属性（Field property） / 选项 size ",description:"Tableau field property 使用指南。",content:` 选项 size 用于指定水平列表/映射的固定大小。
示例：
列表: 显式固定大小 映射: 显式固定大小 `}).add({id:291,href:"/zh/docs/excel/field-property/#选项-form",title:"字段属性（Field property） / 选项 form ",description:"Tableau field property 使用指南。",content:` 选项 form 用于指定 incell struct 的单元格数据格式。
可指定两种格式：
FORM_TEXT：protobuf text format。 FORM_JSON：protobuf JSON format。 详细示例请参考 高级预定义单元格内结构体。
`}).add({id:292,href:"/zh/docs/excel/field-property/#选项-json_name",title:"字段属性（Field property） / 选项 json_name ",description:"Tableau field property 使用指南。",content:` 默认情况下，JSON 名称由字段的 proto 名称转换为 camelCase 得到。现在可以通过 json_name 选项显式指定。
例如，HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Rarity_1 SpecialEffect_2 map&lt;int32, Item&gt; int32|{json_name:&ldquo;rarity_1&rdquo;} int32|{json_name:&ldquo;specialEffect_2&rdquo;} Item&rsquo;s ID Item&rsquo;s rarity. Item&rsquo;s special effect. 1 10 101 2 20 102 3 30 103 `}).add({id:293,href:"/zh/docs/excel/field-property/#选项-present",title:"字段属性（Field property） / 选项 present ",description:"Tableau field property 使用指南。",content:` 如果将选项 present 设置为 true，则单元格数据不能为空，必须显式填写，否则会报错。
`}).add({id:294,href:"/zh/docs/excel/field-property/#选项-optional",title:"字段属性（Field property） / 选项 optional ",description:"Tableau field property 使用指南。",content:` 指定该字段是否为可选（字段名可缺失）。
如果设置为 true，则：
表格格式（Excel/CSV）：字段的列可以缺失。 文档格式（XML/YAML）：字段名可以缺失。 `}).add({id:295,href:"/zh/docs/excel/field-property/#选项-patch",title:"字段属性（Field property） / 选项 patch ",description:"Tableau field property 使用指南。",content:` 参见 选项 Patch 中的字段级 patch。
`}).add({id:296,href:"/zh/docs/excel/field-property/#选项-sep",title:"字段属性（Field property） / 选项 sep ",description:"Tableau field property 使用指南。",content:` 字段级分隔符，用于分隔：
单元格内映射的键值对。 单元格内列表的元素（标量或结构体）。 如果未设置，将使用 元表 中的工作表级 sep。
`}).add({id:297,href:"/zh/docs/excel/field-property/#选项-subsep",title:"字段属性（Field property） / 选项 subsep ",description:"Tableau field property 使用指南。",content:` 字段级子分隔符，用于分隔：
每个单元格内映射的键和值。 每个单元格内结构体列表元素的结构体各字段。 如果未设置，将使用 元表 中的工作表级 subsep。
`}).add({id:298,href:"/zh/docs/excel/field-property/#选项-pattern",title:"字段属性（Field property） / 选项 pattern ",description:"Tableau field property 使用指南。",content:` 指定标量字段、列表元素和映射值的模式。
`}).add({id:299,href:"/zh/docs/excel/field-property/#版本号字段",title:"字段属性（Field property） / 版本号字段 ",description:"Tableau field property 使用指南。",content:` [!NOTE] 使用案例请参考 知名类型: 版本号
指定当前单元格的点分十进制模式。每个十进制数的范围从 0 到模式对应部分的最大值（MAX）。
默认模式：255.255.255。
`}).add({id:300,href:"/zh/docs/excel/field-property/#选项-order",title:"字段属性（Field property） / 选项 order ",description:"Tableau field property 使用指南。",content:` 选项 order 用于确保字段的值沿解析方向（垂直布局按行、水平布局按列、单元格内列表/映射按元素顺序）满足指定的次序。 若后一个值相对于前一个值违反了所配置的次序，tableau 会报 E2026。
支持的次序：
ORDER_ASC：升序，前值必须 &lt;= 后值。 ORDER_DESC：降序，前值必须 &gt;= 后值。 ORDER_STRICTLY_ASC：严格升序，前值必须 &lt; 后值。 ORDER_STRICTLY_DESC：严格降序，前值必须 &gt; 后值。 支持的字段类型：
数值标量（int32/int64/uint32/uint64/float/double 及其变体）。 string（按字典序）。 enum（按枚举编号比较）。 知名类型：datetime（google.protobuf.Timestamp） 和 duration（google.protobuf.Duration）。 示例：
map&lt;uint32, Item&gt;|{order:ORDER_ASC}：映射的键列必须升序。 int32|{order:ORDER_STRICTLY_ASC}：该列各行的值必须严格递增。 datetime|{order:ORDER_ASC}：时间戳必须非递减。 [!NOTE] order 与 sequence 不同： sequence 要求各值组成从指定起点开始的连续序列（如 1, 2, 3, ...）， 而 order 仅约束相邻值之间的相对次序，不限定起点和步长。
`}).add({id:301,href:"/zh/docs/excel/field-property/#选项-validate",title:"字段属性（Field property） / 选项 validate ",description:"Tableau field property 使用指南。",content:` Tableau 集成了 protovalidate， 可以直接在表格字段属性中声明校验规则。这些规则会被编译为生成 .proto 文件中 字段上的 (buf.validate.field) 选项，并在 tableau 生成配置时强制执行。支持 CEL 表达式以及 protovalidate 提供 的标准规则、predefined 规则和自定义（custom）规则。
选项 validate 用于指定标量和知名类型（例如 int32、 string、bool、google.protobuf.Timestamp、google.protobuf.Duration 等） 的字段级校验规则。其值为 buf.validate.FieldRules 的 protobuf text format 表示。
示例：
int32|{validate:&quot;int32:{gt:0 lte:100}&quot;}：值必须在 (0, 100] 范围内。 string|{validate:&quot;string:{min_len:1 max_len:20}&quot;}：字符串长度必须在 [1, 20] 范围内。 uint32|{validate:&quot;uint32:{gt:0}&quot;}：值必须大于 0。 datetime|{validate:&quot;timestamp:{lt:{seconds:1893456000}}&quot;}：时间戳必须早于 2030-01-01T00:00:00Z（Unix 秒数 1893456000）。 datetime|{validate:&quot;cel_expression:\\&quot;this &gt;= timestamp('2024-01-01T00:00:00Z')\\&quot;&quot;}：自定义 CEL 表达式。 int32|{validate:&quot;int32:{[protoconf.is_zero]:true}&quot;}：使用通过 proto 扩展定义的 自定义规则。 [!WARNING] 避免将字段值与当前时间进行比较（例如 timestamp:{gt_now:true} / lt_now:true，或在 CEL 表达式中引用 now）。配置是在构建时生成并校验的， 依赖“当前时间”的规则会因生成时刻不同而时而通过、时而失败，导致配置导出 不稳定且不可复现。建议使用固定的边界（绝对时间戳），或在同一条记录的多个 字段之间施加约束（例如 start_time &lt; end_time）。
例如，HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Score map&lt;uint32, Item&gt;|{validate:&ldquo;uint32:{gt:0}&rdquo;} string|{validate:&ldquo;string:{min_len:1 max_len:20}&rdquo;} int32|{validate:&ldquo;int32:{gt:0 lte:100}&rdquo;} Item ID Item Name Item Score 1 sword 80 2 shield 95 生成结果：
hello_world.proto `}).add({id:302,href:"/zh/docs/excel/field-property/#选项-validate_complex",title:"字段属性（Field property） / 选项 validate_complex ",description:"Tableau field property 使用指南。",content:` 选项 validate_complex 用于指定复合类型（即 列表/映射）的字段级校验 规则——即对容器本身（而非其元素）施加的规则。其值为 buf.validate.FieldRules （repeated 或 map 字段已设置）的 text format 表示。
示例：
map&lt;uint32, Item&gt;|{validate_complex:&quot;map:{min_pairs:1}&quot;}：映射必须至少包含一个条目。 []string|{validate_complex:&quot;repeated:{min_items:1}&quot;}：列表必须至少包含一个元素。 []string|{validate_complex:&quot;repeated:{[protoconf.min_items_three]:true}&quot;}：使用自定义规则。 [!NOTE] validate 用于元素/值类型自身的规则，validate_complex 用于容器的规则。 这两个选项可以在同一个字段上同时使用。
`}).add({id:303,href:"/zh/docs/excel/field-property/#选项-validate_message",title:"字段属性（Field property） / 选项 validate_message ",description:"Tableau field property 使用指南。",content:` 选项 validate_message 用于指定字段所嵌套 message 的 message 级校验规则。 通常在字段的值类型为子 message（例如结构体、列表元素或映射值的类型）时使用， 用于通过 CEL 表达式对 message 的多个字段进行交叉校验。其值为 buf.validate.MessageRules 的 text format 表示。
示例：
map&lt;uint32, Item&gt;|{validate_message:&quot;cel_expression:\\&quot;this.value &lt;= 0 || this.name != ''\\&quot;&quot;}：map 中每个 value（Item）都必须满足该 CEL 表达式。 {Timespan}datetime|{validate_message:&quot;cel_expression:\\&quot;this.start_time &lt; this.end_time\\&quot;&quot;}：每个 Timespan struct 都必须满足 start_time &lt; end_time。 CEL 表达式中的 this 指代被嵌套的 message 实例。
`}).add({id:304,href:"/zh/docs/excel/field-property/#选项-aggregate",title:"字段属性（Field property） / 选项 aggregate ",description:"Tableau field property 使用指南。",content:` 选项 aggregate 作用于单元格内（layout:LAYOUT_INCELL）或水平 （layout:LAYOUT_HORIZONTAL）的列表/映射字段。当同一父记录被多行/多列重复 访问时（同一映射键跨行、同一垂直/水平列表跨多行/多列等），aggregate:true 会把每次访问产生的元素聚合到父记录的同一个集合中，而不要求所有访问填写 完全相同的值。
[!NOTE] 不设置 aggregate 时，若父记录被多行/多列重复访问，tableau 会要求所有访问 在该字段上填写完全相同的值；否则会报 E2023。 设置 aggregate:true 即可跳过该一致性校验，并将该字段视为真正的跨行/跨列累加器。
`}).add({id:305,href:"/zh/docs/excel/field-property/#适用场景",title:"字段属性（Field property） / 适用场景 ",description:"Tableau field property 使用指南。",content:" 父级布局 aggregate 作用对象 重复访问场景 垂直映射/垂直键控列表（多行同键） 单元格内列表/映射（LAYOUT_INCELL）、水平列表/映射（LAYOUT_HORIZONTAL） 多行落到同一父记录 水平映射（多列同键） 单元格内列表/映射、水平列表/映射 多列落到同一父记录 垂直/水平列表自身跨多行/多列 兄弟单元格内字段在每行/列被重复访问 多行/多列落到同一父记录 "}).add({id:306,href:"/zh/docs/excel/field-property/#各类型聚合行为",title:"字段属性（Field property） / 各类型聚合行为 ",description:"Tableau field property 使用指南。",content:" 子字段类型 aggregate:true 行为 错误码 单元格内列表 各次访问的元素追加到同一列表 — 单元格内映射 各次访问的键值合并到同一映射；键重复报错 E2005 单元格内键控列表（[]&lt;T&gt;） 各次访问的元素追加并按键去重；元素重复报错 E2028 水平列表 跨行的水平列表元素追加到同一列表 — 水平键控列表 跨行的元素追加并按键去重 E2028 水平映射 跨行的键值合并到同一映射；键重复报错 E2005 "}).add({id:307,href:"/zh/docs/excel/field-property/#垂直聚合",title:"字段属性（Field property） / 垂直聚合 ",description:"Tableau field property 使用指南。",content:` 端到端示例参见 垂直列表（Vertical list） 中的对应小节：
垂直标量列表 —— 跨行聚合的 incell 标量列表。 垂直枚举列表 —— 跨行聚合的 incell 枚举列表。 垂直单元格内结构体列表 —— 跨行聚合的 incell 内联结构体列表。 垂直单元格内预定义结构体列表 —— 跨行聚合的 incell 预定义结构体列表。 `}).add({id:308,href:"/zh/docs/excel/field-property/#水平聚合",title:"字段属性（Field property） / 水平聚合 ",description:"Tableau field property 使用指南。",content:` 端到端示例参见映射嵌套列表/映射嵌套映射中的水平聚合用例：
垂直映射嵌套水平聚合列表 —— 跨行聚合的水平 list（LAYOUT_HORIZONTAL）。 垂直映射嵌套水平聚合映射 —— 跨行聚合的水平 map（LAYOUT_HORIZONTAL）。 `}).add({id:309,href:"/zh/docs/excel/field-property/#aggregate-与-key-组合keyed-list-去重",title:"字段属性（Field property） / aggregate 与 key 组合（keyed-list 去重） ",description:"Tableau field property 使用指南。",content:` 当 aggregate:true 与键控列表（[]&lt;T&gt; 语法，会自动设置字段的 key）一同使用时， tableau 在聚合过程中还会对元素去重：
标量/枚举键控列表：元素本身就是键——跨行/跨列重复的元素会触发 E2028。 结构体键控列表：仅比较通过 key 配置的子字段。 端到端示例参见 垂直键控列表 （垂直聚合）以及 垂直映射嵌套水平聚合列表（水平聚合）。
`}).add({id:310,href:"/zh/docs/excel/field-property/#注意",title:"字段属性（Field property） / 注意 ",description:"Tableau field property 使用指南。",content:" aggregate 仅在单元格内（layout:LAYOUT_INCELL）或水平 （layout:LAYOUT_HORIZONTAL）的列表/映射字段上生效。 父字段键跨行重复时，需要在父字段上同时设置 prop:{unique:false}， 否则会被 E2005 拦截。 聚合后，range、refer、unique 等针对单元素的字段属性仍会逐元素生效。 "}).add({id:311,href:"/zh/docs/excel/metasheet/#概述",title:"元表（Metasheet） / 概述 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 以下选项可在元表 @TABLEAU 中指定，用于影响对应工作表的布局、功能、loader 等。
选项 类型 说明 Sheet string 要处理的工作表名称。特别地，# 表示工作簿名称，可用于设置工作簿的 Alias。 Alias string 对于工作表，alias 用作 proto message 名称。对于工作簿 #，alias 用作 proto 文件名（不含扩展名）。 Namerow int32 工作表中列名定义所在的精确行号。
默认值：1。 Typerow int32 工作表中列类型定义所在的精确行号。
默认值：2。 Noterow int32 工作表中列注释定义所在的精确行号。
默认值：3。 Datarow int32 工作表中数据起始行号。
默认值：4。 Nameline int32 单元格中列名定义所在的行号。0 表示整个单元格。
默认值：0。 Typeline int32 单元格中列类型定义所在的行号。0 表示整个单元格。
默认值：0。 Transpose bool 对指定工作表进行行列转置。 Nested bool namerow 的嵌套命名。
默认值：false。 Sep string 工作表的分隔符。 Subsep string 工作表的子分隔符。 Merger []string 将多个具有相同结构的工作表（逗号分隔）合并为一个。
每个元素可以是：
- 仅工作簿文件路径或 glob 路径（相对于当前工作簿）：&lt;Workbook&gt;，此时工作表名称与当前工作表相同。
- 工作簿文件路径（相对于当前工作簿）加工作表名称：&lt;Workbook&gt;#&lt;Worksheet&gt;。 AdjacentKey bool 合并具有相同 key 的相邻行。如果 key 单元格未设置，则视为与同列上方最近的 key 相同。
默认值：false。 FieldPresence bool 为了追踪基本类型（数值、字符串、bytes 和枚举）的字段存在性，生成的字段将标记为 optional。
默认值：false。 Mode Mode 工作表模式。
可用模式：
- MODE_ENUM_TYPE - MODE_ENUM_TYPE_MULTI - MODE_STRUCT_TYPE - MODE_STRUCT_TYPE_MULTI - MODE_UNION_TYPE
- MODE_UNION_TYPE_MULTI Scatter []string 将多个具有相同 schema 的工作表（逗号分隔）分别转换为不同的配置文件。
每个元素可以是：
- 工作簿名称或 Glob（相对于当前工作簿）：&lt;Workbook&gt;，此时工作表名称与当前工作表相同。
- 工作簿名称（相对于当前工作簿）加工作表名称：&lt;Workbook&gt;#&lt;Worksheet&gt;。 Optional bool 该工作表中所有字段是否均为可选（字段名存在性）。 Patch Patch 工作表 patch 类型。
- PATCH_REPLACE - PATCH_MERGE WithParentDir bool confgen：导出 JSON/Bin/Text 文件时创建父目录。 ScatterWithoutBookName bool confgen（scatter）：导出 JSON/Bin/Text 文件名时不带 book 名称前缀。 OrderedMap bool 是否生成 OrderedMap 访问器。 Index []string 生成 index 访问器。
- 单列 Index 格式：Column&lt;ColumnX,ColumnY,...&gt;@IndexName。
- 多列 Index 格式：(Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName。 OrderedIndex []string 生成 OrderedIndex 访问器。
- 单列 OrderedIndex 格式：Column&lt;ColumnX,ColumnY,...&gt;@IndexName。
- 多列 OrderedIndex 格式：(Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName。 LangOptions map&lt;string, string&gt; 指定 loader 语言选项。
有效 key：OrderedMap、Index。
不同 kv 之间用 , 分隔，key 和 value 之间用 : 分隔。
如果某个 key 不在 map 中，表示该 loader 选项在所有语言中均支持。
有效 value 为 cpp、go 的任意组合（以空格分隔）。
示例：
- OrderedMap:cpp,Index:cpp go // ordered map 仅支持 cpp，index 支持 cpp 和 go - OrderedMap:cpp // ordered map 仅支持 cpp，index 支持所有语言 Validate string 工作表/messager 级别的 protovalidate message 级校验规则。其值为 buf.validate.MessageRules 的 text format 表示，例如：cel_expression:&quot;this.item_map.size() &gt; 0&quot;。也支持在 MODE_STRUCT_TYPE/MODE_UNION_TYPE 等工作表上使用。 `}).add({id:312,href:"/zh/docs/excel/metasheet/#空-tableau",title:"元表（Metasheet） / 空 @TABLEAU ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 如果元表 @TABLEAU 为空，则同一工作簿中的所有其他工作表都会被处理。
`}).add({id:313,href:"/zh/docs/excel/metasheet/#简单示例",title:"元表（Metasheet） / 简单示例 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` HelloWorld.xlsx 中有一个工作表 Sheet1，我们希望将其重命名为 ItemConf，定义自定义分隔符为 |，并生成 ordered map 访问器。
因此，HelloWorld.xlsx 中的元表 @TABLEAU 应配置如下：
HelloWorld.xlsx&nbsp; Sheet1 @TABLEAU ID Name map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s Name 1 Apple 2 Orange 3 Banana Sheet Alias Sep OrderedMap Sheet1 ItemConf | true `}).add({id:314,href:"/zh/docs/excel/metasheet/#选项-alias",title:"元表（Metasheet） / 选项 Alias ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 生成的 proto 文件名是输入文件名的 snake_case 形式。例如，如果工作簿名为 HelloWorld.xlsx，则生成的 proto 文件名为 hello_world.proto。如果希望手动指定生成的 proto 文件名，可以使用 Alias 选项。在此场景中，# 表示工作簿名称。
HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; Sheet1 @TABLEAU ID Name map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s Name 1 Apple 2 Orange 3 Banana Sheet Alias # custom_conf Sheet1 ItemConf 生成结果：
custom_conf.proto `}).add({id:315,href:"/zh/docs/excel/metasheet/#选项-mode",title:"元表（Metasheet） / 选项 Mode ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 工作表模式定义了 tableauc（protogen）解析工作表的方式：数据或类型。
可用模式：
MODE_DEFAULT：默认模式，定义工作表的数据结构。 MODE_ENUM_TYPE：在一个工作表中定义单个枚举类型，参见 示例。 MODE_ENUM_TYPE_MULTI：在一个工作表中定义多个枚举类型，参见 示例。 MODE_STRUCT_TYPE：在一个工作表中定义单个 struct 类型，参见 示例。 MODE_STRUCT_TYPE_MULTI：在一个工作表中定义多个 struct 类型，参见 示例。 MODE_UNION_TYPE：在一个工作表中定义单个 union 类型，参见 示例。 MODE_UNION_TYPE_MULTI：在一个工作表中定义多个 union 类型，参见 示例。 `}).add({id:316,href:"/zh/docs/excel/metasheet/#选项-transpose",title:"元表（Metasheet） / 选项 Transpose ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 在线性代数中，矩阵的转置是将矩阵沿对角线翻转的操作。类似地，工作表（二维矩阵）的转置意味着将行与列互换。
参见 Excel: 将数据从行转置（旋转）到列，反之亦然。
在元表 @TABLEAU 中将 Transpose 选项设置为 true。
HelloWorld.xlsx 中的工作表 HeroConf：
HelloWorld.xlsx&nbsp; HeroConf @TABLEAU ID int32 Hero&rsquo;s ID 123 Name string Hero&rsquo;s name Robin Desc string Hero&rsquo;s description A big hero! Skill []int32 Hero&rsquo;s skills 100,101,102 Sheet Transpose HeroConf true 生成结果：
hello_world.proto HeroConf.json `}).add({id:317,href:"/zh/docs/excel/metasheet/#选项-merger",title:"元表（Metasheet） / 选项 Merger ",description:"Excel 元表 @TABLEAU 使用指南。",content:` Merger 选项用于将多个具有相同 schema 的工作表（逗号分隔）合并为一个。
每个元素可以是：
仅工作簿文件路径或 Glob 路径（相对于当前工作簿）：&lt;Workbook&gt;，此时工作表名称与当前工作表相同。 工作簿文件路径（相对于当前工作簿）加工作表名称：&lt;Workbook&gt;#&lt;Worksheet&gt;。 [!NOTE] Glob 模式通常不应匹配主工作簿。如果匹配，tableauc 会自动排除它。
`}).add({id:318,href:"/zh/docs/excel/metasheet/#合并多个工作簿",title:"元表（Metasheet） / 合并多个工作簿 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 例如，有三个工作簿，每个都包含一个具有相同 schema 的工作表 ZoneConf：
MergerMain.xlsx（主）：包含 @TABLEAU 元表，在 Merger 列中使用 Glob 模式 Merger*.xlsx 匹配所有子工作簿。 Merger2.xlsx（子）：仅包含数据工作表，无需 @TABLEAU 元表。 Merger3.xlsx（子）：仅包含数据工作表，无需 @TABLEAU 元表。 第一个（主）工作簿：MergerMain.xlsx 中的工作表 ZoneConf（含 @TABLEAU）：
MergerMain.xlsx&nbsp; ZoneConf @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 1 Infinity 100 Sheet Merger ZoneConf Merger*.xlsx 第二个（子）工作簿：Merger2.xlsx 中的工作表 ZoneConf（不含 @TABLEAU）：
Merger2.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 2 Desert 200 第三个（子）工作簿：Merger3.xlsx 中的工作表 ZoneConf（不含 @TABLEAU）：
Merger3.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 3 Snowfield 300 生成结果：
merger_main.proto ZoneConf.json `}).add({id:319,href:"/zh/docs/excel/metasheet/#合并同一工作簿中的多个工作表",title:"元表（Metasheet） / 合并同一工作簿中的多个工作表 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 例如，同一工作簿 Merger.xlsx 中有三个具有相同 schema 的工作表：
ZoneConf（主工作表，含 @TABLEAU） ZoneConf2（子工作表） ZoneConf3（子工作表） 主（也是唯一的）工作簿：Merger.xlsx 中的工作表 ZoneConf、ZoneConf2、ZoneConf3 和 @TABLEAU：
Merger.xlsx&nbsp; ZoneConf ZoneConf2 ZoneConf3 @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 1 Infinity 100 ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 2 Desert 200 ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 3 Snowfield 300 Sheet Merger ZoneConf Merger.xlsx#ZoneConf2,Merger.xlsx#ZoneConf3 [!NOTE] 使用 &lt;Workbook&gt;#&lt;Worksheet&gt; 引用工作簿中的特定工作表。
生成结果：
merger_same.proto ZoneConf.json `}).add({id:320,href:"/zh/docs/excel/metasheet/#选项-scatter",title:"元表（Metasheet） / 选项 Scatter ",description:"Excel 元表 @TABLEAU 使用指南。",content:` Scatter 选项用于将多个具有相同 schema 的工作表（逗号分隔）分别转换为不同的配置文件。
每个元素可以是：
仅工作簿文件路径或 Glob 路径（相对于当前工作簿）：&lt;Workbook&gt;，此时工作表名称与当前工作表相同。 工作簿文件路径（相对于当前工作簿）加工作表名称：&lt;Workbook&gt;#&lt;Worksheet&gt;。 [!NOTE] Glob 模式通常不应匹配主工作簿。如果匹配，tableauc 会自动排除它。
例如，有三个工作簿（每个具有相同的工作表 schema，Scatter1.xlsx 为主工作簿）：
Scatter1.xlsx Scatter2.xlsx Scatter3.xlsx 第一个（主）工作簿：Scatter1.xlsx 中的工作表 ZoneConf（含 @TABLEAU）：
Scatter1.xlsx&nbsp; ZoneConf @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 1 Infinity 100 Sheet Scatter ZoneConf Scatter*.xlsx 第二个（子）工作簿：Scatter2.xlsx 中的工作表 ZoneConf（不含 @TABLEAU）：
Scatter2.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 2 Desert 200 第三个（子）工作簿：Scatter3.xlsx 中的工作表 ZoneConf（不含 @TABLEAU）：
Scatter3.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 3 Snowfield 300 生成的 protoconf：
scatter_1.proto 预期生成三个不同的配置文件（命名模式：&lt;BookName&gt;_&lt;SheetName&gt;）：
Scatter1_ZoneConf.json Scatter2_ZoneConf.json Scatter3_ZoneConf.json `}).add({id:321,href:"/zh/docs/excel/metasheet/#选项-orderedmap",title:"元表（Metasheet） / 选项 OrderedMap ",description:"Excel 元表 @TABLEAU 使用指南。",content:` [!IMPORTANT] 仅适用于每个层级 message 的第一个映射字段。
如果将 OrderedMap 设置为 true，则 tableau loader 插件将生成有序映射 API：
C++: OrderedMap API Go: OrderedMap API 例如，HelloWorld.xlsx 中的工作表 ItemConf：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Orange 2 30 Sheet OrderedMap ItemConf true `}).add({id:322,href:"/zh/docs/excel/metasheet/#选项-index",title:"元表（Metasheet） / 选项 Index ",description:"Excel 元表 @TABLEAU 使用指南。",content:` [!IMPORTANT] 被索引的列必须是同一结构体（message）内的标量或枚举。
Index 选项可用于生成索引访问器。 有两种索引：
单列索引 多列索引（又称复合索引） 如果正确设置了 Index，则 tableau loader 插件将生成索引 API：
C++: 索引 API Go: 索引 API 每列类型可以是：
标量：数值、布尔值、字符串和 bytes。 枚举：例如：enum&lt;.FruitType&gt; 单元格内标量列表：例如：[]int32 单元格内枚举列表：例如：[]enum&lt;.FruitType&gt; 示例：对 HelloWorld.xlsx 中不同布局的工作表设置索引列：
HelloWorld.xlsx&nbsp; List MapInMap ListInMap @TABLEAU ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. ID Name PropID Type Bonus map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 int32 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s type prop&rsquo;s bonus 1 Apple 1 10 100 2 Orange 1 20 200 2 Orange 2 30 300 ID Name PropID Type Bonus map&lt;uint32, Item&gt; string [Prop]int32 int64 int32 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s type prop&rsquo;s bonus 1 Apple 1 10 100 2 Orange 1 20 200 2 Orange 2 30 300 Sheet Index List ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop MapInMap Type@Prop, (PropID,Type)@SpecialProp ListInMap Type@Prop, (PropID,Type)@SpecialProp `}).add({id:323,href:"/zh/docs/excel/metasheet/#单列索引",title:"元表（Metasheet） / 单列索引 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 格式：Column&lt;ColumnX,ColumnY,...&gt;@IndexName。
@ 是列名和 index 名之间的分隔符。如果未设置 IndexName，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 &lt;&gt; 中的列指定排序列，相同索引的结果数组按排序列的值排序。
示例：
ID ID@Item ID&lt;ID&gt;@Item：结果数组按 ID 排序。 ID&lt;Type,Priority&gt;@Item：结果数组按 Type 和 Priority 排序。 ID, Name@AwardItem ID@Item, Name@AwardItem `}).add({id:324,href:"/zh/docs/excel/metasheet/#多列索引",title:"元表（Metasheet） / 多列索引 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 格式：(Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName。
多列索引（又称复合索引）由同一结构体（列表或映射中）的多列组成，以提高查询速度。
@ 是括号内列名和索引名之间的分隔符。如果未设置 IndexName，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 &lt;&gt; 中的列指定排序列，相同索引的结果数组按排序列的值排序。
示例：
(ID,Name)：未设置索引名，由父结构体类型名决定。 (ID,Name)@AwardItem (ID,Name)&lt;ID&gt;：结果数组按 ID 排序。 (ID,Type)&lt;Type,Priority&gt;@Item：结果数组按 Type 和 Priority 排序。 ID@Item, (ID,Name)@AwardItem：一个单列索引和一个多列索引。 `}).add({id:325,href:"/zh/docs/excel/metasheet/#选项-orderedindex",title:"元表（Metasheet） / 选项 OrderedIndex ",description:"Excel 元表 @TABLEAU 使用指南。",content:` [!IMPORTANT] 被索引的列必须是同一结构体（message）内的标量或枚举。
OrderedIndex 选项可用于生成有序索引访问器。 有两种有序索引：
单列有序索引 多列有序索引（又称复合有序索引） 如果正确设置了 OrderedIndex，则 tableau loader 插件将生成有序索引 API：
C++: 有序索引 API Go: 有序索引 API 每列类型可以是：
标量：数值、布尔值、字符串和 bytes。 枚举：例如：enum&lt;.FruitType&gt; 单元格内标量列表：例如：[]int32 单元格内枚举列表：例如：[]enum&lt;.FruitType&gt; 示例：对 HelloWorld.xlsx 中不同布局的工作表设置有序索引列：
HelloWorld.xlsx&nbsp; List MapInMap ListInMap @TABLEAU ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. ID Name PropID Type Bonus map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 int32 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s type prop&rsquo;s bonus 1 Apple 1 10 100 2 Orange 1 20 200 2 Orange 2 30 300 ID Name PropID Type Bonus map&lt;uint32, Item&gt; string [Prop]int32 int64 int32 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s type prop&rsquo;s bonus 1 Apple 1 10 100 2 Orange 1 20 200 2 Orange 2 30 300 Sheet OrderedIndex List ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop MapInMap Type@Prop, (PropID,Type)@SpecialProp ListInMap Type@Prop, (PropID,Type)@SpecialProp 带排序的示例：HelloWorld.xlsx 中的两个工作表 ItemConf 和 ShopConf， 使用 &lt;&gt; 语法对结果数组进行排序：
ItemConf：有序索引结果按 Name 列排序。 ShopConf：有序索引结果按 Type 和 ID 列排序。 HelloWorld.xlsx&nbsp; ItemConf ShopConf @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. Sheet OrderedIndex ItemConf ID@Item, (ID,Name)@SpecialItem ShopConf ID&lt;Type,ID&gt;@Shop, (ID,Type)&lt;Type,ID&gt;@SpecialShop, (ID,Type)@Shop `}).add({id:326,href:"/zh/docs/excel/metasheet/#单列有序索引",title:"元表（Metasheet） / 单列有序索引 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 格式：Column&lt;ColumnX,ColumnY,...&gt;@IndexName。
@ 是列名和索引名之间的分隔符。如果未设置 IndexName，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 &lt;&gt; 中的列指定排序列，相同索引的结果数组按排序列的值排序。
示例：
ID ID@Item ID&lt;ID&gt;@Item：结果数组按 ID 排序。 ID&lt;Type,Priority&gt;@Item：结果数组按 Type 和 Priority 排序。 ID, Name@AwardItem ID@Item, Name@AwardItem 带排序的示例：HelloWorld.xlsx 中的工作表 ItemConf，使用 &lt;&gt; 语法对结果数组进行排序：
ID&lt;Name&gt;@Item：对 ID 列建立单列有序索引，结果数组按 Name 排序。 HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. Sheet OrderedIndex ItemConf ID@Item `}).add({id:327,href:"/zh/docs/excel/metasheet/#多列有序索引",title:"元表（Metasheet） / 多列有序索引 ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 格式：(Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName。
多列有序索引（又称复合有序索引）由同一结构体（列表或映射中）的多列组成，以提高查询速度，查询结果以有序数组形式返回。
@ 是括号内列名和索引名之间的分隔符。如果未设置 IndexName，则使用该列的父结构体类型名。可以用逗号分隔指定一个或多个索引。尖括号 &lt;&gt; 中的列指定排序列，相同索引的结果数组按排序列的值排序。
示例：
(ID,Name)：未设置索引名，由父结构体类型名决定。 (ID,Name)@AwardItem (ID,Name)&lt;ID&gt;：结果数组按 ID 排序。 (ID,Type)&lt;Type&gt;@Shop：结果数组按 Type 排序。 (ID,Type)&lt;Type,Priority&gt;@Item：结果数组按 Type 和 Priority 排序。 ID@Item, (ID,Name)@AwardItem：一个单列有序索引和一个多列有序索引。 示例：多列有序索引 # HelloWorld.xlsx 中的两个工作表 ItemConf 和 ShopConf：
ItemConf：对 map value 同一结构体的列建立多列有序索引。 ShopConf：对 list element 同一结构体的列建立多列有序索引。 HelloWorld.xlsx&nbsp; ItemConf ShopConf @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. Sheet OrderedIndex ItemConf (ID,Name)@SpecialItem ShopConf (ID,Type)@SpecialShop, (ID,Type)@Shop 示例：多列有序索引使用 &lt;&gt; 语法 # HelloWorld.xlsx 中的工作表 ShopConf，使用 &lt;&gt; 语法对结果数组进行排序：
(ID,Type)&lt;Type&gt;@Shop：对 (ID, Type) 列建立多列有序索引，结果数组按 Type 排序。 (ID,Type)&lt;Type,ID&gt;@SpecialShop：对 (ID, Type) 列建立多列有序索引，结果数组按 Type 然后 ID 排序。 HelloWorld.xlsx&nbsp; ShopConf @TABLEAU ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. Sheet OrderedIndex ShopConf (ID,Type)@Shop, (ID,Type)&lt;Type,ID&gt;@SpecialShop `}).add({id:328,href:"/zh/docs/excel/metasheet/#选项-patch",title:"元表（Metasheet） / 选项 Patch ",description:"Excel 元表 @TABLEAU 使用指南。",content:`

`}).add({id:329,href:"/zh/docs/excel/metasheet/#选项-sep",title:"元表（Metasheet） / 选项 Sep ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 工作表的分隔符，用于分隔：
单元格内列表元素（标量或结构体）。 单元格内映射元素。 如果未设置，将使用 Tableauc 配置 中的全局级别分隔符（默认：,）。
`}).add({id:330,href:"/zh/docs/excel/metasheet/#选项-subsep",title:"元表（Metasheet） / 选项 Subsep ",description:"Excel 元表 @TABLEAU 使用指南。",content:` 工作表的子分隔符，用于分隔：
每个单元格内映射元素的键值对。 每个单元格内结构体列表元素的结构体字段。 如果未设置，将使用 Tableauc 配置 中的全局级别子分隔符（默认：:）。
`}).add({id:331,href:"/zh/docs/excel/metasheet/#选项-validate",title:"元表（Metasheet） / 选项 Validate ",description:"Excel 元表 @TABLEAU 使用指南。",content:` Tableau 集成了 protovalidate， 可以直接在表格中声明校验规则。选项 Validate 是字段级 validate_message 选项在工作表/messager 级别的对应版本。它会被编译为生成工作表对应 proto message 上的 (buf.validate.message) 选项，并在 tableau 生成配置时强制执行。
其值为 buf.validate.MessageRules 的 protobuf text format 表示，通常包含一个或多个 cel_expression（或 cel）项。CEL 表达式中的 this 指代整张工作表对应的顶层 message 实例。
Validate 也支持在以下 Mode 的工作表上使用：
MODE_STRUCT_TYPE / MODE_STRUCT_TYPE_MULTI MODE_UNION_TYPE / MODE_UNION_TYPE_MULTI 例如，HelloWorld.xlsx 中的元表 @TABLEAU：
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name map&lt;uint32, Item&gt; string Item ID Item Name 1 Apple 2 Orange Sheet Validate ItemConf cel_expression:&quot;this.item_map.size() &gt; 0&quot; 生成结果：
hello_world.proto `}).add({id:332,href:"/zh/docs/basics/",title:"基础",description:"Tableau 基础知识。",content:""}).add({id:333,href:"/zh/docs/basics/concepts/#术语",title:"核心概念 / 术语 ",description:"Tableau 核心概念。",content:`
`}).add({id:334,href:"/zh/docs/basics/concepts/#基础术语",title:"核心概念 / 基础术语 ",description:"Tableau 核心概念。",content:" 术语 定义 Workbook 一个 Excel 文件；或一组以相同前缀命名、用 # 分隔的 CSV 文件；或一个 XML 文件；或一个 YAML 文件。 Worksheet Excel 文件中的一个工作表；或一个 CSV 文件；或 XML 文件的根节点；或 YAML 文件中的一个文档。 Metasheet 名为 @TABLEAU 的特殊工作表，用于指定 tableau 解析器选项。 Row 工作表中的一行。 Column 工作表中的一列。 Cell 行与列的交叉点（单元格）。 In-cell 单元格内部。 Cross-cell 一行或一列中连续的多个单元格。 "}).add({id:335,href:"/zh/docs/basics/concepts/#工作表相关术语",title:"核心概念 / 工作表相关术语 ",description:"Tableau 核心概念。",content:` 术语 定义 Namerow 工作表中列名定义所在的行号。
⚠️ 注意：同一工作表中每个列名必须唯一！
默认值：1。 Typerow 工作表中列类型定义所在的行号。
默认值：2。 Noterow 工作表中列注释所在的行号。
默认值：3。 Datarow 工作表中数据起始行号。
默认值：4。 Nameline 单元格内列名定义所在的行号，0 表示整个单元格。
默认值：0。 Typeline 单元格内列类型定义所在的行号，0 表示整个单元格。
默认值：0。 Sep 分隔符，用于：
1. 分隔 in-cell list 的元素。
2. 分隔 in-cell map 的条目。
默认值：,。 Subsep 子分隔符，用于分隔 in-cell map 的 Key-Value 对。
默认值：:。 Nested namerow 的嵌套命名方式。
默认值：false。 Layout Incell（单元格内）、vertical（跨单元格垂直）或 horizontal（跨单元格水平）。 Transpose 对指定工作表进行行列转置。 `}).add({id:336,href:"/zh/docs/basics/concepts/#与-protoconf-的映射关系",title:"核心概念 / 与 Protoconf 的映射关系 ",description:"Tableau 核心概念。",content:" 术语 Protoconf Workbook 一个 protoconf（.proto）文件。 Worksheet protoconf 文件中的一个顶层 message（名为 @TABLEAU 的元表除外）。 column message 中的一个字段。 "}).add({id:337,href:"/zh/docs/basics/concepts/#简单映射示例",title:"核心概念 / 简单映射示例 ",description:"Tableau 核心概念。",content:`
`}).add({id:338,href:"/zh/docs/basics/concepts/#输入一个-excel-文件",title:"核心概念 / 输入：一个 Excel 文件 ",description:"Tableau 核心概念。",content:` 一个工作簿（HelloWorld.xlsx），包含两个数据工作表（ItemConf 和 ActivityConf）以及一个空的 tableau 元表（@TABLEAU）。
HelloWorld.xlsx&nbsp; ItemConf ActivityConf @TABLEAU ID Name Type map&lt;uint32, Item&gt; string int32 Item&rsquo;s ID. Item&rsquo;s name. Item&rsquo;s type. 1 item1 100 2 item2 200 3 item3 300 ID Name Open map&lt;uint32, Activity&gt; string bool Activity&rsquo;s ID. Activity&rsquo;s name. Activity is open? 1 activity1 true 2 activity2 false 3 activity3 `}).add({id:339,href:"/zh/docs/basics/concepts/#输出一个-protoconf-文件",title:"核心概念 / 输出：一个 protoconf 文件 ",description:"Tableau 核心概念。",content:` 一个 protoconf 文件（hello_world.proto），包含两个顶层 message（ItemConf 和 ActivityConf）。
hello_world.proto `}).add({id:340,href:"/zh/docs/basics/naming-convention/#枚举enums",title:"命名规范 / 枚举（Enums） ",description:"命名规范。",content:` 枚举类型名使用 PascalCase（首字母大写），枚举值名使用 CAPITALS_WITH_UNDERSCORES（全大写加下划线）：
参考 Protobuf 风格：枚举。
`}).add({id:341,href:"/zh/docs/basics/naming-convention/#示例",title:"命名规范 / 示例 ",description:"命名规范。",content:" 名称 风格 示例 workbook PascalCase HelloWorld.xlsx worksheet PascalCase HelloWorld struct (message) PascalCase HelloWorld field (column) PascalCase HelloWorld "}).add({id:342,href:"/zh/docs/basics/grammar-and-types/#概述",title:"语法与类型 / 概述 ",description:"语法与类型。",content:` Tableau 的大部分语法和类型借鉴自 Protocol Buffers (proto3) 和 Golang。
`}).add({id:343,href:"/zh/docs/basics/grammar-and-types/#scalar-types",title:"语法与类型 / 标量类型（Scalar types） ",description:"语法与类型。",content:` 详细说明请参考 Protocol Buffers Proto3 Scalar。
类别 类型 默认值 数值 int32, uint32
int64, uint64
float, double 0
0
0.0 布尔值 bool false 字符串 string &quot;&quot; 字节 bytes &quot;&quot; `}).add({id:344,href:"/zh/docs/basics/grammar-and-types/#复合类型composite-types",title:"语法与类型 / 复合类型（Composite types） ",description:"语法与类型。",content:" 类型 说明 struct struct 映射为 protobuf 的 message。 list list 映射为 protobuf 的 repeated 字段。 map map 映射为 protobuf 的 map 字段。 "}).add({id:345,href:"/zh/docs/basics/grammar-and-types/#结构体struct",title:"语法与类型 / 结构体（Struct） ",description:"语法与类型。",content:` 特性 说明 水平布局（Horizontal layout） 每个标量字段占一个单元格。 简单 in-cell struct 每个字段必须是标量类型。
以逗号分隔的字段列表，例如：1,test,3.0。
若数据列表长度与 struct 字段数不一致，则按顺序填充，未配置的字段使用标量类型的默认值。 `}).add({id:346,href:"/zh/docs/basics/grammar-and-types/#列表list",title:"语法与类型 / 列表（List） ",description:"语法与类型。",content:` 特性 说明 水平布局（Horizontal layout） list 的默认布局。
元素类型可以是 struct 或标量。 垂直布局（Vertical layout） list 的元素类型应为 struct。 简单 in-cell list 元素类型必须是标量。
以逗号分隔的元素列表，例如：1,2,3。 可扩展（Scalable） 支持动态大小的 list。 忽略空元素 智能识别任意位置的空元素。 `}).add({id:347,href:"/zh/docs/basics/grammar-and-types/#映射map",title:"语法与类型 / 映射（Map） ",description:"语法与类型。",content:` 特性 说明 水平布局（Horizontal layout） 垂直布局（Vertical layout） map 的默认布局。 Hash map 实现为无序 map 或 hash map。 Ordered map 由 tableauio/loader 支持。
- C++ 简单 in-cell map key 和 value 都必须是标量类型。
以逗号分隔的 key:value 对列表，例如：1:10,2:20,3:30。 可扩展（Scalable） 支持动态大小的 map。 忽略空条目 智能识别任意位置的空条目。 `}).add({id:348,href:"/zh/docs/basics/grammar-and-types/#枚举enumeration",title:"语法与类型 / 枚举（Enumeration） ",description:"语法与类型。",content:` 特性 说明 三种枚举值形式 1. 枚举值编号（number）。
2. 枚举值名称（name）。
3. 枚举值别名（alias，通过 EnumValueOptions 指定）。 校验 自动检查枚举值的合法性。 `}).add({id:349,href:"/zh/docs/basics/grammar-and-types/#空值empty-value",title:"语法与类型 / 空值（Empty value） ",description:"语法与类型。",content:` 类型 说明 scalar 空标量将使用该标量类型的默认值填充。 struct 若所有字段均为空，则不会生成该 struct。 list 若 list 大小为 0，则不会生成该 list。
若 list 的元素（struct 类型）为空，则不会追加该元素。 map 若 map 大小为 0，则不会生成该 map。若 map 的 value（struct 类型）为空，则不会插入该条目。 nesting 递归地判断是否为空。 `}).add({id:350,href:"/zh/docs/basics/enum/#枚举值enum-value",title:"枚举（Enum） / 枚举值（Enum value） ",description:"枚举基础。",content:` tableau 解析器支持三种枚举值形式：
枚举值名称（name）。 枚举值编号（number）。 枚举值别名（alias）。别名可以是英文、中文或其他任意语言，通过 tableau.evalue 扩展 google.protobuf.EnumValueOptions 来指定。 例如，common.proto 中定义的枚举类型 FruitType：
以上三种枚举值形式均被接受：
枚举值编号 枚举值名称 枚举值别名 0 FRUIT_TYPE_UNKNOWN Unknown 1 FRUIT_TYPE_APPLE Apple 2 FRUIT_TYPE_ORANGE Orange 3 FRUIT_TYPE_BANANA Banana 注意：枚举类型必须预先定义。
了解预定义 Enum 类型的详细信息：预定义类型。
`}).add({id:351,href:"/zh/docs/basics/enum/#校验validation",title:"枚举（Enum） / 校验（Validation） ",description:"枚举基础。",content:` 由于枚举类型是预先定义的，tableau 解析器会自动校验枚举值的合法性。
`}).add({id:352,href:"/zh/docs/basics/wellknown-types/#概述",title:"知名类型（Wellknown types） / 概述 ",description:"Wellknown 类型。",content:` 为方便使用，Wellknown 类型是 Tableau 的内置类型，类似于 Protocol Buffers Well-Known Types。
使用时需要引入 Tableau 和 Protocol Buffers 提供的 proto 文件：
tableau/protobuf/wellknown.proto google/protobuf/timestamp.proto google/protobuf/duration.proto `}).add({id:353,href:"/zh/docs/basics/wellknown-types/#datetime",title:"知名类型（Wellknown types） / 日期时间（Datetime） ",description:"Wellknown 类型。",content:` [!NOTE] 使用示例请参考 Wellknown 类型：Datetime 。
类型 默认值 说明 datetime 0000-00-00 00:00:00 格式：yyyy-MM-dd HH:mm:ss 或 RFC3339。
例如：2020-01-01 05:10:00
或 2020-01-01T05:10:00+08:00。 date 0000-00-00 格式：yyyy-MM-dd 或 yyyyMMdd。
例如：2020-01-01 或 20200101。 time 00:00:00 格式：HH:mm:ss 或 HHmmss，HH:mm 或 HHmm。
例如：05:10:00 或 051000，05:10 或 0510。 提示：
datetime 和 date 基于 google.protobuf.Timestamp，参考 JSON 映射。 time 基于 google.protobuf.Duration，参考 JSON 映射。 RFC 3339: 互联网日期和时间戳 `}).add({id:354,href:"/zh/docs/basics/wellknown-types/#duration",title:"知名类型（Wellknown types） / 时长（Duration） ",description:"Wellknown 类型。",content:` [!NOTE] 使用示例请参考 Wellknown 类型：Duration 。
类型 默认值 说明 duration 0s 格式如：72h3m0.5s。
duration 字符串是一个可带符号的十进制数序列，每个数可带可选小数和单位后缀，例如 300ms、-1.5h 或 2h45m。
有效时间单位：ns、us（或 µs）、ms、s、m、h。 提示：
duration 基于 google.protobuf.Duration，参考 JSON 映射。 golang duration 字符串格式。 golang ParseDuration。 `}).add({id:355,href:"/zh/docs/basics/wellknown-types/#fraction",title:"知名类型（Wellknown types） / 分数（Fraction） ",description:"Wellknown 类型。",content:` [!NOTE] 使用示例请参考 Wellknown 类型：Fraction 。
分数表示整体的一部分，或更广泛地说，任意数量的等份。详见 wiki: Fraction。
类型 默认值 说明 fraction 0 格式：
- N%：百分比，例如：10%
- N‰：千分比，例如：10‰
- N‱：万分比，例如：10‱
- N/D：简单分数，例如：3/4
- N：仅分子，例如：3 等同于 3/1
- N：浮点分子，例如：0.01 等同于 1/100 `}).add({id:356,href:"/zh/docs/basics/wellknown-types/#comparator",title:"知名类型（Wellknown types） / 比较器（Comparator） ",description:"Wellknown 类型。",content:` [!NOTE] 使用示例请参考 Wellknown 类型：Comparator 。
comparator 包含一个 sign（符号）和一个分数 value（值），任意数字或分数均可与之比较。
类型 默认值 说明 comparator ==0 格式：&lt;Sign&gt;&lt;Fraction&gt;。
例如：==10、!=1/2、&lt;10%、&lt;=10‰、&gt;10%、&gt;=10‱ `}).add({id:357,href:"/zh/docs/basics/wellknown-types/#version",title:"知名类型（Wellknown types） / 版本号（Version） ",description:"Wellknown 类型。",content:` [!NOTE] 使用示例请参考 Wellknown 类型：Version 。
version 表示点分十进制表示法的版本号。 版本格式为：&lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;[.&lt;OTHER&gt;]...。
version 字段提供三种表示形式以方便使用：
字符串版本：str 整数版本：val 整数版本各部分：major、minor、patch、others 可以通过字段属性 pattern 指定版本模式，格式为 &lt;MAJOR_MAX&gt;.&lt;MINOR_MAX&gt;.&lt;PATCH_MAX&gt;[.&lt;OTHER_MAX&gt;]...。
每个带 &ldquo;MAX&rdquo; 后缀的部分表示点分十进制表示法中对应部分的最大十进制值。 每个 &ldquo;XXX_MAX+1&rdquo; 表示该部分在整数中占用的值。 通用模式 &lt;MAJOR_MAX&gt;.&lt;MINOR_MAX&gt;.&lt;PATCH_MAX&gt; 的整数版本公式为：MAJOR*(MINOR_MAX+1)*(PATCH_MAX+1) + MINOR*(PATCH_MAX+1) + PATCH 默认 pattern 为：255.255.255。
类型 默认值 说明 version &quot;&quot; 格式：&lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;。
例如：1.0.1 version|{pattern:&quot;255.255.255.255&quot;} &quot;&quot; 格式：&lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;.&lt;OTHER&gt;。
例如：1.0.1.1 `}).add({id:358,href:"/zh/docs/basics/predefined-types/#概述",title:"预定义类型（Predefined types） / 概述 ",description:"预定义类型。",content:` 你可以在 protoconf 文件（如 common.proto）中预先定义 enum、struct 或 union 类型，然后在工作表中将其用作列类型或跨单元格类型。
`}).add({id:359,href:"/zh/docs/basics/predefined-types/#使用方式",title:"预定义类型（Predefined types） / 使用方式 ",description:"预定义类型。",content:" 语法：在工作表中使用预定义的 CustomType 时，需在前面加一个点 .（即 .CustomType）。 导入：在 tableauc 配置的 protoFiles 选项中指定公共 proto 文件，这些文件中定义了预定义的 enum、struct、union 类型。参考 Tableauc 配置。 "}).add({id:360,href:"/zh/docs/basics/predefined-types/#枚举enum",title:"预定义类型（Predefined types） / 枚举（Enum） ",description:"预定义类型。",content:` 例如，common.proto 中定义的枚举类型 FruitType：
以下示例说明如何使用预定义枚举类型：
Excel/CSV：使用预定义枚举类型。 XML：使用预定义枚举类型 YAML：使用预定义枚举类型 `}).add({id:361,href:"/zh/docs/basics/predefined-types/#结构体struct",title:"预定义类型（Predefined types） / 结构体（Struct） ",description:"预定义类型。",content:` 例如，common.proto 中定义的 struct 类型 Prop：
以下示例说明如何使用预定义 struct 类型：
Excel/CSV struct：Predefined-struct list：Vertical predefined-struct list map：Vertical predefined-struct map XML struct：Predefined-struct list：Predefined struct list map：TODO YAML struct：Predefined-struct list：Predefined struct list map：TODO 在 horizontal map 或 horizontal list 中，可以为预定义 struct 指定自定义变量名。 参考 Custom named struct。
`}).add({id:362,href:"/zh/docs/basics/predefined-types/#联合体union",title:"预定义类型（Predefined types） / 联合体（Union） ",description:"预定义类型。",content:` 例如，common.proto 中定义的 union 类型 Target：
以下示例说明如何使用预定义 union 类型：
Excel/CSV list：Predefined union in list map：Predefined union in map XML union：Predefined union list：Predefined union list map：TODO YAML union：Predefined union list：Predefined union list map：TODO `}).add({id:363,href:"/zh/docs/prologue/",title:"前言",description:"Prologue Doks.",content:""}).add({id:364,href:"/zh/docs/prologue/introduction/#tableauc",title:"简介 / tableauc ",description:"Tableau 简介。",content:` tableauc 是 Tableau Compiler（Tableau 编译器），内置 protogen 和 confgen 两个模块。
`}).add({id:365,href:"/zh/docs/prologue/introduction/#protogen",title:"简介 / protogen ",description:"Tableau 简介。",content:` protogen 将 Excel/CSV/XML/YAML 文件转换为 Protoconf 文件。 Protoconf 是 Protocol Buffers (proto3) 的一种方言，通过 tableau options 进行扩展，用于描述 Excel/CSV/XML/YAML 的结构。
`}).add({id:366,href:"/zh/docs/prologue/introduction/#confgen",title:"简介 / confgen ",description:"Tableau 简介。",content:` confgen 将 Excel/CSV/XML/YAML 与 Protoconf 文件一起转换为 JSON/Text/Bin 文件。
`}).add({id:367,href:"/zh/docs/prologue/quick-start/#1-下载-tableauc",title:"快速开始 / 1. 下载 tableauc ",description:"快速开始",content:` 选择合适的 tableauc（即 Tableau Compiler）下载：
Windows x64 Linux x64 macOS x64 arm64 更多平台版本请访问 tableau releases 。
`}).add({id:368,href:"/zh/docs/prologue/quick-start/#2-添加工作簿",title:"快速开始 / 2. 添加工作簿 ",description:"快速开始",content:` 添加 HelloWorld.xlsx，包含两个工作表：
Item：将下方数据复制到此工作表。 @TABLEAU：暂时留空。这是 tableau 的 元表，用于指定解析器选项。 HelloWorld.xlsx&nbsp; Item @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s description 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. `}).add({id:369,href:"/zh/docs/prologue/quick-start/#3-运行-tableauc",title:"快速开始 / 3. 运行 tableauc ",description:"快速开始",content:` 执行命令：./tableauc HelloWorld.xlsx
随后会生成 hello_world.proto 和 Item.json：
hello_world.proto Item.json 恭喜！你已经成功使用 tableauc 将工作簿转换为 proto 和 JSON 文件。
`}).add({id:370,href:"/zh/docs/prologue/config/#configyaml",title:"Tableauc 配置 / config.yaml ",description:"Tableauc 配置详解",content:` 创建名为 config.yaml 的文件，并将以下配置复制到其中：
`}).add({id:371,href:"/zh/docs/prologue/config/#protoinputheadersep",title:"Tableauc 配置 / proto.input.header.sep ",description:"Tableauc 配置详解",content:` 默认值：,
全局级别的分隔符，用于分隔：
in-cell list 的元素（标量或结构体）。 in-cell map 的条目。 同时也支持工作表级别和字段级别的分隔符选项：
元表中的工作表级别分隔符 字段属性中的字段级别分隔符 `}).add({id:372,href:"/zh/docs/prologue/config/#protoinputheadersubsep",title:"Tableauc 配置 / proto.input.header.subsep ",description:"Tableauc 配置详解",content:` 默认值：:
全局级别的子分隔符，用于分隔：
in-cell map 每个元素的键值对。 in-cell struct list 每个元素的结构体字段。 同时也支持 工作表级别和字段级别的子分隔符选项：
元表中的工作表级别子分隔符 字段属性中的字段级别子分隔符 `}).add({id:373,href:"/zh/docs/",title:"Docs",description:"Docs Doks.",content:""});function s(n,s){if(!s||!n)return e(t(n||""));const o=t(n),i=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return e(o).replace(new RegExp(i,"gi"),e=>`<mark>${e}</mark>`)}function e(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(e){const t=document.createElement("textarea");return t.innerHTML=e,t.value}function i(e,n,s=180){if(!e)return"";const o=t(e),a=o.toLowerCase().indexOf(n.toLowerCase());if(a===-1)return o.slice(0,s);const i=Math.max(0,a-30),r=Math.min(o.length,i+s);return(i>0?"…":"")+o.slice(i,r)+(r<o.length?"…":"")}(function(){var t=document.getElementById("search-modal");if(!t)return;t.addEventListener("shown.bs.modal",function(){var e=document.getElementById("search");e&&(e.focus(),e.removeEventListener("input",o,!0),e.addEventListener("input",o,!0))}),t.addEventListener("hidden.bs.modal",function(){var e=document.getElementById("search"),t=document.getElementById("suggestions");e&&(e.value=""),t&&(t.innerHTML="")}),document.addEventListener("keydown",function(e){if(e.ctrlKey&&e.key==="/"){e.preventDefault();var n=bootstrap.Modal.getOrCreateInstance(t);n.show()}})})();function o(){var t,d,l=document.getElementById("search"),o=document.getElementById("suggestions");if(!l||!o)return;if(t=l.value.trim(),o.innerHTML="",!t)return;d=n.search(t,{limit:100,enrich:!0});const a=new Map;for(const e of d.flatMap(e=>e.result)){if(a.has(e.doc.href))continue;a.set(e.doc.href,e.doc)}const u=e=>{const t=e.indexOf(" / ");return t===-1?{page:e,sec:""}:{page:e.slice(0,t),sec:e.slice(t+3)}},h=[...a.values()].sort((e,t)=>{const n=u(e.title),s=u(t.title),o=n.page.localeCompare(s.page);return o!==0?o:n.sec.localeCompare(s.sec)});if(h.length===0){const n=document.createElement("div");n.innerHTML=`No results for "<strong>${e(t)}</strong>"`,n.classList.add("suggestion__no-results"),o.appendChild(n);return}for(const e of h){const d=e.href,c=document.createElement("div"),n=document.createElement("a"),[u,l]=d.split("#");n.href=u+"?highlight="+encodeURIComponent(t)+(l?"#"+l:"");const a=document.createElement("span");a.innerHTML=s(e.title,t),a.classList.add("suggestion__title"),n.appendChild(a);const m=i(e.content||e.description,t),r=document.createElement("span");r.innerHTML=s(m,t),r.classList.add("suggestion__description"),n.appendChild(r),c.appendChild(n),o.appendChild(c)}const r=o.querySelectorAll(".suggestion__title");r.forEach(e=>{e.style.width=""});let c=0;r.forEach(e=>{const t=e.getBoundingClientRect().width;t>c&&(c=t)}),r.forEach(e=>{e.style.width=c+"px"})}})()