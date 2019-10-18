<template>
  <v-app>
    <!-- Start of Navigation -->
    <Header :head="true"/>
    <!-- End of Navigation -->

  </v-app>
</template>

<script>
import Header from './../components/header'
export default {
    data(){
        return {

        }
    },
    components: {
      Header
    }
 
}
</script>