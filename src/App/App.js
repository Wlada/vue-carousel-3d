import Carousel3d from "@/carousel-3d/Carousel3d/Carousel3d.vue";
import Slide from "@/carousel-3d/Slide/Slide.vue";

const slides = [
  {
    title: "Slide 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 2",
    desc: "Lorem ipsum dolor sit amet ",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 4",
    desc: "Lorem ipsum dolor sit amet,  Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 6",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 7",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 8",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 9",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
  {
    title: "Slide 10",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://via.placeholder.com/360x270",
  },
];

export default {
  name: "App",
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      slides: slides,
      slideCount: 10,
    };
  },
  methods: {
    onSlideChanged(index) {
      console.log("onSlideChanged Callback Triggered", "Slide Index " + index);
    },
    onLastSlide(index) {
      console.log("onLastSlide Callback Triggered", "Slide Index " + index);
    },
    onMainSlideClick() {
      console.log("onMainSlideClick Callback Triggered");
    },
    onAfterSlideChanged(index) {
      console.log(
        "@after-slide-changed Callback Triggered",
        "Slide Index " + index
      );
    },
    onSlideChange(index) {
      console.log(
        "@before-slide-change Callback Triggered",
        "Slide Index " + index
      );
    },
    addSlide() {
      this.slideCount++;
    },
    removeSlide() {
      if (this.slideCount > 1) {
        this.slideCount--;
      }
    },
  },
};
