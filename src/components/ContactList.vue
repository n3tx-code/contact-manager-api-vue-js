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
    <div v-if="this.sucessMessage" class="bg-success text-white text-center" id="success-msg">
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
import Contact from '@/models/contact.ts';
import ContactItem from '@/components/ContactItem.vue';
import ContactAdd from '@/components/ContactAdd.vue';

export default Vue.extend({
    name: 'contact-list',
    components: {
        ContactItem,
        ContactAdd,
    },
    data(): {error_msg: string, sucessMessage: string, rechercheString: string, contacts: Contact[]} {
        return {
            error_msg: '',
            sucessMessage: '',
            rechercheString : '',
            contacts: Array<Contact>(),
        };
    },
    props:
    {
      token: String,
    },
    methods: {
        getContacts(): void {
          this.contacts = [];
          const formData = new FormData();

          formData.append('token', this.$props.token);
          axios.post('http://contact-manager/contact/get/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // to avoid warning on run serve
                const error = 'error';
                this.error_msg = response.data[error];
              } else {
                response.data.forEach((c: string) => {
                  const contact = <Contact> {};
                  // to avoid npm run serve warning "object access via string literals is desallowed"
                  const ID = 'ID';
                  const IDOwner = 'ID_owner';
                  const forname = 'forname';
                  const name = 'name';
                  const phonePro = 'phonePro';
                  const phonePerso = 'phonePerso';
                  const emailPerso = 'emailPerso';
                  const emailPro = 'emailPro';
                  const linkendin = 'linkendin';
                  const facebook = 'facebook';
                  const twitter = 'twitter';
                  const website = 'website';
                  const lastModification = 'lastModification';
                  contact.ID = c[ID];
                  contact.ID_owner = c[IDOwner];
                  contact.forname = c[forname];
                  contact.name = this.setToUndefinedIfNull(c[name]);
                  contact.phonePro = this.setToUndefinedIfNull(c[phonePro]);
                  contact.phonePerso = this.setToUndefinedIfNull(c[phonePerso]);
                  contact.emailPro = this.setToUndefinedIfNull(c[emailPro]);
                  contact.emailPerso = this.setToUndefinedIfNull(c[emailPerso]);
                  contact.linkendin = this.setToUndefinedIfNull(c[linkendin]);
                  contact.facebook = this.setToUndefinedIfNull(c[facebook]);
                  contact.twitter = this.setToUndefinedIfNull(c[twitter]);
                  contact.website = this.setToUndefinedIfNull(c[website]);
                  contact.lastModification = c[lastModification];
                  this.contacts.push(contact);
                });
              }
            })
            .catch((error) => {
              this.error_msg = 'Erreur de réseau';
            });
        },
        setToUndefinedIfNull(str: string) {
          if (str === null) {
            return undefined;
          }
          return str;
        },
        setSuccessMsg(msg: string): void {
          this.sucessMessage = msg;
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
      this.getContacts();
    },
});
</script>

<style scoped lang="scss">
.no-contact-title {
  margin-top: 20px;
}
</style>
