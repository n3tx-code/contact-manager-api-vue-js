<template>
  <div id="home">
    <h1 class="text-center">
      Contact Manager
    </h1>
    <h4 class="text-center">
      L'outil qui vous permet d'avoir une vue complète de vos contacts
    </h4>
    <home-form></home-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeForm from '@/components/HomeForm.vue';

export default Vue.extend({
  name: 'home',
  components: {
    HomeForm,
  },
});
</script>
