<template>
  <div id="app" class="wrapper">
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Default</h3>

      <carousel-3d>
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.desc }}</p>
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Images</h3>

      <carousel-3d>
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Autoplay enabled</h3>

      <carousel-3d :autoplay="true">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Num of displayed</h3>

      <carousel-3d :display="3">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Even number displayed</h3>

      <carousel-3d :display="6" :bias="'right'">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Slides clickable</h3>

      <carousel-3d :clickable="true">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Loop disabled</h3>

      <carousel-3d :loop="false">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Controls visible</h3>

      <carousel-3d :controls-visible="true">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Custom controls</h3>

      <carousel-3d :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'"
                   :controls-width="30" :controls-height="60">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>LTR direction</h3>

      <carousel-3d :dir="'ltr'">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Callbacks</h3>
      <carousel-3d :on-slide-change="onSlideChanged" :on-last-slide="onLastSlide"
                   :on-main-slide-click="onMainSlideClick">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Add/Remove slides</h3>
      <div>
        <carousel-3d :count="slideCount">
          <slide v-for="(slide, i) in slideCount" :index="i" :key="i">
            <h1>Slide {{ slide }}</h1>
          </slide>
        </carousel-3d>
        <button @click="addSlide">Add slide</button>
        <button @click="removeSlide">Remove slide</button>
      </div>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Callbacks through emit</h3>
      <carousel-3d
          @before-slide-change="onSlideChange"
          @after-slide-change="onAfterSlideChanged"
          @last-slide="onLastSlide">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>3D disabled</h3>
      <carousel-3d :disable3d="true" :space="370" :clickable="false" :controls-visible="true">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <img :src="slide.src">
        </slide>
      </carousel-3d>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <h3>Scoped Slot</h3>
      <carousel-3d>
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <div :style="{ textAlign: leftIndex >= 0 ? 'right' : 'left' }">
              right {{ rightIndex }} <br>
              left {{ leftIndex }}
            </div>
            <img :data-index="index" :data-is-current="isCurrent" :src="slide.src">
          </template>
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import Carousel3d from "@/carousel-3d/Carousel3d";
import Slide from "@/carousel-3d/Slide";

const slides = [
  {
    title: 'Slide 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 2',
    desc: 'Lorem ipsum dolor sit amet ',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 3',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 4',
    desc: 'Lorem ipsum dolor sit amet,  Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 5',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 6',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 7',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 8',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 9',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  },
  {
    title: 'Slide 10',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
    src: 'https://placehold.it/360x270'
  }
]

export default {
  name: 'App',
  components: {
    Carousel3d,
    Slide
  },
  data () {
    return {
      slides: slides,
      slideCount: 10
    }
  },
  methods: {
    onSlideChanged (index) {
      console.log('onSlideChanged Callback Triggered', 'Slide Index ' + index)
    },
    onLastSlide (index) {
      console.log('onLastSlide Callback Triggered', 'Slide Index ' + index)
    },
    onMainSlideClick () {
      console.log('onMainSlideClick Callback Triggered')
    },
    onAfterSlideChanged (index) {
      console.log('@after-slide-changed Callback Triggered', 'Slide Index ' + index)
    },
    onSlideChange (index) {
      console.log('@before-slide-change Callback Triggered', 'Slide Index ' + index)
    },
    addSlide () {
      this.slideCount++
    },
    removeSlide () {
      if (this.slideCount > 1) {
        this.slideCount--
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
