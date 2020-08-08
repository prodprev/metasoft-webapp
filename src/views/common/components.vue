<template>
  <div class="components">
    <h1>Metasoft Webapp Components</h1>
    <h2>Icon</h2>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "Components",
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/var";

.components {
  padding: 20px;
}

h1 {
  margin: 0 0 35px;
}

h2 {
  margin-bottom: 24px;
}

.content {
  display: flex;
  align-items: center;
}
</style>
