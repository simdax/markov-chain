<template>
	<div>
		<button @click="addNode">ajouter node</button>
		<button @click="removeNode">enlever node</button>
	</div>

</template>

<script>
	import data from './store'
  
	export default{
		data(){return data},
		methods:{
			addNode(){
        	/*
						Node update pattern
						first the new node is linked with others
						after the old nodes link to the new
						*/
						var x = Math.random() * 300;
						var y = Math.random() * 100;
						var id = data.nodes.length;
						data.nodes.push({x,y});
          // populate new node edges
          for (var i = 0; i <= id; i++) {
          	data.edges.push({source:id,target:i,probability:Math.random()})
          };
          // populate old nodes edges
          for (var i = 0; i < id; i++) {
          	data.edges.push({source:i,target:id,probability:Math.random()})
          }
        },
        removeNode(n){
        	/*
						n == index of node (for now, only the last one)
						*/
          // last index
          n = data.nodes.length -1;
          // remove corresponding edges
          var edges = data.edges.filter(edge=>{
          	return edge.source == n || edge.target == n
          });
          for (var i = 0; i < edges.length; i++) {
          	var index = edges[i];
          	data.edges.splice(data.edges.indexOf(index),1)
          };
          // remove node
          data.nodes.splice(n,1);
        }        
      }
    }
 
    </script>