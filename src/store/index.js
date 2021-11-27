import Vue from 'vue'
import Vuex from 'vuex'
import StorgConfig from './store.config';
import VCalendar from 'v-calendar';

Vue.use(Vuex)
Vue.use(VCalendar, {
    componentPrefix: 'vc'
});

export default new Vuex.Store(StorgConfig)
