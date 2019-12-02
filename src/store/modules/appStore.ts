import { Module } from 'vuex';
import router from '@/router';

const appStore: Module<{error_msg: string, sucessMessage: string}, any> = {
    namespaced: true,
    state: {
        error_msg : '',
        sucessMessage: '',
    },
    actions: {
        getToken(context) {
            if (document.cookie.length > 0) {
                const dataFromCookie = JSON.parse(document.cookie);
                if (dataFromCookie.hasOwnProperty('token')) {
                    // to avoid warning on run serve
                    const token = 'token';
                    context.rootState.token = dataFromCookie[token];
                } else {
                  router.push({name: 'home'});
                }
            } else {
              router.push({name: 'home'});
            }
          },
          logout(context) {
            context.rootState.token = '';
            const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
            document.cookie = JSON.stringify('null') + ';' + expires + ';';
            router.push({name: 'home'});
          },
    },
};

export default appStore;
