<template>
  <div id="contact-list">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Rechercher un contract" v-model="rechercheString" 
      @keyup="getContacts()">
      <div class="input-group-append">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
      </div>
    </div>

    <button type="button" class="btn btn-block btn-contact-manager" @click="showAddContactModal">Ajouter un contact</button>
    <div v-if="this.displayAddContactModal && !this.sucessMessage">
      <contact-add v-bind:hideModal=this.hideAddContactModal></contact-add>
      
    </div>
    <div v-if="this.sucessMessage" class="bg-success text-white text-center animated bounceIn" id="success-msg">
      {{ this.sucessMessage }}
    </div>
    <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
        {{ error_msg }}
    </div>
    <div v-if="contacts.length == 0">
      <h2 class="text-center no-contact-title">Auncu contact enregistré</h2>
    </div>
    <contact-item v-for="contact in contacts" :key="contact.ID" :contact="contact" v-bind:token=token
     v-bind:setSuccessMsg=setSuccessMsg v-bind:updateContacts=getContacts :rechercheString="rechercheString">
    </contact-item>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import ContactItem from '@/components/ContactItem.vue';
import ContactAdd from '@/components/ContactAdd.vue';
import { mapState } from 'vuex';
import contacts from '@/store/modules/contacts';
import appStore from '@/store/modules/appStore';

export default Vue.extend({

    components: {
        ContactItem,
        ContactAdd,
    },
    computed: {
      ...mapState('contacts', ['contacts']),
      ...mapState('appStore', ['error_msg']),
      ...mapState('appStore', ['sucessMessage']),
      ...mapState('appStore', ['token']),
    },
    data(): {rechercheString: string, displayAddContactModal: boolean} {
        return {
            rechercheString : '',
            displayAddContactModal : false,
        };
    },

    methods: {
        getContacts(): void {
          this.$store.commit('contacts/clearContacts');
          this.$store.dispatch('contacts/getContacts');
        },
        setSuccessMsg(msg: string): void {
          this.$store.commit('appStore/setSuccessMsg', msg);
          setTimeout(this.hideSuccessMsg, 2000);
        },
        hideSuccessMsg(): void {
          const successMsg = document.getElementById('success-msg')!;
          successMsg.classList.remove('bounceIn');
          successMsg.classList.add('fadeOut');
          setTimeout(() => {
            this.$store.commit('appStore/setSuccessMsg', '');
          }, 500);
        },
        showAddContactModal(): void {
          this.displayAddContactModal = true;
          this.$store.commit('appStore/setSuccessMsg', '');
        },
        hideAddContactModal(): void {
          this.displayAddContactModal = false;
        },
    },
    beforeMount() {
      this.$store.dispatch('contacts/getContacts');
    },
});
</script>

<style scoped lang="scss">
.no-contact-title {
  margin-top: 20px;
}
</style>
