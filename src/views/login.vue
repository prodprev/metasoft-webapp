<template>
  <div
    class="login"
    :style="{
      backgroundImage: `url(${require('../assets/images/login-bg.png')})`,
    }"
  >
    <div class="setting" @click="wxRouterLinkMixin({ name: 'setting' })">
      <img :src="require('../assets/images/icon-gear.svg')" />设置
    </div>
    <div
      class="logo"
      :style="{
        backgroundImage: 'url(' + require('../assets/images/logo@2x.png') + ')',
      }"
    ></div>
    <div class="form">
      <div class="form-group">
        <img :src="require('../assets/images/icon-user.svg')" />
        <input placeholder="请输入账号" v-model="username" />
      </div>
      <div class="form-group">
        <img :src="require('../assets/images/icon-lock.svg')" />
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="form-group">
        <button class="primary" @click="handleLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import routerMixin from "@/mixins/router.mixin";

const db = { username: "admin", password: "12345" };

export default {
  mixins: [routerMixin],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // TODO: this.$api.xxx
      if (this.username == db.username && this.password == db.password) {
        this.$router.push({ path: "/index" });
      } else {
        Toast({
          message: "账号或密码错误",
          position: "bottom",
          duration: 3000,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.login {
  @include pagefix();
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
}

.setting {
  position: absolute;
  top: px2rem(40);
  right: px2rem(20);
  display: flex;
  align-items: center;
  font-size: px2rem(12);
  color: $--color-dark;
  cursor: pointer;

  img {
    width: px2rem(14);
    margin-right: px2rem(5);
  }
}

.logo {
  position: absolute;
  top: px2rem(111);
  left: 50%;
  width: px2rem(172);
  height: px2rem(66);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  transform: translateX(-50%);
}

.form {
  position: absolute;
  top: px2rem(217);
  left: 50%;
  width: px2rem(303);
  transform: translateX(-50%);

  input {
    padding: 0 px2rem(20) 0 px2rem(52);
    border-color: #e8e8e8;
  }

  button {
    margin-top: px2rem(20);
  }
}

.form-group {
  position: relative;
  display: flex;

  img {
    position: absolute;
    top: px2rem(15);
    left: px2rem(20);
    height: px2rem(20);
  }

  & + .form-group {
    margin-top: px2rem(20);
  }
}
</style>
