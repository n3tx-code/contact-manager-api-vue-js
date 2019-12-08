<template>
<div class="modal">
  <form id="contact-add" @submit.prevent="submitContactAddForm()" enctype="multipart/form-data">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Ajout d'un contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click=hideModal()>
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
            <div class="row">
              <div class="col-6">
                <button type="button" class="btn btn-secondary btn-block" @click="hideModal()">Fermer</button>
              </div>
              <div class="col-6" v-if="this.showBtnSubmit">
                <button type="submit" class="btn btn-contact-manager btn-block" id="add-btn">Ajouter <i class="fas fa-plus-circle d-none d-sm-block d-sm-none d-md-block"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import Contact from '@/models/contact';
import contacts from '@/store/modules/contacts';
import appStore from '@/store/modules/appStore';

export default Vue.extend({
    name: 'contact-add',
    data(): {moreDetails: boolean, showBtnSubmit: boolean, option_txt: string, name?: string,
    forName: string, phonePro?: string, phonePerso?: string, emailPro?: string, emailPerso?: string, linkendin?: string,
    facebook?: string, twitter?: string, website?: string} {
        return {
            moreDetails: false,
            showBtnSubmit: true,
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
      hideModal: Function,
    },
    computed: {
      ...mapState('appStore', ['sucessMessage']),
      ...mapState('appStore', ['error_msg']),
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
          const c: object = {
            name: this.name,
            forname: this.forName,
            phonePro: this.phonePro,
            phonePerso: this.phonePerso,
            emailPro: this.emailPro,
            emailPerso: this.emailPerso,
            linkendin: this.linkendin,
            facebook: this.facebook,
            twitter: this.twitter,
            website: this.website,
          };
          this.$store.dispatch('contacts/addContact', c);
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
.modal {
  display: block;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>