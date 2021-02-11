
<template>
  <v-lazy>
    <v-app id="inspire">
      <v-app id="inspire">
        <Menu/>
        <v-main>
          <v-col class="my-5">
            <v-row justify="center">
              <div class="mx-5 link" @click="choose = 'Main'">Main </div>
              <div class="mx-5 link" @click="choose = 'Videos'">Videos </div>
              <div class="mx-5 link" @click="choose = 'States'">States</div>
              <div class="mx-5 link" @click="choose = 'Practice'"> Practice</div>
            </v-row>
          </v-col>
          <div class="mx-5" id="val" v-for="item in my_data" v-html="item"></div>
          <v-col>
            <v-row justify="center" class="my-5">
              <v-btn color="green" @click="changeData"> Success </v-btn>
            </v-row>
          </v-col>
        </v-main>
      </v-app>
    </v-app>
  </v-lazy>
</template>
<script>
import firebase from 'firebase'
export default {
  data: ()=>({
    state:null,
    choose:'',
    videoLinks:[],
    links:[],
    practice:[],
    my_data:[]
  }),
  methods:{
    capitalize(word){
      return word[0].toUpperCase() + word.slice(1)
    },
    parseLink(link){
      return "https://www.youtube.com/embed/" + link
    },
    makeAsParam(string){
      return  string.split(' ').join('').toLowerCase()
    },
    async changeData(){
      const uid = firebase.auth().currentUser.uid
      const data = await firebase.firestore().collection('progress').doc(`${uid}`).get()
      const table = data.data()
      const idx = this.$store.state.currentMaterialIdx
      switch (this.$route.params.language){
        case 'java':
          console.log('Java')
          table.java[idx] = true
          break
        case 'python':
          console.log('Python')
          table.python[idx] = true
          break
        case 'kotlin':
          console.log('Kotlin')
          table.kotlin[idx] = true
          break
        case 'javascript':
          console.log('javascript')
          table.javascript[idx] = true
          break
      }
      await firebase.firestore().collection('progress').doc(`${uid}`).set(table)
    },
  },
  watch:{
    choose: function(newVal,oldVal) {
      switch (newVal){
        case 'Main':
          this.my_data = [this.state]
          break
        case 'Videos':
          let tmpArr = []

            for(let video of this.videoLinks){
              tmpArr.push(
              ` <iframe class="ma-5" id="player" type="text/html" width="640" height="360" src='${this.parseLink(video)}'
                    frameborder="0"></iframe>`)
            }

            console.log(tmpArr)
            this.my_data = tmpArr
              break
        case 'States':
           let my_string = []
             for(let some of this.links){
               my_string.push(
                 `<a href="${some}" target="_blank">${some}</a>`
               )
             }
             this.my_data = my_string
              break
        case 'Practice':
          let the_string = []
          the_string.push( `<div><pre> ${this.practice} </pre> </div>` )
          console.log(the_string)
          this.my_data = the_string
          break
      }
    }
  },
  async mounted() {
    console.log(this.$route.params.direction)
    const response = await firebase.firestore().collection('articles').doc(`${this.$route.params.language}`).collection('basics').doc(`${this.$route.params.direction}`).get()
    console.log(response.data())
    this.state = response.data().value
    this.videoLinks = response.data().links
    this.links = response.data().linksToArticles
    this.choose = 'Main'
    this.practice = response.data().codeExample
  },
  beforeCreate() {
    const self = this
    firebase.firestore().collection('articles').doc(`${this.$route.params.language}`).collection('titles').doc('value').get().then(function (doc){
      if (doc.exists){
        const currentMaterial  = self.$route.params.direction
        let my_arr = doc.data().array.map( x => self.makeAsParam(x))
        if(!my_arr.includes(currentMaterial)){
          self.$router.go(-1)
        }
      }
    })
  }
}
</script>
<style scoped>
.link{
  color: #5750ff !important;
  font-size: 1.5rem;
}
pre {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 2px !important;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
  margin-top: 2px !important;
  max-height: 20px !important;

}
</style>
