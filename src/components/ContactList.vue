<template>
  <div id="contact-list">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Rechercher un contract" v-model="rechercheString" 
      @keyup="getContacts()">
      <div class="input-group-append">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
      </div>
    </div>

    <button type="button" class="btn btn-block btn-contact-manager" data-toggle="modal" data-target="#addContactModal">Ajouter un contact</button>
    <div class="modal fade" id="addContactModal" tabindex="-1" role="dialog">
      <contact-add v-bind:token=this.token v-bind:setSuccessMsg=this.setSuccessMsg
       v-bind:closeAddContactModal=this.closeAddContactModal v-bind:updateContacts=this.getContacts></contact-add>
      
    </div>
    <div v-if="this.sucessMessage" class="bg-success text-white text-center animated bounceIn" id="success-msg">
      {{ this.sucessMessage }}
    </div>
    <div v-if="contacts.length == 0">
      <h2 class="text-center no-contact-title">Auncu contact enregistré</h2>
    </div>
    <contact-item v-for="contact in contacts" :key="contact.ID" :contact="contact" v-bind:token=token
     v-bind:setSuccessMsg=setSuccessMsg v-bind:updateContacts=getContacts :rechercheString="rechercheString">
    </contact-item>

    <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
        {{ error_msg }}
    </div>
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
      ...mapState('appStore', ['token']),
    },
    data(): {error_msg: string, sucessMessage: string, rechercheString: string} {
        return {
            error_msg: '',
            sucessMessage: '',
            rechercheString : '',
        };
    },

    methods: {
        getContacts(): void {
          console.log('getContacts has been called');
        },
        setSuccessMsg(msg: string): void {
          this.sucessMessage = msg;
          setTimeout(this.hideSuccessMsg, 2000);
        },
        hideSuccessMsg(): void {
          const successMsg = document.getElementById('success-msg')!;
          successMsg.classList.remove('bounceIn');
          successMsg.classList.add('fadeOut');
          setTimeout(() => {
            this.sucessMessage = '';
          }, 500);
        },
        closeAddContactModal(): void {
          const modal = document.getElementById('addContactModal');
          if (modal !== null) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
            modal.setAttribute('style', 'display: none');
            document.body.classList.remove('modal-open');
            document.body.removeAttribute('style');

            const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

            for (const modalsBackdrop of modalsBackdrops) {
              document.body.removeChild(modalsBackdrop);
            }
          }
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
