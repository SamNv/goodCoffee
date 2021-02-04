<template>
  <div class="order_cart">
    <v-stepper v-model="orderStep" v-if="itemsInCart.length != 0">
      <v-stepper-header>
        <v-stepper-step :complete="orderStep > 1" step="1">
          Check Cart
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="orderStep > 2" step="2">
          Check Info
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="orderStep == 3" step="3">
          Thank You
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="order_cart--content over-scroll mb-6 scrollbar--hidden">
            <v-list three-line>
              <v-simple-table class="w-100">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Product
                      </th>
                      <th class="text-center">
                        Quantity
                      </th>
                      <th class="text-center">
                        Price
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in itemsInCart" :key="index">
                      <td class="text-left">
                        <v-avatar size="40" class="mr-5">
                          <v-img
                            :src="
                              item.image_url
                                ? item.image_url
                                : 'https://dummyimage.com/600x400/000/fff'
                            "
                            class="product-image"
                          ></v-img> </v-avatar
                        >{{ item.name }}
                      </td>
                      <td class="text-center">
                        <input
                          label="Solo"
                          solo
                          dense
                          type="number"
                          v-model="item.quantity"
                          v-on:blur="onInput"
                          min="0"
                          class="quantity-input"
                        />
                      </td>
                      <td class="text-center">
                        <span class="orange--text"
                          >{{
                            (item.price * (100 - item.discount)) / 100
                          }}$</span
                        >
                        <span
                          class="text-decoration-line-through subtitle-2
                      grey--text ml-1"
                          >{{ item.price }}$</span
                        >
                      </td>
                      <td class="text-center">
                        <v-icon
                          small
                          @click="deleteItem(item)"
                          class="red--text"
                        >
                          mdi-close
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-list>
          </div>
          <v-divider></v-divider>
          <div
            class="d-flex justify-space-between align-center pa-3 font-weight-bold"
          >
            <span>Total: </span>
            <span class="black--text"> {{ total }} $</span>
          </div>
          <v-btn color="primary" @click="checkInfo" rounded>
            Continue
          </v-btn>

          <v-btn text rounded @click="closeModal">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="order_cart--content">
            <Checkout @changeOrderStep="orderStep = $event" :total="total" />
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="order_cart--content d-flex justify-center align-center">
            Thank you for your order!!
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-stepper v-else>
      <div class="px-10 py-16">
        <v-icon class="display-4 red--text">mdi-cart-outline</v-icon>
        <h3 class="orange--text">
          Your cart is empty
        </h3>
        <p>
          Add something to make me happy :)
        </p>
      </div>
    </v-stepper>
  </div>
</template>

<script>
import { minNumber, maxNumber } from "../../constants/rules";
import Checkout from "./CheckOut";
import { saveCart } from "../../utils/localStorage";
export default {
  created: function() {
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
  },
  props: {
    cartModal: Boolean,
  },
  data: () => ({
    orderStep: 1,
  }),
  components: {
    Checkout,
  },
  computed: {
    logined() {
      return this.$store.getters["auth/logined"];
    },
    itemsInCart() {
      return this.$store.getters["cart/getItems"];
    },
    total() {
      let items = this.$store.getters["cart/getItems"];
      let total = "0";
      if (items && items.length > 0) {
        total = items.reduce((sum, item) => {
          if (item.quantity < 0) {
            item.quantity = 1;
          }
          return (
            sum + (((100 - item.discount) * item.price) / 100) * item.quantity
          );
        }, 0);
        total = total.toFixed(2);
        saveCart(items);
      }
      return total;
    },
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
  },
  methods: {
    deleteItem(product) {
      this.$store.dispatch("cart/removeProduct", product);
    },
    closeModal() {
      this.$emit("changeCartModal", false);
    },
    onInput(e) {
      if (e.currentTarget.value < 0) {
        e.currentTarget.value = 0;
      }
    },
    checkInfo() {
      if (this.logined) {
        this.orderStep = 2;
      } else {
        this.$emit("changeCartModal", false);
        this.$emit("changeDialog", true);
      }
    },
  },
  watch: {
    'orderStep': function(value) {
      this.$emit("orderStep", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.order_cart {
  &--content {
    height: 400px;
    max-height: 50vh;
  }
  .v-stepper__content {
    padding: 24px;
  }
  .over-scroll {
    overflow: scroll;
  }
  .product-image {
    border: 2px solid orange;
  }
  .quantity-input {
    width: 50px;
    padding: 4px;
    text-align: center;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
