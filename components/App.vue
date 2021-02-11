<template>
  <v-lazy>
  <v-app id="inspire">
    <v-app id="inspire">
      <Menu/>
      <v-main>
        <v-container class="fill-height" >
          <nuxt/>
        </v-container>
      </v-main>
    </v-app>
  </v-app>
  </v-lazy>
</template>

<script>
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
    }
  },
  data:()=>({
    drawer: false
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

}
</script>

<style>
.menu{
  z-index: 5;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}



</style>
