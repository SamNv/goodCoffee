<template>
  <v-card class="w-100 products pa-10">
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-text-field
        v-model="item.name"
        :counter="40"
        :rules="[requireRules()]"
        label="Name"
        required
        clearable
      ></v-text-field>
      <v-btn
        class="mr-4"
        @click="submit"
        :disabled="!formValid"
        rounded
        color="orange white--text"
      >
        submit
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { requireRules } from "../../../constants/rules";
export default {
  props: {
    actionType: String,
    item: Object,
  },
  created: function() {
    this.requireRules = requireRules;
  },
  data: () => ({
    formValid: false,
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.actionType == "new") {
            await this.$store.dispatch("categories/create", {name: this.item.name});
            this.$store.dispatch("toast/show", {
                message: this.item.name +" created successfully!"
            })
          }
          if (this.actionType == "edit") {
            console.log("edit");
          }
        } catch (e) {
          throw e;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
