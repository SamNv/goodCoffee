<template>
  <v-card class="w-100 products pa-10">
    <div>
      <p class="text-start">
        <v-btn
          rounded
          class="white--text mr-2"
          v-for="item in Object.keys(status)"
          :color="status[item].color"
          :key="item"
          :disabled="order.status === item"
          @click="updateOrderStatus(item)"
        >
          <v-icon>{{ status[item].icon }}</v-icon>
          {{ item }}
        </v-btn>
      </p>

      <v-simple-table class="w-100 py-4">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Product
              </th>
              <th class="text-center">
                Quantity
              </th>
              <th class="text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.order_details" :key="index">
              <td class="text-left">
                <v-avatar size="40" class="mr-5">
                  <v-img
                    :src="
                      item.image_url
                        ? item.image_url
                        : 'https://dummyimage.com/600x400/000/fff'
                    "
                    class="product-image"
                  ></v-img> </v-avatar
                >{{ item.name }}
              </td>
              <td class="text-center">
                {{ item.quantity }}
              </td>
              <td class="text-right">
                <span class="orange--text"
                  >{{ (item.price * (100 - item.discount)) / 100 }}$</span
                >
                <span
                  class="text-decoration-line-through subtitle-2
                      grey--text ml-1"
                  >{{ item.price }}$</span
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider></v-divider>
      <div
        class="d-flex justify-space-between align-center pa-3 font-weight-bold"
      >
        <span>Total: </span>
        <span class="black--text"> {{ total }} $</span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  computed: {
    order() {
      return { ...this.$store.getters["orders/getOrder"] };
    },
    total() {
      let items = { ...this.$store.getters["orders/getOrder"] }.order_details;
      let total = "0";
      if (items && items.length > 0) {
        total = items.reduce((sum, item) => {
          if (item.quantity < 0) {
            item.quantity = 1;
          }
          return (
            sum + (((100 - item.discount) * item.price) / 100) * item.quantity
          );
        }, 0);
        total = total.toFixed(2);
      }
      return total;
    },
  },
  data: () => ({
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
    async updateOrderStatus(item) {
      try {
        const params = {
          order: {
            status: item,
          },
        };
        await this.$store.dispatch("orders/update", {
          id: this.order.id,
          params,
        });
      } catch (e) {
          throw e
      }
    },
  },
};
</script>
