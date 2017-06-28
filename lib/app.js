import * as main from './main'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue.esm'

Vue.use(Vuex)

const store= new Vuex.Store({})
// store.registerModule('0', main.store)

 new Vue({
	store,
	el:"#app",
	components:{markov:main.markov},
	data:{
		nb:0
	},
	methods:{
		n(){
			this.nb++
			store.registerModule(''+this.nb,main.store);
		}
	}
})

