import DefaultTheme from 'vitepress/theme'
import './style.css'

// A few default-theme strings are baked into the page (copy button tooltip,
// permalink aria-label) or hardcoded in VitePress components (main / mobile /
// extra navigation labels) with no per-locale configuration key. Rewrite them
// in place for Simplified Chinese pages only, keeping English output and
// behaviour untouched. Rewrites are idempotent and guarded by the page lang,
// which VitePress keeps in sync during SPA navigation.
const zh = {
  copyButtonTitle: '复制代码',
  permalinkPrefix: '指向',
  permalinkSuffix: '的链接',
  mainNavLabel: '主导航',
  mobileNavLabel: '移动端导航',
  extraNavLabel: '附加导航'
}

const PERMALINK_PREFIX = 'Permalink to '

function localizeHardcodedStrings () {
  if (typeof document === 'undefined' || document.documentElement.lang !== 'zh-CN') {
    return
  }

  // `markdown.codeCopyButtonTitle` is a global option with no per-locale
  // override; the title is rendered into each page's HTML at build time.
  document.querySelectorAll('button.copy[title="Copy Code"]').forEach((btn) => {
    btn.setAttribute('title', zh.copyButtonTitle)
  })

  // VitePress renders heading anchors as `aria-label="Permalink to <title>"`.
  document.querySelectorAll('a.header-anchor[aria-label^="' + PERMALINK_PREFIX + '"]').forEach((link) => {
    const title = link.getAttribute('aria-label').slice(PERMALINK_PREFIX.length)
    link.setAttribute('aria-label', zh.permalinkPrefix + '“' + title + '”' + zh.permalinkSuffix)
  })

  const mainNavLabel = document.getElementById('main-nav-aria-label')
  if (mainNavLabel && mainNavLabel.textContent.trim() === 'Main Navigation') {
    mainNavLabel.textContent = zh.mainNavLabel
  }

  document.querySelectorAll('[aria-label="mobile navigation"]').forEach((el) => {
    el.setAttribute('aria-label', zh.mobileNavLabel)
  })

  document.querySelectorAll('[aria-label="extra navigation"]').forEach((el) => {
    el.setAttribute('aria-label', zh.extraNavLabel)
  })
}

export default {
  ...DefaultTheme,
  enhanceApp () {
    if (typeof document === 'undefined') return

    // Catch content mounted by hydration, SPA navigation and dynamic
    // components (the observer lives for the lifetime of the docs SPA).
    const observer = new MutationObserver(() => {
      localizeHardcodedStrings()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Initial pass after the first page has hydrated; covers attribute-only
    // changes the childList observer would miss.
    requestAnimationFrame(() => {
      localizeHardcodedStrings()
    })
  }
}
