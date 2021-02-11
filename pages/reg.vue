<template>
  <v-lazy>
    <div class="login">
      <v-app-bar class="transparent">
        <v-btn icon to="/login" nuxt>
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        <div class="logo">REGISTRATION </div>
      </v-app-bar>
      <v-container class="contain">
        <v-row class="col-12">
          <v-form class="col-12 justify-center" v-model="valid">
            <v-row>
              <v-icon class="mx-3"> mdi-account</v-icon>
              <v-text-field :rules="nameRules" label="Nickname" v-model="name" class="mx-5 col-10"></v-text-field>
            </v-row>
            <v-row>
              <v-icon class="mx-3"> mdi-email</v-icon>
              <v-text-field :rules="emailRules"  label="Email" v-model="email" class="mx-5 col-10"></v-text-field>
            </v-row>
            <v-row>
              <v-icon class="mx-3"> mdi-lock-question</v-icon>
              <v-text-field :rules="passwordValidation" label="Password" v-model="password" :type="value?'password':'text'" class="mx-5 col-10" :append-icon="value? 'mdi-eye' : 'mdi-eye-off'" @click:append="()=>(value = !value)"></v-text-field>
            </v-row>
            <v-row>
              <v-spacer/>
              <v-btn class="col-8 col-md-4 col-lg-3" @click="reg" :disabled="!valid"> SIGN UP </v-btn>
              <v-spacer/>
            </v-row>
          </v-form>
        </v-row>
      </v-container>
    </div>
  </v-lazy>
</template>
<style scoped>
.contain{
  min-height: 70vh !important;
}
.login{
  font-size: 1.2rem;
}
</style>
<script>
import firebase from 'firebase'

export default {
  data:()=>({
    valid:true,
    name:'',
    email:'',
    password:'',
    value:true,
    hasEmailError:false,
    emailRules:[
      v=> !!v || 'Email is required',
      v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) ||  'Invalid e-mail.';
      }
    ],
    passwordValidation:[
      v => v.length>=6 || "Password should be at least 6 symbols"
    ],
    nameRules:[
      v=> v.length>=6 || "Nickname should have at least 6 symbols"
    ]
  }),
  methods:{
    async reg(){
      const database = firebase.database()
      const auth = firebase.auth()
      await auth.createUserWithEmailAndPassword(this.email, this.password)
      const user = auth.currentUser
      await user.updateProfile({
        displayName: this.name
      })
      await database.ref(`users/${user.uid}`).set({
        email:this.email,
        role:'user'
      })
      await this.$store.dispatch('setUserToken',user)
      await this.$router.push('/language')
      this.email = ''
      this.password=''
      this.name=''
    }
  }
}
</script>
