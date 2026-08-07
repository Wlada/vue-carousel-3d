import { h, nextTick } from 'vue'
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

  it('applies horizonOffset to side slides', () => {
    const wrapper = mount(Carousel3d, {
      props: { horizonOffset: 20, display: 5 },
      slots: {
        default: () => Array.from({ length: 5 }, (_, index) => h(Slide, { index }))
      }
    })

    expect(wrapper.find('.right-1').attributes('style')).toContain('translateY(20px)')
    expect(wrapper.find('.left-1').attributes('style')).toContain('translateY(20px)')
  })

  it('renders only near-current content in lazy mode', async () => {
    const wrapper = mount(Carousel3d, {
      props: { lazy: true, display: 3 },
      slots: {
        default: () => Array.from({ length: 20 }, (_, index) => h(Slide, { index }, {
          default: () => h('div', { 'data-testid': `content-${index}` }, `Content ${index}`)
        }))
      }
    })

    expect(wrapper.find('[data-testid="content-0"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="content-4"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="content-5"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="content-9"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="content-19"]').exists()).toBe(true)

    wrapper.vm.goSlide(10)
    await nextTick()

    expect(wrapper.find('[data-testid="content-0"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="content-5"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="content-6"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="content-14"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="content-15"]').exists()).toBe(false)
  })
})
