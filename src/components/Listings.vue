<template>
    <div>
        <ControlBar>
          <select>
            <option>All Listings</option>
            <option>Cottage</option>
            <option>House</option>
            <option>Hotel</option>
            <option>Resort</option>
          </select>
        </ControlBar>
        <template v-if="loading">
            Loading ...
        </template>
        <template v-else>
        <List :items="listings" >
            <template #default="{ item: listing }">
              <Listing :key="listing.id" :value="listing" />
            </template>
        </List>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import List from './List.vue';
import ControlBar from './ControlBar.vue';
import Listing from './Listing.vue';

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
        ...mapState(['listings']),
    },
    mounted() {
        this.initPage();
    },
    methods: {
        ...mapActions(['getListings']),
        async initPage() {
            this.loading = true;
            try {
                await this.getListings();
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
