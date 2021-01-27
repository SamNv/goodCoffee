const state = {
  orders: [
    {
      name: "Frozen Yogurt",
      email: "Frozen Yogurt@gmail.com",
      orderDate: "2021-01-26 10:30",
      status: "processing",
      total: 14.0,
    },
    {
      name: "Ice cream sandwich",
      email: "Ice cream sandwich@gmail.com",
      orderDate: "2021-01-26 10:30",
      status: "processing",
      total: 14.3,
    },
    {
      name: "Eclair",
      email: "Eclair@gmail.com",
      orderDate: "2021-01-26 10:30",
      status: "processing",
      total: 16.0,
    },
    {
      name: "Cupcake",
      email: "Cupcake@gmail.com",
      orderDate: "2021-01-26 10:30",
      status: "pending",
      total: 14.3,
    },
    {
      name: "Gingerbread",
      email: "Gingerbread@gmail.com",
      orderDate: "2021-01-27 10:30",
      status: "pending",
      total: 13.9,
    },
    {
      name: "Jelly bean",
      email: "Jelly bean@gmail.com",
      orderDate: "2021-01-27 10:30",
      status: "pending",
      total: 10.0,
    },
    {
      name: "Lollipop",
      email: "Lollipop@gmail.com",
      orderDate: "2021-01-27 10:30",
      status: "pending",
      total: 10,
    },
    {
      name: "Honeycomb",
      email: "Honeycomb@gmail.com",
      orderDate: "2021-01-27 10:30",
      status: "complete",
      total: 16.5,
    },
    {
      name: "Donut",
      email: "Donut@gmail.com",
      orderDate: "2021-01-27 10:30",
      status: "complete",
      total: 14.9,
    },
    {
      name: "KitKat",
      email: "KitKat@gmail.com",
      orderDate: "2021-01-26 10:30",
      status: "complete",
      total: 17,
    },
  ]
}

const getters = {
  getOrders(state) {
    return state.orders
  }
}


const mutations = {

}

const actions = {

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
