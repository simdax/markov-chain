import markov from 'vue-loader!./components/main.vue'
// TODO vuex needed 
import data from './components/store'

export default{
    install(Vue){
      
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

    }
}
