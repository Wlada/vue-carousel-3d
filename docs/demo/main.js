import { createApp, h } from 'vue'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'
import placeholderImage from '@/assets/carousel-placeholder.svg'
import { watchCarouselA11y } from './a11y-labels.js'
import './style.css'

const lang = new URLSearchParams(window.location.search).get('lang') === 'zh-CN' ? 'zh-CN' : 'en'

const strings = {
  en: {
    eyebrow: 'INTERACTIVE STUDY',
    plane: 'Plane',
    activePlane: 'Active plane',
    explore: 'Explore the stack',
    ariaLabel: 'Interactive feature carousel',
    hint: 'TAB TO FOCUS · ← → TO NAVIGATE · SWIPE OR USE CONTROLS',
    title: 'Vue Carousel 3D demo'
  },
  'zh-CN': {
    eyebrow: '交互式演示',
    plane: '面板',
    activePlane: '当前面板',
    explore: '浏览层级',
    ariaLabel: '交互式功能轮播组件',
    hint: 'TAB 聚焦 · ← → 导航 · 滑动或使用控件',
    title: 'Vue Carousel 3D 演示'
  }
}

const slideTitles = {
  en: ['Motion', 'Depth', 'Touch', 'Control', 'Focus', 'Flow', 'Scale'],
  'zh-CN': ['动感', '纵深', '触控', '控制', '聚焦', '流动', '缩放']
}

const t = strings[lang]
const slides = slideTitles[lang].map((title, index) => [String(index + 1).padStart(2, '0'), title])

document.documentElement.lang = lang
document.title = t.title

createApp({
  data () {
    return {
      activeIndex: 0
    }
  },
  render () {
    const cards = slides.map(([number, title], index) => h(Slide, {
      key: number,
      index
    }, [
      h('article', { class: 'demo-card' }, [
        h('img', { src: placeholderImage, alt: '' }),
        h('span', { class: 'demo-card__number' }, number),
        h('h2', title),
        h('p', index === this.activeIndex ? t.activePlane : t.explore)
      ])
    ]))

    return h('main', { class: 'demo-stage' }, [
      h('header', [
        h('p', { class: 'eyebrow' }, t.eyebrow),
        h('strong', `${t.plane} ${this.activeIndex + 1} / ${slides.length}`)
      ]),
      h(Carousel3d, {
        ref: 'carousel',
        controlsVisible: true,
        display: 5,
        dots: true,
        width: 280,
        height: 210,
        perspective: 32,
        space: 160,
        ariaLabel: t.ariaLabel,
        onBeforeSlideChange: (index) => { this.activeIndex = index }
      }, cards),
      h('p', { class: 'hint' }, t.hint)
    ])
  },
  mounted () {
    this.a11yObserver = watchCarouselA11y(this.$refs.carousel.$el, lang)
  },
  beforeUnmount () {
    if (this.a11yObserver) this.a11yObserver.disconnect()
  }
}).mount('#app')
