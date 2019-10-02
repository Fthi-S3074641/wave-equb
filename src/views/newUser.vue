<template>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">

        <v-card flat class="transparent elevation-0" ref="form" >

        <v-card-text>
        <v-stepper v-model="e6" vertical flat class="elevation-0" style="background: rgba(0,0,0,0);">
        <v-stepper-step :complete="e6 > 1" step="1">
        Name
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-row align="center" justify="center" >
                <v-btn text @click="$router.go(-1)">Cancel</v-btn>
                  <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="icode == null" @click="e6 = 2">Continue</v-btn>
            </v-row>
            <v-text-field v-on:keyup.enter="e6 = 2" outlined placeholder="ID of the new item" clearable  required ref="icode" v-model="icode" :rules="[() => !!icode || 'This field is required']" ></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Phone Number</v-stepper-step>

        <v-stepper-content step="2">
            <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 1">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="ibrand == null" @click="e6 = 3">Continue</v-btn>
            </v-row>
              <v-text-field v-on:keyup.enter="e6 = 3" outlined placeholder="Brand of the new item" clearable  required ref="ibrand" v-model="ibrand" :rules="[() => !!ibrand || 'This field is required']"></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Date
        </v-stepper-step>
        <v-stepper-content step="3">
              <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 2">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="itype == null" @click="e6 = 4">Continue</v-btn>
            </v-row>
              <v-text-field v-on:keyup.enter="e6 = 4" outlined placeholder="Category of the new item" clearable required ref="itype" v-model="itype" :rules="[() => !!itype || 'This field is required']"></v-text-field>
        </v-stepper-content>

        <v-stepper-step step="4">
        Money
        </v-stepper-step>
        <v-stepper-content step="4">
              <v-text-field v-on:keyup.enter="submit" min="0" outlined placeholder="Number of items to register" clearable required ref="iquantity" v-model="iquantity" type="number" :rules="[() => !!iquantity || 'Must be greater than 1']"></v-text-field>
              <v-row align="center" justify="center">
                <v-btn text @click="$router.go(-1)">Exit</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn class="primary" :disabled="!formisValid" v-if="formisValid" @click="submit" >Register</v-btn>
                <div style="margin-right: 30px;"></div>
              </v-row>
          </v-stepper-content>
        </v-stepper>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>
</template>
<script>
import etdate from 'ethiopic-date'
export default {
    data(){
        return {
            drawer: false,
            item: 1,
            searchString: 'ftu',
            e6: 1,
            errorMessages: '',
            icode: null,
            iquantity: null,
            ibrand: null,
            itype: null,
            formHasErrors: false
        }
    },
    methods: {

    },
computed: {
        getLink() {
            if(this.$store.state.fullName !== null && this.$store.state.phoneNumber !== null){
                return '/comments'
            }
            else {
                return '/getcomment'
            }
        },
        getTitle() {
            return this.$store.state.title
        },
        form () {
            return {
            icode: this.icode,
            iquantity: this.iquantity,
            ibrand: this.ibrand,
            itype: this.itype,
            }
      },
      formisValid() {
        return (
          this.icode !== null &&
          this.itype !== null &&
          this.iquantity >= 1 &&
          this.ibrand !== null
        )
      }
    }
}
</script>