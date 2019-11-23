<template>
  <form id="contact-add" @submit.prevent="submitContactAddForm()" enctype="multipart/form-data">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Ajout d'un contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <label>Prénom* :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Prénom" required  v-model="forName">
            </div>

            <label>Nom :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Nom" v-model="name">
            </div>

            <label>Téléphone professionnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-phone"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Professionnel" v-model="phonePro" @keyup="checkPhoneNumber(phonePro, 'Pro')">
            </div>

            <label>Téléphone personnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Personnel" v-model="phonePerso" @keyup="checkPhoneNumber(phonePerso, 'Perso')">
            </div>

            <label>Email professionnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-at"></i></span>
              </div>
              <input type="email" class="form-control" placeholder="Professionnel" v-model="emailPro">
            </div>

            <label>Email personnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="far fa-envelope"></i></span>
              </div>
              <input type="email" class="form-control" placeholder="Personnel" v-model="emailPerso">
            </div>

            <button type="button" class="btn btn-link text-center col-12" v-html=option_txt @click="toggleOptions()"></button>

            <div v-if="moreDetails" class="animated fadeIn">
                <label>Linkendin :</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fab fa-linkedin-in"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Linkendin" v-model="linkendin">
                </div>

                <label>Facebook :</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fab fa-facebook-f"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Facebook" v-model="facebook">
                </div>

                <label>Twitter :</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fab fa-twitter"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Twitter" v-model="twitter">
                </div>

                <label>Url :</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-link"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Site web" v-model="website">
                </div>
              </div>
              <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
                {{ error_msg }}
              </div>
          </div>
          <div class="modal-footer">
            <div class="row col-12">
              <div class="col-6">
                <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Fermer</button>
              </div>
              <div class="col-6" v-if="this.showBtnSubmit">
                <button type="submit" class="btn btn-contact-manager btn-block">Ajouter <i class="fas fa-plus-circle"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    name: 'contact-add',
    data(): {moreDetails: boolean, showBtnSubmit: boolean, error_msg: string, option_txt: string, name?: string,
    forName: string, phonePro?: string, phonePerso?: string, emailPro?: string, emailPerso?: string, linkendin?: string,
    facebook?: string, twitter?: string, website?: string} {
        return {
            moreDetails: false,
            showBtnSubmit: true,
            error_msg: '',
            option_txt: 'Plus d\'options <i class="fas fa-caret-down"></i>',
            name: undefined,
            forName: '',
            phonePro: undefined,
            phonePerso: undefined,
            emailPro: undefined,
            emailPerso: undefined,
            linkendin: undefined,
            facebook: undefined,
            twitter: undefined,
            website: undefined,
        };
    },
    props:
    {
      token: String,
      setSuccessMsg: Function,
      closeAddContactModal: Function,
      updateContacts: Function,
    },
    methods: {
        toggleOptions(): void {
          if (this.moreDetails) {
            this.option_txt = 'Plus d\'options <i class="fas fa-caret-down"></i>';
          } else {
            this.option_txt = 'Moins d\'options <i class="fas fa-caret-up"></i>';
          }
          this.moreDetails = !this.moreDetails;
        },
        submitContactAddForm(): void {
          const imgContactInput = document.getElementById('contact-img');
          const formData = new FormData();

          formData.append('forName', this.forName);
          formData.append('token', this.$props.token);
          if (typeof this.name !== 'undefined') {
            formData.append('name', this.name);
          }
          if (typeof this.phonePro !== 'undefined') {
            formData.append('phonePro', String(this.phonePro));
          }
          if (typeof this.phonePerso !== 'undefined') {
            formData.append('phonePerso', String(this.phonePerso));
          }
          if (typeof this.emailPro !== 'undefined') {
            formData.append('emailPro', String(this.emailPro));
          }
          if (typeof this.emailPerso !== 'undefined') {
            formData.append('emailPerso', String(this.emailPerso));
          }
          if (typeof this.linkendin !== 'undefined') {
            formData.append('linkendin', String(this.linkendin));
          }
          if (typeof this.facebook !== 'undefined') {
            formData.append('facebook', String(this.facebook));
          }
          if (typeof this.twitter !== 'undefined') {
            formData.append('twitter', String(this.twitter));
          }
          if (typeof this.website !== 'undefined') {
            formData.append('website', String(this.website));
          }

          axios.post('http://contact-manager/contact/add/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // to avoid warning on run serve
                const error = 'error';
                this.error_msg = response.data[error];
              } else {
                if (response.data === 'Contact added') {
                    this.error_msg = '';
                    this.$props.closeAddContactModal();
                    this.$props.setSuccessMsg(this.forName + ' a été ajouté.');
                    this.forName = '';
                    this.name = undefined;
                    this.phonePro = undefined;
                    this.phonePerso = undefined;
                    this.emailPro = undefined;
                    this.emailPerso = undefined;
                    this.linkendin = undefined;
                    this.facebook = undefined;
                    this.twitter = undefined;
                    this.website = undefined;
                    this.$props.updateContacts();
                } else {
                  this.error_msg = 'Erreur lors de la création du contact';
                }
              }
            })
            .catch((error) => {
              this.error_msg = 'Erreur de réseau';
            });
        },
        checkPhoneNumber(phoneNumber: string, variable: string): void {
          if (isNaN(Number(phoneNumber.slice(-1)))) {
            if (variable === 'Pro') {
              this.phonePro = phoneNumber.slice(0, -1);
            } else if (variable === 'Perso') {
              this.phonePerso = phoneNumber.slice(0, -1);
            }
          }
        },
      },
    });
</script>

<style scoped lang="scss">
    
</style>