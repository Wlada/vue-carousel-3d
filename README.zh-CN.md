# Vue Carousel 3D

[English](README.md) | 简体中文

[![CI](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml/badge.svg)](https://github.com/wlada/vue-carousel-3d/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![npm downloads](https://img.shields.io/npm/dm/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)
[![license](https://img.shields.io/npm/l/vue-carousel-3d.svg)](LICENSE)

面向 Vue 3 的紧凑、灵活且支持触摸的 3D 轮播组件。

- [文档与实时示例](https://wlada.github.io/vue-carousel-3d/zh-CN/)
- [API 参考](https://wlada.github.io/vue-carousel-3d/zh-CN/api/)
- [交互式演练场](https://wlada.github.io/vue-carousel-3d/zh-CN/playground/)

> `2.x` 支持 Vue `^3.5.0`。现有 Vue 2 用户应继续使用 `vue-carousel-3d@1`。

## 特性

- 真正的 3D 构图：透视、间距、反向缩放与方向偏好。
- 指针、触摸、鼠标与键盘导航，附带原生、可访问的按钮。
- 可选的导航指示点（`dots`），带 `aria-current` 状态。
- 通过 `prev` / `next` 插槽自定义控件内容。
- `beforeSlideChange` 守卫用于阻止导航，以及 `one-directional` / `loop` 模式。
- 支持悬停暂停的自动播放，以及针对图片较多轮播组件的幻灯片内容懒加载。
- 对 SSR 安全的模块、TypeScript 声明与 ESM / CommonJS / UMD 产物。

## 安装

```sh
pnpm add vue-carousel-3d
```

```sh
npm install vue-carousel-3d
```

## 快速上手

```vue
<template>
  <carousel-3d dots controls-visible aria-label="精选项目">
    <slide v-for="(project, index) in projects" :key="project.id" :index="index">
      <img :src="project.image" :alt="project.title">
    </slide>
  </carousel-3d>
</template>

<script setup>
import { Carousel3d, Slide } from 'vue-carousel-3d'

const projects = [
  { id: 1, title: '轨道', image: '/images/orbit.jpg' },
  { id: 2, title: '纵深', image: '/images/depth.jpg' }
]
</script>
```

每张幻灯片都需要一个稳定的、从零开始的 `index`。对于动态集合，同时传入 `:count="projects.length"`，以便轮播组件立即重算布局。

## 局部注册

```vue
<template>
  <carousel-3d controls-visible aria-label="精选项目">
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

每张幻灯片都需要一个稳定的、从零开始的 `index`。对于动态集合，同时向轮播组件传入 `:count="projects.length"`。

## 全局注册

```js
import { createApp } from 'vue'
import Carousel3d from 'vue-carousel-3d'

createApp(App).use(Carousel3d)
```

这会全局注册 `<carousel-3d>` 与 `<slide>`。

## 常见模式

### 导航指示点与自定义控件

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

### 阻止导航

```vue
<carousel-3d :before-slide-change="(index) => index !== 3">
  <!-- 幻灯片 -->
</carousel-3d>
```

返回 `false` 会取消箭头、滑动、指示点与程序化导航的移动。`@before-slide-change` 仍会在允许的移动中触发。

### 幻灯片内容懒加载

```vue
<carousel-3d lazy :display="3" :count="items.length">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    <img :src="item.image" :alt="item.title">
  </slide>
</carousel-3d>
```

### 程序化导航

```vue
<carousel-3d ref="carousel">
  <!-- 幻灯片 -->
</carousel-3d>

<button type="button" @click="$refs.carousel.goSlide(3)">
  打开第 4 张幻灯片
</button>
```

## API 概览

| 属性 | 用途 |
| --- | --- |
| `display` / `width` / `height` / `space` | 可见幻灯片数量与几何。 |
| `perspective` / `inverseScaling` / `bias` | 3D 纵深与构图。 |
| `controlsVisible` / `controlsPrevHtml` / `controlsNextHtml` | 内置控件。 |
| `dots` / `dotsPosition` | 导航指示点（`bottom` / `top`）。 |
| `autoplay` / `autoplayTimeout` / `autoplayHoverPause` | 自动轮播。 |
| `loop` / `oneDirectional` / `startIndex` | 导航行为。 |
| `clickable` / `disable3d` / `minSwipeDistance` | 交互与平面模式。 |
| `lazy` | 仅在当前幻灯片附近渲染幻灯片内容。 |
| `beforeSlideChange` | 返回 `false` 以取消一次导航。 |

事件：`before-slide-change`、`after-slide-change`、`last-slide`。
方法：`goNext()`、`goPrev()`、`goSlide(index)`、`goFar(index)`。
详细信息请参见[完整的 API 参考](https://wlada.github.io/vue-carousel-3d/zh-CN/api/)。

## 适用场景

当你想获得独特的 3D 堆叠效果，又需要触摸处理、键盘支持与 SSR 安全性，而不想自己实现这些数学计算时，本组件是不错的选择。

轮播组件可能损害可读性，因此请谨慎使用自动播放，并始终提供暂停或手动导航的方式。当动画令人担忧时，可考虑使用普通网格或平面轮播组件（`disable-3d`）。

## 浏览器支持

现代常青浏览器（当前版本 Chrome、Firefox、Safari 与 Edge）。不支持 IE11 与更旧的引擎。

## 开发

```sh
pnpm install
pnpm dev
```

常用检查：

```sh
pnpm lint
pnpm test
pnpm build
pnpm docs:build
pnpm pack:check
```

维护工具链支持 Node `20.19+` 或 `22.13+` 以及 pnpm `10.34.5`。

## 许可

[MIT](LICENSE)
