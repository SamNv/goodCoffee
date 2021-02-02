import { saveCart, getCart } from '../../utils/localStorage';

const state = {
  items: getCart() || []
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
    saveCart(state.items)
  },
  incrementItemQuantity(state, id) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
    saveCart(state.items)
  },
  removeProduct(state, productId) {
    state.items = state.items.filter(p => p.id != productId)
    saveCart(state.items)
  },
  setItems(state, items) {
    state.items = items
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
  },
  removeProduct({ commit }, product) {
    commit("removeProduct", product.id)
  },
  setItems({ commit }, items) {
    commit('setItems', items)
  }

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
