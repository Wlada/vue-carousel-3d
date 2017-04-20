# Vue Carousel 3d

[![Build Status](https://travis-ci.org/Wlada/vue-carousel-3d.svg?branch=master)](https://travis-ci.org/Wlada/vue-carousel-3d)
[![Coverage Status](https://coveralls.io/repos/github/Wlada/vue-carousel-3d/badge.svg)](https://coveralls.io/github/Wlada/vue-carousel-3d)
[![Latest Stable Version](https://img.shields.io/npm/v/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)

**Feel free to submit issues and feature requests [here](https://github.com/wlada/vue-carousel-3d/issues)**.

**[Full documentation and examples](https://wlada.github.io/vue-carousel-3d)**

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Installation

``` bash
npm install -S vue-carousel-3d
```

## Usage

##### Usage (Global)

You may install Vue Carousel 3d globally:

``` js
import Vue from 'vue';
import Carousel3d from 'carousel-3d';

Vue.use(Carousel3d);
```
This will make **&lt;carousel-3d&gt;** and **&lt;slide&gt;** available to all components within your Vue app.

##### Usage (Local)

Include the Carousel 3d into your component using import:

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
  <carousel-3d :length="slide.length">
    <slide :index="0">
      Slide 1 Content
    </slide>
    <slide :index="1">
      Slide 2 Content
    </slide>
  </carousel-3d>
```

Keep in mind that **index** property on slide component is required property and you will need to pass it for every slide starting from 0

## HTML Structure dynamic data or using for filter slides

``` html
  <carousel-3d :length="slides.length">
    <slide v-for="(slide, i) in slides" :index="i">
      Slide content {{i}}
    </slide>
  </carousel-3d>
```
Prop **length** is required for using dynamic slides or filter slides(example slides=computed property filter)


## Development

Dev environment is created by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox.

To begin development, run:

``` bash
npm install
npm run dev
```

now open  `http://localhost:5000` in your browser

You can modify and add scenarios in `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
