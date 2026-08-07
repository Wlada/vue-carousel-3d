import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue Carousel 3D',
  description: 'A flexible, touch-friendly 3D carousel for Vue 3.',
  lang: 'en-US',
  base: '/vue-carousel-3d/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/vue-carousel-3d/mark.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#07111f' }],
    ['meta', { property: 'og:title', content: 'Vue Carousel 3D' }],
    ['meta', { property: 'og:description', content: 'Depth, motion and accessible controls for Vue 3.' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: 'Carousel 3D',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { text: 'Vue 3 · v2', items: [
        { text: 'Vue 3 migration', link: '/vue3/' },
        { text: 'Vue 2 maintenance', link: '/guide/versioning' }
      ] }
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Installation', link: '/guide/' },
          { text: 'Versioning', link: '/guide/versioning' }
        ]
      },
      {
        text: 'Build',
        items: [
          { text: 'Examples', link: '/examples/' },
          { text: 'API reference', link: '/api/' },
          { text: 'Vue 3 migration', link: '/vue3/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wlada/vue-carousel-3d' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vue-carousel-3d' }
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Vue Carousel 3D'
    },
    editLink: {
      pattern: 'https://github.com/wlada/vue-carousel-3d/edit/master/docs/:path',
      text: 'Improve this page on GitHub'
    }
  }
})
