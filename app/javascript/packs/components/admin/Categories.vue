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
                @click="createItem"
              >
                New Category
              </v-btn>
            </template>
            <CategoryForm :actionType="actionType" />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="pa-6">
              <p class="mb-2">Are you sure you want to delete this item?</p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  rounded
                  text
                  @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  rounded
                  text
                  @click="deleteItemConfirm"
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
      name: null,
    },
  }),
  mounted() {
    this.$store.dispatch("categories/getCategories");
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
    category() {
      return { ...this.$store.getters["categories/getCategory"] };
    },
  },

  methods: {
    editItem(item) {
      this.$store.dispatch("categories/setCategory", item);
      this.actionType = "edit";
      this.dialog = true;
    },
    createItem() {
      this.$store.dispatch("categories/setCategory", this.defaultItem);
      this.actionType = "new";
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.$store.dispatch("categories/setCategory", item);
    },
    async deleteItemConfirm() {
      try {
        const data = {
          id: this.category.id,
          category: {
            name: this.category.name,
            status: 0,
          },
        };
        await this.$store.dispatch("categories/update", data);
        this.$store.dispatch("toast/show", {
          message: this.category.name + " was deleted successfully!",
        });
        this.dialogDelete = false;
      } catch (e) {
        this.$store.dispatch("toast/showError", {
          message: "Failed to delete",
        });
        throw e;
      }
    },
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
