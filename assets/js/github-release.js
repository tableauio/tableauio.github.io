/**
 * github-release.js
 *
 * Dynamically fetches the latest release version from GitHub Releases API
 * and updates all download links inside a `[data-github-release]` container.
 *
 * On DOMContentLoaded the links are immediately rendered using the built-in
 * default version (`data-default-ver`), then updated asynchronously once the
 * latest version is fetched from the GitHub API.
 *
 * ## Container attributes  (`data-github-release` element)
 *
 * | Attribute           | Description                                                  |
 * |---------------------|--------------------------------------------------------------|
 * | `data-repo`         | GitHub repo in "owner/repo" format (required)                |
 * | `data-tag-prefix`   | Only consider tags starting with this prefix. The version    |
 * |                     | string is the part after the prefix. Omit to use full tag.   |
 * | `data-url-template` | URL template shared by all links. `{ver}` and `{platform}`   |
 * |                     | are replaced per-link. (required)                            |
 * | `data-default-ver`  | Version string rendered at build time (Hugo shortcode).      |
 * |                     | Used immediately before the async fetch completes.           |
 *
 * ## Link attributes  (`<a>` inside the container)
 *
 * | Attribute       | Description                                              |
 * |-----------------|----------------------------------------------------------|
 * | `data-platform` | Platform suffix inserted into `{platform}` in the        |
 * |                 | template (e.g. `windows.amd64`, `linux.amd64`).          |
 *
 * ## Example
 *
 * ```html
 * <div data-github-release
 *      data-repo="tableauio/tableau"
 *      data-tag-prefix="cmd/tableauc/"
 *      data-url-template="https://github.com/tableauio/tableau/releases/download/cmd%2Ftableauc%2F{ver}/tableauc.{ver}.{platform}.tar.gz"
 *      data-default-ver="v0.10.0">
 *   <a class="btn-download" data-platform="windows.amd64">...</a>
 *   <a class="btn-download" data-platform="linux.amd64">...</a>
 * </div>
 * ```
 *
 * Results are cached in sessionStorage for CACHE_TTL per repo+prefix key.
 */
(function () {
  var CACHE_TTL = 60 * 1000; // 1 minute

  /**
   * Build a download URL from the template, version and platform.
   */
  function buildUrl(template, ver, platform) {
    return template
      .replace(/\{ver\}/g, ver)
      .replace(/\{platform\}/g, platform || '');
  }

  /**
   * Apply a version string to all links inside the container.
   * Each <a data-platform> gets its href set via the shared template.
   */
  function applyVersion(container, ver) {
    var template = container.dataset.urlTemplate;
    if (!template) return;
    container.querySelectorAll('a[data-platform]').forEach(function (el) {
      el.href = buildUrl(template, ver, el.dataset.platform);
    });
  }

  /**
   * Fetch the latest matching release version for a given repo and tag prefix.
   * Returns a Promise that resolves to the version string, or rejects on error.
   */
  function fetchLatestVersion(repo, tagPrefix) {
    return fetch('https://api.github.com/repos/' + repo + '/releases')
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API error: ' + res.status);
        return res.json();
      })
      .then(function (releases) {
        var release = releases.find(function (r) {
          return (
            r.tag_name && (tagPrefix ? r.tag_name.startsWith(tagPrefix) : true)
          );
        });
        if (!release) throw new Error('No matching release found');
        return tagPrefix
          ? release.tag_name.slice(tagPrefix.length)
          : release.tag_name;
      });
  }

  /**
   * Initialise one [data-github-release] container.
   */
  function initContainer(container) {
    var repo = container.dataset.repo;
    var tagPrefix = container.dataset.tagPrefix || '';
    var defaultVer = container.dataset.defaultVer;

    if (!repo) return;

    // Step 1: immediately render links with the build-time default version
    if (defaultVer) {
      applyVersion(container, defaultVer);
    }

    var cacheKey = 'gh_release__' + repo + '__' + tagPrefix;

    // Step 2: try sessionStorage cache
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        applyVersion(container, cached.ver);
        return;
      }
    } catch (e) {
      /* ignore */
    }

    // Step 3: fetch latest version from GitHub API asynchronously
    fetchLatestVersion(repo, tagPrefix)
      .then(function (ver) {
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ ver: ver, ts: Date.now() }),
          );
        } catch (e) {
          /* ignore */
        }
        applyVersion(container, ver);
      })
      .catch(function () {
        // Silently keep the default version already applied in Step 1
      });
  }

  // Initialise all containers on the page
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-github-release]').forEach(initContainer);
  });
})();
