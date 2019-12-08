<template>
  <div class="contact-delete float-right">
    <button type="button" class="btn btn-danger btn-delete" @click=displayModal()>
      <i class="fas fa-trash-alt"></i>
    </button>

    <div class="modal" :style="'display:' + display">
      <div class="modal-content bg-danger text-white">
        <div class="row text-center">
          <div class="col-12">
              <button type="button" class="btn btn-info close float-right text-white" @click=closeModal()>&times;</button>
          </div>
        </div>
        <h4 class="text-center">Voulez-vous supprimer {{ contactForname }} ?</h4>
        <div class="row btn-delete-choise">
          <div class="col-6 col-md-3 offset-md-3">
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
import appStore from '@/store/modules/appStore';
import contacts from '@/store/modules/contacts';

export default Vue.extend({
    name: 'contact-delete',
    data(): {display: string } {
        return {
            display: 'none',
        };
    },
    props:
    {
      contactId: Number,
      contactIdOwner: Number,
      contactForname: String,
    },
    methods: {
        displayModal(): void {
            this.display = 'block';
        },
        closeModal(): void {
            this.display = 'none';
        },
        deleteContact(): void {
          this.$store.dispatch('contacts/deleteContact', { contactId: this.$props.contactId,
          contactIdOwner: this.$props.contactIdOwner, contactForname: this.$props.contactForname });
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

.btn-delete-choise {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
