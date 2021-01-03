import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    base_url: 'http://3223292f8061.ngrok.io',
    crrentUserDonate: null,
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
    crrentUserDonate(state, crrentUserDonate) {
      state.crrentUserDonate = crrentUserDonate;
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
