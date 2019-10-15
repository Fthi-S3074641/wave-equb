<template>
    <v-app>
            <nav>
      <!-- Start of app toolbar style="background: rgba(0,0,0,0);"-->
      <v-app-bar app class="elevation-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline flex-grow-1" style="padding-top: 20px;">
           <v-container fluid>
            <v-text-field label="Wave Equb" placeholder="Search"  append-icon="mdi-magnify" color="primary darken"  clearable v-model="searchString"  >
          </v-text-field>
          </v-container>
          </v-toolbar-title>

 
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
          v-for="(it, index) in items"
          :key="index"
          :to="it.link" text exact class="elevation-0"> {{ it.text}} 
          </v-btn>
   
        </v-toolbar-items>
      </v-app-bar>
      <!-- End of app toolbar -->

      <!-- Start of mobile side menu -->
      <v-navigation-drawer app class="elevation-0"   v-model="drawer" left >
        <!-- Menu title -->
         <v-app-bar flat>
          <v-list>
            <v-subheader class="headline" :to="'/'"> Wave Equb </v-subheader>
          </v-list>
        </v-app-bar>
        <v-divider></v-divider>
        <!-- Menu Links -->
        <v-list>
          <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
             <v-list-item-title >{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- End of mobile side menu -->
    </nav>
    <v-content>
    <Calnd :finder="searchString"/>
    </v-content>
    </v-app>
</template>

<script>
import Calnd from './../components/cal'

export default {
    data() {
        return {
            drawer: false,
            item: 1,
            items: [
                { text: 'New User', icon: 'mdi-plus', link: '/newUser' },
                { text: 'Dashboard', icon: 'mdi-folder-edit-outline', link: '/dashboard' }
              ],
            searchString: '',
        }
    },
    components: {
        Calnd
    }
}
</script>