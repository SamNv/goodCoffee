<template>
  <div>
    <v-form ref="checkoutForm" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="phone"
            label="Phone"
            :rules="[requireRules(), maxRules(12), minRules(10), phoneFormat()]"
            required
            placeholder="0332889621"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="address"
            label="Address"
            :rules="[requireRules(), maxRules(255)]"
            required
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-form>
    <v-btn color="primary" @click="submit" rounded :disabled="!valid">
      Continue
    </v-btn>

    <v-btn text @click="setOrderStep(1)" rounded>
      Back
    </v-btn>
  </div>
</template>

<script>
import {
  requireRules,
  maxRules,
  minRules,
  phoneFormat,
} from "../../constants/rules";

export default {
  props: {
    total: String,
  },
  created: function() {
    this.requireRules = requireRules;
    this.maxRules = maxRules;
    this.minRules = minRules;
    this.phoneFormat = phoneFormat;
  },
  data: () => ({
    valid: true,
    orderAddress: "",
    orderPhone: "",
  }),
  computed: {
    currentUser() {
      return { ...this.$store.getters["auth/currentUser"] };
    },
    itemsInCart() {
      return [...this.$store.getters["cart/getItems"]].map((p) => {
        return {
          product_id: p.id,
          price: p.price,
          discount: p.discount,
          quantity: p.quantity,
        };
      });
    },
    phone: {
      get: function() {
        let currentUser = { ...this.$store.getters["auth/currentUser"] };
        if (currentUser && currentUser.orders.length > 0) {
          return currentUser.orders.slice(-1)[0].phone;
        }
        return "";
      },
      set: function(value) {
        this.orderPhone = value;
      },
    },
    address: {
      get: function() {
        let currentUser = { ...this.$store.getters["auth/currentUser"] };
        if (currentUser && currentUser.orders.length > 0) {
          return currentUser.orders.slice(-1)[0].address;
        }
        return "";
      },
      set: function(value) {
        this.orderAddress = value;
      },
    },
  },
  methods: {
    validate() {},
    async submit() {
      if (this.$refs.checkoutForm.validate()) {
        this.setOrderStep(3);
        try {
          let params = {
            order: {
              phone: this.orderPhone || this.phone,
              address: this.orderAddress || this.address,
              purchase_order: this.total,
              order_details_attributes: this.itemsInCart,
            },
          };
          await this.$store.dispatch("orders/create", params);
          await this.$store.dispatch("auth/fetchCurrentUser");
          this.$store.dispatch("toast/show", {
            message: "Your order was successfully submitted!!",
          });
        } catch (e) {
          throw e;
        }
      }
    },
    reset() {
      this.$refs.checkoutForm.reset();
    },
    resetValidation() {
      this.$refs.checkoutForm.resetValidation();
    },
    setOrderStep(step) {
      this.$emit("changeOrderStep", step);
    },
  },
};
</script>
