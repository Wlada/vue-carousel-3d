# Vue Carousel 3D

[![CI](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml/badge.svg)](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![npm downloads](https://img.shields.io/npm/dm/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![license](https://img.shields.io/npm/l/vue-carousel-3d.svg)](LICENSE)

A compact, flexible and touch-friendly 3D carousel for Vue 2.

- [Documentation and live examples](https://wlada.github.io/vue-carousel-3d/)
- [API reference](https://wlada.github.io/vue-carousel-3d/api/)
- [Vue 3 roadmap](https://wlada.github.io/vue-carousel-3d/vue3/)

> The `1.x` line supports Vue `^2.6.14` and `^2.7.0`. The Vue 3 port is being developed as a separate major version.

## Installation

```sh
pnpm add vue-carousel-3d
```

```sh
npm install vue-carousel-3d
```

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
import Vue from 'vue'
import Carousel3d from 'vue-carousel-3d'

Vue.use(Carousel3d)
```

This registers `<carousel-3d>` and `<slide>` globally.

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

Node `20.19+` or `22.13+` and pnpm `11.20.0` are supported by the maintenance toolchain.

## License

[MIT](LICENSE)
