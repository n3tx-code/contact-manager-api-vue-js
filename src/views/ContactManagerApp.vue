<template>
  <h1>Application</h1>
</template>
<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'ContactManagerApp',
  data(): {token: string} {
    return {
      token: '',
    };
  },
  methods: 
  {
    getToken(): void {
      if (document.cookie.length > 0) {
          const dataFromCookie = JSON.parse(document.cookie);
          if (dataFromCookie.hasOwnProperty('token')) {
              this.token = dataFromCookie['token'];
              console.log(this.token);
          }
          else {
            router.push({name: 'home'});
          }
      }
      else {
        router.push({name: 'home'});
      }
    },
  },
  beforeMount() {
        this.getToken();
  },
});
</script>