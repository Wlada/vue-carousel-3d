import Vue from 'vue'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'
import placeholderImage from '@/assets/carousel-placeholder.svg'
import './style.css'

const slides = [
  ['01', 'Motion'],
  ['02', 'Depth'],
  ['03', 'Touch'],
  ['04', 'Control'],
  ['05', 'Focus'],
  ['06', 'Flow'],
  ['07', 'Scale']
]

new Vue({
  el: '#app',
  data: {
    activeIndex: 0
  },
  render (h) {
    const cards = slides.map(([number, title], index) => h(Slide, {
      key: number,
      props: { index }
    }, [
      h('article', { class: 'demo-card' }, [
        h('img', { attrs: { src: placeholderImage, alt: '' } }),
        h('span', { class: 'demo-card__number' }, number),
        h('h2', title),
        h('p', index === this.activeIndex ? 'Active plane' : 'Explore the stack')
      ])
    ]))

    return h('main', { class: 'demo-stage' }, [
      h('header', [
        h('p', { class: 'eyebrow' }, 'INTERACTIVE STUDY'),
        h('strong', `Plane ${this.activeIndex + 1} / ${slides.length}`)
      ]),
      h(Carousel3d, {
        props: {
          controlsVisible: true,
          display: 5,
          width: 280,
          height: 210,
          perspective: 32,
          space: 160,
          ariaLabel: 'Interactive feature carousel'
        },
        on: {
          'before-slide-change': (index) => { this.activeIndex = index }
        }
      }, cards),
      h('p', { class: 'hint' }, 'TAB TO FOCUS · ← → TO NAVIGATE · SWIPE OR USE CONTROLS')
    ])
  }
})
