"use strict"

const Vue = require('vue');
const utils = require('../utils');

import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

describe('Controls', () => {
    let vm;
    let carouselInstance;
    let $controls;

    beforeEach(() => {
        vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { controlsVisible: true } }, [h(Slide), h(Slide), h(Slide),  h(Slide)]),
        });
        carouselInstance = vm.$children[0];
        $controls = vm.$el.querySelector('.carousel-3d-controls');
    });

    it('should mount successfully', () => {
        expect($controls).toBeDefined();

        return utils.expectToMatchSnapshot(vm);
    });

    it('should render a next button', () => {
        expect(vm.$el.querySelector('.next')).toBeDefined();

        return utils.expectToMatchSnapshot(vm);
    });

    it('should render a prev button', () => {
        expect(vm.$el.querySelector('.prev')).toBeDefined();

        return utils.expectToMatchSnapshot(vm);
    });

    it('should trigger onNext when next is clicked', () => {
        vm.$el.querySelector('.next').click();

        return carouselInstance.$nextTick().then(() => {
            expect(carouselInstance.currentIndex).toBe(1);

            return utils.expectToMatchSnapshot(vm);
        });
    });

    it('should trigger onNext when next is clicked', () => {
        vm.$el.querySelector('.prev').click();

        return carouselInstance.$nextTick().then(() => {
            expect(carouselInstance.currentIndex).toBe(3);

            return utils.expectToMatchSnapshot(vm);
        });
    });

    it('should render custom prev/next slot content inside the buttons', async () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {
                props: { controlsVisible: true },
                scopedSlots: {
                    prev: () => h('span', { attrs: { 'data-testid': 'custom-prev' } }, 'PREV'),
                    next: () => h('span', { attrs: { 'data-testid': 'custom-next' } }, 'NEXT')
                }
            }, [
                h(Slide, { props: { index: 0 } }),
                h(Slide, { props: { index: 1 } }),
                h(Slide, { props: { index: 2 } }),
                h(Slide, { props: { index: 3 } })
            ])
        });
        const carouselInstance = vm.$children[0];

        expect(vm.$el.querySelector('[data-testid="custom-prev"]').textContent).toBe('PREV');
        expect(vm.$el.querySelector('[data-testid="custom-next"]').textContent).toBe('NEXT');

        vm.$el.querySelector('.next').click();
        await Vue.nextTick();

        expect(carouselInstance.currentIndex).toBe(1);
    });
})
