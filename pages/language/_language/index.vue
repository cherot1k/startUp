<template>
  <v-lazy>
    <v-app id="inspire">
      <v-app id="inspire">
        <Menu/>
        <v-main class="main">
          <v-container class="col-10 mx-5" >
            <v-row class="my-3"> <v-btn @click.prevent="makeSort">Sort </v-btn></v-row>
            <v-row class="my-3"> <v-btn @click.prevent="makeReverse">Reverse </v-btn></v-row>
            <v-row class="my-3"> <v-text-field v-model="value"></v-text-field> <v-btn @click="makeSearch"> Search</v-btn> </v-row>

            <v-col class="ma-5">
              <v-row
                justify="center"
                align="center"
                class=""
                :class="{centerMe:drawl}"
              >
                <v-spacer/>
                  <v-col  class="col-8">
                    <div class="dir_items my-5 col-8" :class="progressData[id]? 'yellow':''" v-for="(item,id) in directions" @click="route(item,id)">{{id + 1}} <span class="mr-3">|</span>  {{item}}</div>
                  </v-col>
                <v-spacer/>
              </v-row>
            </v-col>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </v-lazy>

</template>
<script>
import {sortByName,reverseArr,search} from '@/components/func'
import firebase from 'firebase'
export default {
  data: ()=>({
    directions:null,
    progressData:null,
    value : '',
    allDirections: null
  }),
  computed:{
    drawl(){
      return true
    }
  },
  methods:{
    route(path,idx){
      path = path.replace(/\s/g, '');
      this.$store.dispatch('setMaterialIdx',idx)
      this.$router.push(`/language/${this.$route.params.language}/${path.toLowerCase()}`)
    },
    makeSort(){
      this.directions = sortByName(this.directions)
    },
    makeReverse(){
    this.directions =   reverseArr(this.directions)
    },
    makeSearch(){
     this.directions =  search(this.allDirections,this.value)
    },
    async addTable(){
      const jsTitles = await firebase.firestore().collection('articles').doc('javascript').collection('titles').doc('value').get()
      const jsQual = await jsTitles.data().array.length

      const javaTitles = await firebase.firestore().collection('articles').doc('java').collection('titles').doc('value').get()
      const javaQual = javaTitles.data().array.length

      const pythonTitles = await firebase.firestore().collection('articles').doc('python').collection('titles').doc('value').get()
      const pythonQual = pythonTitles.data().array.length

      const kotlinTitles = await firebase.firestore().collection('articles').doc('kotlin').collection('titles').doc('value').get()
      const kotlinQual = kotlinTitles.data().array.length

      const table = {
        java: [...Array(jsQual).keys()].map(_=>false),
        python:[...Array(javaQual).keys()].map(_=>false),
        javascript:[...Array(pythonQual).keys()].map(_=>false),
        kotlin:[...Array(kotlinQual).keys()].map(_=>false)
      }
      const uid = firebase.auth().currentUser.uid
      await firebase.firestore().collection('progress').doc(`${uid}`).set(table)
    }
  },
  async mounted() {
    const response = await firebase.firestore().collection('articles').doc(`${this.$route.params.language}`).collection('titles').doc('value').get()
    this.directions = response.data().array
    this.allDirections = this.directions
    const uid = firebase.auth().currentUser.uid
    let progress = await firebase.firestore().collection('progress').doc(`${uid}`).get()
    if(!progress.data()){
      await this.addTable()
      progress = await firebase.firestore().collection('progress').doc(`${uid}`).get()
    }
    switch (this.$route.params.language){
      case 'javascript':
         this.progressData = progress.data().javascript
        break
      case 'python':
        this.progressData = progress.data().python
        break
      case 'kotlin':
        this.progressData = progress.data().kotlin
        break
      case 'java':
        this.progressData = progress.data().java
        break
    }
  },
  beforeCreate() {
    console.log()
    if(!['python','java','javascript','kotlin'].includes(this.$route.params.language)){
      this.$router.go(-1)
    }
  },

}
</script>
<style scoped>
.dir_items{
  text-align: center !important;
  font-size: 2rem !important;
  border: 1px solid white;
  border-radius: 10px;
  min-width: 350px !important;
}
.main{
  width: 70vw;
}
</style>
