# Vue Carousel 3d

[![Build Status](https://travis-ci.org/wlada/vue-carousel.svg?branch=master)](https://travis-ci.org/wlada/vue-carousel)
[![Coverage Status](https://coveralls.io/repos/github/wlada/vue-carousel-3d/badge.svg?branch=master)](https://coveralls.io/github/wlada/vue-carousel-3d?branch=master)
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

Include the carousel 3d directly into your component using import:

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

Once the **Carousel3d** and **Slide** components are installed globally or imported, they can be used in templates in the following manner:

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

Keep in mind that **index** property on slide component is required property and you need to pass it for every slide 

## Development

A sandboxed dev environment is provided by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox.

To begin development, run:

``` bash
npm install
npm run dev
```

then navigate to `http://localhost:5000`

To modify and add sandbox scenarios, edit `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
