<template>
	<div>
		<button @click="addNode">ajouter node</button>
		<button @click="removeNode">enlever node</button>
	</div>

</template>

<script>
  
  import {mapActions} from 'vuex';

	export default{
		props:['ns'],
		created(){		
			var actions = mapActions(this.ns,{addNode:'add',removeNode:'remove'})
			for (var k in actions) {
				this[k] = actions[k].bind(this)
			}
		}
  }
 
</script>