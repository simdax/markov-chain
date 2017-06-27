<template>
  <div> 
  <graph ref="svg"></graph> 
  <settings></settings>
  </div> 
</template>

<script>

  import settings from './settings.vue'
  import graph from "./svg.vue"
  import data from './store'

  export default{
    store: data,
    name: 'markov',
    components:{settings,graph},
  }

</script>

<style src="./style.css"></style>