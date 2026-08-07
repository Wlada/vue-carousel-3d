# Installation

<div class="version-strip">VUE 2 TRACK · package v1.x · maintained</div>

## Add the package

::: code-group

```sh [pnpm]
pnpm add vue-carousel-3d@1
```

```sh [npm]
npm install vue-carousel-3d@1
```

```sh [yarn]
yarn add vue-carousel-3d@1
```

:::

Vue is a peer dependency. This package line supports Vue `^2.6.14` and `^2.7.0`.

## Local registration

```vue
<template>
  <carousel-3d :display="5" :controls-visible="true">
    <slide v-for="(item, index) in items" :key="item.id" :index="index">
      <img :src="item.image" :alt="item.title">
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  components: { Carousel3d, Slide },
  data: () => ({ items: [] })
}
</script>
```

Each slide needs a stable, zero-based `index`. For dynamic collections, also pass `:count="items.length"`.

## Global registration

```js
import Vue from 'vue'
import Carousel3d from 'vue-carousel-3d'

Vue.use(Carousel3d)
```

This registers `<carousel-3d>` and `<slide>` globally.

## Events and scoped slots

The event names are `before-slide-change`, `after-slide-change` and `last-slide`. Vue 2 scoped slots use `slot-scope`:

```vue
<slide :index="index">
  <template slot-scope="{ isCurrent, leftIndex, rightIndex }">
    <article :class="{ active: isCurrent }">
      {{ leftIndex }} · {{ rightIndex }}
    </article>
  </template>
</slide>
```
