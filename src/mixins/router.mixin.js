export default {
  methods: {
    wxRouterLinkMixin(route, isNoAni) {
      if (route === -1) {
        this.$store.commit("setRouteAction", isNoAni ? "no-animate" : "pop");
        this.$router.go(-1);
        return;
      }

      let level;
      const routes = this.$router.options.routes;
      const checkRouteLevel = function(routes) {
        for (let r of routes) {
          if (
            (r.name && r.name == route.name) ||
            (route.path && route.path == r.path)
          ) {
            return (level = r.meta ? r.meta.level || 1 : 1);
          } else if (r.children) {
            checkRouteLevel(r.children);
          }
        }
      };

      level = checkRouteLevel(routes);

      this.$store.commit("setRouteAction", level > 1 ? "push" : "no-animate");

      this.$router.push(route);
    },
  },
};
