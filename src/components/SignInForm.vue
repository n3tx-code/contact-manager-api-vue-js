<template>
  <div id="sigin-form" class="col-12">
    <form @submit.prevent="submitSignInForm()">
        <div class="form-group">
            <label>Adresse mail :</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email" id="email1" required>
        </div>
        <div class="form-group">
            <label>Confirmation adresse mail :</label>
            <input v-model="emailConfirmation" type="email" class="form-control" id="email2" placeholder="Confirmation email" required @keyup="compareEmail()">
        </div>
        <div class="form-group">
            <label>Mot de passe :</label>
            <input v-model="pwd" type="password" class="form-control" placeholder="Mot de passe" required id="pwd1">
        </div>
        <div class="form-group">
            <label>Confirmation mot de passe :</label>
            <input v-model="pwdConfirmation" type="password" class="form-control" placeholder="Confirmation mot de passe" required @keyup="comparePwd()" id="pwd2">
            
        </div>
        <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
          {{ error_msg }}
        </div>
        <div v-if="this.signInSucces">
          <div class="row">
            <div class="col-12 bg-success text-white text-center" id="success-msg">
              Merci pour votre Inscription. Vous pouvez maintenant vous connecter.
            </div>
          </div>
        </div>
        <button v-else-if="this.pwdAreSame && this.emailAreSame" type="submit" class="btn btn-contact-manager btn-block">Inscription</button>
        <div v-else class="row">
          <div 
            class=" col-10 offset-1 bg-warning text-white text-center animated bounceIn item-different"
            id="error-msg">
            {{ errorMsgNotSame }}
          </div>
        </div>       
        
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

import axios from 'axios';

export default Vue.extend({
  name: 'SignInForm',
  data(): {email: string, emailConfirmation: string, emailAreSame: boolean,  pwd: string,
   pwdConfirmation: string, pwdAreSame: boolean, errorMsgNotSame: string, signInSucces: boolean,
   error_msg: string, token: string} {
    return {
      email: '',
      emailConfirmation: '',
      emailAreSame: true,
      pwd: '',
      pwdConfirmation: '',
      pwdAreSame: true,
      errorMsgNotSame: 'Des champs sont différents',
      error_msg: '',
      token: '',
      signInSucces: false,
    };
  },
  methods: {
    compareEmail(): void {
      if (this.email === this.emailConfirmation) {
        this.emailAreSame = true;
      } else {
        this.emailAreSame = false;
        this.errorMsgNotSame = 'Adresse mail différentes';
      }
    },
    comparePwd(): void {
      if (this.pwd === this.pwdConfirmation) {
        this.pwdAreSame = true;
      } else {
        this.pwdAreSame = false;
        this.errorMsgNotSame = 'Mot de passe différents';
      }
    },
    submitSignInForm(): void {
      const formData = new FormData();
      formData.append('email1', this.email);
      formData.append('email2', this.emailConfirmation);
      formData.append('pwd1', this.pwd);
      formData.append('pwd2', this.pwdConfirmation);

      axios.post('http://contact-manager/user/signin/', formData)
      .then((response) => {
        if (response.data.hasOwnProperty('error')) {
            // to avoid warning on run serve
            const error = 'error';
            this.error_msg = response.data[error];
        } else {
            this.signInSucces = true;
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

.item-different {
  margin-top: 10px;
  padding: 10px;
}

#error-msg,
#success-msg {
  margin-bottom: 15px;
  padding: 4px;
}
</style>
