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
  {
    path: "/",
    component: Index,
    children: [
      { path: "", name: "home", component: Home, meta: { title: "首页" } },
      { path: "/apps", name: "apps", meta: { title: "应用" } },
      { path: "/list", name: "list", meta: { title: "列表展示" } },
    ],
  },
  { path: "/login", name: "login" },
  { path: "/todo", name: "todo", meta: { title: "空白页" } }, // TODO:
  { path: "/components", name: "common/components" },
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
