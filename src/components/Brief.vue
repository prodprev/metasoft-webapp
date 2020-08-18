<template>
  <div class="brief" @click="$emit('click', data)">
    <span class="dots" @click.stop="$emit('actionsheet', data)">
      <img :src="require('../assets/images/icon-dots.svg')" />
    </span>
    <span class="content">
      <p class="title">{{ data.title }}</p>
      <p class="desc">{{ data.desc }}</p>
    </span>
    <span class="arrow">
      <img :src="require('../assets/images/icon-arrow-right.svg')" />
    </span>
  </div>
</template>

<script>
export default {
  name: "Brief",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.brief {
  position: relative;
  display: flex;
  align-items: center;
  height: px2rem(80);
  padding: 0 px2rem(15);
  background-color: #fff;

  .dots {
    display: flex;
    align-items: center;
    width: px2rem(3);

    img {
      width: inherit;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: px2rem(40);
      height: px2rem(80);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: calc(100% - #{px2rem(80)});
    height: px2rem(40);
    margin: 0 px2rem(20);

    .title,
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      line-height: px2rem(16);
      font-size: px2rem(16);
    }

    .desc {
      line-height: px2rem(12);
      font-size: px2rem(12);
      color: $--color-dark-200;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    width: px2rem(6);
    margin-left: auto;

    img {
      width: inherit;
    }
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: px2rem(15);
    content: "";
    height: px2rem(1);
    background-color: $--color-gray;
  }

  &.active,
  &:hover {
    background: $--background;
  }
}
</style>
