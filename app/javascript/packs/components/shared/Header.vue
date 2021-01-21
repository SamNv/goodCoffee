<template>
  <div class="header">
    <v-toolbar dense color="black white--text px-md-6">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

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
      >
        {{ $t("common.login") }}
      </p>

      <p
        class="clickable ml-4 d-none d-sm-flex"
        dark
        @click.stop="
          dialog = true;
          tab = 1;
        "
      >
        {{ $t("common.register") }}
      </p>

      <v-badge
        top
        offset-y="15"
        color="orange darken-1"
        content="6"
        class="mr-5 ml-4 clickable"
      >
        <v-icon
          color="white"
          @click.stop="
            cartModal = true;
            orderStep = 1;
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
      >
        <v-icon color="white">mdi-account</v-icon>
      </p>
      <v-dialog v-model="dialog" max-width="600px" min-width="360px">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <LoginForm/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <RegisterForm/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
      <v-dialog v-model="cartModal" max-width="600px" min-width="360px">
          <Cart/>
      </v-dialog>
    </v-toolbar>
  </div>
</template>

<script>
import LoginForm from "../authentication/LoginForm"
import RegisterForm from "../authentication/RegisterForm"
import Cart from "../cart/index"
export default {
  data: () => ({
    dialog: false,
    cartModal: false,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
  }),
  components: {
    LoginForm,
    RegisterForm,
    Cart
  }
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
