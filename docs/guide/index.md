# Installation

<div class="version-strip">THIS GUIDE · Vue 3.5+ · v2 preview release</div>

## Add the package

::: code-group

```sh [pnpm]
pnpm add vue-carousel-3d@next
```

```sh [npm]
npm install vue-carousel-3d@next
```

```sh [yarn]
yarn add vue-carousel-3d@next
```

:::

Vue is a peer dependency. This line supports Vue `^3.5.0`; Vue 2 users should install `vue-carousel-3d@1`.

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

Every slide needs a zero-based, stable `index`. When a list changes, also pass `:count="items.length"` to the carousel so it recomputes its internal layout immediately.

## Global registration

```js
import { createApp } from 'vue'
import Carousel3d from 'vue-carousel-3d'

createApp(App).use(Carousel3d)
```

This registers `<carousel-3d>` and `<slide>` globally.

## Events

Prefer Vue events over the deprecated callback props:

```vue
<carousel-3d
  @before-slide-change="onBeforeChange"
  @after-slide-change="onAfterChange"
  @last-slide="onLastSlide"
>
  <!-- slides -->
</carousel-3d>
```

## Scoped slots

```vue
<slide v-for="(slide, index) in slides" :key="slide.id" :index="index">
  <template #default="{ isCurrent, leftIndex, rightIndex }">
    <article :class="{ active: isCurrent }">
      {{ slide.title }} · left {{ leftIndex }} · right {{ rightIndex }}
    </article>
  </template>
</slide>
```

## Accessibility baseline

- Give each carousel a useful `aria-label` when the page contains more than one.
- Keep visible content meaningful when CSS transforms are unavailable.
- Controls are native buttons; the focused carousel responds to Left and Right Arrow.
- Avoid autoplay for essential reading content, or provide a visible way to pause it.
