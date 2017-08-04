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
import  Test4Level1Graph  from './Test4Level1Graph.jsx';
import Modal from 'react-modal';
//For React Router
const history = createBrowserHistory({forceRefresh: true});

//Level Variables
var Test4Level1CorrectNumber = 0;
var Test4Level1WrongNumber = 0;
var incompleteLevel = 1;
var Test4Attempts = 0;
var Test4TotalCorrect = 0;
var Test4TotalWrong = 0;
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
	type: "lowpass",
	frequency: 200,
	q: -2,
	gain: 6
}, 
{
	name: "B",
	type: "lowpass",
	frequency: 3000,
	q: -2,
	gain: 6
}
]

var newArray = array.slice();

shuffle(array);

console.log(array[0].frequency);
export default class Test4Level1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isCorrect: "Correct!",
			level: 1,
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
		//console.log(array[0].frequency);
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
		if(this.state.test4[(this.state.test4.length)-1].Test4Level1CorrectNumber == null) {
			Test4Level1CorrectNumber = 0;
		} else {
			Test4Level1CorrectNumber = this.state.test4[(this.state.test4.length)-1].Test4Level1CorrectNumber;
		}
		if(this.state.test4[(this.state.test4.length)-1].Test4Level1WrongNumber == null) {
			Test4Level1WrongNumber = 0;
		} else {
			Test4Level1WrongNumber = this.state.test4[(this.state.test4.length)-1].Test4Level1WrongNumber;
		}
		Test4Attempts += 1;
		if(this.state.isCorrect == "Correct") {
			Test4TotalCorrect += 1;
			Test4Level1WrongNumber = 0;
			if(this.state.test4[(this.state.test4.length)-1].Test4Level1CorrectNumber == undefined) {
				Test4Level1CorrectNumber = 1;
			} else {
				console.log("here");
				Test4Level1CorrectNumber=(this.state.test4[(this.state.test4.length)-1].Test4Level1CorrectNumber) +1;
			}

			if((Test4Level1CorrectNumber % 3) == 0) {
				Meteor.call('test4.Test4Level1Insert',Test4Level1CorrectNumber, Test4Level1WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => history.push('/Test4Level2'), 0); //go forward here
			} else {
				Meteor.call('test4.Test4Level1Insert',Test4Level1CorrectNumber, Test4Level1WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => window.location.reload(), 0);
			}
		} else {
			Test4TotalWrong += 1;
			Test4Level1CorrectNumber = 0;
			if(this.state.test4[(this.state.test4.length)-1].Test4Level1WrongNumber == undefined) {
				Test4Level1WrongNumber = 1;
			} else {
				console.log("here");
				Test4Level1WrongNumber=(this.state.test4[(this.state.test4.length)-1].Test4Level1WrongNumber) +1;
			}

			if((Test4Level1WrongNumber % 3) == 0) {
				Meteor.call('test4.Test4Level1Insert',Test4Level1CorrectNumber, Test4Level1WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
				setTimeout(() => window.location.reload(), 0); //go back here
			} else {
				Meteor.call('test4.Test4Level1Insert',Test4Level1CorrectNumber, Test4Level1WrongNumber, incompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong);
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
  			corno = this.state.test4[(this.state.test4.length)-1].Test4Level1CorrectNumber;
  			wrongno = this.state.test4[(this.state.test4.length)-1].Test4Level1WrongNumber;
  		} else {
  			corno = 0;
  			wrongno = 0;
  		}
		return(
			<div>
				<PrivateHeader title="Level 1"/>
				<div>
					<div>
						<div className = "chartBox">
							<Test4Level1Graph array={this.state.graphArray}/>
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
								</div>
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