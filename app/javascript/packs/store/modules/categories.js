import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"
const state = {
    categories: [
    ]
}

const getters = {
    getCategories(state) {
        return state.categories
    }
}

const mutations = {
    getCategories(state, payload) {
        state.categories = flatPayload(payload)
    },
    create(state, payload) {
        state.categories.push(flatPayload(payload))
    }
}

const actions = {
    async getCategories({ commit }) {
        const res = await plainAxiosInstance.get("/api/categories")
        commit("getCategories", res)
    },
    async update({ commit }, { id, category }) {
        const res = await plainAxiosInstance.put(`/api/categories/${id}`, category)
    },
    async create({ commit }, data) {
        const res = await plainAxiosInstance.post('/api/categories', { category: data })
        commit("create", res)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
