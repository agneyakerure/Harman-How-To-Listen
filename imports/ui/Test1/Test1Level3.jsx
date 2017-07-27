import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Links } from '../../api/links';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh: true});
var wrongNumber = 0;
var correctNumber = 0;
incompleteLevel = 3;
var Test1Attempts;
var Test1TotalCorrect;
var Test1TotalWrong;
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
var check = [];
var divstyle = [];
var simpleArray = [];
var answer =[3,2,1,0];

var tracks = ['./audio/track1.wav', './audio/track2.wav', './audio/track3.wav', './audio/track4.wav'];
var startOffset = 0;
var startTime = 0;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioContext.createGain();
var source;
var request = new XMLHttpRequest();
var buf;
var isPlaying = false;
var isConnectedToFilter = false;
var filter = audioContext.createBiquadFilter();
filter.frequency.value=22050;
gain.gain.value = 0.5;

export default class Test1Level3 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstSlider:0,
			secondSlider: 0,
			thirdSlider: 0,
			fourthSlider: 0,
			level: 3,
			values:[],
			slidervals: [{
		       index: 0,
		       value: 0
		    },
		    {
		       index: 1,
		       value: 0
		    },
		    {
		    	index: 2,
		    	value: 0
		    },
		    {
		    	index: 3,
		    	value: 0
		    }]
		};
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.state.values[(this.state.values.length)-1].Test1Attempts == null) {
			Test1Attempts = 0;
		} else {
			Test1Attempts = this.state.values[(this.state.values.length)-1].Test1Attempts;
		}
		if(this.state.values[(this.state.values.length)-1].Test1TotalCorrect == null) {
			Test1TotalCorrect = 0;
		} else {
			Test1TotalCorrect = this.state.values[(this.state.values.length)-1].Test1TotalCorrect;
		}
		if(this.state.values[(this.state.values.length)-1].Test1TotalWrong == null) {
			Test1TotalWrong = 0;
		} else {
			Test1TotalWrong = this.state.values[(this.state.values.length)-1].Test1TotalWrong;
		}
		Test1Attempts +=1;
		const value1 = this.state.slidervals[0].value;
		const value2 = this.state.slidervals[1].value;
		const value3 = this.state.slidervals[2].value;
		const value4 = this.state.slidervals[3].value;
		var a = document.getElementById('Level1Slider1');
		var b = document.getElementById('Level1Slider2');
		var c = document.getElementById('Level1Slider3');
		var d = document.getElementById('Level1Slider4');
		correctNumber=0
		wrongNumber = 0;
		var newArr = _.sortBy(this.state.slidervals, 'value', function(n) {
    		return Math.sin(n);
    	});
		this.forceUpdate.bind(form);
    	console.log(newArr);
    
    	for(var i =0; i< newArr.length; i++) {
	      		check[i] = newArr[i].index;
	    }
	    if(_.isEqual(check, answer)) {
	    	Test1TotalCorrect +=1;
			// console.log("Big Correct Value which is being checked: ",this.state.values[(this.state.values.length)-1].Test1Level1CorrectNumber);
			if(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber >= 2) {
				console.log("Answer is correct :-D");
				incompleteLevel = 0;
				if(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber == null)
				{
					correctNumber = 1;
					wrongNumber = 0;
				} else {
					correctNumber=Number(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber) +1;
					wrongNumber = 0;
				}
				Meteor.call('links.insert4',value1, value2, value3, value4, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong);
				this.setState({wrongNumber: 0});
				setTimeout(() => history.push('/Dashboard'), 0);
			} else {
				console.log("Answer is correct :-D");
				// this.setState({attemptNumber: this.state.attemptNumber + 1});
				if(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber == null)
				{
					correctNumber = 1;
					wrongNumber = 0;
				} else {
					correctNumber=Number(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber) +1;
					wrongNumber = 0;
				}
				Meteor.call('links.insert4',value1, value2, value3, value4, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong);
				this.setState({wrongNumber: 0});
			}
			setTimeout(() => window.location.reload(), 0);
			
	    } else {
			Test1TotalWrong +=1;
			// console.log("WrongNumber: ",this.state.values[(this.state.values.length)-1].Test1Level1WrongNumber);
			// setTimeout(() => window.location.reload(), 0);
			// window.location.reload();	
			if(this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber >= 2) {
				console.log("Answer is incorrect :-(");
				incompleteLevel = 3;
				if(this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber == null)
				{
					correctNumber = 0;
					wrongNumber = 1;
				} else {
					wrongNumber=Number(this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber) +1;
					correctNumber = 0;
				}
				Meteor.call('links.insert4',value1, value2, value3, value4, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong);
				this.setState({correctNumber: 0});
				setTimeout(() => history.push('/Test1Level2'), 0);
			} else {
				console.log("Answer is incorrect :-(");
				// this.setState({attemptNumber: this.state.attemptNumber + 1});
				if(this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber == null)
				{
					correctNumber = 0;
					wrongNumber = 1;
				} else {
					wrongNumber=Number(this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber) +1;
					correctNumber = 0;
				}
				Meteor.call('links.insert4',value1, value2, value3, value4, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong);
				this.setState({wrongNumber: 0});
			}
			setTimeout(() => window.location.reload(), 0);
	    }

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
	    var a = document.getElementById('redSlider');
	    var b = document.getElementById('greenSlider');
	    var c = document.getElementById('blueSlider');
	    var d = document.getElementById('yellowSlider');
	    a.style.display = 'none';
	    b.style.display = 'none';
	    c.style.display = 'none';
	    d.style.display = 'none';
	    simpleArray[0] = {
	    	bar: a,
	    	effect: this.lowpass4
	    };
	    simpleArray[1] = {
	    	bar: b,
	    	effect: this.lowpass3
	    };
	    simpleArray[2] = {
	    	bar: c,
	    	effect: this.lowpass2
	    };
	    simpleArray[3] = {
	    	bar: d,
	    	effect: this.lowpass1
	    };
	    shuffle(simpleArray);
	    incompleteLevel = 3;

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

	lowpass1 = (event) => {
	    if(isConnectedToFilter) {
	      filter.type = 'lowpass';
	      filter.frequency.value = 440;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = 'lowpass';
	      filter.frequency.value = 440;
	      isConnectedToFilter = true;
	   		}
  	}

  	lowpass2 = (event) => {
	    if(isConnectedToFilter) {
	      filter.type = 'lowpass';
	      filter.frequency.value = 1000;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = 'lowpass';
	      filter.frequency.value = 1000;
	      isConnectedToFilter = true;
	    	}
  	}

  	lowpass3 = (event) => {
	    if(isConnectedToFilter) {
	      filter.type = 'lowpass';
	      filter.frequency.value = 2500;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = 'lowpass';
	      filter.frequency.value = 2500;
	      isConnectedToFilter = true;
	    	}
  	}

  	lowpass4 = (event) => {
	    if(isConnectedToFilter) {
	      filter.type = 'lowpass';
	      filter.frequency.value = 4000;
	      isConnectedToFilter = true;
	    }
	    else {
	      source.connect(filter);
	      filter.connect(gain);
	      filter.type = 'lowpass';
	      filter.frequency.value = 4000;
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

	handleFirstSlider = (event, value) => {
		const value1 = this.refs.slider1.value;
    	this.setState({
    		firstSlider: Number(value1), 
    	});
    	var stateCopy = Object.assign({}, this.state.slidervals);
    	stateCopy[0].value = Number(this.state.firstSlider);
    	this.setState(stateCopy);
  	};

  	handleSecondSlider = (event, value) => {
		const value2 = this.refs.slider2.value;
    	this.setState({
    		secondSlider: Number(value2), 
    	});
    	var stateCopy = Object.assign({}, this.state.slidervals);
    	stateCopy[1].value = Number(this.state.secondSlider);
    	this.setState(stateCopy);
  	};

  	handleThirdSlider = (event, value) => {
		const value3 = this.refs.slider3.value;
    	this.setState({
    		thirdSlider: Number(value3), 
    	});
    	var stateCopy = Object.assign({}, this.state.slidervals);
    	stateCopy[2].value = Number(this.state.thirdSlider);
    	this.setState(stateCopy);
  	};
  	handleFourthSlider = (event, value) => {
		const value4 = this.refs.slider4.value;
    	this.setState({
    		fourthSlider: Number(value4), 
    	});
    	var stateCopy = Object.assign({}, this.state.slidervals);
    	stateCopy[3].value = Number(this.state.fourthSlider);
    	this.setState(stateCopy);
  	};

  	clickRed = (event) => {
  		simpleArray[0].effect();
    	simpleArray[0].bar.style.display = 'block';
    	simpleArray[1].bar.style.display = 'none';
    	simpleArray[2].bar.style.display = 'none';
    	simpleArray[3].bar.style.display = 'none';
 	};
  	clickGreen = (event) => {
  		simpleArray[1].effect();
    	simpleArray[1].bar.style.display = 'block';
    	simpleArray[0].bar.style.display = 'none';
    	simpleArray[2].bar.style.display = 'none';
    	simpleArray[3].bar.style.display = 'none';
 	};
  	clickBlue = (event) => {
  		simpleArray[2].effect();
    	simpleArray[2].bar.style.display = 'block';
    	simpleArray[1].bar.style.display = 'none';
    	simpleArray[0].bar.style.display = 'none';
    	simpleArray[3].bar.style.display = 'none';
 	};
  	clickYellow = (event) => {
  		simpleArray[3].effect();
    	simpleArray[3].bar.style.display = 'block';
    	simpleArray[1].bar.style.display = 'none';
    	simpleArray[0].bar.style.display = 'none';
    	simpleArray[2].bar.style.display = 'none';
 	};


  	clickZZZ = (event) => {
  		if(this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber == null || this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber == null) {
			var correctNumber = 0;
			var wrongNumber = 0;
			console.log("CorrectNumber: ",correctNumber);
			console.log("WrongNumber  : ",wrongNumber);
		} else {
			console.log("CorrectNumber: ",this.state.values[(this.state.values.length)-1].Test1Level3CorrectNumber);
			console.log("WrongNumber  : ",this.state.values[(this.state.values.length)-1].Test1Level3WrongNumber);
		}
		console.log("incompleteLevel: ",this.state.values[(this.state.values.length)-1].incompleteLevel);
	}
  	render() {
  		return(
			<div>
				<PrivateHeader title="Level 3"/>
				<div>
					<p>Use Slider</p>
					<form onSubmit={this.onSubmit.bind(this)} id="form">
						<div className = "slider1" id="redSlider">
							<input type="range" ref="slider1" min="0" max="10" id="Level3Slider1" className="Level3Slider1" value={this.state.firstSlider, this.state.slidervals[0].value} onChange={this.handleFirstSlider.bind(this)}/>
						</div>
						<div className = "slider2" id="greenSlider">
							<input type="range" ref="slider2" min="0" max="10" id="Level3Slider2" className="Level3Slider2" value={this.state.secondSlider, this.state.slidervals[1].value} onChange={this.handleSecondSlider.bind(this)}/>
						</div>
						<div className = "slider3" id="blueSlider">
							<input type="range" ref="slider3" min="0" max="10" id="Level3Slider3" className="Level3Slider3" value={this.state.thirdSlider, this.state.slidervals[2].value} onChange={this.handleThirdSlider.bind(this)}/>
						</div>
						<div className = "slider4" id="yellowSlider">
							<input type="range" ref="slider4" min="0" max="10" id="Level3Slider4" className="Level3Slider4" value={this.state.fourthSlider, this.state.slidervals[3].value} onChange={this.handleFourthSlider.bind(this)}/>
						</div>
						<button id="submit">Submit!</button>
					</form>
					{this.state.slidervals[0].value} - {this.state.slidervals[1].value} - {this.state.slidervals[2].value} - {this.state.slidervals[3].value}
					<button onClick={this.clickRed}>Red</button>
					<button onClick={this.clickGreen}>Green</button>
					<button onClick={this.clickBlue}>Blue</button>	
					<button onClick={this.clickYellow}>Yellow</button>
					<button onClick={this.flat}>Flat</button>
					<button onClick={this.play}>Play/Pause</button>
					<button onClick={this.stop}>Stop</button>

				</div>
				<button onClick = {this.stop}><Link to='/Dashboard'>Dashboard</Link></button>
			</div>
		)
  	}
	
}