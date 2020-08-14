<template>
  <ul class="checklist"
      :class="{'align-right': align == 'right', 'align-left': align == 'left'}">
    <li :key="index"
        v-for="(item, index) in list"
        @click="$emit('change', item)">
      <label class="name">{{item.name}}</label>
      <label class="check"
             :class="{active: item.value == checked.value}"
             :style="{backgroundImage: `url(${require('../assets/images/icon-check.svg')})`}"></label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Checklist",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: "left"
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

ul.checklist {
  border: px2rem(2) solid #eee;
  border-radius: px2rem($--border-radius);
  font-size: px2rem(14);

  li {
    display: flex;
    align-items: center;
    line-height: px2rem(12);
    padding: px2rem(15);

    & + li {
      border-top: px2rem(2) solid #eee;
    }
  }

  .check {
    width: px2rem(20);
    height: px2rem(20);
    border: px2rem(2) solid #eee;
    border-radius: 50%;

    &.active {
      border-color: $--color-blue;
      background-color: $--color-blue;
      background-position: center;
      background-size: 90%;
      background-repeat: no-repeat;
    }
  }

  &.align-right {
    .check {
      margin-left: auto;
    }
  }

  &.align-left {
    li {
      position: relative;
    }

    .check {
      position: absolute;
      left: px2rem(15);
      top: px2rem(11);
    }

    .name {
      margin-left: px2rem(30);
    }
  }
}
</style>
