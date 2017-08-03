import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Test3 } from '../../api/Test3';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import createBrowserHistory from 'history/createBrowserHistory';
import { audioContext } from '../Dashboard';
import  Test3Level6Graph  from './Test3Level6Graph.jsx';
import Modal from 'react-modal';
//For React Router
const history = createBrowserHistory({forceRefresh: true});

//Level Variables
var Test3Level6CorrectNumber = 0;
var Test3Level6WrongNumber = 0;
var incompleteLevel = 6;
var Test3Attempts = 0;
var Test3TotalCorrect = 0;
var Test3TotalWrong = 0;
var level = 6;
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
		type: "peaking",
		frequency: 25,
		q: 1,
		gain: -6
	}, 
	{
		name: "B",
		type: "peaking",
		frequency: 65,
		q: 1,
		gain: -6
	},
	{
		name: "C",
		type: "peaking",
		frequency: 190,
		q: 1,
		gain: -6
	},
	{
		name: "D",
		type: "peaking",
		frequency: 550,
		q: 1,
		gain: -6
	},
	{
		name: "E",
		type: "peaking",
		frequency: 1500,
		q: 1,
		gain: -6
	},
	{
		name: "F",
		type: "peaking",
		frequency: 4500,
		q: 1,
		gain: -6
	},
	{
		name: "G",
		type: "peaking",
		frequency: 11000,
		q: 1,
		gain: -6
	}
]

var newArray = array.slice();

shuffle(array);

console.log(array[0].frequency);


export default class Test3Level6 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			isCorrect: "Correct!",
			level: 6,
			test3:[],
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
		this.Test3Tracker = Tracker.autorun(() => {
			Meteor.subscribe('test3');
			const test3 = Test3.find({userId: Meteor.userId()}).fetch();
			this.setState({ test3 });
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
		this.Test3Tracker.stop();
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
	      filter.Q.value = newArray[4].q;
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
  		if(this.state.test3[(this.state.test3.length)-1].Test3Attempts == null) {
			Test3Attempts = 0;
		} else {
			Test3Attempts = this.state.test3[(this.state.test3.length)-1].Test3Attempts;
		}
		if(this.state.test3[(this.state.test3.length)-1].Test3TotalCorrect == null) {
			Test3TotalCorrect = 0;
		} else {
			Test3TotalCorrect = this.state.test3[(this.state.test3.length)-1].Test3TotalCorrect;
		}
		if(this.state.test3[(this.state.test3.length)-1].Test3TotalWrong == null) {
			Test3TotalWrong = 0;
		} else {
			Test3TotalWrong = this.state.test3[(this.state.test3.length)-1].Test3TotalWrong;
		}
		if(this.state.test3[(this.state.test3.length)-1].Test3Level6CorrectNumber == null) {
			Test3Level6CorrectNumber = 0;
		} else {
			Test3Level6CorrectNumber = this.state.test3[(this.state.test3.length)-1].Test3Level6CorrectNumber;
		}
		if(this.state.test3[(this.state.test3.length)-1].Test3Level6WrongNumber == null) {
			Test3Level6WrongNumber = 0;
		} else {
			Test3Level6WrongNumber = this.state.test3[(this.state.test3.length)-1].Test3Level6WrongNumber;
		}
  		Test3Attempts += 1;
    	if(this.state.isCorrect == "Correct") {
    		Test3TotalCorrect += 1;
    		Test3Level6WrongNumber = 0;
    		if(this.state.test3[(this.state.test3.length)-1].Test3Level6CorrectNumber == undefined) {
				Test3Level6CorrectNumber = 1;
			} else {
				console.log("here");
				Test3Level6CorrectNumber=(this.state.test3[(this.state.test3.length)-1].Test3Level6CorrectNumber) +1;
			}

			if((Test3Level6CorrectNumber % 3) == 0) {
				incompleteLevel = 7;
				Meteor.call('test3.Test3Level6Insert',Test3Level6CorrectNumber, Test3Level6WrongNumber, incompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong);
				setTimeout(() => history.push('/Test3Level7'), 0); //go forward here
			} else {
				incompleteLevel = 6;
				Meteor.call('test3.Test3Level6Insert',Test3Level6CorrectNumber, Test3Level6WrongNumber, incompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong);
				setTimeout(() => window.location.reload(), 0);
			}
    	} else {
    		Test3TotalWrong += 1;
    		Test3Level6CorrectNumber = 0;
    		if(this.state.test3[(this.state.test3.length)-1].Test3Level6WrongNumber == undefined) {
				Test3Level6WrongNumber = 1;
			} else {
				console.log("here");
				Test3Level6WrongNumber=(this.state.test3[(this.state.test3.length)-1].Test3Level6WrongNumber) +1;
			}

			if((Test3Level6WrongNumber % 3) == 0) {
				incompleteLevel = 5;
				Meteor.call('test3.Test3Level6Insert',Test3Level6CorrectNumber, Test3Level6WrongNumber, incompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong);
				setTimeout(() => history.push('/Test3Level5'), 0); //go back here
			} else {
				incompleteLevel = 6;
				Meteor.call('test3.Test3Level6Insert',Test3Level6CorrectNumber, Test3Level6WrongNumber, incompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong);
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

  	Test3show = (event) => {
  		console.log(this.state.test3[(this.state.test3.length)-1]);
  	}

	
  	render() {
  		var corno;
  		var wrongno;
  		if(this.state.test3[(this.state.test3.length)-1]) {
  			corno = this.state.test3[(this.state.test3.length)-1].Test3Level6CorrectNumber;
  			wrongno = this.state.test3[(this.state.test3.length)-1].Test3Level6WrongNumber;
  		} else {
  			corno = 0;
  			wrongno = 0;
  		}
  		return(
			<div>
				<PrivateHeader title="Level 6"/>
				<div>
					<div>
						<div className = "chartBox">
							<Test3Level6Graph array={this.state.graphArray}/>
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