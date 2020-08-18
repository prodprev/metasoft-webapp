<template>
  <div class="index">
    <Header />
    <main :class="{ change: $route.name == 'list' }">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import Footer from "@/views/layout/footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.index {
  @include pagefix();
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
}

main {
  height: calc(
    100vh - #{px2rem($--header-height)} - #{px2rem($--footer-height)}
  );
  margin: px2rem($--header-height) 0 px2rem($--footer-height);
  background: $--background;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  &.change {
    height: calc(
      100vh - #{px2rem($--header-height * 2)} - #{px2rem($--footer-height)}
    );
    margin-top: px2rem($--header-height * 2);
  }
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
