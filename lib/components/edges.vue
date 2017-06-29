   <template>
   <div id="wrapper">
     
    <table>
      <thead>
        <th>%</th>
        <td v-for="n,k in nodes">{{k}}</td>
      </thead>  
      <tbody>
        <tr v-for='node,k in nodes'>
          <td>{{k}}</td>
          <td v-for="n,kk in nodes">
            <input type="number"
            min=0 max=1 step=0.1 
            v-model="edges[index(kk,k)].probability"
            @input="update($event,index(kk,k))"
            />
          </td>
        </tr>
      </tbody>
    </table>
   </div>
  </template> 

<style scoped> 
#wrapper{
/*    width: 50vw;
    height: 30vh;
*/  }  
  table{
    flex: 1 1 500px;
/*    width: 100%;
    height: 100%;*/
    table-layout: fixed;
  }
  td, input{
    text-align: center;
  }
  th, td:first-child{
    width:13px;
  }
</style>

  <script>

  import {mapGetters, mapActions} from 'vuex'
  // var methods = mapActions()
  
    export default {
      props:['ns'],
      computed:{
        nodes(){return this.$store.state[this.ns].nodes},
        edges:{
          get(){
            return this.$store.state[this.ns].edges
          },
          set(val){
            // nothing (strict mode) => see update event
          }
        }
      },
      methods:{
          update(ev,index){
            var value = ev.target.value;
            this.$emit('opacity');
            this.$store.dispatch(this.ns+'/proba',{index,value},{root:true});
          },
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
            if (x <= y) {
              return y*y + x;
            }else{
              return x*x + x + (y+1);
            }
          },
        },
      }
    </script>

