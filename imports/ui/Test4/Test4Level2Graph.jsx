import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
// import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import { audioContext } from '../Dashboard';

// var audioContext = new (window.AudioContext || window.webkitAudioContext)();


export default class Test4Level2Graph extends Component {

	constructor(props, el) {
		super(props);
		this.el = el;
		
	}
	
	componentDidMount() {
		//var audioContext = new (window.AudioContext || window.webkitAudioContext)();
//var gain = audioContext.createGain();
//var biquadFilter = audioContext.createBiquadFilter();

//filter properties - play with this to set filter
biquadFilter = audioContext.createBiquadFilter(); 
biquadFilter.type = this.props.array[0].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter.frequency.value = this.props.array[0].frequency; //most important - change this to see if filter working properly - it is
biquadFilter.Q.value = this.props.array[0].q;
biquadFilter.gain.value = this.props.array[0].gain; // gain should be 6 when used in peaking/notch
biquadFilter.connect(audioContext.destination);

//filter properties - play with this to set filter
biquadFilter2 = audioContext.createBiquadFilter(); 
biquadFilter2.type = this.props.array[1].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter2.frequency.value = this.props.array[1].frequency; //most important - change this to see if filter working properly - it is
biquadFilter2.Q.value = this.props.array[1].q;
biquadFilter2.gain.value = this.props.array[1].gain; // gain should be 6 when used in peaking/notch
biquadFilter2.connect(audioContext.destination);

//filter properties - play with this to set filter
biquadFilter3 = audioContext.createBiquadFilter(); 
biquadFilter3.type = this.props.array[2].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter3.frequency.value = this.props.array[2].frequency; //most important - change this to see if filter working properly - it is
biquadFilter3.Q.value = this.props.array[2].q;
biquadFilter3.gain.value = this.props.array[2].gain; // gain should be 6 when used in peaking/notch
biquadFilter3.connect(audioContext.destination);

// biquadFilter4 = audioContext.createBiquadFilter(); 
// biquadFilter4.type = "lowpass"; //most important - can be highpass, lowpass, peaking, notch
// biquadFilter4.frequency.value = 13000; //most important - change this to see if filter working properly - it is
// biquadFilter4.Q.value = 1;
// biquadFilter4.gain.value =6; // gain should be 6 when used in peaking/notch
// biquadFilter4.connect(audioContext.destination);

var peaks = [biquadFilter.frequency.value, biquadFilter2.frequency.value, biquadFilter3.frequency.value]; 
//add cut off frequency values here as you add more filters

var width = 800; 

	var w = 700;
	var h = 400;
	var ymargin = 50;
	var xmargin = 50;

	var svg = d3.select("svg") //append svg element to body		
		   .classed("svg-container", true) //container class to make it responsive
		   .append("svg")
		   //responsive SVG needs these 2 attributes and no width and height attr
		   .attr("preserveAspectRatio", "xMinYMin meet")
		   .attr("viewBox", "0 0 700 400")
		   //class to make it responsive
		   .classed("svg-content-responsive", true); 

	var x = d3.scaleLog() //set log scale for x values
	          .base(10) 
	         .range([xmargin,w-xmargin/2]);

	var getIndex= d3.bisector(function(d){return d.x}).left;
		var noctaves = 11;
		    
	    var frequencyHz = new Float32Array(width);
	    var magResponse1 = new Float32Array(width);
	    var magResponse2 = new Float32Array(width);
	    var magResponse3 = new Float32Array(width);
	    var magResponse4 = new Float32Array(width); //create new everytime you add a filter
	    var phaseResponse = new Float32Array(width);
	    var nyquist = 0.5 * audioContext.sampleRate;
	    // First get response.
	    for (var i = 0; i < width; ++i) {
	        var f = i / width;
	        
	        // Convert to log frequency scale (octaves).
	        f = nyquist * Math.pow(2.0, noctaves * (f - 1.0));
	        
	        frequencyHz[i] = f;
	    }

	    //list of reponses, add here

	    biquadFilter.getFrequencyResponse(frequencyHz, magResponse1, phaseResponse);
	    biquadFilter2.getFrequencyResponse(frequencyHz, magResponse2, phaseResponse);
	    biquadFilter3.getFrequencyResponse(frequencyHz, magResponse3, phaseResponse);
	    //biquadFilter4.getFrequencyResponse(frequencyHz, magResponse4, phaseResponse);

	    var magResponse = [magResponse1, magResponse2, magResponse3];

	    var dat = new Array(peaks.length);
				for (var i = 0; i < peaks.length; i++) {
				  dat[i] = new Array(width);
				}

	    range = 10; //can be changed

	    for(var j=0; j<peaks.length; ++j){
	    	var arr = [];
	    	for(var i=0; i< width; ++i){
	    		arr.push({x:frequencyHz[i], y: 20*Math.log(magResponse[j][i])/Math.log(10)});
	    		}
	    	dat[j] = arr.filter(function(d,i){
	    			return d.y > -range && d.y < range;
	    			})
	   		 }


		x.domain([ Math.min.apply(null, frequencyHz), 22050]);

	  	var ydb = d3.scaleLinear() //scale for y axis
	               .domain([-range, range])
	               .range([h-ymargin,ymargin]);

	    g = svg.append("g"); //create group

		
		g.append("g") //create x axis
	        .attr("class", "axis")
	        .attr("transform", "translate(0, "+ (h-ymargin) +")")
	        .call(d3.axisBottom(x)
	        .tickValues([10, 100, 1000, 5000, 10000, 20000])
	        .tickFormat(d3.format(",.0f")));
	               
		g.append("g") //create y axis
		    .attr("class", "axis")
		    .attr("transform", "translate("+ xmargin +", 0)")
		    .call(d3.axisLeft(ydb));

		g.append("text") //append xlabel
	        .attr("class", "label")
	        .attr("x", w / 2 )
	        .attr("y",  h-10)
	        .style("text-anchor", "middle")
	        .text("Frequency (Hz)");

	    g.append("text") //append ylabel
		    .attr("class", "label")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 15)
		    .attr("x",0 - (h / 2))
		    .text("Amplitude (dB)"); 

	    function drawLine(k) { //function to draw line
	    	var line = d3.line() 
		 			.x(function(d,i){
		 				return x(d.x);
		 			})
		 			.y(function(d,i){
		 				return ydb(d.y);
		 			}); 

		 	g.append("path")
			.datum(dat[k])
			.style("stroke", "steelblue")
			.style("stroke-width", 2)
			.attr("d", line);
	    }

		var focus = svg.append("g") //variable for creation of red circle and associated Text
	      .attr("class", "focus");

		for (var i=0; i < peaks.length; i++) {

			drawLine(i); //function to draw line. defined above
			var f = peaks[i];  
		    var id = getIndex(dat[i], f); //get index in array for peak frequency
		    var a = dat[i][id].y; //get magnitude for that index 

		    focus.append("circle").attr("r", 4.5).attr("cx", x(f)).attr("cy", ydb(a)); //circle
		    focus.append("text").text(Math.round(100*f)/100+" Hz") //label
		    	.attr("x", x(f)-30)
		    	.attr("y", ydb(a)-15)
		    	.style("font-size", "9px");

		    focus.append("text").text(String.fromCharCode(65+i)) //option A,B - get from ASCII
		    	.attr("x", x(f))
		    	.attr("y", ydb(a)-18)
		    	.style("font-weight", "bold")
		    	.style("font-size", "15px");
		  }
	}


	render() {

		return (
			<div className = "chart">
				<div className = "chart__content">
					<h1 className = "chart__header">Level 2</h1>
					<svg id="chart" width="700" height="400" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet"></svg>
				</div>
			</div>
		);
	}
}