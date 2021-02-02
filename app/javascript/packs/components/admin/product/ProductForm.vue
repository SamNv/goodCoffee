<template>
  <v-card class="pa-10 product-form">
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-select
        v-model="product.category_id"
        :items="categories"
        item-value="id"
        item-text="name"
        :rules="[requireRules()]"
        label="Category"
        required
      >
      </v-select>
      <div class="d-flex justify-center align-center">
        <v-avatar size="40" class="mr-5 clickable" @click="changeImage">
          <v-img class="product-image" v-if="imageUrl" :src="imageUrl"></v-img>
        </v-avatar>
        <v-text-field
          v-model="product.name"
          :counter="40"
          label="Name"
          :rules="[requireRules(), maxRules(40)]"
          clearable
        ></v-text-field>
        <input
          type="file"
          ref="productImageFile"
          class="d-none"
          @change="onFileChange"
          accept="image/*"
        />
      </div>

      <v-text-field
        v-model="product.price"
        label="Price ($)"
        type="number"
        :rules="[requireRules(), minNumber(0), maxNumber(999999999999)]"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="product.discount"
        label="Discount"
        type="number"
        :rules="[minNumber(0), maxNumber(100)]"
        clearable
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="close" rounded text>
        Cancel
      </v-btn>
      <v-btn
        :disabled="!formValid"
        rounded
        color="blue darken-1"
        text
        @click="submit"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  requireRules,
  maxRules,
  minNumber,
  maxNumber,
} from "../../../constants/rules";

export default {
  created: function() {
    this.requireRules = requireRules;
    this.maxRules = maxRules;
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
  },
  computed: {
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
    product() {
      let product = { ...this.$store.getters["products/getProduct"] };
      this.imageUrl = product.image_url
        ? product.image_url
        : "https://dummyimage.com/600x400/000/fff";
      return product;
    },
  },
  props: {
    dialog: Boolean,
    action: String,
  },
  data: () => ({
    formValid: false,
    imageFile: null,
    imageUrl: "",
  }),
  methods: {
    close() {
      this.$emit("close", false);
    },
    changeImage() {
      this.$refs.productImageFile.click();
    },
    onFileChange(e) {
      this.imageFile = e.target.files[0];
      this.imageUrl = URL.createObjectURL(this.imageFile);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          let formData = new FormData();
          formData.append("name", this.product.name);
          formData.append("price", this.product.price);
          formData.append("discount", this.product.discount);
          formData.append("category_id", this.product.category_id);
          if (this.imageFile !== null) {
            formData.append("image", this.imageFile);
          }
          if (this.action == "new") {
            await this.$store.dispatch("products/create", formData);
            this.$store.dispatch("toast/show", {
              message: this.product.name + " was created successfully!",
            });
            this.$refs.form.reset();
          }
          if (this.action == "edit") {
            await this.$store.dispatch("products/update", {
              id: this.product.id,
              params: formData,
            });
            this.$store.dispatch("toast/show", {
              message: this.product.name + " was updated successfully!",
            });
          }
        } catch (e) {
          if (this.action == "new") {
            this.$store.dispatch("toast/showError", {
              message: "Failed to create",
            });
          }
          if (this.action == "edit") {
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

<style lang="scss" scoped>
.product-form {
  .product-image {
    border: 2px solid orange;
  }
}
</style>
