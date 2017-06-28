<template>
	<div>
		<button @click="goTo('addNode')">ajouter node</button>
		<button @click="goTo('removeNode')">enlever node</button>
	</div>

</template>

<script>
  
  import {mapActions} from 'vuex';

	export default{
		props:['ns'],
		methods:{
			// we have to delay this, 
			// because actions are created on the fly
			goTo(arg){
				this[arg]()
			}
		},
		created(){	
			var actions = mapActions(''+this.ns,{addNode:'add',removeNode:'remove'})
			for (var k in actions) {
				this[k] = actions[k].bind(this)
			}
		}
  }
 
</script>