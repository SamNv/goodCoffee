<template>
  <div class="order_cart">
    <v-stepper v-model="orderStep">
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
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="'test'"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="'subtitle'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </div>

          <v-btn color="primary" @click="orderStep = 2">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="order_cart--content">
            <Checkout/>
          </div>
          <v-btn color="primary" @click="orderStep = 3">
            Continue
          </v-btn>

          <v-btn text @click="orderStep = 1">
            Back
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="order_cart--content d-flex justify-center align-center">
            Thank you for your order!!
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Checkout from "./CheckOut";
export default {
  data: () => ({
    orderStep: 1
  }),
  components: {
    Checkout,
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
}
</style>
