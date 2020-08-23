import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/index";
import Home from "@/views/home";

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routeOptions = [
  { path: "/", redirect: "login" },
  { path: "/login", name: "login", meta: { level: 1 } },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: { title: "首页", level: 1 },
      },
      { path: "/news", name: "news", meta: { title: "消息", level: 1 } },
      { path: "/apps", name: "apps", meta: { title: "应用", level: 1 } },
      { path: "/me", name: "me", meta: { title: "我的", level: 1 } },
    ],
  },
  { path: "/create", name: "create", meta: { title: "新建", level: 2 } },
  { path: "/customer", name: "customer", meta: { title: "请选择", level: 3 } },
  { path: "/multi", name: "multi", meta: { title: "请选择", level: 3 } },
  { path: "/list", name: "list", meta: { title: "列表展示", level: 2 } },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { title: "查看活动", level: 3 },
  },
  { path: "/setting", name: "setting", meta: { title: "设置", level: 2 } },
  {
    path: "/workbench",
    name: "workbench",
    meta: { title: "工作台", level: 2 },
  },
  { path: "/todo", name: "todo", meta: { title: "空白页", level: 99 } },
  { path: "/nopermission", name: "common/no-permission" },
  { path: "*", name: "common/not-found" },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: routeOptions.map((route) => {
    if (!route.component) {
      route = {
        ...route,
        component: () =>
          import(/* webpackChunkName: "[request]" */ `@/views/${route.name}`),
      };
    }

    if (route.children) {
      route.children = route.children.map((route) => {
        if (!route.component) {
          route = {
            ...route,
            component: () =>
              import(
                /* webpackChunkName: "[request]" */ `@/views/${route.name}`
              ),
          };
        }

        return route;
      });
    }

    return route;
  }),
});

export default router;
