<template>
  <v-lazy>
  <div class="login">
    <v-app-bar>
      <div class="ml-7 logo">LOGIN</div>
    </v-app-bar>
    <v-container class="contain">
      <v-row class="col-12">
      <v-form class="col-12 justify-center" v-model="valid">
            <v-row>
              <v-icon class="mx-3"> mdi-email</v-icon>
              <v-text-field  :rules="emailRules"  label="Email" v-model="email" class="mx-5 col-10"></v-text-field>
            </v-row>
            <v-row>
              <v-icon class="mx-3"> mdi-lock-question</v-icon>
              <v-text-field :rules="passwordValidation" v-model="password" label="Password" :type="value?'password':'text'" class="mx-5 col-10" :append-icon="value? 'mdi-eye' : 'mdi-eye-off'" @click:append="()=>(value = !value)"></v-text-field>
            </v-row>
          <v-row class="my-3">
            <v-spacer/>
            <v-btn class="col-8 col-md-4 col-lg-3 " @click.prevent="logIn" :disabled="!valid"> LOGIN </v-btn>
            <v-spacer/>
          </v-row>
        <v-row>
          <v-spacer/>
          <div class="mt-5">
            <nuxt-link to="/reg" class="">Do not have account? Sign up</nuxt-link>
          </div>
          <v-spacer/>
        </v-row>
        <v-row class="pass">
          <v-spacer/>
          <div class="mt-5">
            <ForgotPass/>
          </div>
          <v-spacer/>
        </v-row>

      </v-form>
      </v-row>
    </v-container>
      <v-row class="icons col-12 justify-center">
        <v-row class=" col-12 mx-5">
          <v-spacer/>
          <v-btn class="col-10 col-sm-12 col-md-3 col-lg-3" @click="logWithGoogle">
            <v-icon class="mr-2">mdi-google</v-icon>
            <div >Login with google</div>
          </v-btn>
          <v-spacer/>
        </v-row>
        <v-row class="col-12 mx-5">
          <v-spacer/>
          <v-btn class="col-10 col-sm-12 col-md-3 col-lg-3">
            <v-icon class="mr-2">mdi-facebook</v-icon>
            <div >Login with facebook</div>
          </v-btn>
          <v-spacer/>
        </v-row>
      </v-row>
  </div>
  </v-lazy>
</template>
<style scoped>
.contain{
  min-height: 70vh !important;
}
.icons{
  margin-left: 14px;
  margin-bottom: 30px;
}
.login{
  font-size: 1.2rem;
}
.pass{
  margin-top: 10px !important;
}
</style>
<script>
import firebase from 'firebase'
import ForgotPass from "@/components/ForgotPass";
 export default {
   components: {ForgotPass},
   data:()=>({
     valid:true,
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
       v=> !!v || 'Password is required',
       v => v.length>=6 || "Password should be at least 6 symbols"
     ],
   }),
   methods:{
      async logIn(){
        const auth = firebase.auth()
        await auth.signInWithEmailAndPassword(this.email,this.password)
        const user = await auth.currentUser
        console.log(user)
        await this.$store.dispatch('setUserToken',user)
        await this.$router.push('/language')
        this.email=''
        this.password=''
     },
     async logWithGoogle(){
       let userData = null
       const provider = new firebase.auth.GoogleAuthProvider();
       await firebase.auth().signInWithPopup(provider).then(function(result) {
         // var token = result.credential.accessToken;
         const user = result.user;
         userData = user
         console.log(user)
       }).catch(function(error) {
         console.log(error)
       });
       await this.$store.dispatch('setUserToken', userData)
       await this.$router.push('/')
     }
   }
 }
</script>
