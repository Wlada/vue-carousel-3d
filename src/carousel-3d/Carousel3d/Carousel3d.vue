<template>
  <div
    class="carousel-3d-container"
    :style="{ height: this.slideHeight + 'px' }"
    @touchstart="handleMousedown"
    @touchend="handleMouseup"
    @touchmove="handleMousemove"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
    @mousemove="handleMousemove"
  >
    <div
      class="carousel-3d-slider"
      :style="{
        width: this.slideWidth + 'px',
        height: this.slideHeight + 'px',
      }"
    >
      <slot />
    </div>
    <controls
      v-if="controlsVisible"
      :next-html="controlsNextHtml"
      :prev-html="controlsPrevHtml"
      :width="controlsWidth"
      :height="controlsHeight"
    ></controls>
  </div>
</template>

<script src="./Carousel3d.js" />
<style scoped lang="scss" src="./Carousel3d.scss" />
