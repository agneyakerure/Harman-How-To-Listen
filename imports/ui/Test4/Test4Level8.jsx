import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Test4 } from '../../api/Test4';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import createBrowserHistory from 'history/createBrowserHistory';
import { audioContext } from '../Dashboard';
import  Test4Level8Graph  from './Test4Level8Graph.jsx';
import Modal from 'react-modal';
//For React Router
const history = createBrowserHistory({forceRefresh: true});

//Level Variables
var Test4Level8CorrectNumber = 0;
var Test4Level8WrongNumber = 0;
var incompleteLevel = 8;
var Test4Attempts = 0;
var Test4TotalCorrect = 0;
var Test4TotalWrong = 0;
var level = 8;
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
		type: "lowpass",
		frequency: 45,
		q: -1,
		gain: -6
	}, 
	{
		name: "B",
		type: "lowpass",
		frequency: 100,
		q: -1,
		gain: -6
	},
	{
		name: "C",
		type: "lowpass",
		frequency: 200,
		q: -1,
		gain: -6
	},
	{
		name: "D",
		type: "lowpass",
		frequency: 500,
		q: -1,
		gain: -6
	},
	{
		name: "E",
		type: "lowpass",
		frequency: 1000,
		q: -1,
		gain: -6
	},
	{
		name: "F",
		type: "lowpass",
		frequency: 2000,
		q: -1,
		gain: -6
	},
	{
		name: "G",
		type: "lowpass",
		frequency: 3700,
		q: -1,
		gain: -6
	},
	{
		name: "H",
		type: "lowpass",
		frequency: 7000,
		q: -1,
		gain: -6
	},
	{
		name: "I",
		type: "lowpass",
		frequency: 15000,
		q: -1,
		gain: -6
	}
]

var newArray = array.slice();

shuffle(array);

console.log(array[0].frequency);


export default class Test4Level8 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			isCorrect: "Correct!",
			level: 8,
			test4:[],
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
	    var y = document.getElementById("submitDiv");
	    y.style.display="none";
        x.style.display="block";
		this.play();
		this.Test4Tracker = Tracker.autorun(() => {
			Meteor.subscribe('test4');
			const test4 = Test4.find({userId: Meteor.userId()}).fetch();
			this.setState({ test4 });
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
		this.Test4Tracker.stop();
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

  	filterC = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[2].type;
	      filter.frequency.value = newArray[2].frequency;
	      filter.Q.value = newArray[2].q;
	      filter.gain.value = newArray[2].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[2].type;
	      filter.frequency.value = newArray[2].frequency;
	      filter.Q.value = newArray[2].q;
	      filter.gain.value = newArray[2].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterD = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[3].type;
	      filter.frequency.value = newArray[3].frequency;
	      filter.Q.value = newArray[3].q;
	      filter.gain.value = newArray[3].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[3].type;
	      filter.frequency.value = newArray[3].frequency;
	      filter.Q.value = newArray[3].q;
	      filter.gain.value = newArray[3].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterE = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[4].type;
	      filter.frequency.value = newArray[4].frequency;
	      filter.Q.value = newArray[4].q;
	      filter.gain.value = newArray[4].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[4].type;
	      filter.frequency.value = newArray[4].frequency;
	      filter.Q.value = newArray[4].q;
	      filter.gain.value = newArray[4].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterF = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[5].type;
	      filter.frequency.value = newArray[5].frequency;
	      filter.Q.value = newArray[5].q;
	      filter.gain.value = newArray[5].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[5].type;
	      filter.frequency.value = newArray[5].frequency;
	      filter.Q.value = newArray[5].q;
	      filter.gain.value = newArray[5].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterG = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[6].type;
	      filter.frequency.value = newArray[6].frequency;
	      filter.Q.value = newArray[6].q;
	      filter.gain.value = newArray[6].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[6].type;
	      filter.frequency.value = newArray[6].frequency;
	      filter.Q.value = newArray[6].q;
	      filter.gain.value = newArray[6].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterH = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[7].type;
	      filter.frequency.value = newArray[7].frequency;
	      filter.Q.value = newArray[7].q;
	      filter.gain.value = newArray[7].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[7].type;
	      filter.frequency.value = newArray[7].frequency;
	      filter.Q.value = newArray[7].q;
	      filter.gain.value = newArray[7].gain;
	      isConnectedToFilter = true;
	   	}
  	}

  	filterI = (event) => {
		//console.log(array[0].frequency);
	    if(isConnectedToFilter) {
	      filter.type = newArray[8].type;
	      filter.frequency.value = newArray[8].frequency;
	      filter.Q.value = newArray[8].q;
	      filter.gain.value = newArray[8].gain;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = newArray[8].type;
	      filter.frequency.value = newArray[8].frequency;
	      filter.Q.value = newArray[8].q;
	      filter.gain.value = newArray[8].gain;
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
  		if(this.state.test4[(this.state.test4.length)-1].Test4Attempts == null) {
			Test4Attempts = 0;
		} else {
			Test4Attempts = this.state.test4[(this.state.test4.length)-1].Test4Attempts;
		}
		if(this.state.test4[(this.state.test4.length)-1].Test4TotalCorrect == null) {
			Test4TotalCorrect = 0;
		} else {
			Test4TotalCorrect = this.state.test4[(this.state.test4.length)-1].Test4TotalCorrect;
		}
		if(this.state.test4[(this.state.test4.length)-1].Test4TotalWrong == null) {
			Test4TotalWrong = 0;
		} else {
			Test4TotalWrong = this.state.test4[(this.state.test4.length)-1].Test4TotalWrong;
		}
		if(this.state.test4[(this.state.test4.length)-1].Test4Level8CorrectNumber == null) {
			Test4Level8CorrectNumber = 0;
		} else {
			Test4Level8CorrectNumber = this.state.test4[(this.state.test4.length)-1].Test4Level8CorrectNumber;
		}
		if(this.state.test4[(this.state.test4.length)-1].Test4Level8WrongNumber == null) {
			Test4Level8WrongNumber = 0;
		} else {
			Test4Level8WrongNumber = this.state.test4[(this.state.test4.length)-1].Test4Level8WrongNumber;
		}
  		Test4Attempts += 1;
    	if(this.state.isCorrect == "Correct") {
    		Test4TotalCorrect += 1;
    		Test4Level8WrongNumber = 0;
    		if(this.state.test4[(this.state.test4.length)-1].Test4Level8CorrectNumber == undefined) {
				Test4Level8CorrectNumber = 1;
			} else {
				console.log("here");
				Test4Level8CorrectNumber=(this.state.test4[(this.state.test4.length)-1].Test4Level8CorrectNumber) +1;
			}

			if((Test4Level8CorrectNumber % 3) == 0) {
				incompleteLevel = 9;
				Meteor.call('test4.Test4Level8Insert',Test4Level8CorrectNumber, Test4Level8WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => history.push('/Test4Level9'), 0); //go forward here
			} else {
				incompleteLevel = 8;
				Meteor.call('test4.Test4Level8Insert',Test4Level8CorrectNumber, Test4Level8WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => window.location.reload(), 0);
			}
    	} else {
    		Test4TotalWrong += 1;
    		Test4Level8CorrectNumber = 0;
    		if(this.state.test4[(this.state.test4.length)-1].Test4Level8WrongNumber == undefined) {
				Test4Level8WrongNumber = 1;
			} else {
				console.log("here");
				Test4Level8WrongNumber=(this.state.test4[(this.state.test4.length)-1].Test4Level8WrongNumber) +1;
			}

			if((Test4Level8WrongNumber % 3) == 0) {
				incompleteLevel = 7;
				Meteor.call('test4.Test4Level8Insert',Test4Level8CorrectNumber, Test4Level8WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => history.push('/Test4Level7'), 0); //go back here
			} else {
				incompleteLevel = 8;
				Meteor.call('test4.Test4Level8Insert',Test4Level8CorrectNumber, Test4Level8WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
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

	
  	render() {
  		var corno;
  		var wrongno;
  		if(this.state.test4[(this.state.test4.length)-1]) {
  			corno = this.state.test4[(this.state.test4.length)-1].Test4Level8CorrectNumber;
  			wrongno = this.state.test4[(this.state.test4.length)-1].Test4Level8WrongNumber;
  		} else {
  			corno = 0;
  			wrongno = 0;
  		}
  		return(
			<div>
				<PrivateHeader title="Level 2"/>
				<div>
					<div>
						<div className = "chartBox">
							<Test4Level8Graph array={this.state.graphArray}/>
						</div>
						<div className = "graph-form">
							<div id = "entryDiv">
								<div className = "score-card">
									Correct: {corno} &ensp; Wrong: {wrongno}
								</div>
								<div className = "media-buttons">
									<button className = "media-button" onClick={this.correct}>EQ</button>
									<button className = "media-button" onClick={this.flat}>Flat</button>
									<button className = "media-button" onClick={this.play}>Play/Pause</button>
									<button className = "media-button" onClick={this.stop}>Stop</button>
								</div>
								<form className = "radio-form" id = "form" onSubmit = {this.onSubmit}>
									<input type = "radio" name = "choice" value= "A"/>A
									<input type = "radio" name = "choice" value= "B"/>B
									<input type = "radio" name = "choice" value= "C"/>C
									<input type = "radio" name = "choice" value= "D"/>D
									<input type = "radio" name = "choice" value= "E"/>E
									<input type = "radio" name = "choice" value= "F"/>F
									<input type = "radio" name = "choice" value= "G"/>G
									<input type = "radio" name = "choice" value= "H"/>H
									<input type = "radio" name = "choice" value= "I"/>I
									<div className = "submit-button-contianer">
										<button className = "button--submit-button" id = "submit"> Submit! </button>
									</div>
								</form>

								<button className = "dashboard-link-button" onClick = {this.stop}><Link to='/Dashboard'>Dashboard</Link></button>
							</div>
							<div id="submitDiv">
								<div className = "isCorrectBox">
									<p className = "isCorrect"><b>{this.state.isCorrect}</b></p>
								</div>
								<div className = "media-button3-box">
									<button className = "media-button3" onClick = {this.filterA}>A</button>
									<button className = "media-button3" onClick = {this.filterB}>B</button>
									<button className = "media-button3" onClick = {this.filterC}>C</button>
									<button className = "media-button3" onClick = {this.filterD}>D</button>
									<button className = "media-button3" onClick = {this.filterE}>E</button>
									<button className = "media-button3" onClick = {this.filterF}>F</button>
									<button className = "media-button3" onClick = {this.filterG}>G</button>
									<button className = "media-button3" onClick = {this.filterH}>H</button>
									<button className = "media-button3" onClick = {this.filterI}>I</button>

								</div>
								<button className = "media-button" onClick={this.correct}>EQ</button>
								<button className = "media-button2" onClick = {this.flat}>Flat</button>
								<button className = "media-button2" onClick = {this.play}>Play/Pause</button>
								<button className = "media-button2" onClick = {this.stop}>Stop</button>
								<div className = "submit-button-contianer">
									<button className = "button--submit-button" onClick={this.onModalOk}>OK</button>
								</div>

								<div>
								<button className = "dashboard-link-button" onClick = {this.stop}><Link to = '/Dashboard'>Dashboard</Link></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
  	}
	
}