<template>
  <div>
    <div
      class="my-bookings-card"
      v-for="(item, index) in myBookingsData.items"
      :key="`item-${index}`"
    >
      <div class="details">
        <img :src="item.listing.images[0].url" />
        <div>
          <div>
            {{ item.listing.address.city }}, {{ item.listing.address.state }}
          </div>
          <div class="title">{{ item.listing.name }}</div>
          <div>{{ item.start_at }} - {{ item.end_at }}</div>
          <div>{{ item.guests }} Guests</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Rating from "./Rating.vue";
// import Button from "./Button.vue";
// import Price from "./Price.vue";
// import VCalendar from "v-calendar";

export default {
  //   data() {
  //     return {
  //       loading: false,
  //     };
  //   },
  //   components: {
  //     Rating,
  //     Button,
  //     Price,
  //   },
  computed: {
    ...mapState(["myBookingsData"]),
  },
  //   methods: {
  //     bookNow(hotel) {
  //       const { id } = hotel;
  //       console.log(id);
  //       debugger;
  //     },
  //     onDayClick() {},
  //     onChange(e) {
  //       let val = e.target.value;
  //       this.initPage(val);
  //     },
  //     async initPage(val) {
  //       this.loading = true;
  //       try {
  //         await this.getListings(val);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         this.loading = false;
  //       }
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.my-bookings-card {
  box-shadow: 0 0 5px #ccc;
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  .details {
    display: flex;
    img {
      height: 200px;
    }
    > div {
      .title {
        font-size: 2rem;
      }
      margin-left: 1rem;
      font-size: 1.2rem;
      > div {
        margin: 10px 0;
      }
    }
  }
}
</style>