'use strict'

const Vue = require('vue')
const utils = require('../utils')

import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

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

    it('should apply horizonOffset to side slides', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { horizonOffset: 20, display: 5 } }, [
                h(Slide, { props: { index: 0 } }),
                h(Slide, { props: { index: 1 } }),
                h(Slide, { props: { index: 2 } }),
                h(Slide, { props: { index: 3 } }),
                h(Slide, { props: { index: 4 } })
            ])
        })

        expect(vm.$el.querySelector('.right-1').style.transform).toContain('translateY(20px)')
        expect(vm.$el.querySelector('.left-1').style.transform).toContain('translateY(20px)')
    })

    it('should render only near-current content in lazy mode', async () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { lazy: true, display: 3 } }, Array.from({ length: 20 }, (_, index) =>
                h(Slide, {
                    props: { index },
                    scopedSlots: {
                        default: () => h('div', { attrs: { 'data-testid': `content-${index}` } }, `Content ${index}`)
                    }
                })
            ))
        })
        const carouselInstance = vm.$children[0]

        expect(vm.$el.querySelector('[data-testid="content-0"]')).not.toBeNull()
        expect(vm.$el.querySelector('[data-testid="content-5"]')).toBeNull()
        expect(vm.$el.querySelector('[data-testid="content-19"]')).not.toBeNull()

        carouselInstance.goSlide(10)
        await Vue.nextTick()

        expect(vm.$el.querySelector('[data-testid="content-0"]')).toBeNull()
        expect(vm.$el.querySelector('[data-testid="content-6"]')).not.toBeNull()
        expect(vm.$el.querySelector('[data-testid="content-15"]')).toBeNull()
    })
})
