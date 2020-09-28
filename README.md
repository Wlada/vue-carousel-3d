# Vue Carousel 3d

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R64SW4VNC6MGL&source=url)
[![NPM downloads](https://img.shields.io/npm/dm/vue-carousel-3d.svg)](https://npmjs.com/package/vue-carousel-3d)
[![Build Status](https://travis-ci.org/Wlada/vue-carousel-3d.svg?branch=master)](https://travis-ci.org/Wlada/vue-carousel-3d)
[![Coverage Status](https://coveralls.io/repos/github/Wlada/vue-carousel-3d/badge.svg)](https://coveralls.io/github/Wlada/vue-carousel-3d)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/22c6361755bb4bdd935fd8534babbbb8)](https://app.codacy.com/app/Wlada/vue-carousel-3d?utm_source=github.com&utm_medium=referral&utm_content=Wlada/vue-carousel-3d&utm_campaign=Badge_Grade_Dashboard)
[![Latest Stable Version](https://img.shields.io/npm/v/vue-carousel-3d.svg)](https://www.npmjs.com/package/vue-carousel-3d)

The repository is back in action. I'll try to keep it updated and to merge pull requests occasionally. Also, some new features are coming soon.

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
import Carousel3d from 'vue-carousel-3d';

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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Changelog
####Version 1.0.0

- All dependencies updated to the latest
- Added one directional carousel and updated the docs (docs updated)
- area-labels added to the buttons
- Y-axys swipe bug fixed.
- Fix SSR
- onMainSlideClick callback now returns the slide index as function parameter (docs updated)
- Added scoped slides (docs updated)
