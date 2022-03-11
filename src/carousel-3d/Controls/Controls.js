export default {
  name: "controls",
  props: {
    /**
     * Width in pixels of the navigation buttons
     */
    width: {
      type: [String, Number],
      default: 50,
    },
    /**
     * Height in pixels of the navigation buttons
     */
    height: {
      type: [String, Number],
      default: 60,
    },
    /**
     * Text content of the navigation prev button
     */
    prevHtml: {
      type: String,
      default: "&lsaquo;",
    },
    /**
     * Text content of the navigation next button
     */
    nextHtml: {
      type: String,
      default: "&rsaquo;",
    },
  },
  data() {
    return {
      parent: this.$parent,
    };
  },
};
