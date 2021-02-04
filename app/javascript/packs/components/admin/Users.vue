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
    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="profileDialog" max-width="1000">
            <Orders :user="user" />
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.orders="{ item }">
        {{ item.orders.length }}
      </template>
       <template v-slot:item.address="{ item }">
        {{ item.orders.length > 0 ? item.orders.slice(-1)[0].address : "N/A"  }}
      </template>
       <template v-slot:item.phone="{ item }">
        {{ item.orders.length > 0 ? item.orders.slice(-1)[0].phone : "N/A" }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2 blue--text clickable" @click="showUser(item)">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Orders from "./user/Orders";
export default {
  components: {
    Orders,
  },
  data: () => ({
    profileDialog: false,
    search: "",
    user: {},
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        filterable: true,
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Phone",
        value: "phone",
      },
      {
        text: "Address",
        value: "address",
      },
      {
        text: "Count of orders",
        value: "orders",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    defaultItem: {
      name: "",
      email: "",
      phone: "",
      address: "",
      count: 0,
    },
  }),
  mounted() {
    this.$store.dispatch("users/getUsers");
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    users() {
      return [...this.$store.getters["users/getUsers"]];
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
    showUser(user) {
      this.user = user;
      this.profileDialog = true;
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
