<template>
  <div class="text-center" >
    <v-menu v-model="dialog" :close-on-content-click="false" offset-y >
      <template v-slot:activator="{ on }">
        <v-btn style="margin-top: 15px;" icon color="red lighten-1" v-on="on"><v-icon large>mdi-delete</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title class="headline red lighten-1" primary-title>Deleting:- "{{dcode}}"</v-card-title>
        <v-card-text>
          It will be deleted from the database forever.<br> Are you sure you want to delete user:- "<span class="font-weight-bold">{{dcode}}</span>"???
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" text @click="cancel()"> Cancel</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="red lighten-1" @click="yesRemove">Yes Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
  props: ['index'],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      cancel() {
        this.dialog = false
      },
      yesRemove() {
      this.$store.dispatch('removeItem', this.index).then(()=>{
        this.dialog = false
        window.localStorage.setItem('maebel', JSON.stringify(this.$store.state.allItems))
      });

      }
    },
    computed: {
        getAll() {
            return this.$store.state.allItems
        },
        dcode() {
            return this.getAll[this.index].iname
        }
    },
  }
</script>
