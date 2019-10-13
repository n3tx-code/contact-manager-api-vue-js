<template>
  <div id="home">
    <h1 class="text-center">
      Contact Manager VueJS
    </h1>
    <h3 class="text-center">
      L'outil qui vous permet d'avoir une vue complète de vos contacts
    </h3>
    <home-form></home-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeForm from '@/components/HomeForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    HomeForm,
  },
});
</script>
