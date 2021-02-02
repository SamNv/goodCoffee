<template>
  <v-card class="pa-10">
    <v-data-table :headers="headers" :items="user.orders" :search="search">
      <template v-slot:item.status="{ item }">
        <v-icon v-if="item.status" :color="status[item.status].color">{{
          status[item.status].icon
        }}</v-icon>
      </template>
      <template v-slot:item.created_at="{ item }">
        <p>{{ formatDate(item.created_at) }}</p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    user: Object,
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Phone", value: "phone" },
      { text: "Address", value: "address" },
      { text: "Order Date", value: "created_at" },
      { text: "Total", value: "purchase_order" },
      { text: "Status", value: "status" },
    ],
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
  }),
  methods: {
    formatDate(time) {
      return moment(time).format("YYYY/MM/DD hh:mm");
    },
  },
};
</script>
