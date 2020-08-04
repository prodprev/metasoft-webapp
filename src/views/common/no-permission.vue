<template>
  <div class="no-permission">
    <h3>no permission</h3>
  </div>
</template>

<script>
export default {
  name: "NoPermission"
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/var";
@import "../../assets/scss/mixin";

.no-permission {
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
