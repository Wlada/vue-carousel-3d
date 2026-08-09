import './style.css'
import { watchCarouselA11y } from '../demo/a11y-labels.js'

const lang = new URLSearchParams(window.location.search).get('lang') === 'zh-CN' ? 'zh-CN' : 'en'

const translations = {
  en: {
    eyebrow: 'ARCHIVED TRACK · VUE 2 · PACKAGE v1.0.1',
    title: 'Depth, the way it used to be.',
    activePlane: 'ACTIVE PLANE',
    previewAria: 'Carousel preview',
    carouselAria: 'Vue 2 carousel playground',
    controlsAria: 'Vue 2 demo controls',
    geometry: 'Geometry',
    visiblePlanes: 'Visible planes',
    perspective: 'Perspective',
    spacing: 'Spacing',
    depth: 'Depth',
    dimensionsMotion: 'Dimensions & motion',
    width: 'Width',
    height: 'Height',
    animation: 'Animation',
    behavior: 'Behavior',
    infiniteLoop: 'Infinite loop',
    navControls: 'Navigation controls',
    autoplay: 'Autoplay',
    direction: 'Direction',
    addPlane: 'Add plane',
    removePlane: 'Remove plane',
    reset: 'Reset',
    footer: 'TAB TO FOCUS · ← → TO NAVIGATE · SWIPE OR USE CONTROLS',
    cardCaption: 'Vue 2 component instance',
    pageTitle: 'Vue Carousel 3D · Vue 2 demo'
  },
  'zh-CN': {
    eyebrow: '归档版本线 · Vue 2 · 软件包 v1.0.1',
    title: '纵深，一如既往。',
    activePlane: '当前面板',
    previewAria: '轮播组件预览',
    carouselAria: 'Vue 2 轮播组件演练场',
    controlsAria: 'Vue 2 演示控件',
    geometry: '几何',
    visiblePlanes: '可见面板',
    perspective: '透视',
    spacing: '间距',
    depth: '深度',
    dimensionsMotion: '尺寸与动效',
    width: '宽度',
    height: '高度',
    animation: '动画',
    behavior: '行为',
    infiniteLoop: '无限循环',
    navControls: '导航控件',
    autoplay: '自动播放',
    direction: '方向',
    addPlane: '添加面板',
    removePlane: '移除面板',
    reset: '重置',
    footer: 'TAB 聚焦 · ← → 导航 · 滑动或使用控件',
    cardCaption: 'Vue 2 组件实例',
    pageTitle: 'Vue Carousel 3D · Vue 2 演示'
  }
}

const slideTitles = {
  en: ['Orbit', 'Archive', 'Legacy', 'Motion', 'Vector', 'Signal', 'Depth'],
  'zh-CN': ['轨道', '存档', '传统', '动感', '向量', '信号', '纵深']
}

const t = translations[lang]
const titles = slideTitles[lang]

document.documentElement.lang = lang
document.title = t.pageTitle

const defaultSettings = {
  active: 0,
  animationSpeed: 500,
  autoplay: false,
  autoplayTimeout: 2500,
  border: 1,
  controlsVisible: true,
  dir: 'rtl',
  display: 5,
  height: 220,
  inverseScaling: 300,
  loop: true,
  perspective: 35,
  space: 145,
  width: 300
}

function makeSlide (index) {
  return {
    id: `v1-plane-${Date.now()}-${index}`,
    title: titles[index % titles.length],
    hue: (index * 47 + 164) % 360
  }
}

function seedSlides () {
  return titles.map((_, index) => makeSlide(index))
}

new window.Vue({
  el: '#app',
  components: {
    'carousel-3d': window['carousel-3d'].Carousel3d,
    slide: window['carousel-3d'].Slide
  },
  data () {
    return {
      ...defaultSettings,
      slides: seedSlides()
    }
  },
  mounted () {
    // Observe the app root: the v1 carousel is an external component, so the
    // helper locates its rendered container inside this stable root.
    this.a11yObserver = watchCarouselA11y(this.$el, lang)
  },
  beforeDestroy () {
    if (this.a11yObserver) this.a11yObserver.disconnect()
  },
  methods: {
    t (key) {
      return translations[lang][key]
    },
    addSlide () {
      this.slides.push(makeSlide(this.slides.length))
    },
    removeSlide () {
      if (this.slides.length > 1) this.slides.pop()
      this.display = Math.min(this.display, this.slides.length)
      this.active = Math.min(this.active, this.slides.length - 1)
    },
    reset () {
      Object.assign(this, defaultSettings)
      this.slides = seedSlides()
      this.$nextTick(() => {
        if (this.$refs.carousel) this.$refs.carousel.goSlide(0)
      })
    }
  }
})
