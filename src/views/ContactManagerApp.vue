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
          <span class="nav-link text-white" @click="logOut()">Déconnexion</span>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container" id="app-wrapper"> 
  
    <div class="wrapper-fluid">
      <contact-list></contact-list>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import { mapState } from 'vuex';
import ContactList from '@/components/ContactList.vue';
import contacts from '@/store/modules/contacts';
import appStore from '@/store/modules/appStore';


export default Vue.extend({
  name: 'ContactManagerApp',
  components: {
    ContactList,
  },
  methods:
  {
    logOut(): void {
      this.$store.commit('contacts/clearContacts');
      this.$store.dispatch('appStore/logout');
    },
  },
  beforeMount() {
    this.$store.dispatch('appStore/getToken');
  },
});
</script>
<style scoped lang="scss">
.contact-manager-navbar {
  background-color: #0db0d3;
}

.navbar-light .navbar-toggler {
  color: #fff;
  border: none;
}

#app-wrapper {
  margin-top: 20px;
}

#success-msg {
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 4px;
}

.nav-logout {
  cursor: pointer;
}

@media screen and (min-width: 992px) {
  .nav-logout {
    float: right;
  }
}
</style>
