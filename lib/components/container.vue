<template>
	
	<div class="markovContainerOut">
		<div class="markovContainerImgs">
		  <button @click="create">+</button>
		  <div id="numeroTab">{{nb ? (current+1) : 0}}/{{nb}}</div>
		  <transition-group>		  	
		  	<div v-for="k in nb" :key="k">		  		
	 				<keep-alive >				
					  <markov v-if="current == k-1" :ns='k'></markov>
					</keep-alive>
		  	</div>
		  </transition-group>
		</div>
		<div class="arrows">
			<div class="left" @click='next(-1)'></div>
			<div class="right" @click='next(1)'></div>
		</div>
	</div>		

</template>

<script>

	import markov from './markov.vue'
	// import * as main from '../main' 
	var lib = require("../main")

	export default{
		components: {markov},
		data(){return{
			current:0,			
			nb:0,
		}},
		methods:{
			next(to){
				this.current = Math.abs((this.current+parseInt(to)) % (this.nb))
			},
			create(){
				this.nb++;
				this.$store.registerModule(''+this.nb,lib.store);
			}
		}
	}
</script>

<style>
	.markovContainerOut{
		border: solid 1px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}
	.markovContainerImg{
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		height: 50vh;
	}
	.arrows{
		display: flex;
	}
	.arrows .left{
		margin-right: 2px;
		width: 0;
		height: 0;
		border-top: 50px solid transparent;
		border-right: 100px solid red;
		border-bottom: 50px solid transparent;
	}
	.arrows .right{
		margin-left: 2px;
		width: 0;
		height: 0;
		border-top: 50px solid transparent;
		border-left: 100px solid red;
		border-bottom: 50px solid transparent;
	}
</style>