import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"
const state = {
  products: [],
  product: {}
}

const getters = {
  getProducts(state) {
    return state.products.filter(c => c.status == 'active').map(p => {
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        discount: p.discount,
        category: p.category.name,
        category_id: p.category_id
      }
    })
  },
  getProduct(state) {
    return state.product
  }
}

const mutations = {
  getProducts(state, payload) {
    state.products = flatPayload(payload).reverse()
  },
  setProduct(state, data) {
    state.product = data
  },
  update(state, payload) {
    const updateProduct = flatPayload(payload)
    state.products = state.products.map(p => {
      if (p.id === updateProduct.id) {
        return updateProduct;
      }
      return p;
    })
  },
  create(state, payload) {
    state.products.unshift(flatPayload(payload))
  }
}

const actions = {
  async getProducts({ commit }) {
    const res = await plainAxiosInstance.get("/api/products")
    commit("getProducts", res)
  },
  async create({ commit }, params) {
    const res = await plainAxiosInstance.post('/api/products', { product: params })
    commit("create", res)
  },
  async update({ commit }, { id, params }) {
    const res = await plainAxiosInstance.put(`/api/products/${id}`, { product: params })
    commit("update", res)
  },
  setProduct({ commit }, data) {
    commit('setProduct', data)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
