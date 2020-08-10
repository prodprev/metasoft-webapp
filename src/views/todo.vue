<template>
  <div class="todo">
    <Header />
  </div>
</template>

<script>
import Header from "@/views/layout/header";

export default {
  components: {
    Header
  }
}
</script>

<style>
.todo {
  height: 100%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
}
</style>
