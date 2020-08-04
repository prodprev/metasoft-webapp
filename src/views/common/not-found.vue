<template>
  <div class="not-found">
    <h3>404</h3>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/var";
@import "../../assets/scss/mixin";

.not-found {
  @include position();
  background-color: $--color-gray-100;
}

h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 100px;
  color: $--color-dark;
}
</style>
