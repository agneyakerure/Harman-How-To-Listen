import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';


var frequencyBars = 100;
var myFrequencyArray = new Float32Array(frequencyBars);
for(var i = 0; i < frequencyBars; ++i) {
    myFrequencyArray[i] = 25000/frequencyBars*(i+1);
}
var magResponseOutput = new Float32Array(frequencyBars); // magnitude
var phaseResponseOutput = new Float32Array(frequencyBars); 

// var canvasContext = canvas.getContext("2d");


var tracks = ['./audio/track1.wav', './audio/track2.wav', './audio/track3.wav', './audio/track4.wav'];
var startOffset = 0;
var startTime = 0;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioContext.createGain();
var source;
var request = new XMLHttpRequest();
var buf;
var isPlaying = false;
var isConnectedToFilter = false;
var biquadFilter = audioContext.createBiquadFilter();
biquadFilter = audioContext.createBiquadFilter(); 
biquadFilter.type = "notch";
biquadFilter.frequency.value = 20000;
biquadFilter.Q.value = 5;
biquadFilter.gain.value =6;
var canvas = document.getElementById("canvas");

export default class Graph extends Component {

	play = (event) =>{
		
		if(isPlaying == true) {
			isPlaying = false;
			startOffset += audioContext.currentTime - startTime;
			source.stop();
		} 
		else {

			startTime = audioContext.currentTime;
			source = audioContext.createBufferSource();
			request.open('GET', './audio/traction.wav',  true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				var audioData = request.response;

				audioContext.decodeAudioData(audioData, function(buffer) {
					source.buffer = buffer;
					source.loop = true;
					source.connect(biquadFilter);
					biquadFilter.connect(gain);
					gain.connect(audioContext.destination);
					setTimeout(() => source.start(0, startOffset % buffer.duration), 0);
					isConnectedToFilter = false;
				},
				function(e){
					console.log("Error with decoding audio data" + e.err); 
				});
			}
			request.send();
			isPlaying = true;
		}
	}

	drawFrequencyResponse(mag, phase) {
		var canvas = document.getElementById("canvas");
		var canvasContext = canvas.getContext("2d");
	    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	    var barWidth = 1500 / frequencyBars;
	    
	    // Magnitude
	    canvasContext.strokeStyle = "blue";
	    canvasContext.beginPath();
	    for(var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
	      	canvasContext.lineTo(
	        	frequencyStep * barWidth, 
	        	canvas.height - mag[frequencyStep]*90
	        );
	    }
	    canvasContext.fillText("A", 400,50);
	    canvasContext.stroke();
	}



	componentDidMount() {
		
		this.play();
 		biquadFilter.getFrequencyResponse(
      		myFrequencyArray, 
      		magResponseOutput,
      		phaseResponseOutput
      	);
		this.drawFrequencyResponse(magResponseOutput, phaseResponseOutput);
	}

  	render() {
    	return (
	        <div>
	          <h1>Graph</h1>
	          <canvas id="canvas" width="1200" height ="200"></canvas>
	          <div>
	          	<button onClick={this.play}>Play/Pause</button>
	          </div>
	        </div>
   		);
  	}
}