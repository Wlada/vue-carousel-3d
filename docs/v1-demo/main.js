import './style.css'

const titles = ['Orbit', 'Archive', 'Legacy', 'Motion', 'Vector', 'Signal', 'Depth']

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
  methods: {
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
