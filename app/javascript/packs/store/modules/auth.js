import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { saveToken, removeToken, removeCart } from '../../utils/localStorage';

const state = {
  logined: localStorage.signedIn || false,
  currentUser: {}
}

const getters = {
  logined(state) {
    return state.logined
  },
  currentUser(state) {
    return state.currentUser
  }
}

const mutations = {
  login(state, user) {
    state.logined = true
    state.currentUser = user.data
  },
  logout(state) {
    state.logined = false
    state.currentUser = {}
  },
  setCurrentUser(state, payload) {
    state.currentUser = payload.data
  }
}


const actions = {
  async login({ commit }, data) {
    try {
      const res = await plainAxiosInstance.post("/api/signin", data)
      const user = await securedAxiosInstance.get("/api/me")
      saveToken(res)
      commit("login", user)
    } catch (e) {
      removeToken()
      commit("logout")
      throw e
    }
  },
  async logout({ commit }) {
    try {
      const res = await securedAxiosInstance.delete("/api/signin")
      removeToken()
      removeCart()
      commit("logout")
    } catch (e) {
      throw e
    }
  },

  async createUser({ commit }, data) {
    try {
      const res = await plainAxiosInstance.post("/api/signup", data)
      const user = await securedAxiosInstance.get("/api/me")
      saveToken(res)
      commit("login", user)
    } catch (e) {
      removeToken()
      commit("logout")
      throw e
    }
  },
  async fetchCurrentUser({ commit }) {
    const res = await securedAxiosInstance.get("/api/me")
    commit("setCurrentUser", res)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
