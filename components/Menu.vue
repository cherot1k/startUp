<template>
  <v-lazy>
  <div class="">
        <NavDrawler :drawer="drawer"></NavDrawler>
        <v-app-bar
          app
          clipped-left
          color="red"
          dense
          class="menu"
        >
          <v-app-bar-nav-icon @click.stop="()=>{drawer = !drawer}"></v-app-bar-nav-icon>
          <v-icon
            class="mx-4"
            large
          >
            mdi-alien
          </v-icon>
          <v-toolbar-title class="mr-12 align-center">
            <span class="title">Learn<b>Prog</b>  </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-row
            align="center"
            style="max-width: 650px"
          >
            <v-text-field
              :append-icon-cb="() => {}"
              placeholder="Search..."
              single-line
              append-icon="mdi-magnify"
              color="white"
              hide-details
            ></v-text-field>
          </v-row>
        </v-app-bar>
  </div>
  </v-lazy>
</template>
<script>
import NavDrawler from "@/components/NavDrawler";

export default {
  components: {NavDrawler},
  mounted() {
    this.$vuetify.theme.dark = true
  },
  methods:{
    closeMenu (event){
      if(window.innerWidth<1300 && window.innerHeight<1000) {
        if (event.offsetX > 250 && event.offsetY > 30) {
          this.drawer = false
          this.$forceUpdate()
        }
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
      this.$store.commit('SETDRAWL',newDrawer)
    }
  }
}
</script>
<style scoped>
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
