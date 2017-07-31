import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
// import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import { audioContext } from '../Dashboard';

var tracks = ['./audio/track1.wav', './audio/track2.wav', './audio/track3.wav', './audio/track4.wav'];
var startOffset = 0;
var startTime = 0;
// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioContext.createGain();
var source;
var request = new XMLHttpRequest();
var buf;
var isPlaying = false;
var isConnectedToFilter = false;
var biquadFilter1 = audioContext.createBiquadFilter();
var biquadFilter2 = audioContext.createBiquadFilter();
var nyquist = 0.5 * audioContext.sampleRate;
var curveColor = "rgb(192,192,192)";
var playheadColor = "rgb(80, 100, 80)";
var gridColor = "rgb(100,100,100)";

var dbScale = 60;
var pixelsPerDb;
var width = 800;
var height = 400;

var label = [];
var datain = [];
biquadFilter1 = audioContext.createBiquadFilter(); 
biquadFilter1.type = "lowpass";
biquadFilter1.frequency.value = 9000;
biquadFilter1.Q.value = 1;
biquadFilter1.gain.value =6;

biquadFilter2 = audioContext.createBiquadFilter(); 
biquadFilter2.type = "peaking";
biquadFilter2.frequency.value = 5000;
biquadFilter2.Q.value = 14;
biquadFilter2.gain.value =20;

function dbToY(db) {
    var y = (0.5 * height) - pixelsPerDb * db;
    return y;
}

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
					source.connect(biquadFilter1);
					biquadFilter1.connect(gain);
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

	drawFrequencyResponse() {
		var canvas = document.getElementById("canvas");
		var canvasContext = canvas.getContext("2d");
	    canvasContext.fillStyle = "rgb(0, 0, 0)";
	    canvasContext.fillRect(0, 0, width, height);

	    canvasContext.strokeStyle = curveColor;
	    canvasContext.lineWidth = 3;

	    canvasContext.beginPath();
	    canvasContext.moveTo(0, 0);

	    pixelsPerDb = (0.5 * height) / dbScale;
	    
	    var noctaves = 5;
	    
	    var frequencyHz1 = new Float32Array(width);
	    var magResponse1 = new Float32Array(width);
	    var phaseResponse1 = new Float32Array(width);
	    var nyquist = 0.5 * audioContext.sampleRate;
	    // First get response.
	    for (var i = 0; i < width; ++i) {
	        var f = i / width;
	        
	        // Convert to log frequency scale (octaves).
	        f = nyquist * Math.pow(2.0, noctaves * (f - 1.0));
	        
	        frequencyHz1[i] = f;
	    }

    	biquadFilter1.getFrequencyResponse(frequencyHz1, magResponse1, phaseResponse1);
	    for (var i = 0; i < width; ++i) {
	        var f = magResponse1[i];
	        var response = magResponse1[i];
	        var dbResponse = 20.0 * Math.log(response) / Math.LN10;
	        // dbResponse *= 2; // simulate two chained Biquads (for 4-pole lowpass)
	        
	        var x = i;
	    
	        var y = dbToY(dbResponse);
	        
	        canvasContext.lineTo(x, y);
	    }
	    canvasContext.stroke();
	    
	    canvasContext.beginPath();
	    
	    canvasContext.lineWidth = 1;
	    
	    canvasContext.strokeStyle = gridColor;

	    // for (var octave = 0; octave <= noctaves; octave++) {
	    //     var x = octave * width / noctaves;
	        
	    //     canvasContext.strokeStyle = gridColor;
	    //     canvasContext.moveTo(x, 20);
	    //     canvasContext.lineTo(x, height);
	    //     canvasContext.stroke();

	    //     var f = nyquist * Math.pow(2.0, octave - noctaves);
	    //     canvasContext.textAlign = "center";
	    //     canvasContext.strokeStyle = curveColor;
	    //     canvasContext.strokeText(f.toFixed(0) + "Hz", x, 20);
	    // }

	    // Draw 0dB line.
	    canvasContext.beginPath();
	    canvasContext.moveTo(0, 0.5 * height);
	    canvasContext.lineTo(width, 0.5 * height);
	    canvasContext.stroke();
	    
	    // // Draw decibel scale.
	    
	    // for (var db = -dbScale; db < dbScale; db += 5) {
	    //     var y = dbToY(db);
	    //     canvasContext.strokeStyle = curveColor;
	    //     canvasContext.strokeText(db.toFixed(0) + "dB", width , y);

	    //     canvasContext.strokeStyle = gridColor;
	    //     canvasContext.beginPath();
	    //     canvasContext.moveTo(0, y);
	    //     canvasContext.lineTo(width, y);
	    //     canvasContext.stroke();
	    // }
	}

	componentDidMount() {
		this.play();
		this.drawFrequencyResponse();
	}

  	render() {
    	return (
	        <div>
	          <h1>Graph</h1>
	          <canvas id="canvas" width="800" height ="400"></canvas>
	          
	          <div>
	          	<button onClick={this.play}>Play/Pause</button>
	          </div>
	        </div>
   		);
  	}
}