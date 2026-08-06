import type Vue from 'vue'
import type { PluginObject, VueConstructor } from 'vue'

export interface Carousel3dInstance extends Vue {
  currentIndex: number
  total: number
  goNext(): void
  goPrev(): void
  goSlide(index: number | string): void
  goFar(index: number): void
}

declare const VueCarousel3d: PluginObject<never>

export default VueCarousel3d
export const Carousel3d: VueConstructor<Carousel3dInstance>
export const Slide: VueConstructor
