<template>
  <div class="upload">
    <slot></slot>
    <input :type="inputType"
           name="file"
           title=""
           :accept="accept"
           :multiple="multiple"
           @change="handleFile" />
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: {
    image: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 50 // 50M
    }
  },
  data() {
    return {
      inputType: "file",
      accept: this.image ? "image/png, image/jpg, image/jpeg, image/gif" : ""
    }
  },
  methods: {
    checkSize(file) {
      if(file.size <= this.maxSize) {
        return true;
      } else {
        alert("请上传低于50M的文件！");
        return false;
      }
    },
    fileReader(file) {
      if (window.FileReader) {
        const reader = new FileReader();

        reader.onloadend = (e) => {
          this.$emit("ready", {
            name: file.name,
            src: e.target.result
          });
        };

        reader.readAsDataURL(file);
      }
    },
    handleFile(e) {
      let files =  e.target.files;
      let formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        if (!this.checkSize(files[i])) {
          return;
        } else {
          formData.append("file", files[i]); // TODO: post data
          
          this.fileReader(files[i]); // TODO: preview
        }
      }

      this.inputType = "text";
      this.$nextTick(() => {
        this.inputType = "file";
      });
      
      // this.$api.upload(formData).then(res => {
      //   this.$log(res);
      // });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.upload {
  position: relative;
}

input {
  font-size: px2rem(14);
  font-family: $--font-family;
  border-width: px2rem(2);

  &:disabled {
    background-color: #fff;
  }

  &[name="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
}
</style>
