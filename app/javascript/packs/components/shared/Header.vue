<template>
  <div class="header">
    <v-toolbar dense color="black white--text px-md-6">
      <v-toolbar-title class="header-title">
        <v-icon>mdi-pot-steam</v-icon>
        <span>{{ $t("common.header_title") }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <p
        class="clickable d-none d-sm-flex"
        dark
        @click.stop="
          dialog = true;
          tab = 0;
        "
        v-if="!logined"
      >
        {{ $t("common.login") }}
      </p>

      <p
        class="ml-4 d-none d-sm-flex clickable"
        dark
        @click.stop="
          dialog = true;
          tab = 1;
        "
        v-if="!logined"
      >
        {{ $t("common.register") }}
      </p>
      <router-link
        to="/admin"
        v-if="currentUser.role == 'admin'"
        class="text-decoration-none white--text"
      >
        <p class="clickable ml-4 d-none d-sm-flex" dark>
          Manage Page
        </p>
      </router-link>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-if="logined"
      >
        <template v-slot:activator="{ on, attrs }">
          <p
            class="clickable ml-4 d-none d-sm-flex"
            v-bind="attrs"
            v-on="on"
            dark
          >
            Order History
          </p>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Your order history</v-toolbar>
            <v-card-text
              v-if="currentUserOrders && currentUserOrders.length > 0"
            >
              <div
                class="order-list px-2 py-5"
                v-for="(order, index) in currentUserOrders"
                :key="index"
              >
                <div class="order-item">
                  <p class="d-flex align-center">
                    <v-btn
                      rounded
                      class="white--text mr-4"
                      :color="orderStatus[order.status].color"
                    >
                      <v-icon class="mr-1">{{
                        orderStatus[order.status].icon
                      }}</v-icon>
                      {{ order.status }}
                    </v-btn>
                    {{ formatDate(order.created_at) }}
                  </p>
                  <p class="text-start mt-2">
                    <span class="font-weight-bold">Phone:</span>
                    {{ order.phone }}
                  </p>
                  <p class="text-start mt-2">
                    <span class="font-weight-bold">Address:</span>
                    {{ order.address }}
                  </p>
                  <v-data-table
                    :headers="headers"
                    :items="order.order_details"
                    hide-default-footer
                  >
                    <template v-slot:item.price="{ item }">
                      <p class="orange--text">{{ item.price }}</p>
                    </template>
                    <template v-slot:item.discount="{ item }">
                      <p class="red--text">- {{ item.discount }}%</p>
                    </template>
                    <template v-slot:item.name="{ item }">
                      <div class="d-flex align-center">
                        <v-avatar size="40">
                          <v-img
                            class="product-image"
                            :src="
                              item.product.image_url
                                ? item.product.image_url
                                : 'https://dummyimage.com/600x400/000/fff'
                            "
                          ></v-img>
                        </v-avatar>
                        <span class="ml-7"> {{ item.product.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                  <div class="font-weight-bold">
                    <span>Total: </span>
                    <span class="text-decoration-underline"
                      >{{ order.purchase_order }}$</span
                    >
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-text v-else class="mt-7">
              Your order list is empty!!
            </v-card-text>
            <v-card-actions class="justify-end"> </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <p
        class="clickable ml-4 d-none d-sm-flex"
        dark
        v-if="logined"
        @click="logout"
      >
        {{ $t("common.logout") }}
      </p>
      <v-badge
        top
        offset-y="15"
        color="orange darken-1"
        :content="itemsInCart"
        class="mr-5 ml-4 clickable"
      >
        <v-icon
          color="white"
          @click.stop="
            cartModal = true;
            orderStep = 1;
            cartIndex += 1;
          "
          >mdi-cart-variant</v-icon
        >
      </v-badge>
      <p
        class="clickable d-flex d-sm-none"
        @click.stop="
          dialog = true;
          tab = 0;
        "
        v-if="!logined"
      >
        <v-icon color="white">mdi-account</v-icon>
      </p>
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        v-if="logined"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="d-flex d-sm-none">
            <v-icon color="white">mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list class="orange">
          <v-list-item @click="logout">
            <v-list-item-title class="white--text">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="dialog" max-width="600px" min-width="360px">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="orange darken-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="orange lighten-3"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <LoginForm :dialog="dialog" @changeDialog="dialog = $event" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <RegisterForm
                    :dialog="dialog"
                    @changeDialog="dialog = $event"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
      <v-dialog v-model="cartModal" max-width="600px" min-width="360px">
        <Cart
          v-if="cartModal"
          :key="cartIndex"
          :cartModal="cartModal"
          @changeCartModal="cartModal = $event"
          @changeDialog="dialog = $event"
          @orderStep="orderStep = $event"
        />
      </v-dialog>
    </v-toolbar>
  </div>
</template>

<script>
import moment from "moment";

import LoginForm from "../authentication/LoginForm";
import RegisterForm from "../authentication/RegisterForm";
import Cart from "../cart/index";
export default {
  computed: {
    logined() {
      return this.$store.getters["auth/logined"];
    },
    itemsInCart() {
      let count = this.$store.getters["cart/getItems"].length;
      return count == 0 ? "0" : count;
    },
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
    currentUserOrders() {
      return this.$store.getters["auth/currentUser"].orders.reverse();
    },
    cartModal: {
      get() {
        return this.innerCartModal;
      },
      set(value) {
        if (this.orderStep == 3 && !value) {
          this.$store.dispatch("cart/setItems", []);
        }
        this.innerCartModal = value;
      },
    },
  },
  data: () => ({
    cartIndex: 0,
    dialog: false,
    innerCartModal: false,
    orderStep: 1,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    orderStatus: {
      processing: {
        color: "blue",
        icon: "mdi-autorenew",
      },
      pending: {
        color: "orange",
        icon: "mdi-clock-outline",
      },
      complete: {
        color: "green",
        icon: "mdi-check-circle",
      },
    },
    headers: [
      { text: "Name", value: "name", sortable: false, filterable: false },
      { text: "Price", value: "price", sortable: false, filterable: false },
      {
        text: "Discount",
        value: "discount",
        sortable: false,
        filterable: false,
      },
      {
        text: "Quantity",
        value: "quantity",
        sortable: false,
        filterable: false,
      },
    ],
  }),
  components: {
    LoginForm,
    RegisterForm,
    Cart,
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
        this.$store.dispatch("cart/setItems", []);
        this.$store.dispatch("toast/show", {
          message: "You have been logged out successfully !!",
        });
      } catch (e) {
        this.$store.dispatch("toast/showError", {
          message: "You cannot log out",
        });
        throw e;
      }
    },
    formatDate(time) {
      return moment(time).format("YYYY/MM/DD hh:mm");
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 1;
  &-title {
    i {
      background: -webkit-linear-gradient(#fff, #ffbc00);
      font-size: 30px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    span {
      font-size: 21px;
      letter-spacing: 0.1em;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: #ffabab;
      text-shadow: 8px 6px #ffc050, 20px 20px #000000;
      font-family: "Montserrat", sans-serif;
    }
  }
}
</style>
<style lang="scss">
.header {
  .order_cart {
    &--content {
      height: 400px;
      max-height: 50vh;
      max-width: 90%;
    }
  }
}
</style>
