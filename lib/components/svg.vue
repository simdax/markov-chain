<template>
	<svg class="chart"></svg>
</template>

<script>

import * as d3 from "d3";
import {mapGetters} from 'vuex';

	export default {
		computed:mapGetters(['nodes','edges']),
		data(){
			return { 
			marker:[{
	        id:"arrow",
	        width:"20",
	        height:"100",
	        refX:"10",
	        refY:"3",
	        orient:"auto",
	        viewBox:"0 0 10 20",
	        path:{
	          d:"M0,0 L0,6 L9,3 z",
	          fill:"#f00"
	        } 
    	  }],
  	  }
	  },
    mounted(){
    	this.$root.$on('opacity',
    		function(){
    			this.update()
    		}.bind(this)
    	)
      this.svg= d3.select(this.$el);
    	this.svg.append('svg:defs');
    },
    methods:{
	    setMarker(){
	      this.svg.select('defs').selectAll('marker')
	      .data(this.marker)
	      .enter().append('svg:marker')
	        .attr("id", "arrow")
	        .attr('markerHeight', d=>{return d.width})
	        .attr('markerWidth', d=>{return d.height})
	        .attr('markerUnits', 'strokeWidth')
	        .attr('orient', 'auto')
	        .attr('refX', d=>{return d.refX})
	        .attr('refY', d=>{return d.refY})
	        .attr('viewBox', function(d){ return d.viewBox })
	        .append('svg:path')
	          .attr('id','defs')
	          .attr('d', function(d){ return d.path.d })
	          .attr('fill', function(d) { return d.path.fill});
	    },
		  drawEdges(){
		    // update pattern
		    var paths = this.svg.selectAll('path:not(#defs)')
		    .data(this.edges);
		    paths.exit().remove();
		    paths.enter().append('path')
		       .attr('class', 'edge');
      this.svg.selectAll('.edge')
      .attr('d', (d)=> {
	        // Initial and final coordinates
	        var x1 = this.nodes[d.source].x,
	        y1 = this.nodes[d.source].y,
	        x2 = this.nodes[d.target].x,
	        y2 = this.nodes[d.target].y;
	        // draw curves
	        if (x1 == x2 && y1 == y2)
	          return this.drawBezierCurve(x1, y1);
	        return this.drawQuadraticCurve(x1, y1, x2, y2);
	      })
	      .attr("opacity", d =>{return d.probability})
	      .attr("marker-end","url(#arrow)")   
	    },
	    drawText(circles){
	      // not equal to circles ???
	     // var c = this.svg.selectAll('circle')
	     //  .data(this.data.nodes);

	      var t =this.svg.selectAll('text').data(this.nodes);
	      t.exit().remove();
	      t.enter().append('text').attr('class',"text");

	      this.svg.selectAll('.text')
	        .attr('x', (d)=>{return d.x -10 })
	        .attr('y', (d)=>{return d.y -10 })
	        .text((d,i)=>{return i})
	    },
	    drawNodes() {
      // select circles
      // console.log(this.$store.state.nodes[0].x);
      var circles = this.svg.selectAll('circle').data(this.nodes);
      // update if removed
      circles.exit().remove();
      // lets draw nodes
      circles.enter().append('circle')
      .attr('id', function(d, i) { return 'node_' + i })
      .attr('class', 'node');
      this.svg.selectAll('.node')
      .attr('r', 15)
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(d3.drag()
        .on('drag', function(d,i){
        	var x = d3.event.x;
	        var y = d3.event.y;
					this.$store.commit({type:'MOVE_NODE',index:i,pos:{x,y}})
					this.update()
          }.bind(this)
        )
      )
      // return circles;
      this.drawText(circles);
    },
      update(){
        this.setMarker();
        this.drawNodes();
        this.drawEdges();
        // this.drawEdges2();
        // this.drawText(nodes);
      },
      drawQuadraticCurve(x1, y1, x2, y2) {
        // Angle between initial and final coordinates
        var theta = Math.atan2(y2 - y1, x2 - x1);

        // How far the curve will be from the line connecting the two nodes
        var h = 50;

        // Curve control point
        var xf = (x1 + x2)/2 + h*Math.cos(theta + Math.PI/2),
        yf = (y1 + y2)/2 + h*Math.sin(theta + Math.PI/2);

        // Creating quadratic curve
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        return ('M' + x1 + ' ' + y1 +
         ' Q ' + xf + ' ' + yf +
         ', ' + x2 + ' ' + y2);
      },
      drawBezierCurve(x, y) {
        // Creating Bézier curve with fixed size and orientation
        var d = 50;
        return ('M' + x + ' ' + y +
          ' C ' + (x + d) + ' ' + (y + d) +
          ', ' + (x - d) + ' ' + (y + d) +
          ', ' + x + ' ' + y);
      }
	},
	watch:{
		// 'nodes.probability':function(){this.update()},
		nodes(){this.update()},
		edges(){this.update()}
	}

}



</script>