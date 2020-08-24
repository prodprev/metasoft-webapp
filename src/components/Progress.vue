<template>
  <div class="progress">
    <label class="name">{{ name }}</label>
    <label class="percent">{{ current }}%</label>
    <p class="current"
       :style="{ width: `${current}%` }"></p>
    <p class="clickable"
       @click="handleClick($event)"></p>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: ["name", "percent"],
  data() {
    return {
      current: this.check(this.percent)
    }
  },
  methods: {
    check(val) {
      let per = val <= 100 ? (val >= 0 ? val : 0) : 100;

      if (0 < per && per < 0.5) {
        per = 0;
      } else if (99.5 < per && per < 100) {
        per = 100;
      }

      return per;
    },
    handleClick(e) {
      this.current = (this.check(e.offsetX / e.target.clientWidth * 100)).toFixed(0);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.progress {
  position: relative;
  width: 100%;
  height: px2rem(3);
  background: $--background;

  label {
    position: absolute;
    top: px2rem(-23);
  }

  .name {
    left: 0;
    font-size: px2rem(12);
    color: $--color-dark-100;
  }

  .percent {
    right: 0;
    font-size: px2rem(13);
    color: #323c47;
  }

  .current {
    height: inherit;
    background: $--color-blue;
    @include transition(width);
  }

  .clickable {
    position: absolute;
    bottom: px2rem(-3);
    left: 0;
    width: 100%;
    height: px2rem(9);
    opacity: 0;
    z-index: 1;
  }
}
</style>
