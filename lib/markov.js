define(['jquery'], function($){

	return class MarkovChain {
    constructor(transitionMatrix) {
        this.transitionMatrix = transitionMatrix;
        this.state = 0;
    }

    transition() {
        var sampledProb = Math.random();
        var nextState = 0;
        var requiredProb;

        console.log('Sample prob:', sampledProb);

        for (var i = 0; i < this.transitionMatrix.length; i++) {
            requiredProb = this.transitionMatrix[this.state][i];
            nextState = i;

            console.log('Required prob:', requiredProb);

            if (sampledProb < requiredProb) {
                break;
            } else {
                sampledProb -= requiredProb;
            }
        }

        console.log('Next state:', nextState);
        this.state = nextState;
    }
    
    simulate() {
        window.setInterval(function() {
            $('#node_' + this.state).removeClass('current-node');
            this.transition();
            $('#node_' + this.state).addClass('current-node');
        }, 1000);
    }
	}	

})