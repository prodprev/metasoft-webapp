import {
  Icon,
  Divider,
  Table,
  TableColumn,
  Pagination,
  Button,
  Input,
  InputNumber,
  Dialog,
  Select,
  Option,
} from "element-ui";

const components = {
  Icon,
  Divider,
  Table,
  TableColumn,
  Pagination,
  Button,
  Input,
  InputNumber,
  Dialog,
  Select,
  Option,
};

const componentsHandler = {
  install(Vue) {
    Object.keys(components).forEach((key) => Vue.use(components[key]));
  },
};

export default componentsHandler;
