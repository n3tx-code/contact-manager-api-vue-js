import Vue from 'vue';
import Vuex from 'vuex';
import contacts from '@/store/modules/contacts';
import appStore from '@/store/modules/appStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    contacts,
    appStore,
  },
});
