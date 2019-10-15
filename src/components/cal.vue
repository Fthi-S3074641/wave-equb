<template >
  <v-row class="fill-height" justify="center">
    <v-col cols="12" sm="10" md="8" lg="12">
      <v-sheet height="64" class="transparent elevation-0">
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

        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-y >
          <v-card color="grey lighten-4" min-width="350px" flat >
            <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            <v-card-text>
              <v-btn v-if="!progress" color="green" @click="progress = true"> Paid</v-btn>
                <v-scroll-x-transition>
                  <v-icon
                    v-if="progress"
                    color="success"
                    large
                  >
                    mdi-check
                  </v-icon>
                </v-scroll-x-transition>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false" > Cancel  </v-btn>
              <div class="flex-grow-1"> </div>
              <v-btn color="primary" :disabled="!progress" @click="updateAccount(selectedEvent,focus)"> Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
  export default {
    props: ['finder'],
    data: () => ({
      today: '2019-10-15',
      focus: '2019-10-15',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [ {
              name: 'Tewhasom 2019-10-01',
              details: 'This is a sample event of unpaid deal',
              start: '2019-10-01',
              end: '2019-10-30',
              color: 'grey darken-2',
            }],
            progress: false
    }),
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
        return this.$store.state.allItems.map(fruit => fruit.imonth)
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
      getIndex(){
        return this.events.map(function(e) {
              return e.name;}).indexOf(this.selectedEvent.name);
      }
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      updateAccount(ev, dt)  {
        var newEnd = this.getPrevious
        var newStart = this.getNext
        const eventPast = {
              name: ev.name + ' '+ev.start,
              details: ev.details,
              start: ev.start,
              end: `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newEnd}`,
              color: ev.color,
            }
        const kstart = `${this.focus.toString().substring(0,4)}-${this.focus.toString().substring(5,7)}-${newStart}`
        const eventFuture = {
              name: ev.name+ ' '+kstart,
              details: ev.details,
              start: kstart,
              end: ev.end,
              color: ev.color,
            }
        const newEvent = {
              name: ev.name+ ' '+dt,
              details: 'Paid',
              start: dt,
              end: dt,
              color: 'green',
        }
        const ind = this.getIndex
        this.events.splice(ind, 1)
        this.events.push(eventPast)
        this.events.push(eventFuture)
        this.events.push(newEvent)
        this.selectedOpen = false
        this.progress = false
      },
      getEventColor (event) {
        return event.color
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
    created() {
      this.events.push(...this.getEvents)
    }
  }
</script>