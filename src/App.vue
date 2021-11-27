<template>
  <div id="app">
    <TopNav />
    <div class="main-content">
      <template v-if="isLoggedIn">
        <component v-bind:is="currentPage" />
      </template>
      <template v-else>
        <Login />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NotFound from "./components/NotFound.vue";
import Login from "./components/Login.vue";
import Listings from "./components/Listings.vue";
import TopNav from "./components/TopNav.vue";
import BookingDetails from "./components/BookingDetails.vue";
import MyBookings from "./components/MyBookings.vue";
import "./styles/main.scss";

export default {
  name: "App",
  components: {
    Listings,
    Login,
    TopNav,
    NotFound,
    BookingDetails,
    MyBookings,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["currentPage"]),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["init"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  .main-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1024px;
    padding: 24px;
  }
}
</style>
