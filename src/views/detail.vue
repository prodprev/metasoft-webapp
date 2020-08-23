<template>
  <div class="detail">
    <Header />
    <div class="content">
      <Paragraph title="基本信息">
        <FieldGroup name="活动主题" :inline="true">
          <input v-model="info.theme" disabled />
        </FieldGroup>
        <FieldGroup name="活动方式" :inline="true">
          <input v-model="info.mode" disabled />
        </FieldGroup>
        <FieldGroup name="参与人" :inline="true" :arrow="true">
          <input v-model="info.people" disabled />
        </FieldGroup>
        <FieldGroup name="地点" :inline="true" :arrow="true">
          <input v-model="info.place" disabled />
        </FieldGroup>
        <FieldGroup name="类型" :inline="true">
          <input v-model="info.type" disabled />
        </FieldGroup>
        <FieldGroup name="是否预约" :inline="true">
          <input v-model="info.subscribe" disabled />
        </FieldGroup>
      </Paragraph>
      <Paragraph title="线索">
        <FieldGroup name="描述" :inline="true" :long="true">
          <div class="long-text">{{ info.desc }}</div>
        </FieldGroup>
        <FieldGroup name="开始时间" :inline="true">
          <input v-model="info.startTime" disabled />
        </FieldGroup>
        <FieldGroup name="结束时间" :inline="true">
          <input v-model="info.endTime" disabled />
        </FieldGroup>
        <FieldGroup name="关系等级" :inline="true">
          <input v-model="info.level" disabled />
        </FieldGroup>
        <FieldGroup name="备注" :inline="true">
          <input v-model="info.remark" disabled />
        </FieldGroup>
        <FieldGroup name="附件" :inline="true" :long="true">
          <div class="attachments">
            <div
              class="long-text attachment"
              :key="index"
              v-for="(item, index) in info.attachments"
              @click="handleDownload(item)"
            >
              <img
                class="icon"
                :src="require('../assets/images/icon-paper-clip.svg')"
              />
              <label>{{ item.name }}</label>
            </div>
          </div>
        </FieldGroup>
        <ul class="history">
          <li :key="index" v-for="(item, index) in info.history">
            <img
              v-if="item.type == 'created'"
              :src="require('../assets/images/icon-history-created.svg')"
            />
            <img
              v-if="item.type == 'updated'"
              :src="require('../assets/images/icon-history-updated.svg')"
            />
            <label v-if="item.type == 'created'"
              >{{ item.user }}创建于：{{ item.createTime }}</label
            >
            <label v-if="item.type == 'updated'"
              >{{ item.user }}编辑于：{{ item.updateTime }}</label
            >
          </li>
        </ul>
      </Paragraph>
      <Paragraph title="联系方式">
        <FieldGroup name="活动方式" :inline="true">
          <input v-model="info.mode" disabled />
        </FieldGroup>
        <FieldGroup name="参与人" :inline="true" :arrow="true">
          <input v-model="info.people" disabled />
        </FieldGroup>
        <FieldGroup name="地点" :inline="true" :arrow="true">
          <input v-model="info.place" disabled />
        </FieldGroup>
        <FieldGroup name="类型" :inline="true">
          <input v-model="info.type" disabled />
        </FieldGroup>
        <FieldGroup name="是否预约" :inline="true">
          <input v-model="info.subscribe" disabled />
        </FieldGroup>
      </Paragraph>
      <Paragraph title="相关信息" class="refs">
        <div class="ref" :key="index" v-for="(item, index) in refs">
          <Pic :url="item.image" />
          <label class="name">{{ item.name }}</label>
          <i class="count">{{ item.count }}</i>
          <img class="more" :src="require('../assets/images/icon-plus.svg')" />
        </div>
      </Paragraph>
    </div>
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import Paragraph from "@/components/Paragraph";
import FieldGroup from "@/components/FieldGroup";
import Pic from "@/components/Pic";
import download from "@/utils/download";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  components: {
    Header,
    Paragraph,
    FieldGroup,
    Pic,
  },
  data() {
    return {
      info: {
        theme: "动画长片狮子王问世",
        mode: "线下交流",
        people: "大法师、王老板、大师傅",
        place: "北京东城区东直门南大街14号",
        type: "日程安排",
        subscribe: "否",
        desc:
          "1994年，迪士尼经典动画长片狮子王问世，迅速占领全球荧幕，成为一代中国观众第一次认识迪士尼的窗口。",
        startTime: "2020-05-20 09:00",
        endTime: "2020-05-20 12:00",
        level: "无",
        remark: "禁止携带物品",
        attachments: [
          { name: "门票.doxc", url: "" },
          { name: "景点.doxc", url: "" },
        ],
        history: [
          { type: "created", user: "刘经理", createTime: "2020-08-02 10:00" },
          { type: "updated", user: "刘经理", updateTime: "2020-08-03 15:00" },
        ],
      },
      refs: [
        { image: "", name: "销售订单", count: 8 },
        { image: "", name: "线索", count: 23 },
        { image: "", name: "销售机会", count: 123 },
      ],
    };
  },
  methods: {
    handleDownload(item) {
      download(item.url);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.detail {
  @include pagefix();

  header {
    flex: 0 0 px2rem(45);
  }

  .content {
    flex: 0 0 calc(100% - #{px2rem(45)});
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.long-text {
  display: flex;
  align-items: center;
  font-size: px2rem(14);
  color: $--color-dark;

  .icon {
    width: px2rem(14);
    margin-right: px2rem(8);
  }

  &.attachment {
    color: $--color-blue;
  }
}

.attachments {
  display: flex;
  flex-direction: column;
  width: 100%;

  .attachment {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);

    & + .attachment {
      margin-top: px2rem(10);
    }

    &:hover {
      text-decoration: underline;
    }
  }
}

.history {
  padding: px2rem(5) px2rem(15);
  // margin-top: px2rem(20);
  border-radius: px2rem($--border-radius);
  border: px2rem(1) solid #eee;
  font-size: px2rem(12);
  color: $--color-dark-200;

  li {
    display: flex;
    align-items: center;
    height: px2rem(30);

    img {
      height: px2rem(15);
      margin-right: px2rem(15);
    }
  }
}

.refs {
  margin-top: px2rem(10);
  border-top: none !important;

  .ref {
    display: flex;
    align-items: center;
    height: px2rem(69);

    .pic {
      margin-right: px2rem(15);
    }

    .name {
      margin-right: auto;
      font-size: px2rem(16);
      color: $--color-dark;
    }

    .count {
      padding: px2rem(2) px2rem(6);
      margin-right: px2rem(15);
      font-size: px2rem(12);
      border-radius: px2rem(10);
      background-color: $--color-dark-200;
      color: #fff;
    }

    .more {
      width: px2rem(15);
      height: px2rem(15);
    }

    & + .ref {
      border-top: px2rem(1) solid #eee;
    }
  }
}
</style>
