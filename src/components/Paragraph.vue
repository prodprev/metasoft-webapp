<template>
  <section class="paragraph"
           :class="{open: open}">
    <h3 @click="handleOpen">{{title}}<i :style="{backgroundImage: `url(${require('../assets/images/icon-arrow-blue.svg')})`}"></i></h3>
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Paragraph",
  props: ["title"],
  data() {
    return {
      open: true
    }
  },
  methods: {
    handleOpen() {
      this.open = !this.open;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.paragraph {
  background-color: #fff;

  & + .paragraph {
    border-top: 1px solid #eee;
  }
}

h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: px2rem(20);
  padding: px2rem(20);
  font-size: px2rem(20);
  font-weight: 600;
  color: $--color-blue;
  cursor: pointer;

  i {
    width: px2rem(13);
    height: px2rem(7);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: rotate(0);
    @include transition(transform);
  }
}

.content {
  display: none;
  flex-direction: column;
  padding: px2rem(25) px2rem(30);
}

.open {
  h3 i {
    transform: rotate(-180deg);
  }

  .content {
    display: flex;
  }
}
</style>
