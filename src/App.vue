<template>
  <v-app>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
      this.$store.dispatch('fromFile', JSON.parse(window.localStorage.getItem('maebel')))
  }

};
</script>
