const state = {
  items: []
}

const getters = {
  getItems(state) {
    return state.items
  }
}


const mutations = {
  addProduct(state, product) {
    state.items.push(
      {
        ...product,
        quantity: 1
      }
    )
  },
  incrementItemQuantity(state, id) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
  }
}

const actions = {
  addProduct({ state, commit }, product) {
    const cartItem = !!state.items.find(item => item.id === product.id)
    if (cartItem) {
      commit("incrementItemQuantity", product.id)
    } else {
      commit("addProduct", product)
    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
