<template>
  <div> 
    <graph></graph> 
    <settings></settings>
  </div> 
</template>

<script>

  import settings from './components/settings.vue'
  import graph from "./components/svg.vue"

  export default{
    name: 'markov',
    components:{settings,graph},
  }

</script>

<style src="./style.css"></style>