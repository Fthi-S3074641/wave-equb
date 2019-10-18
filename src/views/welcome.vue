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
    },
    created() {
      var nowDate = new Date();
      var SimpleDateFormat = new Date().toJSON().slice(0,10);
    },
 
}
</script>