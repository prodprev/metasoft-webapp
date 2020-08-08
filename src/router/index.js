import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/index";
import Home from "@/views/home";

Vue.use(VueRouter);

const routeOptions = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [{ path: "", component: Home }],
  },
  { path: "/login", name: "login" },
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
