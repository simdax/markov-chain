require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths:{
       d3: "https://d3js.org/d3.v4.min",
       jquery:"https://code.jquery.com/jquery-3.1.0.min",
       // dunno any cdn for vue and require ???
       // ==> dont work
       // vue:"//unpkg.com/vue",
       markov:'./lib/markov',
       svg:'./lib/markovSvg'
    }
})

require(['markov','svg'], function(MarkovChain,Draw) {

    var data = {
        nodes: [],
        edges: []
    }

    data.svg = new Draw(data);

    new Vue({
      data: data,
      el:'#tab',
      methods:{
        fil(source,target){
          return this.edges.filter(v=>{
            return v.source == source && v.target == target ;
          }).map(v=>{
            return v.probability
          }) 
        }
      },
    });

    new Vue({
      components:'tab',
      el:'#app',
      data:data,
      mounted(){
        this.update()
      },
      methods:{
        update(){
          this.svg.update()
        },
        addNode(){
          var x = Math.random() * 300;
          var y = Math.random() * 100;
          var id = data.nodes.length;
          data.nodes.push({x,y});
          for (var i = 0; i < data.nodes.length; i++) {
            data.edges.push({source:id,target:i,probability:0.5})
          };
          this.svg.update();
        },
        removeNode(n){
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
          this.svg.update();
        }        
      }
    })

    markov = new MarkovChain(
        [[0.5, 0.5],
         [0.9, 0.1]]
    );


});
