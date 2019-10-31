<template>
  <div class="contact-wrapper">
    <div class="row">
      <div class="col-12" :style="'background-color : #' + color + ';'" :class="'text-' + textColor + ' text-center contact-initials'">
          <button type="button" class="btn btn-contact-edit float-right" data-toggle="modify-modal"><h4><i class="fas fa-edit"
          @click="modifyContactBtn(contact)"></i></h4></button>
          <h2>{{ initials }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 contact-content">
        <h6><i class="fas fa-user"></i> Nom & Prénom</h6>
        <div class="row contact-row border-bottom">
          <div class="col-md-6">
            Prénom : <strong>{{ contact.forname }}</strong>
          </div>
          <div class="col-md-6">
            Nom : <strong>{{ contact.name }}</strong>
          </div>
        </div>
        <h6><i class="fas fa-phone"></i> Téléphone</h6>
        <div class="row contact-row border-bottom">
          <div class="col-md-6">
            Personnel : <strong>{{ contact.phonePerso }}</strong>
          </div>
          <div class="col-md-6">
            Pro : <strong>{{ contact.phonePro }}</strong>
          </div>
        </div>
        <h6><i class="far fa-envelope"></i> Email</h6>
        <div class="row contact-row border-bottom">
          <div class="col-md-6">
            Personnel : <strong>{{ contact.emailPerso }}</strong>
          </div>
          <div class="col-md-6">
            Professionel : <strong>{{ contact.emailPro }}</strong>
          </div>
        </div>
        <h6><i class="fas fa-globe"></i> Liens</h6>
        <div class="row contact-row border-bottom">
          <div class="col-md-6">
            <i class="fab fa-facebook"></i> : <strong><a :href="contact.facebook">{{ contact.facebook }}</a></strong>
          </div>
          <div class="col-md-6">
            <i class="fab fa-linkedin-in"></i> : <strong>{{ contact.linkendin }}</strong>
          </div>
          <div class="col-md-6">
            <i class="fab fa-twitter"></i> : <strong>{{ contact.twitter }}</strong>
          </div>
          <div class="col-md-6">
            <i class="fas fa-link"></i> : <strong>{{ contact.website }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Contact from '@/models/contact.ts'

const tinycolor = require("tinycolor2");

export default Vue.extend({
    name: 'contact-display',
    data(): {color: String, textColor: String, initials: String} {
        return {
            color : '#333',
            textColor: '',
            initials: '',
        };
    },
    props:
    {
      contact: Object as () => Contact,
      modifyContactBtn: Function,  
    },
    methods: {
      hashCode(str: string): Number { 
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
      },
      intToRGB(i: number): string {
        const c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return '00000'.substring(0, 6 - c.length) + c;
      },
      getContactFornameName(): string {
        let fornNameName = this.contact.forname;
        if (this.contact.name) {
          fornNameName += this.contact.name;
        }
        return fornNameName;
      },
      setContactInitials(): void {
        let initials = this.contact.forname.charAt(0);
        if (this.contact.name) {
          initials += this.contact.name.charAt(0);
        }
        this.initials = initials.toUpperCase();
      },
      setTextColorInitials(): void {
        let textColor = 'white';
        const bgColor = tinycolor(this.color);
        
        if (bgColor.isLight()) {
          textColor = 'dark';
        }

        this.textColor = textColor;
      },
    },
    beforeMount() {
      this.color = this.intToRGB(this.hashCode(this.getContactFornameName()));
      this.setTextColorInitials();
      this.setContactInitials();
    },
});
</script>

<style scoped lang="scss">
  .contact-forname:first-letter {
    text-transform:capitalize;
  }
  .contact-wrapper
  {
    background: #fff;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #333;
  }
  .contact-content
  {
    padding : 20px;
  }
  .contact-initials
  {
    padding-top: 4%;
    padding-bottom: 4%; 
  }
  .contact-row
  {
    padding-bottom: 20px;
    margin-bottom: 20px;
    word-wrap: break-word;
  }
  a
  {
    color : initial;
  }
  a:hover
  {
    color : #0db0d3;
  } 
</style>