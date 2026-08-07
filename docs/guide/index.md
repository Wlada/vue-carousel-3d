# Installation

<div class="version-strip">THIS GUIDE · Vue 3.5+ · package v2</div>

## Add the package

::: code-group

```sh [pnpm]
pnpm add vue-carousel-3d
```

```sh [npm]
npm install vue-carousel-3d
```

```sh [yarn]
yarn add vue-carousel-3d
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

## Navigation dots

```vue
<carousel-3d dots dots-position="bottom" controls-visible>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

Dots are keyboard-accessible buttons that jump straight to a slide. The active dot
is marked with `aria-current`.

## Custom controls

The default controls render `controls-prev-html` / `controls-next-html` inside native
buttons. Use the `prev` and `next` slots to render your own markup (SVG icons,
components, …) instead:

```vue
<carousel-3d controls-visible>
  <template #prev="{ disabled }">
    <svg :class="{ 'is-disabled': disabled }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  </template>
  <template #next="{ disabled }">
    <svg :class="{ 'is-disabled': disabled }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  </template>
  <!-- slides -->
</carousel-3d>
```

The slot content is rendered inside the existing accessible button, so the click
handler, `disabled` state and `aria-label` are preserved.

## Guarding slide changes

Pass a `beforeSlideChange` function to block navigation. It receives the target
index and the current index; returning `false` cancels the move. The guard applies
to arrows, swipes, dots and programmatic navigation:

```vue
<carousel-3d :before-slide-change="canChange">
  <!-- slides -->
</carousel-3d>

<script>
export default {
  methods: {
    canChange (index, fromIndex) {
      return index !== 4 // e.g. validation before leaving a slide
    }
  }
}
</script>
```

`@before-slide-change` still fires as a notification for every allowed navigation.

## Lazy slide content

For image-heavy carousels, `lazy` renders each slide's slot content only when the
slide is close to the current one (a small margin beyond `display`). The slide
placeholder stays in place, so the layout does not shift:

```vue
<carousel-3d lazy :display="3" :count="items.length">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    <img :src="item.image" :alt="item.title">
  </slide>
</carousel-3d>
```

Lazy rendering is disabled by default and is intended for client-side rendering;
server-rendered carousels should keep it off so content is available in the HTML.

## Accessibility baseline

- Give each carousel a useful `aria-label` when the page contains more than one.
- Keep visible content meaningful when CSS transforms are unavailable.
- Controls are native buttons; the focused carousel responds to Left and Right Arrow.
- Avoid autoplay for essential reading content, or provide a visible way to pause it.
