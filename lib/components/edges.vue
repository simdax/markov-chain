   <template>
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
   </template> 

<script>

import data from './store'

  export default {
      data(){return data},
      methods:{
          // got to update manually
          // because we have to watch only
          // one property of edges (probability)
        update(){
          data.svg.update()
        },
        index(x,y){
        	// this algo reflects the "node update" pattern
        	/*
							0 3 7   v j v
							1 2	8		> ^ j
							4 5 6   > > ^
        	*/
          var res;
          var depart = y*y;
          if (x <= y) {
            res= depart + x;
          }else{
            res = x*x + x + (y+1);
          }
          return res;
        },
      },
  }
   </script>

