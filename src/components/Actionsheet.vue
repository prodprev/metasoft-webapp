<template>
  <div class="actionsheet" @click.stop="handleClose($event)">
    <transition name="slide">
      <div v-if="show" class="wrapper">
        <div class="actions">
          <p v-if="desc">{{ desc }}</p>
          <ul>
            <li
              class="action"
              :key="index"
              v-for="(item, index) in list"
              @click="$emit('action', item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="action close" @click="handleClose($event)">取消</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Actionsheet",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleClose(e) {
      const className = e.target.className;

      if (className.includes("actionsheet") || className.includes("close")) {
        this.$emit("close");
      }
    },
  },
  mounted: function() {
    setTimeout(() => {
      this.show = true;
    }, 200);
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.actionsheet {
  @include position(fixed);
  font-size: px2rem(17);
  color: $--color-blue;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;

  .wrapper {
    position: absolute;
    right: px2rem(10);
    bottom: px2rem(20);
    left: px2rem(10);
  }

  p {
    height: px2rem(54);
    line-height: px2rem(54);
    padding: 0 px2rem(60);
    font-size: px2rem(14);
    text-align: center;
    color: $--color-dark-100;
    background-color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actions {
    border-radius: px2rem(13);
    overflow: hidden;
  }

  .action {
    height: px2rem(56);
    line-height: px2rem(56);
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }

  li + li,
  p + ul {
    border-top: 1px solid $--color-gray;
  }

  .close {
    margin-top: px2rem(10);
    border-radius: px2rem(13);
  }
}

.slide-enter-active,
.slide-leave-active {
  @include transition(all, 180ms);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(110vh);
}
</style>
