<template>
<div id="contact-manager-app">
  <nav class="navbar navbar-expand-lg navbar-light contact-manager-navbar text-white">
    <span class="navbar-brand text-white">Contact Manger</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-ellipsis-v"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link text-white" href="/app">Mes contacts <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <ul class="navbar-nav nav-logout">
        <li class="nav-item">
          <span class="nav-link text-white">Déconnexion</span>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container" id="app-wrapper">
    <div id="contact-search">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Rechercher un contact">
        <div class="input-group-prepend">
          <button type="button" class="btn btn-contact-manager" id="btn-contact-search"><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>  
  
    <button type="button" class="btn btn-block btn-contact-manager" data-toggle="modal" data-target="#exampleModalLong">Ajouter un contact</button>
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <contact-add></contact-add>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import ContactAdd from '@/components/ContactAdd.vue'; 

export default Vue.extend({
  name: 'ContactManagerApp',
  data(): {token: string} {
    return {
      token: '',
    };
  },
  components: {
    ContactAdd,
  },
  methods: 
  {
    getToken(): void {
      if (document.cookie.length > 0) {
          const dataFromCookie = JSON.parse(document.cookie);
          if (dataFromCookie.hasOwnProperty('token')) {
              this.token = dataFromCookie['token'];
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
<style scoped lang="scss">
  .contact-manager-navbar
  {
    background-color : #0db0d3;
  }
  .navbar-light .navbar-toggler
  {
    color : #fff;
    border: none;
  }
  #app-wrapper
  {
    margin-top: 20px;
  }
  #contact-search
  {
    margin-bottom: 20px;
  }
  #btn-contact-search
  {
    border-top-right-radius : 5px;
    border-bottom-right-radius : 5px; 
  }
  @media screen and (min-width: 992px)
  {
    .nav-logout
      {
        float : right;
      }
  }
</style>
