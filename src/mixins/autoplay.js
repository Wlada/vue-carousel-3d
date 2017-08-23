const autoplay = {
    props: {
        /**
         * Flag to enable autoplay
         */
        autoplay: {
            type: Boolean,
            default: false
        },
        /**
         * Time elapsed before next slide
         */
        autoplayTimeout: {
            type: Number,
            default: 2000
        },
        /**
         * Flag to pause autoplay on hover
         */
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
    destroyed () {
        if (!this.$isServer) {
            this.$el.removeEventListener('mouseenter', this.pauseAutoplay)
            this.$el.removeEventListener('mouseleave', this.startAutoplay)
            this.$el.removeEventListener('touchstart', this.pauseAutoplay)
            this.$el.removeEventListener('touchend', this.startAutoplay)
        }
    },
    methods: {
        pauseAutoplay () {
            if (this.autoplayInterval) {
                this.autoplayInterval = clearInterval(this.autoplayInterval)
            }
        },
        startAutoplay () {
            if (this.autoplay) {
                this.autoplayInterval = setInterval(() => {
                    this.dir === 'ltr' ? this.goPrev() : this.goNext()
                }, this.autoplayTimeout)
            }
        }
    },
    mounted () {
        if (!this.$isServer && this.autoplayHoverPause) {
            this.$el.addEventListener('mouseenter', this.pauseAutoplay)
            this.$el.addEventListener('mouseleave', this.startAutoplay)
            this.$el.removeEventListener('touchstart', this.pauseAutoplay)
            this.$el.removeEventListener('touchend', this.startAutoplay)
        }

        this.startAutoplay()
    }
}

export default autoplay
