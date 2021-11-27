<template>
  <div class="bookings-card">
    <div class="header">
      <div class="title">{{ selectedProperty.name }}</div>
      <div class="rating-address">
        <Rating :value="selectedProperty.rating" />
        <div class="rating">
          {{ selectedProperty.address.city }}
          {{ selectedProperty.address.country }}
        </div>
      </div>
    </div>
    <div class="details">
      <div>
        <img
          v-for="item in selectedProperty.images"
          :key="item"
          :src="item.url"
        />
        <div>
          <div class="beds-baths">
            {{ selectedProperty.bedrooms }} Bedrooms /
            {{ selectedProperty.bathrooms }} Bathrooms
          </div>
          <h3>About this space</h3>
          <div>{{ selectedProperty.description }}</div>
        </div>
      </div>
      <div class="booking-section">
        <Price :value="selectedProperty.price" />
        <div>
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8"
            @submit.prevent
          >
            <div class="mb-4 calender-box">
              <span class="block text-gray-600 text-sm text-left font-bold mb-2"
                >Select Range</span
              >
              <vc-date-picker
                v-model="range"
                mode="dateTime"
                :masks="masks"
                is-range
              >
                <template v-slot="{ inputValue, inputEvents, isDragging }">
                  <div
                    class="flex flex-col sm:flex-row justify-start items-center"
                  >
                    <div class="relative flex-grow">
                      <input
                        class="
                          flex-grow
                          pl-8
                          pr-2
                          py-1
                          bg-gray-100
                          border
                          rounded
                          w-full
                        "
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                      />
                    </div>

                    <div class="relative flex-grow">
                      <input
                        class="
                          flex-grow
                          pl-8
                          pr-2
                          py-1
                          bg-gray-100
                          border
                          rounded
                          w-full
                        "
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />
                    </div>
                  </div>
                </template>
              </vc-date-picker>
            </div>
            <div><input type="text" placeholder="Your name" /></div>
            <div><input type="text" placeholder="Your email" /></div>
          </form>
          <!-- <vc-calendar :attributes="attributes" @dayclick="onDayClick" /> -->
        </div>
        <Button @click.native="bookNow(selectedProperty)">Reserve</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Rating from "./Rating.vue";
import Button from "./Button.vue";
import Price from "./Price.vue";
// import VCalendar from "v-calendar";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    Rating,
    Button,
    Price,
  },
  computed: {
    ...mapState(["selectedProperty"]),
  },
  methods: {
    ...mapActions(["getMyBookings"]),
    ...mapActions(["submitBooking"]),
    bookNow(hotel) {
      const { id } = hotel;
      console.log(id);
      this.submitBooking();
    },
    onDayClick() {},
    onChange(e) {
      let val = e.target.value;
      this.initPage(val);
    },
    async initPage(val) {
      this.loading = true;
      try {
        await this.getListings(val);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bookings-card {
  .calender-box {
    display: flex;
    justify-content: flex-start;
  }
  box-shadow: 0 0 5px #ccc;
  background: white;
  padding: 2rem;
  .title {
    font-size: 1.6rem;
  }
  .rating {
    margin-left: 1rem;
  }
  .rating-address {
    display: flex;
    margin: 15px 0;
  }
  .details {
    .beds-baths {
      margin: 20px 0;
      font-size: 1.2rem;
    }
    display: flex;
    > div {
      width: 50%;
    }
    img {
      width: 90%;
    }
  }
}

.listing-rating {
  position: absolute;
  top: 0;
  right: 0;
}
.book-now-area {
  position: absolute;
  bottom: 0;
  right: 0;

  .book-price {
    padding-bottom: 10px;
  }
}
</style>