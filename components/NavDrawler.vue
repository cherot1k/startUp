<template>
  <v-lazy>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    class="nav"
  >
    <v-list dense class="list mt-10" v-model="group">

        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          @click="navitageTo(item.to)"
        >
          <v-btn text class="my-2">
          <v-list-item-action >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
          </v-btn>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
  </v-lazy>
</template>
<style scoped>
  .nav{
    z-index: 1;
  }
  .list{
    margin-top: 100px;
  }
</style>
<script>
  export default {
    props:{
      drawer: Boolean
    },
    data:() => ({
      items: [
        {icon:'mdi-home',text: 'Language',to:'/language'},
        {icon:'mdi-account-cog',text:'Your account',to:'/cabinet'},
        ],
      group:null
    }),
    methods:{
      navitageTo(path){
        this.$router.push(path)
      }
    },
    watch:{
      group(){
        console.log('OK')
        this.$parent.$data.drawler = false
      }
    },
    mounted() {
      this.$vuetify.theme.dark = true
    }
  }
</script>
