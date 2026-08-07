# Vue Carousel 3D

[![CI](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml/badge.svg)](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![npm downloads](https://img.shields.io/npm/dm/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![license](https://img.shields.io/npm/l/vue-carousel-3d.svg)](LICENSE)

A compact, flexible and touch-friendly 3D carousel for Vue 3.

- [Documentation and live examples](https://wlada.github.io/vue-carousel-3d/)
- [API reference](https://wlada.github.io/vue-carousel-3d/api/)
- [Interactive playground](https://wlada.github.io/vue-carousel-3d/playground/)

> `2.x` supports Vue `^3.5.0`. Existing Vue 2 users should remain on `vue-carousel-3d@1`.

## Features

- Real 3D composition: perspective, spacing, inverse scaling and directional bias.
- Pointer, touch, mouse and keyboard navigation with native, accessible buttons.
- Optional navigation dots (`dots`) with `aria-current` state.
- Custom control content through `prev` / `next` slots.
- `beforeSlideChange` guard to block navigation, and `one-directional` / `loop` modes.
- Autoplay with hover pause, and lazy slide content for image-heavy carousels.
- SSR-safe module, TypeScript declarations and ESM / CommonJS / UMD outputs.

## Installation

```sh
pnpm add vue-carousel-3d
```

```sh
npm install vue-carousel-3d
```

## Quick start

```vue
<template>
  <carousel-3d dots controls-visible aria-label="Featured projects">
    <slide v-for="(project, index) in projects" :key="project.id" :index="index">
      <img :src="project.image" :alt="project.title">
    </slide>
  </carousel-3d>
</template>

<script setup>
import { Carousel3d, Slide } from 'vue-carousel-3d'

const projects = [
  { id: 1, title: 'Orbit', image: '/images/orbit.jpg' },
  { id: 2, title: 'Depth', image: '/images/depth.jpg' }
]
</script>
```

Each slide needs a stable, zero-based `index`. For dynamic collections, also pass
`:count="projects.length"` so the carousel recomputes its layout immediately.

## Local registration

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
  components: { Carousel3d, Slide },
  data: () => ({ projects: [] })
}
</script>
```

Each slide needs a stable, zero-based `index`. For dynamic collections, also pass `:count="projects.length"` to the carousel.

## Global registration

```js
import { createApp } from 'vue'
import Carousel3d from 'vue-carousel-3d'

createApp(App).use(Carousel3d)
```

This registers `<carousel-3d>` and `<slide>` globally.

## Common patterns

### Navigation dots and custom controls

```vue
<carousel-3d dots controls-visible>
  <template #prev>
    <span aria-hidden="true">&larr;</span>
  </template>
  <template #next>
    <span aria-hidden="true">&rarr;</span>
  </template>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

### Blocking navigation

```vue
<carousel-3d :before-slide-change="(index) => index !== 3">
  <!-- slides -->
</carousel-3d>
```

Returning `false` cancels the move for arrows, swipes, dots and programmatic
navigation. `@before-slide-change` still fires for allowed moves.

### Lazy slide content

```vue
<carousel-3d lazy :display="3" :count="items.length">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    <img :src="item.image" :alt="item.title">
  </slide>
</carousel-3d>
```

### Programmatic navigation

```vue
<carousel-3d ref="carousel">
  <!-- slides -->
</carousel-3d>

<button type="button" @click="$refs.carousel.goSlide(3)">
  Open slide 4
</button>
```

## API overview

| Prop | Purpose |
| --- | --- |
| `display` / `width` / `height` / `space` | Visible slide count and geometry. |
| `perspective` / `inverseScaling` / `bias` | 3D depth and composition. |
| `controlsVisible` / `controlsPrevHtml` / `controlsNextHtml` | Built-in controls. |
| `dots` / `dotsPosition` | Navigation dots (`bottom` / `top`). |
| `autoplay` / `autoplayTimeout` / `autoplayHoverPause` | Automatic rotation. |
| `loop` / `oneDirectional` / `startIndex` | Navigation behavior. |
| `clickable` / `disable3d` / `minSwipeDistance` | Interaction and flat mode. |
| `lazy` | Render slide content only near the current slide. |
| `beforeSlideChange` | Return `false` to cancel a navigation. |

Events: `before-slide-change`, `after-slide-change`, `last-slide`.
Methods: `goNext()`, `goPrev()`, `goSlide(index)`, `goFar(index)`.
See the [full API reference](https://wlada.github.io/vue-carousel-3d/api/) for details.

## When to use it

This component is a good fit when you want a distinctive 3D stack and need touch
handling, keyboard support and SSR safety without building the math yourself.

Carousels can hurt readability, so use autoplay sparingly and always provide a
way to pause or navigate manually. Consider a plain grid or a flat carousel
(`disable-3d`) when motion is a concern.

## Browser support

Modern evergreen browsers (current Chrome, Firefox, Safari and Edge). IE11 and
older engines are not supported.

## Development

```sh
pnpm install
pnpm dev
```

Useful checks:

```sh
pnpm lint
pnpm test
pnpm build
pnpm docs:build
pnpm pack:check
```

Node `20.19+` or `22.13+` and pnpm `10.34.5` are supported by the maintenance toolchain.

## License

[MIT](LICENSE)
