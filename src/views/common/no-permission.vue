<template>
  <div class="no-permission">
    <h3>no permission</h3>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/fn";

.no-permission {
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
