<template>
  <div> 
    <graph :ns="id" ref="graph"></graph> 
    <div>
      <edges :ns="id" @opacity="update"></edges>
      <nodes :ns="id"></nodes>      
    </div>  
  </div> 
</template>

<script>

  import edges from './components/edges.vue'
  import nodes from './components/nodes.vue'
  import graph from "./components/svg.vue"

  export default{
    props:['id'],
    name: 'markov',
    components:{edges,nodes,graph},
    methods:{
      update(){this.$refs.graph.update()}
    }
  }

</script>

<style src="./style.css"></style>