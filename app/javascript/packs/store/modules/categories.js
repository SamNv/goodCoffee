import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"
const state = {
  categories: [],
  category: {},
  categoryInfo: {}
}

const getters = {
  getCategories(state) {
    return state.categories.filter(c => c.status == 'active')
  },
  getCategory(state) {
    return state.category
  },
  getCategoryInfo(state) {
    return state.categoryInfo
  }
}

const mutations = {
  getCategories(state, payload) {
    state.categories = flatPayload(payload).reverse()
  },
  create(state, payload) {
    state.categories.unshift(flatPayload(payload))
  },
  update(state, payload) {
    const updateCategory = flatPayload(payload)
    state.categories = state.categories.map(c => {
      if (c.id === updateCategory.id) {
        return updateCategory;
      }
      return c;
    })
  },
  setCategory(state, data) {
    state.category = data
  },
  setCategoryInfo(state, payload) {
    state.categoryInfo = flatPayload(payload)
    state.categoryInfo["products"] = state.categoryInfo["products"].filter(p => p.status === 'active')
  }
}

const actions = {
  async getCategories({ commit }) {
    const res = await plainAxiosInstance.get("/api/categories")
    commit("getCategories", res)
  },
  async getCategoryById({ commit }, id) {
    const res = await plainAxiosInstance.get(`/api/categories/${id}`)
    commit('setCategoryInfo', res)
  },
  async update({ commit }, { id, category }) {
    const res = await plainAxiosInstance.put(`/api/categories/${id}`, { category: category })
    commit("update", res)
  },
  async create({ commit }, category) {
    const res = await plainAxiosInstance.post('/api/categories', { category: category })
    commit("create", res)
  },
  setCategory({ commit }, data) {
    commit('setCategory', data)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
