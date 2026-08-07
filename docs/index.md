---
layout: home

hero:
  name: "Vue Carousel 3D"
  text: "Depth without the dead weight."
  tagline: A compact, touch-friendly 3D carousel for Vue 3 — with accessible controls and a tested SSR path.
  actions:
    - theme: brand
      text: Install
      link: /guide/
    - theme: alt
      text: Explore examples
      link: /examples/

features:
  - icon: ◇
    title: Real 3D composition
    details: Perspective, spacing, inverse scaling and directional bias without a heavyweight runtime.
  - icon: ↔
    title: Input aware
    details: Pointer, touch, controls and keyboard navigation share the same predictable state model.
  - icon: ⌁
    title: Maintenance ready
    details: ESM, CommonJS and UMD outputs, TypeScript declarations, SSR coverage and reproducible pnpm builds.
---

<div class="version-strip">CURRENT TRACK · Vue 3.5+ · package v2</div>

## See it move

The live demo below is built from the same source as the package. Use the controls, arrow keys, swipe, or click a side card.

<div class="demo-shell" data-track="LIVE / VUE 3">
  <iframe class="demo-frame" src="./demo/index.html" title="Interactive Vue Carousel 3D demo"></iframe>
</div>

## Small surface, deliberate behavior

<div class="track-note">
  <strong>Need Vue 2?</strong> The maintained package <code>1.x</code> has its own <a href="/v1/">archived documentation track</a>.
</div>

```vue
<template>
  <carousel-3d controls-visible aria-label="Featured projects">
    <slide v-for="(project, index) in projects" :key="project.id" :index="index">
      {{ project.title }}
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  components: { Carousel3d, Slide }
}
</script>
```
