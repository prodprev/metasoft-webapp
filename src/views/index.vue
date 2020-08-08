<template>
  <div class="index">
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import Footer from "@/views/layout/footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/fn";

main {
  height: calc(#{100vh - px2rem($--header-height) - px2rem($--footer-height)});
}
</style>
