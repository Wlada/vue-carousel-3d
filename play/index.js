/* eslint-disable */

import Vue from "vue"
import {play} from "vue-play"
import Carousel3d from "../src/Carousel3d.vue"
import Slide from "../src/Slide.vue"

play("Carousel3d", module)

const slides = [
    {
        title: 'Slide 1',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 2',
        desc: 'Lorem ipsum dolor sit amet ',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 4',
        desc: 'Lorem ipsum dolor sit amet,  Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 5',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 6',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 7',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 8',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 9',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    },
    {
        title: 'Slide 10',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
        src: 'http://placehold.it/360x270'
    }
]

play('Carousel3d', module)
    .add("default", {
        template: `<carousel-3d>
            <slide v-for="(slide, i) in slides" :index="i">
                <h1>{{slide.title}}</h1>
                <p>{{slide.desc}}</p>
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })
    .add("images", {
        template: `<carousel-3d>
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("autoplay enabled", {
        template: `<carousel-3d :autoplay="true">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("num of displayed", {
        template: `<carousel-3d :display="3">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("slides clickable", {
        template: `<carousel-3d :clickable="true">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("loop disabled", {
        template: `<carousel-3d :loop="false">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("controls visible", {
        template: `<carousel-3d :controls-visible="true">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("ltr direction", {
        template: `<carousel-3d :dir="'ltr'">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        }
    })

    .add("callbacks", {
        template: `<carousel-3d :on-slide-change="onSlideChanged" :on-slide-will-change="onSlideWillChange" :on-last-slide="onLastSlide">
            <slide v-for="(slide, i) in slides" :index="i">
                <img :src="slide.src">
            </slide>
        </carousel-3d>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slides: slides
            }
        },
        methods: {
            onSlideWillChange(index) {
                console.log('onSlideWillChange Callback Triggered', 'Slide Index ' + index)
            },
            onSlideChanged(index){
                console.log('onSlideChanged Callback Triggered', 'Slide Index ' + index)
            },
            onLastSlide(index){
                console.log('onLastSlide Callback Triggered', 'Slide Index ' + index)
            }
        }
    })

    .add("add/remove slides", {
        template: `<div>
            <carousel-3d :slides="slideCount">
                <slide v-for="(slide, i) in slideCount" :index="i">
                    <h1>Slide {{slide}}</h1>
                </slide>
            </carousel-3d>
            <button @click="addSlide">Add slide</button>
            <button @click="removeSlide">Remove slide</button>
        </div>`,
        components: {
            Carousel3d,
            Slide
        },
        data() {
            return {
                slideCount: 10
            }
        },
        methods: {
            addSlide() {
                this.slideCount++
            },
            removeSlide() {
                if (this.slideCount > 1) {
                    this.slideCount--
                }
            }
        }
    })
