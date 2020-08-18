<template>
  <div class="preview-image"
       @click="$emit('close')"
       ref="previewImage">
    <div class="wrap"
         ref="img">
      <img class="preview"
           :class="{hide: loaded}"
           :src="pre" />
      <img :class="{hide: !loaded}"
           :src="url"
           @load="handleLoaded" />
    </div>
  </div>
</template>

<script>
import fixScroll from "@/utils/fixScroll";

export default {
  name: "PreviewImage",
  props: ["pre", "url"],
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    ready() {
      fixScroll(this.$refs.previewImage, [this.$refs.img]);
    },
    handleLoaded() {
      this.loaded = true;
    }
  },
  mounted: function() {
    this.ready();
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.preview-image {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  z-index: 98;
}

img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100vw;
  height: 100vw;
  object-fit: contain;
  cursor: pointer;

  &.preview {
    filter: blur(10px);
  }

  &.hide {
    display: none;
  }
}

@media only screen and (orientation: landscape) {
  .preview-image img {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100vh;
    height: 100vh;
  }
}
</style>
