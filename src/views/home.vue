<template>
  <div class="home">
    <div class="today">
      <img :src="require('../assets/images/icon-calendar.svg')" />{{ today }}
    </div>
    <div class="tabs">
      <span
        class="tab calendar"
        :class="{ active: tabActive == 'calendar' }"
        @click="handleTab('calendar')"
        >日历</span
      >
      <span
        class="tab workbench"
        :class="{ active: tabActive == 'workbench' }"
        @click="handleTab('workbench')"
        >工作台</span
      >
    </div>
    <div
      v-if="tabActive == 'calendar'"
      class="tab-content tab-content-calendar"
    ></div>
    <div
      v-if="tabActive == 'workbench'"
      class="tab-content tab-content-workbench"
    >
      <ul>
        <li
          :key="index"
          v-for="(item, index) in list"
          @click="handleQuota(item)"
        >
          <p class="num">
            <i></i><label>{{ number(item.num) }}</label>
          </p>
          <p class="name">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div class="card rbsmt" :class="{ active: rbsmtToggle }">
      <div class="card-head" @click="rbsmtToggle = !rbsmtToggle">
        <img class="icon" :src="require('../assets/images/icon-rbsmt.svg')" />
        <label>报销</label>
        <i class="badge">{{ rbsmtBadge }}</i>
        <img class="arrow" :src="require('../assets/images/icon-arrow.svg')" />
      </div>
      <div class="card-body"></div>
    </div>
    <div class="card order" :class="{ active: orderToggle }">
      <div class="card-head" @click="orderToggle = !orderToggle">
        <img class="icon" :src="require('../assets/images/icon-order.svg')" />
        <label>{{ orderForMonth }}</label>
        <i class="badge">{{ orderBadge }}</i>
        <img class="arrow" :src="require('../assets/images/icon-arrow.svg')" />
      </div>
      <div class="card-body"></div>
    </div>
    <div class="add" @click="wxRouterLinkMixin({ name: 'create' })"></div>
  </div>
</template>

<script>
import number from "@/utils/number";
import routerMixin from "@/mixins/router.mixin";

export default {
  mixins: [routerMixin],
  data() {
    return {
      today: new Date().format("yyyy年MM月dd日"),
      tabActive: "workbench",
      list: [
        { num: 2390, name: "标题名" },
        { num: 23900, name: "标题名" },
        { num: 239000, name: "标题名" },
        { num: 2390000, name: "标题名" },
        { num: 23900000, name: "标题名" },
        { num: 239000000, name: "标题名" },
      ],
      rbsmtToggle: false,
      orderToggle: false,
      orderForMonth: "7月订单",
      rbsmtBadge: 2,
      orderBadge: 23,
    };
  },
  methods: {
    number,
    handleTab(tab) {
      this.tabActive = tab;
    },
    handleQuota(item) {
      this.$log(item);

      this.wxRouterLinkMixin({ name: "workbench" });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.home {
  padding: px2rem(20) px2rem(15);
  font-size: px2rem(16);
}

.today {
  display: flex;
  align-items: center;
  font-size: px2rem(12);

  img {
    width: px2rem(14);
    height: px2rem(14);
    margin-right: px2rem(6);
    margin-bottom: px2rem(1);
  }
}

.tabs {
  display: flex;
  align-items: center;
  margin: px2rem(25) 0 px2rem(15);

  .tab {
    line-height: px2rem(20);
    padding: px2rem(5) px2rem(15);
    font-size: px2rem(16);
    font-weight: 500;
    font-family: $--font-pingfang-medium, $--font-family;
    cursor: pointer;

    &.active {
      border-radius: px2rem(16);
      color: #fff;
      background-color: $--color-blue;
      cursor: default;
    }

    & + .tab {
      margin-left: px2rem(15);
    }
  }
}

.tab-content.tab-content-calendar {
  height: px2rem(176);
  background: #fff;
  border-radius: px2rem(8);
}

.tab-content.tab-content-workbench {
  background: #fff;
  border-radius: px2rem(8);

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      min-height: px2rem(88);
      padding: px2rem(10);
      cursor: pointer;

      .num {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;

        i {
          position: absolute;
          top: 50%;
          left: 0;
          width: px2rem(8);
          height: px2rem(8);
          border: px2rem(2) solid transparent;
          border-radius: 50%;
          transform: translateY(-50%);
        }

        label {
          margin-left: px2rem(13);
          white-space: nowrap;
          cursor: pointer;
        }
      }

      .name {
        width: 100%;
        padding-left: px2rem(13);
        margin-top: px2rem(3);
        font-size: px2rem(12);
        color: $--color-dark-200;
        @include txtEll();
      }

      &:not(:first-child):nth-child(3n + 1)::before {
        position: absolute;
        top: 0;
        left: px2rem(15);
        content: "";
        width: calc(300% - #{px2rem(30)});
        height: px2rem(1);
        background-color: $--color-gray;
      }

      &:nth-child(6n + 1) .num i {
        border-color: $--color-red;
      }

      &:nth-child(6n + 2) .num i {
        border-color: #14a8cc;
      }

      &:nth-child(6n + 3) .num i {
        border-color: #767490;
      }

      &:nth-child(6n + 4) .num i {
        border-color: #94a7ff;
      }

      &:nth-child(6n + 5) .num i {
        border-color: $--color-orange;
      }

      &:nth-child(6n + 6) .num i {
        border-color: $--color-green;
      }
    }
  }
}

.card {
  min-height: px2rem(56);
  padding: 0 px2rem(15);
  margin-top: px2rem(15);
  border-radius: px2rem(8);
  background-color: #fff;

  .card-head {
    display: flex;
    align-items: center;
    height: px2rem(56);
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);

    .icon {
      width: px2rem(18);
      margin-right: px2rem(15);
    }

    label {
      margin-right: auto;
    }

    .badge {
      min-width: px2rem(22);
      padding: px2rem(2);
      margin-right: px2rem(15);
      border-radius: px2rem(12);
      font-size: px2rem(12);
      text-align: center;
      color: #fff;
      background-color: #becce7;
    }

    .arrow {
      width: px2rem(10);
      transform: rotate(0);
      @include transition(all);
    }
  }

  .card-body {
    height: 0;
    visibility: hidden;
    @include transition(height);
  }

  &.active {
    .card-head .arrow {
      transform: rotate(-180deg);
    }

    .card-body {
      min-height: px2rem(100);
      visibility: visible;
    }
  }
}

.add {
  position: fixed;
  right: px2rem(15);
  bottom: px2rem($--footer-height + 25);
  width: px2rem(44);
  height: px2rem(44);
  border-radius: 50%;
  background: linear-gradient(
    318deg,
    $--color-blue 0%,
    rgba(51, 144, 255, 1) 100%
  );
  box-shadow: 0 px2rem(10) px2rem(22) 0 rgba(19, 69, 134, 0.2),
    0 px2rem(8) px2rem(22) 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    width: px2rem(14);
    height: px2rem(2);
    border-radius: px2rem(1);
    background-color: #fff;
    transform: translate(-50%);
  }

  &::after {
    transform: translate(-50%) rotate(90deg);
  }

  a {
    display: block;
    width: inherit;
    height: inherit;
  }
}
</style>
