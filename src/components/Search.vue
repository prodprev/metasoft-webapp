<template>
  <div class="search">
    <img :src="require('../assets/images/icon-search-magnifier.svg')" />
    <input
      type="text"
      placeholder="请输入搜索条件"
      v-model.trim="query"
      @input="$emit('input', query)"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.search {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: px2rem(34);

  img {
    position: absolute;
    top: px2rem(11);
    left: px2rem(10);
    width: px2rem(12);
  }

  input {
    width: 100%;
    height: px2rem(34);
    padding: 0 px2rem(10) 0 px2rem(32);
    border-radius: px2rem(10);
    font-size: px2rem(14);
  }
}
</style>
