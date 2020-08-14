<template>
  <div class="create">
    <Paragraph title="基本信息">
      <div class="field-group">
        <label class="field-label"><i class="require">*</i>活动主题</label>
        <div class="wrapper">
          <input placeholder="请输入内容" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">地点</label>
        <div class="wrapper">
          <textarea placeholder="请输入内容"></textarea>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label"><i class="require">*</i>性别</label>
        <div class="wrapper flex column">
          <div class="gender" :class="{open: genderToggle}" @click="genderToggle = !genderToggle">
            <input v-model="gender.name" readonly />
            <img class="arrow" :src="require('../assets/images/icon-arrow.svg')">
          </div>
          <Checklist v-model="gender" :list="checklist" align="right" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">网址</label>
        <div class="wrapper">
          <input placeholder="请输入网址" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">电子邮件</label>
        <div class="wrapper">
          <input placeholder="请输入电子邮件" />
        </div>
      </div>
    </Paragraph>
    <Paragraph title="线索">
      <div class="field-group">
        <label class="field-label">电话</label>
        <div class="wrapper">
          <input placeholder="请输入电话号" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">传真</label>
        <div class="wrapper">
          <input placeholder="请输入传真号" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">QQ</label>
        <div class="wrapper">
          <input placeholder="请输入QQ号" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">地址</label>
        <div class="wrapper">
          <div class="address">
            <img class="pin" :src="require('../assets/images/icon-pin.svg')">
            <input placeholder="请输入地址" />
            <img class="arrow" :src="require('../assets/images/icon-arrow.svg')">
          </div>
        </div>
      </div>
    </Paragraph>
  </div>
</template>

<script>
import Paragraph from "@/components/Paragraph";
import Checklist from "@/components/Checklist";

export default {
  components: {
    Paragraph,
    Checklist
  },
  data() {
    return {
      gender: {value: "male", name: "男"},
      genderToggle: true,
      checklist: [{value: "male", name: "男"}, {value: "female", name: "女"}, {value: "unknown", name: "未知"}]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.wrapper {
  &.flex {
    display: flex;
  }

  &.column {
    flex-direction: column;
  }
}

input:read-only {
  border-color: #f7f7f7;
}

.gender {
  position: relative;
  display: flex;
  margin-bottom: px2rem(6);

  input {
    padding-right: px2rem(52);
    font-size: px2rem(14);
    text-align: right;

    &:focus {
      border-color: #f7f7f7 !important;
    }
  }

  .arrow {
    position: absolute;
    top: px2rem(22);
    right: px2rem(22);
    width: px2rem(10);
    transform: rotate(0);
    @include transition(transform); 
  }

  & + .checklist {
    display: none;
  }

  &.open {
    .arrow {
      transform: rotate(-180deg);
    }

    & + .checklist {
      display: block;
    }
  }
}
</style>
