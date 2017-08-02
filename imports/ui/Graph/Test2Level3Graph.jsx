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
biquadFilter.frequency.value = 44; //most important - change this to see if filter working properly - it is
biquadFilter.Q.value = 1;
biquadFilter.gain.value =6; // gain should be 6 when used in peaking/notch
biquadFilter.connect(audioContext.destination);

biquadFilter2 = audioContext.createBiquadFilter(); 
biquadFilter2.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
biquadFilter2.frequency.value = 340; //most important - change this to see if filter working properly - it is
biquadFilter2.Q.value = 1;
biquadFilter2.gain.value =6; // gain should be 6 when used in peaking/notch
biquadFilter2.connect(audioContext.destination);


//filter properties - play with this to set filter
biquadFilter3 = audioContext.createBiquadFilter(); 
biquadFilter3.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
biquadFilter3.frequency.value = 1500; //most important - change this to see if filter working properly - it is
biquadFilter3.Q.value = 1;
biquadFilter3.gain.value =6; // gain should be 6 when used in peaking/notch
biquadFilter3.connect(audioContext.destination);

biquadFilter4 = audioContext.createBiquadFilter(); 
biquadFilter4.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
biquadFilter4.frequency.value = 8000; //most important - change this to see if filter working properly - it is
biquadFilter4.Q.value = 1;
biquadFilter4.gain.value =6; // gain should be 6 when used in peaking/notch
biquadFilter4.connect(audioContext.destination);

//DO THISSSSS!!!!!!!
var peaks = [biquadFilter.frequency.value, biquadFilter2.frequency.value, biquadFilter3.frequency.value, biquadFilter4.frequency.value];

var width = 800;

var w = 700;
var h = 400;
var ymargin = 50;
var xmargin = 50;

export default class Test2Level3Graph extends Component {

	constructor(props, el) {
		super(props);
		this.el = el;
		
	}
	
	componentDidMount() {
		
		
		var svg = d3.select("#container") //append svg element to body
		.append("svg")
		.attr("width", w)
		.attr("height", h);
		//console.log("Value passed is: ", this.props.filter);
		var x = d3.scaleLog()
          .base(10) //scale for x values
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
	    biquadFilter4.getFrequencyResponse(frequencyHz, magResponse4, phaseResponse);


    	var data2 = []

	    for(var i=0; i<width; ++i){ //create list with elements x (frequency) and y(magresponse1, magresponse2 ...) add to this list when you add new filter
	      data2.push({x:frequencyHz[i], 
	      	y: [
	      	20*Math.log(magResponse1[i])/Math.log(10), 
	      	20*Math.log(magResponse2[i])/Math.log(10),
	      	20*Math.log(magResponse3[i])/Math.log(10),
	      	20*Math.log(magResponse4[i])/Math.log(10)
	      	]});
	    }

    //THAT'S IT! NO NEED TO CHANGE REST OF CODE

    	range = 10; //can be changed

    	data = data2.filter(function(d,i){
      		return d.y[0] > -range && d.y[0] < range; //not required for peaking filter for now
   		})

	 	x.domain([ d3.min(data, function(d){ //set domain of xscale
              return(d.x);
            }), 
              d3.max(data, function(d){
              return(d.x);
             })]);

  		var ydb = d3.scaleLinear() //scale for y axis
               .domain([-range, range])
               .range([h-ymargin,ymargin]);

    	g = svg.append("g"); //create group

	
		g.append("g") //create x axis
	        .attr("class", "axis")
	        .attr("transform", "translate(0, "+ (h-ymargin) +")")
	        .call(d3.axisBottom(x)
	        .tickValues([1, 10, 100, 1000, 10000, 22050])
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
		 				return ydb(d.y[k]);
		 			}); 

		 	g.append("path")
			.datum(data)
			.style("stroke", "steelblue")
			.style("stroke-width", 2)
			.attr("d", line);
	    }

		var focus = svg.append("g") //variable for creation of red circle and associated Text
	      .attr("class", "focus");

		for (var i=0; i < peaks.length; i++) {

			drawLine(i); //function to draw line. defined above
			var f = peaks[i]; 
		    var id = getIndex(data, f); //get index in array for peak frequency
		    var a = data[id].y[i]; //get magnitude for that index 

		    focus.append("circle").attr("r", 4.5).attr("cx", x(f)).attr("cy", ydb(a)); //circle
		    focus.append("text").text(Math.round(100*f)/100+" Hz, ") //label
		    	.attr("x", x(f)-30)
		    	.attr("y", ydb(a)-7)
		    	.style("font-size", "12px");

		    focus.append("text").text(String.fromCharCode(65+i)) //option A,B - get from ASCII
		    	.attr("x", x(f))
		    	.attr("y", ydb(a)-20)
		    	.style("font-weight", "bold")
		    	.style("font-size", "15px");
		}
	}

	componentWillUnmount() {
		//this.el.close();
	}

	render() {

		return (
			<div>
			<h1>Graph 3</h1>

			<div id="container"></div>
			
			</div>
			);
	}
}