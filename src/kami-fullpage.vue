<template>
  <div id="kami-container" ref="container">
    <div class="paginations">
      <div
        v-for="(pagination, i) in countSlides"
        :key="`el-${i}`"
        class="pagination-el"
        :class="i === event.activeSlide ? 'pagination-active' : ''"
        @click="slideTo(i)"
      >{{ i + 1 }}</div>
    </div>

    <div id="pages" ref="pages">
      <slot />
    </div>
  </div>
</template>

<script>
import { TweenLite } from "gsap";

export default {
  name: "KamiPage",

  props: {
    kamiOptions: {
      type: Object,
      validator: value => {
        value.speed = value.speed || 1.5;
        value.isLoop = value.isLoop || false;
        value.heights = value.heights || [];
        value.alignment = value.alignment || "top";

        return true;
      }
    }
  },

  mounted() {
    const { container } = this.$refs;

    this.$nextTick(() => {
      this.init();

      container.addEventListener("mousewheel", this.handleMousewheel);
      container.addEventListener('keypress', this.handleKeypress);
      window.addEventListener("resize", this.handleResize);

      if (this.activeSlide !== 0) {
        this.activeSlide = this.activeSlide;
      }
    });
  },

  data: () => ({
    lastOffsetTop: 0,
    isAnimate: false,
    height: 0,

    event: {
      activeSlide: -1,
      prevSlide: -1,
      isTop: false,
    },

    countSlides: 0,
  }),

  computed: {
    heights() {
      return this.kamiOptions.heights.map((height, index) => {
        if (height) {
          if (height[0] === "+" || height[0] === "-") {
            return this.height + +height;
          }
          if (parseInt(+height)) {
            return height;
          }
          if (height === "fill") {
            return this.height;
          }
        }

        const slide = document.querySelector("#pages").children[index]
          .clientHeight;

        return false;
      });
    },

    activeSlide: {
      get() {
        return this.event.activeSlide;
      },
      set(value) {
        if (value > this.activeSlide) {
          if (value === this.countSlides) {
            if (this.kamiOptions.isLoop) value = 0;
            else value -= 1;
          }
        } else if (value < 0) {
          if (this.kamiOptions.isLoop) {
            if (this.activeSlide === -1) value = 0;
            else value = this.countSlides - 1;
          } else value += 1;
        }

        if (!(value === this.event.activeSlide)) {
          this.event = {
            isTop: !(value > this.activeSlide),
            prevSlide: this.activeSlide,
            activeSlide: value
          };

          this.$emit("start-slide", this.event);
          this.scrollAnimate();
        }
      }
    }
  },

  methods: {
    handleMousewheel() {
      if (!this.isAnimate) {
        this.scroll(event);
      }
    },
    handleKeypress(e) {
      // TODO: Slide by arrows
      console.log(e)
    },
    handleResize() {
      this.init();
      this.scrollAnimate();
    },

    init() {
      const { pages } = this.$refs;
      if (pages === undefined || !pages.hasChildNodes()) return;

      const slides = pages.childNodes;

      this.countSlides = slides.length;
      this.height = window.innerHeight;

      slides.forEach((slide, index) => {
        slide.classList.add('kami-slide');
        slide.id = `slide-${index}`;

        if (this.heights[index]) {
          slide.style.height = `${this.heights[index]}px`;
        } else {
          this.heights[index] = slide.offsetHeight;
          slide.style.height = slide.offsetHeight;
        }
      });
    },

    slideTo(id) {
      this.activeSlide = id;
    },

    scroll(e) {
      console.log(e);
      if (e.deltaY > 0) {
        this.activeSlide += 1;
      } else {
        this.activeSlide -= 1;
      }
    },
    scrollAnimate() {
      this.isAnimate = true;

      const slides = document.querySelector("#pages");
      let offsetTop = -document.querySelector(`#slide-${this.activeSlide}`)
        .offsetTop;

      if (this.kamiOptions.alignment === "bottom") {
        if (this.activeSlide + 1 < this.countSlides) {
          offsetTop = -document
            .querySelector(`#slide-${this.activeSlide + 1}`)
            .offsetTop;
          offsetTop += this.height;
        }
      } else if (this.kamiOptions.alignment === "center") {
        const offsetY = Math.abs(this.heights[this.activeSlide] - this.height);

        if (this.heights[this.activeSlide] > this.height) {
          offsetTop -= offsetY / 2;
        } else if (this.heights[this.activeSlide] < this.height) {
          offsetTop += offsetY / 2;
        }
      }

      // var requestId = requestAnimationFrame(callback)
      // console.log(`from: ${this.lastOffsetTop};to: ${offsetTop}`);
      // const baka = document.getElementById("sds");

      // this.animate({
      //   duration: this.kamiOptions.speed,
      //   timing: (timeFraction) => timeFraction,
      //   draw: (offsetTop) => {
      //     slides.style.cssText = `translate3d(0, ${offsetTop}px, 0)`;
      //   },
      // });

      new TweenLite(slides, this.kamiOptions.speed, {
        transform: `translate3d(0, ${offsetTop}px, 0)`,
        onComplete: () => {
          this.isAnimate = false;
          this.$emit("end-slide", this.event);
          this.lastOffsetTop = offsetTop;
        }
      });
    }
    // animate(options) {
    //   const start = performance.now();

    //   requestAnimationFrame(function animate(time) {
    //     let timeFraction = (time - start) / options.duration;
    //     if (timeFraction > 1) timeFraction = 1;

    //     const progress = options.timing(timeFraction);

    //     options.draw(progress);

    //     if (timeFraction < 1) {
    //       requestAnimationFrame(animate);
    //     }
    //   });
    // },
  }
};
</script>

<style scoped>
#kami-container {
  overflow: hidden;
}

#pages {
  width: 100vw;
  height: 100vh;
}

.paginations {
  height: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffffff05;
  z-index: 1000;
}
.pagination-el {
  font-family: "Gulim" !important;
  display: inline;
  color: #888;
  user-select: none;
  cursor: pointer;
  font-size: 23px;
  margin: 10px;
}
.pagination-active {
  color: #ddd;
}
</style>

<style>
body {
  margin: 0;
}
</style>
