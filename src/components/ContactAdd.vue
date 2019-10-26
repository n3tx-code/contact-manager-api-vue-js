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
              <input type="text" class="form-control" placeholder="Prénom" required v-model="name">
            </div>

            <label>Nom :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Nom" v-model="forname">
            </div>

            <label>Téléphone professionnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-phone"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Professionnel" v-model="phonePro">
            </div>

            <label>Téléphone personnel :</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Personnel" v-model="phonePerso">
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
              <div class="form-group">
                <label for="exampleFormControlFile1">Photo du contact :</label>
                <input type="file" class="form-control-file" id="contact-img">
              </div>
          </div>
          <div class="modal-footer">
            <div class="row col-12">
              <div class="col-6">
                <button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Fermer</button>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-contact-manager">Ajouter <i class="fas fa-plus-circle"></i></button>
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
    data(): {moreDetails: boolean, option_txt: string, name?: string, forname: string, phonePro?: number, 
    phonePerso?: number, emailPro?: string, emailPerso?: string, linkendin?: string, facebook?: string, 
    twitter?: string, website?: string} {
        return {
            moreDetails: false,
            option_txt: 'Plus d\'options <i class="fas fa-caret-down"></i>',
            name: undefined,
            forname: '',
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
    methods: {
        toggleOptions(): void {
          if(this.moreDetails)
          {
            this.option_txt = 'Plus d\'options <i class="fas fa-caret-down"></i>';
          }
          else
          {
            this.option_txt = 'Moins d\'options <i class="fas fa-caret-up"></i>';
          }
          this.moreDetails = !this.moreDetails;
        },
        submitContactAddForm(): void {
          const imgContactInput = document.getElementById('contact-img');
          const formData = new FormData();
          // todo check every input is not undefined
          formData.append('forname', this.forname);
          formData.append('phonePro', this.phonePro);
          formData.append('phonePerso', this.phonePerso);
          formData.append('emailPro', this.emailPro);
          formData.append('emailPerso', this.emailPerso);
          formData.append('linkendin', this.linkendin);
          formData.append('facebook', this.facebook);
          formData.append('twitter', this.twitter);
          formData.append('website', this.website);
          formData.append('imgContact', imgContactInput.files[0]);
            
          

          axios.post('http://contact-manager/contact/add/', formData)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              // this.error_msg = 'Erreur de réseau';
              console.log(error);
            });
        }
    },
});
</script>

<style scoped lang="scss">
    
</style>
