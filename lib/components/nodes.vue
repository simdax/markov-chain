<template>
	<div>
		<button @click="addNode">ajouter node</button>
		<button @click="removeNode">enlever node</button>
	</div>

</template>

<script>
  
  import {mapActions} from 'vuex';

	export default{
		methods:mapActions({addNode:'add',removeNode:'remove'})
  }
 
    </script>