<template>
  <div class="skeleton">
    <div class="a"></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/var";

.skeleton {
  position: relative;
  overflow: hidden;
}

.a {
  position: absolute;
  top: 0;
  width: 500px;
  height: 100%;
  background-color: #fff;
  filter: blur(50px);
  opacity: 0.6;
  animation: move 800ms linear infinite;
}

.s {
  background-color: $--color-gray;
}

.r {
  background-color: $--color-white;
}

ul.t {
  display: flex;
  flex-direction: column;
  border: 1px solid $--color-gray;

  li {
    display: flex;
    border-bottom: 1px solid $--color-gray;

    &:first-child {
      background-color: $--color-gray;
    }

    &:last-child {
      border-bottom: none;
    }

    &:not(:first-child) {
      div {
        padding: 8px 9px;

        &::before {
          display: block;
          height: 100%;
          content: "";
          background-color: $--color-gray;
        }
      }
    }
  }

  div {
    flex: 1;
    height: 40px;
    border-right: 1px solid $--color-gray;

    &:last-child {
      border-right: none;
    }
  }
}

@keyframes move {
  0% {
    left: -500px;
  }

  100% {
    left: 100%;
  }
}
</style>
