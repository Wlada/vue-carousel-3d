import type { Component, ComponentPublicInstance, Plugin } from 'vue'

export interface Carousel3dInstance extends ComponentPublicInstance {
  currentIndex: number
  total: number
  goNext(): void
  goPrev(): void
  goSlide(index: number | string): void
  goFar(index: number): void
}

declare const VueCarousel3d: Plugin

export default VueCarousel3d
export const Carousel3d: Component
export const Slide: Component
