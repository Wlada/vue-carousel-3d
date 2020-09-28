/* eslint-disable */
"use strict"

const Vue = require('vue');
const utils = require('../utils');
import Carousel3d from "@/carousel-3d/Carousel3d";
import Slide from "@/carousel-3d/Slide";


describe('Carousel3d', () => {
    it('should mount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance._isMounted).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should unmount successfully', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d),
        });
        const carouselInstance = vm.$children[0];
        carouselInstance.$destroy();
        expect(carouselInstance._isDestroyed).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should register 0 slides when 0 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.total).toBe(0);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should register 3 slides when 3 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {props: {}},
                [h(Slide), h(Slide), h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.total).toBe(3);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should show 5 slides when 7 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {props: { display: 5 }},
                [h(Slide), h(Slide), h(Slide), h(Slide), h(Slide), h(Slide), h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.visible).toBe(5);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should show 2 slides when 2 slides are added to the slots', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {props: { display: 3 }},
                [h(Slide), h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.visible).toBe(2);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should show 3 slides when 3 slides are added to the slots and display property is set to 5', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {props: { display: 5 }},
                [h(Slide), h(Slide), h(Slide)])
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.visible).toBe(3);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should increase current index number by 1 when goNext is called', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, {}, [h(Slide), h(Slide), h(Slide)]),
        });

        const carouselInstance = vm.$children[0];

        return carouselInstance.$nextTick().then(() => {
            carouselInstance.goNext();
            expect(carouselInstance.currentIndex).toBe(1);

            return utils.expectToMatchSnapshot(vm);
        });
    });

    it('should decrease current index number by 1 when goPrev is called', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 1 } }, [h(Slide), h(Slide), h(Slide)]),
        });

        const carouselInstance = vm.$children[0];

        return carouselInstance.$nextTick().then(() => {
            carouselInstance.goPrev();
            expect(carouselInstance.currentIndex).toBe(0);

            return utils.expectToMatchSnapshot(vm);
        });
    });

    it('should be able to go on next slide if start slide index is 0 and there are 2 slides ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 0 } }, [h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.isNextPossible).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should be able to go on prev slide if start slide index is 0, loop is enabled and there are 2 slides ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 0, loop: true } }, [h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.isPrevPossible).toBe(true);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should not be able to go on next slide if start slide index is 1, loop is disabled and there are 2 slides ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 1, loop: false } }, [h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.isNextPossible).toBe(false);

        return utils.expectToMatchSnapshot(vm);
    });

    it('should be able to go on prev slide if start slide index is 0, loop is disabled and there are 2 slides ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 0, loop: false } }, [h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        expect(carouselInstance.isPrevPossible).toBe(false);

        return utils.expectToMatchSnapshot(vm);
    });

	it('check if exact callback function is received for onMainSlideClick ', () => {

		const noop = () => {
		};

		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(Carousel3d, { props: { onMainSlideClick: noop } }, [h(Slide), h(Slide)]),
		});
		const carouselInstance = vm.$children[0];

		expect(carouselInstance.onMainSlideClick).toEqual(noop);

		return utils.expectToMatchSnapshot(vm);
	});

	it('check if exact callback function is received for onMainSlideClick ', () => {

		const returnTrue = () => {
			return true;
		};

		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(Carousel3d, { props: { onMainSlideClick: returnTrue } }, [h(Slide), h(Slide)]),
		});
		const carouselInstance = vm.$children[0];

		const result = carouselInstance.onMainSlideClick();

		expect(result).toBe(true);

		return utils.expectToMatchSnapshot(vm);
	});

    it('should not change current slide index if computeData called and total number of slides have not change and in of bounds ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 0, loop: false } }, [h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        return carouselInstance.$nextTick().then(() => {
            carouselInstance.goNext();
            carouselInstance.computeData();
            expect(carouselInstance.$data.currentIndex).toBe(1);

            return utils.expectToMatchSnapshot(vm);
        });
    });

    it('should change current slide index if computeData called and current slide index falls out of bounds ', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Carousel3d, { props: { startIndex: 0, loop: false } }, [h(Slide), h(Slide), h(Slide)]),
        });
        const carouselInstance = vm.$children[0];
        return carouselInstance.$nextTick().then(() => {
            carouselInstance.goSlide(2);
            carouselInstance.$slots.default.pop();
            carouselInstance.computeData();
            expect(carouselInstance.$data.currentIndex).toBe(0);

            return utils.expectToMatchSnapshot(vm);
        });
    });

})
