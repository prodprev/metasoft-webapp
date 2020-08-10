<template>
  <div class="list">
    <Brief
      :key="index"
      v-for="(item, index) in list"
      :data="item"
      @actionsheet="handleActionsheet"
    />
  </div>
</template>

<script>
import Brief from "@/components/Brief";

export default {
  components: {
    Brief,
  },
  data() {
    return {
      dropdownSelects: [],
      list: [],
      actions: [
        { name: "编辑", action: "edit" },
        { name: "删除", action: "remove" },
        { name: "关闭", action: "close" },
        { name: "复制", action: "copy" },
        { name: "测试", action: "test" },
      ],
    };
  },
  watch: {
    "$store.state.actionsheet.action": function(newVal) {
      if (!newVal) return;

      window.alert(JSON.stringify(newVal));
    },
  },
  methods: {
    init() {
      window.setTimeout(() => {
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
        ];

        this.commit("setListDropdownSelects", this.dropdownSelects);
      }, 1000);
    },
    commit(mutation, payload) {
      this.$store.commit(`${mutation}`, payload);
    },
    handleActionsheet(msg) {
      this.commit("setActionsheet", {
        show: true,
        list: this.actions,
        desc: msg.title,
      });
    },
  },
  created: function() {
    this.init();
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: #fff;
}
</style>
