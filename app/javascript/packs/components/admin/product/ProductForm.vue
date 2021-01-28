<template>
  <v-card class="pa-10 product-form">
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-select
        v-model="item.catetory"
        :items="categories"
        item-value="name"
        item-text="name"
        :rules="[(v) => !!v || 'Item is required']"
        label="Category"
        required
      >
      </v-select>
      <div class="d-flex justify-center align-center">
        <v-avatar size="40" class="mr-5 clickable" @click="changeImage">
          <v-img class="product-image" v-if="imageUrl" :src="imageUrl"></v-img>
        </v-avatar>
        <v-text-field
          v-model="item.name"
          :counter="40"
          label="Name"
          required
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
        v-model="item.price"
        label="Price ($)"
        type="number"
        required
        clearable
      ></v-text-field>
      <v-text-field
        v-model="item.discount"
        label="Discount"
        type="number"
        required
        clearable
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="close" rounded text>
        Cancel
      </v-btn>
      <v-btn :disabled="!formValid" rounded color="blue darken-1" text>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
  },
  props: {
    formTitle: String,
    dialog: Boolean,
    action: String,
    item: Object,
  },
  data: () => ({
    formValid: false,
    imageUrl:
      "https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg",
  }),
  methods: {
    close() {
      this.$emit("close", false);
    },
    changeImage() {
      this.$refs.productImageFile.click();
    },
    onFileChange(e) {
      console.log(e)
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
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
