<template>
<v-lazy>
  <v-app id="inspire">
    <v-app id="inspire">
      <Menu/>
      <v-main>
    <div class="">
        <v-content class="mt-12">
          <v-row>
            <v-spacer/>
            <v-avatar height="140px" width="140px" @click="$refs.file.click()">
              <img
                :src="photoUrl"
                alt="John"
              >
            </v-avatar>
            <v-spacer/>
          </v-row>
          <v-row justify="center" class="my-5">
            <v-spacer/>
            <div @click="dialog=true">{{userName}}</div>
            <v-spacer/>
          </v-row>
          <v-row justify="center" class="my-5">
            <v-spacer/>
            <v-btn @click="logOut">LogOut</v-btn>
            <v-spacer/>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-spacer/>
          </v-row>
          <input type="file" ref="file" style="display: none" id="file" @change="addYourPhoto">
        </v-content>
        <v-dialog v-model="dialog" persistent max-width="600px" style="display: none">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              style="display: none"
            >
              Open Dialog
            </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-form v-model="valid">
                    <v-text-field label="Legal first name*" :rules="nameRules" required v-model="newName"></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1"  text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" :disabled="!valid" text @click="addNewName">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
      </v-main>
    </v-app>
  </v-app>
</v-lazy>

</template>
<script>
import firebase from 'firebase'
import Menu from "@/components/Menu";
import cryptoRandomString from 'crypto-random-string'
export default {
  components: { Menu},
  async mounted() {
    this.user = await firebase.auth().currentUser
    this.name = this.user.displayName
  },
  middleware:'auth',
  data:() => ({
    valid:false,
    user:{},
    name:'',
    dialog:false,
    newName:'',
    nameRules:[
      v=> v.length>=6 || "Nickname should have at least 6 symbols",
      v => !!v || "Input your name"
    ]
  }),
  computed:{
    photoUrl(){
      return this.user.photoURL || "https://portal.bricksandclicks.marketing/app/views/client/lutfi-cloud/lutfi-file/images/avatar.png"
    },
    userName(){
      return this.name || 'Sashko'
    },
  },
  methods:{
    async addYourPhoto(){
      const auth = firebase.auth()
      const user = auth.currentUser
      const randomString = cryptoRandomString({length:10})
      const selectedFile = document.getElementById('file').files[0]
      const storageRef = firebase.storage().ref();
      const mountedTo = storageRef.child(`/images/${randomString}`)
      const snapshot = await mountedTo.put(selectedFile)
      console.log(snapshot)
      document.getElementById('file').value = ''
      console.log(storageRef.child(`/images/${randomString}`).getDownloadURL())
      const url = await storageRef.child(`/images/${randomString}`).getDownloadURL()
      await user.updateProfile({
        photoURL:url
      })
      user.photoURL = url
    },
    async addNewName(){
      const auth = firebase.auth()
      const user = auth.currentUser
      await user.updateProfile({
        displayName:this.newName
      })
      this.name = this.newName
      this.dialog= !this.dialog
    },
    async logOut(){
      await this.$router.push('/login')
      await firebase.auth().signOut().then(()=>{
        console.log('User logged out')
      })
      this.$store.commit('FREESTATE')

    }
  },


}
</script>
