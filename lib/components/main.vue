<template>
  <div> 
    <svg class="chart"></svg>
    <div id="setting">
      <edges></edges>
      <nodes></nodes>      
    </div>  
  </div> 
</template>

<script>

  import Vue from 'vue'
  import edges from 'vue-loader!./edges.vue'
  import nodes from 'vue-loader!./nodes.vue'
  import Draw from "../markovSvg"
  
  import data from './store'

  // Vue.component('markov',{
    
  // })
  export default{
    name: 'markov',
    components:{nodes,edges},
    mounted(){
     data.svg = new Draw(data);
   }
 }

</script>

<style src="./style.css"></style>