import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

import Listings from '../../../src/components/Listings.vue';
import StoreConfig from '../../../src/store/store.config';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/Listings.vue', () => {
    let wrapper;
    let store;

    function createComponent() {
        const component = shallowMount(
          Listings,
          { localVue, store }
        );
        return component;
      }

    beforeEach(() => {
        store = new Vuex.Store(cloneDeep(StoreConfig));
    });
    afterEach(() => {
        mockAxios.reset();
        if (wrapper) {
            wrapper.destroy();
        }
    })

    it('Should query for listings on mount', async () => {
        const mockListings = [{id: 42 }, {id: 36 }];
        mockAxios.onGet('/listings').reply(200, { items:  mockListings })
        wrapper = createComponent();
        expect(wrapper.vm).toBeDefined();
        await flushPromises();
        expect(wrapper.vm.listings).toBeDefined();
        expect(wrapper.vm.listings.length).toEqual(mockListings.length);
    })
});