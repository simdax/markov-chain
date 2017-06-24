require.config({
    paths:{
       d3: "https://d3js.org/d3.v4.min",
       jquery:"https://code.jquery.com/jquery-3.1.0.min",
       markov:'./markov',
       svg:'./markovSvg'
    }
})

require(['markov','svg'], function(MarkovChain,Draw) {

    var data = {
        nodes: [
            {x: 100, y: 100},
            {x: 200, y: 100},
        ],
        edges: [
            {source: 0, target: 0, probability: 0.5},
            {source: 0, target: 1, probability: 0.5},
            {source: 1, target: 0, probability: 0.9},
            {source: 1, target: 1, probability: 0.1}
        ]
    }


    var svg = new Draw(data);
    svg.draw();
           markov = new MarkovChain(
                [[0.5, 0.5],
                 [0.9, 0.1]]
            );
    // window.add = _ =>{
    //     var x = Math.random() * 300;
    //     var y = Math.random() * 100;
    //     data.nodes.push({x,y});
    //     drawEdges(data);
    // }


    // simulate();
});
