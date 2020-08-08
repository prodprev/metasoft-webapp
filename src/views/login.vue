<template>
  <div class="login">
    <div class="setting">
      <img :src="require('../assets/images/icon-gear.svg')" />设置
    </div>
    <div class="logo"
         :style="{
        backgroundImage: 'url(' + require('../assets/images/logo@2x.png') + ')',
      }"></div>
    <div class="form">
      <div class="form-group">
        <img :src="require('../assets/images/icon-user.svg')" />
        <input placeholder="请输入账号"
               v-model="username" />
      </div>
      <div class="form-group">
        <img :src="require('../assets/images/icon-lock.svg')" />
        <input placeholder="请输入密码"
               v-model="password" />
      </div>
      <div class="form-group">
        <button class="primary"
                @click="handleClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleClick() {
      // TODO: this.$api.xxx
      Toast({
        message: '账户或密码错误',
        duration: 3000
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/fn";

.login {
  position: relative;
  height: inherit;
  background-color: #fff;
}

.setting {
  position: absolute;
  top: px2rem(40);
  right: px2rem(20);
  display: flex;
  align-items: center;
  font-size: px2rem(12);

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
