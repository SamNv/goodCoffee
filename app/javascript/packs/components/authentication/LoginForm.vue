<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="loginEmail"
          :rules="loginEmailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="loginPassword"
          :append-icon="show1 ? 'eye' : 'eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
        <v-btn
          rounded
          x-large
          block
          :disabled="!valid"
          class="orange white--text"
          @click="validate"
        >
          {{ $t("common.login") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    show1: false,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.loginForm.reset();
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation();
    },
  },
};
</script>
