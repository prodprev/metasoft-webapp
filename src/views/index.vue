<template>
  <div class="index">
    <Header></Header>
    <main :class="{ change: $route.name == 'list' }">
      <router-view></router-view>
    </main>
    <Footer></Footer>
    <Actionsheet
      v-if="$store.state.actionsheet.show"
      :list="$store.state.actionsheet.list"
      :desc="$store.state.actionsheet.desc"
      @action="(msg) => $store.commit('setActionsheet', { action: msg })"
      @close="$store.commit('setActionsheet', { show: false })"
    />
  </div>
</template>

<script>
import Actionsheet from "@/components/Actionsheet";
import Header from "@/views/layout/header";
import Footer from "@/views/layout/footer";

export default {
  components: {
    Actionsheet,
    Header,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.index {
  height: 100%;
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
