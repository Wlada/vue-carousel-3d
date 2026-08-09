import { defineConfig } from 'vitepress'

// Simplified Chinese UI strings for the built-in local search.
const zhSearchTranslations = {
  button: {
    buttonText: '搜索文档',
    buttonAriaLabel: '搜索文档'
  },
  modal: {
    displayDetails: '展开详细列表',
    resetButtonTitle: '清除查询条件',
    backButtonTitle: '返回搜索结果',
    noResultsText: '未找到相关结果',
    footer: {
      selectText: '选择',
      selectKeyAriaLabel: '选择键',
      navigateText: '切换',
      navigateUpKeyAriaLabel: '上移键',
      navigateDownKeyAriaLabel: '下移键',
      closeText: '关闭',
      closeKeyAriaLabel: '关闭键'
    }
  }
}

// MiniSearch indexes Latin words and treats each CJK character as its own
// token so Simplified Chinese queries match without adding a dependency.
// Non-CJK input keeps the default word-splitting behavior.
function zhCjkTokenizer (text) {
  // The regex is constructed inside the function so the serialized tokenizer
  // is fully self-contained: VitePress rebuilds it in the browser without
  // module-scoped bindings. CJK ranges are written as code points so no
  // literal CJK character appears in source.
  const cjkRanges = [
    [0x3040, 0x30ff], // Hiragana + Katakana
    [0x3400, 0x4dbf], // CJK Unified Ideographs Extension A
    [0x4e00, 0x9fff], // CJK Unified Ideographs
    [0xf900, 0xfaff], // CJK Compatibility Ideographs
    [0x3000, 0x303f] // CJK Symbols and Punctuation
  ]
  const cjkPattern = new RegExp('[' + cjkRanges.map(([lo, hi]) => {
    return '\\u' + lo.toString(16).padStart(4, '0') + '-\\u' + hi.toString(16).padStart(4, '0')
  }).join('') + ']')

  const split = /[\s-]+/
  const tokens = []
  let latin = ''

  for (const char of text) {
    if (cjkPattern.test(char)) {
      if (latin) {
        tokens.push(...latin.toLowerCase().split(split).filter(Boolean))
        latin = ''
      }
      tokens.push(char)
    } else {
      latin += char
    }
  }

  if (latin) tokens.push(...latin.toLowerCase().split(split).filter(Boolean))

  return tokens
}

export default defineConfig({
  lang: 'en-US',
  title: 'Vue Carousel 3D',
  description: 'A flexible, touch-friendly 3D carousel for Vue 3.',
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
      { text: 'Playground', link: '/playground/' },
      { text: 'API', link: '/api/' },
      { text: 'Version', items: [
        { text: 'Vue 3 · package v2', link: '/' },
        { text: 'Vue 2 · package v1 maintained', link: '/v1/' },
        { text: 'Compatibility policy', link: '/guide/versioning' }
      ] }
    ],
    sidebar: {
      '/v1/': [
        {
          text: 'Vue 2 archive · package v1',
          items: [
            { text: 'Overview', link: '/v1/' },
            { text: 'Installation', link: '/v1/guide/' },
            { text: 'Live demo', link: '/v1/#live-demo' },
            { text: 'Examples', link: '/v1/examples/' },
            { text: 'API reference', link: '/v1/api/' },
            { text: 'Maintenance policy', link: '/v1/guide/versioning' }
          ]
        }
      ],
      '/': [
        {
          text: 'Vue 3 · package v2',
          items: [
            { text: 'Overview', link: '/' },
            { text: 'Installation', link: '/guide/' },
            { text: 'Playground', link: '/playground/' },
            { text: 'Compatibility policy', link: '/guide/versioning' }
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
      ]
    },
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
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Vue Carousel 3D',
      description: '为 Vue 3 打造的灵活、支持触摸的 3D 轮播组件。',
      head: [
        ['meta', { property: 'og:description', content: '为 Vue 3 打造，具备纵深、动效与无障碍控件的轮播组件。' }]
      ],
      themeConfig: {
        siteTitle: 'Carousel 3D',
        outline: { label: '本页目录' },
        skipToContentLabel: '跳转到主要内容',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        darkModeSwitchTitle: '切换到深色主题',
        lightModeSwitchTitle: '切换到浅色主题',
        returnToTopLabel: '返回顶部',
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        notFound: {
          code: '404',
          title: '页面未找到',
          quote: '但如果你不改变方向，并且继续寻找，你也许就会到达你原本要去的地方。',
          linkText: '返回首页',
          linkLabel: '前往首页'
        },
        nav: [
          { text: '指南', link: '/zh-CN/guide/' },
          { text: '示例', link: '/zh-CN/examples/' },
          { text: '演练场', link: '/zh-CN/playground/' },
          { text: 'API', link: '/zh-CN/api/' },
          { text: '版本', items: [
            { text: 'Vue 3 · 软件包 v2', link: '/zh-CN/' },
            { text: 'Vue 2 · 软件包 v1（维护中）', link: '/zh-CN/v1/' },
            { text: '兼容性策略', link: '/zh-CN/guide/versioning' }
          ] }
        ],
        sidebar: {
          '/zh-CN/v1/': [
            {
              text: 'Vue 2 归档 · 软件包 v1',
              items: [
                { text: '概览', link: '/zh-CN/v1/' },
                { text: '安装', link: '/zh-CN/v1/guide/' },
                { text: '实时演示', link: '/zh-CN/v1/#live-demo' },
                { text: '示例', link: '/zh-CN/v1/examples/' },
                { text: 'API 参考', link: '/zh-CN/v1/api/' },
                { text: '维护策略', link: '/zh-CN/v1/guide/versioning' }
              ]
            }
          ],
          '/zh-CN/': [
            {
              text: 'Vue 3 · 软件包 v2',
              items: [
                { text: '概览', link: '/zh-CN/' },
                { text: '安装', link: '/zh-CN/guide/' },
                { text: '演练场', link: '/zh-CN/playground/' },
                { text: '兼容性策略', link: '/zh-CN/guide/versioning' }
              ]
            },
            {
              text: '构建',
              items: [
                { text: '示例', link: '/zh-CN/examples/' },
                { text: 'API 参考', link: '/zh-CN/api/' },
                { text: 'Vue 3 迁移', link: '/zh-CN/vue3/' }
              ]
            }
          ]
        },
        search: {
          provider: 'local',
          options: {
            translations: zhSearchTranslations,
            miniSearch: {
              options: {
                tokenize: zhCjkTokenizer
              }
            }
          }
        },
        footer: {
          message: '在 MIT 许可下发布。',
          copyright: 'Vue Carousel 3D'
        },
        editLink: {
          pattern: 'https://github.com/wlada/vue-carousel-3d/edit/master/docs/:path',
          text: '在 GitHub 上改进此页面'
        },
        langMenuLabel: '切换语言'
      }
    }
  }
})
