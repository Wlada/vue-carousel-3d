<template>
  <div class="carousel-3d-container" :style="{height: slideHeight + 'px'}"
       role="region" aria-roledescription="carousel" :aria-label="ariaLabel"
       tabindex="0" @keydown.left.prevent="goPrev" @keydown.right.prevent="goNext">
    <div class="carousel-3d-slider" :style="{width: slideWidth + 'px', height: slideHeight + 'px'}">
      <slot></slot>
    </div>
    <controls v-if="controlsVisible" :next-html="controlsNextHtml" :prev-html="controlsPrevHtml"
              :width="controlsWidth" :height="controlsHeight"></controls>
  </div>
</template>

<script>
import { Comment, Fragment, Text } from 'vue'
import {
  getOutIndex,
  getSafeIndex,
  getSideIndices,
  getStartIndex,
  getVisibleSlideCount
} from '@/carousel-3d/core/carousel.js'
import autoplay from '@/carousel-3d/mixins/autoplay.js'
import Controls from '@/carousel-3d/Controls.vue'

const isBrowser = typeof window !== 'undefined'

const noop = () => {
}

function countSlides (nodes) {
  return nodes.reduce((count, node) => {
    if (node.type === Fragment && Array.isArray(node.children)) {
      return count + countSlides(node.children)
    }

    return node.type === Comment || node.type === Text ? count : count + 1
  }, 0)
}

export default {
  name: 'carousel3d',
  components: {
    Controls
  },
  emits: ['after-slide-change', 'before-slide-change', 'last-slide'],
  provide () {
    return {
      carousel: this
    }
  },
  props: {
    count: {
      type: [Number, String],
      default: 0
    },
    perspective: {
      type: [Number, String],
      default: 35
    },
    display: {
      type: [Number, String],
      default: 5
    },
    loop: {
      type: Boolean,
      default: true
    },
    animationSpeed: {
      type: [Number, String],
      default: 500
    },
    dir: {
      type: String,
      default: 'rtl'
    },
    width: {
      type: [Number, String],
      default: 360
    },
    height: {
      type: [Number, String],
      default: 270
    },
    border: {
      type: [Number, String],
      default: 1
    },
    space: {
      type: [Number, String],
      default: 'auto'
    },
    startIndex: {
      type: [Number, String],
      default: 0
    },
    clickable: {
      type: Boolean,
      default: true
    },
    disable3d: {
      type: Boolean,
      default: false
    },
    minSwipeDistance: {
      type: Number,
      default: 10
    },
    inverseScaling: {
      type: [Number, String],
      default: 300
    },
    controlsVisible: {
      type: Boolean,
      default: false
    },
    controlsPrevHtml: {
      type: String,
      default: '&lsaquo;'
    },
    controlsNextHtml: {
      type: String,
      default: '&rsaquo;'
    },
    controlsWidth: {
      type: [String, Number],
      default: 50
    },
    controlsHeight: {
      type: [String, Number],
      default: 50
    },
    onLastSlide: {
      type: Function,
      default: noop
    },
    onSlideChange: {
      type: Function,
      default: noop
    },
    bias: {
      type: String,
      default: 'left'
    },
    onMainSlideClick: {
      type: Function,
      default: noop
    },
    oneDirectional: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: '3D carousel'
    }
  },
  data () {
    return {
      viewport: 0,
      currentIndex: 0,
      total: 0,
      dragOffsetX: 0,
      dragStartX: 0,
      dragOffsetY: 0,
      dragStartY: 0,
      mousedown: false,
      zIndex: 998,
      animationTimer: null,
      navigationTimers: []
    }
  },
  mixins: [
    autoplay
  ],
  watch: {
    count () {
      this.computeData()
    }
  },
  created () {
    this.computeSlideData(true)
  },
  computed: {
    isLastSlide () {
      return this.currentIndex === this.total - 1
    },
    isFirstSlide () {
      return this.currentIndex === 0
    },
    isNextPossible () {
      return this.total > 0 && !(!this.loop && this.isLastSlide)
    },
    isPrevPossible () {
      return this.total > 0 && !(!this.loop && this.isFirstSlide)
    },
    slideWidth () {
      const vw = this.viewport
      const sw = parseInt(this.width) + (parseInt(this.border, 10) * 2)

      return vw > 0 && vw < sw && isBrowser ? vw : sw
    },
    slideHeight () {
      const sw = parseInt(this.width, 10) + (parseInt(this.border, 10) * 2)
      const sh = parseInt(parseInt(this.height) + (this.border * 2), 10)
      const ar = this.calculateAspectRatio(sw, sh)

      return this.slideWidth / ar
    },
    visible () {
      return getVisibleSlideCount(this.display, this.total)
    },
    hasHiddenSlides () {
      return this.total > this.visible
    },
    leftIndices () {
      return getSideIndices({
        currentIndex: this.currentIndex,
        total: this.total,
        visible: this.visible,
        bias: this.bias,
        dir: this.dir,
        side: 'left'
      })
    },
    rightIndices () {
      return getSideIndices({
        currentIndex: this.currentIndex,
        total: this.total,
        visible: this.visible,
        bias: this.bias,
        dir: this.dir,
        side: 'right'
      })
    },
    leftOutIndex () {
      return getOutIndex({
        currentIndex: this.currentIndex,
        total: this.total,
        visible: this.visible,
        bias: this.bias,
        dir: this.dir,
        side: 'left'
      })
    },
    rightOutIndex () {
      return getOutIndex({
        currentIndex: this.currentIndex,
        total: this.total,
        visible: this.visible,
        bias: this.bias,
        dir: this.dir,
        side: 'right'
      })
    }
  },
  methods: {
    /**
     * Go to next slide
     */
    goNext () {
      if (this.total > 0 && this.isNextPossible) {
        this.isLastSlide ? this.goSlide(0) : this.goSlide(this.currentIndex + 1)
      }
    },
    /**
     * Go to previous slide
     */
    goPrev () {
      if (this.total > 0 && this.isPrevPossible) {
        this.isFirstSlide ? this.goSlide(this.total - 1) : this.goSlide(this.currentIndex - 1)
      }
    },
    /**
     * Go to slide
     * @param  {String} index of slide where to go
     */
    goSlide (index) {
      if (this.total <= 0) return

      this.currentIndex = getSafeIndex(index, this.total)

      if (this.isLastSlide) {
        if (this.onLastSlide !== noop) {
          console.warn('onLastSlide deprecated, please use @last-slide')
        }
        this.onLastSlide(this.currentIndex)

        this.$emit('last-slide', this.currentIndex)
      }

      this.$emit('before-slide-change', this.currentIndex)

      clearTimeout(this.animationTimer)
      this.animationTimer = setTimeout(() => {
        this.animationTimer = null
        this.animationEnd()
      }, parseInt(this.animationSpeed, 10))
    },
    /**
     * Go to slide far slide
     */
    goFar (index) {
      this.clearNavigationTimers()

      let diff = (index === this.total - 1 && this.isFirstSlide) ? -1 : (index - this.currentIndex)

      if (this.isLastSlide && index === 0) {
        diff = 1
      }

      const diff2 = (diff < 0) ? -diff : diff
      let timeBuff = 0
      let i = 0

      while (i < diff2) {
        i += 1
        const timeout = (diff2 === 1) ? 0 : (timeBuff)

        const timer = setTimeout(() => {
          diff < 0 ? this.goPrev() : this.goNext()
        }, timeout)
        this.navigationTimers.push(timer)

        timeBuff += (this.animationSpeed / (diff2))
      }
    },
    clearNavigationTimers () {
      this.navigationTimers.forEach((timer) => clearTimeout(timer))
      this.navigationTimers = []
    },
    /**
     * Trigger actions when animation ends
     */
    animationEnd () {
      if (this.onSlideChange !== noop) {
        console.warn('onSlideChange deprecated, please use @after-slide-change')
      }
      this.onSlideChange(this.currentIndex)

      this.$emit('after-slide-change', this.currentIndex)
    },
    /**
     * Trigger actions when mouse is released
     * @param  {Object} e The event object
     */
    handleMouseup () {
      this.mousedown = false
      this.dragOffsetX = 0
      this.dragOffsetY = 0
    },
    /**
     * Trigger actions when mouse is pressed
     * @param  {Object} e The event object
     */
    handleMousedown (e) {
      if (!e.touches && e.cancelable) {
        e.preventDefault()
      }

      const point = this.getEventPoint(e)
      if (!point) return

      this.mousedown = true
      this.dragStartX = point.clientX
      this.dragStartY = point.clientY
    },
    /**
     * Trigger actions when mouse is pressed and then moved (mouse drag)
     * @param  {Object} e The event object
     */
    handleMousemove (e) {
      if (!this.mousedown) {
        return
      }

      const point = this.getEventPoint(e)
      if (!point) return

      const eventPosX = point.clientX
      const eventPosY = point.clientY
      const deltaX = (this.dragStartX - eventPosX)
      const deltaY = (this.dragStartY - eventPosY)

      this.dragOffsetX = deltaX
      this.dragOffsetY = deltaY

      // If the swipe is more significant on the Y axis, do not move the slides because this is a scroll gesture
      if (Math.abs(this.dragOffsetY) > Math.abs(this.dragOffsetX)) {
        return
      }

      if (this.dragOffsetX > this.minSwipeDistance) {
        this.handleMouseup()
        this.goNext()
      } else if (this.dragOffsetX < -this.minSwipeDistance) {
        this.handleMouseup()
        this.goPrev()
      }
    },
    getEventPoint (e) {
      return (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e
    },
    addInteractionListeners () {
      if (window.PointerEvent) {
        this.$el.addEventListener('pointerdown', this.handleMousedown)
        this.$el.addEventListener('pointerup', this.handleMouseup)
        this.$el.addEventListener('pointercancel', this.handleMouseup)
        this.$el.addEventListener('pointerleave', this.handleMouseup)
        this.$el.addEventListener('pointermove', this.handleMousemove)
        return
      }

      this.$el.addEventListener('touchstart', this.handleMousedown)
      this.$el.addEventListener('touchend', this.handleMouseup)
      this.$el.addEventListener('touchcancel', this.handleMouseup)
      this.$el.addEventListener('touchmove', this.handleMousemove)
      this.$el.addEventListener('mousedown', this.handleMousedown)
      this.$el.addEventListener('mouseup', this.handleMouseup)
      this.$el.addEventListener('mouseleave', this.handleMouseup)
      this.$el.addEventListener('mousemove', this.handleMousemove)
    },
    removeInteractionListeners () {
      if (window.PointerEvent) {
        this.$el.removeEventListener('pointerdown', this.handleMousedown)
        this.$el.removeEventListener('pointerup', this.handleMouseup)
        this.$el.removeEventListener('pointercancel', this.handleMouseup)
        this.$el.removeEventListener('pointerleave', this.handleMouseup)
        this.$el.removeEventListener('pointermove', this.handleMousemove)
        return
      }

      this.$el.removeEventListener('touchstart', this.handleMousedown)
      this.$el.removeEventListener('touchend', this.handleMouseup)
      this.$el.removeEventListener('touchcancel', this.handleMouseup)
      this.$el.removeEventListener('touchmove', this.handleMousemove)
      this.$el.removeEventListener('mousedown', this.handleMousedown)
      this.$el.removeEventListener('mouseup', this.handleMouseup)
      this.$el.removeEventListener('mouseleave', this.handleMouseup)
      this.$el.removeEventListener('mousemove', this.handleMousemove)
    },
    /**
     * A mutation observer is used to detect changes to the containing node
     * in order to keep the magnet container in sync with the height its reference node.
     */
    attachMutationObserver () {
      const MutationObserver = window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver

      if (MutationObserver) {
        const config = {
          childList: true,
          characterData: true,
          subtree: true
        }

        this.mutationObserver = new MutationObserver(() => {
          this.$nextTick(() => {
            this.computeData()
          })
        })

        if (this.$el) {
          this.mutationObserver.observe(this.$el, config)
        }
      }
    },

    detachMutationObserver () {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
      }
    },
    /**
     * Get the number of slides
     * @return {Number} Number of slides
     */
    getSlideCount () {
      const defaultSlot = this.$slots.default
      if (!defaultSlot) return 0

      return countSlides(defaultSlot())
    },
    /**
     * Calculate slide with and keep defined aspect ratio
     * @return {Number} Aspect ratio number
     */
    calculateAspectRatio (width, height) {
      return Math.min(width / height)
    },
    /**
     * Re-compute the number of slides and current slide
     */
    computeSlideData (firstRun) {
      this.total = this.getSlideCount()
      if (this.total === 0) {
        this.currentIndex = 0
        return
      }

      if (firstRun || this.currentIndex >= this.total) {
        this.currentIndex = getStartIndex(this.startIndex, this.total)
      }
    },
    computeData (firstRun) {
      this.computeSlideData(firstRun)

      this.viewport = this.$el.clientWidth
    },
    setSize () {
      this.viewport = this.$el.clientWidth
      this.$el.style.height = this.slideHeight + 'px'
      const slider = this.$el.querySelector('.carousel-3d-slider')
      if (slider) {
        slider.style.width = this.slideWidth + 'px'
        slider.style.height = this.slideHeight + 'px'
      }
    }
  },

  mounted () {
    if (isBrowser) {
      this.computeData(true)
      this.attachMutationObserver()
      window.addEventListener('resize', this.setSize)

      this.addInteractionListeners()
    }
  },

  beforeUnmount () {
    if (isBrowser) {
      this.detachMutationObserver()
      this.removeInteractionListeners()
      window.removeEventListener('resize', this.setSize)
    }

    clearTimeout(this.animationTimer)
    this.clearNavigationTimers()
  }
}
</script>

<style scoped>
.carousel-3d-container {
  min-height: 1px;
  width: 100%;
  position: relative;
  z-index: 0;
  overflow: hidden;
  touch-action: pan-y;
  margin: 20px auto;
  box-sizing: border-box;
}

.carousel-3d-slider {
  position: relative;
  margin: 0 auto;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  perspective: 1000px;
}

</style>
