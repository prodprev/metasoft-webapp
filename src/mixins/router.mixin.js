import gesture from "@/utils/gesture";

export default {
  beforeRouteLeave(to, from, next) {
    if (to.meta.level < from.meta.level) {
      this.$store.state.routeAction == "push" &&
        this.$store.commit("setRouteAction", "no-animate"); // 作用于浏览器的后退按钮，而非执行wxRouterLinkMixin(-1, true);
    }

    gesture.off();

    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.name == "apps") {
        vm.appsGesture();
      } else {
        vm.backGesture();
      }
    });
  },
  methods: {
    backGesture() {
      gesture.on((direction) => {
        const currentRoute = this.$route;

        switch (direction) {
          case "to-left":
            if (currentRoute.meta.level == 1) {
              if (currentRoute.name == "home") {
                this.$router.push({ name: "news" });
              } else if (currentRoute.name == "news") {
                this.$router.push({ name: "apps" });
              } else if (currentRoute.name == "apps") {
                this.$router.push({ name: "me" });
              }
            }

            break;
          case "to-right":
            if (currentRoute.meta.level == 1) {
              if (currentRoute.name == "news") {
                this.$router.push({ name: "home" });
              } else if (currentRoute.name == "apps") {
                this.$router.push({ name: "news" });
              } else if (currentRoute.name == "me") {
                this.$router.push({ name: "apps" });
              }
            } else if (currentRoute.meta.level > 1) {
              this.$store.commit("setRouteAction", "pop");
              this.$router.go(-1);
            }

            break;
        }
      });
    },
    appsGesture() {
      gesture.on((direction) => {
        switch (direction) {
          case "to-left":
            if (this.pageCurrent == this.pageTotal) {
              window.setTimeout(() => {
                this.pageCurrent = this.pageTotal;
              }, 120);

              // this.pageCurrent = this.pageTotal + 0.1; 弹簧效果
              this.$router.push({ name: "me" });

              return;
            }

            this.pageCurrent += 1;

            break;
          case "to-right":
            if (this.pageCurrent == 1) {
              window.setTimeout(() => {
                this.pageCurrent = 1;
              }, 120);

              // this.pageCurrent = 0.9; 弹簧效果
              this.$router.push({ name: "news" });

              return;
            }

            this.pageCurrent -= 1;

            break;
        }
      });
    },
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
