

import Vue from 'vue/dist/vue.esm'
import markov from 'vue-loader!./components/main.vue'
// vuex needeed ???
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

    new Vue({
      template:`
        <div class="app">
          <markov></markov>
        </div>
      `,
      el:"#app",
      components:{markov},
    })

