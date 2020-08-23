<template>
  <div class="todo">
    <Header />
    <div class="content"></div>
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  components: {
    Header,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.todo {
  @include pagefix();

  header {
    flex: 0 0 px2rem(45);
  }

  .content {
    flex: 0 0 calc(100% - #{px2rem(45)});
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
