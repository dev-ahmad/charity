import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);


const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    crrentUser: null,
    isLoggedIn: false,
  },
  getters: {},
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setCurrnentUser(state, crrentUser) {
      state.crrentUser = crrentUser;
    },
  },
  actions: {},
  strict: debug,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
