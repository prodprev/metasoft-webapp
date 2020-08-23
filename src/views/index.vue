<template>
  <div class="index">
    <Header />
    <main>
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
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

// .to-left-enter-active,
// .to-left-leave-active,
// .to-right-enter-active,
// .to-right-leave-active {
//   transition: transform 0.2s;
// }
// .to-left-leave-to {
//   transform: translate3d(-80%, 0, 0);
// }
// .to-left-enter {
//   transform: translate3d(100%, 0, 0);
// }
// .to-left-enter-active {
//   z-index: 10;
// }
// .to-left-leave-active {
//   z-index: 0;
// }
// .to-right-leave-active {
//   transform: translate3d(80%, 0, 0);
//   z-index: 11;
// }
// .to-right-enter {
//   transform: translate3d(-100%, 0, 0);
// }
</style>
