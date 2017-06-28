	// markov chain implementation

    let state = {
      nodes: [],
      edges: [],
    }
	
    let getters = {
    	edges(state){
    		return state.edges
    	},
    	nodes(state){
    		return state.nodes
    	},
    }

    let setters = {

			'ADD_NODE': function(state){
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
          	state.edges.push({source:id,target:i,probability:Math.random()})
          };
          // populate old nodes edges
          for (var i = 0; i < id; i++) {
          	state.edges.push({source:i,target:id,probability:Math.random()})
          }
        },
        'REMOVE_NODE': function(state,nn){
        	/*
						n == index of node (for now, only the last one)
						*/
          // last index
          var n = state.nodes.length -1;
          // remove corresponding edges
          var edges = state.edges.filter(edge=>{
          	return edge.source == n || edge.target == n
          });
          for (var i = 0; i < edges.length; i++) {
          	var index = edges[i];
          	state.edges.splice(state.edges.indexOf(index),1)
          };
          // remove node
          state.nodes.splice(n,1);
        },     
        'MOVE_NODE': (state,payload)=>{
          state.nodes[payload.index].x = payload.pos.x;
          state.nodes[payload.index].y = payload.pos.y;
          // console.log(state.nodes[payload.index].x);
        },
        SET_OPACITY(s,p){
          // var fleche=s.edges[p.index]
          // fleche
        }
      }

    let actions = {
    	add(state){ 
    		state.commit('ADD_NODE');
    		// state.commit('UPDATE');
  		},
    	remove(state){ 
    		state.commit('REMOVE_NODE');
    		// state.commit('UPDATE') 
    	},
      move(state,i,pos){
        state.commit('MOVE_NODE',i,pos)
      }
    }

export default {
    state: state,
    getters: getters,
    mutations: setters,
    actions: actions,
    // strict: true
}