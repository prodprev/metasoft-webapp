import Vue from "vue";
import VueRouter from "vue-router";
import index from "@/views/index";

Vue.use(VueRouter);

const routeOptions = [
  { path: "/components", name: "common/components" },
  { path: "/nopermission", name: "common/no-permission" },
  { path: "/", redirect: "/1" },
  { path: "/:page", name: "index", component: index },
  { path: "/:page/history", name: "history" },
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

    return route;
  }),
});

export default router;
