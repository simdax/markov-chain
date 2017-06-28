<template>
  <div> 
    <graph :ns="ns" ref="graph"></graph> 
    <div>
      <edges :ns="ns" @opacity="update"></edges>
      <nodes :ns="ns"></nodes>      
    </div>  
  </div> 
</template>

<script>

  import edges from './components/edges.vue'
  import nodes from './components/nodes.vue'
  import graph from "./components/svg.vue"

  export default{
    props:['ns'],
    name: 'markov',
    components:{edges,nodes,graph},
    methods:{
      update(){this.$refs.graph.update()}
    }
  }

</script>

<style src="./style.css"></style>