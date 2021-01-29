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
    <v-data-table :headers="headers" :items="orders" :search="search">
      <template v-slot:item.status="{ item }">
        <v-icon :color="status[item.status].color">{{
          status[item.status].icon
        }}</v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 blue--text" @click="editItem(item)">
          mdi-eye
        </v-icon>
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "User",
        align: "start",
        sortable: true,
        filterable: true,
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Order Date", value: "orderDate" },
      { text: "Total", value: "total" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      orderDate: "",
      total: "",
      status: "",
    },
    defaultItem: {
      name: "",
      email: "",
      orderDate: "",
      total: "",
      status: "",
    },
    status: {
      processing: {
        color: "blue",
        icon: "mdi-autorenew",
      },
      pending: {
        color: "orange",
        icon: "mdi-clock-outline",
      },
      complete: {
        color: "green",
        icon: "mdi-check-circle",
      },
    },
    orders: []
  }),
  mounted(){
      this.orders = this.$store.getters["orders/getOrders"]
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
