import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Test2 } from '../../api/Test2';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import createBrowserHistory from 'history/createBrowserHistory';
import { audioContext } from '../Dashboard';
// import  Test2Level0Graph  from './Test2Level0Graph.jsx';
import Modal from 'react-modal';
//For React Router
const history = createBrowserHistory({forceRefresh: true});

//Level Variables
var Test2Level1CorrectNumber = 0;
var Test2Level1WrongNumber = 0;
var incompleteLevel = 1;
var Test2Attempts = 0;
var Test2TotalCorrect = 0;
var Test2TotalWrong = 0;
var level = 1
//var a = 2;

//Function to randomize
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
}

//Audio variables - Web Audio API
var tracks = ['./audio/track1.wav', './audio/track2.wav', './audio/track3.wav', './audio/track4.wav'];
var startOffset = 0;
var startTime = 0;
// var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioContext.createGain();
var source;
var request = new XMLHttpRequest();
var buf;
var isPlaying = false;
var isConnectedToFilter = false;
var filter = audioContext.createBiquadFilter();
filter.frequency.value=22050;
gain.gain.value = 0.5;

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
}

var array = [
{	
	name: "A",
	type: "peaking",
	frequency: 200,
	q: 1,
	gain: 6
}, 
{
	name: "B",
	type: "peaking",
	frequency: 2000,
	q: 1,
	gain: 6
}
]

var newArray = array.slice();

shuffle(array);

console.log(array[0].frequency);
export default class Test2Level0 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isCorrect: "Correct!",
			level: 1,
			test2:[],
			graphArray: newArray
			
		};
	}

	componentWillMount() {
		setTimeout(() => {
			window.history.forward()
		}, 0)
		window.onunload=function(){null};

	}

	componentDidMount() {

		shuffle(tracks);
		var x = document.getElementById("entryDiv");
		x.style.display="block";
		//this.play();
		this.test2Tracker = Tracker.autorun(() => {
			Meteor.subscribe('test2');
			const test2 = Test2.find({userId: Meteor.userId()}).fetch();
			this.setState({ test2 });
		});
	}

	play = (event) =>{
		
		if(isPlaying == true) {
			isPlaying = false;
			startOffset += audioContext.currentTime - startTime;
			source.stop();
		} 
		else {

			startTime = audioContext.currentTime;
			source = audioContext.createBufferSource();
			request.open('GET', tracks[0],  true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				var audioData = request.response;

				audioContext.decodeAudioData(audioData, function(buffer) {
					source.buffer = buffer;
					source.loop = true;
					source.connect(filter);
					filter.connect(gain);
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

	stop = (event) => {

		source.stop(0);
		source.disconnect();
		isPlaying = false;
		startTime = 0;
		startOffset = 0;

	}

	componentWillUnmount() {
		this.test2Tracker.stop();
	}

	filterA = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[0].type;
	      filter.frequency.value = newArray[0].frequency;
	      filter.Q.value = newArray[0].q;
	      filter.gain.value = newArray[0].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[0].type;
	      filter.frequency.value = newArray[0].frequency;
	      filter.Q.value = newArray[0].q;
	      filter.gain.value = newArray[0].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterB = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[1].type;
	      filter.frequency.value = newArray[1].frequency;
	      filter.Q.value = newArray[1].q;
	      filter.gain.value = newArray[1].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[1].type;
	      filter.frequency.value = newArray[1].frequency;
	      filter.Q.value = newArray[1].q;
	      filter.gain.value = newArray[1].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	flat = (event) => {
		if(isConnectedToFilter) {
			filter.type = 'allpass';
			filter.frequency.value = 22050;
			isConnectedToFilter = true;
		}
		else {
			source.connect(filter);
			filter.connect(gain);
			filter.type = 'allpass';
			filter.frequency.value = 22050;
			isConnectedToFilter = true;
		}
	}


	onModalOk = (event) => {
		event.preventDefault();
		this.stop();
		Meteor.call('test2.Test2Level0Insert',0, 1);
				setTimeout(() => history.push('/Test2Level1'), 0);
	}

	
	render() {
		return(
			<div>
				<PrivateHeader title="Level 1"/>
				<div>
					<div>
						<div className = "chartBox">
							<Test2Level0Graph array={this.props.newArray}/>
						</div>
						<div className = "graph-form">
							<div id = "entryDiv">
								<div className = "score-card">
									
								</div>
								<div className = "media-buttons">
									<button className = "level0-media-button" onClick={this.filterA}>A</button>
									<button className = "level0-media-button" onClick={this.filterB}>B</button>
									<button className = "level0-media-button" onClick={this.flat}>Flat</button>
									<button className = "level0-media-button" onClick={this.play}>Play/Pause</button>
									<button className = "level0-media-button" onClick={this.stop}>Stop</button>
								</div>
								<p>Compare the unequalized version of the sound (FLAT) to the equalized version (EQ), and determine
								 which frequency band is affected by the equalization. Enter your response by clicking on the numbered
								  button that corresponds to the affected frequency band, and then hit the DONE button.</p>
								<form className = "level0-radio-form" id = "form">
									<div className = "submit-button-contianer">
										<button className = "button--submit-button" onClick={this.onModalOk}>OK</button>
									</div>
								<button className = "dashboard-link-button" onClick = {this.stop}><Link to = '/Dashboard'>Dashboard</Link></button>

								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

class Test2Level0Graph extends Component {

	constructor(props, el) {
		super(props);
		this.el = el;
		
	}
	
	componentDidMount() {

		var gain = audioContext.createGain();
		var biquadFilter = audioContext.createBiquadFilter();

		//filter properties - play with this to set filter
		biquadFilter = audioContext.createBiquadFilter(); 
		biquadFilter.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
		biquadFilter.frequency.value = 2000; //most important - change this to see if filter working properly - it is
		biquadFilter.Q.value = 1;
		biquadFilter.gain.value =6; // gain should be 6 when used in peaking/notch
		biquadFilter.connect(audioContext.destination);

		biquadFilter2 = audioContext.createBiquadFilter(); 
		biquadFilter2.type = "peaking"; //most important - can be highpass, lowpass, peaking, notch
		biquadFilter2.frequency.value = 200; //most important - change this to see if filter working properly - it is
		biquadFilter2.Q.value = 1;
		biquadFilter2.gain.value =6; // gain should be 6 when used in peaking/notch
		biquadFilter2.connect(audioContext.destination);

		var peaks = [biquadFilter.frequency.value, biquadFilter2.frequency.value]; 
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

		var getIndex= d3.bisector(function(d){return d.x}).left; //this gives the index of frequency f in array data
		
		
		var noctaves = 11;
	    
	    var frequencyHz = new Float32Array(width);
	    var magResponse1 = new Float32Array(width);
	    var magResponse2 = new Float32Array(width);
	    // var magResponse3 = new Float32Array(width); //create new everytime you add a filter
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
	    // biquadFilter3.getFrequencyResponse(frequencyHz, magResponse3, phaseResponse);

	    var data2 = []

	    for(var i=0; i<width; ++i){ //create list with elements x (frequency) and y(magresponse1, magresponse2 ...) add to this list when you add new filter
	      data2.push({x:frequencyHz[i], y: [20*Math.log(magResponse1[i])/Math.log(10), 
	      	20*Math.log(magResponse2[i])/Math.log(10)
	      	//add more here
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
		    focus.append("text").text(Math.round(100*f)/100+" Hz") //label
		    	.attr("x", x(f)-30)
		    	.attr("y", ydb(a)-7)
		    	.style("font-size", "12px");

		    focus.append("text").text(String.fromCharCode(64+peaks.length-i)) //option A,B - get from ASCII
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
			<div className = "chart">
				<div className = "chart__content">
					<h1 className = "chart__header">Peaks - Introduction</h1>
					<svg id="chart" width="700" height="400" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet"></svg>
				</div>
			</div>
		);
	}
}