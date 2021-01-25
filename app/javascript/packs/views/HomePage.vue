<template>
  <div id="home" class="py-10">
    <p class="text-center menu-title mb-5">Menu</p>
    <div class="menu-list mx-auto">
      <ul class="px-0 mb-15">
        <li
          class="menu-item clickable"
          :class="tab == 1 ? 'orange--text' : ''"
          @click="
            tab = 1;
            index += 1;
          "
        >
          coffee
        </li>
        <li
          class="menu-item clickable"
          :class="tab == 2 ? 'orange--text' : ''"
          @click="
            tab = 2;
            index += 1;
          "
        >
          espresso
        </li>
        <li
          class="menu-item clickable"
          :class="tab == 3 ? 'orange--text' : ''"
          @click="
            tab = 3;
            index += 1;
          "
        >
          non-coffee
        </li>
        <li
          class="menu-item clickable"
          :class="tab == 4 ? 'orange--text' : ''"
          @click="
            tab = 4;
            index += 1;
          "
        >
          frappes
        </li>
        <li
          class="menu-item clickable"
          :class="tab == 5 ? 'orange--text' : ''"
          @click="
            tab = 5;
            index += 1;
          "
        >
          floats and smoothies
        </li>
      </ul>
      <div class="content">
        <transition name="list" appear>
          <Products :products="coffeeList" :key="index" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Products from "../components/home/products";
export default {
  data: () => ({
    tab: 1,
    index: 1,
    coffeeList: [
      {
        name: "Sweet Cold ",
        price: 10,
      },
      {
        name: "Sweet Brew2",
        price: 10,
      },
      {
        name: "Sweet Cold Brew3",
        price: 10,
      },
      {
        name: "Sweet Cold Brew4",
        price: 10,
      },
      {
        name: "Sweet Cold Brew5",
        price: 10,
      },
      {
        name: "Sweet Cold Brew6",
        price: 10,
      },
      {
        name: "Sweet Cold Brew7",
        price: 10,
      },
      {
        name: "Sweet Cold Brew8",
        price: 10,
      },
    ],
  }),
  components: {
    Products,
  },
};
</script>

<style lang="scss" scoped>
#home {
  background-image: url("../assets/menu-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-color: transparent;
  min-height: 100%;
  .menu {
    &-title {
      font-size: 40px;
      color: azure;
      font-family: fantasy;
    }
    &-list {
      color: azure;
    }
    &-item {
      list-style: none;
      text-transform: capitalize;
      transition: color 1s ease;
      &:hover {
        color: orange;
      }
    }
  }
}
.list-enter-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 1;
  transform: translateY(30px);
}
</style>
