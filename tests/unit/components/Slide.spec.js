import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

function mountCarouselWithSlides () {
  return mount(Carousel3d, {
    slots: {
      default: () => Array.from({ length: 3 }, (_, index) => h(Slide, { index }, {
        default: (props) => h('div', {
          'data-index': props.index,
          'data-is-current': String(props.isCurrent)
        }, `Slide ${index + 1}`)
      }))
    }
  })
}

describe('Slide', () => {
  it('receives carousel state through injection', () => {
    const wrapper = mountCarouselWithSlides()
    const slides = wrapper.findAllComponents(Slide)

    expect(slides).toHaveLength(3)
    expect(slides[0].vm.parent).toBe(wrapper.vm)
    expect(slides[0].get('[data-is-current]').attributes('data-is-current')).toBe('true')
  })

  it('keeps visible side slides clickable', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarouselWithSlides()
    const slides = wrapper.findAll('.carousel-3d-slide')

    await slides[1].trigger('click')
    await vi.advanceTimersByTimeAsync(0)

    expect(wrapper.vm.currentIndex).toBe(1)
    wrapper.unmount()
    vi.useRealTimers()
  })
})
