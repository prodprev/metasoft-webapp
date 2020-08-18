<template>
  <div class="progress">
    <label class="name">{{ name }}</label>
    <label class="percent">{{ current }}%</label>
    <p class="current" :style="{ width: `${current}%` }"></p>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: ["name", "percent"],
  computed: {
    current() {
      return this.percent <= 100 ? this.percent : 100;
    },
  },
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
}
</style>
