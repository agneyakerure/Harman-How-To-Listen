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
import  Test2Level1Graph  from './Test2Level1Graph.jsx';
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



shuffle(array);

console.log(array[0].frequency);
export default class Test2Level1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isCorrect: "Correct!",
			level: 1,
			test2:[]
			
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
	    var y = document.getElementById("submitDiv");
	    y.style.display="none";
        x.style.display="block";
		this.play();
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

	correct = (event) => {
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

  	filterA = (event) => {
		console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = "peaking";
	      filter.frequency.value = 200;
	      filter.Q.value = 1;
	      filter.gain.value = 6;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = "peaking";
	      filter.frequency.value = 200;
	      filter.Q.value = 1;
	      filter.gain.value = 6;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterB = (event) => {
		console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = "peaking";
	      filter.frequency.value = 2000;
	      filter.Q.value = 1;
	      filter.gain.value = 6;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = "peaking";
	      filter.frequency.value = 2000;
	      filter.Q.value = 1;
	      filter.gain.value = 6;
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
  		if(this.state.test2[(this.state.test2.length)-1].Test2Attempts == null) {
			Test2Attempts = 0;
		} else {
			Test2Attempts = this.state.test2[(this.state.test2.length)-1].Test2Attempts;
		}
		if(this.state.test2[(this.state.test2.length)-1].Test2TotalCorrect == null) {
			Test2TotalCorrect = 0;
		} else {
			Test2TotalCorrect = this.state.test2[(this.state.test2.length)-1].Test2TotalCorrect;
		}
		if(this.state.test2[(this.state.test2.length)-1].Test2TotalWrong == null) {
			Test2TotalWrong = 0;
		} else {
			Test2TotalWrong = this.state.test2[(this.state.test2.length)-1].Test2TotalWrong;
		}
		if(this.state.test2[(this.state.test2.length)-1].Test2Level1CorrectNumber == null) {
			Test2Level1CorrectNumber = 0;
		} else {
			Test2Level1CorrectNumber = this.state.test2[(this.state.test2.length)-1].Test2Level1CorrectNumber;
		}
		if(this.state.test2[(this.state.test2.length)-1].Test2Level1WrongNumber == null) {
			Test2Level1WrongNumber = 0;
		} else {
			Test2Level1WrongNumber = this.state.test2[(this.state.test2.length)-1].Test2Level1WrongNumber;
		}
  		Test2Attempts += 1;
    	if(this.state.isCorrect == "Correct") {
    		Test2TotalCorrect += 1;
    		Test2Level1WrongNumber = 0;
    		if(this.state.test2[(this.state.test2.length)-1].Test2Level1CorrectNumber == undefined) {
				Test2Level1CorrectNumber = 1;
			} else {
				console.log("here");
				Test2Level1CorrectNumber=(this.state.test2[(this.state.test2.length)-1].Test2Level1CorrectNumber) +1;
			}

			if((Test2Level1CorrectNumber % 3) == 1) {
				Meteor.call('test2.Test2Level1Insert',Test2Level1CorrectNumber, Test2Level1WrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				setTimeout(() => history.push('/Dashboard'), 0); //go forward here
			} else {
				Meteor.call('test2.Test2Level1Insert',Test2Level1CorrectNumber, Test2Level1WrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				setTimeout(() => window.location.reload(), 0);
			}
    	} else {
    		Test2TotalWrong += 1;
    		Test2Level1CorrectNumber = 0;
    		if(this.state.test2[(this.state.test2.length)-1].Test2Level1WrongNumber == undefined) {
				Test2Level1WrongNumber = 1;
			} else {
				console.log("here");
				Test2Level1WrongNumber=(this.state.test2[(this.state.test2.length)-1].Test2Level1WrongNumber) +1;
			}

			if((Test2Level1WrongNumber % 3) == 1) {
				Meteor.call('test2.Test2Level1Insert',Test2Level1CorrectNumber, Test2Level1WrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				setTimeout(() => history.push('/Dashboard'), 0); //go back here
			} else {
				Meteor.call('test2.Test2Level1Insert',Test2Level1CorrectNumber, Test2Level1WrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				setTimeout(() => window.location.reload(), 0);
			}
    	}
    	
  	}

  	onSubmit = (event) => {
  		event.preventDefault();
  		var choice = document.forms[0];
  		var x = document.getElementById("entryDiv");
	    var y = document.getElementById("submitDiv");
  		for (i = 0; i < choice.length; i++) {
        	if (choice[i].checked) {
            	console.log(choice[i].value);
            	if(choice[i].value == array[0].name) {
            		this.stop();
            		this.setState({isCorrect: "Correct"});
            		x.style.display="none";
            		y.style.display="block";
	        	} else {
	        		this.stop();
	        		this.setState({isCorrect: "Wrong"});
	        		x.style.display="none";
            		y.style.display="block";
	        	}
        	}

    	}
  	}

  	test2how = (event) => {
  		console.log(this.state.test2[(this.state.test2.length)-1]);
  	}

	
  	render() {
  		return(
			<div>
				<PrivateHeader title="Level 1"/>
				<button onClick = {this.stop}><Link to='/Dashboard'>Dashboard</Link></button>
				<Test2Level1Graph/>
					<div id="entryDiv">
						
						<p>Use Radio!</p>
						<form id="form" onSubmit = {this.onSubmit}>
							<input type = "radio" name = "choice" value= "A"/>A
							<input type = "radio" name = "choice" value= "B"/>B
							<button id = "submit"> Submit! </button>
						</form>
						<button onClick={this.correct}>EQ</button>
						<button onClick={this.flat}>Flat</button>
						<button onClick={this.play}>Play/Pause</button>
						<button onClick={this.stop}>Stop</button>
						<button onClick={this.test2how}>Values</button>
					</div>
						
					<div id="submitDiv">
						<p>{this.state.isCorrect}</p>
						
						<button onClick = {this.filterA}>A</button>
						<button onClick = {this.filterB}>B</button>
						<button onClick={this.flat}>Flat</button>
						<button onClick={this.play}>Play/Pause</button>
						<button onClick={this.stop}>Stop</button>
						<button onClick={this.test2how}>Values</button>
						<div>
							<button onClick={this.onModalOk}>OK</button>
						</div>
					</div>
			</div>
		)
  	}
	
}