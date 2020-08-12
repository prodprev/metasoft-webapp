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
      open: false
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

.field-group {
  display: flex;
  flex-direction: column;

  & + .field-group {
    margin-top: px2rem(25);
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
  padding: 0 px2rem(30) px2rem(20);

  .wrapper {
    display: flex;
  }
}

.open {
  h3 i {
    transform: rotate(-180deg);
  }

  .content {
    display: flex;
  }
}

.field-label {
  line-height: px2rem(12);
  margin-bottom: px2rem(10);
  font-size: px2rem(12);
  color: $--color-dark-100;

  .require {
    color: #d51b32;
  }
}

input,
textarea {
  width: 100%;
  border: px2rem(2) solid $--color-gray-100;
  border-radius: px2rem($--border-radius);
  outline: none;
  -webkit-appearance: none;
  @include transition(border-color);

  &:focus {
    border-color: $--color-blue !important;
  }
}

input {
  height: px2rem($--input-height);
  padding: 0 px2rem(15);
  font-size: px2rem($--font-size);
}

textarea {
  height: px2rem($--input-height * 2);
  padding: px2rem(15);
}
</style>
