import { Toast } from "mint-ui";

const components = {
  Toast,
};

const componentsHandler = {
  install(Vue) {
    Object.keys(components).forEach((key) =>
      Vue.component(components[key]["name"], components[key])
    );
  },
};

export default componentsHandler;
