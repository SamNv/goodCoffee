import { securedAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"
const state = {
  products: [],
  product: {}
}

const getters = {
  getProducts(state) {
    let products = state.products.filter(c => c.status == 'active')
    return products.map(p => {
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        discount: p.discount,
        category: p.category.name,
        category_id: p.category_id,
        image_url: p.image_url,
        status: p.status
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
    const res = await securedAxiosInstance.get("/api/products")
    commit("getProducts", res)
  },
  async create({ commit }, params) {
    const res = await securedAxiosInstance.post('/api/products', params, { headers: { "Content-Type": "multipart/form-data" } })
    commit("create", res)
  },
  async update({ commit }, { id, params }) {
    const res = await securedAxiosInstance.put(`/api/products/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } })
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
