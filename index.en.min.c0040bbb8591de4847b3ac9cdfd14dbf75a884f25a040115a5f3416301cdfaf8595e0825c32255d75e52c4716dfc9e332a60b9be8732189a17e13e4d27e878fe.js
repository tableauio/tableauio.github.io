document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=document.getElementById("suggestions");if(!s)return;const o=document.getElementById("search-modal"),i=!o||!o.classList.contains("show");if(i)return;const t=[...s.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var n=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description","content"],index:["title","description","content"]}});n.add({id:0,href:"/docs/api/checker/guide/#generate-scaffolding-code",title:"Guide / Generate scaffolding code ",description:"Go checker guide.",content:` For example, the generated *.check.go of protobuf message ItemConf is:
`}).add({id:1,href:"/docs/api/checker/guide/#plugin-protoc-gen-go-tableau-checker",title:"Guide / Plugin: protoc-gen-go-tableau-checker ",description:"Go checker guide.",content:` An example to use this protoc plugin: checker/test/gen.sh.
`}).add({id:2,href:"/docs/api/checker/guide/#full-example",title:"Guide / Full example ",description:"Go checker guide.",content:` See go-tableau-checker.
`}).add({id:3,href:"/docs/help/",title:"Help",description:"Help Tableau.",content:""}).add({id:4,href:"/docs/help/how-to-update/#tableauc",title:"How to Update / tableauc ",description:"Regularly update the installed toolchain to keep your tableau stable, usable, and secure.",content:` TODO &hellip;
`}).add({id:5,href:"/docs/help/troubleshooting/#problems-updating-tableauc-config",title:"Troubleshooting / Problems updating tableauc config ",description:"Solutions to common problems.",content:` TODO &hellip;
`}).add({id:6,href:"/docs/help/troubleshooting/#problems-with-loader",title:"Troubleshooting / Problems with loader ",description:"Solutions to common problems.",content:` TODO &hellip;
`}).add({id:7,href:"/docs/help/faq/#question-1-",title:"FAQ / Question 1 ? ",description:"Answers to frequently asked questions.",content:` TODO &hellip;
`}).add({id:8,href:"/docs/design/",title:"Design",description:"The Doks Blog.",content:""}).add({id:9,href:"/docs/api/",title:"API",description:"API guide.",content:""}).add({id:10,href:"/docs/design/overview/#features",title:"Overview / Features ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Convert Excel/CSV/XML/YAML to JSON/Text/Bin. Use Protobuf to define the structure of Excel/CSV/XML/YAML. Use Golang to develop the conversion engine. Support multiple programming languages, thanks to Protobuf (proto3). "}).add({id:11,href:"/docs/design/overview/#concepts",title:"Overview / Concepts ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Importer: imports a Excel/CSV file to a in-memory book of Table sheets. imports a XML/YAML file to a in-memory book of Document sheets. Parsers: protogen: converts Excel/CSV/XML/YAML files to Protoconf files. confgen: converts Excel/CSV/XML/YAML with Protoconf files to JSON/Text/Bin files. Exporter: protogen: exports a tableau.Workbook to a proto file. confgen: exports a protobuf message to a JSON/Text/Bin file. Protoconf: a dialect of Protocol Buffers (proto3) extended with tableau options, aimed to define the structure of Excel/CSV/XML/YAML. "}).add({id:12,href:"/docs/design/overview/#workflow",title:"Overview / Workflow ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:`

`}).add({id:13,href:"/docs/design/overview/#types",title:"Overview / Types ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Scalar Message(struct) List Map(unordered) Timestamp Duration "}).add({id:14,href:"/docs/design/overview/#todo",title:"Overview / TODO ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:`
`}).add({id:15,href:"/docs/design/overview/#protoc-plugins",title:"Overview / protoc plugins ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Golang C++ C#/.NET Python Lua Javascript/Typescript/Node Java "}).add({id:16,href:"/docs/design/overview/#metadata",title:"Overview / Metadata ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:` metatable: a message to describe the worksheet&rsquo;s metadata. metafield: a message to describe the caption&rsquo;s metadata. captrow: caption row, the exact row number of captions at worksheet. Newline in caption is allowed for more readability, and will be trimmed in conversion. descrow: description row, the exact row number of descriptions at worksheet. datarow: data row, the start row number of data. Newline(line break) in major operating systems:
OS Abbreviation Escape sequence Unix (linux, OS X) LF \\n Microsoft Windows CRLF \\r\\n classic Mac OS/OS X CR \\r LF: Line Feed, CR: Carriage Return.
Mac OS X
`}).add({id:17,href:"/docs/design/overview/#generator",title:"Overview / Generator ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" generate protoconf by Excel(header): Excel -&gt; protoconf generate Excel(header) by protoconf: protoconf -&gt; Excel "}).add({id:18,href:"/docs/design/overview/#conversion",title:"Overview / Conversion ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Excel -&gt; JSON(default format and human readable) Excel -&gt; protowire(small size) Excel -&gt; prototext(human debugging) JSON -&gt; Excel protowire -&gt; Excel prototext -&gt; Excel "}).add({id:19,href:"/docs/design/overview/#pretty-print",title:"Overview / Pretty Print ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Multiline: every textual element on a new line Indent: 4 space characters JSON support prototext support "}).add({id:20,href:"/docs/design/overview/#emitunpopulated",title:"Overview / EmitUnpopulated ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" JSON: EmitUnpopulated specifies whether to emit unpopulated fields. "}).add({id:21,href:"/docs/design/overview/#scalar-types",title:"Overview / Scalar Types ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" interger: int32, uint32, int64 and uint64 float: float and double bool string bytes datetime, date, time, duration "}).add({id:22,href:"/docs/design/overview/#enumerations",title:"Overview / Enumerations ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" enum: The Parser accepts three enum value forms: enum value number enum value name enum value alias name (with EnumValueOptions specified) enum: validate the enum value. "}).add({id:23,href:"/docs/design/overview/#composite-types",title:"Overview / Composite Types ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" message: horizontal(row direction) layout, fields located in cells. message: simple in-cell message, each field must be scalar type. It is a comma-separated list of fields. E.g.: 1,test,3.0. List&rsquo;s size need not to be equal to fields&rsquo; size, as fields will be filled in order. Fields not configured will be filled default values due to its scalar type. list: horizontal(row direction) layout, which is list&rsquo;s default layout, and each item can be message or scalar. list: vertical(column direction) layout. and each item should be message. list: simple in-cell list, element must be scalar type. It is a comma-separated list of elements. E.g.: 1,2,3. list: scalable or dynamic list size. list: smart recognition of empty element at any position. list In-cell struct list: no need to support Cross-cell horizontal scalar/enum list Cross-cell horizontal incell-struct list Cross-cell vertical scalar list: no need to support, use this: [Item]int32 Cross-cell vertical incell-struct list list size dynamic size: items should be present continuously, and report error if empty item is inserted. fixed size map: horizontal(row direction) layout. map: vertical(column direction) layout, and is map&rsquo;s default layout. map: unordered-map or hash-map. map: ordered-map supported by tableauio/loader. C++ Golang C# map: simple in-cell map, both key and value must be scalar type. It is a comma-separated list of key:value pairs. E.g.: 1:10,2:20,3:30. map: scalable or dynamic map size. map: smart recognition of empty value at any position. map Cross-cell horizontal scalar map: no need to support, use this: map&lt;int32, Item&gt; Cross-cell vertical scalar map: : no need to support, use this: map&lt;int32, Item&gt; map size dynamic size: items should be present continuously, and report error if empty item is inserted. fixed size nesting: unlimited nesting of message, list, and map. nesting: the composite type&rsquo;s first element can be composite type. "}).add({id:24,href:"/docs/design/overview/#default-values",title:"Overview / Default Values ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:` Each scalar type&rsquo;s default value is same as protobuf.
interger: 0 float: 0.0 bool: false string: &quot;&quot; bytes: &quot;&quot; in-cell message: each field&rsquo;s default value is same as protobuf in-cell list: element&rsquo;s default value is same as protobuf in-cell map: both key and value&rsquo;s default value are same as protobuf message: all fields have default values `}).add({id:25,href:"/docs/design/overview/#empty",title:"Overview / Empty ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" scalar: default value same as protobuf. message: empty message will not be spawned if all fields are empty. list: empty list will not be spawned if list&rsquo;s size is 0. list: empty message will not be appended if list&rsquo;s element(message type) is empty. map: empty map will not be spawned if map&rsquo;s size is 0. map: empty message will not be inserted if map&rsquo;s value(message type) is empty. nesting: recursively empty. "}).add({id:26,href:"/docs/design/overview/#merge",title:"Overview / Merge ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" merge multiple workbooks merge multiple worksheets "}).add({id:27,href:"/docs/design/overview/#workbook-meta",title:"Overview / Workbook meta ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:` workbook meta sheet @TABLEAU:
specify which sheets to be parsed specify parser options for each sheet Sheet Alias Nameline Typeline Sheet1 ExchangeInfo 2 2 `}).add({id:28,href:"/docs/design/overview/#datetime",title:"Overview / Datetime ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:` Understanding about RFC 3339 for Datetime and Timezone Formatting in Software Engineering
2019-10-12T07:20:50.52Z # This is acceptable in ISO 8601 and RFC 3339 (with T) 2019-10-12 07:20:50.52Z # This is only accepted in RFC 3339 (without T)
&ldquo;Z&rdquo; stands for Zero timezone or Zulu timezone UTC+0, and equal to +08:00 in the RFC 3339. RFC 3339 follows the ISO 8601 DateTime format. The only difference is RFC allows us to replace &ldquo;T&rdquo; with &ldquo;space&rdquo;. Use RFC 3339 , which is following ISO 8601.
Timestamp: based on google.protobuf.Timestamp, see JSON mapping Timezone: see ParseInLocation DST: Daylight Savings Time. There is no plan to handle this boring stuff. Datetime: excel format: yyyy-MM-dd HH:mm:ss, e.g.: 2020-01-01 05:10:00 Date: excel format: yyyy-MM-dd or yyMMdd, e.g.: 2020-01-01 or 20200101 Time: excel format: HH:mm:ss or HHmmss, e.g.: 05:10:00 or 051000 Duration: based ongoogle.protobuf.Duration , see JSON mapping Duration: excel format: form &quot;72h3m0.5s&quot;, see golang duration string form `}).add({id:29,href:"/docs/design/overview/#transpose",title:"Overview / Transpose ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Interchange the rows and columns of a worksheet. "}).add({id:30,href:"/docs/design/overview/#validation",title:"Overview / Validation ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" unique: check map key uniqueness. range: [left,right]. refer: XXXConf.ID. To be supported by tableauio/loader. "}).add({id:31,href:"/docs/design/overview/#error-message",title:"Overview / Error Message ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Report clear and precise error messages when converter failed, please refer to the programming language compiler Use golang template to define error message template Multiple languages support, focused on English and Simplified Chinese "}).add({id:32,href:"/docs/design/overview/#performace",title:"Overview / Performace ",description:"Tableau is a powerful configuration converter powered by Protobuf (proto3).",content:" Stress test Each goroutine process one worksheet Mutiple process model "}).add({id:33,href:"/docs/design/metadata/#notation",title:"Metadata / Notation ",description:"An IDL called Protoconf to describe config's structure (metadata), based on Protobuf.",content:` The syntax is specified using Extended Backus-Naur Form (EBNF).
`}).add({id:34,href:"/docs/design/metadata/#workbook---protoconf",title:"Metadata / Workbook -&gt; Protoconf ",description:"An IDL called Protoconf to describe config's structure (metadata), based on Protobuf.",content:`
`}).add({id:35,href:"/docs/design/metadata/#basic",title:"Metadata / Basic ",description:"An IDL called Protoconf to describe config's structure (metadata), based on Protobuf.",content:` workbook: (AliasTest)DemoTest, worksheet: (AliasActivity)DemoActivity
protoconf file name is alias_test.proto. If with no (), name will be demo_test.proto configuration message name is AliasActivity. If with no (), name will be DemoActivity list: [ELEM-TYPE]COLUMN-TYPE, COLUMN-TYPE is column type, ELEM-TYPE is message name and list prefix (must not conflict with the protobuf keyword). map: map&lt;KEY-TYPE,VALUE-TYPE&gt;, KEY-TYPE must be scalar types, and VALUE-TYPE is message name and map prefix (must not conflict with build-in scalar type). import message types: .TYPE, e.g.: .Item represents the message Item already defined in the same protobuf package, and should not redefine it. well-known types Timestamp: google.protobuf.Timestamp Duration: google.protobuf.Duration Activity.xlsx&nbsp; Activity @TABLEAU ActivityID ActivityName ActivityBeginTime ActivityDuration ChapterID ChapterName SectionID SectionName SectionItem1Id SectionItem1Num SectionItem2Id SectionItem2Num map&lt;uint32,Activity&gt; string timestamp duration map&lt;uint32,Chapter&gt; string [Section]uint32 int32 [.Item]int32 int32 int32 int32 1 activity1 2020-01-01 05:00:00 72h 1 chapter1 1 section1 1001 1 1002 2 1 activity1 2020-01-01 05:00:00 72h 1 chapter1 2 section2 1001 1 1002 2 1 activity1 2020-01-01 05:00:00 72h 2 chapter2 1 section1 1001 1 1002 2 2 activity2 2020-01-01 05:00:00 72h3m0.5s 1 chapter1 1 section1 1001 1 1002 2 Output without prefix # Output with prefix # `}).add({id:36,href:"/docs/design/metadata/#incell",title:"Metadata / Incell ",description:"An IDL called Protoconf to describe config's structure (metadata), based on Protobuf.",content:` workbook: (AliasTest)DemoTest, worksheet: (Env)Environment
ID Name IncellMessage IncellList IncellMap IncellMessageList IncellMessageMap uint32 string {int32 id,string desc,int32 value}Msg []int32 map&lt;int32,string&gt; []{int32 id,string desc}Elem map&lt;int32,Value{int32 id,string desc}&gt; 1 Earth 1,desc,100 1,2,3 1:hello,2:world {1,hello},{2,world} 1:{1,hello},2:{2,world} --break-me-here--
IncellMessage # Syntax: TODO: EBNF Type: message type Value: comma seperated field values, e.g.: 1,desc,100 Rules:
Default Type Value int32 can be parsed as number string cannot be parsed as number IncellList # Syntax: []Type Type: any scalar type Value: comma seperated list items, e.g.: 1,2,3
IncellMap # Syntax: map&lt;Type,Type&gt; Type: any scalar type Value: comma seperated key-value pairs, and key-value is seperated by colon. e.g.: 1:hello,2:world
IncellMessageList # TODO&hellip;
IncellMessageMap # TODO&hellip;
Output # Incell message: comma seperated sequence: {TYPE [NAME],TYPE [NAME]}, NAME is optional, and will be auto generated as field + &lt;tagid&gt; if not specified. Incell list: []TYPE, TYPE must be scalar type. Incell map: map[KEY]VALUE, KEY and VALUE must be scalar types. Incell message list: []TYPE, TYPE must be message type. Incell message map: map[KEY]VALUE, KEY is scalar, and VALUE must be message type. `}).add({id:37,href:"/docs/design/metadata/#protoconf---workbook",title:"Metadata / Protoconf -&gt; Workbook ",description:"An IDL called Protoconf to describe config's structure (metadata), based on Protobuf.",content:` TODO&hellip;
`}).add({id:38,href:"/docs/api/tableau/",title:"Tableau",description:"Tableau guide.",content:""}).add({id:39,href:"/docs/api/loader/",title:"Loader",description:"Loader guide.",content:""}).add({id:40,href:"/docs/api/loader/overview/#supported-apis",title:"Overview / Supported APIs ",description:"Overview of tableau loader API.",content:" Lang Map OrderedMap Index OrderedIndex C++ ✔️ ✔️ ✔️ ✔️ Go ✔️ ✔️ ✔️ ✔️ C# ✔️ ✔️ ✔️ ✔️ TypeScript Lua "}).add({id:41,href:"/docs/api/loader/cpp/#api",title:"C++ / API ",description:"C++ loader guide.",content:`
`}).add({id:42,href:"/docs/api/loader/cpp/#data",title:"C++ / Data ",description:"C++ loader guide.",content:` const ProtobufMessage&amp; Data() const
Get the internal protobuf message data.
`}).add({id:43,href:"/docs/api/loader/cpp/#map",title:"C++ / Map ",description:"C++ loader guide.",content:` const MapValueType* Get(KEY1 k1, KEY2 k2...) const
Get the Nth-level map value. Returns nullptr if the key is not found. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:44,href:"/docs/api/loader/cpp/#orderedmap",title:"C++ / OrderedMap ",description:"C++ loader guide.",content:` Prerequisite: You need to set metasheet option OrderedMap to true.
See metatsheet option: OrderedMap.
const OrderedMapMap* GetOrderedMap() const: Gets the whole ordered map. const OrderedMapValueType* GetOrderedMap(KEY1 k1) const: Gets the 2nd-level ordered map value. Returns nullptr if the key is not found. Get the Nth-level ordered map value. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:45,href:"/docs/api/loader/cpp/#index",title:"C++ / Index ",description:"C++ loader guide.",content:` Prerequisite: You need to set metatsheet option Index appropriately.
See metatsheet option: Index.
If index name is Chapter, then the accessers are:
const Index_ChapterMap&amp; FindChapterMap() const: Gets the whole hash map. const Index_ChapterMap* FindChapterMap(KEY1 k1, KEY2 k2...) const: Gets the hash map scoped to the upper Nth-level map specified by the given key(s). const vector&lt;ParentType&gt;* FindChapter(KEY1 k1, KEY2 k2...) const: Finds values by key. One key may correspond to multiple values, which are returned by a vector. const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const: Finds the first value by key, or nullptr if no value found. `}).add({id:46,href:"/docs/api/loader/cpp/#orderedindex",title:"C++ / OrderedIndex ",description:"C++ loader guide.",content:` Prerequisite: You need to set metatsheet option OrderedIndex appropriately.
See metatsheet option: OrderedIndex.
If ordered index name is Chapter, then the accessers are:
const OrderedIndex_ChapterMap&amp; FindChapterMap() const: Gets the whole ordered map. const OrderedIndex_ChapterMap* FindChapterMap(KEY1 k1, KEY2 k2...) const: Gets the ordered map scoped to the upper Nth-level map specified by the given key(s). const vector&lt;ParentType&gt;* FindChapter(KEY1 k1, KEY2 k2...) const: Finds values by key. One key may correspond to multiple values, which are returned by a vector. const ParentType* FindFirstChapter(KEY1 k1, KEY2 k2...) const: Finds the first value by key, or nullptr if no value found. `}).add({id:47,href:"/docs/api/loader/cpp/#custom-messager",title:"C++ / Custom messager ",description:"C++ loader guide.",content:` If the built-in APIs are not sufficient for your business logic, then you can add a custom messager, where you can write preprocess logic based on loaded config objects.
Example: cpp-tableau-loader/hub/custom
custom_xxx_conf.h:
custom_xxx_conf.cpp:
`}).add({id:48,href:"/docs/api/loader/cpp/#plugin-protoc-gen-cpp-tableau-loader",title:"C++ / Plugin: protoc-gen-cpp-tableau-loader ",description:"C++ loader guide.",content:` An example to use this protoc plugin: cpp-tableau-loader/gen.sh.
`}).add({id:49,href:"/docs/api/loader/cpp/#full-example",title:"C++ / Full example ",description:"C++ loader guide.",content:` See cpp-tableau-loader.
`}).add({id:50,href:"/docs/api/loader/go/#api",title:"Go / API ",description:"Go loader guide.",content:`
`}).add({id:51,href:"/docs/api/loader/go/#data",title:"Go / Data ",description:"Go loader guide.",content:` func Data() *ProtobufMessage
Get the internal protobuf message data.
`}).add({id:52,href:"/docs/api/loader/go/#map",title:"Go / Map ",description:"Go loader guide.",content:` func GetN(k1 KEY1, k2 KEY2...) (*MapValueType, error)
Get the Nth-level map value. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:53,href:"/docs/api/loader/go/#orderedmap",title:"Go / OrderedMap ",description:"Go loader guide.",content:` Prerequisite: You need to set metasheet option OrderedMap to true.
See metatsheet option: OrderedMap.
func GetOrderedMapN(k1 KEY1, k2 KEY2...) (*OrderedMapValueType, error)
Get the Nth-level ordered map value. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:54,href:"/docs/api/loader/go/#index",title:"Go / Index ",description:"Go loader guide.",content:` Prerequisite: You need to set metatsheet option Index appropriately.
See metatsheet option: Index.
If index name is Chapter, then the accessers are:
func FindChapterMap() *Index_ChapterMap: Gets the whole hash map. func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType Finds values by key. One key may correspond to multiple values, which are returned by a slice. func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType: Finds the first value by key. `}).add({id:55,href:"/docs/api/loader/go/#orderedindex",title:"Go / OrderedIndex ",description:"Go loader guide.",content:` Prerequisite: You need to set metatsheet option OrderedIndex appropriately.
See metatsheet option: OrderedIndex.
If ordered index name is Chapter, then the accessers are:
func FindChapterMap() *OrderedIndex_ChapterMap: Gets the whole ordered map. func FindChapter(k1 KEY1, k2 KEY2...) []*ParentType Finds values by key. One key may correspond to multiple values, which are returned by a slice. func FindFirstChapter(k1 KEY1, k2 KEY2...) *ParentType: Finds the first value by key. `}).add({id:56,href:"/docs/api/loader/go/#custom-messager",title:"Go / Custom messager ",description:"Go loader guide.",content:` If the built-in APIs are not sufficient for your business logic, then you can add a custom messager, where you can write preprocess logic based on loaded config objects.
Example: go-tableau-loader/customconf
custom_xxx_conf.go:
`}).add({id:57,href:"/docs/api/loader/go/#plugin-protoc-gen-go-tableau-loader",title:"Go / Plugin: protoc-gen-go-tableau-loader ",description:"Go loader guide.",content:` An example to use this protoc plugin: go-tableau-loader/gen.sh.
`}).add({id:58,href:"/docs/api/loader/go/#full-example",title:"Go / Full example ",description:"Go loader guide.",content:` See go-tableau-loader.
`}).add({id:59,href:"/docs/api/loader/csharp/#api",title:"C# / API ",description:"C# loader guide.",content:`
`}).add({id:60,href:"/docs/api/loader/csharp/#data",title:"C# / Data ",description:"C# loader guide.",content:` public ref readonly ProtobufMessage Data()
Get the internal protobuf message data.
`}).add({id:61,href:"/docs/api/loader/csharp/#map",title:"C# / Map ",description:"C# loader guide.",content:` public MapValueType? Get1(KEY1 k1): Gets the 1st-level map value. Returns null if the key is not found. public MapValueType? Get2(KEY1 k1, KEY2 k2): Gets the 2nd-level map value. Returns null if the key is not found. &hellip; Get the Nth-level map value. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:62,href:"/docs/api/loader/csharp/#orderedmap",title:"C# / OrderedMap ",description:"C# loader guide.",content:` Prerequisite: You need to set metasheet option OrderedMap to true.
See metatsheet option: OrderedMap.
public ref readonly OrderedMapMap GetOrderedMap(): Gets the whole ordered map. public OrderedMapValueType? GetOrderedMap1(KEY1 k1): Gets the 1st-level ordered map value. Returns null if the key is not found. &hellip; Get the Nth-level ordered map value. Be aware that only applies to each level message&rsquo;s first map field.
`}).add({id:63,href:"/docs/api/loader/csharp/#index",title:"C# / Index ",description:"C# loader guide.",content:` Prerequisite: You need to set metatsheet option Index appropriately.
See metatsheet option: Index.
If index name is Chapter, then the accessers are:
public ref readonly Index_ChapterMap FindChapterMap(): Gets the whole hash map. public List&lt;ParentType&gt;? FindChapter(KEY1 k1, KEY2 k2...): Finds values by key. One key may correspond to multiple values, which are returned by a list. public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...): Finds the first value by key, or null if no value found. `}).add({id:64,href:"/docs/api/loader/csharp/#orderedindex",title:"C# / OrderedIndex ",description:"C# loader guide.",content:` Prerequisite: You need to set metatsheet option OrderedIndex appropriately.
See metatsheet option: OrderedIndex.
If ordered index name is Chapter, then the accessers are:
public ref readonly OrderedIndex_ChapterMap FindChapterMap(): Gets the whole ordered map. public List&lt;ParentType&gt;? FindChapter(KEY1 k1, KEY2 k2...): Finds values by key. One key may correspond to multiple values, which are returned by a list. public ParentType? FindFirstChapter(KEY1 k1, KEY2 k2...): Finds the first value by key, or null if no value found. `}).add({id:65,href:"/docs/api/loader/csharp/#custom-messager",title:"C# / Custom messager ",description:"C# loader guide.",content:` If the built-in APIs are not sufficient for your business logic, then you can add a custom messager, where you can write preprocess logic based on loaded config objects.
Example: csharp-tableau-loader/hub/custom
CustomXXXConf.cs:
Register in your initialization code:
`}).add({id:66,href:"/docs/api/loader/csharp/#plugin-protoc-gen-csharp-tableau-loader",title:"C# / Plugin: protoc-gen-csharp-tableau-loader ",description:"C# loader guide.",content:` An example to use this protoc plugin: csharp-tableau-loader/gen.sh.
`}).add({id:67,href:"/docs/api/loader/csharp/#full-example",title:"C# / Full example ",description:"C# loader guide.",content:` See csharp-tableau-loader.
`}).add({id:68,href:"/docs/api/loader/ts/#overview",title:"TypeScript / Overview ",description:"TypeScript loader guide.",content:` TODO: refer Tableau loader.
`}).add({id:69,href:"/docs/api/loader/lua/#overview",title:"Lua / Overview ",description:"Lua loader guide.",content:` TODO: refer Tableau loader.
`}).add({id:70,href:"/docs/api/checker/",title:"Checker",description:"Checker guide.",content:""}).add({id:71,href:"/docs/yaml/scalar/#scalar",title:"Scalar / Scalar ",description:"YAML scalar guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:72,href:"/docs/yaml/",title:"YAML",description:"YAML guide.",content:""}).add({id:73,href:"/docs/yaml/enum/#use-predefined-enum-type",title:"Enum / Use predefined enum type ",description:"YAML enum guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:74,href:"/docs/api/tableau/guide/#prerequisites",title:"Guide / Prerequisites ",description:"This guide gets you started with Tableau in Go with a simple working example.",content:` Go, any one of the three latest major releases of Go. For installation instructions, see Go’s Getting Started guide. Protocol buffer compiler, protoc, version 3. For installation instructions, see Protocol Buffer Compiler Installation. Go plugins for the protocol compiler: Install the protocol compiler plugins for Go using the following commands:
Update your PATH so that the protoc compiler can find the plugins:
`}).add({id:75,href:"/docs/api/tableau/guide/#get-the-example-code",title:"Guide / Get the example code ",description:"This guide gets you started with Tableau in Go with a simple working example.",content:` The example code is part of the tableau/demo repo.
Download the repo as a zip file and unzip it, or clone the repo:
Change to the quick start example directory:
`}).add({id:76,href:"/docs/api/tableau/guide/#run-the-example",title:"Guide / Run the example ",description:"This guide gets you started with Tableau in Go with a simple working example.",content:` From the examples/helloworld directory:
Change dir to excel2proto, compile and execute:
Then proto files will be generated to examples/helloworld/proto.
Change dir to excel2conf, generate *.pb.go and then compile and execute:
Then *.pb.go files will be generated to examples/helloworld/protoconf, and JSON files will be generated to examples/helloworld/excel2conf/_out.
Congratulations! You’ve just run a modern configuration converter application with Tableau.
`}).add({id:77,href:"/docs/yaml/struct/#general-struct",title:"Struct / General struct ",description:"YAML struct guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Tips
Well-known type: datetime → Well-known type: duration → Generated:
hello_world.proto ItemConf.json `}).add({id:78,href:"/docs/yaml/struct/#reuse-same-level-struct",title:"Struct / Reuse same-level struct ",description:"YAML struct guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:79,href:"/docs/yaml/struct/#predefined-struct",title:"Struct / Predefined struct ",description:"YAML struct guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:80,href:"/docs/yaml/struct/#incell-struct",title:"Struct / Incell struct ",description:"YAML struct guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:81,href:"/docs/yaml/struct/#incell-general-struct",title:"Struct / Incell general struct ",description:"YAML struct guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:82,href:"/docs/yaml/struct/#incell-predefined-struct",title:"Struct / Incell predefined struct ",description:"YAML struct guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:83,href:"/docs/yaml/union/#union-definition",title:"Union / Union definition ",description:"YAML union guide.",content:` For example, union type Target in common.proto is predefined as:
`}).add({id:84,href:"/docs/yaml/union/#predefined-union",title:"Union / Predefined union ",description:"YAML union guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:85,href:"/docs/yaml/union/#predefined-incell-union",title:"Union / Predefined incell union ",description:"YAML union guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:86,href:"/docs/yaml/union/#predefined-union-list",title:"Union / Predefined union list ",description:"YAML union guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:87,href:"/docs/yaml/list/#scalar-list",title:"List / Scalar list ",description:"YAML list guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:88,href:"/docs/yaml/list/#enum-list",title:"List / Enum list ",description:"YAML list guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:89,href:"/docs/yaml/list/#incell-scalar-list",title:"List / Incell scalar list ",description:"YAML list guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:90,href:"/docs/yaml/list/#incell-enum-list",title:"List / Incell enum list ",description:"YAML list guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:91,href:"/docs/yaml/list/#struct-list",title:"List / Struct list ",description:"YAML list guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:92,href:"/docs/yaml/list/#predefined-struct-list",title:"List / Predefined struct list ",description:"YAML list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:93,href:"/docs/yaml/list/#list-in-list",title:"List / List in list ",description:"YAML list guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:94,href:"/docs/yaml/list/#map-in-list",title:"List / Map in list ",description:"YAML list guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:95,href:"/docs/yaml/map/#scalar-map",title:"Map / Scalar map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:96,href:"/docs/yaml/map/#enum-key-map",title:"Map / Enum key map ",description:"YAML map guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:97,href:"/docs/yaml/map/#enum-key-value-map",title:"Map / Enum key-value map ",description:"YAML map guide.",content:` Enum types Enum type FruitType and FruitFlavor in common.proto are predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:98,href:"/docs/yaml/map/#incell-scalar-map",title:"Map / Incell scalar map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:99,href:"/docs/yaml/map/#incell-enum-map",title:"Map / Incell enum map ",description:"YAML map guide.",content:` Enum types Enum type FruitType and FruitFlavor in common.proto are predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:100,href:"/docs/yaml/map/#struct-map",title:"Map / Struct map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:101,href:"/docs/yaml/map/#enum-key-struct-map",title:"Map / Enum key struct map ",description:"YAML map guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:102,href:"/docs/yaml/map/#custom-key-struct-map",title:"Map / Custom key struct map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:103,href:"/docs/yaml/map/#list-in-map",title:"Map / List in map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:104,href:"/docs/yaml/map/#map-in-map",title:"Map / Map in map ",description:"YAML map guide.",content:` A worksheet ItemConf in HelloWorld.yaml:
Generated:
hello_world.proto ItemConf.json `}).add({id:105,href:"/docs/yaml/metasheet/#overview",title:"Metasheet / Overview ",description:"YAML metasheet @TABLEAU guide.",content:` The metasheet named &ldquo;@TABLEAU&rdquo; is designed to specify tableau parser options. Go to read details about Metatsheet →.
A YAML metasheet example:
`}).add({id:106,href:"/docs/yaml/metasheet/#todo",title:"Metasheet / TODO ",description:"YAML metasheet @TABLEAU guide.",content:` More details&hellip;
`}).add({id:107,href:"/docs/xml/scalar/#scalar",title:"Scalar / Scalar ",description:"XML scalar guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:108,href:"/docs/xml/",title:"XML",description:"XML guide.",content:""}).add({id:109,href:"/docs/xml/enum/#use-predefined-enum-type",title:"Enum / Use predefined enum type ",description:"XML enum guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:110,href:"/docs/xml/struct/#general-struct",title:"Struct / General struct ",description:"XML struct guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Tips
Well-known type: datetime → Well-known type: duration → Generated:
hello_world.proto ItemConf.json `}).add({id:111,href:"/docs/xml/struct/#reuse-same-level-struct",title:"Struct / Reuse same-level struct ",description:"XML struct guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:112,href:"/docs/xml/struct/#predefined-struct",title:"Struct / Predefined struct ",description:"XML struct guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:113,href:"/docs/xml/struct/#incell-struct",title:"Struct / Incell struct ",description:"XML struct guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:114,href:"/docs/xml/struct/#incell-predefined-struct",title:"Struct / Incell predefined struct ",description:"XML struct guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:115,href:"/docs/xml/union/#union-definition",title:"Union / Union definition ",description:"XML union guide.",content:` For example, union type Target in common.proto is predefined as:
`}).add({id:116,href:"/docs/xml/union/#predefined-union",title:"Union / Predefined union ",description:"XML union guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:117,href:"/docs/xml/union/#predefined-incell-union",title:"Union / Predefined incell union ",description:"XML union guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:118,href:"/docs/xml/union/#predefined-union-list",title:"Union / Predefined union list ",description:"XML union guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:119,href:"/docs/xml/list/#scalar-list",title:"List / Scalar list ",description:"XML list guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:120,href:"/docs/xml/list/#enum-list",title:"List / Enum list ",description:"XML list guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:121,href:"/docs/xml/list/#incell-scalar-list",title:"List / Incell scalar list ",description:"XML list guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:122,href:"/docs/xml/list/#incell-enum-list",title:"List / Incell enum list ",description:"XML list guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:123,href:"/docs/xml/list/#struct-list",title:"List / Struct list ",description:"XML list guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:124,href:"/docs/xml/list/#predefined-struct-list",title:"List / Predefined struct list ",description:"XML list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:125,href:"/docs/xml/list/#list-in-list",title:"List / List in list ",description:"XML list guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:126,href:"/docs/xml/list/#map-in-list",title:"List / Map in list ",description:"XML list guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:127,href:"/docs/xml/map/#incell-scalar-map",title:"Map / Incell scalar map ",description:"XML map guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:128,href:"/docs/xml/map/#incell-enum-map",title:"Map / Incell enum map ",description:"XML map guide.",content:` Enum types Enum type FruitType and FruitFlavor in common.proto are predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:129,href:"/docs/xml/map/#struct-map",title:"Map / Struct map ",description:"XML map guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:130,href:"/docs/xml/map/#enum-key-struct-map",title:"Map / Enum key struct map ",description:"XML map guide.",content:` Enum type FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:131,href:"/docs/xml/map/#list-in-map",title:"Map / List in map ",description:"XML map guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:132,href:"/docs/xml/map/#map-in-map",title:"Map / Map in map ",description:"XML map guide.",content:` A worksheet ItemConf in HelloWorld.xml:
Generated:
hello_world.proto ItemConf.json `}).add({id:133,href:"/docs/xml/metasheet/#what-is-a-metasheet-in-xml",title:"Metasheet / What is a metasheet in XML? ",description:"XML metasheet @TABLEAU guide.",content:` A metasheet is a comment block normally written at the beginning of an XML file, which must begin with keyword @TABLEAU and define types of attributes of nodes in the following lines. e.g.:
`}).add({id:134,href:"/docs/xml/metasheet/#without-metasheet",title:"Metasheet / Without metasheet ",description:"XML metasheet @TABLEAU guide.",content:` If one XML file has no metasheet (In other words, has no comment block beginning with @TABLEAU), no protobuf and json will be generated.
`}).add({id:135,href:"/docs/csv/",title:"CSV",description:"CSV guide.",content:""}).add({id:136,href:"/docs/csv/overview/#concepts",title:"Overview / Concepts ",description:"CSV overview.",content:` As Tableau recognizes the pattern &lt;BookName&gt;#&lt;SheetName&gt;.csv, so a CSV workbook (Glob Pattern) &lt;BookName&gt;#*.csv is composed of multiple CSV worksheets (files) in the same directory.
E.g.:
A CSV workbook HelloWorld#*.csv is composed of three CSV worksheets:
Worksheet Item: HelloWorld#Item.csv Worksheet Activity: HelloWorld#Activity.csv Worksheet @TABLEAU: HelloWorld#@TABLEAU.csv `}).add({id:137,href:"/docs/csv/overview/#guide",title:"Overview / Guide ",description:"CSV overview.",content:` As the CSV worksheet is same as the Excel worksheet, so just read Excel Guide →
`}).add({id:138,href:"/docs/excel/",title:"Excel",description:"Excel guide.",content:""}).add({id:139,href:"/docs/excel/scalar/#scalar",title:"Scalar / Scalar ",description:"Excel scalar guide.",content:` A worksheet Apple in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Name Desc uint32 string string Item&rsquo;s ID Item&rsquo;s Name Item&rsquo;s Description 1 Apple A kind of delicious fruit. In this worksheet, three scalar fields are defined:
ID: uint32 Name: string Desc: string Generated:
hello_world.proto Apple.json `}).add({id:140,href:"/docs/excel/scalar/#note",title:"Scalar / Note ",description:"Excel scalar guide.",content:` Scalar type is usually used to define fields of struct type. Struct →
`}).add({id:141,href:"/docs/excel/enum/#use-predefined-enum-type",title:"Enum / Use predefined enum type ",description:"Excel enum guide.",content:` The basic enum guide, please go to read Enum →
For example, enum type FruitType in common.proto is defined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Type map&lt;uint32, Item&gt; enum&lt;.FruitType&gt; Item&rsquo;s ID Fruit&rsquo;s type 1 1 2 Orange 3 FRUIT_TYPE_BANANA Generated:
hello_world.proto ItemConf.json `}).add({id:142,href:"/docs/excel/enum/#define-enum-type-in-sheet",title:"Enum / Define enum type in sheet ",description:"Excel enum guide.",content:` There are two kinds of Mode (in metasheet @TABLEAU) to define enum types in a sheet:
MODE_ENUM_TYPE: define single enum type in a sheet. MODE_ENUM_TYPE_MULTI: define multiple enum types in a sheet. `}).add({id:143,href:"/docs/excel/enum/#single-enum-type-in-sheet",title:"Enum / Single enum type in sheet ",description:"Excel enum guide.",content:` You should specify Mode option to MODE_ENUM_TYPE in metasheet @TABLEAU.
For example, a worksheet ItemType in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemType @TABLEAU Name Alias ITEM_TYPE_FRUIT Fruit ITEM_TYPE_EQUIP Equip ITEM_TYPE_BOX Box Sheet Mode ItemType MODE_ENUM_TYPE Generated:
hello_world.proto `}).add({id:144,href:"/docs/excel/enum/#multiple-enum-types-in-sheet",title:"Enum / Multiple enum types in sheet ",description:"Excel enum guide.",content:` A block defines an enum type, and it is a series of contiguous non-empty rows. So different blocks are seperated by one or more empty rows.
You should specify Mode option to MODE_ENUM_TYPE_MULTI in metasheet @TABLEAU.
For example, a worksheet ItemType in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemType @TABLEAU CatType CatType note Number Name Alias 1 CAT_TYPE_RAGDOLL Ragdoll 2 CAT_TYPE_PERSIAN Persian 3 CAT_TYPE_SPHYNX Sphynx DogType DogType note Number Name Alias 1 DOG_TYPE_POODLE Poodle 2 DOG_TYPE_BULLDOG Bulldog 3 DOG_TYPE_DACHSHUND Dachshund BirdType BirdType note Number Name Alias 1 CANARY Canary 2 WOODPECKER Woodpecker 3 OWL Owl Sheet Mode ItemType MODE_ENUM_TYPE_MULTI Generated:
hello_world.proto `}).add({id:145,href:"/docs/excel/enum/#specify-number-column",title:"Enum / Specify Number column ",description:"Excel enum guide.",content:` In Number column, you can specify custom unique enum value number.
ⓘ If you not specify default enum value "0", it will be auto generated. And the default enum value name pattern is: "{ENUM_TYPE}_INVALID". For example, a worksheet ItemType in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemType @TABLEAU Number Name Alias 0 ITEM_TYPE_UNKNOWN Unknown 10 ITEM_TYPE_FRUIT Fruit 20 ITEM_TYPE_EQUIP Equip 30 ITEM_TYPE_BOX Box Sheet Mode ItemType MODE_ENUM_TYPE Generated:
hello_world.proto `}).add({id:146,href:"/docs/excel/enum/#define-and-use-enum-type-in-sheet",title:"Enum / Define and use enum type in sheet ",description:"Excel enum guide.",content:` For example, two worksheets ItemType and ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemType ItemConf @TABLEAU Number Name Alias 1 ITEM_TYPE_FRUIT Fruit 2 ITEM_TYPE_EQUIP Equip 3 ITEM_TYPE_BOX Box ID Type Name Price map&lt;int32, Item&gt; enum&lt;.ItemType&gt; string int32 Item’s ID Item’s type Item’s name Item’s price 1 Fruit Apple 40 2 Fruit Orange 20 3 Equip Sword 10 Sheet Mode ItemType MODE_ENUM_TYPE ItemConf Generated:
hello_world.proto ItemConf.json `}).add({id:147,href:"/docs/excel/struct/#cross-cell-struct",title:"Struct / Cross-cell struct ",description:"Excel struct guide.",content:` Syntax: &lt;StructType&gt;ColumnType.
Each column name should be prefixed with the same struct variable name, which is just the same as struct type name by default.
For example, a worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU PropertyID PropertyName PropertyDesc {Property}int32 string string Property&rsquo;s ID Property&rsquo;s Name Property&rsquo;s Description 1 Orange A kind of sour fruit. Note that each column name in ItemConf is prefixed with struct variable name Property which is same as struct type name.
Generated:
hello_world.proto ItemConf.json `}).add({id:148,href:"/docs/excel/struct/#note",title:"Struct / Note ",description:"Excel struct guide.",content:` Cross-cell struct is usually used together with:
cross-cell horizontal/vertical map, as map value type. Map → cross-cell horizontal/vertical list, as list element type. List → `}).add({id:149,href:"/docs/excel/struct/#incell-struct",title:"Struct / Incell struct ",description:"Excel struct guide.",content:` Each field type of the struct should be scalar type.
For example, a worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;int32, Item&gt; {int32 ID,string Name,string Desc}Property Item&rsquo;s ID Item&rsquo;s property. 1 1,Orange,A good fruit. 2 2,Apple 3 3 The Property column&rsquo;s type is in-cell struct {int32 ID,string Name,string Desc}Property.
Generated:
hello_world.proto ItemConf.json `}).add({id:150,href:"/docs/excel/struct/#predefined-struct",title:"Struct / Predefined struct ",description:"Excel struct guide.",content:` For example, struct type Prop in common.proto is defined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; [.Prop]int32 int32 int32 int32 Item&rsquo;s ID Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 1 100 2 200 2 3 300 4 400 3 5 500 Generated:
hello_world.proto ItemConf.json `}).add({id:151,href:"/docs/excel/struct/#predefined-incell-struct",title:"Struct / Predefined incell struct ",description:"Excel struct guide.",content:` Each field type of the predefined struct should be scalar type.
For example, Property in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;uint32, Item&gt; {.Property} Item&rsquo;s ID Item&rsquo;s property. 1 1,Orange,A good fruit. 2 2,Apple 3 3 The Prop column&rsquo;s type is a predefined struct Property.
Generated:
hello_world.proto ItemConf.json `}).add({id:152,href:"/docs/excel/struct/#custom-named-struct",title:"Struct / Custom named struct ",description:"Excel struct guide.",content:` By default, struct variable name is same as struct type name, but you can specify a different struct variable name. Custom named struct is mainly used to identify name prefix of continuous cells in name row, when the tableau (protogen) can&rsquo;t auto-recognize the variable name.
Syntax: just after struct type name, use parentheses () to specify struct variable name: VariableType(VariableName).
For example, Item is predefined:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardItemID RewardItemNum CostItemID CostItemNum PredefinedItemID PredefinedItemNum {Item(RewardItem)}int32 int32 {Item(CostItem)}int32 int32 {.Item(PredefinedItem)}int32 int32 Item&rsquo;s ID Item&rsquo;s ID Cost&rsquo;s ID Cost&rsquo;s ID Predefined item&rsquo;s ID Predefined item&rsquo;s ID 1 100 2 200 10 20 Details: In type cell {Item(RewardItem)}int32, RewardItem is the custom variable name of new defined struct Item. And in type cell {Item(CostItem)}int32, CostItem is the custom variable name of just already defined struct Item in the same scope. Finally, in type cell {.Item(PredefinedItem)}int32, PredefinedItem is the custom variable name of predefined struct Item at global (at the same protobuf package).
Generated:
hello_world.proto ItemConf.json `}).add({id:153,href:"/docs/excel/struct/#advanced-predefined-incell-struct",title:"Struct / Advanced predefined incell struct ",description:"Excel struct guide.",content:` In some situations, you may want to configure any complex struct in a cell, so tableau support two kinds of protobuf serialized formats: text format, and JSON format.
Syntax: in field prop, specify form option as FORM_TEXT or FORM_JSON.
For example, Transform is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Transform1 Transform2 {.Transform}|{form:FORM_TEXT} {.Transform}|{form:FORM_JSON} Box&rsquo;s transform1 Box&rsquo;s transform2 position:{x:1 y:2 z:3} rotation:{x:4 y:5 z:6} scale:{x:7 y:8 z:9} {&ldquo;position&rdquo;:{&ldquo;x&rdquo;:1, &ldquo;y&rdquo;:2, &ldquo;z&rdquo;:3}, &ldquo;rotation&rdquo;:{&ldquo;x&rdquo;:4, &ldquo;y&rdquo;:5, &ldquo;z&rdquo;:6}, &ldquo;scale&rdquo;:{&ldquo;x&rdquo;:7, &ldquo;y&rdquo;:8, &ldquo;z&rdquo;:9}} Generated:
hello_world.proto ItemConf.json `}).add({id:154,href:"/docs/excel/struct/#define-struct-type-in-sheet",title:"Struct / Define struct type in sheet ",description:"Excel struct guide.",content:` There are two kinds of Mode (in metasheet @TABLEAU) to define struct types in a sheet:
MODE_STRUCT_TYPE: define single struct type in a sheet. MODE_STRUCT_TYPE_MULTI: define multiple struct types in a sheet. `}).add({id:155,href:"/docs/excel/struct/#single-struct-type-in-sheet",title:"Struct / Single struct type in sheet ",description:"Excel struct guide.",content:` You should specify Mode option to MODE_STRUCT_TYPE in metasheet @TABLEAU.
For example, a worksheet Item in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Item @TABLEAU Name Type ID uint32 Num int32 FruitType enum&lt;.FruitType&gt; Feature []int32 Prop map&lt;int32, string&gt; Detail {enum&lt;.ItemType&gt; Type, string Name, string Desc}Detail Sheet Mode Item MODE_STRUCT_TYPE Generated:
hello_world.proto `}).add({id:156,href:"/docs/excel/struct/#multiple-struct-types-in-sheet",title:"Struct / Multiple struct types in sheet ",description:"Excel struct guide.",content:` A block defines a struct type, and it is a series of contiguous non-empty rows. So different blocks are seperated by one or more empty rows.
You should specify Mode option to MODE_STRUCT_TYPE_MULTI in metasheet @TABLEAU.
For example, a worksheet Item in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Item @TABLEAU Tree Tree note Name Type ID uint32 Num int32 Pet Pet note Name Type Kind int32 Tip []string FruitShop FruitShop note Name Type FruitType enum&lt;.FruitType&gt; Prop map&lt;int32, string&gt; Sheet Mode Item MODE_STRUCT_TYPE_MULTI Generated:
hello_world.proto `}).add({id:157,href:"/docs/excel/struct/#specify-number-column",title:"Struct / Specify Number column ",description:"Excel struct guide.",content:` In Number column, you can specify custom unique field number.
For example, a worksheet Item in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Item @TABLEAU Number Name Type 1 ID uint32 20 Num int32 30 FruitType enum&lt;.FruitType&gt; Sheet Mode Item MODE_STRUCT_TYPE Generated:
hello_world.proto `}).add({id:158,href:"/docs/excel/union/#theory",title:"Union / Theory ",description:"Excel union guide.",content:` In protoconf, union type means the tagged union: a data structure used to hold a value that could take on several different, but fixed, types. Only one of the types can be in use at any one time, and a tag field explicitly indicates which one is in use. More details can be learned from wikipedia Tagged union.
Tagged union in different programming languages:
C++: std::variant. Rust: Defining an Enum. Tableau use protobuf message to bundle enum and oneof together to implement tagged union. By default, each enum value (&gt;0) is bound to a field with the same tag number of oneof type.
`}).add({id:159,href:"/docs/excel/union/#union-definition",title:"Union / Union definition ",description:"Excel union guide.",content:` For example, union type Target in common.proto is predefined as:
`}).add({id:160,href:"/docs/excel/union/#predefined-union-in-list",title:"Union / Predefined union in list ",description:"Excel union guide.",content:` Based on predefined union type Target.
A worksheet TaskConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Target1Type Target1Field1 Target1Field2 Target1Field3 Target2Type Target2Field1 Target2Field2 Target2Field3 map&lt;int32, Task&gt; [.Target]enum&lt;.Target.Type&gt; union union union enum&lt;.Target.Type&gt; union union union ID Target1&rsquo;s type Target1&rsquo;s field1 Target1&rsquo;s field2 Target1&rsquo;s field3 Target2&rsquo;s type Target2&rsquo;s field1 Target2&rsquo;s field2 Target2&rsquo;s field3 1 PVP 1 10 Apple,Orange,Banana PVE 1,100,999 1,2,3 1:10,2:20,3:30 2 Story 1001,10 1:Apple,2:Orange Fragrant:1,Sour:2 Skill 1 2 Generated:
hello_world.proto TaskConf.json TaskConf.txt `}).add({id:161,href:"/docs/excel/union/#predefined-union-in-map",title:"Union / Predefined union in map ",description:"Excel union guide.",content:` Based on predefined union type Target.
A worksheet TaskConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID TargetType TargetField1 TargetField2 TargetField3 Progress map&lt;int32, Task&gt; {.Target}enum&lt;.Target.Type&gt; union union union int32 ID Target&rsquo;s type Target&rsquo;s field1 Target&rsquo;s field2 Target&rsquo;s field3 Progress 1 PVP 1 10 Apple,Orange,Banana 3 2 PVE 1,100,999 1,2,3 1:10,2:20,3:30 10 3 Story 1001,10 1:Apple,2:Orange Fragrant:1,Sour:2 10 4 Skill 1 2 8 Generated:
hello_world.proto TaskConf.json TaskConf.txt `}).add({id:162,href:"/docs/excel/union/#predefined-incell-union-in-map",title:"Union / Predefined incell union in map ",description:"Excel union guide.",content:` Based on predefined union type Target.
A worksheet TaskConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Apple @TABLEAU ID Target1 Target2 Progress map&lt;int32, Task&gt; {.Target}|{form:FORM_TEXT} {.Target}|{form:FORM_JSON} int32 ID Target1 Target2 Progress 1 type:TYPE_PVP pvp:{type:1 damage:10 types:FRUIT_TYPE_APPLE types:FRUIT_TYPE_ORANGE types:FRUIT_TYPE_BANANA} {&ldquo;type&rdquo;:&ldquo;TYPE_PVP&rdquo;,&ldquo;pvp&rdquo;:{&ldquo;type&rdquo;:1,&ldquo;damage&rdquo;:&ldquo;10&rdquo;,&ldquo;types&rdquo;:[&ldquo;FRUIT_TYPE_APPLE&rdquo;,&ldquo;FRUIT_TYPE_ORANGE&rdquo;,&ldquo;FRUIT_TYPE_BANANA&rdquo;]}} 3 2 type:TYPE_PVE pve:{mission:{id:1 level:100 damage:999} heros:1 heros:2 heros:3 dungeons:{key:1 value:10} dungeons:{key:2 value:20} dungeons:{key:3 value:30}} {&ldquo;type&rdquo;:&ldquo;TYPE_PVE&rdquo;,&ldquo;pve&rdquo;:{&ldquo;mission&rdquo;:{&ldquo;id&rdquo;:1,&ldquo;level&rdquo;:100,&ldquo;damage&rdquo;:&ldquo;999&rdquo;},&ldquo;heros&rdquo;:[1,2,3],&ldquo;dungeons&rdquo;:{&ldquo;1&rdquo;:&ldquo;10&rdquo;,&ldquo;2&rdquo;:&ldquo;20&rdquo;,&ldquo;3&rdquo;:&ldquo;30&rdquo;}}} 10 3 type:TYPE_STORY story:{cost:{id:1001 num:10} fruits:{key:1 value:FRUIT_TYPE_APPLE} fruits:{key:2 value:FRUIT_TYPE_ORANGE} flavors:{key:1 value:{key:FRUIT_FLAVOR_FRAGRANT value:1}} flavors:{key:2 value:{key:FRUIT_FLAVOR_SOUR value:2}}} {&ldquo;type&rdquo;:&ldquo;TYPE_STORY&rdquo;,&ldquo;story&rdquo;:{&ldquo;cost&rdquo;:{&ldquo;id&rdquo;:1001,&ldquo;num&rdquo;:10},&ldquo;fruits&rdquo;:{&ldquo;1&rdquo;:&ldquo;FRUIT_TYPE_APPLE&rdquo;,&ldquo;2&rdquo;:&ldquo;FRUIT_TYPE_ORANGE&rdquo;},&ldquo;flavors&rdquo;:{&ldquo;1&rdquo;:{&ldquo;key&rdquo;:&ldquo;FRUIT_FLAVOR_FRAGRANT&rdquo;,&ldquo;value&rdquo;:1},&ldquo;2&rdquo;:{&ldquo;key&rdquo;:&ldquo;FRUIT_FLAVOR_SOUR&rdquo;,&ldquo;value&rdquo;:2}}}} 10 4 type:TYPE_SKILL skill:{id:1 damage:2} {&ldquo;type&rdquo;:&ldquo;TYPE_SKILL&rdquo;,&ldquo;skill&rdquo;:{&ldquo;id&rdquo;:1,&ldquo;damage&rdquo;:&ldquo;2&rdquo;}} 8 Generated:
hello_world.proto TaskConf.json `}).add({id:163,href:"/docs/excel/union/#define-union-type-in-sheet",title:"Union / Define union type in sheet ",description:"Excel union guide.",content:` There are two kinds of Mode (in metasheet @TABLEAU) to define union types in a sheet:
MODE_UNION_TYPE: define single union type in a sheet. MODE_UNION_TYPE_MULTI: define multiple union types in a sheet. You can define each union field by following types:
Scalar → Enum → Wellknown types → Incell struct → Incell list → Incell map → `}).add({id:164,href:"/docs/excel/union/#single-union-type-in-sheet",title:"Union / Single union type in sheet ",description:"Excel union guide.",content:` You should specify Mode option to MODE_UNION_TYPE in metasheet @TABLEAU.
For example, a worksheet Target in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Target @TABLEAU Name Alias Field1 Field2 Field3 PVP AliasPVP ID
uint32
Note Damage
int64
Note Type
enum&lt;.FruitType&gt;
Note PVE AliasPVE Hero
[]uint32
Note Dungeon
map&lt;int32, int64&gt;
Note Skill AliasSkill StartTime
datetime
Note Duration
duration
Note Sheet Mode Target MODE_UNION_TYPE Generated:
hello_world.proto `}).add({id:165,href:"/docs/excel/union/#multiple-union-types-in-sheet",title:"Union / Multiple union types in sheet ",description:"Excel union guide.",content:` You should specify Mode option to MODE_UNION_TYPE_MULTI in metasheet @TABLEAU.
For example, a worksheet Target in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Target @TABLEAU WishTarget WishTarget note Name Alias Field1 Field2 Field3 Higher WishHigher Height
int32 Richer WishRicher ID
uint32 Bank
map&lt;int32, string&gt; HeroTarget HeroTarget note Name Alias Field1 Field2 Field3 StarUp HeroStarUp ID
uint32 Star
int32 LevelUp HeroLevelUp ID
[]uint32 Level
int32 Super
bool BattleTarget BattleTarget note Name Alias Field1 Field2 Field3 PVP BattlePVP BattleID
int32 Damage
int64 PVE BattlePVE HeroID
[]int32 Dungeon
map&lt;int32, int64&gt; Boss
{uint32 ID, int64 Damage}Boss Sheet Mode Target MODE_UNION_TYPE_MULTI Generated:
hello_world.proto `}).add({id:166,href:"/docs/excel/union/#specify-number-column",title:"Union / Specify Number column ",description:"Excel union guide.",content:` In Number column, you can specify custom unique field number and corresponding enum value number.
For example, a worksheet Target in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Target @TABLEAU Number Name Alias Field1 Field2 Field3 1 PVP AliasPVP ID
uint32
Note Damage
int64
Note Type
enum&lt;.FruitType&gt;
Note 20 PVE AliasPVE Hero
[]uint32
Note Dungeon
map&lt;int32, int64&gt;
Note 30 Skill AliasSkill StartTime
datetime
Note Duration
duration
Note Sheet Mode Target MODE_UNION_TYPE Generated:
hello_world.proto `}).add({id:167,href:"/docs/excel/union/#specify-type-column",title:"Union / Specify Type column ",description:"Excel union guide.",content:` By default, each union&rsquo;s oneof field is a message type with the name specified by Name column. Now, you can add Type column and specify custom oneof field type:
scalar enum global predefined struct custom named struct local predefined struct in the same level For example, a worksheet Target in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Target @TABLEAU Name Alias Type Field1 Field2 #Note Fruit Fruit enum&lt;.FruitType&gt; Bound to enum Point Point int32 Bound to scalar Item Item .Item Bound to global predefined struct Player Player ID uint32 Name string Bound to local defined struct Friend Friend Player Bound to local predefined in the same level Monster Monster CustomMonster Health uint32 Attack int32 Bound to local defined struct with custom type name Boss Boss CustomMonster Bound to local predefined struct in the same level Sheet Mode Target MODE_UNION_TYPE Generated:
hello_world.proto `}).add({id:168,href:"/docs/excel/union/#complex-union-type-in-sheet",title:"Union / Complex union type in sheet ",description:"Excel union guide.",content:` For example, two worksheets Target and TaskConf in HelloWorld.xlsx:
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
Note Empty AliasEmpty ID TargetType TargetField1 TargetField2 TargetField3 Progress map&lt;int32, Task&gt; {.Target}enum&lt;.Target.Type&gt; union union union int32 ID Target&rsquo;s type Target&rsquo;s field1 Target&rsquo;s field2 Target&rsquo;s field3 Progress 1 AliasPVP 1 10 Apple,Orange,Banana 3 2 AliasPVE 1,Equip 1,2,3 1:10,2:20,3:30 10 3 AliasStory 1001,10 1:Apple,2:Orange Fragrant:Apple,Sour:Orange 10 4 AliasHobby Fragrant:Apple,Sour:Orange 2023-06-01 10:00:00 22s 12 5 AliasSkill 1 200 8 6 AliasEmpty Sheet Mode Target MODE_UNION_TYPE Task Generated:
hello_world.proto TaskConf.json `}).add({id:169,href:"/docs/excel/list/#horizontal-list",title:"List / Horizontal list ",description:"Excel list guide.",content:` NOTE: Each column name of horizontal list MUST have a digit suffix which started at 1.
Overview of horizontal list syntax:
List element type Syntax example scalar []uint32 enum []enum&lt;.FruitType&gt; struct [Item]uint32 predefined struct [.Item]uint32 incell struct []{uint32 ID, string Num}Item incell predefined struct []{.Item} `}).add({id:170,href:"/docs/excel/list/#horizontal-scalar-list",title:"List / Horizontal scalar list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID1 ID2 ID3 []uint32 uint32 uint32 ID1&rsquo;s value ID2&rsquo;s value ID3&rsquo;s value 1 2 3 Generated:
hello_world.proto ItemConf.json `}).add({id:171,href:"/docs/excel/list/#horizontal-enum-list",title:"List / Horizontal enum list ",description:"Excel list guide.",content:` FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param1 Param2 Param3 []enum&lt;.FruitType&gt; enum&lt;.FruitType&gt; enum&lt;.FruitType&gt; Param1&rsquo;s value Param2&rsquo;s value Param3&rsquo;s value 1 FRUIT_TYPE_ORANGE Banana Generated:
hello_world.proto ItemConf.json `}).add({id:172,href:"/docs/excel/list/#horizontal-struct-list",title:"List / Horizontal struct list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32 string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 2 Orange 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:173,href:"/docs/excel/list/#horizontal-predefined-struct-list",title:"List / Horizontal predefined-struct list ",description:"Excel list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Num Item2ID Item2Num Item3ID Item3Num [.Item]int32 int32 int32 int32 int32 int32 Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item3&rsquo;s num Item3&rsquo;s ID Item3&rsquo;s num 1 100 2 200 3 300 Generated:
hello_world.proto ItemConf.json `}).add({id:174,href:"/docs/excel/list/#horizontal-incell-struct-list",title:"List / Horizontal incell-struct list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1 Item2 Item3 []{int32 ID, string Name}Item Item Item Item1&rsquo;s info Item2&rsquo;s info Item3&rsquo;s info 1,Apple 2,Orange 3,Banana Generated:
hello_world.proto ItemConf.json `}).add({id:175,href:"/docs/excel/list/#horizontal-incell-predefined-struct-list",title:"List / Horizontal incell-predefined-struct list ",description:"Excel list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1 Reward2 Reward3 []{.Item} .Item .Item Item1&rsquo;s info Item2&rsquo;s info Item3&rsquo;s info 1,100 2,200 3,300 Generated:
hello_world.proto ItemConf.json `}).add({id:176,href:"/docs/excel/list/#vertical-list",title:"List / Vertical list ",description:"Excel list guide.",content:` Overview of vertical list syntax:
List element type Syntax example scalar []uint32 enum []enum&lt;.FruitType&gt; struct [Item]uint32 predefined struct [.Item]int32 incell struct []{int32 ID,int32 Num}Item incell predefined struct []{.Item} `}).add({id:177,href:"/docs/excel/list/#vertical-scalar-list",title:"List / Vertical scalar list ",description:"Excel list guide.",content:` It&rsquo;s defined same as Incell scalar list, but will aggregate multiple rows if provided.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []uint32 ID 1,2,3 1,2 1 Generated:
hello_world.proto ItemConf.json `}).add({id:178,href:"/docs/excel/list/#vertical-enum-list",title:"List / Vertical enum list ",description:"Excel list guide.",content:` It&rsquo;s defined same as Incell enum list, but will aggregate multiple rows if provided.
FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type []enum&lt;.FruitType&gt; Type Apple,Orange,Banana FRUIT_TYPE_APPLE,FRUIT_TYPE_ORANGE 1 Generated:
hello_world.proto ItemConf.json `}).add({id:179,href:"/docs/excel/list/#vertical-struct-list",title:"List / Vertical struct list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Desc [Item]uint32 string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. Generated:
hello_world.proto ItemConf.json `}).add({id:180,href:"/docs/excel/list/#vertical-predefined-struct-list",title:"List / Vertical predefined-struct list ",description:"Excel list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Num [.Item]int32 int32 Item&rsquo;s ID Item&rsquo;s num 1 100 2 200 3 300 Generated:
hello_world.proto ItemConf.json `}).add({id:181,href:"/docs/excel/list/#vertical-incell-struct-list",title:"List / Vertical incell-struct list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{int32 ID,int32 Num}Item Item list 1:100 2:200,3:300 Generated:
hello_world.proto ItemConf.json `}).add({id:182,href:"/docs/excel/list/#vertical-incell-predefined-struct-list",title:"List / Vertical incell-predefined-struct list ",description:"Excel list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{.Item} Item&rsquo;s info 1:100 2:200,3:300 Generated:
hello_world.proto ItemConf.json `}).add({id:183,href:"/docs/excel/list/#incell-list",title:"List / Incell list ",description:"Excel list guide.",content:` Overview of incell list syntax:
List element type Syntax example scalar []int32 enum []enum&lt;.FruitType&gt; incell struct []{int32 ID,int32 Num}Item incell predefined struct []{.Item} `}).add({id:184,href:"/docs/excel/list/#incell-scalar-list",title:"List / Incell scalar list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []int32 Param list 1,2,3 4,5 6 The Param column&rsquo;s type is incell list []int32, as the list element is scalar type int32.
Generated:
hello_world.proto ItemConf.json `}).add({id:185,href:"/docs/excel/list/#incell-enum-list",title:"List / Incell enum list ",description:"Excel list guide.",content:` FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []enum&lt;.FruitType&gt; Param list 1,FRUIT_TYPE_ORANGE,Banana The Param column&rsquo;s type is incell list []enum&lt;.FruitType&gt;, as the list element is the predefined enum type FruitType.
Generated:
hello_world.proto ItemConf.json `}).add({id:186,href:"/docs/excel/list/#incell-struct-list",title:"List / Incell struct list ",description:"Excel list guide.",content:` For more advanced incell data parsing, see Advanced predefined incell struct →.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{int32 ID,int32 Num}Item Item&rsquo;s info 1:100,2:200,3:300 Generated:
hello_world.proto ItemConf.json `}).add({id:187,href:"/docs/excel/list/#incell-predefined-struct-list",title:"List / Incell predefined-struct list ",description:"Excel list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item []{.Item} Item&rsquo;s info 1:100,2:200,3:300 Generated:
hello_world.proto ItemConf.json `}).add({id:188,href:"/docs/excel/list/#horizontal-list-size",title:"List / Horizontal list size ",description:"Excel list guide.",content:`
`}).add({id:189,href:"/docs/excel/list/#dynamic-size",title:"List / Dynamic size ",description:"Excel list guide.",content:` By default, all lists are Dynamically Sized Types. List elements should be present continuously, otherwise an error is reported if an empty element is existed in between.
`}).add({id:190,href:"/docs/excel/list/#fixed-size",title:"List / Fixed size ",description:"Excel list guide.",content:` Implicit fixed size # The list size is auto resolved by the max present list elements in name row.
In this example below, though the second element Item2 is empty, it is legal as the field property fixed is set true. Besides, Item2 will also be generated as an empty element. You can see it in the generated file ItemConf.json.
A worksheet ItemConf in HelloWorld.xlsx.
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32|{fixed:true} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana Generated:
hello_world.proto ItemConf.json Explicit fixed size # The list size is explicitly set by field property size.
In this example below, field property size is set as 2, then list elements after the second element Item2 will all be truncated. Besides, Item2 will also be generated as an empty element. You can see it in the generated file ItemConf.json.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name [Item]uint32|{size:2} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:191,href:"/docs/excel/list/#advanced-features",title:"List / Advanced features ",description:"Excel list guide.",content:`
`}).add({id:192,href:"/docs/excel/list/#horizontal-column-skipped-list",title:"List / Horizontal column-skipped list ",description:"Excel list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU D Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; [Prop]int32 int32 int32 int32 Item&rsquo;s ID Prop1’s ID Prop1’s name Prop1’s value Prop2’s ID Prop2’s name Prop2’s value 1 1 Apple 100 2 Orange 200 2 3 Banana 300 4 Pomelo 400 3 5 Watermelon 500 Generated:
hello_world.proto HeroConf.json `}).add({id:193,href:"/docs/excel/map/#horizontal-map",title:"Map / Horizontal map ",description:"Excel map guide.",content:` There are some kinds of horizontal map:
Horizontal scalar map, as map value type is scalar. E.g: map&lt;int32, int32&gt;. Horizontal struct map, as map value type is struct. E.g: map&lt;int32, Item&gt;. Horizontal predefined-struct map, as map value type is predefined struct. E.g: map&lt;int32, .Item&gt;. `}).add({id:194,href:"/docs/excel/map/#horizontal-scalar-map",title:"Map / Horizontal scalar map ",description:"Excel map guide.",content:` No need to support, use this instead: map&lt;int32, Item&gt;.
`}).add({id:195,href:"/docs/excel/map/#horizontal-struct-map",title:"Map / Horizontal struct map ",description:"Excel map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt; string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 2 Orange 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:196,href:"/docs/excel/map/#horizontal-predefined-struct-map",title:"Map / Horizontal predefined-struct map ",description:"Excel map guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Num Item2ID Item2Num Item3ID Item3Num map&lt;int32, .Item&gt; int32 int32 int32 int32 int32 Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item3&rsquo;s num Item3&rsquo;s ID Item3&rsquo;s num 1 100 2 200 3 300 Generated:
hello_world.proto ItemConf.json `}).add({id:197,href:"/docs/excel/map/#vertical-map",title:"Map / Vertical map ",description:"Excel map guide.",content:` There are some kinds of vertical map:
Vertical scalar map, as map value type is scalar. E.g: map&lt;int32, int32&gt;. Vertical struct map, as map value type is struct. E.g: map&lt;int32, Item&gt;. Vertical predefined-struct map, as map value type is predefined struct. E.g: map&lt;int32, .Item&gt;. `}).add({id:198,href:"/docs/excel/map/#vertical-scalar-map",title:"Map / Vertical scalar map ",description:"Excel map guide.",content:` No need to support, use map&lt;int32, Item&gt; instead.
`}).add({id:199,href:"/docs/excel/map/#vertical-struct-map",title:"Map / Vertical struct map ",description:"Excel map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Desc map&lt;uint32, Item&gt; string string Item’s ID Item’s name Item’s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. Generated:
hello_world.proto ItemConf.json `}).add({id:200,href:"/docs/excel/map/#vertical-predefined-struct-map",title:"Map / Vertical predefined-struct map ",description:"Excel map guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Num map&lt;int32, .Item&gt; int32 Item&rsquo;s ID Item&rsquo;s num 1 100 2 200 3 300 Generated:
hello_world.proto ItemConf.json `}).add({id:201,href:"/docs/excel/map/#incell-map",title:"Map / Incell map ",description:"Excel map guide.",content:` There are some kinds of in-cell map:
in-cell scalar map, as map value type is scalar. E.g: map&lt;int32, int32&gt;. in-cell struct map, as map value type is struct. E.g: map&lt;int32, Item&gt;. `}).add({id:202,href:"/docs/excel/map/#incell-scalar-map",title:"Map / Incell scalar map ",description:"Excel map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item map&lt;uint32, string&gt; Item key-value pairs 1:Apple,2:Orange,3:Banana,4,:Peach The Item column&rsquo;s type is in-cell map map&lt;uint32, string&gt;, as the map value is scalar type string.
⚠️ NOTE: If you want explicit pattern like: [Key:Value]..., then set the field property present as true. See Option present →.
Generated:
hello_world.proto ItemConf.json `}).add({id:203,href:"/docs/excel/map/#incell-enum-map",title:"Map / Incell enum map ",description:"Excel map guide.",content:` For incell map, both the key and value can be enum types.
For example, predefined enum types FruitType and FruitFlavor in common.proto are:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Fruit Flavor Item map&lt;enum&lt;.FruitType&gt;, int64&gt; map&lt;int64, enum&lt;.FruitFlavor&raquo; map&lt;enum&lt;.FruitType&gt;, enum&lt;.FruitFlavor&raquo; Fruits Flavors Items Apple:1,Orange:2 1:Fragrant,2:Sweet Apple:Fragrant,Orange:Sour Generated:
hello_world.proto ItemConf.json `}).add({id:204,href:"/docs/excel/map/#empty-key-map",title:"Map / Empty key map ",description:"Excel map guide.",content:` If map key is not configured, then it will be treated as default value of map key type. Default value is illustrated at Scalar types →.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s name 1 Apple Orange 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:205,href:"/docs/excel/map/#enum-key-map",title:"Map / Enum key map ",description:"Excel map guide.",content:` As the protobuf documents the restrictions of map key type:
&hellip; the key_type can be any integral or string type (so, any scalar type except for floating point types and bytes). Note that enum is not a valid key_type.
However, key type as enum is very useful in some situations. So we support it in a simple way:
enum type is treated as int32 as map key type， enum type is reserved in map value type (struct). For example, FruitType in common.proto is predefined as:
then map&lt;enum&lt;.FruitType&gt;, ValueType&gt; will be converted to map&lt;int32, ValueType&gt;, and FruitType is reserved in ValueType:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type Price map&lt;enum&lt;.FruitType&gt;, Item&gt; int32 Item&rsquo;s type Item&rsquo;s price Apple 100 Orange 200 Banana 300 Generated:
hello_world.proto ItemConf.json `}).add({id:206,href:"/docs/excel/map/#horizontal-map-size",title:"Map / Horizontal map size ",description:"Excel map guide.",content:`
`}).add({id:207,href:"/docs/excel/map/#dynamic-size",title:"Map / Dynamic size ",description:"Excel map guide.",content:` By default, all maps are Dynamically Sized Types. Map items should be present continuously, otherwise an error is reported if an empty item is existed in between.
`}).add({id:208,href:"/docs/excel/map/#fixed-size",title:"Map / Fixed size ",description:"Excel map guide.",content:` Implicit fixed size # The map size is auto resolved by the max map items present in name row.
In this example below, though the second map item Item2 is empty, it is legal as the field property fixed is set true. Besides, Item2 will also be generated as an empty map item. You can see it in the generated file ItemConf.json.
👉 If more than one empty map items are inserted into map, then only one empty map item is really generated. Because all the empty map items's keys are same. This is different from list, you should pay special attention to it. A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt;|{fixed:true} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana Generated:
hello_world.proto ItemConf.json Explicit fixed size # The map size is explicitly set by field property size.
In this example below, field property size is set as 2, then map items after the second item Item2 will all be truncated. Besides, Item2 will also be generated as an empty map item. You can see it in the generated file ItemConf.json.
👉 If more than one empty map items are inserted into map, then only one empty map item is really generated. Because all the empty map items's keys are same. This is different from list, you should pay special attention to it. A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Item1ID Item1Name Item2ID Item2Name Item3ID Item3Name map&lt;uint32, Item&gt;|{size:2} string uint32 string uint32 string Item1&rsquo;s ID Item1&rsquo;s name Item2&rsquo;s ID Item2&rsquo;s name Item3&rsquo;s ID Item3&rsquo;s name 1 Apple 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:209,href:"/docs/excel/map/#advanced-features",title:"Map / Advanced features ",description:"Excel map guide.",content:`
`}).add({id:210,href:"/docs/excel/map/#horizontal-column-skipped-map",title:"Map / Horizontal column-skipped map ",description:"Excel map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU D Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; map&lt;int32, Prop&gt; int32 int32 int32 Item&rsquo;s ID Prop1’s ID Prop1’s name Prop1’s value Prop2’s ID Prop2’s name Prop2’s value 1 1 Apple 100 2 Orange 200 2 3 Banana 300 4 Pomelo 400 3 5 Watermelon 500 Generated:
hello_world.proto HeroConf.json `}).add({id:211,href:"/docs/excel/map/#ordered-map",title:"Map / Ordered-map ",description:"Excel map guide.",content:` In the metasheet @TABLEAU, set the OrderedMap option to true, then ordered map accessers will be generated. This feature is powered by tableauio/loader. Currently supported programming languages are:
C++ Go C# JS/TS Example # If we want ItemConf to generate ordered map accessers, then set OrderedMap option to true of metasheet @TABLEAU:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s Name 1 Apple 2 Orange 3 Banana Sheet OrderedMap ItemConf true More useful options are illustrated at metasheet chapter. Metasheet @TABLEAU →
`}).add({id:212,href:"/docs/excel/keyedlist/#syntax",title:"KeyedList / Syntax ",description:"Excel keyed list guide.",content:` Keyed list is same as normal list, except that ColumnType (first field type) is surrounded by angle brackets &lt;&gt;, and is treated as map key.
Syntax: [ElemType]&lt;ColumnType&gt;
`}).add({id:213,href:"/docs/excel/keyedlist/#horizontal-list",title:"KeyedList / Horizontal list ",description:"Excel keyed list guide.",content:` TODO&hellip;
`}).add({id:214,href:"/docs/excel/keyedlist/#vertical-keyedlist",title:"KeyedList / Vertical KeyedList ",description:"Excel keyed list guide.",content:`
`}).add({id:215,href:"/docs/excel/keyedlist/#vertical-scalar-keyedlist",title:"KeyedList / Vertical scalar KeyedList ",description:"Excel keyed list guide.",content:` It&rsquo;s defined same as Incell scalar KeyedList, but will aggregate multiple rows if provided.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []&lt;uint32&gt; ID 1,2,3 4,5 6 Generated:
hello_world.proto ItemConf.json `}).add({id:216,href:"/docs/excel/keyedlist/#vertical-enum-keyedlist",title:"KeyedList / Vertical enum KeyedList ",description:"Excel keyed list guide.",content:` It&rsquo;s defined same as Incell enum keyedList, but will aggregate multiple rows if provided.
FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Type []&lt;enum&lt;.FruitType&gt;&gt; Type Apple,Orange FRUIT_TYPE_BANANA 0 Generated:
hello_world.proto ItemConf.json `}).add({id:217,href:"/docs/excel/keyedlist/#vertical-struct-keyedlist",title:"KeyedList / Vertical struct KeyedList ",description:"Excel keyed list guide.",content:` For example, a worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID PropID PropName [Item]&lt;uint32&gt; map&lt;int32, Prop&gt; string Item&rsquo;s ID Prop&rsquo;s ID Prop&rsquo;s name 1 1 sweet 2 1 sweet 2 2 delicious Generated:
hello_world.proto ItemConf.json `}).add({id:218,href:"/docs/excel/keyedlist/#incell-keyedlist",title:"KeyedList / Incell KeyedList ",description:"Excel keyed list guide.",content:`
`}).add({id:219,href:"/docs/excel/keyedlist/#incell-scalar-keyedlist",title:"KeyedList / Incell scalar KeyedList ",description:"Excel keyed list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID []&lt;uint32&gt; ID list 1,2,3 Generated:
hello_world.proto ItemConf.json `}).add({id:220,href:"/docs/excel/keyedlist/#incell-enum-keyedlist",title:"KeyedList / Incell enum KeyedList ",description:"Excel keyed list guide.",content:` FruitType in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Param []enum&lt;.FruitType&gt; Param list 1,FRUIT_TYPE_ORANGE,Banana The Param column&rsquo;s type is incell list []enum&lt;.FruitType&gt;, as the list element is the predefined enum type FruitType.
Generated:
hello_world.proto ItemConf.json `}).add({id:221,href:"/docs/excel/wellknown-types/#datetime",title:"Wellknown types / Datetime ",description:"Wellknown guide.",content:`
`}).add({id:222,href:"/docs/excel/wellknown-types/#datetime-1",title:"Wellknown types / Datetime ",description:"Wellknown guide.",content:` See Basics: Datetime →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginDatetime EndDatetime Datetime datetime datetime []datetime Begin datetime End datetime Datetime 2020-01-01 10:25:00 2022-10-10 05:10:00 2020-01-01 10:25:00,2022-10-10 05:10:00 Generated:
hello_world.proto ItemConf.json `}).add({id:223,href:"/docs/excel/wellknown-types/#date",title:"Wellknown types / Date ",description:"Wellknown guide.",content:` See Basics: Datetime →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginDate EndDate Date date date []date Begin date End date Date 2020-01-01 20221010 2020-01-01,20221010 Generated:
hello_world.proto ItemConf.json `}).add({id:224,href:"/docs/excel/wellknown-types/#time",title:"Wellknown types / Time ",description:"Wellknown guide.",content:` See Basics: Datetime →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU BeginTime EndTime Time time time []time Begin time End time Time 10:25:00 1125 10:25:00,1125 Generated:
hello_world.proto ItemConf.json `}).add({id:225,href:"/docs/excel/wellknown-types/#duration",title:"Wellknown types / Duration ",description:"Wellknown guide.",content:` See Basics: Duration →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Duration1 Duration2 Duration duration duration []duration Duration 1 Duration 2 Duration 1h2m3s 4ms5us6ns 1h2m3s,4ms5us6ns Generated:
hello_world.proto ItemConf.json `}).add({id:226,href:"/docs/excel/wellknown-types/#fraction",title:"Wellknown types / Fraction ",description:"Wellknown guide.",content:` See Basics: Fraction →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU MinRatio Ratio1 Ratio2 Ratio3 Ratio4 Ratio5 fraction []fraction fraction fraction fraction fraction min ratio ratio1 ratio 2 ratio 3 ratio 4 ratio 5 1/4 10% 10‰ 10‱ 10 0.01 Generated:
hello_world.proto ItemConf.json `}).add({id:227,href:"/docs/excel/wellknown-types/#comparator",title:"Wellknown types / Comparator ",description:"Wellknown guide.",content:` See Basics: Comparator →
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU MinRatio Ratio1 Ratio2 Ratio3 Ratio4 Ratio5 comparator []comparator comparator comparator comparator comparator min ratio ratio1 ratio 2 ratio 3 ratio 4 ratio 5 !=1/4 &lt;10% &lt;=10‰ &gt;10‱ &gt;=10 ==3/5 Generated:
hello_world.proto ItemConf.json `}).add({id:228,href:"/docs/excel/wellknown-types/#version",title:"Wellknown types / Version ",description:"Wellknown guide.",content:` See Basics: Version →
Default pattern is: 255.255.255.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Version CustomVersion IncellVersion HorizontalVersion1 HorizontalVersion2 HorizontalVersion3 version version|{pattern:&ldquo;99.999.99.999.99.999&rdquo;} []version|{pattern:&ldquo;999.999.999&rdquo;} []version|{pattern:&ldquo;999.999.999&rdquo;} version version default version custom version incell version horizontal version1 horizontal version2 horizontal version3 1.0.3 1.2.3.4.5.6 1.2.3,4.5.6 1.0.0 1.2.3 2.0.3 Generated:
hello_world.proto ItemConf.json `}).add({id:229,href:"/docs/excel/struct-in-struct/#struct-in-struct",title:"Struct in struct / Struct in struct ",description:"Excel struct in struct guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItemID RewardItemNum {Reward}int32 {Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s num 1 1 10 Generated:
hello_world.proto ItemConf.json `}).add({id:230,href:"/docs/excel/struct-in-struct/#predefined-struct-in-struct",title:"Struct in struct / Predefined-struct in struct ",description:"Excel struct in struct guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItemID RewardItemNum {Reward}int32 {.Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s num 1 1 10 Generated:
hello_world.proto ItemConf.json `}).add({id:231,href:"/docs/excel/struct-in-struct/#incell-struct-in-struct",title:"Struct in struct / Incell-struct in struct ",description:"Excel struct in struct guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU RewardID RewardItem {Reward}int32 {int32 ID, int32 Num}Item Reward&rsquo;s ID Reward&rsquo;s item 1 1,100 2,200 Generated:
hello_world.proto ItemConf.json `}).add({id:232,href:"/docs/excel/struct-in-list/#nested-in-vertical-list",title:"Struct in list / Nested in vertical-list ",description:"Excel struct in list guide.",content:`
`}).add({id:233,href:"/docs/excel/struct-in-list/#struct-in-vertical-list",title:"Struct in list / Struct in vertical-list ",description:"Excel struct in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]uint32 string {Prop}int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 2 20 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:234,href:"/docs/excel/struct-in-list/#incell-struct-in-vertical-list",title:"Struct in list / Incell-struct in vertical-list ",description:"Excel struct in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID [Item]uint32 string {int32 ID,int64 Value}Prop Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID 1 Apple 1,100 2 Orange 2,200 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:235,href:"/docs/excel/struct-in-list/#first-field-in-horizontal-list",title:"Struct in list / First-field in horizontal-list ",description:"Excel struct in list guide.",content:`
`}).add({id:236,href:"/docs/excel/struct-in-list/#struct-in-horizontal-list",title:"Struct in list / Struct in horizontal-list ",description:"Excel struct in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ItemID Reward1ItemNum Reward1Name Reward2ItemID Reward2ItemNum Reward2Name [Reward]{Item}int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:237,href:"/docs/excel/struct-in-list/#predefined-struct-in-horizontal-list",title:"Struct in list / Predefined-struct in horizontal-list ",description:"Excel struct in list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ItemID Reward1ItemNum Reward1Name Reward2ItemID Reward2ItemNum Reward2Name [Reward]{.Item}int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:238,href:"/docs/excel/struct-in-list/#incell-struct-in-horizontal-list",title:"Struct in list / Incell-struct in horizontal-list ",description:"Excel struct in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item Reward1Name Reward2Item Reward2Name [Reward]{int32 ID, int32 Num}Item string Item string Reward1&rsquo;s item Reward&rsquo;s name Reward2&rsquo;s item Reward&rsquo;s name 1,10 Lotto 2,20 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:239,href:"/docs/excel/struct-in-map/#nested-in-vertical-map",title:"Struct in map / Nested in vertical-map ",description:"Excel struct in map guide.",content:`
`}).add({id:240,href:"/docs/excel/struct-in-map/#struct-in-vertical-map",title:"Struct in map / Struct in vertical-map ",description:"Excel struct in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID ItemID ItemNum map&lt;int32, Reward&gt; {Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s Num 1 1 10 2 2 20 3 Generated:
hello_world.proto ItemConf.json `}).add({id:241,href:"/docs/excel/struct-in-map/#predefined-struct-in-vertical-map",title:"Struct in map / Predefined-struct in vertical-map ",description:"Excel struct in map guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID ItemID ItemNum map&lt;int32, Reward&gt; {.Item}int32 int32 Reward&rsquo;s ID Item&rsquo;s ID Item&rsquo;s Num 1 1 10 2 2 20 3 Generated:
hello_world.proto ItemConf.json `}).add({id:242,href:"/docs/excel/struct-in-map/#incell-struct-in-vertical-map",title:"Struct in map / Incell-struct in vertical-map ",description:"Excel struct in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Item map&lt;int32, Reward&gt; {int32 ID, int32 Num}Item Reward&rsquo;s ID Item&rsquo;s info 1 1,100 2 2,200 3 Generated:
hello_world.proto ItemConf.json `}).add({id:243,href:"/docs/excel/list-in-list/#nested-in-vertical-list",title:"List in list / Nested in vertical-list ",description:"Excel list in list guide.",content:`
`}).add({id:244,href:"/docs/excel/list-in-list/#horizontal-list-in-vertical-list",title:"List in list / Horizontal-list in vertical-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value [Item]uint32 string [Prop]int32 int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:245,href:"/docs/excel/list-in-list/#vertical-list-in-vertical-keyed-list",title:"List in list / Vertical-list in vertical-keyed-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]&lt;uint32&gt; string [Prop]int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 Generated:
hello_world.proto ItemConf.json `}).add({id:246,href:"/docs/excel/list-in-list/#vertical-keyed-list-in-vertical-keyed-list",title:"List in list / Vertical-keyed-list in vertical-keyed-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc PropID PropNum [KeyedItem]&lt;uint32&gt; string [Prop]&lt;uint32&gt; int32 Item&rsquo;s ID Item&rsquo;s desc Prop&rsquo;s ID Prop&rsquo;s num 1 Apple 10 100 1 Banana 11 110 2 Orange 20 200 Generated:
hello_world.proto ItemConf.json `}).add({id:247,href:"/docs/excel/list-in-list/#incell-list-in-vertical-keyed-list",title:"List in list / Incell-list in vertical-keyed-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop [Item]uint32 []int32 Item&rsquo;s ID Item&rsquo;s props 1 10,20,30 2 10,20 3 10 Generated:
hello_world.proto ItemConf.json `}).add({id:248,href:"/docs/excel/list-in-list/#incell-keyed-list-in-vertical-keyed-list",title:"List in list / Incell-keyed-list in vertical-keyed-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Desc Tip [KeyedItem]&lt;uint32&gt;|{unique:false} string []&lt;uint32&gt; Item&rsquo;s ID Item&rsquo;s desc Item&rsquo;s tip 1 Apple 1,2,3 1 Banana 4,5 2 Orange 1,2 We want the parent struct keyed-list to aggreate incell keyed-list, so need to set the field property unique to false.
Generated:
hello_world.proto ItemConf.json `}).add({id:249,href:"/docs/excel/list-in-list/#nested-in-horizontal-list",title:"List in list / Nested in horizontal-list ",description:"Excel list in list guide.",content:`
`}).add({id:250,href:"/docs/excel/list-in-list/#horizontal-list-in-horizontal-list",title:"List in list / Horizontal-list in horizontal-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward][Item]int32 int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:251,href:"/docs/excel/list-in-list/#predefined-struct-list-in-horizontal-list",title:"List in list / Predefined-struct-list in horizontal-list ",description:"Excel list in list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward][.Item]int32 int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:252,href:"/docs/excel/list-in-list/#incell-list-in-horizontal-list",title:"List in list / Incell-list in horizontal-list ",description:"Excel list in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Task1Param Task2Param Task3Param [Task][]int32 []int32 []int32 Task1 Task2 Task3 1,2 3,4 5,6,7 Generated:
hello_world.proto ItemConf.json `}).add({id:253,href:"/docs/excel/list-in-map/#nested-in-vertical-map",title:"List in map / Nested in vertical-map ",description:"Excel list in map guide.",content:`
`}).add({id:254,href:"/docs/excel/list-in-map/#horizontal-list-in-vertical-map",title:"List in map / Horizontal-list in vertical-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; string [Prop]int32 int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:255,href:"/docs/excel/list-in-map/#vertical-list-in-vertical-map",title:"List in map / Vertical-list in vertical-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue map&lt;uint32, Item&gt; string [Prop]int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 Generated:
hello_world.proto ItemConf.json `}).add({id:256,href:"/docs/excel/list-in-map/#incell-list-in-vertical-map",title:"List in map / Incell-list in vertical-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Prop map&lt;uint32, Item&gt; []int32 Item&rsquo;s ID Item&rsquo;s props 1 10,20,30 2 10,20 3 10 Generated:
hello_world.proto ItemConf.json `}).add({id:257,href:"/docs/excel/list-in-map/#incell-struct-list-in-vertical-map",title:"List in map / Incell-struct-list in vertical-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Item map&lt;uint32, Reward&gt; []{uint32 ID,int32 Num}Item Reward&rsquo;s ID Reward&rsquo;s items 1 1001:10,1002:20,1003:30 2 2001:10,2002:20 Generated:
hello_world.proto ItemConf.json `}).add({id:258,href:"/docs/excel/list-in-map/#nested-in-horizontal-map",title:"List in map / Nested in horizontal-map ",description:"Excel list in map guide.",content:`
`}).add({id:259,href:"/docs/excel/list-in-map/#horizontal-list-in-horizontal-map",title:"List in map / Horizontal-list in horizontal-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward2ID Reward2Item1ID Reward2Item1Num map&lt;uint32, Reward&gt; [Item]uint32 int32 uint32 int32 uint32 uint32 int32 Reward1 ID Reward1 item1 ID Reward1 item1 num Reward1 item2 ID Reward1 item2 num Reward2 ID Reward2 item1 ID Reward2 item1 num 1 1 10 2 20 2 3 30 Generated:
hello_world.proto ItemConf.json `}).add({id:260,href:"/docs/excel/list-in-map/#incell-list-in-horizontal-map",title:"List in map / Incell-list in horizontal-map ",description:"Excel list in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item Reward2ID Reward2Item map&lt;uint32, Reward&gt; []{uint32 ID,int32 Num}Item uint32 []Item Reward1 ID Reward1 items Reward2 ID Reward2 items 1 1:10,2:20 2 3:30 For predefined struct list, you can use []{.Item} instead of []{uint32 ID,int32 Num}Item.
Generated:
hello_world.proto ItemConf.json `}).add({id:261,href:"/docs/excel/map-in-list/#nested-in-vertical-list",title:"Map in list / Nested in vertical-list ",description:"Excel map in list guide.",content:`
`}).add({id:262,href:"/docs/excel/map-in-list/#horizontal-map-in-vertical-list",title:"Map in list / Horizontal-map in vertical-list ",description:"Excel map in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value [Item]uint32 string map&lt;int32, Prop&gt; int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:263,href:"/docs/excel/map-in-list/#vertical-map-in-vertical-keyed-list",title:"Map in list / Vertical-map in vertical-keyed-list ",description:"Excel map in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue [Item]&lt;uint32&gt; string map&lt;int32, Prop&gt; int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Banana 2 30 Generated:
hello_world.proto ItemConf.json `}).add({id:264,href:"/docs/excel/map-in-list/#incell-map-in-vertical-list",title:"Map in list / Incell-map in vertical-list ",description:"Excel map in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Props [Item]uint32 map&lt;int32, string&gt; Item&rsquo;s ID Item&rsquo;s props 1 1:sour,2:sweet,3:delicious 2 1:sour,2:sweet 3 1:sour Generated:
hello_world.proto ItemConf.json `}).add({id:265,href:"/docs/excel/map-in-list/#first-field-in-horizontal-list",title:"Map in list / First-field in horizontal-list ",description:"Excel map in list guide.",content:`
`}).add({id:266,href:"/docs/excel/map-in-list/#horizontal-map-in-horizontal-list",title:"Map in list / Horizontal-map in horizontal-list ",description:"Excel map in list guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward]map&lt;int32, Item&gt; int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:267,href:"/docs/excel/map-in-list/#predefined-struct-map-in-horizontal-list",title:"Map in list / Predefined-struct-map in horizontal-list ",description:"Excel map in list guide.",content:` Item in common.proto is predefined as:
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward1Name Reward2Item1ID Reward2Item1Num Reward2Name [Reward]map&lt;int32, .Item&gt; int32 int32 int32 string int32 int32 string Item1&rsquo;s ID Item1&rsquo;s num Item2&rsquo;s ID Item2&rsquo;s num Reward&rsquo;s name Item1&rsquo;s ID Item1&rsquo;s num Reward&rsquo;s name 1 10 2 20 Lotto 10 100 Super Lotto Generated:
hello_world.proto ItemConf.json `}).add({id:268,href:"/docs/excel/map-in-map/#nested-in-vertical-map",title:"Map in map / Nested in vertical-map ",description:"Excel map in map guide.",content:`
`}).add({id:269,href:"/docs/excel/map-in-map/#horizontal-map-in-vertical-map",title:"Map in map / Horizontal-map in vertical-map ",description:"Excel map in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name Prop1ID Prop1Value Prop2ID Prop2Value map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 int32 int64 Item&rsquo;s ID Item&rsquo;s name Prop1&rsquo;s ID Prop1&rsquo;s value Prop2&rsquo;s ID Prop2&rsquo;s value 1 Apple 1 10 2 20 2 Orange 3 30 3 Banana Generated:
hello_world.proto ItemConf.json `}).add({id:270,href:"/docs/excel/map-in-map/#vertical-map-in-vertical-map",title:"Map in map / Vertical-map in vertical-map ",description:"Excel map in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Name PropID PropValue map&lt;uint32, Item&gt; string map&lt;int32, Prop&gt; int64 Item&rsquo;s ID Item&rsquo;s name Prop&rsquo;s ID Prop&rsquo;s value 1 Apple 1 10 2 Orange 1 20 2 Orange 2 30 Generated:
hello_world.proto ItemConf.json `}).add({id:271,href:"/docs/excel/map-in-map/#incell-map-in-vertical-map",title:"Map in map / Incell-map in vertical-map ",description:"Excel map in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Props map&lt;uint32, Item&gt; map&lt;int32, string&gt; Item&rsquo;s ID Item&rsquo;s props 1 1:sour,2:sweet,3:delicious 2 1:sour,2:sweet 3 1:sour Generated:
hello_world.proto ItemConf.json `}).add({id:272,href:"/docs/excel/map-in-map/#nested-in-horizontal-map",title:"Map in map / Nested in horizontal-map ",description:"Excel map in map guide.",content:`
`}).add({id:273,href:"/docs/excel/map-in-map/#horizontal-map-in-horizontal-map",title:"Map in map / Horizontal-map in horizontal-map ",description:"Excel map in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item1ID Reward1Item1Num Reward1Item2ID Reward1Item2Num Reward2ID Reward2Item1ID Reward2Item1Num map&lt;uint32, Reward&gt; map&lt;uint32, Item&gt; int32 uint32 int32 uint32 uint32 int32 Reward1 ID Reward1 item1 ID Reward1 item1 num Reward1 item2 ID Reward1 item2 num Reward2 ID Reward2 item1 ID Reward2 item1 num 1 1 10 2 20 2 3 30 Generated:
hello_world.proto ItemConf.json `}).add({id:274,href:"/docs/excel/map-in-map/#incell-map-in-horizontal-map",title:"Map in map / Incell-map in horizontal-map ",description:"Excel map in map guide.",content:` A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU Reward1ID Reward1Item Reward2ID Reward2Item map&lt;uint32, Reward&gt; map&lt;uint32, int32&gt; uint32 map&lt;uint32, int32&gt; Reward1 ID Reward1 items Reward2 ID Reward2 items 1 1:10,2:20 2 3:30 Generated:
hello_world.proto ItemConf.json `}).add({id:275,href:"/docs/excel/infinite-nesting/#overview",title:"Infinite nesting / Overview ",description:"Excel infinite nesting guide.",content:` Now, the horizontal/vertical list element&rsquo;s first field can be any type, even as struct, list, and map.
List element&rsquo;s first field is struct: [Reward]{Icon}int32 List element&rsquo;s first field is predefined struct: [Cost]{.Item}uint32 List element&rsquo;s first field is in-cell struct: [Magic]{int32 Id, int32 Num}Ability List element&rsquo;s first field is list: [Reward][Item]uint32 List element&rsquo;s first field is list with element as predefined struct: [Power][.Item]uint32 List element&rsquo;s first field is map: [Superpower]map&lt;uint32, Ability&gt; TODO: some clear examples.
`}).add({id:276,href:"/docs/excel/infinite-nesting/#nested-naming",title:"Infinite nesting / Nested naming ",description:"Excel infinite nesting guide.",content:` Predefined types in &ldquo;common.proto&rdquo;:
HelloWorld.xlsx&nbsp; LoaderConf @TABLEAU ServerType ServerConfType ServerConfConditionType ServerConfConditionValue map&lt;enum&lt;.ServerType&gt;, Server&gt; [Conf]&lt;enum&lt;.ConfType&raquo; [Condition] int32 Server name Sheet name Condition type Condition value SERVER_TYPE_GAME CONF_TYPE_CLOUD 0 113 0 134 SERVER_TYPE_ACTIVITY CONF_TYPE_CLOUD 1 CONF_TYPE_LOCAL 9 34 CONF_TYPE_LOCAL 9 12 CONF_TYPE_LOCAL Remote MatchServer CONF_TYPE_UNKNOWN Sheet Nested LoaderConf true Generated:
hello_world.proto loader_conf.json `}).add({id:277,href:"/docs/excel/field-property/#overview",title:"Field property / Overview ",description:"Tableau field property guide.",content:` Option Type Description unique bool Check field uniqueness. Default: false. Specially for map (or KeyedList) key, default will be auto deduced. range string Format: &quot;left,right&quot;. E.g.: &quot;1,10&quot;, &quot;1,~&quot;, &quot;~,10&quot;. Different interpretations of range: - number: value range. - string: count of utf-8 code point. refer string Format: &quot;SheetName(SheetAlias).ColumnName&quot;.
Ensure this field is in another sheet&rsquo;s column value space. Multiple refers are comma-separated. sequence int64 Ensure this field&rsquo;s value is a sequence and begins with this value. default string Use this default value if cell is empty. fixed bool Auto-detected fixed size of horizontal list/map. Default: false. size uint32 Specify fixed size of horizontal list/map. form Form Specify cell data form of incell struct.
- FORM_TEXT
- FORM_JSON json_name string Specify field&rsquo;s custom JSON name instead of lowerCamelCase name of proto field name. present bool Must fill cell data explicitly if present is true. Default: false. optional bool Whether this field is optional (field name existence). patch Patch Field patch type. - PATCH_REPLACE - PATCH_MERGE sep string Field-level separator. subsep string Field-level subseparator. cross int32 Specify count of crossed nodes/cells/fields of composite types with cardinality, such as list and map. pattern string Specify the pattern of scalar, list element, and map value. `}).add({id:278,href:"/docs/excel/field-property/#option-unique",title:"Field property / Option unique ",description:"Tableau field property guide.",content:` Option unique can be specified as true or false in the field property. It can check the uniqueness of any scalar field in list/map element.
If you set unique to true explicitly, tableau will report an error if a duplicate key appears. If you set unique to false explicitly, no check will be performed. `}).add({id:279,href:"/docs/excel/field-property/#map-or-keyedlist-key",title:"Field property / Map (or KeyedList) key ",description:"Tableau field property guide.",content:` Tableau will auto deduce the map (or KeyedList) key&rsquo;s unique as true or not.
The rule is: if a map&rsquo;s value type (or KeyedList element type) has no sub map/list field of the same layout (vertical/horizontal), then the key must be unique.
So in most cases, it&rsquo;s not neccessary to config it explicitly.
`}).add({id:280,href:"/docs/excel/field-property/#general-scalar-field",title:"Field property / General scalar field ",description:"Tableau field property guide.",content:` If you specify a general scalar field&rsquo;s property unique as true, then tableau will check the field&rsquo;s uniquness in map or list.
`}).add({id:281,href:"/docs/excel/field-property/#option-range",title:"Field property / Option range ",description:"Tableau field property guide.",content:" ⚠️️ This check option will not be applied if cell data is empty (not present). So if you still want to check even if cell data is empty, please set option `present` to true. Option range can be specified as format: &quot;left,right&quot; (left and right are both inclusive).\nDifferent interpretations of range:\nnumber: value range, e.g.: &quot;1,10&quot;, &quot;1,~&quot;, &quot;~,10&quot;. string: count of utf-8 code point. list: length of list. map: length of map. "}).add({id:282,href:"/docs/excel/field-property/#option-refer",title:"Field property / Option refer ",description:"Tableau field property guide.",content:` Option refer is some like the FOREIGN KEY constraint in SQL to prevent actions that would destroy links between tables. However, tableau refer can refer to any sheet&rsquo;s column even if it is not map key column, and multiple refers (comma-separated) are also supported. It is used to ensure this field is at least in one of the other sheets&rsquo; column value space (aka message&rsquo;s field value space).
Format: &quot;SheetName(SheetAlias).ColumnName[,SheetName(SheetAlias).ColumnName]...&quot;.
For example:
map&lt;uint32, Reward&gt;|{refer:&quot;ItemConf.ID&quot;}: single-refer without alias, so sheet name is just the generated protobuf message name. map&lt;uint32, Reward&gt;|{refer:&quot;ItemConf.ID,EquipConf.ID&quot;}: multi-refer without alias, then sheet alias is the generated protobuf message name. map&lt;uint32, Reward&gt;|{refer:&quot;Sheet1(ItemConf).ID&quot;}: single-refer with alias, then sheet alias is the generated protobuf message name. `}).add({id:283,href:"/docs/excel/field-property/#option-sequence",title:"Field property / Option sequence ",description:"Tableau field property guide.",content:` Option sequence is used to ensure this field’s value is a sequence and begins with this value. It can be used for any fields even in nested list/map.
For example:
map&lt;uint32, Item&gt;|{sequence:1}: this map key must follow the sequence rule which begins with value 1. int32|{sequence:1}: the parent list/map elements must follow the sequence rule which begins with value 1. `}).add({id:284,href:"/docs/excel/field-property/#option-default",title:"Field property / Option default ",description:"Tableau field property guide.",content:` If option default is set, then use it as default value if cell is empty.
`}).add({id:285,href:"/docs/excel/field-property/#option-fixed",title:"Field property / Option fixed ",description:"Tableau field property guide.",content:` If option fixed is set as true, then auto-detect fixed size of horizontal list/map.
For example:
List: implicit fixed size → Map: implicit fixed size → `}).add({id:286,href:"/docs/excel/field-property/#option-size",title:"Field property / Option size ",description:"Tableau field property guide.",content:` Option size is used to specify fixed size of horizontal list/map.
For example:
List: explicit fixed size → Map: explicit fixed size → `}).add({id:287,href:"/docs/excel/field-property/#option-form",title:"Field property / Option form ",description:"Tableau field property guide.",content:` Option form is used to specify cell data form of incell struct.
Two kinds of form can be specified:
FORM_TEXT: protobuf text format. FORM_JSON: protobuf JSON format. For detailed demos, see Advanced predefined incell struct →.
`}).add({id:288,href:"/docs/excel/field-property/#option-json_name",title:"Field property / Option json_name ",description:"Tableau field property guide.",content:` By default, JSON name is deduced from the field&rsquo;s proto name by converting it to camelCase. Now you can explicitly specify it by json_name prop option.
For example, a worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; ItemConf @TABLEAU ID Rarity_1 SpecialEffect_2 map&lt;int32, Item&gt; int32|{json_name:&ldquo;rarity_1&rdquo;} int32|{json_name:&ldquo;specialEffect_2&rdquo;} Item&rsquo;s ID Item&rsquo;s rarity. Item&rsquo;s special effect. 1 10 101 2 20 102 3 30 103 `}).add({id:289,href:"/docs/excel/field-property/#option-present",title:"Field property / Option present ",description:"Tableau field property guide.",content:` If option present is set as true, then cell data cannot be empty and must be filled explicitly. Otherwise an error will be reported.
`}).add({id:290,href:"/docs/excel/field-property/#option-optional",title:"Field property / Option optional ",description:"Tableau field property guide.",content:` Specify whether this field is optional (field name existence).
If set to true, then:
table formats (Excel/CSV): field&rsquo;s column can be absent. document formats (XML/YAML): field&rsquo;s name can be absent. `}).add({id:291,href:"/docs/excel/field-property/#option-patch",title:"Field property / Option patch ",description:"Tableau field property guide.",content:` See field-level patch in Option Patch →.
`}).add({id:292,href:"/docs/excel/field-property/#option-sep",title:"Field property / Option sep ",description:"Tableau field property guide.",content:` Field-level separator for separating:
incell list elements (scalar or struct). incell map items. If not set, it will use sheet-level seq in metasheet.
`}).add({id:293,href:"/docs/excel/field-property/#option-subsep",title:"Field property / Option subsep ",description:"Tableau field property guide.",content:` Field-level subseparator for separating:
key-value pair of each incell map item. struct fields of each incell struct list element. If not set, it will use sheet-level subseq in metasheet.
`}).add({id:294,href:"/docs/excel/field-property/#option-cross",title:"Field property / Option cross ",description:"Tableau field property guide.",content:` Specify count of crossed nodes/cells/fields of composite types with cardinality, such as list and map.
`}).add({id:295,href:"/docs/excel/field-property/#union-list-field",title:"Field property / union list field ",description:"Tableau field property guide.",content:` TODO: example illustrated.
Specify the count of union fields the list will cross and occupy (one list element for each field). It will also change this list field&rsquo;s layout from incell to horizontal.
Value 0 means it is an incell list. Value &gt; 0 means it is a horizontal list occupying N fields. Value &lt; 0 means it is a horizontal list occupying all following fields. `}).add({id:296,href:"/docs/excel/field-property/#option-pattern",title:"Field property / Option pattern ",description:"Tableau field property guide.",content:` Specify the pattern of scalar field, list element, and map value.
`}).add({id:297,href:"/docs/excel/field-property/#wellknown-version-field",title:"Field property / Wellknown version field ",description:"Tableau field property guide.",content:` For use cases, see Wellknown types: Version →
Specify the dotted-decimal pattern of current cell. Each decimal number ranges from 0 to the corresponding part (MAX) of pattern.
Default pattern: 255.255.255.
`}).add({id:298,href:"/docs/excel/metasheet/#overview",title:"Metasheet / Overview ",description:"Excel metasheet @TABLEAU guide.",content:` Options below can be specified in the metasheet @TABLEAU to affect the corresponding worksheet&rsquo;s layout, ability, loader and so on.
Option Type Description Sheet string The worksheet name to be processed. Specially, # refers to the workbook name, so you can set workbook&rsquo;s Alias. Alias string For worksheet, alias is used as proto message name. For workbook #, alias is used as proto file name (without file extension). Namerow int32 Exact row number of column name definition at a worksheet.
Default: 1. Typerow int32 Exact row number of column type definition at a worksheet.
Default: 2. Noterow int32 Exact row number of column note definition at a worksheet.
Default: 3. Datarow int32 Start row number of data at a worksheet.
Default: 4. Nameline int32 The line number of column name definition in a cell. 0 means the whole cell.
Default: 0. Typeline int32 The line number of column type definition in a cell. 0 means the whole cell.
Default: 0. Transpose bool Interchanging the rows and columns of a given sheet. Nested bool Nested naming of the namerow.
Default: false. Sep string Sheet-level separator. Subsep string Sheet-level subseparator. Merger []string Merge multiple sheets (comma-separated) into one with the same structure. Each element can be:
- just a workbook file path or glob path (relative to this workbook): &lt;Workbook&gt;, then the sheet name is the same as this sheet.
- a workbook file path (relative to this workbook) with a worksheet name: &lt;Workbook&gt;#&lt;Worksheet&gt;. AdjacentKey bool Merge adjacent rows with the same key. If the key cell is not set, it will be treated the same as the nearest key above the same column.
Default:false. FieldPresence bool In order to track field presence of basic types (numeric, string, bytes, and enums), the generated field will be labeled optional.
Default:false. Mode Mode Sheet mode. Available modes: - MODE_ENUM_TYPE - MODE_ENUM_TYPE_MULTI - MODE_STRUCT_TYPE - MODE_STRUCT_TYPE_MULTI - MODE_UNION_TYPE
- MODE_UNION_TYPE_MULTI Scatter []string Convert multiple sheets separately with same schema. Each element can be: - a workbook name or Glob which is relative to this workbook: &lt;Workbook&gt;, then the sheet name is the same as this sheet. - or a workbook name which is relative to this workbook with a worksheet name: &lt;Workbook&gt;#&lt;Worksheet&gt;. Optional bool Whether all fields in this sheet are optional (field name existence). Patch Patch Sheet patch type. - PATCH_REPLACE - PATCH_MERGE WithParentDir bool confgen: export JSON/Bin/Text files with parent dir created. ScatterWithoutBookName bool confgen(scatter): export JSON/Bin/Text filenames without book name prefix. OrderedMap bool Generate OrderedMap accessers or not. Index []string Generate index accessers. - Single-column Index format: Column&lt;ColumnX,ColumnY,...&gt;@IndexName.
- Multi-column Index format: (Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName. OrderedIndex []string Generate OrderedIndex accessers. - Single-column OrderedIndex format: Column&lt;ColumnX,ColumnY,...&gt;@IndexName.
- Multi-column OrderedIndex format: (Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName. LangOptions map&lt;string, string&gt; Specify loader language options. Valid keys are: OrderedMap, Index. Different kvs must be seperated by , and one key value must be seperated by :. If one key doesn&rsquo;t exist in map, it means that this loader option is supported in all languages. Valid values are all combinations of cpp, go with space as seperator. Examples: - OrderedMap:cpp,Index:cpp go // ordered map supported in cpp, index supported in cpp and go - OrderedMap:cpp // ordered map supported in cpp, index supported in all languages `}).add({id:299,href:"/docs/excel/metasheet/#empty-tableau",title:"Metasheet / Empty @TABLEAU ",description:"Excel metasheet @TABLEAU guide.",content:` If metasheet @TABLEAU is empty, then all other worksheets in the same workbook will be processed.
`}).add({id:300,href:"/docs/excel/metasheet/#a-simple-example",title:"Metasheet / A simple example ",description:"Excel metasheet @TABLEAU guide.",content:` There is a worksheet Sheet1 in HelloWorld.xlsx, we want to rename sheet to ItemConf, define custom seperator as |, and generate ordered map accessers.
So the metasheet @TABLEAU in HelloWorld.xlsx should be configured as:
HelloWorld.xlsx&nbsp; Sheet1 @TABLEAU ID Name map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s Name 1 Apple 2 Orange 3 Banana Sheet Alias Sep OrderedMap Sheet1 ItemConf | true `}).add({id:301,href:"/docs/excel/metasheet/#workbook-alias",title:"Metasheet / Workbook Alias ",description:"Excel metasheet @TABLEAU guide.",content:` The generated proto file name is the snake case of input file name. For example, if you have a workbook named HelloWorld.xlsx, the generated proto file name is hello_world.proto. If you want to manually specify a name for the generated proto file, you can also use the Alias option. In this scenario, # refers to the workbook name.
A worksheet ItemConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; Sheet1 @TABLEAU ID Name map&lt;uint32, Item&gt; string Item&rsquo;s ID Item&rsquo;s Name 1 Apple 2 Orange 3 Banana Sheet Alias # custom_conf Sheet1 ItemConf Generated:
custom_conf.proto `}).add({id:302,href:"/docs/excel/metasheet/#option-mode",title:"Metasheet / Option Mode ",description:"Excel metasheet @TABLEAU guide.",content:` Sheet mode defines how tableauc (protogen) parses the sheet: data or types.
Available modes:
MODE_DEFAULT: Default mode, which defines sheet&rsquo;s data structure. MODE_ENUM_TYPE: Define single enum type in a sheet, see Example. MODE_ENUM_TYPE_MULTI: Define multiple enum types in a sheet, see Example. MODE_STRUCT_TYPE: Define single struct type in a sheet, see Example. MODE_STRUCT_TYPE_MULTI: Define multiple struct types in a sheet, see Example. MODE_UNION_TYPE: Define single union type in a sheet, see Example. MODE_UNION_TYPE_MULTI: Define multiple union types in a sheet, see Example. `}).add({id:303,href:"/docs/excel/metasheet/#option-transpose",title:"Metasheet / Option Transpose ",description:"Excel metasheet @TABLEAU guide.",content:` In linear algebra, transpose of a matrix is an operator which flips a matrix over its diagonal. Likewise, transpose of a sheet (2D matrix) means interchanging its rows into columns or vice versa.
See more details about Excel: Transpose (rotate) data from rows to columns or vice versa.
Option Transpose is specified as true in the metasheet @TABLEAU.
A worksheet HeroConf in HelloWorld.xlsx:
HelloWorld.xlsx&nbsp; HeroConf @TABLEAU ID int32 Hero&rsquo;s ID 123 Name string Hero&rsquo;s name Robin Desc string Hero&rsquo;s description A big hero! Skill []int32 Hero&rsquo;s skills 100,101,102 Sheet Transpose HeroConf true Generated:
hello_world.proto HeroConf.json `}).add({id:304,href:"/docs/excel/metasheet/#option-merger",title:"Metasheet / Option Merger ",description:"Excel metasheet @TABLEAU guide.",content:` Option Merger is used to merge multiple sheets (comma-separated) with same schema to one.
Each element can be:
just a workbook file path or Glob path (relative to this workbook): &lt;Workbook&gt;, then the sheet name is the same as this sheet. a workbook file path (relative to this workbook) with a worksheet name: &lt;Workbook&gt;#&lt;Worksheet&gt;. ⓘ Glob pattern usually should not match the main workbook. If matched, then tableauc will auto eliminate it. `}).add({id:305,href:"/docs/excel/metasheet/#merging-multiple-workbooks",title:"Metasheet / Merging multiple workbooks ",description:"Excel metasheet @TABLEAU guide.",content:` For example, there are three workbooks, each containing a worksheet ZoneConf with the same schema:
MergerMain.xlsx (main): contains @TABLEAU metasheet with a Glob pattern Merger*.xlsx in the Merger column to match all sub workbooks. Merger2.xlsx (sub): contains only the data worksheet, no @TABLEAU metasheet needed. Merger3.xlsx (sub): contains only the data worksheet, no @TABLEAU metasheet needed. The first (main) workbook: a worksheet ZoneConf in MergerMain.xlsx (with @TABLEAU):
MergerMain.xlsx&nbsp; ZoneConf @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 1 Infinity 100 Sheet Merger ZoneConf Merger*.xlsx The second (sub) workbook: a worksheet ZoneConf in Merger2.xlsx (without @TABLEAU):
Merger2.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 2 Desert 200 The third (sub) workbook: a worksheet ZoneConf in Merger3.xlsx (without @TABLEAU):
Merger3.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 3 Snowfield 300 Generated:
merger_main.proto HeroConf.json `}).add({id:306,href:"/docs/excel/metasheet/#merging-multiple-sheets-in-same-workbook",title:"Metasheet / Merging multiple sheets in same workbook ",description:"Excel metasheet @TABLEAU guide.",content:` For example, there are three worksheets with the same schema in the same workbook Merger.xlsx:
ZoneConf (main sheet, with @TABLEAU) ZoneConf2 (sub sheet) ZoneConf3 (sub sheet) The main workbook: worksheets ZoneConf, ZoneConf2, ZoneConf3, and @TABLEAU in Merger.xlsx:
Merger.xlsx&nbsp; ZoneConf ZoneConf2 ZoneConf3 @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 1 Infinity 100 ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 2 Desert 200 ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone&rsquo;s ID Zone&rsquo;s name Zone&rsquo;s difficulty 3 Snowfield 300 Sheet Merger ZoneConf Merger.xlsx#ZoneConf2,Merger.xlsx#ZoneConf3 ⓘ Use &lt;Workbook&gt;#&lt;Worksheet&gt; to refer to a specific sheet in a workbook. Generated:
merger_same.proto ZoneConf.json `}).add({id:307,href:"/docs/excel/metasheet/#option-scatter",title:"Metasheet / Option Scatter ",description:"Excel metasheet @TABLEAU guide.",content:` Option Scatter is used to scatter multiple sheets (comma-separated) with same schema to different generated config files.
Each element can be:
just a workbook file path or Glob path (relative to this workbook): &lt;Workbook&gt;, then the sheet name is the same as this sheet. a workbook file path (relative to this workbook) with a worksheet name: &lt;Workbook&gt;#&lt;Worksheet&gt;. ⓘ Glob pattern usually should not match the main workbook. If matched, then tableauc will auto eliminate it. For example, there are three workbooks (each with same sheet schema, and Scatter1.xlsx is the main workbook):
Scatter1.xlsx Scatter2.xlsx Scatter3.xlsx The first (main) workbook: a worksheet ZoneConf in Scatter1.xlsx (with @TABLEAU):
Scatter1.xlsx&nbsp; ZoneConf @TABLEAU ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 1 Infinity 100 Sheet Scatter ZoneConf Scatter*.xlsx The second (sub) workbook: a worksheet ZoneConf in Scatter2.xlsx (without @TABLEAU):
Scatter2.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 2 Desert 200 The third (sub) workbook: a worksheet ZoneConf in Scatter3.xlsx (without @TABLEAU):
Scatter3.xlsx&nbsp; ZoneConf ID Name Difficulty map&lt;uint32, Zone&gt; string int32 Zone’s ID Zone’s name Zone’s difficulty 3 Snowfield 300 Generated protoconf:
scatter_1.proto It is supposed to generate three different config files (name pattern: &lt;BookName&gt;_&lt;SheetName&gt;):
Scatter1_ZoneConf.json Scatter2_ZoneConf.json Scatter3_ZoneConf.json `}).add({id:308,href:"/docs/excel/metasheet/#option-orderedmap",title:"Metasheet / Option OrderedMap ",description:"Excel metasheet @TABLEAU guide.",content:` 📢 It only applies to each level message’s first map field.
If you set OrderedMap to true, then tableau loader plugins will generate ordered map APIs:
C++: OrderedMap API Go: OrderedMap API `}).add({id:309,href:"/docs/excel/metasheet/#option-index",title:"Metasheet / Option Index ",description:"Excel metasheet @TABLEAU guide.",content:` Option Index can be specified to generate index accessers. There are two kinds of indexes:
Single-column Index Multi-column Index (aka Composite Index). If you set Index appropriately, then tableau loader plugins will generate index APIs:
C++: Index API Go: Index API Each column type can be:
scalar: numbers, booleans, strings, and bytes. enum: e.g.: enum&lt;.FruitType&gt; incell scalar list: e.g: []int32 incell enum list: e.g: []enum&lt;.FruitType&gt; Example: two worksheets ItemConf and ShopConf in HelloWorld.xlsx:
ItemConf: index on columns of the same struct as map value. ShopConf: index on columns of the same struct as list element. HelloWorld.xlsx&nbsp; ItemConf ShopConf @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. Sheet Index ItemConf ID@Item, Name@AwardItem, (ID,Name)@SpecialItem ShopConf ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop `}).add({id:310,href:"/docs/excel/metasheet/#single-column-index",title:"Metasheet / Single-column Index ",description:"Excel metasheet @TABLEAU guide.",content:` Format: Column&lt;ColumnX,ColumnY,...&gt;@IndexName.
The sign @ is the separator between column name and index name. if IndexName is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule. The columns in the angle brackets &lt;&gt; specify the sorting columns, which the result array of same index key sort by.
Examples:
ID ID@Item ID&lt;ID&gt;@Item: result array by ID. ID&lt;Type,Priority&gt;@Item: sort result array by Type and Priority. ID, Name@AwardItem ID@Item, Name@AwardItem `}).add({id:311,href:"/docs/excel/metasheet/#multi-column-index",title:"Metasheet / Multi-column Index ",description:"Excel metasheet @TABLEAU guide.",content:` Format: (Column1,Column2,...)&lt;ColumnX,ColumnY,...&gt;@IndexName.
Multi-column Index (aka Composite Index) is composed of multiple columns in the same struct (in list or map) to increase query speed.
The sign @ is the separator between enclosed column names by parentheses and index name. If IndexName is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule. The columns in the angle brackets &lt;&gt; specify the sorting columns, which the result array of same index key sort by.
Examples:
(ID,Name): index name not set, then determined by parent struct type name. (ID,Name)@AwardItem (ID,Name)&lt;ID&gt;: result array by ID. (ID,Type)&lt;Type,Priority&gt;@Item: sort result array by Type and Priority. ID@Item, (ID,Name)@AwardItem: one single-column index and one multi-column index. `}).add({id:312,href:"/docs/excel/metasheet/#option-orderedindex",title:"Metasheet / Option OrderedIndex ",description:"Excel metasheet @TABLEAU guide.",content:` Option OrderedIndex can be specified to generate ordered index accessers. There are two kinds of ordered indexes:
Single-column OrderedIndex Multi-column OrderedIndex (aka Composite OrderedIndex). If you set OrderedIndex appropriately, then tableau loader plugins will generate index APIs:
C++: Index API Go: Index API Each column type can be:
scalar: numbers, booleans, strings, and bytes. enum: e.g.: enum&lt;.FruitType&gt; incell scalar list: e.g: []int32 incell enum list: e.g: []enum&lt;.FruitType&gt; Example: two worksheets ItemConf and ShopConf in HelloWorld.xlsx:
ItemConf: ordered index on columns of the same struct as map value. ShopConf: ordered index on columns of the same struct as list element. HelloWorld.xlsx&nbsp; ItemConf ShopConf @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item&rsquo;s ID Item&rsquo;s name Item&rsquo;s desc 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. ID Type Desc [Shop]int32 int32 string Shop&rsquo;s ID Shop&rsquo;s type Shop&rsquo;s desc 1 1 Shoes shop. 2 1 T-Shirt shop. 3 2 Fruite shop. Sheet OrderedIndex ItemConf ID@Item, Name@AwardItem, (ID,Name)@SpecialItem ShopConf ID@Shop, Type@ThemeShop, (ID,Type)@SpecialShop `}).add({id:313,href:"/docs/excel/metasheet/#single-column-orderedindex",title:"Metasheet / Single-column OrderedIndex ",description:"Excel metasheet @TABLEAU guide.",content:` Format: Column&lt;ColumnX,ColumnY,...&gt;@IndexName.
The sign @ is the separator between column name and index name. if IndexName is not set, it will be this column’s parent struct type name. One or more indexes can be specified by comma-separated rule. The columns in the angle brackets &lt;&gt; specify the sorting columns, which the result array of same index key sort by.
Examples:
ID ID@Item ID&lt;ID&gt;@Item: sort result array by ID. ID&lt;Type,Priority&gt;@Item: sort result array by Type and Priority. ID, Name@AwardItem ID@Item, Name@AwardItem `}).add({id:314,href:"/docs/excel/metasheet/#multi-column-orderedindex",title:"Metasheet / Multi-column OrderedIndex ",description:"Excel metasheet @TABLEAU guide.",content:` ⚠️ Not supported yet.
`}).add({id:315,href:"/docs/excel/metasheet/#option-patch",title:"Metasheet / Option Patch ",description:"Excel metasheet @TABLEAU guide.",content:`

`}).add({id:316,href:"/docs/excel/metasheet/#option-sep",title:"Metasheet / Option Sep ",description:"Excel metasheet @TABLEAU guide.",content:` Sheet-level separator for separating:
incell list elements (scalar or struct). incell map items. If not set, it will use global-level seq (default: ,) in Tableauc yaml.config.
`}).add({id:317,href:"/docs/excel/metasheet/#option-subsep",title:"Metasheet / Option Subsep ",description:"Excel metasheet @TABLEAU guide.",content:` Sheet-level subseparator for separating:
key-value pair of each incell map item. struct fields of each incell struct list element. If not set, it will use global-level subseq (default: :) in Tableauc yaml.config.
`}).add({id:318,href:"/docs/basics/",title:"Basics",description:"Basics of Tableau.",content:""}).add({id:319,href:"/docs/basics/concepts/#terminology",title:"Concepts / Terminology ",description:"Core concepts of Tableau.",content:`
`}).add({id:320,href:"/docs/basics/concepts/#basics",title:"Concepts / Basics ",description:"Core concepts of Tableau.",content:` Term Definition Workbook An excel file.
A bundle of CSV files named with the same prefix seperated by #. A XML file. A YAML file. Worksheet A sheet in a excel file. A CSV file. A root node of a XML file. A document in YAML file. Metasheet A worksheet named @TABLEAU to specify tableau parser options. Row The row in a sheet. Column The column in a sheet. Cell The intersection of a row and a column. In-cell The inner-side of a cell. Cross-cell Continuous cells of a row or a column. `}).add({id:321,href:"/docs/basics/concepts/#worksheet",title:"Concepts / Worksheet ",description:"Core concepts of Tableau.",content:` Term Definition Namerow Exact row number of column name definition at a worksheet.
⚠️ NOTE: each column name must be unique in a worksheet!
Default: 1. Typerow Exact row number of column type definition at a worksheet.
Default: 2. Noterow Exact row number of column note at a worksheet.
Default: 3. Datarow Start row number of data at a worksheet.
Default: 4. Nameline The line number of column name definition in a cell. 0 means the whole cell.
Default: 0. Typeline The line number of column type definition in a cell. 0 means the whole cell.
Default: 0. Sep Separator for:
1. separating in-cell list elements. 2. separating in-cell map items.
Default: ,. Subsep Subseparator for separating in-cell map Key-Value pair.
Default: :. Nested Nested naming of the namerow.
Default: false. Layout Incell, vertical(cross-cell) or horizontal(cross-cell). Transpose Interchanging the rows and columns of a given sheet. `}).add({id:322,href:"/docs/basics/concepts/#mappings-to-protoconf",title:"Concepts / Mappings to Protoconf ",description:"Core concepts of Tableau.",content:" Term Protoconf Workbook One protoconf(.proto) file. Worksheet One top-level message in a protoconf file, except the tableau metasheet named @TABLEAU. column One field in a message "}).add({id:323,href:"/docs/basics/concepts/#a-simple-mapping-example",title:"Concepts / A simple mapping example ",description:"Core concepts of Tableau.",content:`
`}).add({id:324,href:"/docs/basics/concepts/#input-an-excel-file",title:"Concepts / Input: an excel file ",description:"Core concepts of Tableau.",content:` A workbook(HelloWorld.xlsx) with two data worksheets(ItemConf and ActivityConf) and an empty tableau metasheet(@TABLEAU).
HelloWorld.xlsx&nbsp; ItemConf ActivityConf @TABLEAU ID Name Type map&lt;uint32, Item&gt; string int32 Item&rsquo;s ID. Item&rsquo;s name. Item&rsquo;s type. 1 item1 100 2 item2 200 3 item3 300 ID Name Open map&lt;uint32, Activity&gt; string bool Activity&rsquo;s ID. Activity&rsquo;s name. Activity is open? 1 activity1 true 2 activity2 false 3 activity3 `}).add({id:325,href:"/docs/basics/concepts/#output-a-protoconf-file",title:"Concepts / Output: a protoconf file ",description:"Core concepts of Tableau.",content:` A protoconf file(hello_world.proto) with two top-level messages(ItemConf and ActivityConf).
hello_world.proto `}).add({id:326,href:"/docs/basics/naming-convention/#enums",title:"Naming convention / Enums ",description:"Naming convention.",content:` Use PascalCase (with an initial capital) for enum type names and CAPITALS_WITH_UNDERSCORES for value names:
See Protobuf style: enums.
`}).add({id:327,href:"/docs/basics/naming-convention/#examples",title:"Naming convention / Examples ",description:"Naming convention.",content:" Name Style Example workbook PascalCase HelloWorld.xlsx worksheet PascalCase HelloWorld struct (message) PascalCase HelloWorld field (column) PascalCase HelloWorld "}).add({id:328,href:"/docs/basics/grammar-and-types/#overview",title:"Grammar and types / Overview ",description:"Grammar and types.",content:` Tableau borrows most of its syntax and types from Protocol Buffers (proto3) and Golang.
`}).add({id:329,href:"/docs/basics/grammar-and-types/#scalar-types",title:"Grammar and types / Scalar types ",description:"Grammar and types.",content:` Details disccused at Protocol Buffers Proto3 Scalar.
Kind Types Default Numbers int32, uint32
int64, uint64
float, double 0
0
0.0 Booleans bool false Strings string &quot;&quot; Bytes bytes &quot;&quot; `}).add({id:330,href:"/docs/basics/grammar-and-types/#composite-types",title:"Grammar and types / Composite types ",description:"Grammar and types.",content:" Type Description struct A struct is mapped to a protobuf message. list A list is mapped to a protobuf repeated field. map A map is mapped to a protobuf map field. "}).add({id:331,href:"/docs/basics/grammar-and-types/#struct",title:"Grammar and types / struct ",description:"Grammar and types.",content:" Feature Description Horizontal layout Each scalar field located in one cell. Simple incell struct Each field must be scalar type. It is a comma-separated list of fields. E.g.: 1,test,3.0. If the data list&rsquo;s size is not same as struct&rsquo;s fields, then fields will be filled in order. Fields not configured will be filled with default values due to its scalar type. "}).add({id:332,href:"/docs/basics/grammar-and-types/#list",title:"Grammar and types / list ",description:"Grammar and types.",content:" Feature Description Horizontal layout This is list&rsquo;s default layout. Element type can be struct or scalar. Vertical layout List&rsquo;s element type should be struct. Simple incell list Element type must be scalar. It is a comma-separated list of elements. E.g.: 1,2,3. Scalable Scalable or dynamic list size. Ignore empty element Smart recognition of empty element at any position. "}).add({id:333,href:"/docs/basics/grammar-and-types/#map",title:"Grammar and types / map ",description:"Grammar and types.",content:` Feature Description Horizontal layout Vertical layout This is map&rsquo;s default layout. Hash map Implemented as unordered map or hash map. Ordered map Supported by tableauio/loader.
- C++ Simple incell map Both key and value must be scalar type. It is a comma-separated list of key:value pairs. E.g.: 1:10,2:20,3:30. Scalable Scalable or dynamic map size. Ignore empty item Smart recognition of empty item at any position. `}).add({id:334,href:"/docs/basics/grammar-and-types/#enumeration",title:"Grammar and types / Enumeration ",description:"Grammar and types.",content:` Feature Description Three forms of enum value 1. Enum value number.
2. Enum value name.
3. Enum value alias name (with EnumValueOptions specified). Validation Auto-check legality of enum values. `}).add({id:335,href:"/docs/basics/grammar-and-types/#empty-value",title:"Grammar and types / Empty value ",description:"Grammar and types.",content:` Type Description scalar Empty scalar will be emplaced with scalar type&rsquo;s default value. struct Empty struct will not be spawned if all fields are empty. list Empty list will not be spawned if list&rsquo;s size is 0.
Empty struct will not be appended if list&rsquo;s element(struct type) is empty. map Empty map will not be spawned if map&rsquo;s size is 0. Empty struct will not be inserted if map&rsquo;s value(struct type) is empty. nesting Recursively empty. `}).add({id:336,href:"/docs/basics/enum/#enum-value",title:"Enum / Enum value ",description:"Enum basics.",content:` The tableau parser accepts three enum value forms:
enum value name. enum value number. enum value alias. It is another name in English, Chinese, or any other language, which can be specified by tableau.evalue by extending google.protobuf.EnumValueOptions. For example, enum type FruitType in common.proto is defined as:
Then the three forms of enum value are all accepted:
Enum value number Enum value name Enum value alias 0 FRUIT_TYPE_UNKNOWN Unknown 1 FRUIT_TYPE_APPLE Apple 2 FRUIT_TYPE_ORANGE Orange 3 FRUIT_TYPE_BANANA Banana NOTE: Enum type must be predefined.
Go to read details about predefiend Enum type: Predefined types →.
`}).add({id:337,href:"/docs/basics/enum/#validation",title:"Enum / Validation ",description:"Enum basics.",content:` As enum type is predefined, so the tableau parser will auto validate the enum value.
`}).add({id:338,href:"/docs/basics/wellknown-types/#overview",title:"Wellknown types / Overview ",description:"Wellknown types.",content:` For easy use, Wellknown types are built-in types in Tableau. This concept is much like Protocol Buffers Well-Known Types.
You should include the proto files provided by Tableau and Protocol Buffers:
tableau/protobuf/wellknown.proto google/protobuf/timestamp.proto google/protobuf/duration.proto `}).add({id:339,href:"/docs/basics/wellknown-types/#datetime",title:"Wellknown types / Datetime ",description:"Wellknown types.",content:` For use cases, see Wellknown types: Datetime →
Type Default Description datetime 0000-00-00 00:00:00 Format: yyyy-MM-dd HH:mm:ss or RFC3339. e.g.: 2020-01-01 05:10:00
or 2020-01-01T05:10:00+08:00. date 0000-00-00 Format: yyyy-MM-dd or yyyyMMdd. e.g.: 2020-01-01 or 20200101. time 00:00:00 Format: HH:mm:ss or HHmmss, HH:mm or HHmm. e.g.: 05:10:00 or 051000, 05:10 or 0510. Tips:
datetime and date are based on google.protobuf.Timestamp, see JSON mapping. time is based on google.protobuf.Duration, see JSON mapping. RFC 3339: Date and Time on the Internet: Timestamps `}).add({id:340,href:"/docs/basics/wellknown-types/#duration",title:"Wellknown types / Duration ",description:"Wellknown types.",content:` For use cases, see Wellknown types: Duration →
Type Default Description duration 0s Format like: 72h3m0.5s. A duration string is a possibly signed sequence of decimal numbers, each with optional fraction and a unit suffix, such as 300ms, -1.5h or 2h45m. Valid time units are ns, us (or µs), ms, s, m, h. Tips:
duration is based on google.protobuf.Duration, see JSON mapping. golang duration string form. golang ParseDuration. `}).add({id:341,href:"/docs/basics/wellknown-types/#fraction",title:"Wellknown types / Fraction ",description:"Wellknown types.",content:` For use cases, see Wellknown types: Fraction →
A fraction represents a part of a whole or, more generally, any number of equal parts. See wiki: Fraction for more details.
Type Default Description fraction 0 Format: - N%: percentage, e.g.: 10% - N‰: per thounsand, e.g.: 10‰ - N‱: per ten thounsand, e.g.: 10‱
- N/D: simple fraction, e.g.: 3/4
- N: only numerator, e.g.: 3 is same to 3/1
- N: floating-point numerator, e.g.: 0.01 is same to 1/100 `}).add({id:342,href:"/docs/basics/wellknown-types/#comparator",title:"Wellknown types / Comparator ",description:"Wellknown types.",content:` For use cases, see Wellknown types: Comparator →
A comparator holds a sign and a fraction value. Any number or fraction can compare with it.
Type Default Description comparator ==0 Format: &lt;Sign&gt;&lt;Fraction&gt;. e.g.: ==10, !=1/2, &lt;10%, &lt;=10‰, &gt;10%, &gt;=10‱ `}).add({id:343,href:"/docs/basics/wellknown-types/#version",title:"Wellknown types / Version ",description:"Wellknown types.",content:` For use cases, see Wellknown types: Version →
A version represents the version number in dot-decimal notation. Version form is: &lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;[.&lt;OTHER&gt;]....
A version field holds three forms of representation for easy use:
string version: str integer version: val integer version parts: major, minor, patch, others You can specify the version pattern (a field property) as &lt;MAJOR_MAX&gt;.&lt;MINOR_MAX&gt;.&lt;PATCH_MAX&gt;[.&lt;OTHER_MAX&gt;]....
Each part with suffix &ldquo;MAX&rdquo; represents the max decimal value of each part in the dot-decimal notation. Each part &ldquo;XXX_MAX+1&rdquo; represents the part&rsquo;s value occupying in an integer. Integer version formula for general pattern &lt;MAJOR_MAX&gt;.&lt;MINOR_MAX&gt;.&lt;PATCH_MAX&gt; is: MAJOR*(MINOR_MAX+1)*(PATCH_MAX+1) + MINOR*(PATCH_MAX+1) + PATCH Default pattern is: 255.255.255.
Type Default Description version &quot;&quot; Format: &lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;. e.g.: 1.0.1 version|{pattern:&quot;255.255.255.255&quot;} &quot;&quot; Format: &lt;MAJOR&gt;.&lt;MINOR&gt;.&lt;PATCH&gt;.&lt;OTHER&gt;. e.g.: 1.0.1.1 `}).add({id:344,href:"/docs/basics/predefined-types/#overview",title:"Predefined types / Overview ",description:"Predefined types.",content:` You can define enum, struct, or union types in a protoconf file (such as common.proto) ahead. Then use them to specify the column type or cross-cell type of a worksheet.
`}).add({id:345,href:"/docs/basics/predefined-types/#usage",title:"Predefined types / Usage ",description:"Predefined types.",content:" Syntax: prepend a dot . to predefined CustomType (a.k.a. .CustomType) when you use it in a worksheet. Import: specify the protoFiles option of tableauc config to import the common proto files, where predefined enum, struct, union types are defined. See Tableauc config. "}).add({id:346,href:"/docs/basics/predefined-types/#enum",title:"Predefined types / Enum ",description:"Predefined types.",content:` For example, enum type FruitType in common.proto is defined as:
There are some examples to demonstrate how to use predefined enum types:
Excel/CSV: Use predefined enum type. XML: Use predefined enum type YAML: Use predefined enum type `}).add({id:347,href:"/docs/basics/predefined-types/#struct",title:"Predefined types / Struct ",description:"Predefined types.",content:` For example, struct type Prop in common.proto is defined as:
There are some examples to demonstrate how to use predefined struct types:
Excel/CSV struct: Predefined-struct list: Vertical predefined-struct list map: Vertical predefined-struct map XML struct: Predefined-struct list: Predefined struct list map: TODO YAML struct: Predefined-struct list: Predefined struct list map: TODO In horizontal map or horizontal list, you can define custom variable name with the predefined struct. See Custom named struct.
`}).add({id:348,href:"/docs/basics/predefined-types/#union",title:"Predefined types / Union ",description:"Predefined types.",content:` For example, struct type Target in common.proto is defined as:
There are some examples to demonstrate how to use predefined union types:
Excel/CSV list: Predefined union in list map: Predefined union in map XML union: Predefined union list: Predefined union list map: TODO YAML union: Predefined union list: Predefined union list map: TODO `}).add({id:349,href:"/docs/prologue/",title:"Prologue",description:"Prologue of Tableau",content:""}).add({id:350,href:"/docs/prologue/introduction/#tableauc",title:"Introduction / tableauc ",description:"Intro to Tableau.",content:` tableauc is the Tableau Compiler with protogen and confgen inside.
`}).add({id:351,href:"/docs/prologue/introduction/#protogen",title:"Introduction / protogen ",description:"Intro to Tableau.",content:` protogen converts Excel/CSV/XML/YAML files to Protoconf files. Protoconf is a dialect of Protocol Buffers (proto3) extended with tableau options, aimed to define the structure of Excel/CSV/XML/YAML.
`}).add({id:352,href:"/docs/prologue/introduction/#confgen",title:"Introduction / confgen ",description:"Intro to Tableau.",content:` confgen converts Excel/CSV/XML/YAML with Protoconf files to JSON/Text/Bin files.
`}).add({id:353,href:"/docs/prologue/quick-start/#1-download-tableauc",title:"Quick Start / 1. Download tableauc ",description:"Quick Start",content:` Select the appropriate tableauc (aka Tableau Compiler) to download:
Windows x64 Linux x64 macOS x64 macOS arm64 More platforms are available on tableau releases →.
`}).add({id:354,href:"/docs/prologue/quick-start/#2-add-a-workbook",title:"Quick Start / 2. Add a workbook ",description:"Quick Start",content:` Add HelloWorld.xlsx with two sheets:
Item: Copy data below to this worksheet. @TABLEAU: Just leave it empty now. It is the tableau metasheet → for specifying parser options. HelloWorld.xlsx&nbsp; Item @TABLEAU ID Name Desc map&lt;int32, Item&gt; string string Item’s ID Item’s name Item’s description 1 Apple A kind of delicious fruit. 2 Orange A kind of sour fruit. 3 Banana A kind of calorie-rich fruit. `}).add({id:355,href:"/docs/prologue/quick-start/#3-run-tableauc",title:"Quick Start / 3. Run tableauc ",description:"Quick Start",content:` Run command: ./tableauc HelloWorld.xlsx
Then hello_world.proto and Item.json are generated:
hello_world.proto Item.json Congratulations! You’ve just run the tableauc to convert a workbook to proto and JSON files.
`}).add({id:356,href:"/docs/prologue/config/#configyaml",title:"Tableauc config / config.yaml ",description:"Tableauc config details",content:` Create a file named config.yaml, and copy configurations below to it:
`}).add({id:357,href:"/docs/prologue/config/#protoinputheaderseq",title:"Tableauc config / proto.input.header.seq ",description:"Tableauc config details",content:` Default: ,
Global-level separator for separating:
incell list elements (scalar or struct). incell map items. Sheet-level and field-level separator options are also supported:
Sheet-level separator in metasheet Field-level separator in field property `}).add({id:358,href:"/docs/prologue/config/#protoinputheadersubseq",title:"Tableauc config / proto.input.header.subseq ",description:"Tableauc config details",content:` Default: :
Global-level subseparator for separating:
key-value pair of each incell map item. struct fields of each incell struct list element. Sheet-level and field-level subseparator options are also supported:
Sheet-level subseparator in metasheet Field-level subseparator in field property `}).add({id:359,href:"/docs/",title:"Docs",description:"Docs Tableau.",content:""});function s(n,s){if(!s||!n)return e(t(n||""));const o=t(n),i=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return e(o).replace(new RegExp(i,"gi"),e=>`<mark>${e}</mark>`)}function e(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(e){const t=document.createElement("textarea");return t.innerHTML=e,t.value}function i(e,n,s=180){if(!e)return"";const o=t(e),a=o.toLowerCase().indexOf(n.toLowerCase());if(a===-1)return o.slice(0,s);const i=Math.max(0,a-30),r=Math.min(o.length,i+s);return(i>0?"…":"")+o.slice(i,r)+(r<o.length?"…":"")}(function(){var t=document.getElementById("search-modal");if(!t)return;t.addEventListener("shown.bs.modal",function(){var e=document.getElementById("search");e&&(e.focus(),e.removeEventListener("input",o,!0),e.addEventListener("input",o,!0))}),t.addEventListener("hidden.bs.modal",function(){var e=document.getElementById("search"),t=document.getElementById("suggestions");e&&(e.value=""),t&&(t.innerHTML="")}),document.addEventListener("keydown",function(e){if(e.ctrlKey&&e.key==="/"){e.preventDefault();var n=bootstrap.Modal.getOrCreateInstance(t);n.show()}})})();function o(){var t,d,l=document.getElementById("search"),o=document.getElementById("suggestions");if(!l||!o)return;if(t=l.value.trim(),o.innerHTML="",!t)return;d=n.search(t,{limit:100,enrich:!0});const a=new Map;for(const e of d.flatMap(e=>e.result)){if(a.has(e.doc.href))continue;a.set(e.doc.href,e.doc)}const u=e=>{const t=e.indexOf(" / ");return t===-1?{page:e,sec:""}:{page:e.slice(0,t),sec:e.slice(t+3)}},h=[...a.values()].sort((e,t)=>{const n=u(e.title),s=u(t.title),o=n.page.localeCompare(s.page);return o!==0?o:n.sec.localeCompare(s.sec)});if(h.length===0){const n=document.createElement("div");n.innerHTML=`No results for "<strong>${e(t)}</strong>"`,n.classList.add("suggestion__no-results"),o.appendChild(n);return}for(const e of h){const d=e.href,c=document.createElement("div"),n=document.createElement("a"),[u,l]=d.split("#");n.href=u+"?highlight="+encodeURIComponent(t)+(l?"#"+l:"");const a=document.createElement("span");a.innerHTML=s(e.title,t),a.classList.add("suggestion__title"),n.appendChild(a);const m=i(e.content||e.description,t),r=document.createElement("span");r.innerHTML=s(m,t),r.classList.add("suggestion__description"),n.appendChild(r),c.appendChild(n),o.appendChild(c)}const r=o.querySelectorAll(".suggestion__title");r.forEach(e=>{e.style.width=""});let c=0;r.forEach(e=>{const t=e.getBoundingClientRect().width;t>c&&(c=t)}),r.forEach(e=>{e.style.width=c+"px"})}})()