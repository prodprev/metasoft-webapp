<template>
  <div class="list">
    <header>
      <div class="wrapper">
        <div class="lt">
          <div
            class="back"
            :style="{ backgroundImage: backBgImg }"
            @click="handleBack"
          ></div>
        </div>
        <div
          class="md dd"
          :class="{ show: dropdownToggle }"
          @click="handleDropdown"
        >
          {{ $route.meta.title }}
          <span
            class="dropdown"
            :style="{ backgroundImage: dropdownBgImg }"
          ></span>
          <transition name="slide-fade">
            <ul v-if="dropdownToggle" class="dropdown-selects">
              <li
                :key="index"
                v-for="(item, index) in $store.state.list.dropdownSelects"
                @click.stop="handleSelect(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </transition>
        </div>
        <div class="rt">
          <div class="add" :style="{ backgroundImage: addBgImg }"></div>
        </div>
      </div>
      <div class="wrapper flex-start">
        <Search @input="handleInput" />
        <div class="filter" :style="{ backgroundImage: filterBgImg }"></div>
      </div>
    </header>
    <div class="content">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :top-all-loaded="allLoaded"
        :bottom-all-loaded="allLoaded"
        :top-distance="100"
        :bottom-distance="70"
        :distance-index="2"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
        ref="loadmore"
      >
        <Brief
          :class="{
            active:
              $store.state.actionsheet.id == item.id || clicked.id == item.id,
          }"
          :key="index"
          v-for="(item, index) in list"
          :data="item"
          @actionsheet="handleActionsheet(item)"
          @click.native="handleClick(item)"
        />
        <div slot="top" class="mint-loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ 'is-rotate': topStatus === 'drop' }"
            >↓ 下拉刷新</span
          >
          <span v-show="topStatus === 'loading'">加载中...</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >↑ 释放更新</span
          >
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Brief from "@/components/Brief";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  components: {
    Search,
    Brief,
  },
  data() {
    return {
      backBgImg: `url(${require("../assets/images/icon-header-back.svg")})`,
      dropdownBgImg: `url(${require("../assets/images/icon-header-dropdown.svg")})`,
      addBgImg: `url(${require("../assets/images/icon-header-add.svg")})`,
      filterBgImg: `url(${require("../assets/images/icon-search-filter.svg")})`,
      dropdownToggle: false,
      dropdownSelects: [],
      list: [],
      clicked: {},
      actions: [
        { name: "编辑", action: "edit" },
        { name: "删除", action: "remove" },
        { name: "关闭", action: "close" },
        { name: "复制", action: "copy" },
        { name: "测试", action: "test" },
      ],
      allLoaded: false,
      topStatus: "",
      bottomStatus: "",
    };
  },
  watch: {
    "$store.state.actionsheet.action": function(newVal) {
      if (!newVal) return;

      this.wxRouterLinkMixin({ name: "todo", params: { data: newVal } });
    },
  },
  methods: {
    init() {
      this.dropdownSelects = [
        { id: 1, name: "内容名称1" },
        { id: 2, name: "内容名称2" },
        { id: 3, name: "内容名称3" },
        { id: 4, name: "内容名称4" },
      ];
      this.list = [
        {
          id: 1,
          title: "今日日程安排",
          desc: "今天对于张与来说，只是2030年普普通通的一天天张",
        },
        {
          id: 2,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 3,
          title: "如果没有他，全世界的褶皱都会被熨",
          desc: "Steve Jobs有100件他设计的黑色高领衫",
        },
        {
          id: 4,
          title: "长大以后，我想成为她",
          desc: "无论身处人生的哪个阶段，每个女孩都会常常问自己",
        },
        {
          id: 5,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 6,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 7,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 8,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 9,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
        {
          id: 10,
          title: "和狗不同，猫只做自己真正喜欢的事",
          desc: "对铲屎官来说，在外面遇到任何不开心，关上家门遇",
        },
      ];

      this.commit("setListDropdownSelects", this.dropdownSelects);
    },
    commit(mutation, payload) {
      this.$store.commit(`${mutation}`, payload);
    },
    loadTop() {
      // 加载更多数据
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载更多数据
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBack() {
      const isNoAni = this.$route.name == "todo" || this.$route.path == "/todo";

      this.wxRouterLinkMixin(-1, isNoAni);
    },
    handleDropdown() {
      if (this.$route.name != "list") return;

      this.dropdownToggle = !this.dropdownToggle;
    },
    handleSelect(item) {
      this.dropdownToggle = false;

      this.commit("setHeaderDropdownSelect", item);
    },
    handleInput() {},
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleActionsheet(msg) {
      this.commit("setActionsheet", {
        show: true,
        list: this.actions,
        id: msg.id,
        desc: msg.title,
      });
    },
    handleClick(item) {
      this.clicked = item;

      this.wxRouterLinkMixin({ name: "detail", params: { id: item.id } });
    },
  },
  created: function() {
    this.init();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.list {
  @include pagefix();

  header {
    flex: 0 0 px2rem(90);
  }

  .content {
    flex: 0 0 calc(100% - #{px2rem(90)});
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}

header {
  padding: 0 px2rem(15);
  font-size: px2rem(17);
  color: #fff;
  background: linear-gradient(
    315deg,
    $--color-blue 0%,
    rgba(51, 144, 255, 1) 100%
  );

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: px2rem(45);

    &.flex-start {
      align-items: flex-start;
    }
  }

  .lt,
  .rt {
    min-width: px2rem(17);
  }

  .md {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    z-index: 1;

    &.dd {
      cursor: pointer;

      .dropdown {
        display: block;
      }
    }

    &.show {
      .dropdown {
        transform: rotate(-180deg);
      }
    }
  }

  .back,
  .dropdown,
  .add,
  .filter {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .back {
    width: px2rem(10);
    height: px2rem(17);
  }

  .dropdown {
    display: none;
    position: absolute;
    top: px2rem(10);
    right: px2rem(-16);
    width: px2rem(10);
    height: px2rem(5);
    margin-left: px2rem(6);
    @include transition(all);
  }

  .add {
    width: px2rem(17);
    height: px2rem(17);
  }

  .filter {
    width: px2rem(15);
    height: px2rem(16);
    margin: px2rem(9) px2rem(1);
  }

  .search {
    flex: 1;
    margin-right: px2rem(15);
  }

  .dropdown-selects {
    position: absolute;
    top: 0;
    left: 50%;
    width: px2rem(170);
    margin-top: px2rem(36);
    border-radius: px2rem(10);
    font-size: px2rem(16);
    color: $--color-dark;
    background-color: #fff;
    box-shadow: 0 px2rem(6) px2rem(25) 0 rgba(0, 0, 0, 0.13);
    transform: translateX(-50%);
    z-index: 1;

    li {
      padding: px2rem(17);
      line-height: px2rem(16);
      text-align: center;

      & + li {
        border-top: 1px solid $--color-gray;
      }
    }

    &::before {
      position: absolute;
      top: px2rem(-20);
      left: 50%;
      content: "";
      width: 0;
      height: 0;
      border-width: px2rem(10);
      border-style: solid;
      border-color: transparent transparent #fff;
      transform: translateX(-50%);
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  @include transition(all);
}

.slide-fade-enter,
.slide-fade-leave-to {
  top: px2rem(-10);
  opacity: 0;
}
</style>
