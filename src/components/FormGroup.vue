<template>
  <div class="form-group"
       :class="{inline: inline}">
    <label :style="{width: `${labelWidth}px`}">
      <span>
        <slot name="label"></slot>
      </span>
    </label>
    <div class="field-wrap">
      <div class="wrapper">
        <slot name="form-control"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: Number,
      default: 26
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/var";

.form-group {
  &.inline {
    display: flex;
    align-items: center;

    & > label {
      margin-bottom: 0;
    }
  }

  & > label {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 7px;
  }

  .field-wrap {
    flex: 1;
  }

  & + .form-group {
    margin-top: 15px;
  }
}
</style>
