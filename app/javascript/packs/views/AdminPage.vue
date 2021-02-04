<template>
  <div v-if="currentUser.role == 'admin'">
    <v-row v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mb-5 progress-circular"
      ></v-progress-circular>
    </v-row>
    <v-sheet height="calc(100% - 84px)" v-if="!loading">
      <v-container fluid class="">
        <v-row>
          <v-app-bar-nav-icon
            class="mt-4 ml-4"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-row>
        <v-row class="pa-7">
          <component :is="component"></component>
        </v-row>
      </v-container>

      <v-navigation-drawer v-model="drawer" app clipped class="nav">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{
              currentUser.first_name + " " + currentUser.last_name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <router-link
            class="text-decoration-none"
            v-for="item in items"
            :key="item.title"
            :to="{ name: 'AdminPage', query: { q: item.component } }"
          >
            <v-list-item
              link
              @click="component = item.component"
              :class="
                component.toLowerCase() == item.component.toLowerCase()
                  ? 'orange'
                  : ''
              "
            >
              <v-list-item-icon>
                <v-icon
                  :class="
                    component.toLowerCase() == item.component.toLowerCase()
                      ? 'white--text'
                      : ''
                  "
                  >{{ item.icon }}</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  :class="
                    component.toLowerCase() == item.component.toLowerCase()
                      ? 'white--text'
                      : ''
                  "
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import Products from "../components/admin/Products";
import Orders from "../components/admin/Orders";
import Users from "../components/admin/Users";
import Categories from "../components/admin/Categories";

export default {
  components: {
    Products,
    Orders,
    Users,
    Categories,
  },
  async mounted() {
    if (this.$route.query.q) {
      this.component = this.$route.query.q;
    }
    await this.$store.dispatch("categories/getCategories");
    await this.$store.dispatch("products/getProducts");
    await this.$store.dispatch("orders/getOrders");
    this.loading = false;
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
  },
  data: () => ({
    drawer: null,
    component: "Products",
    loading: true,
    items: [
      { title: "Products", icon: "mdi-view-dashboard", component: "Products" },
      {
        title: "Orders",
        icon: "mdi-order-alphabetical-ascending",
        component: "Orders",
      },
      { title: "Users", icon: "mdi-account", component: "Users" },
      { title: "Categories", icon: "mdi-shape", component: "Categories" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.nav {
  top: 48px !important;
  height: calc(100% - 84px) !important;
}

.progress-circular {
  top: 50%;
  left: 50%;
  position: absolute;
}
</style>
