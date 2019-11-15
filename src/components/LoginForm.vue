<template>
  <div id="login-form" class="col-12">
    <form @submit.prevent="submitLoginForm()">
        <label>Email :</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-at"></i></span>
          </div>
          <input v-model="login_email" type="email" class="form-control" 
            placeholder="Email de connexion" required>
        </div>
        
        <label>Mot de passe :</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
          </div>
          <input v-model="login_pwd" type="password" class="form-control" placeholder="Mot de passe" required>
        </div>
        <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
          {{ error_msg }}
        </div>
        <button type="submit" class="btn btn-contact-manager btn-block">Connexion <i class="fas fa-rocket animated "></i></button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

import axios from 'axios';

export default Vue.extend({
  name: 'LoginForm',
  data(): {login_email: string, login_pwd: string, error_msg: string, token: string} {
    return {
      login_email: '',
      login_pwd: '',
      error_msg: '',
      token: '',
    };
  },
  methods:
  {
    setTokenCookie(token: string): void {
      const expireData = new Date();
      expireData.setTime(expireData.getTime() + (365 * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + expireData.toUTCString();
      document.cookie = JSON.stringify({token}) + ';' + expires + ';';
      router.push({name: 'ContactManagerApp'});
    },
    submitLoginForm(): void {
      const formData = new FormData();
      formData.append('email', this.login_email);
      formData.append('pwd', this.login_pwd);

      axios.post('http://contact-manager/user/login/', formData)
      .then((response) => {
        if (response.data.hasOwnProperty('error')) {
            // to avoid warning on run serve
            const error = 'error';
            this.error_msg = response.data[error];
        } else {
            this.setTokenCookie(response.data);
        }
      })
      .catch((error) => {
        this.error_msg = 'Erreur de réseau';
      });
    },
  },
});
</script>

<style scoped lang="scss">
form {
  padding: 20px;
}

#error-msg,
#success-msg {
  margin-bottom: 15px;
  padding: 4px;
}
</style>
