import { Module } from 'vuex';
import router from '@/router';
import store from '../store';

const appStore: Module<{error_msg: string, sucessMessage: string, token: string,
displayAddContactModal: boolean}, any> = {
    namespaced: true,
    state: {
        error_msg : '',
        sucessMessage : '',
        token : '',
        displayAddContactModal : false,
    },
    mutations: {
        setErrorMsg(state, msg) {
            state.error_msg = msg;
        },
        setSuccessMsg(state, msg) {
            state.sucessMessage = msg;
        },
      },
    actions: {
        getToken(context) {
            if (document.cookie.length > 0) {
                const dataFromCookie = JSON.parse(document.cookie);
                if (dataFromCookie.hasOwnProperty('token')) {
                    // to avoid warning on run serve
                    const token = 'token';
                    this.state.token = dataFromCookie[token];
                } else {
                  router.push({name: 'home'});
                }
            } else {
              router.push({name: 'home'});
            }
          },
          logout(context) {
            this.state.token = '';
            const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
            document.cookie = JSON.stringify('null') + ';' + expires + ';';
            router.push({name: 'home'});
          },
    },
};

export default appStore;
