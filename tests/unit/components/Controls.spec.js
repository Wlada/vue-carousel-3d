import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Carousel3d from '@/carousel-3d/Carousel3d.vue'
import Slide from '@/carousel-3d/Slide.vue'

function mountControlledCarousel () {
  return mount(Carousel3d, {
    props: { controlsVisible: true },
    slots: {
      default: () => Array.from({ length: 4 }, (_, index) => h(Slide, { index }))
    }
  })
}

describe('Controls', () => {
  it('renders accessible navigation buttons', () => {
    const wrapper = mountControlledCarousel()

    expect(wrapper.get('.prev').attributes('aria-label')).toBe('Previous slide')
    expect(wrapper.get('.next').attributes('aria-label')).toBe('Next slide')
  })

  it('uses the injected carousel context for navigation', async () => {
    const wrapper = mountControlledCarousel()

    await wrapper.get('.next').trigger('click')
    expect(wrapper.vm.currentIndex).toBe(1)

    await wrapper.get('.prev').trigger('click')
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('renders custom prev/next slot content inside the buttons', async () => {
    const wrapper = mount(Carousel3d, {
      props: { controlsVisible: true },
      slots: {
        default: () => Array.from({ length: 4 }, (_, index) => h(Slide, { index })),
        prev: () => h('span', { 'data-testid': 'custom-prev' }, 'PREV'),
        next: () => h('span', { 'data-testid': 'custom-next' }, 'NEXT')
      }
    })

    expect(wrapper.get('[data-testid="custom-prev"]').text()).toBe('PREV')
    expect(wrapper.get('[data-testid="custom-next"]').text()).toBe('NEXT')

    await wrapper.get('.next').trigger('click')
    expect(wrapper.vm.currentIndex).toBe(1)
  })
})
