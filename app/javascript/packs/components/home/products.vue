<template>
  <v-row class="products mx-0 px-sm-10 px-xs-2">
    <v-col
      class="product md-4 d-flex align-center px-10"
      cols="12"
      sm="6"
      md="4"
      xsm="12"
      v-for="(item, index) in products"
      :key="index"
    >
      <v-badge
        class="mr-3"
        bordered
        left
        color="orange"
        offset-x="10"
        :content="item.discount + '%'"
      >
        <v-avatar size="50">
          <v-img
            class="product-img"
            src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
          ></v-img>
        </v-avatar>
      </v-badge>
      <div class="product-info">
        <div class="product-info--name title text-start d-flex">
          <span class="mr-auto clickable">{{ item.name }}</span>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="addToCart(item.name)"
              >
                <v-icon color="amber accent-32">
                  mdi-cart-plus
                </v-icon>
              </v-btn>
            </template>
            <span>Add to cart</span>
          </v-tooltip>
        </div>
        <p class="text-start">
          <span
            class="orange--text text--lighten-3 font-weight-medium subtitle-1"
          >
            {{ (item.price * (100 - item.discount)) / 100 }} $
          </span>
          <span class="text-decoration-line-through subtitle-2 grey--text ml-1"
            >{{ item.price }} $</span
          >
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
    },
  },
  data: () => ({
    show: true,
  }),
  methods: {
    addToCart: function(name) {
      this.$store.dispatch("toast/show", {
        message: name + " is added to cart",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  .product {
    &-img {
      border: 2px solid white;
    }
    &-info {
      width: 100%;
      &--name {
        font-family: monospace !important;
      }
    }
  }
  .add-cart {
    &--icon {
      &:hover {
        color: orange;
      }
    }
  }
}
</style>
