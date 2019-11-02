<template>
  <div class="contact-delete float-right">
    <button type="button" class="btn btn-danger" @click=displayModal()>
      <i class="fas fa-trash-alt"></i>
    </button>

    <div class="modal" :style="'display:' + display">
      <div class="modal-content bg-danger text-white">
        <div class="row text-center">
          <div class="col-12">
              <button type="button" class="btn btn-info close float-right text-white" @click=closeModal()>&times;</button>
          </div>
        </div>
        <h4 class="text-center">Voulez-vous supprimer {{ contact.forname }} ?</h4>
        <div class="row btn-delete-choise">
          <div class="col-6 col-md3 offset-md3">
              <button type="button" class="btn btn-light btn-block" @click=deleteContact()>Oui</button>
          </div>
          <div class="col-md-3 col-6">
            <button type="button" class="btn btn-secondary btn-block" @click=closeModal()>Non</button>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Contact from '@/models/contact.ts';
import axios from 'axios';

export default Vue.extend({
    name: 'contact-delete',
    data(): {display: string, error_msg: string} {
        return {
            display: 'none',
            error_msg: '',
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
        displayModal(): void
        {
            this.display = 'block';
        },
        closeModal(): void {
            this.display = 'none';
        },
        deleteContact(): void
        {
          const formData = new FormData();

          formData.append('ID', this.$props.contact.ID);
          formData.append('ID_owner', this.$props.contact.ID_owner);
          formData.append('token', this.$props.token);

          axios.post('http://contact-manager/contact/delete/', formData)
            .then((response) => {
              if (response.data.hasOwnProperty('error')) {
                this.error_msg = response.data['error'];
              }
              else {
                if(response.data == "Contact deleted")
                {
                    this.updateContacts();
                    this.closeModal();
                    this.setSuccessMsg(this.contact.forname + ' a été supprimé');
                }
                else
                {
                  console.log(response.data)
                  this.error_msg = 'Erreur lors de la suppression du contact';
                }
              }
            })
            .catch((error) => {
              this.error_msg = 'Erreur de réseau';
            });
        }
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
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}


.modal-content {
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
.btn-delete-choise
{
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
