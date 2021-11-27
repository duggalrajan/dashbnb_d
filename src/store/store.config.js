import apis from '../apis';

const AUTH_TOKEN_NAME = 'authToken';
const DEFAULT_PAGE = 'listings';

export default {
  state: {
    authToken: null,
    currentPage: null,
    listings: [],
    selectedProperty: {},
    myBookingsData: []
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
    setSelectedProperty(state, info) {
      state.selectedProperty = info
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setMyBookingsData(state, data) {
      state.myBookingsData = data;
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
    async getListingDetails({ commit }, id) {
      const response = await apis.getListingDetails(id);
      commit('setSelectedProperty', response.data)
      commit('setCurrentPage', 'BookingDetails');
    },
    async gotoPage({ commit }, page) {
      commit('setCurrentPage', page);
    },
    async getMyBookings({ commit }) {
      const response = await apis.getMyBookings();
      commit('setMyBookingsData', response.data)
      commit('setCurrentPage', 'MyBookings')
    },
    async submitBooking({ commit }, data) {
      const response = await apis.submitBooking(data)
      console.log(commit, response)
    }
  },
  modules: {
  }
};
