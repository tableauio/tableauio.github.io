var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: 'id',
      store: [
        "href", "title", "description", "content"
      ],
      index: ["title", "description", "content"]
    }
  });


  // Not yet supported: https://github.com/nextapps-de/flexsearch#complex-documents

  /*
  var docs = [
    {{ range $index, $page := (where .Site.Pages "Section" "docs") -}}
      {
        id: {{ $index }},
        href: "{{ .Permalink }}",
        title: {{ .Title | jsonify }},
        description: {{ .Params.description | jsonify }},
        content: {{ .Content | jsonify }}
      },
    {{ end -}}
  ];
  */

  // Build index: split each page into sections by h2/h3 headings,
  // so each section becomes an independent search result with its own #anchor.
  {{ $id := 0 -}}
  {{ $entries := slice -}}
  {{ range (where .Site.Pages "Section" "docs") -}}
    {{ $page := . -}}
    {{ $pageTitle := .Title -}}
    {{ $permalink := .RelPermalink -}}
    {{ $pageDesc := "" -}}
    {{ with .Description }}{{ $pageDesc = . }}{{ else }}{{ $pageDesc = .Summary | plainify }}{{ end -}}
    {{/* Strip code blocks from HTML content */}}
    {{ $html := .Content | replaceRE `(?s)<pre[^>]*>.*?</pre>` "" -}}
    {{/* Split by h2/h3 tags to get sections; use a sentinel to mark heading boundaries */}}
    {{/* Hugo renders headings as: <h2 id=anchor-id>Text <a ...>#</a></h2> (id without quotes) */}}
    {{ $marked := $html | replaceRE `<h[23][^>]*\sid="?([^"\s>]*)"?[^>]*>(.*?)</h[23]>` "§§§$1§§§$2§§§" -}}
    {{ $parts := split $marked "§§§" -}}
    {{/* parts pattern: [before_first_heading, anchor1, headingText1, content1, anchor2, ...] */}}
    {{ $numParts := len $parts -}}
    {{ if gt $numParts 3 -}}
      {{/* Page has headings: generate one entry per section */}}
      {{ range $i, $part := $parts -}}
        {{ $mod := mod $i 3 -}}
        {{ if eq $mod 1 -}}
          {{/* $i=1,4,7... => anchor ID */}}
          {{ $anchor := $part -}}
          {{ $headingText := index $parts (add $i 1) | replaceRE `<a[^>]*class="?anchor"?[^>]*>.*?</a>` "" | plainify -}}
          {{ $sectionContent := index $parts (add $i 2) | plainify -}}
          {{ $entries = $entries | append (dict
            "id" $id
            "href" (printf "%s#%s" $permalink $anchor)
            "title" (printf "%s / %s" $pageTitle $headingText)
            "description" $pageDesc
            "content" $sectionContent
          ) -}}
          {{ $id = add $id 1 -}}
        {{ end -}}
      {{ end -}}
    {{ else -}}
      {{/* No headings: one entry for the whole page */}}
      {{ $entries = $entries | append (dict
        "id" $id
        "href" $permalink
        "title" $pageTitle
        "description" $pageDesc
        "content" ($html | plainify)
      ) -}}
      {{ $id = add $id 1 -}}
    {{ end -}}
  {{ end -}}

  {{ $len := len $entries -}}
  index.add(
    {{ range $index, $entry := $entries -}}
      {
        id: {{ $entry.id }},
        href: {{ $entry.href | jsonify }},
        title: {{ $entry.title | jsonify }},
        description: {{ $entry.description | jsonify }},
        content: {{ $entry.content | jsonify }}
      })
      {{ if ne (add $index 1) $len -}}
        .add(
      {{ end -}}
    {{ end -}}
  ;

  search.addEventListener('input', show_results, true);

  // Highlight all occurrences of `query` in `text` with <mark> tags
  function highlight(text, query) {
    if (!query || !text) return escapeHtml(decodeHtmlEntities(text || ''));
    const plain = decodeHtmlEntities(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escapeHtml(plain).replace(new RegExp(escaped, 'gi'), m => `<mark>${m}</mark>`);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Decode HTML entities (e.g. &rsquo; &quot; &lt;) to plain text via a temporary element
  function decodeHtmlEntities(str) {
    const el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }

  // Extract a short snippet around the first match of `query` in `text`
  function getSnippet(text, query, maxLen = 180) {
    if (!text) return '';
    const plain = decodeHtmlEntities(text);
    const idx = plain.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return plain.slice(0, maxLen);
    const start = Math.max(0, idx - 30);
    const end = Math.min(plain.length, start + maxLen);
    return (start > 0 ? '…' : '') + plain.slice(start, end) + (end < plain.length ? '…' : '');
  }

  function show_results(){
    const maxResult = 8;
    var searchQuery = this.value.trim();
    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    if (!searchQuery) {
      suggestions.classList.add('d-none');
      return;
    }

    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    // inform user that no results were found
    if (flatResults.size === 0) {
      const noResultsMessage = document.createElement('div');
      noResultsMessage.innerHTML = `No results for "<strong>${escapeHtml(searchQuery)}</strong>"`;
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for (const [href, doc] of flatResults) {
      const entry = document.createElement('div');

      const a = document.createElement('a');
      // Ensure ?highlight= comes before #anchor so URLSearchParams can parse it correctly
      const [hrefPath, hrefHash] = href.split('#');
      a.href = hrefPath + '?highlight=' + encodeURIComponent(searchQuery) + (hrefHash ? '#' + hrefHash : '');

      const title = document.createElement('span');
      title.innerHTML = highlight(doc.title, searchQuery);
      title.classList.add("suggestion__title");
      a.appendChild(title);

      const snippetText = getSnippet(doc.content || doc.description, searchQuery);
      const description = document.createElement('span');
      description.innerHTML = highlight(snippetText, searchQuery);
      description.classList.add("suggestion__description");
      a.appendChild(description);

      entry.appendChild(a);
      suggestions.appendChild(entry);
    }
  }
}());
