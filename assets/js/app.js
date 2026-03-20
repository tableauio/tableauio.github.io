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

// Transform GFM-style blockquote alerts (> [!NOTE], > [!TIP], etc.) into styled alert divs.
// Supported types: NOTE, TIP, IMPORTANT, WARNING, CAUTION
document.addEventListener('DOMContentLoaded', function () {
  var alertTypes = {
    NOTE: {
      label: 'Note',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
    },
    TIP: {
      label: 'Tip',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"/></svg>',
    },
    IMPORTANT: {
      label: 'Important',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>',
    },
    WARNING: {
      label: 'Warning',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>',
    },
    CAUTION: {
      label: 'Caution',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>',
    },
  };

  var blockquotes = document.querySelectorAll('blockquote');
  blockquotes.forEach(function (bq) {
    // Find the first <p> inside the blockquote
    var firstP = bq.querySelector('p');
    if (!firstP) return;

    // Check if it starts with [!TYPE]
    var text = firstP.textContent;
    var match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
    if (!match) return;

    var type = match[1].toUpperCase();
    var config = alertTypes[type];

    // Build the alert div
    var alertDiv = document.createElement('div');
    alertDiv.className = 'gfm-alert gfm-alert-' + type.toLowerCase();

    // Title row
    var titleDiv = document.createElement('div');
    titleDiv.className = 'gfm-alert-title';
    titleDiv.innerHTML = config.icon + '<span>' + config.label + '</span>';
    alertDiv.appendChild(titleDiv);

    // Remove the [!TYPE] prefix from the first paragraph
    var remaining = firstP.innerHTML.replace(
      /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
      '',
    );

    // Content: collect all children of blockquote, replace first <p> text
    var contentDiv = document.createElement('div');
    contentDiv.className = 'gfm-alert-content';

    Array.from(bq.childNodes).forEach(function (child) {
      if (child === firstP) {
        if (remaining.trim() !== '') {
          var newP = document.createElement('p');
          newP.innerHTML = remaining;
          contentDiv.appendChild(newP);
        }
      } else {
        contentDiv.appendChild(child.cloneNode(true));
      }
    });

    alertDiv.appendChild(contentDiv);
    bq.parentNode.replaceChild(alertDiv, bq);
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
