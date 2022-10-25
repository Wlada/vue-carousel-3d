<template>
  <div class="carousel-3d-controls">
    <a
      href="#"
      class="prev"
      @click.prevent="parent.goPrev()"
      :class="{ disabled: !parent.isPrevPossible }"
      :style="`width: ${width}px; height: ${height}px; line-height: ${height}px;`"
      aria-label="Previous slide"
    >
      <span v-html="prevHtml"></span>
    </a>
    <a
      href="#"
      class="next"
      @click.prevent="parent.goNext()"
      :class="{ disabled: !parent.isNextPossible }"
      :style="`width: ${width}px; height: ${height}px; line-height: ${height}px;`"
      aria-label="Next slide"
    >
      <span v-html="nextHtml" />
    </a>
  </div>
</template>

<script src="./Controls.js" />
<style scoped lang="scss" src="./Controls.scss" />
