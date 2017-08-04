import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
// import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import { audioContext } from '../Dashboard';

// var audioContext = new (window.AudioContext || window.webkitAudioContext)();


export default class Test4Level10Graph extends Component {

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

biquadFilter4 = audioContext.createBiquadFilter(); 
biquadFilter4.type = this.props.array[3].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter4.frequency.value = this.props.array[3].frequency; //most important - change this to see if filter working properly - it is
biquadFilter4.Q.value = this.props.array[3].q;
biquadFilter4.gain.value = this.props.array[3].gain; // gain should be 6 when used in peaking/notch
biquadFilter4.connect(audioContext.destination);

biquadFilter5 = audioContext.createBiquadFilter(); 
biquadFilter5.type = this.props.array[4].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter5.frequency.value = this.props.array[4].frequency; //most important - change this to see if filter working properly - it is
biquadFilter5.Q.value = this.props.array[4].q;
biquadFilter5.gain.value = this.props.array[4].gain; // gain should be 6 when used in peaking/notch
biquadFilter5.connect(audioContext.destination);

biquadFilter6 = audioContext.createBiquadFilter(); 
biquadFilter6.type = this.props.array[5].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter6.frequency.value = this.props.array[5].frequency; //most important - change this to see if filter working properly - it is
biquadFilter6.Q.value = this.props.array[5].q;
biquadFilter6.gain.value = this.props.array[5].gain; // gain should be 6 when used in peaking/notch
biquadFilter6.connect(audioContext.destination);

biquadFilter7 = audioContext.createBiquadFilter(); 
biquadFilter7.type = this.props.array[6].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter7.frequency.value = this.props.array[6].frequency; //most important - change this to see if filter working properly - it is
biquadFilter7.Q.value = this.props.array[6].q;
biquadFilter7.gain.value = this.props.array[6].gain; // gain should be 6 when used in peaking/notch
biquadFilter7.connect(audioContext.destination);

biquadFilter8 = audioContext.createBiquadFilter(); 
biquadFilter8.type = this.props.array[7].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter8.frequency.value = this.props.array[7].frequency; //most important - change this to see if filter working properly - it is
biquadFilter8.Q.value = this.props.array[7].q;
biquadFilter8.gain.value = this.props.array[7].gain; // gain should be 6 when used in peaking/notch
biquadFilter8.connect(audioContext.destination);

biquadFilter9 = audioContext.createBiquadFilter(); 
biquadFilter9.type = this.props.array[8].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter9.frequency.value = this.props.array[8].frequency; //most important - change this to see if filter working properly - it is
biquadFilter9.Q.value = this.props.array[8].q;
biquadFilter9.gain.value = this.props.array[8].gain; // gain should be 6 when used in peaking/notch
biquadFilter9.connect(audioContext.destination);

biquadFilter10 = audioContext.createBiquadFilter(); 
biquadFilter10.type = this.props.array[9].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter10.frequency.value = this.props.array[9].frequency; //most important - change this to see if filter working properly - it is
biquadFilter10.Q.value = this.props.array[9].q;
biquadFilter10.gain.value = this.props.array[9].gain; // gain should be 6 when used in peaking/notch
biquadFilter10.connect(audioContext.destination);

biquadFilter11 = audioContext.createBiquadFilter(); 
biquadFilter11.type = this.props.array[10].type; //most important - can be highpass, lowpass, peaking, notch
biquadFilter11.frequency.value = this.props.array[10].frequency; //most important - change this to see if filter working properly - it is
biquadFilter11.Q.value = this.props.array[10].q;
biquadFilter11.gain.value = this.props.array[10].gain; // gain should be 6 when used in peaking/notch
biquadFilter11.connect(audioContext.destination);

var peaks = 
[biquadFilter.frequency.value, biquadFilter2.frequency.value, biquadFilter3.frequency.value,biquadFilter4.frequency.value, 
biquadFilter5.frequency.value, biquadFilter6.frequency.value, biquadFilter7.frequency.value, biquadFilter8.frequency.value,
biquadFilter9.frequency.value, biquadFilter10.frequency.value, biquadFilter11.frequency.value]; 
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
	    var magResponse4 = new Float32Array(width);
	    var magResponse5 = new Float32Array(width);
	    var magResponse6 = new Float32Array(width);
	    var magResponse7 = new Float32Array(width);
	    var magResponse8 = new Float32Array(width);
	    var magResponse9 = new Float32Array(width);
	    var magResponse10 = new Float32Array(width);
	    var magResponse11 = new Float32Array(width);
	     //create new everytime you add a filter
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
	    biquadFilter4.getFrequencyResponse(frequencyHz, magResponse4, phaseResponse);
	    biquadFilter5.getFrequencyResponse(frequencyHz, magResponse5, phaseResponse);
	    biquadFilter6.getFrequencyResponse(frequencyHz, magResponse6, phaseResponse);
	    biquadFilter7.getFrequencyResponse(frequencyHz, magResponse7, phaseResponse);
	    biquadFilter8.getFrequencyResponse(frequencyHz, magResponse8, phaseResponse);
	    biquadFilter9.getFrequencyResponse(frequencyHz, magResponse9, phaseResponse);
	    biquadFilter10.getFrequencyResponse(frequencyHz, magResponse10, phaseResponse);
	    biquadFilter11.getFrequencyResponse(frequencyHz, magResponse11, phaseResponse);

	    var magResponse = [magResponse1, magResponse2, magResponse3, magResponse4, magResponse5, magResponse6, magResponse7, magResponse8, magResponse9, magResponse10, magResponse11];

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
		    	.attr("y", ydb(a)-5)
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
					<h1 className = "chart__header">Level 1</h1>
					<svg id="chart" width="700" height="400" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet"></svg>
				</div>
			</div>
		);
	}
}