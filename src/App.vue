<template>
  <div id="app">
    <transition :name="$store.state.routeAction">
      <router-view />
    </transition>
    <Actionsheet v-if="$store.state.actionsheet.show"
                 :list="$store.state.actionsheet.list"
                 :desc="$store.state.actionsheet.desc"
                 @action="(msg) => $store.commit('setActionsheet', { action: msg })"
                 @close="$store.commit('setActionsheet', { show: false })" />
  </div>
</template>

<script>
import Actionsheet from "@/components/Actionsheet";
import debounce from "@/utils/debounce";

export default {
  components: {
    Actionsheet
  },
  mounted: function() {
    window.onresize = debounce(function() {
      // window.location.reload();
    }, 1500);
  },
};
</script>

<style lang="scss">
@import "./assets/scss/style";

.push-enter-active,
.push-leave-active,
.pop-enter-active,
.pop-leave-active {
  transition: all 0.4s;
}
.push-leave-to {
  transform: translate3d(-20%, 0, 0);
}
.push-enter {
  transform: translate3d(100%, 0, 0);
}
.push-enter-active {
  z-index: 10;
}
.push-leave-active {
  z-index: 0;
}
.pop-leave-active {
  transform: translate3d(100%, 0, 0);
  z-index: 11;
}
.pop-enter {
  transform: translate3d(-20%, 0, 0);
}
</style>
