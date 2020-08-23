<template>
  <div class="customer">
    <Header />
    <div class="content">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :bottom-distance="70"
        :distance-index="2"
        @bottom-status-change="handleBottomChange"
        ref="loadmore"
      >
        <div class="search">
          <input type="search" placeholder="请输入要搜索的内容" />
          <img :src="require('../assets/images/icon-search-gray.svg')" />
        </div>
        <ul>
          <li
            :class="{ active: item['_selected'] }"
            :key="index"
            v-for="(item, index) in list"
            @click="handleSelect(item)"
          >
            <span
              class="check"
              :style="{
                backgroundImage: `url(${require('../assets/images/icon-check.svg')})`,
              }"
            ></span>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
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
import Header from "@/views/layout/header";
import routerMixin from "@/mixins/router.mixin";

const customerData = [];
const dataFactory = () => {
  let start = customerData.length;
  let count = start + 10;

  for (let i = start; i < count; i++) {
    customerData.push({
      id: i + 1,
      name: "客户名称" + (i + 1),
    });
  }

  return customerData;
};

export default {
  mixins: [routerMixin],
  components: {
    Header,
  },
  data() {
    return {
      list: [],
      allLoaded: false,
      bottomStatus: "",
    };
  },
  methods: {
    init() {
      this.list = dataFactory();
    },
    loadBottom() {
      // 加载更多数据
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.list = dataFactory();
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleSelect(item) {
      const _item = this.list.find((o) => o.id == item.id);

      if (_item["_selected"]) {
        _item["_selected"] = false;
      } else {
        _item["_selected"] = true;
      }

      this.list = [...this.list];
    },
  },
  created: function() {
    this.init();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.customer {
  @include pagefix();

  .content {
    flex: 0 0 1;
    height: calc(100% - #{px2rem(45)});
    padding: px2rem(15) px2rem(15) px2rem(2) px2rem(15);
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .search {
    position: relative;
    display: flex;
    height: px2rem(40);
    margin-bottom: px2rem(15);

    input {
      height: inherit;
      padding: 0 px2rem(45) 0 px2rem(15);
      border: px2rem(2) solid $--color-gray-100;
      font-size: px2rem(14);

      &:focus {
        border: px2rem(1) solid $--color-blue !important;
      }
    }

    img {
      position: absolute;
      top: px2rem(12);
      right: px2rem(15);
      width: px2rem(15);
      height: px2rem(15);
    }
  }

  ul {
    font-size: px2rem(14);

    li {
      display: flex;
      align-items: center;
      padding: px2rem(13) px2rem(5);
      cursor: pointer;

      .check {
        flex-shrink: 0;
        width: px2rem(20);
        height: px2rem(20);
        margin-right: px2rem(10);
        border: px2rem(2) solid #e8e8e8;
        border-radius: 50%;
        background-position: center;
        background-size: 90%;
        background-repeat: no-repeat;
      }

      .name {
        @include txtEll();
      }

      & + li {
        border-top: px2rem(1) solid #eee;
      }

      &.active .check {
        border-color: $--color-blue;
        background-color: $--color-blue;
      }
    }
  }
}
</style>
