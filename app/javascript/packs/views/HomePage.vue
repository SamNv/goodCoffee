<template>
  <div id="home" class="py-10">
    <p class="text-center menu-title mb-5">Menu</p>
    <div class="menu-list mx-auto">
      <ul class="px-0 mb-15 d-flex flex-wrap justify-center px-10">
        <li
          class="menu-item clickable ma-4"
          :class="tab == index + 1 ? 'orange--text' : ''"
          v-for="(item, index) in categories"
          :key="index"
          @click="getProducts(item.id, index)"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span color="primary" dark v-bind="attrs" v-on="on" class="px-5">
                {{ item.name }}
              </span>
            </template>
            <span> {{ item.name }}</span>
          </v-tooltip>
        </li>
      </ul>
      <div class="content">
        <transition name="list" appear>
          <Products
            :products="category.products"
            :key="componentIndex"
          />
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
      transition: color 0.5s ease;
      border: 2px solid #af992f73;
      border-radius: 25px;
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
