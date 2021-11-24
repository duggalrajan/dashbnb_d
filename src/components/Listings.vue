<template>
  <div>
    <ControlBar>
      <select @change="onChange($event)">
        <option value="">All Listings</option>
        <option value="cottage">Cottage</option>
        <option value="house">House</option>
        <option value="hotel">Hotel</option>
        <option value="resort">Resort</option>
      </select>
    </ControlBar>
    <template v-if="loading"> Loading ... </template>
    <template v-else>
      <List :items="listings">
        <template #default="{ item: listing }">
          <Listing :key="listing.id" :value="listing" />
        </template>
      </List>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import List from "./List.vue";
import ControlBar from "./ControlBar.vue";
import Listing from "./Listing.vue";

export default {
  components: {
    ControlBar,
    List,
    Listing,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["listings"]),
  },
  mounted() {
    this.initPage();
  },
  methods: {
    onChange(e) {
      let val = e.target.value;
      this.initPage(val);
    },
    ...mapActions(["getListings"]),
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
