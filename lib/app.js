import * as main from './main'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue.esm'

Vue.use(Vuex)
const store= new Vuex.Store({
	modules:{
		0:new main.store(),
		1:new main.store()
	}	
})


new Vue({
	store,
	el:"#app",
	components:{markov:main.markov},
})

