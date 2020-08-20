import { Toast, Picker, DatetimePicker, Loadmore, Spinner } from "mint-ui";

const components = {
  Toast,
  Picker,
  DatetimePicker,
  Loadmore,
  Spinner,
};

const componentsHandler = {
  install(Vue) {
    Object.keys(components).forEach((key) =>
      Vue.component(components[key]["name"], components[key])
    );
  },
};

export default componentsHandler;
