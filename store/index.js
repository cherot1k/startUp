import * as firebase from "firebase";
import {init} from "@/firebase/fire_init";
export const state = () => ({
  userToken:null,
  user:{},
  currentMaterialIdx: null,
  drawl: null
})

export const mutations = {
  SETUSERTOKEN(state, user){
    state.userToken = user.uid
    // state.user = user
  },
  FREESTATE(state){
    state.userToken = null
  },
  SETMATERIALIDX(state,idx){
    state.currentMaterialIdx = idx
  },
  SETDRAWL(state,value){
    state.drawl = value
  }
}

export const actions = {
  async setUserToken(ctx,user){
    ctx.commit('SETUSERTOKEN',user)
  },
  async setMaterialIdx(ctx,idx){
    console.log(idx)
    ctx.commit('SETMATERIALIDX',idx)
  },
  nuxtServerInit () {
    if (!firebase.apps.length) {
      init()
    }
  }
}

export const getters = {
  userToken: s=>s.userToken,
  drawl : s => s.drawl
}
