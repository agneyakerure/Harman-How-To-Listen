import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Test2 } from '../../api/Test2';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import ValuesList2 from '../ValueList2';
import { createContainer } from 'meteor/react-meteor-data';
import PrivateHeader from '../PrivateHeader';
import { audioContext } from '../Dashboard';
import createBrowserHistory from 'history/createBrowserHistory';



var startOffset = 0;
var startTime = 0;
var gain = audioContext.createGain();
var source;
var request = new XMLHttpRequest();
var buf;
var isPlaying = false;
var isConnectedToFilter = false;
var filter = audioContext.createBiquadFilter();
var dist = audioContext.createWaveShaper();
var dycomp = audioContext.createDynamicsCompressor();
var convolver = audioContext.createConvolver();
var binauralFIRNode = new BinauralFIR({
        audioContext: audioContext
    });
binauralFIRNode.HRTFDataset = hrtfs;
filter.frequency.value=22050;
gain.gain.value = 0.5;

for (var i = 0; i < hrtfs.length; i++) {
        var buffer = audioContext.createBuffer(2, 512, 44100);
        var bufferChannelLeft = buffer.getChannelData(0);
        var bufferChannelRight = buffer.getChannelData(1);
        for (var e = 0; e < hrtfs[i].fir_coeffs_left.length; e++) {
            bufferChannelLeft[e] = hrtfs[i].fir_coeffs_left[e];
            bufferChannelRight[e] = hrtfs[i].fir_coeffs_right[e];
        }
        hrtfs[i].buffer = buffer;
    }

const history = createBrowserHistory({forceRefresh: true});
var incompleteLevel = 0;
export default class Test2Level0 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstSlider:0,
			justCopied: false,
			answer: 5,
			attemptNumber: 0,
			level: 1,
			correctNumber: 0,
			wrongNumber: 0,
			test2:[]
		};
	}

	componentDidMount() {
		this.test2Tracker = Tracker.autorun(() => {
			Meteor.subscribe('test2');
			const test2 = Test2.find("").fetch();
			this.setState({ test2 });
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const value = this.state.firstSlider;
		incompleteLevel = 1;
		
		if(value == this.state.answer) {
			
			// console.log("Attempt Number: ", this.state.attemptNumber);
			// console.log("Correct Number: ", this.state.correctNumber);
			if(this.state.correctNumber == 2) {
				incompleteLevel = 1;
				console.log("Answer is correct :-D");
				this.setState({attemptNumber: this.state.attemptNumber + 1});
				this.setState({correctNumber: this.state.correctNumber + 1});
				this.setState({wrongNumber: 0});
				Meteor.call('test2.Test2Level0Insert',value, incompleteLevel);
				setTimeout(() => history.push('/Test2Level1'), 0);
			} else {
				incompleteLevel = 0;
				console.log("Answer is correct :-D");
				this.setState({attemptNumber: this.state.attemptNumber + 1});
				this.setState({correctNumber: this.state.correctNumber + 1});
				this.setState({wrongNumber: 0});
				Meteor.call('test2.Test2Level0Insert',value, incompleteLevel);
			}
			

		} else {
			console.log("Answer is incorrect :-(");
			this.setState({attemptNumber: this.state.attemptNumber + 1});
			this.setState({wrongNumber: this.state.wrongNumber + 1});
			this.setState({correctNumber: 0});
			// console.log("Attempt Number: ",  this.state.attemptNumber);
			// console.log("Wrong Number: ", this.state.wrongNumber);
			//window.location.reload();		
		}
	}

	componentWillUnmount() {
		
		audioContext.close();
	}

	buttonBoy = (event) => {
		event.preventDefault();
		dist.curve = this.makeDistortionCurve(0);
		
	}

	componentWillMount() {
		setTimeout(() => {
			window.history.forward()
		}, 0)
		window.onunload=function(){null};
	}

	handleFirstSlider = (event) => {
		event.preventDefault();
		const value = this.refs.slider1.value;
		this.setState({
			firstSlider: value, 
		});
	};

	play = (event) =>{
		
		if(isPlaying == true) {
			isPlaying = false;
			startOffset += audioContext.currentTime - startTime;
			source.stop();
		} 
		else {

			startTime = audioContext.currentTime;
			source = audioContext.createBufferSource();
			request.open('GET', './audio/traction.wav',  true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				var audioData = request.response;

				audioContext.decodeAudioData(audioData, function(buffer) {
					source.buffer = buffer;
					source.loop = true;
					source.connect(binauralFIRNode.input);
					binauralFIRNode.connect(audioContext.destination);
					// gain.connect(audioContext.destination);
					// convolver.connect(audioContext.destination);
					// source.start(0, startOffset % buffer.duration);
					binauralFIRNode.setPosition(0, 0, 1);
					
					
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

	makeDistortionCurve(amount) {
  		var k = typeof amount === 'number' ? amount : 50,
    	n_samples = 44100,
    	curve = new Float32Array(n_samples),
    	deg = Math.PI / 180,
    	i = 0,
    	x;
  		for ( ; i < n_samples; ++i ) {
    		x = i * 2 / n_samples - 1;
    		curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  		}
  		return curve;
	};

	stop = (event) => {

		source.stop(0);
		source.disconnect();
		isPlaying = false;
		startTime = 0;
		startOffset = 0;
		audioContext.close();

	}

	handleSlider = (event, value) => {
		gain.gain.value = value;
	};

	lowpass1 = (event) => {
		event.preventDefault();
		const value = this.refs.slider1.value;
		binauralFIRNode.setPosition(value, binauralFIRNode.getPosition().elevation, binauralFIRNode.getPosition().distance);
		binauralFIRNode.setPosition(binauralFIRNode.getPosition().azimuth, -40, binauralFIRNode.getPosition().distance);

	}

	lowpass2 = (event) => {


	}

	flat = (event) => {
		binauralFIRNode.setPosition(10, binauralFIRNode.getPosition().elevation, binauralFIRNode.getPosition().distance);
		binauralFIRNode.setPosition(binauralFIRNode.getPosition().azimuth, -40, binauralFIRNode.getPosition().distance);
		
	}
	render() {
		return(
			<div>
				<PrivateHeader title="Level 0"/>
				<div>
					<p>Use Slider</p>
					<form onSubmit={this.onSubmit.bind(this)}>
						<input type="range" step="0.5" ref="slider1" min="0" max="10" className="Level1Slider1" value={this.state.firstSlider} onChange={this.handleFirstSlider.bind(this)}/>					
						<button>Submit!</button>
					</form>
					{this.state.firstSlider}
					<button onClick={this.buttonBoy}>{this.state.justCopied ? 'Am I there?' : ':P'}</button>
					<button onClick={this.play}>Play/Pause</button>
					<button onClick={this.stop}>Stop</button>
					<button onClick={this.flat}>Flat</button>
					<button onClick={this.lowpass1}>Lowpass1</button>
					Level 0 : Attempts: {this.state.attemptNumber}, Wrong Streak: {this.state.wrongNumber}, Correct Streak: {this.state.correctNumber}
					<Link to='/Dashboard'>Dashboard</Link>
				</div>
			</div>
			)
	}
	
}