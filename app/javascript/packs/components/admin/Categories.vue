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
    <v-data-table :headers="headers" :items="categories" :search="search">
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
                @click="item = {}"
              >
                New Category
              </v-btn>
            </template>
            <CategoryForm :actionType="actionType" :item="item" />
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
import CategoryForm from "../../components/admin/category/CategoryForm";
export default {
  components: {
    CategoryForm,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    actionType: "new",
    item: {},

    search: "",
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: true,
        filterable: true,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    defaultItem: {
      name: "",
    },
  }),
  mounted() {
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("categories/update", {
      id: 1,
      category: { name: "change 2" },
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
  },

  methods: {
    editItem(item) {
      this.dialog = true;
      this.actionType = "edit";
      this.item = { ...item };
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.item = { ...item };
    },
    deleteItemConfirm() {},
    closeDelete() {},
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
