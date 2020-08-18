import Vue from "vue";
import Vuerify from "vuerify";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/apis";
import mintComponents from "@/mint.config";
import "mint-ui/lib/style.min.css";
import "@/utils/dateFormat";
import "@/assets/font-face/css/font-face.css";

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$log = console.log;

Vue.use(Vuerify);
Vue.use(mintComponents);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
