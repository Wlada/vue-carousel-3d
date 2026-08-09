# 示例

这些配方使用 Vue 3 软件包。实时面板是自包含的，不依赖已停用的 `placehold.it` 服务。

<div class="demo-shell" data-track="实时演示 / VUE 3">
  <iframe class="demo-frame" src="../../demo/index.html?lang=zh-CN" title="Vue Carousel 3D 示例"></iframe>
</div>

## 悬停暂停的自动播放

```vue
<carousel-3d autoplay :autoplay-timeout="3500" autoplay-hover-pause>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## 平面模式

```vue
<carousel-3d
  disable-3d
  :space="360"
  :clickable="false"
  controls-visible
>
  <!-- 幻灯片 -->
</carousel-3d>
```

## 动态幻灯片

```vue
<carousel-3d :count="slides.length">
  <slide v-for="(slide, index) in slides" :key="slide.id" :index="index">
    {{ slide.title }}
  </slide>
</carousel-3d>
```

## 程序化导航

```vue
<carousel-3d ref="carousel">
  <!-- 幻灯片 -->
</carousel-3d>

<button type="button" @click="$refs.carousel.goSlide(3)">
  打开第 4 张幻灯片
</button>
```

## 导航指示点

```vue
<carousel-3d dots controls-visible>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## 自定义控件

```vue
<carousel-3d controls-visible>
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

## 守卫幻灯片切换

```vue
<carousel-3d :before-slide-change="(index) => index !== 3">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## 幻灯片内容懒加载

```vue
<carousel-3d lazy :display="3" :count="items.length">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    <img :src="item.image" :alt="item.title">
  </slide>
</carousel-3d>
```
