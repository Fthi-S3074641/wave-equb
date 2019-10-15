<template>
<v-app>
    <Header :head="true"/>
    <v-container>
     <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
      <v-sheet height="500">
        <v-calendar
          :now="today"
          :value="today"
          color="primary"
          @click:date="viewDay"
        >
          <template v-slot:day="{ present, past, date }">
            <v-row
              class="fill-height"
            >
              <template v-if="past && tracked[date]">
                <v-sheet
                  v-for="(percent, i) in tracked[date]"
                  :key="i"
                  :title="category[i]"
                  :color="colors[i]"
                  :width="`${percent}%`"
                  height="100%"
                  tile
                ></v-sheet>
              </template>
            </v-row>
          </template>

          <v-menu :close-on-content-click="false" v-slot:activator="{selectedElement}" offset-y >
            <v-card color="grey lighten-4" min-width="350px" flat >
            <v-toolbar :color="primary" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
                <v-toolbar-title v-html="'Whatever'"></v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            <v-card-text>
              <span v-html="'Here we go again'"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false" > Cancel  </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        </v-calendar>

            

      </v-sheet>
        </v-col>
    </v-row>
    </v-container>
</v-app>
</template>

<script>
import Header from './../components/header'

export default {
    data: () => ({
      today: '2019-01-10',
      tracked: {
        '2019-01-09': [23, 45, 10],
        '2019-01-08': [10],
        '2019-01-07': [0, 78, 5],
        '2019-01-06': [0, 0, 50],
        '2019-01-05': [0, 10, 23],
        '2019-01-04': [2, 90],
        '2019-01-03': [10, 32],
        '2019-01-02': [80, 10, 10],
        '2019-01-01': [20, 25, 10],
      },
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['Development', 'Meetings', 'Slacking'],      
      selectedElement: null,
      selectedOpen: false,
    }),
    components: {
        Header
    },
    methods: {
        viewDay({date}) {
console.log(date)
            const open = () => {
          this.selectedElement = date
          setTimeout(() => this.selectedOpen = true, 10)
        }
                if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        }
    }
  }
</script>