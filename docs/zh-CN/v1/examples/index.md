# 示例

<div class="version-strip">Vue 2 版本线 · 软件包 v1.x</div>

## 控件与五个可见幻灯片

```vue
<carousel-3d :display="5" :controls-visible="true">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## 悬停暂停的自动播放

```vue
<carousel-3d autoplay :autoplay-timeout="3500" autoplay-hover-pause>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## 通过组件 ref 导航

```vue
<carousel-3d ref="carousel">
  <slide v-for="(item, index) in items" :key="item.id" :index="index" />
</carousel-3d>

<button @click="$refs.carousel.goNext()">下一个</button>
```
