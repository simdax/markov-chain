<template>
  <div id="settings">
    <edges></edges>
    <nodes></nodes>      
  </div>  
</template>

<script>
	
	import edges from './edges.vue'
  import nodes from './nodes.vue'

	export default{
		components:{edges,nodes}
	}
</script>