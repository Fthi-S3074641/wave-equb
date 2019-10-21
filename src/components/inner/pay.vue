<template>
        <v-row justify="center">
          <v-col cols="12" sm="6">
    <div class="text-center">

            <v-menu v-model="openMenu" :close-on-content-click="false" :activator="selectedElement" offset-y offset-x >
         <v-card color="grey lighten-4" flat >
            <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title class="white--text"> {{user.iname}}</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">          
                        <v-text-field label="Phone number" :disabled="true" :value="user.iphone"> </v-text-field>
                        <v-text-field label="Name" :disabled="true" :value="user.imoney"> </v-text-field>
                        <div class="row">
                        <v-btn :disabled="paidSuccessful" color="green" @click="turnOnPaying()"> Paid</v-btn>
                        <v-spacer />
                        <v-scroll-x-transition>
                        <v-icon v-if="paidSuccessful" color="success" large>     mdi-check            </v-icon>
                        </v-scroll-x-transition>
                        </div>
                        <p v-if="showError" class="red--text"> It didn't work properly. Try again Later? </p> 
                        <p v-if="showSuccess" class="green--text"> Payment saved! </p> 
                    </v-col>
                    <!-- <v-col cols="12" sm="6">
                        <span v-html="getUser"></span>
                    </v-col> -->
                </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="openMenu = false" > Cancel  </v-btn>
              <div class="flex-grow-1"> </div>
              <v-btn color="primary" :disabled="!paidSuccessful" @click="updateAccount()"> Update</v-btn>
            </v-card-actions>
          </v-card>
          </v-menu>
    </div>
              </v-col>
        </v-row>
</template>

<script>
export default {
    props: ['locate', 'ebent', 'focus', 'selectedElement'],
    data() {
        return {
            selectedEvent: {},
            paidSuccessful: false,
            showError: false,
            showSuccess: false,
            openMenu: true,
            index: null,
            user: {}
        }
    },
    methods: {
      turnOnPaying() {
        this.paidSuccessful = true
        this.index = this.locateUser
        this.user = this.getUser
      },
      updateAccount()  {
          var timonth = []
          timonth.push(...this.allEvents)
          timonth.splice(this.getEventIndex, 1)
          var newEnd = this.getPrevious
          var newStart = this.getNext

        if(this.focus !== this.ebent.start && this.focus !== this.ebent.end){
          var fstart = `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newStart}`
          var pend = `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newEnd}`

          const eventPast = { name: this.user.iname, start: this.ebent.start, end: pend, paid: false}
          const eventFuture = {name: this.user.iname, start: fstart, end: this.ebent.end, paid: false}
          const newEvent = { name: this.user.iname, start: this.focus, end: this.focus,  paid: true}

          timonth.push(eventPast)
          timonth.push(eventFuture)
          timonth.push(newEvent)

        }
        else {
          console.log(this.allEvents)
            console.log(this.getEventIndex)
            if(this.focus === this.ebent.start){
              if(this.ebent.start === this.ebent.end) {
                const startEvent = {name: this.user.iname, start: this.ebent.start, end: this.ebent.start, paid: true}
                timonth.push(startEvent)
              }
              else {
                const startEvent = {name: this.user.iname, start: this.ebent.start, end: this.ebent.start, paid: true}
                timonth.push(startEvent)
                var nextStart = `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newStart}`
                const eventFuture = {name: this.user.iname, start: nextStart, end: this.ebent.end, paid: false}
                timonth.push(eventFuture)
              }
              
            }
            if(this.focus === this.ebent.end) {
              if(this.ebent.start === this.ebent.end) {
              const endEvent = {name: this.user.iname, start: this.ebent.end, end: this.ebent.end, paid: true}
              timonth.push(endEvent)
              }
              else {
              const endEvent = {name: this.user.iname, start: this.ebent.end, end: this.ebent.end, paid: true}
              timonth.push(endEvent)
               var pastEnd = `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newEnd}`
               const pastEvent = { name: this.user.iname, start: this.ebent.start, end: pastEnd, paid: false}
               timonth.push(pastEvent)
              }

            }
        }
        this.$store.dispatch('updateAccount', {index: this.locate, imonth: timonth}).then(() => {
              this.showSuccess = true
              this.openMenu = false
              this.paidSuccessful = false
              window.localStorage.setItem('maebel', JSON.stringify(this.getAll))
              this.$router.push('/allUsers')
          })
      }
    },
    computed: {
        getAll() {
            return this.$store.state.allItems
        },
        getUser() {
          if(this.index !== -1) {
            return this.getAll[this.locate]
          }
        },
        getPrevious() {
          var date = this.focus.toString()
          date = parseInt(date.substring(8,10)) - parseInt(1)
          return date
        },
        getNext() {
          var date = this.focus.toString()
          date = parseInt(date.substring(8,10)) + parseInt(1)
          return date
        },
        locateUser() {
          return this.getAll.map(function(e) {
              return e.iname;}).indexOf(this.ebent.name);
        },
        allEvents() {
          return this.getUser.imonth
        },
        getEventIndex() {
          return this.allEvents.map(function(e) {
            return e.start;}).indexOf(this.ebent.start)
        }
    },
    created() {
        this.selectedEvent = this.ebent
        this.openMenu = true
        this.index = this.locateUser
        this.user = this.getUser
    }
}
</script>