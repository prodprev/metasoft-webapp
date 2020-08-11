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
    </Paragraph>
  </div>
</template>

<script>
import Paragraph from "@/components/Paragraph";

export default {
  components: {
    Paragraph
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";
</style>
