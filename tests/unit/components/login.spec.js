import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

import Login from '../../../src/components/Login.vue';
import StoreConfig from '../../../src/store/store.config';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/Login.vue', () => {
    let wrapper;
    let store;

    function createComponent() {
        const component = shallowMount(
          Login,
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

    it('Should login successfully', async () => {
        const email = 'batman@dashhudson.com';
        const password = 'B@tM0bile';
        const token = 'MySuperSecretToken';
        mockAxios.onPost('/auth/login').reply(200, { authToken: token });
        wrapper = createComponent();
        await wrapper.setData({
            email,
            password,
        })
        expect(wrapper.vm.error).toEqual(null);
        expect(store.state.authToken).toEqual(null);
        wrapper.vm.onLoginClick();
        await flushPromises();

        expect(mockAxios.history.post.length).toEqual(1);
        expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email, password }));
        expect(store.state.authToken).toEqual(token);
        expect(wrapper.vm.error).toEqual(null);
    })

    it('Should keep track of error on login failure', async () => {
        const email = 'batman@dashhudson.com';
        const password = 'B@tM0bile';
        const message = 'Invalid Credentials';
        mockAxios.onPost('/auth/login').reply(400, { message });
        wrapper = createComponent();
        await wrapper.setData({
            email,
            password,
        })
        expect(wrapper.vm.error).toEqual(null);
        expect(store.state.authToken).toEqual(null);
        wrapper.vm.onLoginClick();
        await flushPromises();

        expect(mockAxios.history.post.length).toEqual(1);
        expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({ email, password }));
        expect(store.state.authToken).toEqual(null);
        expect(wrapper.vm.error).toEqual(message);
    })
});