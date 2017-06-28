<template>
	
	<div id="markovContainer">
	  <button @click="create">fdsfsd</button>
	  <markov v-for="k in nb" :key="k" :ns='k'></markov>
	</div>		

</template>

<script>

	import markov from './markov.vue'
	// import * as main from '../main' 
	var st = require("../main")

	export default{
		components: {markov},
		data(){return{
					nb:0
				}},
		methods:{
			create(){
				this.nb++;
				this.$store.registerModule(''+this.nb,st.store);
			}
		}
	}
</script>

<style>
	#markovContainer{
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
</style>