import './style.css'

const titles = ['Orbit', 'Archive', 'Legacy', 'Motion', 'Vector', 'Signal', 'Depth']

function makeSlide (index) {
  return {
    id: `v1-plane-${Date.now()}-${index}`,
    title: titles[index % titles.length],
    hue: (index * 47 + 164) % 360
  }
}

new window.Vue({
  el: '#app',
  components: {
    'carousel-3d': window['carousel-3d'].Carousel3d,
    slide: window['carousel-3d'].Slide
  },
  data: {
    controlsVisible: true,
    dir: 'rtl',
    display: 5,
    height: 210,
    loop: true,
    perspective: 35,
    space: 145,
    width: 290,
    slides: titles.map((_, index) => makeSlide(index))
  },
  methods: {
    addSlide () {
      this.slides.push(makeSlide(this.slides.length))
    },
    removeSlide () {
      if (this.slides.length > 1) this.slides.pop()
      this.display = Math.min(this.display, this.slides.length)
    }
  }
})
