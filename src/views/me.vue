<template>
  <div class="me"></div>
</template>

<script>
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.me {
  padding: px2rem(20) px2rem(15);
  font-size: px2rem(16);
}
</style>
