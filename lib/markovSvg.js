define(['d3'], function(d3){

	return  class Draw {
    constructor(data, id='.chart'){
      this.data = data;
      this.marker=[{
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
      }];
      this.svg = d3.select(id);
      this.svg.append('svg:defs');
    }

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
    }

    setEdges(){
      // update pattern
      var paths = this.svg.selectAll('path:not(#defs)')
      .data(this.data.edges);
      paths.exit().remove();
      paths.enter().append('path')
      .attr('class', 'edge');
    }
    drawEdges(){
      this.svg.selectAll('.edge')
      .attr('d', (d)=> {
        // Initial and final coordinates
        var x1 = this.data.nodes[d.source].x,
        y1 = this.data.nodes[d.source].y,
        x2 = this.data.nodes[d.target].x,
        y2 = this.data.nodes[d.target].y;
        // draw curves
        if (x1 == x2 && y1 == y2)
          return this.drawBezierCurve(x1, y1);
        return this.drawQuadraticCurve(x1, y1, x2, y2);
      })
      .attr("marker-end","url(#arrow)")   
    }
    drawNodes() {

      // we have to make this kind of trick for the callbacks
      // pretty ugly, yes
      var drag = this.drag;
      var draw = this.update.bind(this);
      // select circles
      var circles = this.svg.selectAll('circle')
      .data(this.data.nodes);
      // update if removed
      circles.exit().remove();
      // lets draw nodes
      circles.enter().append('circle')
      .attr('id', function(d, i) { return 'node_' + i })
      .attr('class', 'node')
      .attr('r', 15)
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(d3.drag()
        .on('drag', function(d){
              // still little bit ugly 
              drag.bind(this)(d);
              draw()
            })
        )
      // text
      this.svg.selectAll('text').data(this.data.nodes).exit().remove();
      
      circles.enter().append('text')
        .attr('x', (d)=>{return d.x})
        .attr('y', (d)=>{return d.y})
        .text((d,i)=>{return i})
        .call(d3.drag()
        .on('drag', function(d){
              // still little bit ugly 
              drag.bind(this)(d);
              draw()
            })
        )
    } 
      
      update(){
        this.setMarker();
        this.drawNodes();
        this.setEdges();
        this.drawEdges();
      }

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
      }

      drawBezierCurve(x, y) {
        // Creating Bézier curve with fixed size and orientation
        var d = 50;
        return ('M' + x + ' ' + y +
          ' C ' + (x + d) + ' ' + (y + d) +
          ', ' + (x - d) + ' ' + (y + d) +
          ', ' + x + ' ' + y);
      }

      drag(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this)
        .attr('cx', d.x)
        .attr('cy', d.y);
        // move the text
        d3.select(this.nextSibling)
        .attr('x', d.x)
        .attr('y', d.y);        
      }

    }

})