const isBrowser = typeof window !== 'undefined'

const autoplay = {
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayTimeout: {
      type: Number,
      default: 2000
    },
    autoplayHoverPause: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      autoplayInterval: null
    }
  },
  mounted () {
    if (!isBrowser) return

    if (this.autoplayHoverPause) {
      this.$el.addEventListener('mouseenter', this.pauseAutoplay)
      this.$el.addEventListener('mouseleave', this.startAutoplay)
    }

    this.startAutoplay()
  },
  beforeUnmount () {
    if (!isBrowser) return

    this.pauseAutoplay()

    if (this.autoplayHoverPause) {
      this.$el.removeEventListener('mouseenter', this.pauseAutoplay)
      this.$el.removeEventListener('mouseleave', this.startAutoplay)
    }
  },
  methods: {
    pauseAutoplay () {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    },
    startAutoplay () {
      this.pauseAutoplay()

      if (this.autoplay) {
        this.autoplayInterval = setInterval(() => {
          this.dir === 'ltr' ? this.goPrev() : this.goNext()
        }, this.autoplayTimeout)
      }
    }
  }
}

export default autoplay
