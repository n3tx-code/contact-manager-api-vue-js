<template>
  <div class="contact-wrapper" v-if="show">
    <div class="row">
      <div class="col-12" :style="'background-color : #' + color + ';'" :class="'text-' + textColor + ' text-center contact-initials'">
          <contact-modify :contact="contact"></contact-modify>
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
            <i class="fab fa-linkedin-in"></i> : <strong><a :href="contact.linkendin"> {{ contact.linkendin }}</a>
            </strong>
          </div>
          <div class="col-md-6">
            <i class="fab fa-twitter"></i> : <strong><a :href="contact.twitter">{{ contact.twitter }}</a></strong>
          </div>
          <div class="col-md-6">
            <i class="fas fa-link"></i> : <strong><a :href="contact.website"> {{contact.website }}</a></strong>
          </div>
        </div>
      </div>
      <div class="col-12 contact-footer">
        <contact-delete :contactId="contact.ID" :contactIdOwner="contact.ID_owner" :contactForname="contact.forname"></contact-delete>
        <small class="contact-last-modification">Dernière modification : {{ getLastModificationDate() }}</small>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Contact from '@/models/contact.ts';
import ContactModify from '@/components/ContactModify.vue';
import ContactDelete from '@/components/ContactDelete.vue';
import tinycolor from 'tinycolor2';
import { mapState } from 'vuex';
import contacts from '@/store/modules/contacts';
import appStore from '@/store/modules/appStore';

export default Vue.extend({
    name: 'contact-display',
    components: {
        ContactModify,
        ContactDelete,
    },
    data(): {color: string, textColor: string, initials: string, show: boolean} {
        return {
            color : '#333',
            textColor: '',
            initials: '',
            show: true,
        };
    },
    props:
    {
      contact: Object as () => Contact,
      rechercheString: String,
    },
    methods: {
      hashCode(str: string): number {
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
        let forNameName = this.contact.forname;
        if (this.contact.name) {
          forNameName += this.contact.name;
        }
        return forNameName!;
      },
      setContactInitials(): void {
        let initials = this.contact.forname!.charAt(0);
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
      getLastModificationDate(): string {
        const lastModification = new Date(this.contact.lastModification);
        return lastModification.toLocaleDateString();
      },
      isInReSearch(): void {
        if (this.$props.rechercheString.trim().length > 0) {
          if (this.$props.contact.forname.toUpperCase().includes(this.$props.rechercheString.toUpperCase())) {
            this.show = true;
          } else {
            this.show = false;
          }
        }
      },
    },
    beforeMount() {
      this.color = this.intToRGB(this.hashCode(this.getContactFornameName()));
      this.setTextColorInitials();
      this.setContactInitials();
      this.isInReSearch();
    },
});
</script>

<style scoped lang="scss">
.contact-forname:first-letter {
  text-transform: capitalize;
}

.contact-wrapper {
  background: #fff;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #333;
}

.contact-content {
  padding: 20px;
}

.contact-initials {
  padding-top: 4%;
  padding-bottom: 4%;
}

.contact-row {
  padding-bottom: 20px;
  margin-bottom: 20px;
  word-wrap: break-word;
}

a {
  color: initial;
}

a:hover {
  color: #0db0d3;
}

.contact-last-modification {
  font-style: italic;
}

.contact-footer {
  margin-top: -20px;
  margin-bottom: 10px;
}
</style>
