<template>
  <v-app>
    <!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar style="background: rgba(0,0,0,0);"-->
      <v-app-bar app class="elevation-0">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="headline flex-grow-1" :to="'/'">
             Wave Equb <small> <v-text-field label="Wave Equb" placeholder="Search" outlined append-icon="mdi-magnify" color="primary darken" autofocus clearable v-model="searchString" :loading="true" >
          </v-text-field> </small>
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
          v-for="(it, index) in items"
          :key="index"
          :to="it.link" text exact class="elevation-0"> {{ it.text}} 
          </v-btn>
          <v-btn text exact :to="'/welcome'"> Comments </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <!-- End of app toolbar -->

      <!-- Start of mobile side menu -->
      <v-navigation-drawer :clipped="true" class="elevation-0"   v-model="drawer" left >
        <!-- Menu title -->
 
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
        <v-list-item :to="'/welcome'">
          <v-list-item-icon>
            <v-icon color="red" v-text="'mdi-heart'"> </v-icon>
              <v-list-item-content>
                <v-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment </v-list-item-title>
              </v-list-item-content>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- End of mobile side menu -->
    </nav>
    <!-- End of Navigation -->

    <v-content style="padding: 0px;">
            <router-view> </router-view>    
    </v-content>
  </v-app>
</template>

<script>
import etdate from 'ethiopic-date'
export default {
    data(){
        return {
            drawer: false,
            item: 1,
            items: [
                { text: 'New User', icon: 'mdi-plus', link: '/newUser' },
                { text: 'Dashboard', icon: 'mdi-folder-edit-outline', link: '/dashboard' },
                { text: 'Liqah', icon: 'mdi-collapse-all', link: '/liqah' }
            ],
            searchString: '',
            e6: 1,
            errorMessages: '',
            icode: null,
            iquantity: null,
            ibrand: null,
            itype: null,
            formHasErrors: false
        }
    }
 
}
</script>