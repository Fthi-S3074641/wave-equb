<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">          
          <v-text-field v-model="selectee.iname"  label="Name" :disabled="!edit"></v-text-field>
          <v-text-field v-model="selectee.iphone"  label="Phone number" :disabled="!edit"></v-text-field>
          <v-text-field v-model="selectee.imoney"  label="Money" :disabled="!edit"></v-text-field>
        <div class="row">
          <v-switch v-model="edit" class="ma-4" label="Edit"></v-switch> 
          <v-spacer />
          
          <Delete :index="oldIndex" />
          <v-btn  style="margin-top: 15px;" class="primary" :disabled="!edit" @click="updateDetails"> Update Data </v-btn>
        </div>
          <p v-if="showError" class="red--text"> This item is not available in store </p> 
            <p v-if="showSuccess" class="green--text"> Update successful! </p> 
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="selectee.istart" label="Starting date" :disabled="true"></v-text-field>
          <v-text-field v-model="selectee.iend" label="Ending date" :disabled="true"></v-text-field>
                  <div class="row">
                  <v-spacer />
          <v-btn  style="margin-top: 15px;" class="green white--text" @click="$router.push('/dashboard')"> View Calander </v-btn>
        </div>
          </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Delete from './delete'
  export default {
    props: ['item'],
    data () {
      return {
          selectee: null,
          edit: false,
          oldName: null,
          oldIndex: null,
          showError: false,
          showSuccess: false
      }
    },
    components: {
      Delete
    },
    methods: {
        getColor(qun) {
            return this.selectee.imonth[qun].color
        },
        updateDetails() {
          var months = this.item.imonth
          for (var i = 0; i < months.length ; i++) {
            months[i].name = this.selectee.iname
          }
          console.log(this.oldIndex)
          if(this.oldIndex !== -1) {
            this.$store.dispatch('updateDetails', {index: this.oldIndex, iname: this.selectee.iname, iphone: this.selectee.iphone, imoney: this.selectee.imoney}).then(() => {
              console.log(this.selectee)
              this.edit = false
              window.localStorage.setItem('maebel', JSON.stringify(this.getAll))
              this.showSuccess = true
              this.$store.dispatch('updateAccount', {index: this.oldIndex, imonth: months})
            })
          }
          else {
            this.showError = true
          }
        }
    },
    computed: {
      getAll() {
        return this.$store.state.allItems
      },
      getIndex() {
        console.log(this.getAll)
        console.log(this.oldName)
        return this.getAll.map(function(e) {
          return e.icode;}).indexOf(this.oldName);
      },
              getMonths() {
            return this.item.imonth
        }
    },    
    created() {
        this.selectee = this.item
        this.oldName = this.item.iname
        this.oldIndex = this.getAll.map(function(e) {
          return e}).indexOf(this.item)
    }
  }
</script>