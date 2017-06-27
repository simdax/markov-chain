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
            />
          </td>
        </tr>
      </tbody>
    </table>
  </template> 

  <script>

  import {mapGetters, mapActions} from 'vuex'
  // var methods = mapActions()
  
    export default {
      computed: mapGetters(['edges', 'nodes']),
      methods:{
          index(x,y){
        	// this algo reflects the "node update" pattern
        	/*
							0 3 7 e m    v j v v v
							1 2	8	f	n    > ^ j v v
							4 5 6 g o    > > ^ j v
              a b c d p    > > > ^ j
              h i j k l    > > > > ^

              where {
                v,> : go down/right
                ^ : jump to top of col
                j : jump to beginning of second next row
              }
             */
            var res;
            if (x <= y) {
              res= y*y + x;
            }else{
              res = x*x + x + (y+1);
            }
            return res;
          },
        },
      }
    </script>

