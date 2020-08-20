<template>
  <div class="create">
    <Header />
    <div class="content">
      <Paragraph title="基本信息">
        <FieldGroup :required="true"
                    name="活动主题">
          <input v-model="topic"
                 placeholder="请输入内容" />
          <span class="error"
                v-if="errors['topic']">
            {{ errors["topic"] }}
          </span>
        </FieldGroup>
        <FieldGroup name="地点">
          <textarea placeholder="请输入地点"
                    maxlength="100"></textarea>
        </FieldGroup>
        <FieldGroup :required="true"
                    name="性别">
          <div class="field-gender">
            <div class="gender"
                 :class="{ open: genderToggle }"
                 @click="genderToggle = !genderToggle">
              <input v-model="singleSelect.name"
                     disabled />
              <img class="arrow"
                   :src="require('../assets/images/icon-arrow.svg')" />
            </div>
            <transition name="slide">
              <Checklist v-if="genderToggle"
                         v-model="singleSelect"
                         :list="checklist"
                         align="right"
                         @change="genderToggle = false" />
            </transition>
          </div>
        </FieldGroup>
        <FieldGroup name="网址">
          <input v-model="website"
                 placeholder="请输入网址" />
          <span class="error"
                v-if="errors['website']">
            {{ errors["website"] }}
          </span>
        </FieldGroup>
        <FieldGroup name="电子邮件">
          <input v-model="email"
                 placeholder="请输入电子邮件" />
          <span class="error"
                v-if="errors['email']">
            {{ errors["email"] }}
          </span>
        </FieldGroup>
      </Paragraph>
      <Paragraph title="联系人"></Paragraph>
      <Paragraph title="线索">
        <FieldGroup name="电话">
          <input type="tel"
                 v-model="phone"
                 placeholder="请输入电话号" />
          <span class="error"
                v-if="errors['phone']">
            {{ errors["phone"] }}
          </span>
        </FieldGroup>
        <FieldGroup name="传真">
          <input v-model="tax"
                 placeholder="请输入传真号" />
          <span class="error"
                v-if="errors['tax']">
            {{ errors["tax"] }}
          </span>
        </FieldGroup>
        <FieldGroup name="QQ">
          <input v-model="qq"
                 placeholder="请输入QQ号" />
          <span class="error"
                v-if="errors['qq']">
            {{ errors["qq"] }}
          </span>
        </FieldGroup>
        <FieldGroup name="地址"
                    :arrow="true">
          <div class="field-address">
            <img class="prev-icon"
                 :src="require('../assets/images/icon-pin.svg')" />
            <input placeholder="请输入地址" />
          </div>
        </FieldGroup>
        <FieldGroup name="客户">
          <div class="field-customer">
            <input placeholder="请选择客户" />
            <span class="search"><img :src="require('../assets/images/icon-search-gray.svg')" /></span>
          </div>
        </FieldGroup>
        <FieldGroup name="多选">
          <Checklist class="field-multi-select"
                     v-model="multiSelect"
                     :list="checklist2"
                     align="left"
                     :multi="true" />
        </FieldGroup>
        <FieldGroup name="日期"
                    :arrow="true">
          <div class="field-date">
            <img class="prev-icon"
                 :src="require('../assets/images/icon-calendar-gray.svg')" />
            <input v-model="dateTimeValue"
                   placeholder="请选择日期"
                   readonly
                   @click="handleDateTimeOpen"
                   onfocus="this.blur()" />
          </div>
        </FieldGroup>
        <FieldGroup name="数字"
                    :arrow="true">
          <input v-model="numberPicked"
                 placeholder="请选择数字"
                 readonly
                 @click="handlePickerOpen"
                 onfocus="this.blur()" />
        </FieldGroup>
        <FieldGroup name="附件"
                    :arrow="true">
          <Upload class="field-attachment"
                  :multiple="true"
                  @ready="handlePreview($event, 'file')">
            <img class="prev-icon"
                 :src="require('../assets/images/icon-paper-clip.svg')" />
            <input value="请选择附件"
                   disabled />
          </Upload>
        </FieldGroup>
        <FieldGroup v-if="files.length > 0"
                    name="已选附件">
          <ul class="field-file-preview">
            <li :key="index"
                v-for="(item, index) in files">
              <img class="prev-icon"
                   :src="require('../assets/images/icon-paper-clip.svg')" />
              <label>{{ item.name }}</label>
              <img class="suffix-icon"
                   :src="require('../assets/images/icon-close.svg')"
                   @click="handleDelete(item, 'file')" />
            </li>
          </ul>
        </FieldGroup>
        <Progress class="field-progress"
                  name="百分比"
                  :percent="percent" />
        <FieldGroup class="field-image-attachment"
                    name="上传图片">
          <ul class="field-image-preview">
            <li :key="index"
                v-for="(item, index) in images">
              <div class="inner"
                   @click="handleShowPreviewImage(item.src)"
                   :style="{ backgroundImage: `url(${item.src})` }">
                <img class="delete"
                     :src="require('../assets/images/icon-delete-image.svg')"
                     @click.stop="handleDelete(item, 'image')" />
              </div>
            </li>
            <li class="ignore">
              <Upload class="field-image-upload"
                      :image="true"
                      :multiple="true"
                      @ready="handlePreview($event, 'image')">
                <div class="uploader">
                  <img class="icon"
                       :src="require('../assets/images/icon-camera.svg')" />
                </div>
              </Upload>
            </li>
          </ul>
        </FieldGroup>
      </Paragraph>
      <PreviewImage v-if="showPreviewImage"
                    :pre="previewImageUrl"
                    :url="previewImageUrl"
                    @close="showPreviewImage = false" />
      <mt-datetime-picker type="date"
                          v-model="dateTimeValue"
                          @input="handleDateTime"
                          ref="dateTimePicker">
      </mt-datetime-picker>
      <div v-if="numberVisible"
           class="picker-container"
           @click.stop="handlePickerClose">
        <transition name="picker">
          <div v-if="numberPickable"
               class="picker-wrapper">
            <div class="picker-toolbar">
              <span class="picker-cancel"
                    @click="handlePickerClose">取消</span>
              <span class="picker-confirm"
                    @click="handlePickerClose">确定</span>
            </div>
            <mt-picker :slots="numberPickers"
                       @change="handleNumberPick">
            </mt-picker>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/layout/header";
import Paragraph from "@/components/Paragraph";
import FieldGroup from "@/components/FieldGroup";
import Checklist from "@/components/Checklist";
import Upload from "@/components/Upload";
import Progress from "@/components/Progress";
import PreviewImage from "@/components/PreviewImage";
import fixScroll from "@/utils/fixScroll";

export default {
  components: {
    Header,
    Paragraph,
    FieldGroup,
    Checklist,
    Upload,
    Progress,
    PreviewImage,
  },
  data() {
    return {
      topic: "",
      singleSelect: { value: "male", name: "男" },
      genderToggle: true,
      checklist: [
        { value: "male", name: "男" },
        { value: "female", name: "女" },
        { value: "unknown", name: "未知" },
      ],
      website: "",
      email: "",
      phone: "",
      tax: "",
      qq: "",
      multiSelect: [],
      checklist2: [
        { value: "1", name: "多选择内容1" },
        { value: "2", name: "多选择内容2" },
        { value: "3", name: "多选择内容3" },
        { value: "4", name: "多选择内容4" },
      ],
      dateTimeValue: "",
      numberVisible: false,
      numberPickable: false,
      numberPicked: "",
      numberPickers: [{values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}],
      files: [],
      percent: 80,
      images: [],
      showPreviewImage: false,
      previewImageUrl: "",
    };
  },
  computed: {
    errors() {
      // 获取校验不通过的对象, 如 { "form.name": "至少 4 位字符", "form.desc": "至少 10 位字符" }
      return this.$vuerify.$errors;
    },
  },
  vuerify: {
    topic: {
      test: /\w{4,}/,
      message: "至少 4 位字符",
    },
    website: {
      // test: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
      message: "格式不正确",
    },
    email: {
      test: "email",
      message: "格式不正确",
    },
    phone: {
      test: /^\d{11}$/,
      message: "十一位手机号",
    },
    tax: {
      test: /^(\d{3,4}-)?\d{7,8}$/,
      message: "格式不正确",
    },
    qq: {
      test: /[1-9][0-9]{4,}/,
      message: "请输入QQ号",
    },
  },
  methods: {
    handleDateTimeOpen() {
      this.$refs.dateTimePicker.open();

      fixScroll(document.querySelector(".mint-datetime"), [document.querySelector(".picker-items")]);
    },
    handleDateTime(val) {
      this.dateTimeValue = val.format("yyyy-MM-dd");
    },
    handlePickerOpen() {
      this.numberVisible = true;

      this.$nextTick(() => {
        this.numberPickable = true;

        this.$nextTick(() => {
          fixScroll(document.querySelector(".picker-container"), [document.querySelector(".picker-wrapper"), document.querySelector(".picker-toolbar"), document.querySelector(".picker"), document.querySelector(".picker-items"), document.querySelector(".picker-item")]);
        });
      });
    },
    handleNumberPick(picker, values) {
      this.numberPicked = values[0];
    },
    handlePickerClose() {
      this.numberPickable = false;

      this.$nextTick(() => {
        this.numberVisible = false;
      });
    },
    handlePreview(file, type) {
      if (type == "file") {
        if (this.files.find((item) => item.src == file.src)) return;

        this.files.push(file);
      } else if (type == "image") {
        if (this.images.find((item) => item.src == file.src)) return;

        this.images.push(file);
      }
    },
    handleDelete(file, type) {
      if (type == "file") {
        this.files = this.files.filter((item) => item.src != file.src);
      } else if (type == "image") {
        this.images = this.images.filter((item) => item.src != file.src);
      }
    },
    handleShowPreviewImage(url) {
      this.showPreviewImage = true;
      this.previewImageUrl = url;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/fn";

.create {
  @include pagefix();

  header {
    flex: 0 0 px2rem(45);
  }

  .content {
    flex: 0 0 calc(100% - #{px2rem(45)});
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.field-group {
  position: relative;

  .error {
    position: absolute;
    bottom: px2rem(-20);
    left: 0;
    font-size: px2rem(12);
    color: #ff5252;
  }
}

.field-gender {
  width: 100%;

  .gender {
    position: relative;
    display: flex;
    margin-bottom: px2rem(6);

    input {
      padding-right: px2rem(52);
      text-align: right;
      cursor: pointer;

      &:focus {
        border-color: $--color-gray-100 !important;
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
}

.field-address,
.field-date,
.field-attachment {
  display: flex;
  width: 100%;

  .prev-icon {
    position: absolute;
    top: 50%;
    left: px2rem(15);
    width: px2rem(19);
    transform: translateY(-50%);
  }

  input {
    padding-left: px2rem(45);
  }
}

.field-date img {
  pointer-events: none;
}

.field-customer {
  display: flex;
  width: 100%;

  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &:focus + .search {
      border-color: $--color-blue;
    }
  }

  .search {
    display: inline-flex;
    flex: 0 0 px2rem(50);
    align-items: center;
    justify-content: center;
    height: px2rem(50);
    border: px2rem(2) solid $--color-gray;
    margin-left: px2rem(-2);
    background-color: #fff;
    border-top-right-radius: px2rem($--border-radius);
    border-bottom-right-radius: px2rem($--border-radius);

    img {
      width: px2rem(12);
    }
  }
}

.field-multi-select {
  width: 100%;
}

.field-attachment {
  .prev-icon {
    width: px2rem(14);
  }

  input {
    padding-left: px2rem(40);
  }
}

.field-file-preview {
  width: 100%;
  padding: 0 px2rem(15);
  border-radius: px2rem($--border-radius);
  border: px2rem(2) solid $--color-gray-100;

  li {
    display: flex;
    align-items: center;
    height: px2rem(38);
    font-size: px2rem(14);
    color: $--color-blue;

    .prev-icon {
      width: px2rem(14);
      margin-right: px2rem(15);
    }

    label {
      width: calc(100% - #{px2rem(55)});
      @include txtEll();
    }

    .suffix-icon {
      width: px2rem(11);
      margin-left: px2rem(15);
      cursor: pointer;
    }
  }
}

.field-progress {
  margin-top: px2rem(45);
}

.field-image-attachment {
  margin-top: px2rem(25);

  .field-image-preview {
    // display: grid;
    // grid-template-columns: repeat(4, calc((100% - #{px2rem(10 * 3)}) / 4));
    // grid-column-gap: px2rem(10);
    // grid-row-gap: px2rem(10);
    // justify-self: center;
    // align-self: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: px2rem(-5);
    transform: scale(1.05, 1);

    li {
      flex: 0 0 25%;
      padding: px2rem(5);
    }

    .inner {
      position: relative;
      width: 100%;
      height: px2rem(69);
      border: px2rem(2) solid $--color-gray-100;
      border-radius: px2rem($--border-radius);
      @include bgImg("");

      .delete {
        position: absolute;
        top: 0;
        right: 0;
        width: px2rem(16);
        cursor: pointer;
      }
    }
  }

  .field-image-upload {
    display: flex;
    border: px2rem(2) solid $--color-gray-100;
    border-radius: px2rem($--border-radius);

    .uploader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: px2rem(69);

      .icon {
        width: px2rem(23);
      }
    }
  }
}

.picker-container {
  @include position(fixed);
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;

  .picker-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
  }

  .picker-toolbar {
    height: px2rem(40);
    border-bottom: px2rem(1) solid #eaeaea;
  }

  .picker-cancel,
  .picker-confirm {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: px2rem(40);
    font-size: px2rem(16);
    color: $--color-blue;
  }

  .picker-cancel {
    float: left;
  }

  .picker-confirm {
    float: right;
  }

  .picker {
    flex: 1;
  }
}

.slide-enter-active,
.slide-leave-active {
  @include transition(all, 180ms);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(#{px2rem(-10)});
}

.picker-enter-active,
.picker-leave-active {
  @include transition(all, 180ms);
}
.picker-enter,
.picker-leave-to {
  transform: translateY(110vh);
}
</style>
