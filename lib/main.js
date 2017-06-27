import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let markov = require('./components/main.vue')

new Vue({
  render(h){return h(markov)},
  el:"#vue"
})

// TODO vuex needed 
// import data from './components/store'
// require("./components/store")
// export default{
//     install(Vue){
      

    // new Vue({
    //   data,
    //   watch:{
    //     edges(){
    //       data.svg.update()
    //     },
    //     nodes(){
    //       data.svg.update()
    //     }
    //   }
    // })

    // Vue.component('markov', markov)

    // }

// }
