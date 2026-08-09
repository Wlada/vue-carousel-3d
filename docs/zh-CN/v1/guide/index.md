# 安装

<div class="version-strip">Vue 2 版本线 · 软件包 v1.x · 维护中</div>

## 添加软件包

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

Vue 是同级依赖。本软件包系列支持 Vue `^2.6.14` 与 `^2.7.0`。

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

每张幻灯片都需要一个稳定的、从零开始的 `index`。对于动态集合，同时传入 `:count="items.length"`。

## 全局注册

```js
import Vue from 'vue'
import Carousel3d from 'vue-carousel-3d'

Vue.use(Carousel3d)
```

这会全局注册 `<carousel-3d>` 与 `<slide>`。

## 事件与作用域插槽

事件名称为 `before-slide-change`、`after-slide-change` 与 `last-slide`。Vue 2 作用域插槽使用 `slot-scope`：

```vue
<slide :index="index">
  <template slot-scope="{ isCurrent, leftIndex, rightIndex }">
    <article :class="{ active: isCurrent }">
      {{ leftIndex }} · {{ rightIndex }}
    </article>
  </template>
</slide>
```
