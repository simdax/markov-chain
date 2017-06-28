import * as main from './main'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue.esm'

Vue.use(Vuex)
const store= new Vuex.Store(main.store)


new Vue({
	store,
	el:"#app",
	components:{markov:main.markov},
})
