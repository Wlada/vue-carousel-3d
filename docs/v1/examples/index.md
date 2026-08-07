# Examples

<div class="version-strip">VUE 2 TRACK · package v1.x</div>

## Controls and five visible slides

```vue
<carousel-3d :display="5" :controls-visible="true">
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## Autoplay with hover pause

```vue
<carousel-3d autoplay :autoplay-timeout="3500" autoplay-hover-pause>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## Navigation through a component ref

```vue
<carousel-3d ref="carousel">
  <slide v-for="(item, index) in items" :key="item.id" :index="index" />
</carousel-3d>

<button @click="$refs.carousel.goNext()">Next</button>
```
