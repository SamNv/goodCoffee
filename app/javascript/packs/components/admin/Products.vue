<template>
  <v-card class="w-100 products">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange white--text"
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="createItem"
              >
                New Product
              </v-btn>
            </template>
            <ProductForm
              :dialog="dialog"
              @close="dialog = $event"
              :action="action"
            />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="pa-6">
              <p class="mb-2">Are you sure you want to delete this item?</p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete" rounded
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                  rounded
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center">
          <v-avatar size="40">
            <v-img
              class="product-image"
              src="https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-ly-cafe-dep.jpg"
            ></v-img>
          </v-avatar>
          <span class="ml-7"> {{ item.name }}</span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 orange--text" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" class="red--text">
          mdi-close
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ProductForm from "./product/ProductForm";
export default {
  mounted() {
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("products/getProducts");
  },
  components: {
    ProductForm,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    action: "new",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        filterable: true,
        value: "name",
      },
      { text: "Category", value: "category" },
      { text: "Price ($)", value: "price" },
      { text: "Discount (%)", value: "discount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,

    defaultItem: {},
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    products() {
      return [...this.$store.getters["products/getProducts"]];
    },
    product() {
      return { ...this.$store.getters["products/getProduct"] };
    },
  },
  methods: {
    editItem(item) {
      this.$store.dispatch("products/setProduct", item);
      this.action = "edit";
      this.dialog = true;
    },
    createItem() {
      this.$store.dispatch("products/setProduct", this.defaultItem);
      this.action = "new";
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.$store.dispatch("products/setProduct", item);
    },

    async deleteItemConfirm() {
      try {
        const params = {
          status: 0,
        };
        await this.$store.dispatch("products/update", {
          id: this.product.id,
          params: params,
        });
        this.$store.dispatch("toast/show", {
          message: this.product.name + " was deleted successfully!",
        });
        this.dialogDelete = false;
      } catch (e) {
        this.$store.dispatch("toast/showError", {
          message: "Failed to delete",
        });
        throw e;
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  .product-image {
    border: 2px solid orange;
  }
}
</style>
