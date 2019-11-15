<template>
  <div id="home-form">
    <div class="row">
        <div class="col-md-6 offset-md-3 col-10 offset-1" id="home-form-wrapper">
            <div id="home-form-header" class="text-center text-white">
                <i class="fas fa-arrow-circle-left float-left home-form-back" @click="backToFormChoises()"
                v-if="this.login_selected || this.sigIn_selected"></i> 
                <h3>{{ title }}</h3>
            </div>
            <div class="bg-white home-form-border-bottom">
                <div v-if="login_selected">
                    <log-in-form></log-in-form>
                </div>
                <div v-else-if="sigIn_selected">
                    
                    <sig-in-form></sig-in-form>
                </div>
                <div v-else class="col-12 row text-center">
                    <div class="col-6 home-choise border-right" @click="showLoginForm()" id="home-choise-logIn">
                        <i class="fas fa-sign-in-alt home-choise-icon"></i>
                        <h5 class="home-choise-title">Connexion</h5>
                    </div>
                    <div class="col-6 home-choise"  @click="showSignInForm()" id="home-choise-signIn">
                        <i class="fas fa-user-plus home-choise-icon"></i>
                        <h5 class="home-choise-title">Inscription</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LogInForm from '@/components/LoginForm.vue';
import SigInForm from '@/components/SignInForm.vue';
import router from '@/router';

export default Vue.extend({
    name: 'home-form',
    data(): { title: string, login_selected: boolean,  sigIn_selected: boolean} {
        return {
            title : 'Inscription et connexion',
            login_selected : false,
            sigIn_selected : false,
        };
    },
    components: {
        LogInForm,
        SigInForm,
    },
    methods: {
        detectIfCookieIsSet(): void {
            if (document.cookie.length > 0) {
                const dataFromCookie = JSON.parse(document.cookie);
                if (dataFromCookie.hasOwnProperty('token')) {
                    router.push({name: 'ContactManagerApp'});
                }
            }
        },
        showLoginForm(): void {
            this.login_selected = true;
            this.title = 'Connexion';
        },
        showSignInForm(): void {
            this.sigIn_selected = true;
            this.title = 'Inscription';
        },
        backToFormChoises(): void {
            this.login_selected = false;
            this.sigIn_selected = false;
            this.title = 'Inscription et connexion';
        },
    },
    beforeMount() {
        this.detectIfCookieIsSet();
    },
});
</script>

<style scoped lang="scss">
#home-form {
  margin-top: 50px;
}

#home-form-wrapper {
  box-shadow: 0px 0px 10px #a2a2a2;
  padding: 0px;
  border-radius: 30px;
}

#home-form-header {
  background-image: linear-gradient(to bottom right, #0db0d3, #9c32fe);
  padding: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.home-form-border-bottom {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.home-choise-icon {
  font-size: 50px;
}

.home-choise {
  margin-top: 40px;
  margin-bottom: 40px;
  cursor: pointer;
}

.home-choise:hover {
  color: #0db0d3;
}

.home-choise-title {
  margin-top: 20px;
}

.home-form-back {
  font-size: 25px;
  margin-top: 5px;
  cursor: pointer;
}

.home-form-back:hover {
  color: #0db0d3;
}
</style>
