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
      data,
      watch:{
        edges(){
          data.svg.update()
        },
        nodes(){
          data.svg.update()
        }
      }
    })

    new Vue({
      data,
      el:'#tab',
      template:`        
          <table>
            <thead>
              <th>Edges</th>
              <td v-for="n,k in nodes">{{k}}</td>
            </thead>  
            <tbody>
            <tr v-for='node,k in nodes'>
              <td>{{k}}</td>
              <td v-for="n,kk in nodes">
                <input type="number"
                min=0 max=1 step=0.1 
                v-model.number=edges[index(kk,k)].probability 
                @change="update"/>
              </td>
            </tr>
            </tbody>
          </table>
      `,
      methods:{
        update(){
          console.log(data.svg);
          data.svg.update()
        },
        index(x,y){
          var res;
          var depart = y*y;
          if (x <= y) {
            res= depart + x;
          }else{
            res = x*x + x + (y+1);
          }
          return res;
        },
        // changeProb(source,target){
        //   var index=-1;
        //   for (var i = 0; i < data.edges.length; i++) {
        //     var v = data.edges[i];
        //     if (v.source == source && v.target == target) {
        //       index = i ;
        //       break;
        //     }
        //   }
        //   if (index > -1) {
        //     // console.log("updat !");
        //     data.edges[index].opacity = 1
        //     // svg.update();
        //   }
        // }
      },
    });

    svg = new Vue({
      components:'tab',
      el:'#app',
      data:data,
      // mounted(){
      //   this.update()
      // },
      methods:{
        // update(){
        //   this.svg.update()
        // },
        addNode(){
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
          // this.svg.update();
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
          // this.svg.update();
        }        
      }
    })

    markov = new MarkovChain(
        [[0.5, 0.5],
         [0.9, 0.1]]
    );


});
