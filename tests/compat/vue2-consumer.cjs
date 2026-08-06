const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const { Carousel3d, Slide } = require('vue-carousel-3d')

const app = new Vue({
  render: (h) => h(Carousel3d, {}, [
    h(Slide, { props: { index: 0 } }, ['First']),
    h(Slide, { props: { index: 1 } }, ['Second'])
  ])
})

createRenderer().renderToString(app).then((html) => {
  if (!html.includes('First') || !html.includes('aria-label="1 of 2"')) {
    throw new Error('Packaged Vue 2 SSR smoke test produced unexpected HTML')
  }
})
