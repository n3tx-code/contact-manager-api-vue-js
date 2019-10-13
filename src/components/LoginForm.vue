<template>
  <div id="login-form" class="col-10 offset-1">
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
        <button type="submit" class="btn btn-contact-manager btn-block">Connexion <i class="fas fa-rocket animated "></i></button>
        <div id="error-msg" v-if="error_msg">{{ error_msg }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios'

export default Vue.extend({
  name: 'LoginForm',
  data(): {login_email: string, login_pwd: string, error_msg: string}{
    return {
      login_email: '',
      login_pwd: '',
      error_msg: '',
    };
  },
  methods:
  {
    submitLoginForm(): void
    {
      var formData = new FormData();
      formData.append('email', this.login_email);
      formData.append('pwd', this.login_pwd);  

      axios.post('http://contact-manager/user/login/', formData)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('Erreur de réseau');
      });
    },
  },
});
</script>

<style scoped lang="scss">
form
{
  padding : 20px;
}
</style>
