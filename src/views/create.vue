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
          <input disabled />
          <Checklist :list="checklist" />
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
</style>
