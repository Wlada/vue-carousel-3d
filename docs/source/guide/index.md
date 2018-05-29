---
title: Guide
---

## Installation

``` bash
npm install -S vue-carousel-3d
```

## Usage (Global)

You may install Vue Carousel 3d globally:

``` js
import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);
```
This will make **&lt;carousel&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

## Usage (Local)

Include the carousel 3d into your component using import:

``` js
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  ...
  components: {
    Carousel3d,
    Slide
  }
  ...
};
```

## HTML Structure

Once the **Carousel3d** and **Slide** components are installed globally or imported, they can be used in templates like below:

``` html
  <carousel-3d>
    <slide :index="0">
      Slide 1 Content
    </slide>
    <slide :index="1">
      Slide 2 Content
    </slide>
  </carousel-3d>
```
Keep in mind that **index** property on slide component is required property and you will need to pass it for every slide starting from 0 

## Scoped Slots

You can use scoped slots to access current slide index, left and right indexes

```html
<carousel-3d>
    <slide v-for="(slide, i) in slides" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide.src">
        </template>
    </slide>
</carousel-3d>
```

## Development

Dev environment is created by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox.

To begin development, run:

``` bash
npm install
npm run dev
```

now open `http://localhost:5000` in your browser

You can modify and add scenarios in `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
