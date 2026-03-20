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

// Apply block-row coloring for sheet-multicolored2 tables.
// A block is a series of contiguous non-empty rows; blocks are separated by empty rows.
// The top 2 rows of each block get class "block-row-1" and "block-row-2" respectively.
// Note: Markdown renders the first row as <thead>, which is already styled as block-row-1
// via CSS. So for the first block, tbody rows start counting from 2.
document.addEventListener('DOMContentLoaded', function () {
  var containers = document.querySelectorAll('div.sheet-multicolored2');
  containers.forEach(function (container) {
    var table = container.querySelector('table');
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;

    // thead counts as the first row of the first block
    var thead = table.querySelector('thead');
    var blockRowIndex = thead ? 1 : 0;

    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function (row) {
      var cells = row.querySelectorAll('td');
      var isEmpty = Array.from(cells).every(function (td) {
        return td.textContent.trim() === '';
      });
      if (isEmpty) {
        blockRowIndex = 0;
      } else {
        blockRowIndex++;
        if (blockRowIndex === 1) {
          row.classList.add('block-row-1');
        } else if (blockRowIndex === 2) {
          row.classList.add('block-row-2');
        }
      }
    });
  });
});

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
