<template>
<v-app>
<Header :head="true" />

      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">

        <v-card flat class="transparent elevation-0" ref="form" >

        <v-card-text>
        <v-stepper v-model="e6" vertical flat class="elevation-0" style="background: rgba(0,0,0,0);">
        <v-stepper-step :complete="e6 > 1" step="1">Name</v-stepper-step>
        <v-stepper-content step="1">
            <v-row align="center" justify="center" >
                <v-btn text @click="$router.go(-1)">Cancel</v-btn>
                  <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="iname == null" @click="e6 = 2">Continue</v-btn>
            </v-row>
            <v-text-field v-on:keyup.enter="e6 = 2" outlined placeholder="ID of the new item" clearable  required ref="iname" v-model="iname" :rules="[() => !!iname || 'This field is required']" ></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Phone</v-stepper-step>
        <v-stepper-content step="2">
            <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 1">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="iphone == null" @click="e6 = 3">Continue</v-btn>
            </v-row>
              <v-text-field v-on:keyup.enter="e6 = 3" outlined placeholder="Brand of the new item" clearable  required ref="iphone" v-model="iphone" type="number" :rules="[() => !!iphone || 'This field is required']"></v-text-field>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Money</v-stepper-step>
        <v-stepper-content step="3">
              <v-row align="center" justify="center" >
                <v-btn text @click="e6 = 2">Go back</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" :disabled="imoney == null" @click="e6 = 4">Continue</v-btn>
            </v-row>

              <v-text-field v-on:keyup.enter="e6 = 4" min="0" outlined placeholder="amount" clearable required ref="imoney" v-model="imoney" type="number" :rules="[() => !!imoney || 'Must be a number']"></v-text-field>
              
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 4" step="4">Start Date</v-stepper-step>
        <v-stepper-content step="4">
          <v-row> 
            <v-btn text @click="e6 = 3">Go back</v-btn>
          </v-row>
          <v-row>
            <v-col>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="istart" transition="scale-transition" offset-y min-width="290px"      >
              <template v-slot:activator="{ on }">
                <v-text-field outlined v-model="istart" label="Start date" prepend-icon="mdi-event" readonly v-on="on" clearable required ref="istart" :rules="[() => !!istart || 'This field is required']"></v-text-field>
              </template>
              <v-date-picker v-model="istart" no-title scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(istart)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            </v-col>
            <v-col>
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="iend" transition="scale-transition" offset-y min-width="290px"      >
              <template v-slot:activator="{ on }">
                <v-text-field outlined v-model="iend" label="End date" prepend-icon="mdi-event" readonly v-on="on" clearable required ref="iend" :rules="[() => !!iend || 'This field is required']"></v-text-field>
              </template>
              <v-date-picker v-model="iend" no-title scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(iend)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            </v-col>
            </v-row>
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
      </v-app>
</template>
<script>
import etdate from 'ethiopic-date'
import Header from './../components/header'

export default {
    data(){
        return {
            menu: false,
            menu2: false,
            e6: 4,
            iname: 'null',
            iphone: 899,
            imoney: 66,
            istart: null,
            iend: null,
            formHasErrors: false
        }
    },
    methods: {
      submit() {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)

        })
        
            const unew = {
            iname: this.iname,
            iphone: parseInt(this.iphone),
            imoney: parseInt(this.imoney),
            istart: this.istart,
            imonth: {
              name: this.iname,
              details: `Not paid: ${parseInt(this.imoney)}`,
              start: this.istart,
              end: this.iend,
              color: 'grey darken-1',
            }
          }
          console.log(unew)
          this.$store.dispatch('addItem', unew).then(()=> {
                this.$router.push('/dashboard')
              });        
      }
    },
    components: {
      Header
    },
computed: {
  getEnd() {
    console.log(this.getDate)
    const nEnd = parseInt(this.getDate) + parseInt(29)
    console.log(nEnd)
    return `${this.getYear}-${this.getMonth}-${nEnd}`
  },
  getYear() {
    const year = this.istart.toString()
    return year.substring(0,4)
  },
  getMonth() {
    const month = this.istart.toString()
    return month.substring(5,7)

  },
  getDate() {
    const date = this.istart.toString()
    return date.substring(8,10)
  },

  form () {
            return {
            iname: this.iname,
            imoney: this.imoney,
            iphone: this.iphone,
            istart: this.istart,
            iend: this.iend,
            }
      },
      formisValid() {
        return (
          this.iname !== null &&
          this.istart !== null &&
          this.imoney >= 1 &&
          this.iphone !== null &&
          this.iend !== null
        )
      }
    }
}
</script>