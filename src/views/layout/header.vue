<template>
  <header>
    <div class="lt"></div>
    <div class="md"></div>
    <div class="rt"></div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import "../../assets/scss/var";
@import "../../assets/scss/fn";

header {
  height: px2rem(45);
  background: linear-gradient(
    315deg,
    $--color-blue 0%,
    rgba(51, 144, 255, 1) 100%
  );
}
</style>
