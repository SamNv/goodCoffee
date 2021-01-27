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
              >
                New Product
              </v-btn>
            </template>
            <ProductForm :editedItem="editedItem" :formTitle="formTitle"/>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
  components: {
    ProductForm,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        filterable: true,
        value: "name",
      },
      { text: "Price ($)", value: "price" },
      { text: "Discount", value: "discount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      image: 0,
      discount: 0,
      price: 0,
    },
    defaultItem: {
      name: "",
      image: 0,
      discount: 0,
      price: 0,
    },
    products: [],
  }),
  mounted() {
    this.products = this.$store.getters["products/getProducts"];
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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
