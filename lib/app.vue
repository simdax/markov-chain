<template>
  <div> 
    <graph ref="graph"></graph> 
    <div id="settings">
      <edges @opacity="update"></edges>
      <nodes></nodes>      
    </div>  
  </div> 
</template>

<script>

  import edges from './components/edges.vue'
  import nodes from './components/nodes.vue'
  import graph from "./components/svg.vue"

  export default{
    name: 'markov',
    components:{edges,nodes,graph},
    methods:{
      update(){this.$refs.graph.update()}
    }
  }

</script>

<style src="./style.css"></style>