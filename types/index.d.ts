import type Vue from 'vue'
import type { PluginObject, VueConstructor } from 'vue'

export interface Carousel3dInstance extends Vue {
  currentIndex: number
  total: number
  goNext(): void
  goPrev(): void
  goSlide(index: number | string): void
  goFar(index: number): void
  startAutoplay(): void
  pauseAutoplay(): void
}

export interface Carousel3dProps {
  count?: number | string
  perspective?: number | string
  display?: number | string
  loop?: boolean
  animationSpeed?: number | string
  dir?: 'rtl' | 'ltr'
  width?: number | string
  height?: number | string
  border?: number | string
  space?: number | string
  startIndex?: number | string
  clickable?: boolean
  disable3d?: boolean
  minSwipeDistance?: number
  inverseScaling?: number | string
  controlsVisible?: boolean
  controlsPrevHtml?: string
  controlsNextHtml?: string
  controlsWidth?: number | string
  controlsHeight?: number | string
  dots?: boolean
  dotsPosition?: 'bottom' | 'top'
  horizonOffset?: number | string
  lazy?: boolean
  beforeSlideChange?: (index: number, fromIndex: number) => boolean
  oneDirectional?: boolean
  ariaLabel?: string
  autoplay?: boolean
  autoplayTimeout?: number
  autoplayHoverPause?: boolean
}

declare const VueCarousel3d: PluginObject<never>

export default VueCarousel3d
export const Carousel3d: VueConstructor<Carousel3dInstance>
export const Slide: VueConstructor
