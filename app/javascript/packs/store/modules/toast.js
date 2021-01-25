const state = {
    message: "",
    color: "success",
    timeout: 3000,
    index: 1
  };
  
  const getters = {
    message(state) {
      return state.message;
    },
    color(state) {
      return state.color;
    },
    timeout(state) {
      return state.timeout;
    },
    index(state) {
      return state.index;
    }
  };
  
  const mutations = {
    show(state, { message }) {
      state.message = message;
      state.color = "success";
      state.index +=1;
      state.timeout = 3000;
    },
    showError(state, { message }) {
      state.message = message;
      state.color = "error";
      state.index +=1;
      state.timeout = 0;
    },
    hide(state) {
      state.message = "";
    }
  };
  
  const actions = {
    show({ commit }, message) {
      commit("show", message);
    },
    showError({ commit }, message) {
      commit("showError", message);
    },
    hide({ commit }) {
      commit("hide");
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };
  