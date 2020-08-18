<template>
  <div class="setting">
    <Header />
  </div>
</template>

<script>
import Header from "@/views/layout/header";

export default {
  components: {
    Header,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.setting {
  @include pagefix();
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
}
</style>
