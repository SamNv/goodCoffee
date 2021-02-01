<template>
  <div id="home" class="py-10">
    <p class="text-center menu-title mb-5">Menu</p>
    <div class="menu-list mx-auto">
      <ul class="px-0 mb-15">
        <li
          class="menu-item clickable"
          :class="tab == index + 1 ? 'orange--text' : ''"
          v-for="(item, index) in categories"
          :key="index"
          @click="getProducts(item.id, index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="content">
        <transition name="list" appear>
          <Products :products="category.products" :key="componentIndex" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Products from "../components/home/products";
export default {
  async mounted() {
    await this.$store.dispatch("categories/getCategories");
    await this.$store.dispatch(
      "categories/getCategoryById",
      this.$store.getters["categories/getCategories"][0].id
    );
  },
  created() {
    console.log(this.categories[0]);
  },
  computed: {
    categories() {
      return [...this.$store.getters["categories/getCategories"]];
    },
    category() {
      return { ...this.$store.getters["categories/getCategoryInfo"] };
    },
  },
  data: () => ({
    tab: 1,
    componentIndex: 1,
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
  methods: {
    getProducts(categoryId, index) {
      this.tab = index + 1;
      this.componentIndex += 1;
      this.$store.dispatch("categories/getCategoryById", categoryId);
    },
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
