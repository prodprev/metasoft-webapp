import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/apis";
import "@/utils/dateFormat";

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$log = console.log;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
