import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routeAction: "",
    header: {
      dropdownSelect: null,
    },
    list: {
      dropdownSelects: null,
    },
    actionsheet: {
      show: false,
      list: null,
      action: "",
      id: "",
      desc: "",
    },
  },
  mutations: {
    setRouteAction(state, payload) {
      state.routeAction = payload;
    },
    setHeaderDropdownSelect(state, payload) {
      state.header.dropdownSelect = payload;
    },
    setListDropdownSelects(state, payload) {
      state.list.dropdownSelects = payload;
    },
    setActionsheet(state, payload) {
      state.actionsheet = payload;
    },
  },
  actions: {},
  modules: {},
});
