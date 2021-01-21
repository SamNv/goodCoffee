<template>
  <v-form ref="checkoutForm" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="phone"
          label="Phone"
          :rules="[rules.required, rules.min(10)]"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="address"
          label="Address"
          :rules="[rules.required]"
          required
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    phone: "",
    address: "",
    rules: {
      required: (value) => !!value || "Required.",
      min:(value) => (v) => (v && v.length >= value) || "Min " + value + " characters",
    },
  }),
  methods: {
    validate() {
      if (this.$refs.checkoutForm.validate()) {
        console.log("ok")
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.checkoutForm.reset();
    },
    resetValidation() {
      this.$refs.checkoutForm.resetValidation();
    },
  },
};
</script>
