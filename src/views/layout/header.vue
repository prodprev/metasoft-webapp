<template>
  <header>
    <div class="wrapper">
      <div class="lt">
        <div
          v-if="['list'].includes($route.name)"
          class="back"
          :style="{ backgroundImage: backBgImg }"
        ></div>
      </div>
      <div
        class="md"
        :class="{ dd: $route.name == 'list', show: dropdownToggle }"
        @click="handleDropdown"
      >
        {{ $route.meta.title }}
        <span
          class="dropdown"
          :style="{ backgroundImage: dropdownBgImg }"
        ></span>
        <ul class="dropdown-selects">
          <li
            :key="index"
            v-for="(item, index) in $store.state.list.dropdownSelects"
            @click.stop="handleSelect(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="rt">
        <div
          v-if="['list'].includes($route.name)"
          class="add"
          :style="{ backgroundImage: addBgImg }"
        ></div>
      </div>
    </div>
    <div v-if="['list'].includes($route.name)" class="wrapper flex-start">
      <Search @input="handleInput" />
      <div class="filter" :style="{ backgroundImage: filterBgImg }"></div>
    </div>
  </header>
</template>

<script>
import Search from "@/components/Search";

export default {
  components: {
    Search,
  },
  data() {
    return {
      backBgImg: `url(${require("../../assets/images/icon-header-back.svg")})`,
      dropdownBgImg: `url(${require("../../assets/images/icon-header-dropdown.svg")})`,
      addBgImg: `url(${require("../../assets/images/icon-header-add.svg")})`,
      filterBgImg: `url(${require("../../assets/images/icon-search-filter.svg")})`,
      dropdownToggle: false,
    };
  },
  methods: {
    handleDropdown() {
      this.dropdownToggle = !this.dropdownToggle;
    },
    handleSelect(item) {
      this.dropdownToggle = false;

      this.commit(item);
    },
    handleInput() {},
    commit(payload) {
      this.$store.commit("setHeaderDropdownSelect", payload);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/fn";

header {
  padding: 0 px2rem(15);
  font-size: px2rem(17);
  color: #fff;
  background: linear-gradient(
    315deg,
    $--color-blue 0%,
    rgba(51, 144, 255, 1) 100%
  );

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: px2rem(45);

    &.flex-start {
      align-items: flex-start;
    }
  }

  .md {
    position: relative;
    display: flex;
    align-items: center;

    &.dd {
      cursor: pointer;

      .dropdown {
        display: block;
      }
    }

    &.show {
      .dropdown {
        transform: rotate(-180deg);
      }

      .dropdown-selects {
        display: block;
      }
    }
  }

  .back,
  .dropdown,
  .add,
  .filter {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .back {
    width: px2rem(10);
    height: px2rem(17);
  }

  .dropdown {
    display: none;
    position: absolute;
    top: px2rem(10);
    right: px2rem(-16);
    width: px2rem(10);
    height: px2rem(5);
    margin-left: px2rem(6);
    transition: all 120ms ease-in-out;
  }

  .add {
    width: px2rem(17);
    height: px2rem(17);
  }

  .filter {
    width: px2rem(15);
    height: px2rem(16);
    margin: px2rem(9) px2rem(1);
  }

  .search {
    flex: 1;
    margin-right: px2rem(15);
  }

  .dropdown-selects {
    display: none;
    position: absolute;
    top: 0;
    left: 50%;
    width: px2rem(170);
    margin-top: px2rem(36);
    border-radius: px2rem(10);
    font-size: px2rem(16);
    color: $--color-dark;
    background-color: #fff;
    box-shadow: 0 px2rem(6) px2rem(25) 0 rgba(0, 0, 0, 0.13);
    transform: translateX(-50%);
    z-index: 1;

    li {
      padding: px2rem(17);
      line-height: px2rem(16);
      text-align: center;

      & + li {
        border-top: 1px solid $--color-gray;
      }
    }

    &::before {
      position: absolute;
      top: px2rem(-20);
      left: 50%;
      content: "";
      width: 0;
      height: 0;
      border-width: px2rem(10);
      border-style: solid;
      border-color: transparent transparent #fff;
      transform: translateX(-50%);
    }
  }
}
</style>
