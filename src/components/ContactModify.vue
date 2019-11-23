<template>
<div class="contact-modify">
    <button type="button" class="btn btn-contact-edit float-right text-white" @click=displayModal()>
        <h4>
            <i class="fas fa-edit"></i>
        </h4>
    </button>
    <div class="modal" :style="'display:' + display">
        <form class="modal-content text-left text-dark" @submit.prevent="submitContactModifyForm()" enctype="multipart/form-data">
            <div class="row text-center">
                <div class="col-12">
                    <button type="button" class="btn btn-info close float-right" @click=closeModal()>&times;</button>
                    <h4>{{ contact.forname }}</h4>
                </div>
            </div>
            <label>Prénom* :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Prénom" required v-model="forname">              
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
                <input type="text" class="form-control" placeholder="Twitter" v-model="contact.twitter">
            </div>

            <label>Url :</label>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-link"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Site web" v-model="website">
            </div>
              
            <div id="error-msg" class="bg-danger text-white text-center animated bounceIn" v-if="error_msg">
              {{ error_msg }}
            </div>
            <button v-if="showBtnSubmit" type="submit" class="btn btn-contact-manager btn-block">Valider les modifications</button>
        </form>
    </div>
</div>
    
</template>

<script lang="ts">
import Vue from 'vue';
import Contact from '@/models/contact.ts';
import axios from 'axios';


export default Vue.extend({
    name: 'contact-modify',
    data(): {display: string, error_msg: string, showBtnSubmit: boolean, name?: string, forname: string,
     phonePro?: string, phonePerso?: string, emailPro?: string, emailPerso?: string, linkendin?: string,
     facebook?: string, twitter?: string, website?: string} {
        return {
            display: 'none',
            error_msg: '',
            name: this.contact.name,
            showBtnSubmit: true,
            forname: this.$props.contact.forname,
            phonePro: this.contact.phonePro,
            phonePerso: this.contact.phonePerso,
            emailPro: this.contact.emailPro,
            emailPerso: this.contact.emailPro,
            linkendin: this.contact.linkendin,
            facebook: this.contact.facebook,
            twitter: this.contact.twitter,
            website: this.contact.website,
        };
    },
    props:
    {
      token: String,
      contact: Object as () => Contact,
      setSuccessMsg: Function,
      updateContacts: Function,
    },
    methods: {
        displayModal(): void {
            this.display = 'block';
        },
        closeModal(): void {
            this.display = 'none';
        },
        submitContactModifyForm(): void {
          const imgContactInput = document.getElementById('contact-img');
          const formData = new FormData();

          formData.append('ID', this.$props.contact.ID);
          formData.append('ID_owner', this.$props.contact.ID_owner);
          formData.append('token', this.$props.token);
          formData.append('forName', this.forname);
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

          axios.post('http://contact-manager/contact/update/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                // to avoid warning on run serve
                const error = 'error';
                this.error_msg = response.data[error];
              } else {
                if (response.data === 'Contact modified') {
                    this.updateContacts();
                    this.closeModal();
                    this.setSuccessMsg(this.forname + ' a été modifié');
                } else {
                  this.error_msg = 'Erreur lors de la modification du contact';
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

.btn-contact-edit:hover {
  text-shadow: 0px 0px 10px #333;
}
</style>
