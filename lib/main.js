

import Vue from 'vue/dist/vue.esm'
import markov from 'vue-loader!./components/main.vue'


// TODO vuex needed 
import data from './components/store'

    new Vue({
			data,
      watch:{
        edges(){
          data.svg.update()
        },
        nodes(){
          data.svg.update()
        }
      }
    })

    Vue.component('markov', markov)

    new Vue({
        el:"#vue"
    })

