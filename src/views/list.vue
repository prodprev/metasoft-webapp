<template>
  <div class="list">
    <Header />
    <div class="content">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :top-all-loaded="allLoaded"
                   :bottom-all-loaded="allLoaded"
                   :top-distance="100"
                   :bottom-distance="70"
                   :distance-index="2"
                   @top-status-change="handleTopChange"
                   @bottom-status-change="handleBottomChange"
                   ref="loadmore">
        <Brief :class="{
          active:
            $store.state.actionsheet.id == item.id || clicked.id == item.id,
        }"
               :key="index"
               v-for="(item, index) in list"
               :data="item"
               @actionsheet="handleActionsheet(item)"
               @click.native="handleClick(item)" />
        <div slot="top"
             class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'"
                :class="{ 'is-rotate': topStatus === 'drop' }">↓ 下拉刷新</span>
          <span v-show="topStatus === 'loading'">加载中...</span>
        </div>
        <div slot="bottom"
             class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'"
                :class="{ 'is-rotate': bottomStatus === 'drop' }">↑ 释放更新</span>
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import Brief from "@/components/Brief";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  components: {
    Header,
    Brief,
  },
  data() {
    return {
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
      bottomStatus: ""
    };
  },
  watch: {
    "$store.state.actionsheet.action": function(newVal) {
      if (!newVal) return;

      this.$router.push({ name: "todo" });
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
</style>
