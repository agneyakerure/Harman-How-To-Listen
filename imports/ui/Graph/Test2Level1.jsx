import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Links } from '../../api/links';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import createBrowserHistory from 'history/createBrowserHistory';
import { audioContext } from '../Dashboard';
import  Graph  from './Graph.jsx';
import Modal from 'react-modal';
//For React Router
const history = createBrowserHistory({forceRefresh: true});

//Level Variables
var wrongNumber = 0;
var correctNumber = 0;
var incompleteLevel = 1;
var Test2Attempts = 0;
var Test2TotalCorrect = 0;
var Test2TotalWrong = 0;
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
var value2 = 2;
var check = [];
var divstyle = [];
var simpleArray = [];
var answer =[ 1,0 ];
// 
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
		frequency: 500,
		q: 1,
		gain: 6
	}, 
	{
		name: "B",
		type: "peaking",
		frequency: 5000,
		q: 1,
		gain: 6
	}
]

shuffle(array);

console.log(array[0].frequency);
export default class Test2Level1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 1,
			values:[],
			
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
		this.play();
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('values');
			const values = Links.find({userId: Meteor.userId()}).fetch();
			this.setState({ values });
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
		this.linksTracker.stop();
	}

	peaking1 = (event) => {
		console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = array[0].type;
	      filter.frequency.value = array[0].frequency;
	      filter.Q.value = array[0].q;
	      filter.gain.value = array[0].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = array[0].type;
	      filter.frequency.value = array[0].frequency;
	      filter.Q.value = array[0].q;
	      filter.gain.value = array[0].gain;
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

  	onSubmit = (event) => {
  		event.preventDefault();
  		var choice = document.forms[0];
  		for (i = 0; i < choice.length; i++) {
        	if (choice[i].checked) {
            	console.log(choice[i].value);
            	if(choice[i].value == array[0].name) {
	        		console.log("success!");
	        	} else {
	        		console.log("failure");
	        	}
        	}

    	}
  	}

	
  	render() {
  		return(
			<div>
				<PrivateHeader title="Level 1"/>
				<div>
					<Graph filter={filter}/>
					<p>Use Radio!</p>

					<form id="form" onSubmit = {this.onSubmit}>
						<input type = "radio" name = "choice" value= "A"/>A
						<input type = "radio" name = "choice" value= "B"/>B
						<button id = "submit"> Submit! </button>
					</form>
					
					<button onClick={this.peaking1}>EQ</button>
					
					<button onClick={this.flat}>Flat</button>
					<button onClick={this.play}>Play/Pause</button>
					<button onClick={this.stop}>Stop</button>

				</div>
				<button onClick = {this.stop}><Link to='/Dashboard'>Dashboard</Link></button>
				<Modal isOpen = {false} contentLabel = "Success/Failure">
					<p>HELLO WORLD!</p>
				</Modal>
			</div>
		)
  	}
	
}