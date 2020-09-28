<template>
  <div class="carousel-3d-container" :style="{height: this.slideHeight + 'px'}">
    <div class="carousel-3d-slider" :style="{width: this.slideWidth + 'px', height: this.slideHeight + 'px'}">
      <slot></slot>
    </div>
    <controls v-if="controlsVisible" :next-html="controlsNextHtml" :prev-html="controlsPrevHtml"
              :width="controlsWidth" :height="controlsHeight"></controls>
  </div>
</template>

<script>
import autoplay from "@/carousel-3d/mixins/autoplay";
import Controls from "@/carousel-3d/Controls";

const noop = () => {
}

export default {
  name: 'carousel3d',
  components: {
    Controls
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
      zIndex: 998
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
  computed: {
    isLastSlide () {
      return this.currentIndex === this.total - 1
    },
    isFirstSlide () {
      return this.currentIndex === 0
    },
    isNextPossible () {
      return !(!this.loop && this.isLastSlide)
    },
    isPrevPossible () {
      return !(!this.loop && this.isFirstSlide)
    },
    slideWidth () {
      const vw = this.viewport
      const sw = parseInt(this.width) + (parseInt(this.border, 10) * 2)

      return vw < sw && process.browser ? vw : sw
    },
    slideHeight () {
      const sw = parseInt(this.width, 10) + (parseInt(this.border, 10) * 2)
      const sh = parseInt(parseInt(this.height) + (this.border * 2), 10)
      const ar = this.calculateAspectRatio(sw, sh)

      return this.slideWidth / ar
    },
    visible () {
      const v = (this.display > this.total) ? this.total : this.display
      return v
    },
    hasHiddenSlides () {
      return this.total > this.visible
    },
    leftIndices () {
      let n = (this.visible - 1) / 2

      n = (this.bias.toLowerCase() === 'left' ? Math.ceil(n) : Math.floor(n))

      const indices = []

      for (let m = 1; m <= n; m++) {
        indices.push((this.dir === 'ltr')
            ? (this.currentIndex + m) % (this.total)
            : (this.currentIndex - m) % (this.total))
      }

      return indices
    },
    rightIndices () {
      let n = (this.visible - 1) / 2

      n = (this.bias.toLowerCase() === 'right' ? Math.ceil(n) : Math.floor(n))
      const indices = []

      for (let m = 1; m <= n; m++) {
        indices.push((this.dir === 'ltr')
            ? (this.currentIndex - m) % (this.total)
            : (this.currentIndex + m) % (this.total))
      }

      return indices
    },
    leftOutIndex () {
      let n = (this.visible - 1) / 2

      n = (this.bias.toLowerCase() === 'left' ? Math.ceil(n) : Math.floor(n))
      n++

      if (this.dir === 'ltr') {
        return ((this.total - this.currentIndex - n) <= 0)
            ? (-parseInt(this.total - this.currentIndex - n))
            : (this.currentIndex + n)
      } else {
        return (this.currentIndex - n)
      }
    },
    rightOutIndex () {
      let n = (this.visible - 1) / 2

      n = (this.bias.toLowerCase() === 'right' ? Math.ceil(n) : Math.floor(n))
      n++

      if (this.dir === 'ltr') {
        return (this.currentIndex - n)
      } else {
        return ((this.total - this.currentIndex - n) <= 0)
            ? (-parseInt(this.total - this.currentIndex - n, 10))
            : (this.currentIndex + n)
      }
    }
  },
  methods: {
    /**
     * Go to next slide
     */
    goNext () {
      if (this.isNextPossible) {
        this.isLastSlide ? this.goSlide(0) : this.goSlide(this.currentIndex + 1)
      }
    },
    /**
     * Go to previous slide
     */
    goPrev () {
      if (this.isPrevPossible) {
        this.isFirstSlide ? this.goSlide(this.total - 1) : this.goSlide(this.currentIndex - 1)
      }
    },
    /**
     * Go to slide
     * @param  {String} index of slide where to go
     */
    goSlide (index) {
      this.currentIndex = (index < 0 || index > this.total - 1) ? 0 : index

      if (this.isLastSlide) {
        if (this.onLastSlide !== noop) {
          console.warn('onLastSlide deprecated, please use @last-slide')
        }
        this.onLastSlide(this.currentIndex)

        this.$emit('last-slide', this.currentIndex)
      }

      this.$emit('before-slide-change', this.currentIndex)

      setTimeout(() => this.animationEnd(), this.animationSpeed)
    },
    /**
     * Go to slide far slide
     */
    goFar (index) {
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

        setTimeout(() => (diff < 0) ? this.goPrev(diff2) : this.goNext(diff2), timeout)

        timeBuff += (this.animationSpeed / (diff2))
      }
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
      if (!e.touches) {
        e.preventDefault()
      }

      this.mousedown = true
      this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
      this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
    },
    /**
     * Trigger actions when mouse is pressed and then moved (mouse drag)
     * @param  {Object} e The event object
     */
    handleMousemove (e) {
      if (!this.mousedown) {
        return
      }

      const eventPosX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
      const eventPosY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
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
          attributes: true,
          childList: true,
          characterData: true
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
      if (this.$slots.default !== undefined) {
        return this.$slots.default.filter((value) => {
          return value.tag !== void 0
        }).length
      }

      return 0
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
    computeData (firstRun) {
      this.total = this.getSlideCount()
      if (firstRun || this.currentIndex >= this.total) {
        this.currentIndex = parseInt(this.startIndex) > this.total - 1 ? this.total - 1 : parseInt(this.startIndex)
      }

      this.viewport = this.$el.clientWidth
    },
    setSize () {
      this.$el.style.cssText += 'height:' + this.slideHeight + 'px;'
      this.$el.childNodes[0].style.cssText += 'width:' + this.slideWidth + 'px;' + ' height:' + this.slideHeight + 'px;'
    }
  },

  mounted () {
    if (!process.server) {
      this.computeData(true)
      this.attachMutationObserver()
      window.addEventListener('resize', this.setSize)

      if ('ontouchstart' in window) {
        this.$el.addEventListener('touchstart', this.handleMousedown)
        this.$el.addEventListener('touchend', this.handleMouseup)
        this.$el.addEventListener('touchmove', this.handleMousemove)
      } else {
        this.$el.addEventListener('mousedown', this.handleMousedown)
        this.$el.addEventListener('mouseup', this.handleMouseup)
        this.$el.addEventListener('mousemove', this.handleMousemove)
      }
    }
  },

  beforeDestroy () {
    if (!process.server) {
      this.detachMutationObserver()

      if ('ontouchstart' in window) {
        this.$el.removeEventListener('touchmove', this.handleMousemove)
      } else {
        this.$el.removeEventListener('mousemove', this.handleMousemove)
      }

      window.removeEventListener('resize', this.setSize)
    }
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
