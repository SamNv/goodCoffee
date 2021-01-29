<template>
  <v-card class="w-100 products pa-10">
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-text-field
        v-model="category.name"
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
  computed: {
    category() {
      return { ...this.$store.getters["categories/getCategory"] };
    },
  },
  props: {
    actionType: String,
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
            await this.$store.dispatch("categories/create", {
              name: this.category.name,
            });
            this.$store.dispatch("toast/show", {
              message: this.category.name + " was created successfully!",
            });
            this.$refs.form.reset();
            this.$store.dispatch("categories/setCategory", {});
          }
          if (this.actionType == "edit") {
            const data = {
              id: this.category.id,
              category: {
                name: this.category.name,
              },
            };
            await this.$store.dispatch("categories/update", data);
            this.$store.dispatch("toast/show", {
              message: this.category.name + " was updated successfully!",
            });
          }
        } catch (e) {
          if (this.actionType == "new") {
            this.$store.dispatch("toast/showError", {
              message: "Failed to create",
            });
          }
          if (this.actionType == "edit") {
            this.$store.dispatch("toast/showError", {
              message: "Failed to edit",
            });
          }
          throw e;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
