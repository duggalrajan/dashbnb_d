import apis from '../apis';

const AUTH_TOKEN_NAME = 'authToken';
const DEFAULT_PAGE = 'listings';

export default {
  state: {
    authToken: null,
    currentPage: null,
    listings: [],
  },
  getters: {
    isLoggedIn(state) {
      return !!state.authToken;
    },
    currentPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    setAuthToken(state, newToken) {
      state.authToken = newToken;
      apis.setToken(newToken);
      if (newToken) {
        localStorage.setItem(AUTH_TOKEN_NAME, newToken);
      } else {
        localStorage.removeItem(AUTH_TOKEN_NAME);
      }
    },
    setListings(state, newListings) {
      state.listings = newListings;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  actions: {
    async init({ commit }) {
      const storedToken = localStorage.getItem(AUTH_TOKEN_NAME);
      if (storedToken) {
        commit('setAuthToken', storedToken);
      }
      commit('setCurrentPage', DEFAULT_PAGE);
    },
    async login({ commit }, { email, password }) {
      const response = await apis.login({ email, password });
      commit('setAuthToken', response.data.authToken);
    },
    async logout({ commit }) {
      commit('setAuthToken', null);
    },
    async getListings({ commit }, param) {
      const response = await apis.getListings(param);
      commit('setListings', response.data.items);
    },
    async gotoPage({ commit }, page) {
      commit('setCurrentPage', page);
    }
  },
  modules: {
  }
};
