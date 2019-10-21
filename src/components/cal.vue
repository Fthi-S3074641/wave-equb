<template class="transparent">
  <v-row class=" fill-height" justify="center">
    <v-col cols="12" sm="10" md="8" lg="12">
      <v-sheet height="64" class="transparent">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <div class="flex-grow-1" />
          <v-btn fab text small @click="type = 'month'" :disabled="type !== 'day'"> <v-icon small> mdi-arrow-left</v-icon> </v-btn>
          <v-menu style="padding-left: 15px;" bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-sheet height="600" transparent>
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="coreEvents"
          :event-color="getEventColor"
          :event-height="50"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
        </v-calendar>

        <v-row justify="center">
          <v-col cols="12" sm="6" >
              <Pay v-if="selectedOpen" :locate="locate" :ebent="selectedEvent" :focus="focus" :selectedElement="selectedElement" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
import Pay from './../components/inner/pay'
  export default {
    props: ['finder'],
    data() {
      return {
      today: '2019-10-15',
      focus: '2019-10-15',
      type: 'month',
      typeToLabel: {month: 'Month',week: 'Week',day: 'Day','4day': '4 Days',},
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: []
      }
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
    
      getEventColor (event) {
        if(event.paid) {return 'green darken-1'}
        else {return 'grey darken-1'}
        // return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event, date }) {
        if(this.type === 'day')
        {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
        }

      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
    components: {
      Pay
    },   
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
      getEvents() {
        var evts = []
         this.$store.state.allItems.map(function(fruit){
                evts.push(...fruit.imonth)
                return evts;
            })
        return evts
      },
      coreEvents() {
        var articles_array = this.events
         var searchString = this.finder;

            if(!searchString){
                return articles_array;
            }

            searchString = searchString.trim().toLowerCase();
        articles_array = articles_array.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            // Return an array with the filtered data.
            return articles_array
      },
      loadEvents() {
        this.events = []
        this.events.push(...this.getEvents)
      },
      getAll() {
        return this.$store.state.allItems
      },
      locate() {
        return this.getAll.map(function(e) {
              return e.iname;}).indexOf(this.selectedEvent.name);
      },
      getStatus() {
        return this.$store.state.paidSuccessful
      },  
    },
    created() {
      this.loadEvents
      this.today = new Date().toJSON().slice(0,10);
      this.focus = new Date().toJSON().slice(0,10);
    },
    mounted () {
      this.$refs.calendar.checkChange()
    }
  }
</script>