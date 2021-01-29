<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'eye' : 'eye-off'"
          :rules="[requireRules(), minRules(8)]"
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
          @click="signin"
        >
          {{ $t("common.login") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { emailRules, requireRules, minRules } from "../../constants/rules";
export default {
  created: function() {
    this.emailRules = emailRules;
    this.requireRules = requireRules;
    this.minRules = minRules;
  },
  data: () => ({
    valid: true,
    show1: false,
    password: "",
    email: "",
  }),
  methods: {
    async signin() {
      if (this.$refs.loginForm.validate()) {
        try {
          const data = { email: this.email, password: this.password };
          await this.$store.dispatch("auth/login", data);
          this.$store.dispatch("toast/show", {
            message: "You have been logged in",
          });
          this.email = "";
          this.password = "";
          //Close modal
          this.$emit("changeDialog", false);
        } catch (e) {
          this.$store.dispatch("toast/showError", {
            message: "Incorrect email or password.",
          });
        } finally {
        }
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
