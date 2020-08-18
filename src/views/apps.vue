<template>
  <div class="apps">
    <div
      class="page-container"
      :style="{
        width: pageTotal * 100 + 'vw',
        marginLeft: (1 - pageCurrent) * 100 + 'vw',
      }"
    >
      <div class="page" :key="pageNum" v-for="pageNum in pageTotal">
        <div
          class="page-item"
          :key="index"
          v-for="(item, index) in list.slice(
            (pageNum - 1) * pageSize,
            (pageNum - 1) * pageSize + pageSize
          )"
          @click="handleClick(item)"
        >
          <Pic :url="item.image" />
          <label>{{ item.name }}</label>
        </div>
      </div>
    </div>
    <nav v-if="pageTotal > 1">
      <ul>
        <li
          :class="{ active: i == pageCurrent }"
          :key="i"
          v-for="i in pageTotal"
          @click="pageCurrent = i"
        ></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Pic from "@/components/Pic";
import gesture from "@/utils/gesture";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  components: {
    Pic,
  },
  data() {
    return {
      list: [],
      pageSize: 16,
      pageTotal: 1,
      pageCurrent: 1,
    };
  },
  watch: {
    list(val) {
      this.pageTotal = Math.ceil(val.length / this.pageSize);

      this.$nextTick(() => {
        this.layout();
      });
    },
  },
  methods: {
    init() {
      // TODO: http request
      this.list = [
        {
          name: "应用名称",
          image:
            "https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1595130778,1398929864&fm=202&mola=new&crop=v1",
        },
        {
          name: "应用名称",
          image:
            "https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1595130778,1398929864&fm=202&mola=new&crop=v1",
        },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
        { name: "应用名称", image: "" },
      ];
    },
    ready() {
      gesture.on((direction) => {
        switch (direction) {
          case "to-left":
            if (this.pageCurrent == this.pageTotal) {
              window.setTimeout(() => {
                this.pageCurrent = this.pageTotal;
              }, 120);

              // this.pageCurrent = this.pageTotal + 0.1; 弹簧效果

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

              return;
            }

            this.pageCurrent -= 1;

            break;
        }
      });
    },
    layout() {
      const mainH = document.querySelector("main").clientHeight;
      const contH = document.querySelector(".page-container").clientHeight;
      const navH = document.querySelector("nav").clientHeight;

      if (mainH > contH + navH) {
        const diffH = mainH - (contH + navH);

        document.querySelector(".page-container").style.height =
          contH + diffH + "px";
        document.querySelectorAll(".page-item").forEach((el) => {
          const paddingTop = parseFloat(
            window.getComputedStyle(el).getPropertyValue("padding-top")
          );

          el.style.padding = `${paddingTop + diffH / 8}px 0`;
        });
      } else if (mainH <= contH + navH) {
        const diffH = contH + navH - mainH + 2;

        const ptVal = diffH / 10;

        document.querySelectorAll(".page-item").forEach((el) => {
          const paddingTop = parseFloat(
            window.getComputedStyle(el).getPropertyValue("padding-top")
          );

          el.style.padding = `${paddingTop - ptVal}px 0`;
        });

        document.querySelector("nav").style.height = navH - 2 * ptVal + "px";
      }
    },
    handleClick(item) {
      this.$log(item);

      this.wxRouterLinkMixin({ name: "list", params: { data: item } });
    },
  },
  created: function() {
    this.init();
  },
  mounted: function() {
    this.ready();
  },
  beforeDestroy: function() {
    gesture.off();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.apps {
  font-size: px2rem(12);
  color: $--color-dark-100;
  overflow-x: hidden;
}

.page-container {
  display: flex;
  background-color: #fff;
  @include transition(margin-left);
}

.page {
  flex: 0 0 100vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.page-item {
  position: relative;
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: px2rem(20) 0;

  .pic {
    margin-bottom: px2rem(15);
  }

  label {
    width: px2rem(78);
    line-height: px2rem(16);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:nth-child(4n + 1)::after {
    position: absolute;
    right: calc(-300% + #{px2rem(15)});
    bottom: 0;
    left: px2rem(15);
    content: "";
    height: px2rem(1);
    background-color: #eee;
  }
}

nav {
  height: px2rem(67);
  padding: 0 px2rem(15);
  background-color: #fff;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;

    li {
      width: px2rem(7);
      height: px2rem(7);
      border: px2rem(1) solid $--color-gray-200;
      border-radius: 50%;
      @include transition(all);

      &.active {
        border-color: $--color-blue;
        background-color: $--color-blue;
      }

      & + li {
        margin-left: px2rem(16);
      }
    }
  }
}
</style>
