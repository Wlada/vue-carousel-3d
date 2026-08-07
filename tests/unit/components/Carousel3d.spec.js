import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

function createSlides (count) {
  return Array.from({ length: count }, (_, index) => h(Slide, { index }, `Slide ${index + 1}`))
}

function mountCarousel (props = {}, slideCount = 3) {
  return mount(Carousel3d, {
    props,
    slots: {
      default: () => createSlides(slideCount)
    }
  })
}

describe('Carousel3d', () => {
  it('mounts and registers its slotted slides', () => {
    const wrapper = mountCarousel()

    expect(wrapper.vm.total).toBe(3)
    expect(wrapper.attributes('aria-roledescription')).toBe('carousel')
  })

  it('registers slides rendered from a Vue v-for fragment', () => {
    const wrapper = mount({
      components: { Carousel3d, Slide },
      data: () => ({ slides: [1, 2, 3, 4, 5] }),
      template: `
        <Carousel3d>
          <Slide v-for="(slide, index) in slides" :key="slide" :index="index" />
        </Carousel3d>
      `
    })

    expect(wrapper.findComponent(Carousel3d).vm.total).toBe(5)
  })

  it('keeps a safe index and ignores navigation when there are no slides', () => {
    const wrapper = mountCarousel({}, 0)

    wrapper.vm.goNext()
    wrapper.vm.goPrev()
    wrapper.vm.goSlide(4)

    expect(wrapper.vm.currentIndex).toBe(0)
    expect(wrapper.vm.isNextPossible).toBe(false)
    expect(wrapper.vm.isPrevPossible).toBe(false)
    expect(wrapper.emitted('before-slide-change')).toBeUndefined()
  })

  it('supports keyboard navigation and emits the existing event', async () => {
    const wrapper = mountCarousel()

    await wrapper.trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.vm.currentIndex).toBe(1)
    expect(wrapper.emitted('before-slide-change')).toEqual([[1]])
  })

  it('keeps the existing visible-slide calculation', () => {
    expect(mountCarousel({ display: 5 }, 7).vm.visible).toBe(5)
    expect(mountCarousel({ display: 5 }, 3).vm.visible).toBe(3)
  })

  it('keeps public instance navigation methods', async () => {
    const wrapper = mountCarousel({ startIndex: 1 })

    wrapper.vm.goPrev()
    expect(wrapper.vm.currentIndex).toBe(0)

    wrapper.vm.goSlide('2')
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(2)

    wrapper.vm.goNext()
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('cleans up autoplay when unmounted', () => {
    const wrapper = mountCarousel({ autoplay: true, autoplayHoverPause: false })

    expect(wrapper.vm.autoplayInterval).not.toBeNull()
    wrapper.unmount()
    expect(wrapper.vm.autoplayInterval).toBeNull()
  })
})
