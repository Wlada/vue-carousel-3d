import Slide from "@/carousel-3d/Slide";
import Carousel3d from "@/carousel-3d/Carousel3d";

const install = (Vue) => {
    Vue.component('carousel3d', Carousel3d)
    Vue.component('slide', Slide)
}

export default {
    install
}

export {
    Carousel3d,
    Slide
}
