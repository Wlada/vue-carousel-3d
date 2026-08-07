import Slide from '@/carousel-3d/Slide.vue'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'

const install = (app) => {
    app.component('carousel3d', Carousel3d)
    app.component('slide', Slide)
}

export default {
    install
}

export {
    Carousel3d,
    Slide
}
