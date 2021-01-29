<template>
  <div>
    <v-sheet height="calc(100% - 84px)">
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
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
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
  mounted() {
    if (this.$route.query.q) {
      this.component = this.$route.query.q;
    }
  },
  data: () => ({
    drawer: null,
    component: "Products",
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
</style>
