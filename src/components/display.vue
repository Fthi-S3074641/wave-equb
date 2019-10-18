<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-switch v-model="edit" class="ma-4" label="Edit"></v-switch> 
          <v-text-field v-model="selectee.iphone"  label="Phone number" :disabled="!edit"></v-text-field>
          <v-text-field v-model="selectee.imoney"  label="Money" :disabled="!edit"></v-text-field>
            <v-text-field v-model="selectee.istart" label="Starting date" :disabled="!edit"></v-text-field>
          <v-text-field v-model="selectee.iend" label="Ending date" :disabled="!edit"></v-text-field>
        </v-col>


        <v-col cols="12" sm="8">
             <h3 align="center">   Payment Events  </h3>
            <v-row dense v-for="(event, index) in getMonths" :key="index">
                <v-avatar align="center" justify="center" :color='getColor(index)' size="36" style="margin-top: 15px;" >
                    <span class="white--text headline">{{index +1}}</span>
                </v-avatar>
                <v-col dense cols="12" sm="4" md="5">
                    <v-text-field dense v-model="event.start" outlined :disabled="!edit"></v-text-field>
                </v-col>
                <v-col dense cols="12" sm="4" md="5">
                <v-text-field dense v-model="event.end" outlined :disabled="!edit"></v-text-field>
                </v-col>
                <v-btn fab icon align="center" justify="center"  @click="editEvent(index)">
                    <v-icon class="headline">mdi-pencil</v-icon>
                </v-btn>

          </v-row>
        </v-col>
      </v-row>
      <v-row>
      <div class="flex-grow-1" />
      <v-btn class="primary" :disabled="!edit"> Update Data </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
          selectee: null,
          edit: false
      }
    },
    created() {
        this.selectee = this.item
    },
    computed: {
        getMonths() {
            return this.item.imonth
        }
    },
    methods: {
        getColor(qun) {
            return this.selectee.imonth[qun].color
        },
        editEvent() {

        }
    },
  }
</script>