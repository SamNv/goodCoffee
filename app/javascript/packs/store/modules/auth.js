import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { saveToken, removeToken } from '../../utils/localStorage';
const state = {
  logined: localStorage.signedIn
}

const getters = {
  logined(state) {
    return state.logined
  }
}

const mutations = {
  login(state) {
    state.logined = true
  },
  logout(state) {
    state.logined = false
  }
}


const actions = {
  async login({ commit }, data) {
    try {
      const res = await plainAxiosInstance.post("/api/signin", data)
      saveToken(res)
      commit("login")
    } catch (e) {
      removeToken()
      commit("logout")
      throw e
    }
  },
  async logout({ commit }) {
    try {
      const res = await securedAxiosInstance.delete(`/api/signin`)
      removeToken()
      commit("logout")
    } catch (e) {
      throw e
    }
  },

  async createUser({ commit }, data) {
    try {
      const res = await plainAxiosInstance.post("/api/signup", data)
      saveToken(res)
      commit("login")
    } catch (e) {
      removeToken()
      commit("logout")
      throw e
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
