<template>
  <header>
    <div class="wrapper">
      <div class="lt">
        <div
          v-if="
            [
              'create',
              'customer',
              'multi',
              'detail',
              'setting',
              'workbench',
              'todo',
            ].includes($route.name)
          "
          class="back"
          :style="{ backgroundImage: backBgImg }"
          @click="handleBack"
        ></div>
      </div>
      <div class="md">
        {{ $route.meta.title }}
      </div>
      <div class="rt">
        <div
          v-if="['home'].includes($route.name)"
          class="query"
          :style="{ backgroundImage: queryBgImg }"
        ></div>
        <div
          v-if="['create', 'customer', 'multi'].includes($route.name)"
          class="submit"
          :style="{ backgroundImage: submitBgImg }"
        ></div>
        <div
          v-if="['detail'].includes($route.name)"
          class="dots"
          @click="handleActionsheet"
          :style="{ backgroundImage: dotsBgImg }"
        ></div>
      </div>
    </div>
  </header>
</template>

<script>
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  data() {
    return {
      backBgImg: `url(${require("../../assets/images/icon-header-back.svg")})`,
      queryBgImg: `url(${require("../../assets/images/icon-search.svg")})`,
      submitBgImg: `url(${require("../../assets/images/icon-check.svg")})`,
      dotsBgImg: `url(${require("../../assets/images/icon-h-dots.svg")})`,
      actions: [
        { name: "编辑", action: "edit" },
        { name: "关闭", action: "close" },
        { name: "复制", action: "copy" },
        { name: "测试", action: "test" },
      ],
    };
  },
  methods: {
    handleBack() {
      this.wxRouterLinkMixin(-1, false);
    },
    handleActionsheet() {
      this.commit("setActionsheet", {
        show: true,
        list: this.actions,
      });
    },
    commit(mutation, payload) {
      this.$store.commit(`${mutation}`, payload);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/fn";

header {
  padding: 0 px2rem(15);
  font-size: px2rem(17);
  color: #fff;
  background: linear-gradient(
    315deg,
    $--color-blue 0%,
    rgba(51, 144, 255, 1) 100%
  );

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: px2rem(45);
  }

  .lt,
  .rt {
    min-width: px2rem(17);
  }

  .md {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .back,
  .query,
  .submit,
  .dots {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .back {
    width: px2rem(10);
    height: px2rem(17);
  }

  .query {
    width: px2rem(17);
    height: px2rem(17);
  }

  .submit {
    width: px2rem(20);
    height: px2rem(15);
    background-size: cover;
  }

  .dots {
    position: relative;
    height: px2rem(4);
    background-size: cover;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(45);
      height: px2rem(45);
      content: "";
    }
  }
}
</style>
