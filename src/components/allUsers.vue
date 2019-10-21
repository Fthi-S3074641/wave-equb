<template>
 <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">

        <v-card flat class="transparent elevation-0"  >

  <v-expansion-panels
        :accordion="true"
        :focusable="true"
    >
    <v-expansion-panel
      v-for="(item,i) in loadItems"
      :key="i"
    >
      <v-expansion-panel-header>{{item.iname}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <Display :item="item" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
  </v-col>
 </v-row>
</template>
<script>
import Display from './../components/inner/display'

export default {
    data() {
        return {

        }
    },
    components: {
        Display
    },
    computed: {
        loadItems() {
            return this.$store.state.allItems
        }
    }

}
</script>

