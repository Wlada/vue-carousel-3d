<template>
  <div class="carousel-3d-dots" :class="`carousel-3d-dots--${position}`" role="group"
       :aria-label="`Slide navigation (${total} slides)`">
    <button
      v-for="i in total"
      :key="i"
      type="button"
      class="carousel-3d-dot"
      :class="{ 'is-active': i - 1 === currentIndex }"
      :aria-label="`Go to slide ${i} of ${total}`"
      :aria-current="i - 1 === currentIndex ? 'true' : undefined"
      @click="parent.goSlide(i - 1)"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'carousel-3d-dots',
  props: {
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      parent: this.$parent
    }
  },
  computed: {
    total () {
      return this.parent.total
    },
    currentIndex () {
      return this.parent.currentIndex
    }
  }
}
</script>

<style scoped>
.carousel-3d-dots {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 900;
  pointer-events: none;
}

.carousel-3d-dots--bottom {
  bottom: 14px;
}

.carousel-3d-dots--top {
  top: 14px;
}

.carousel-3d-dot {
  pointer-events: auto;
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: background-color 200ms ease;
}

.carousel-3d-dot:hover {
  background: rgba(0, 0, 0, 0.55);
}

.carousel-3d-dot.is-active {
  background: rgba(0, 0, 0, 0.85);
}
</style>
