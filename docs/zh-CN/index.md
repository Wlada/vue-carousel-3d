---
layout: home

hero:
  name: "Vue Carousel 3D"
  text: "有纵深，无赘余。"
  tagline: 面向 Vue 3 的紧凑、支持触摸的 3D 轮播组件 —— 提供无障碍控件与经过测试的 SSR 路径。
  actions:
    - theme: brand
      text: 安装
      link: /zh-CN/guide/
    - theme: alt
      text: 查看示例
      link: /zh-CN/examples/

features:
  - icon: ◇
    title: 真正的 3D 构图
    details: 透视、间距、反向缩放与方向偏好，无需重量级运行时。
  - icon: ↔
    title: 感知输入
    details: 指针、触摸、控件与键盘导航共享同一可预测的状态模型。
  - icon: ⌁
    title: 易于维护
    details: ESM、CommonJS 与 UMD 产物，TypeScript 声明，SSR 覆盖与可复现的 pnpm 构建。
---

<div class="version-strip">当前版本线 · Vue 3.5+ · 软件包 v2</div>

## 看看效果

下方的实时演示与软件包使用同一份源码构建。你可以使用控件、方向键、滑动或点击侧边卡片。

<div class="demo-shell" data-track="实时演示 / VUE 3">
  <iframe class="demo-frame" src="../demo/index.html?lang=zh-CN" title="交互式 Vue Carousel 3D 演示"></iframe>
</div>

## 小巧的表面，经过斟酌的行为

<div class="track-note">
  <strong>需要使用 Vue 2？</strong> 受维护的软件包 <code>1.x</code> 拥有独立的 <a href="v1/">归档文档版本线</a>。
</div>

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
  components: { Carousel3d, Slide }
}
</script>
```
