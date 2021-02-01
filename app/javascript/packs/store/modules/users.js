import { securedAxiosInstance, plainAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"

const state = {
  users: [

  ]
}

const getters = {
  getUsers(state) {
    return state.users.map(u => {
      return {
        id: u.id,
        name: u.first_name + " " + u.last_name,
        email: u.email,
        phone: u.phone,
        address: u.address
      }
    })
  }
}


const mutations = {
  getUsers(state, data) {
    state.users = flatPayload(data)
  }

}

const actions = {
  async getUsers({ commit }) {
    const res = await plainAxiosInstance.get("/api/users")
    commit("getUsers", res)
  }

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
