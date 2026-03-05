// Highlight search keywords from URL ?highlight= parameter and scroll to first match
(function () {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('highlight');
  if (!query) return;

  // Walk text nodes inside the article body and wrap matches with <mark>
  const article = document.querySelector('article') || document.body;
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  let firstMark = null;

  function walkTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!regex.test(node.textContent)) return;
      regex.lastIndex = 0;

      const frag = document.createDocumentFragment();
      let last = 0,
        m;
      while ((m = regex.exec(node.textContent)) !== null) {
        frag.appendChild(
          document.createTextNode(node.textContent.slice(last, m.index)),
        );
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = m[0];
        if (!firstMark) firstMark = mark;
        frag.appendChild(mark);
        last = m.index + m[0].length;
      }
      frag.appendChild(document.createTextNode(node.textContent.slice(last)));
      node.parentNode.replaceChild(frag, node);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !['SCRIPT', 'STYLE', 'PRE'].includes(node.tagName)
    ) {
      // iterate over a static copy since we may mutate childNodes
      [...node.childNodes].forEach(walkTextNodes);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    walkTextNodes(article);
    if (firstMark) {
      firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Clean up the URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.delete('highlight');
    history.replaceState(null, '', url);
  });
})();

// Adds scroll position lock for default docs sidebar

if (document.querySelector('#sidebar-default') !== null) {
  let sidebar = document.getElementById('sidebar-default');

  let pos = sessionStorage.getItem('sidebar-scroll');
  if (pos !== null) {
    sidebar.scrollTop = parseInt(pos, 10);
  }

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('sidebar-scroll', sidebar.scrollTop);
  });
}
