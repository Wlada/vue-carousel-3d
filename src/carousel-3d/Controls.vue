<template>
  <div class="carousel-3d-controls">
    <a href="#" class="prev" @click.prevent="parent.goPrev()"
       :class="{ disabled: !parent.isPrevPossible }"
       :style="`width: ${width}px; height: ${height}px; line-height: ${height}px;`"
       aria-label="Previous slide">
      <span v-html="prevHtml"></span>
    </a>
    <a href="#" class="next" @click.prevent="parent.goNext()"
       :class="{ disabled: !parent.isNextPossible }"
       :style="`width: ${width}px; height: ${height}px; line-height: ${height}px;`"
       aria-label="Next slide">
      <span v-html="nextHtml"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'controls',
  props: {
    /**
     * Width in pixels of the navigation buttons
     */
    width: {
      type: [String, Number],
      default: 50
    },
    /**
     * Height in pixels of the navigation buttons
     */
    height: {
      type: [String, Number],
      default: 60
    },
    /**
     * Text content of the navigation prev button
     */
    prevHtml: {
      type: String,
      default: '&lsaquo;'
    },
    /**
     * Text content of the navigation next button
     */
    nextHtml: {
      type: String,
      default: '&rsaquo;'
    }
  },
  data () {
    return {
      parent: this.$parent
    }
  }
}
</script>

<style scoped>
.carousel-3d-controls {
  position: absolute;
  top: 50%;
  height: 0;
  margin-top: -30px;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.next, .prev {
  width: 60px;
  position: absolute;
  z-index: 1010;
  font-size: 60px;
  height: 60px;
  line-height: 60px;
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
  top: 0;
}

.next:hover, .prev:hover {
  cursor: pointer;
  opacity: 0.7;
}

.prev {
  left: 10px;
  text-align: left;
}

.next {
  right: 10px;
  text-align: right;
}

.disabled {
  opacity: 0.2;
  cursor: default;
}

.disabled:hover {
  cursor: default;
  opacity: 0.2;
}
</style>
