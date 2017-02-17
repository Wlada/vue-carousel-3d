/* eslint-disable */
"use strict"

const Vue = require('vue');
const utils = require('../utils');

const Carousel3d = require('../../../src/Carousel3d.vue');
const Slide = require('../../../src/Slide.vue');

describe('Slide', () => {
    it('should mount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        const slideInstance = carouselInstance.$children[0];
        expect(slideInstance._isMounted).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should unmount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        const slideInstance = carouselInstance.$children[0];
        slideInstance.$destroy();
        expect(slideInstance._isDestroyed).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should return style object when 3 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide), h(Slide), h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        const slideInstance = carouselInstance.$children[0];
        const o = slideInstance.calculatePosition(0, true);

        expect(o.transform).toMatch(/translateX/);
        expect(o.top).toBe(0);

        return utils.expectToMatchSnapshot(vm);
    });
})
