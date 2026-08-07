<template>
  <main class="lab">
    <header class="lab__header">
      <div>
        <p class="lab__eyebrow">Carousel instrumentation deck</p>
        <h1>Make the depth<br>behave.</h1>
      </div>
      <div class="lab__status" aria-live="polite">
        <span>ACTIVE PLANE</span>
        <strong>{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</strong>
      </div>
    </header>

    <section class="lab__preview" aria-label="Carousel preview">
      <carousel-3d
        :key="carouselKey"
        :animation-speed="settings.animationSpeed"
        :autoplay="settings.autoplay"
        :border="settings.border"
        :controls-visible="settings.controlsVisible"
        :count="slides.length"
        :dir="settings.dir"
        :disable3d="settings.disable3d"
        :display="settings.display"
        :height="settings.height"
        :inverse-scaling="settings.inverseScaling"
        :loop="settings.loop"
        :perspective="settings.perspective"
        :space="settings.space"
        :width="settings.width"
        aria-label="Interactive carousel playground"
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

    <section class="lab__controls" aria-label="Carousel controls">
      <div class="control-group control-group--geometry">
        <p class="control-group__title">Geometry</p>
        <label>
          <span>Visible planes <output>{{ settings.display }}</output></span>
          <input v-model.number="settings.display" type="range" min="1" :max="slides.length" step="1">
        </label>
        <label>
          <span>Perspective <output>{{ settings.perspective }}°</output></span>
          <input v-model.number="settings.perspective" type="range" min="0" max="60" step="1">
        </label>
        <label>
          <span>Spacing <output>{{ settings.space }}px</output></span>
          <input v-model.number="settings.space" type="range" min="0" max="260" step="10">
        </label>
        <label>
          <span>Inverse scaling <output>{{ settings.inverseScaling }}px</output></span>
          <input v-model.number="settings.inverseScaling" type="range" min="0" max="500" step="25">
        </label>
      </div>

      <div class="control-group">
        <p class="control-group__title">Dimensions</p>
        <label>
          <span>Width <output>{{ settings.width }}px</output></span>
          <input v-model.number="settings.width" type="range" min="220" max="420" step="10">
        </label>
        <label>
          <span>Height <output>{{ settings.height }}px</output></span>
          <input v-model.number="settings.height" type="range" min="160" max="300" step="10">
        </label>
        <label>
          <span>Animation <output>{{ settings.animationSpeed }}ms</output></span>
          <input v-model.number="settings.animationSpeed" type="range" min="0" max="1200" step="50">
        </label>
        <label>
          <span>Border <output>{{ settings.border }}px</output></span>
          <input v-model.number="settings.border" type="range" min="0" max="8" step="1">
        </label>
      </div>

      <div class="control-group control-group--switches">
        <p class="control-group__title">Behavior</p>
        <label class="switch"><input v-model="settings.loop" type="checkbox"><span>Infinite loop</span></label>
        <label class="switch"><input v-model="settings.controlsVisible" type="checkbox"><span>Navigation controls</span></label>
        <label class="switch"><input v-model="settings.autoplay" type="checkbox"><span>Autoplay</span></label>
        <label class="switch"><input v-model="settings.disable3d" type="checkbox"><span>Flat mode</span></label>
        <label class="select-label">
          <span>Direction</span>
          <select v-model="settings.dir"><option value="rtl">RTL</option><option value="ltr">LTR</option></select>
        </label>
        <div class="actions">
          <button type="button" @click="addSlide">Add plane</button>
          <button type="button" @click="removeSlide" :disabled="slides.length <= 1">Remove plane</button>
          <button type="button" class="button--quiet" @click="reset">Reset</button>
        </div>
      </div>

      <aside class="lab__config">
        <p class="control-group__title">Live props</p>
        <pre>{{ publicProps }}</pre>
      </aside>
    </section>
  </main>
</template>

<script>
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

const defaultSettings = {
  animationSpeed: 500,
  autoplay: false,
  border: 1,
  controlsVisible: true,
  dir: 'rtl',
  disable3d: false,
  display: 5,
  height: 220,
  inverseScaling: 300,
  loop: true,
  perspective: 35,
  space: 150,
  width: 310
}

const seedSlides = [
  ['Orbit', 'Rotation is the point.', 166],
  ['Grain', 'A measured layer of texture.', 197],
  ['Signal', 'Keep the interaction legible.', 43],
  ['Vector', 'One direction, many planes.', 292],
  ['Echo', 'A repeat with altered depth.', 346],
  ['Shift', 'Spacing changes the rhythm.', 12],
  ['Motive', 'The arrangement stays alive.', 88]
]

function makeSlide (index) {
  const [title, caption, hue] = seedSlides[index % seedSlides.length]

  return {
    id: `plane-${Date.now()}-${index}`,
    title,
    caption,
    hue: (hue + Math.floor(index / seedSlides.length) * 19) % 360
  }
}

export default {
  components: { Carousel3d, Slide },
  data () {
    return {
      activeIndex: 0,
      carouselKey: 0,
      settings: { ...defaultSettings },
      slides: seedSlides.map((_, index) => makeSlide(index))
    }
  },
  computed: {
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
      this.slides = seedSlides.map((_, index) => makeSlide(index))
      this.activeIndex = 0
      this.carouselKey += 1
    }
  }
}
</script>
