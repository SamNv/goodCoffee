<template>
  <v-form ref="registerForm" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="user.first_name"
          :rules="[requireRules(), minRules(1), maxRules(40)]"
          label="First Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="user.last_name"
          :rules="[requireRules(), minRules(1), maxRules(40)]"
          label="Last Name"
          maxlength="20"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="user.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[requireRules(), minRules(8)]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          block
          v-model="user.password_confirmation"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[requireRules(), passwordMatch]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Confirm Password"
          counter
          @click:append="show = !show"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
        <v-btn
          rounded
          x-large
          block
          :disabled="!valid"
          class="orange white--text"
          @click="createUser"
          >{{ $t("common.register") }}</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { emailRules, requireRules, minRules, maxRules } from "../../constants/rules";

export default {
  computed: {
    passwordMatch() {
      return () =>
        this.user.password === this.user.password_confirmation ||
        "Password must match";
    },
  },
  created: function() {
    this.emailRules = emailRules;
    this.requireRules = requireRules;
    this.minRules = minRules;
    this.maxRules = maxRules;
  },
  data: () => ({
    valid: true,
    show: false,
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  }),
  methods: {
    async createUser() {
      if (this.$refs.registerForm.validate()) {
        try {
          await this.$store.dispatch("auth/createUser", this.user);
          this.user.first_name = "";
          this.user.last_name = "";
          this.user.email = "";
          this.user.password = "";
          this.user.password_confirmation = "";
          this.$store.dispatch("toast/show", {
            message:
              "You have been created the account successfully",
          });
          this.$emit("changeDialog", false);
        } catch (e) {
          this.$store.dispatch("toast/showError", {
            message: "Account cannot be created!!",
          });
          throw e;
        }
      }
    },
    reset() {
      this.$refs.registerForm.reset();
    },
    resetValidation() {
      this.$refs.registerForm.resetValidation();
    },
  },
};
</script>
