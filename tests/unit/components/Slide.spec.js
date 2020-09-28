/* eslint-disable */
'use strict'

const Vue = require('vue')
const utils = require('../utils')

import Carousel3d from "@/carousel-3d/Carousel3d";
import Slide from "@/carousel-3d/Slide";

describe('Slide', () => {
    it('should mount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide)])
        })
        const carouselInstance = vm.$children[0]
        const slideInstance = carouselInstance.$children[0]
        expect(slideInstance._isMounted).toBe(true)

        return utils.expectToMatchSnapshot(vm)
    })

    it('should unmount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide)])
        })
        const carouselInstance = vm.$children[0]
        const slideInstance = carouselInstance.$children[0]
        slideInstance.$destroy()
        expect(slideInstance._isDestroyed).toBe(true)

        return utils.expectToMatchSnapshot(vm)
    })

    it('should return style object when 3 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide), h(Slide), h(Slide)])
        })
        const carouselInstance = vm.$children[0]
        const slideInstance = carouselInstance.$children[0]
        const o = slideInstance.calculatePosition(0, true)

        expect(o.transform).toMatch(/translateX/)
        expect(o.top).toBe(0)

        return utils.expectToMatchSnapshot(vm)
    })

    it('should render a scoped slot', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, Array.apply(null, { length: 5 }).map((k, index) => h(Slide, {
                /* adds the index prop */
                props: {
                    index: index
                },
                /* add a default scoped slot */
                scopedSlots: {
                    default: props => h('div', {
                        attrs: {
                            /* with left and right data attrs */
                            'data-left-index': props.leftIndex,
                            'data-right-index': props.rightIndex,
                            'data-index': props.index,
                            'data-is-current': props.isCurrent
                        }
                    }, index)
                }
            })))
        })

        return utils.expectToMatchSnapshot(vm)
    })
})
