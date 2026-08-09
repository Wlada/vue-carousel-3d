# 安装

<div class="version-strip">本指南 · Vue 3.5+ · 软件包 v2</div>

## 添加软件包

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

Vue 是同级依赖。这一行支持 Vue `^3.5.0`；Vue 2 用户应安装 `vue-carousel-3d@1`。

## 局部注册

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

每张幻灯片都需要一个稳定的、从零开始的 `index`。当列表变化时，同时向轮播组件传入 `:count="items.length"`，以便其立即重算内部布局。

## 全局注册

```js
import { createApp } from 'vue'
import Carousel3d from 'vue-carousel-3d'

createApp(App).use(Carousel3d)
```

这会全局注册 `<carousel-3d>` 与 `<slide>`。

## 事件

优先使用 Vue 事件，而非已弃用的回调 props：

```vue
<carousel-3d
  @before-slide-change="onBeforeChange"
  @after-slide-change="onAfterChange"
  @last-slide="onLastSlide"
>
  <!-- 幻灯片 -->
</carousel-3d>
```

## 作用域插槽

```vue
<slide v-for="(slide, index) in slides" :key="slide.id" :index="index">
  <template #default="{ isCurrent, leftIndex, rightIndex }">
    <article :class="{ active: isCurrent }">
      {{ slide.title }} · 左 {{ leftIndex }} · 右 {{ rightIndex }}
    </article>
  </template>
</slide>
```

## 导航指示点

```vue
<carousel-3d dots dots-position="bottom" controls-visible>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

指示点是可键盘访问的按钮，可直接跳转到某张幻灯片。当前指示点通过 `aria-current` 标记。

## 自定义控件

默认控件会在原生按钮内渲染 `controls-prev-html` / `controls-next-html`。改用 `prev` 与 `next` 插槽来渲染你自己的标记（SVG 图标、组件……）：

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
  <!-- 幻灯片 -->
</carousel-3d>
```

插槽内容会在既有的可访问按钮内渲染，因此点击处理、`disabled` 状态与 `aria-label` 都会保留。

## 守卫幻灯片切换

传入 `beforeSlideChange` 函数来阻止导航。它接收目标索引与当前索引；返回 `false` 会取消移动。该守卫适用于箭头、滑动、指示点与程序化导航：

```vue
<carousel-3d :before-slide-change="canChange">
  <!-- 幻灯片 -->
</carousel-3d>

<script>
export default {
  methods: {
    canChange (index, fromIndex) {
      return index !== 4 // 例如：离开某张幻灯片前的校验
    }
  }
}
</script>
```

`@before-slide-change` 仍会在每次允许的导航中作为通知触发。

## 幻灯片内容懒加载

对于图片较多的轮播组件，`lazy` 只会在幻灯片接近当前幻灯片时（略超出 `display` 的一小段边距）渲染其插槽内容。幻灯片占位会保持原位，因此布局不会发生位移：

```vue
<carousel-3d lazy :display="3" :count="items.length">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    <img :src="item.image" :alt="item.title">
  </slide>
</carousel-3d>
```

懒渲染默认关闭，仅用于客户端渲染；服务端渲染的轮播组件应保持关闭，以便内容出现在 HTML 中。

## 无障碍访问基线

- 当页面包含多个轮播组件时，请为每个轮播组件提供有意义的 `aria-label`。
- 当 CSS 变换不可用时，保持可见内容有意义。
- 控件是原生按钮；聚焦的轮播组件响应左右方向键。
- 对关键阅读内容避免自动播放，或提供可见的暂停方式。
