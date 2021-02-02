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
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <OrderForm />
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
      <template v-slot:item.orderDate="{ item }">
        <p>{{ formatDate(item.orderDate) }}</p>
      </template>
      <template v-slot:item.status="{ item }">
        <v-icon v-if="item.status" :color="status[item.status].color">{{
          status[item.status].icon
        }}</v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 blue--text" @click="show(item)">
          mdi-eye
        </v-icon>
        <v-icon small @click="deleteItem(item)" class="red--text">
          mdi-close
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import OrderForm from "../../components/admin/order/OrderForm";
import moment from "moment";

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
      { text: "Phone", value: "phone" },
      { text: "Address", value: "address" },
      { text: "Email", value: "email" },
      { text: "Order Date", value: "orderDate" },
      { text: "Total", value: "total" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: true },
    ],
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
    removeItem: {},
    order: {},
  }),
  components: {
    OrderForm,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    orders() {
      return [...this.$store.getters["orders/getOrders"]];
    },
  },
  methods: {
    formatDate(time) {
      return moment(time).format("YYYY/MM/DD hh:mm");
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.removeItem = item;
    },

    async show(item) {
      try {
        this.dialog = true;
        this.$store.dispatch("orders/getOderById", item.id);
      } catch (e) {
        throw e;
      }
    },
    async deleteItemConfirm() {
      try {
        await this.$store.dispatch("orders/delete", this.removeItem.id);
        this.$store.dispatch("toast/show", {
          message: "The order was deleted successfully!",
        });
        this.dialogDelete = false;
      } catch (e) {
        this.$store.dispatch("toast/showError", {
          message: "Failed to delete",
        });
        throw e;
      }
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
