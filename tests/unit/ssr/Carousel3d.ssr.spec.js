// @vitest-environment node

import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

describe('Carousel3d SSR', () => {
  it('renders without browser globals', async () => {
    const app = createSSRApp({
      render: () => h(Carousel3d, {
        ariaLabel: 'Featured projects'
      }, {
        default: () => [
          h(Slide, { index: 0 }, { default: () => 'First' }),
          h(Slide, { index: 1 }, { default: () => 'Second' })
        ]
      })
    })

    const html = await renderToString(app)

    expect(html).toContain('aria-label="Featured projects"')
    expect(html).toContain('aria-roledescription="carousel"')
    expect(html).toContain('aria-label="1 of 2"')
    expect(html).toContain('aria-label="2 of 2"')
    expect(html).toContain('First')
  })
})
