<template>
  <ul class="checklist"
      :class="{'align-right': align == 'right', 'align-left': align == 'left'}">
    <li :key="index"
        v-for="(item, index) in list"
        @click="handleClick(item)">
      <label class="name">{{item.name}}</label>
      <label class="check"
             :class="{active: multi ? checked.find(o => o.value == item.value) : checked.value == item.value}"
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
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: "left"
    },
    multi: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(item) {
      let checked;
      
      if (!this.multi) {
        if (item.value == this.checked.value) {
          return;
        } else {
          checked = item;
        }
      } else { // multi
        const o = this.checked.find(_item => _item.value == item.value);

        if (o) {
          checked = this.checked.filter(_item => _item.value != item.value);
        } else {
          checked = [...this.checked, item];
        }
      }

      this.$emit('change', checked);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

ul.checklist {
  max-height: px2rem(262);
  border: px2rem(2) solid $--color-gray-100;
  border-radius: px2rem($--border-radius);
  font-size: px2rem(14);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  li {
    display: flex;
    align-items: center;
    line-height: px2rem(12);
    padding: px2rem(15);
    cursor: pointer;

    & + li {
      border-top: px2rem(2) solid $--color-gray-100;
    }
  }

  label {
    cursor: pointer;
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
