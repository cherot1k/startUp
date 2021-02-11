<template>
  <v-lazy>
  <v-row justify="center">
    <v-snackbar
      v-model="snackbar"
    >
      Wrong email

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="transparent"
          v-bind="attrs"
          v-on="on"
        >
          Forgot password?
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Refresh password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                  <v-text-field v-model="email" label="Email" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false" >Close</v-btn>
          <v-btn color="blue darken-1" text @click="refreshPass" :disabled="!valid">Send {{valid}} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-lazy>
</template>

<script>
import firebase from 'firebase'
export default {
  data: () => ({
    snackbar:false,
    dialog: false,
    valid:true,
    email:'',
    emailRules:[
      v=> !!v || 'Email is required',
      v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) ||  'Invalid e-mail.';
      }
    ],
  }),
  methods:{
    async refreshPass(){
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if( pattern.test(this.email)){
        firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
          console.log('sended')
          this.dialog=false
        })
      }else {
        this.snackbar = true
      }
    }
  }
}
</script>
