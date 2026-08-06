// @vitest-environment node

import Vue from 'vue'
import { createRenderer } from 'vue-server-renderer'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

describe('Carousel3d SSR', () => {
  it('renders without browser globals', async () => {
    const app = new Vue({
      render: (h) => h(Carousel3d, {
        props: { ariaLabel: 'Featured projects' }
      }, [
        h(Slide, { props: { index: 0 } }, ['First']),
        h(Slide, { props: { index: 1 } }, ['Second'])
      ])
    })

    const html = await createRenderer().renderToString(app)

    expect(html).toContain('aria-label="Featured projects"')
    expect(html).toContain('aria-roledescription="carousel"')
    expect(html).toContain('aria-label="1 of 2"')
    expect(html).toContain('aria-label="2 of 2"')
    expect(html).toContain('First')
  })
})
