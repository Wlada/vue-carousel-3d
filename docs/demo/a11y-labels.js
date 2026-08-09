// Docs-only ARIA localization for the carousel's built-in controls and dots.
// The library hardcodes English accessibility labels in Controls.vue and
// Dots.vue. Rather than expanding the public API, the standalone demo apps
// rewrite those labels on the rendered DOM for zh-CN pages. English pages and
// the default English labels are left untouched.
const zhControls = {
  prev: '上一个幻灯片',
  next: '下一个幻灯片'
}

const zhDots = {
  groupPrefix: '幻灯片导航（共 ',
  groupSuffix: ' 个）',
  dotPrefix: '转到第 ',
  dotMiddle: ' 个幻灯片（共 ',
  dotSuffix: ' 个）'
}

function findCarousel (rootEl) {
  if (rootEl && rootEl.classList && rootEl.classList.contains('carousel-3d-container')) {
    return rootEl
  }

  return rootEl ? rootEl.querySelector('.carousel-3d-container') : null
}

function translateDots (carousel) {
  const dots = carousel.querySelector('.carousel-3d-dots')
  if (!dots) return

  const dotEls = dots.querySelectorAll('.carousel-3d-dot')
  const total = dotEls.length

  dots.setAttribute('aria-label', zhDots.groupPrefix + total + zhDots.groupSuffix)

  dotEls.forEach((dot, index) => {
    dot.setAttribute('aria-label', zhDots.dotPrefix + (index + 1) + zhDots.dotMiddle + total + zhDots.dotSuffix)
  })
}

export function localizeCarouselA11y (rootEl, lang) {
  if (lang !== 'zh-CN') return

  const carousel = findCarousel(rootEl)
  if (!carousel) return

  const controls = carousel.querySelector('.carousel-3d-controls')
  if (controls) {
    const prev = controls.querySelector('.prev')
    const next = controls.querySelector('.next')

    if (prev) prev.setAttribute('aria-label', zhControls.prev)
    if (next) next.setAttribute('aria-label', zhControls.next)
  }

  translateDots(carousel)
}

// Watch the carousel's subtree (or the app root that contains it) so labels
// are re-applied whenever slides or settings change, dots are added/removed,
// or the carousel itself re-mounts. Returns the observer for the caller to
// disconnect on unmount.
export function watchCarouselA11y (rootEl, lang) {
  if (typeof MutationObserver === 'undefined' || lang !== 'zh-CN') {
    return null
  }

  const observer = new MutationObserver(() => {
    const carousel = findCarousel(rootEl)
    if (carousel) localizeCarouselA11y(carousel, lang)
  })
  observer.observe(rootEl, { childList: true, subtree: true })

  const carousel = findCarousel(rootEl)
  if (carousel) localizeCarouselA11y(carousel, lang)

  return observer
}
