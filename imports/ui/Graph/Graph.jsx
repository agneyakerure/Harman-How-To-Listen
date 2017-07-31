import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
// import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import { audioContext } from '../Dashboard';

// var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioContext.createGain();
var biquadFilter = audioContext.createBiquadFilter();
//filter properties - play with this to set filter
biquadFilter = audioContext.createBiquadFilter(); 
biquadFilter.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
biquadFilter.frequency.value = 90; //most important - change this to see if filter working properly - it is
biquadFilter.Q.value = 1;
biquadFilter.gain.value =6; // gain should be 6 when used in peaking/notch
biquadFilter.connect(gain);
gain.connect(audioContext.destination);

var width = 800;

var w = 700;
var h = 400;
var ymargin = 50;
var xmargin = 50;




export default class Graph extends Component {

	
	componentDidMount() {
		// this.play();
		// drawFrequencyResponse();
		
		var noctaves = 11;
		var svg = d3.select("#container") //append svg element to body
		.append("svg")
		.attr("width", w)
		.attr("height", h);

		var x = d3.scaleLog()
          .base(10) //scale for x values
          .range([xmargin,w-xmargin/2]);

        var getIndex= d3.bisector(function(d){return d.x}).left;

        var frequencyHz = new Float32Array(width);
        var magResponse = new Float32Array(width);
        var phaseResponse = new Float32Array(width);
        var nyquist = 0.5 * audioContext.sampleRate;
		    // First get response.
		for (var i = 0; i < width; ++i) {
		    var f = i / width;

		        // Convert to log frequency scale (octaves).
		    f = nyquist * Math.pow(2.0, noctaves * (f - 1.0));
		        
		    frequencyHz[i] = f;
		}

	    biquadFilter.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);

	    var data2 = []

	    for(var i=0; i<width; ++i){
	    	data2.push({x:frequencyHz[i], y:20*Math.log(magResponse[i])/Math.log(10)});
	    }

	    range = 10; //can be changed
	    //data2.unshift({x:10,y:0});
	    console.log(data2);
	    data = data2.filter(function(d,i){
	    	return d.y > -range && d.y < range; 
	    })

	    x.domain([ d3.min(data, function(d){
	    	return(d.x);
	    }), 
	    d3.max(data, function(d){
	    	return(d.x);
	    })]);

		var ydb = d3.scaleLinear() //scale for y axis 
		.domain([-range, range])
		.range([h-ymargin,ymargin]);


		var line = d3.line() //create line and assign cordinates
		.x(function(d,i){
			return x(d.x);
		})
		.y(function(d,i){
			return ydb(d.y);
		});

		g = svg.append("g");

	
		g.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, "+ (h-ymargin) +")")
		.call(d3.axisBottom(x)
			.tickValues([1, 10, 100, 1000, 10000, 20000, biquadFilter.frequency.value])
			.tickFormat(d3.format(",.0f")));

		g.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+ xmargin +", 0)")
		.call(d3.axisLeft(ydb));

		g.append("text")
		.attr("class", "label")
		.attr("x", w / 2 )
		.attr("y",  h-10)
		.style("text-anchor", "middle")
		.text("Frequency (Hz)");

		g.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 15)
		.attr("x",0 - (h / 2))
		.text("Amplitude (dB)"); 

		g.append("path")
		.datum(data)
		.style("stroke", "steelblue")
		.style("stroke-width", 2)
		.attr("d", line);

	}

render() {

	return (
		<div>
		<h1>Graph</h1>

		<div id="container"></div>

		</div>
		);
}
}