<template>
  <footer>
    <span class="menu"
          :class="{select: item.code == select}"
          :key="index"
          v-for="(item, index) in menus"
          @click="select = item.code">
      <label class="icon">
        <i v-if="item.badgeCount">{{item.badgeCount}}</i>
        <img class="normal"
             :src="item.icon" />
        <img class="active"
             :src="item.iconActive" />
      </label>
      <label>{{item.name}}</label>
    </span>
  </footer>
</template>

<script>
const homeIcon = require("../../assets/images/icon-home.svg");
const homeIconActive = require("../../assets/images/icon-home-active.svg");
const messageIcon = require("../../assets/images/icon-bell.svg");
const messageIconActive = require("../../assets/images/icon-bell-active.svg");
const appIcon = require("../../assets/images/icon-hierarchy.svg");
const appIconActive = require("../../assets/images/icon-hierarchy-active.svg");
const meIcon = require("../../assets/images/icon-menu-user.svg");
const meIconActive = require("../../assets/images/icon-menu-user-active.svg");

export default {
  data() {
    return {
      menus: [
        {name: "首页", code: "home", icon: homeIcon, iconActive: homeIconActive},
        {name: "消息", code: "message", icon: messageIcon, iconActive: messageIconActive, badgeCount: 12},
        {name: "应用", code: "apps", icon: appIcon, iconActive: appIconActive},
        {name: "我的", code: "me", icon: meIcon, iconActive: meIconActive}
        ],
      select: this.$route.name || "home"
    }
  },
  watch: {
    "$route.name": function(newVal) {
      this.select = newVal;
    },
    "select": function(newVal) {
      this.$router.push({name: newVal});
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/fn";

footer {
  display: flex;
  align-items: center;
  height: px2rem($--footer-height);
  background: #fff;
  box-shadow: 0 px2rem(8) px2rem(15) 0 rgba(54, 64, 65, 0.25);
}

.menu {
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: px2rem($--footer-height);
  height: px2rem($--footer-height);
  font-size: px2rem(12);
  color: $--color-dark-200;
  cursor: pointer;

  .icon {
    position: relative;
    height: px2rem(18);
    margin-bottom: px2rem(2);

    i {
      position: absolute;
      top: px2rem(-7);
      left: px2rem(7);
      min-width: px2rem(22);
      padding: px2rem(2) px2rem(4);
      border-radius: px2rem(16);
      background: linear-gradient(
        317deg,
        rgba(232, 63, 148, 1) 0%,
        rgba(245, 78, 94, 1) 100%
      );
      color: #fff;
      text-align: center;
      transform: scale(0.7);
    }

    img {
      width: px2rem(18);
      height: px2rem(18);

      &.active {
        display: none;
      }
    }
  }

  &.select {
    color: $--color-blue;
    cursor: default;

    img {
      &.active {
        display: block;
      }

      &.normal {
        display: none;
      }
    }

    label {
      cursor: default;
    }
  }

  label {
    cursor: pointer;
  }
}
</style>
