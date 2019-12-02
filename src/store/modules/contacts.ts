import { Module } from 'vuex';
import router from '@/router';
import Contact from '@/models/contact';
import appStore from '@/store/modules/appStore';
import axios from 'axios';

function setToUndefinedIfNull(str: string) {
  if (str === null) {
    return undefined;
  }
  return str;
}

const contacts: Module<{contacts: Contact[]}, any> = {
    namespaced: true,
    state: {
        contacts : Array<Contact>(),
    },
    getters: {

    },
    mutations: {
      clearContacts(state) {
        state.contacts = [];
      },
    },
    actions: {
      getContacts(context) {
        const allContacts = Array<Contact>();
        const formData = new FormData();
        formData.append('token', context.rootState.token);
        axios.post('http://contact-manager/contact/get/', formData)
          .then((response) => {
            if (response.data.hasOwnProperty('error')) {
              // to avoid warning on run serve
              const error = 'error';
              // this.error_msg = response.data[error];
            } else {
              response.data.forEach((c: string) => {
                const contact = {} as Contact;
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
                contact.name = setToUndefinedIfNull(c[name]);
                contact.phonePro = setToUndefinedIfNull(c[phonePro]);
                contact.phonePerso = setToUndefinedIfNull(c[phonePerso]);
                contact.emailPro = setToUndefinedIfNull(c[emailPro]);
                contact.emailPerso = setToUndefinedIfNull(c[emailPerso]);
                contact.linkendin = setToUndefinedIfNull(c[linkendin]);
                contact.facebook = setToUndefinedIfNull(c[facebook]);
                contact.twitter = setToUndefinedIfNull(c[twitter]);
                contact.website = setToUndefinedIfNull(c[website]);
                contact.lastModification = c[lastModification];
                context.state.contacts.push(contact);
              });
            }
          })
          .catch((error) => {
            // this.error_msg = 'Erreur de réseau';
          });
        },
    },
};

export default contacts;
