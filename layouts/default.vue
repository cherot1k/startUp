<template>
  <div data-app>
    <div class="" v-if="this.$store.getters.userToken">
<!--      <v-app id="inspire">-->
<!--        <v-app id="inspire">-->
<!--          <Menu/>-->
          <v-main>
            <v-container class="fill-height" >
              <nuxt/>
            </v-container>
          </v-main>
<!--        </v-app>-->
<!--      </v-app>-->
    </div>
    <Nuxt v-else/>
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
<script>
import {init} from "~/firebase/fire_init"
import firebase from "firebase"
export default {
  beforeCreate() {
    if (!firebase.apps.length) {
      init()
    }
  },
  async mounted(){
    let user = 'c++'
    await setTimeout(()=>{
      user = firebase.auth().currentUser
      console.log(user)
    },0.1)
    await setTimeout(()=>{
      if(!user){
         this.$router.push('/login')
      }
    },0.2)
    this.$vuetify.theme.dark = true
  }
  // async mounted() {
  //   const auth = firebase.auth()
  //   setTimeout(() => {
  //     const {email} = auth.currentUser
  //     console.log(email)
  //     this.$store.dispatch('setUserToken', {uid:email})
  //     this.$router.push('/language')
  //   }, 500)
  // }
}
</script>
