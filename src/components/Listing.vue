<template>
  <div class="listing-item">
    <div>
      <img :src="value.images[0].url" />
    </div>
    <div>
      <div class="address">
        {{ value.address.city }}, {{ value.address.state }},
        {{ value.address.country }}
      </div>
      <div class="name">{{ value.name }}</div>
      <SummaryList :items="rooms" />
      <SummaryList :items="amenities" />
    </div>
    <Rating class="listing-rating" :value="value.rating" />
    <div class="book-now-area d-flex flex-column align-end">
      <Price class="book-price" :value="value.price" />
      <Button @click.native="redirect(value.id)">BOOK NOW</Button>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
import Price from "./Price.vue";
import Button from "./Button.vue";
import SummaryList from "./SummaryList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Rating,
    Price,
    Button,
    SummaryList,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  methods: {
    redirect(id) {
      this.getListingDetails(id);
    },
    ...mapActions(["gotoPage"]),
    ...mapActions(["getListingDetails"]),
  },
  computed: {
    rooms() {
      const list = [];
      if (this.value) {
        list.push(`${this.value.occupancy} guests`);
        if (this.value.bedrooms > 0) {
          list.push(`${this.value.bedrooms} bedrooms`);
        }
        if (this.value.bathrooms > 0) {
          list.push(`${this.value.bathrooms} bathrooms`);
        }
      }
      return list;
    },
    amenities() {
      return this.value
        ? Object.keys(this.value.amenities).reduce((results, key) => {
            if (this.value.amenities[key]) {
              results.push(key);
            }
            return results;
          }, [])
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.listing-item {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 208px;

  h2 {
    margin-top: 0px;
  }
  img {
    object-fit: cover;
    width: 300px;
    height: 100%;
    margin-right: 12px;
  }

  .name {
    font-size: 24px;
    color: $grey-text;
    padding-bottom: 8px;
  }

  .address {
    font-size: 16px;
    color: $grey-text;
    padding-bottom: 8px;
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