const state = {
  users: [
    {
      name: "Frozen Yogurt",
      email: "Frozen Yogurt@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Ice cream sandwich",
      email: "Ice cream sandwich@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Eclair",
      email: "Eclair@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Cupcake",
      email: "Cupcake@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Gingerbread",
      email: "Gingerbread@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Jelly bean",
      email: "Jelly bean@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Lollipop",
      email: "Lollipop@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Honeycomb",
      email: "Honeycomb@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "Donut",
      email: "Donut@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
    {
      name: "KitKat",
      email: "KitKat@gmail.com",
      phone: "01223456545",
      address: "Ha Dong - Ha Noi",
      count: 12,
    },
  ]
}

const getters = {
  getUsers(state) {
    return state.users
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
