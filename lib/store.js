
	// markov chain implementation

    let state = function(){
      this.nodes= [];
      this.edges= [];
    }

    // various "helpers"	
    let precision = 1;
    let firstVal=()=> {return Math.round(Math.random())}
    // Math.random().toFixed(precision)

    let getters = {
    	edges(state){
    		return state.edges
    	},
    	nodes(state){
    		return state.nodes
    	},
    }

    let setters = {

			ADD_NODE(state){
        	/*
						Node update pattern
						first the new node is linked with others
						after the old nodes link to the new
						*/
						var x = Math.random() * 300;
						var y = Math.random() * 100;
						var id = state.nodes.length;
						state.nodes.push({x,y});
          // populate new node edges
          for (var i = 0; i <= id; i++) {
          	state.edges.push({source:id,target:i,probability:firstVal()})
          };
          // populate old nodes edges
          for (var i = 0; i < id; i++) {
          	state.edges.push({source:i,target:id,probability:firstVal()})
          }
        },
        REMOVE_NODE(state,nn){
        	/*
						n == index of node (for now, only the last one)
						*/
            var n;
          if (nn==0) {n=0}
          else if(nn>0){n=nn}
          else {n=state.nodes.length -1};
          console.log(n);
          // var n = nn || (state.nodes.length -1);
          // remove corresponding edges
          var indices = state.edges.filter(edge=>{
            var res = (edge.source == n) || (edge.target == n)
          	return res
          });
          // remove 
          for (var i = 0; i < indices.length; i++) {
          	var index = indices[i];
            var removedEdge = state.edges.indexOf(index);
            var spliced= state.edges.splice(removedEdge,1)
            // console.log(spliced[0].source,"->",spliced[0].target,spliced[0].probability);
          };
          // have to rename source and target
          for (var i = 0; i < state.edges.length; i++) {
            var el = state.edges[i];
            if (el.source > n) {el.source--};
            if (el.target > n) {el.target--}
          }
          // remove node
          state.nodes.splice(n,1);
        },     
        MOVE_NODE(state,payload){
          state.nodes[payload.index].x = payload.pos.x;
          state.nodes[payload.index].y = payload.pos.y;
          // console.log(state.nodes[payload.index].x);
        },
        SET_PROBA(s,payload){
          // fleche
          s.edges[payload.index].probability=parseFloat(payload.value)
        }
      }

    let actions = {
    	add(state){ 
    		state.commit('ADD_NODE');
    		// state.commit('UPDATE');
  		},
    	remove(state,n){ 
    		state.commit('REMOVE_NODE',n);
    		// state.commit('UPDATE') 
    	},
      move(state,i,pos){
        state.commit('MOVE_NODE',i,pos)
      },
      proba({commit},payload){
        commit('SET_PROBA',payload);
      }
    }

let Module = {
  namespaced: true,
  state() {return new state},
  getters: getters,
  mutations: setters,
  actions: actions,
  strict: true
}

export default Module