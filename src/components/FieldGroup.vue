<template>
  <div class="field-group"
       :class="{ inline: inline, long: long }">
    <label class="field-label">
      <i v-if="required"
         class="require">*</i>{{ name }}
    </label>
    <div class="wrapper"
         :class="{ 'field-arrow': arrow }">
      <slot></slot>
      <img v-if="arrow"
           class="arrow"
           :src="require('../assets/images/icon-arrow.svg')" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldGroup",
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    long: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

$--color-100: #d51b32;

.field-group {
  display: flex;
  flex-direction: column;

  &.inline {
    flex-direction: row;
    align-items: flex-start;
  }

  & + .field-group {
    margin-top: px2rem(25);
  }

  &.inline + .field-group.inline {
    border-top: px2rem(1) solid $--color-gray;
    margin-top: px2rem(0);
  }
}

.field-label {
  line-height: px2rem(12);
  margin-bottom: px2rem(10);
  font-size: px2rem(12);
  color: $--color-dark-100;

  .require {
    color: $--color-100;
  }
}

.wrapper {
  display: flex;
}

.field-arrow {
  position: relative;
  display: flex;
  width: 100%;

  input {
    padding-right: px2rem(36);
  }

  .arrow {
    position: absolute;
    top: 50%;
    right: px2rem(15);
    width: px2rem(10);
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: center;
    pointer-events: none;
  }
}

input,
textarea {
  width: 100%;
  border: px2rem(2) solid $--color-gray-100;
  border-radius: px2rem($--border-radius);
  font-size: px2rem(14);
  font-family: $--font-family;
  outline: none;
  -webkit-appearance: none;
  @include transition(border-color);

  &:focus {
    border-color: transparent !important;
    box-shadow: 0 0 px2rem(1) px2rem(1) $--color-blue;
  }
}

input {
  height: px2rem($--input-height);
  padding: 0 px2rem(15);

  &:disabled {
    border-color: $--color-gray-100;
    background-color: #fff;
    opacity: 1;
  }
}

textarea {
  height: px2rem($--input-height * 2);
  padding: px2rem(15);
}

.field-group.inline {
  padding: px2rem(5) 0;

  .field-label {
    width: px2rem(62);
    margin-top: px2rem(20);
    margin-right: px2rem(36);
    margin-bottom: 0;
    font-size: px2rem(14);
  }

  .wrapper {
    flex: 1;

    input {
      padding: 0 px2rem(25) 0 0;
      border: none;
      font-size: px2rem(14);
      color: $--color-dark;
      text-overflow: ellipsis;

      &:disabled {
        color: $--color-dark;
        -webkit-text-fill-color: $--color-dark;
        opacity: 1;
      }
    }

    .arrow {
      right: 0;
    }
  }

  & + .field-group.inline {
    border-top: px2rem(1) solid #eee;
  }
}

.field-group.inline.long {
  padding: px2rem(23) 0;

  .field-label {
    margin-top: px2rem(4);
  }
}
</style>
