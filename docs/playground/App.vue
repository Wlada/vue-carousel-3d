<template>
  <main class="lab">
    <header class="lab__header">
      <div>
        <p class="lab__eyebrow">{{ t.eyebrow }}</p>
        <h1>{{ t.headingA }}<br>{{ t.headingB }}</h1>
      </div>
      <div class="lab__status" aria-live="polite">
        <span>{{ t.activePlane }}</span>
        <strong>{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</strong>
      </div>
    </header>

    <section class="lab__preview" :aria-label="t.previewAria">
      <carousel-3d
        ref="carousel"
        :key="carouselKey"
        :animation-speed="settings.animationSpeed"
        :autoplay="settings.autoplay"
        :border="settings.border"
        :controls-visible="settings.controlsVisible"
        :count="slides.length"
        :dir="settings.dir"
        :disable3d="settings.disable3d"
        :display="settings.display"
        :dots="settings.dots"
        :dots-position="settings.dotsPosition"
        :height="settings.height"
        :inverse-scaling="settings.inverseScaling"
        :loop="settings.loop"
        :perspective="settings.perspective"
        :space="settings.space"
        :width="settings.width"
        :aria-label="t.carouselAria"
        @before-slide-change="activeIndex = $event"
      >
        <slide v-for="(slide, index) in slides" :key="slide.id" :index="index">
          <article class="lab-card" :style="{ '--hue': slide.hue }">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.caption }}</p>
          </article>
        </slide>
      </carousel-3d>
    </section>

    <section class="lab__controls" :aria-label="t.controlsAria">
      <div class="control-group control-group--geometry">
        <p class="control-group__title">{{ t.geometry }}</p>
        <label>
          <span>{{ t.visiblePlanes }} <output>{{ settings.display }}</output></span>
          <input v-model.number="settings.display" type="range" min="1" :max="slides.length" step="1">
        </label>
        <label>
          <span>{{ t.perspective }} <output>{{ settings.perspective }}°</output></span>
          <input v-model.number="settings.perspective" type="range" min="0" max="60" step="1">
        </label>
        <label>
          <span>{{ t.spacing }} <output>{{ settings.space }}px</output></span>
          <input v-model.number="settings.space" type="range" min="0" max="260" step="10">
        </label>
        <label>
          <span>{{ t.inverseScaling }} <output>{{ settings.inverseScaling }}px</output></span>
          <input v-model.number="settings.inverseScaling" type="range" min="0" max="500" step="25">
        </label>
      </div>

      <div class="control-group">
        <p class="control-group__title">{{ t.dimensions }}</p>
        <label>
          <span>{{ t.width }} <output>{{ settings.width }}px</output></span>
          <input v-model.number="settings.width" type="range" min="220" max="420" step="10">
        </label>
        <label>
          <span>{{ t.height }} <output>{{ settings.height }}px</output></span>
          <input v-model.number="settings.height" type="range" min="160" max="300" step="10">
        </label>
        <label>
          <span>{{ t.animation }} <output>{{ settings.animationSpeed }}ms</output></span>
          <input v-model.number="settings.animationSpeed" type="range" min="0" max="1200" step="50">
        </label>
        <label>
          <span>{{ t.border }} <output>{{ settings.border }}px</output></span>
          <input v-model.number="settings.border" type="range" min="0" max="8" step="1">
        </label>
      </div>

      <div class="control-group control-group--switches">
        <p class="control-group__title">{{ t.behavior }}</p>
        <label class="switch"><input v-model="settings.loop" type="checkbox"><span>{{ t.infiniteLoop }}</span></label>
        <label class="switch"><input v-model="settings.controlsVisible" type="checkbox"><span>{{ t.navControls }}</span></label>
        <label class="switch"><input v-model="settings.dots" type="checkbox"><span>{{ t.navDots }}</span></label>
        <label class="select-label">
          <span>{{ t.dotsPosition }}</span>
          <select v-model="settings.dotsPosition"><option value="bottom">{{ t.bottom }}</option><option value="top">{{ t.top }}</option></select>
        </label>
        <label class="switch"><input v-model="settings.autoplay" type="checkbox"><span>{{ t.autoplay }}</span></label>
        <label class="switch"><input v-model="settings.disable3d" type="checkbox"><span>{{ t.flatMode }}</span></label>
        <label class="select-label">
          <span>{{ t.direction }}</span>
          <select v-model="settings.dir"><option value="rtl">RTL</option><option value="ltr">LTR</option></select>
        </label>
        <div class="actions">
          <button type="button" @click="addSlide">{{ t.addPlane }}</button>
          <button type="button" @click="removeSlide" :disabled="slides.length <= 1">{{ t.removePlane }}</button>
          <button type="button" class="button--quiet" @click="reset">{{ t.reset }}</button>
        </div>
      </div>

      <aside class="lab__config">
        <p class="control-group__title">{{ t.liveProps }}</p>
        <pre>{{ publicProps }}</pre>
      </aside>
    </section>
  </main>
</template>

<script>
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'
import { watchCarouselA11y } from '../demo/a11y-labels.js'

const lang = new URLSearchParams(window.location.search).get('lang') === 'zh-CN' ? 'zh-CN' : 'en'

const translations = {
  en: {
    eyebrow: 'Carousel instrumentation deck',
    headingA: 'Make the depth',
    headingB: 'behave.',
    activePlane: 'ACTIVE PLANE',
    previewAria: 'Carousel preview',
    controlsAria: 'Carousel controls',
    carouselAria: 'Interactive carousel playground',
    geometry: 'Geometry',
    visiblePlanes: 'Visible planes',
    perspective: 'Perspective',
    spacing: 'Spacing',
    inverseScaling: 'Inverse scaling',
    dimensions: 'Dimensions',
    width: 'Width',
    height: 'Height',
    animation: 'Animation',
    border: 'Border',
    behavior: 'Behavior',
    infiniteLoop: 'Infinite loop',
    navControls: 'Navigation controls',
    navDots: 'Navigation dots',
    dotsPosition: 'Dots position',
    bottom: 'Bottom',
    top: 'Top',
    autoplay: 'Autoplay',
    flatMode: 'Flat mode',
    direction: 'Direction',
    addPlane: 'Add plane',
    removePlane: 'Remove plane',
    reset: 'Reset',
    liveProps: 'Live props',
    title: 'Vue Carousel 3D Lab'
  },
  'zh-CN': {
    eyebrow: '轮播组件调试面板',
    headingA: '让纵深',
    headingB: '听从指挥。',
    activePlane: '当前面板',
    previewAria: '轮播组件预览',
    controlsAria: '轮播组件控件',
    carouselAria: '交互式轮播组件演练场',
    geometry: '几何',
    visiblePlanes: '可见面板',
    perspective: '透视',
    spacing: '间距',
    inverseScaling: '反向缩放',
    dimensions: '尺寸',
    width: '宽度',
    height: '高度',
    animation: '动画',
    border: '边框',
    behavior: '行为',
    infiniteLoop: '无限循环',
    navControls: '导航控件',
    navDots: '导航指示点',
    dotsPosition: '指示点位置',
    bottom: '底部',
    top: '顶部',
    autoplay: '自动播放',
    flatMode: '平面模式',
    direction: '方向',
    addPlane: '添加面板',
    removePlane: '移除面板',
    reset: '重置',
    liveProps: '实时属性',
    title: 'Vue Carousel 3D 演练场'
  }
}

const seedSlides = {
  en: [
    ['Orbit', 'Rotation is the point.', 166],
    ['Grain', 'A measured layer of texture.', 197],
    ['Signal', 'Keep the interaction legible.', 43],
    ['Vector', 'One direction, many planes.', 292],
    ['Echo', 'A repeat with altered depth.', 346],
    ['Shift', 'Spacing changes the rhythm.', 12],
    ['Motive', 'The arrangement stays alive.', 88]
  ],
  'zh-CN': [
    ['轨道', '旋转才是重点。', 166],
    ['颗粒', '一层有质感的纹理。', 197],
    ['信号', '让交互清晰可辨。', 43],
    ['向量', '一个方向，多个平面。', 292],
    ['回声', '深浅有别的重复。', 346],
    ['位移', '间距改变节奏。', 12],
    ['主题', '布局保持活力。', 88]
  ]
}

const t = translations[lang]
const seed = seedSlides[lang]

const defaultSettings = {
  animationSpeed: 500,
  autoplay: false,
  border: 1,
  controlsVisible: true,
  dir: 'rtl',
  disable3d: false,
  display: 5,
  dots: true,
  dotsPosition: 'bottom',
  height: 220,
  inverseScaling: 300,
  loop: true,
  perspective: 35,
  space: 150,
  width: 310
}

function makeSlide (index) {
  const [title, caption, hue] = seed[index % seed.length]

  return {
    id: `plane-${Date.now()}-${index}`,
    title,
    caption,
    hue: (hue + Math.floor(index / seed.length) * 19) % 360
  }
}

export default {
  components: { Carousel3d, Slide },
  data () {
    return {
      activeIndex: 0,
      carouselKey: 0,
      settings: { ...defaultSettings },
      slides: seed.map((_, index) => makeSlide(index))
    }
  },
  mounted () {
    document.documentElement.lang = lang
    document.title = t.title
    // Observe the app root: the carousel re-mounts on reset (carouselKey), so
    // the observer re-finds it inside this stable root.
    this.a11yObserver = watchCarouselA11y(this.$el, lang)
  },
  beforeUnmount () {
    if (this.a11yObserver) this.a11yObserver.disconnect()
  },
  computed: {
    t () {
      return t
    },
    publicProps () {
      const props = {
        display: this.settings.display,
        width: this.settings.width,
        height: this.settings.height,
        space: this.settings.space,
        perspective: this.settings.perspective,
        inverseScaling: this.settings.inverseScaling,
        animationSpeed: this.settings.animationSpeed,
        loop: this.settings.loop,
        dir: this.settings.dir,
        controlsVisible: this.settings.controlsVisible,
        dots: this.settings.dots,
        dotsPosition: this.settings.dotsPosition,
        autoplay: this.settings.autoplay,
        disable3d: this.settings.disable3d
      }

      return JSON.stringify(props, null, 2)
    }
  },
  methods: {
    addSlide () {
      this.slides.push(makeSlide(this.slides.length))
    },
    removeSlide () {
      if (this.slides.length <= 1) return

      this.slides.pop()
      this.activeIndex = Math.min(this.activeIndex, this.slides.length - 1)
      this.settings.display = Math.min(this.settings.display, this.slides.length)
    },
    reset () {
      this.settings = { ...defaultSettings }
      this.slides = seed.map((_, index) => makeSlide(index))
      this.activeIndex = 0
      this.carouselKey += 1
    }
  }
}
</script>
