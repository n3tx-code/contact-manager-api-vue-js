import { Module } from 'vuex';
import Contact from '@/models/contact';
import axios from 'axios';

import key from '@/tools/keys';

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
    mutations: {
      clearContacts(state) {
        state.contacts = [];
      },
    },
    actions: {
      getContacts(context) {
        // avoid duplicate key error when reloading contacts
        const formData = new FormData();
        formData.append('token', context.rootState.token);
        axios.post('http://contact-manager/contact/get/', formData)
          .then((response) => {
            if (response.data.hasOwnProperty('error')) {
              // to avoid warning on run serve
              const error = 'error';
              context.commit('appStore/setErrorMsg', response.data[error], {root: true});
            } else {
              response.data.forEach((c: string) => {
                const contact = {} as Contact;
                // to avoid npm run serve warning "object access via string literals is desallowed"
                contact.ID = c[key.ID];
                contact.ID_owner = c[key.IDOwner];
                contact.forname = c[key.forname];
                contact.name = setToUndefinedIfNull(c[key.name]);
                contact.phonePro = setToUndefinedIfNull(c[key.phonePro]);
                contact.phonePerso = setToUndefinedIfNull(c[key.phonePerso]);
                contact.emailPro = setToUndefinedIfNull(c[key.emailPro]);
                contact.emailPerso = setToUndefinedIfNull(c[key.emailPerso]);
                contact.linkendin = setToUndefinedIfNull(c[key.linkendin]);
                contact.facebook = setToUndefinedIfNull(c[key.facebook]);
                contact.twitter = setToUndefinedIfNull(c[key.twitter]);
                contact.website = setToUndefinedIfNull(c[key.website]);
                contact.lastModification = c[key.lastModification];
                context.state.contacts.push(contact);
              });
            }
          })
          .catch((error) => {
            context.commit('appStore/setErrorMsg', 'Erreur de réseau', {root: true});
          });
        },

        addContact(context, contact: Contact) {
          const formData = new FormData();

          formData.append('token', context.rootState.token);
          if (typeof contact.forname !== 'undefined') {
            formData.append('forName', contact.forname );
          } else {
            context.commit('appStore/setErrorMsg', 'Le prénom du contact est obligatoire', {root: true});
          }
          if (typeof contact.name !== 'undefined') {
            formData.append('name', contact.name);
          }
          if (typeof contact.phonePro !== 'undefined') {
            formData.append('phonePro', String(contact.phonePro));
          }
          if (typeof contact.phonePerso !== 'undefined') {
            formData.append('phonePerso', String(contact.phonePerso));
          }
          if (typeof contact.emailPro !== 'undefined') {
            formData.append('emailPro', String(contact.emailPro));
          }
          if (typeof contact.emailPerso !== 'undefined') {
            formData.append('emailPerso', String(contact.emailPerso));
          }
          if (typeof contact.linkendin !== 'undefined') {
            formData.append('linkendin', String(contact.linkendin));
          }
          if (typeof contact.facebook !== 'undefined') {
            formData.append('facebook', String(contact.facebook));
          }
          if (typeof contact.twitter !== 'undefined') {
            formData.append('twitter', String(contact.twitter));
          }
          if (typeof contact.website !== 'undefined') {
            formData.append('website', String(contact.website));
          }

          axios.post('http://contact-manager/contact/add/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // to avoid warning on run serve
                const error = 'error';
                context.commit('appStore/setErrorMsg', response.data[error], {root: true});
              } else {
                if (response.data === 'Contact added') {
                    context.commit('appStore/setErrorMsg', '', {root: true});
                    context.commit('appStore/setSuccessMsg', contact.forname + ' a été ajouté', {root: true});
                    context.commit('clearContacts');
                    context.dispatch('getContacts');
                } else {
                  context.commit('appStore/setErrorMsg', 'Erreur lors de la création du contact', {root: true});
                }
              }
            })
            .catch((error) => {
              context.commit('appStore/setErrorMsg', 'Erreur de réseau', {root: true});
            });
        },

        modifyContact(context, contact: Contact) {
          const formData = new FormData();

          formData.append('ID', String(contact.ID));
          formData.append('ID_owner', String(contact.ID_owner));
          formData.append('token', context.rootState.token);
          formData.append('forName', String(contact.forname));
          if (typeof contact.name !== 'undefined') {
            formData.append('name', contact.name);
          }
          if (typeof contact.phonePro !== 'undefined') {
            formData.append('phonePro', String(contact.phonePro));
          }
          if (typeof contact.phonePerso !== 'undefined') {
            formData.append('phonePerso', String(contact.phonePerso));
          }
          if (typeof contact.emailPro !== 'undefined') {
            formData.append('emailPro', String(contact.emailPro));
          }
          if (typeof contact.emailPerso !== 'undefined') {
            formData.append('emailPerso', String(contact.emailPerso));
          }
          if (typeof contact.linkendin !== 'undefined') {
            formData.append('linkendin', String(contact.linkendin));
          }
          if (typeof contact.facebook !== 'undefined') {
            formData.append('facebook', String(contact.facebook));
          }
          if (typeof contact.twitter !== 'undefined') {
            formData.append('twitter', String(contact.twitter));
          }
          if (typeof contact.website !== 'undefined') {
            formData.append('website', String(contact.website));
          }

          axios.post('http://contact-manager/contact/update/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // to avoid warning on run serve
                const error = 'error';
                context.commit('appStore/setErrorMsg', response.data[error], {root: true});
              } else {
                if (response.data === 'Contact modified') {
                  context.commit('appStore/setErrorMsg', '', {root: true});
                  context.commit('appStore/setSuccessMsg', contact.forname + ' a été modifié', {root: true});
                  context.commit('clearContacts');
                  context.dispatch('getContacts');
                } else {
                  context.commit('appStore/setErrorMsg', 'Erreur lors de la modification du contact', {root: true});
                }
              }
            })
            .catch((error) => {
              context.commit('appStore/setErrorMsg', 'Erreur de réseau', {root: true});
            });
        },
        deleteContact(context: any, payload) {
          const formData = new FormData();

          formData.append('ID', payload.contactId);
          formData.append('ID_owner', payload.contactIdOwner);
          formData.append('token', context.rootState.token);

          axios.post('http://contact-manager/contact/delete/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // todo : put un tools --> key
                const error = 'error';
                context.commit('appStore/setErrorMsg', response.data[error], {root: true});
              } else {
                if (response.data === 'Contact deleted') {
                  context.commit('appStore/setErrorMsg', '', {root: true});
                  context.commit('appStore/setSuccessMsg', payload.contactForname + ' a été supprimé', {root: true});
                  context.commit('clearContacts');
                  context.dispatch('getContacts');
                } else {
                  context.commit('appStore/setErrorMsg', 'Erreur lors de la suppression du contact', {root: true});
                }
              }
            })
            .catch((error) => {
              context.commit('appStore/setErrorMsg', 'Erreur de réseau', {root: true});
            });
        },
    },
};

export default contacts;
