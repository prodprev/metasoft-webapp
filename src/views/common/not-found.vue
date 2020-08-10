<template>
  <div class="not-found">
    <h3>404</h3>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/fn";

.not-found {
  @include position();
  background: $--background;
}

h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: px2rem(30);
  font-weight: 700;
  color: $--color-dark;
}
</style>
