<template>
  <v-app id="inspire" dark>
    <v-app id="inspire" dark>
      <Menu/>
      <v-main>
        <v-container class="fill-height" >

          <v-row
            justify="center"
            align="center"
            class="col-12"
          >
            <v-col
              justify="center"
              class="col-12 makepx"
            >
              Выберите что хотите выучить:
            </v-col>
            <v-col class=" col-5 justify-center"  v-for="language in lang">
<!--              <div>-->
              <v-row>
                <div class=""><img height="300px" width="300px" :src="require(`~/static/${language.img}`)" :alt="selectedDog" /></div>
                <v-btn min-width="130px" class="col-5 ml-16  mr-2 my-3"  @click.prevent="redirect(language.src)"> {{language.text}} </v-btn>
              </v-row>
<!--              </div>-->
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      </v-app>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import NavDrawler from "~/components/NavDrawler";
import Menu from "@/components/Menu";
export default {
  middleware:'auth',
  components: {Menu, NavDrawler},
  methods:{
    closeMenu (event){
      if(event.offsetX>250 && event.offsetY>30){
        this.drawer = false
        this.$forceUpdate()
      }
    },
    async redirect(src) {
      // const uid = firebase.auth().currentUser.uid
      await this.$router.push('/language' + src)
    }
  },
  data:()=>({
    drawer: false,
    lang:[
      {text:'Java',src:'/java',img:'java.png'},
      {text: 'Python',src:'/python',img:'python_logo.png'},
      {text: 'Kotlin',src: '/kotlin',img:'kotlin.png'},
      {text: 'Javascript',src:'/javascript',img:'js_logo.png'},
    ],
    selectedDog: 'https://www.google.com/search?q=dog+img&safe=active&client=opera-gx&hs=u2N&sxsrf=ALeKk03EMRaPclp5dGpXYG6OVTGMCfTpWA:1602834805326&tbm=isch&source=iu&ictx=1&fir=gM3Cz7MsHS_tAM%252CNzcFCDirz3vE7M%252C_&vet=1&usg=AI4_-kRzDbRlC41c3IeNMRpJ05uRtQgbKg&sa=X&ved=2ahUKEwi1w9H50LjsAhWBtYsKHepRBEcQ9QF6BAgEEDk#imgrc=gM3Cz7MsHS_tAM'
  }),
  watch:{
    drawer : function (oldDrawer,newDrawer){
      if(newDrawer === false){
        document.addEventListener('click',this.closeMenu)
      }
      else{
        document.removeEventListener('click',this.closeMenu)
      }
    }
  },
  mounted() {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>
body{
  background-color: #121212 !important;
}
.menu{
  z-index: 5;
}
/*.container {*/
/*  margin: 0 auto;*/
/*  min-height: 100vh;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  text-align: center;*/
/*}*/
</style>
