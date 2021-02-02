import { securedAxiosInstance } from '../../api/httpClient.js'
import { flatPayload } from "../../utils/store"
import { removeCart } from '../../utils/localStorage';

const state = {
  orders: [],
  order: {}
}

const getters = {
  getOrders(state) {
    return state.orders
  },
  getOrder(state) {
    return state.order
  }
}


const mutations = {
  getOrders(state, payload) {
    state.orders = flatPayload(payload).reverse().map(o => {
      return {
        id: o.id,
        name: o.user.first_name + " " + o.user.last_name,
        email: o.user.email,
        phone: o.phone,
        address: o.address,
        orderDate: o.created_at,
        total: o.purchase_order,
        status: o.status
      }
    })
  },
  getOrder(state, payload) {
    state.order = flatPayload(payload)
    state.order.order_details = state.order.order_details.map(o => {
      return {
        id: o.id,
        price: o.price,
        discount: o.discount,
        quantity: o.quantity,
        name: o.product.name,
        image_url: o.product.image_url,
      }
    })
  },
  create(state, payload) {
    state.orders.unshift(flatPayload(payload))
    removeCart()
  },
  update(state, payload) {
    let order = flatPayload(payload)
    order = {
      id: order.id,
      name: order.user.first_name + " " + order.user.last_name,
      email: order.user.email,
      phone: order.phone,
      address: order.address,
      orderDate: order.created_at,
      total: order.purchase_order,
      status: order.status
    }
    state.orders = state.orders.map(o => {
      if (o.id === order.id) {
        return order;
      }
      return o;
    })
  },
  delete(state, payload) {
    const order = flatPayload(payload)
    state.orders = state.orders.filter(o => o.id != order.id)
  }
}

const actions = {
  async getOrders({ commit }) {
    const res = await securedAxiosInstance.get('/api/orders')
    commit("getOrders", res)
  },
  async getOderById({ commit }, id) {
    const res = await securedAxiosInstance.get(`/api/orders/${id}`)
    commit("getOrder", res)
  },
  async create({ commit }, params) {
    const res = await securedAxiosInstance.post('/api/orders', params)
    commit("create", res)
  },
  async update({ commit }, { id, params }) {
    const res = await securedAxiosInstance.put(`/api/orders/${id}`, params)
    commit("update", res)
    commit("getOrder", res)
  },
  async delete({ commit }, id) {
    const res = await securedAxiosInstance.delete(`/api/orders/${id}`)
    commit("delete", res)
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
