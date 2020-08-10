<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import debounce from "@/utils/debounce";

export default {
  mounted: function() {
    window.onresize = debounce(function() {
      window.location.reload();
    }, 1500);
  },
};
</script>

<style lang="scss">
@import "./assets/scss/index";
</style>
