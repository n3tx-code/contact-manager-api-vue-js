<template>
  <div id="sigin-form" class="col-10 offset-1">
    <form>
        <div class="form-group">
            <label>Adresse mail :</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        </div>
        <div class="form-group">
            <label>Confirmation adresse mail :</label>
            <input v-model="emailConfirmation" type="email" class="form-control" placeholder="Confirmation email" required @keyup="compareEmail()">
        </div>
        <div class="form-group">
            <label>Mot de passe :</label>
            <input v-model="pwd" type="password" class="form-control" placeholder="Mot de passe" required >
        </div>
        <div class="form-group">
            <label>Confirmation mot de passe :</label>
            <input v-model="pwdConfirmation" type="password" class="form-control" placeholder="Confirmation mot de passe" required @keyup="comparePwd()">
            
        </div>
        <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
          {{ error_msg }}
        </div>
        
        <button v-if="this.pwdAreSame && this.emailAreSame" type="submit" class="btn btn-contact-manager btn-block">Inscription</button>
        <div v-else class="row">
          <div class=" col-10 offset-1 bg-warning text-white text-center animated bounceIn item-different">
            {{ error_msg_not_same }}
          </div>
        </div>
        
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'SignInForm',
  data(): {email: string, emailConfirmation: string, emailAreSame: boolean,  pwd: string, pwdConfirmation: string, pwdAreSame: boolean, error_msg_not_same: string,
   error_msg: string, token: string} {
    return {
      email: '',
      emailConfirmation: '',
      emailAreSame: true,
      pwd: '',
      pwdConfirmation: '',
      pwdAreSame: true,
      error_msg_not_same: 'Des champs sont différents',
      error_msg: '',
      token: '',
    };
  },
  methods: {
    compareEmail()
    {
      if(this.email === this.emailConfirmation) {
        this.emailAreSame = true;
      }
      else {
        this.emailAreSame = false;
        this.error_msg_not_same = 'Adresse mail différentes';
      }
    },
    comparePwd()
    {
      if(this.pwd === this.pwdConfirmation) {
        this.pwdAreSame = true;
      }
      else {
        this.pwdAreSame = false;
        this.error_msg_not_same = 'Mot de passe différents';
      }
    }
  }
  
});
</script>

<style scoped lang="scss">
  form
  {
    padding: 20px;
  }
  .item-different
  {
    margin-top : 10px;
    padding: 10px;
  }
</style>
