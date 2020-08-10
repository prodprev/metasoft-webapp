<template>
  <span class="pic"
        :style="style">
    <img v-if="!load || !url"
         :src="require('../assets/images/placeholder.svg')" />
  </span>
</template>

<script>
export default {
  name: "Pic",
  props: ["url"],
  data() {
    return {
      load: false,
      style: {}
    }
  },
  mounted: function () {
    if (!this.url) return;

    const vm = this;
    const img = document.createElement("img");

    img.onload =  function () {
      vm.load = true;
      vm.style = {backgroundImage: `url(${this.src})`};
    };

    img.src = vm.url;
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.pic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: px2rem(45);
  height: px2rem(45);
  border-radius: px2rem(15);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: $--color-gray-100;
}
</style>
