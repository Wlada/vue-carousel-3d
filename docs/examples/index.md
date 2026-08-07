# Examples

These recipes use the Vue 3 package. The live panel is self-contained and does not depend on the retired `placehold.it` service.

<div class="demo-shell" data-track="LIVE / VUE 3">
  <iframe class="demo-frame" src="../demo/index.html" title="Vue Carousel 3D examples"></iframe>
</div>

## Autoplay with hover pause

```vue
<carousel-3d autoplay :autoplay-timeout="3500" autoplay-hover-pause>
  <slide v-for="(item, index) in items" :key="item.id" :index="index">
    {{ item.title }}
  </slide>
</carousel-3d>
```

## Flat mode

```vue
<carousel-3d
  disable-3d
  :space="360"
  :clickable="false"
  controls-visible
>
  <!-- slides -->
</carousel-3d>
```

## Dynamic slides

```vue
<carousel-3d :count="slides.length">
  <slide v-for="(slide, index) in slides" :key="slide.id" :index="index">
    {{ slide.title }}
  </slide>
</carousel-3d>
```

## Programmatic navigation

```vue
<carousel-3d ref="carousel">
  <!-- slides -->
</carousel-3d>

<button type="button" @click="$refs.carousel.goSlide(3)">
  Open slide 4
</button>
```
