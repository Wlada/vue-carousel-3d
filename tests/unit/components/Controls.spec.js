/* eslint-disable */
"use strict"

const Vue = require('vue');
const utils = require('../utils');

import Carousel3d from "@/carousel-3d/Carousel3d";
import Slide from "@/carousel-3d/Slide";

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
})
