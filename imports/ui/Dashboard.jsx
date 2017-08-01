import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Links } from '../api/links';
import { Test2 } from '../api/Test2';
import PrivateHeader from './PrivateHeader';

Test1Links = ['/Test1Level0', '/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
Test2Links = ['/Test2Level0', '/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10'];

export var audioContext = new (window.AudioContext || window.webkitAudioContext)();

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [],
			test2: [],
			Test1Link: Test1Links[0],
			Test2Link: Test2Links[0],
			Test1Level: 0,
			Test1Attempts: 0,
			Test1Correct: 0,
			Test2Level: 0,
			Test2Attempts: 0,
			Test2Correct: 0,
		}
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('values');
			Meteor.subscribe('test2');
			const values = Links.find({userId: Meteor.userId()}).fetch();
			const test2 = Test2.find({userId: Meteor.userId()}).fetch();
			this.setState({ values });
			this.setState({ test2 });
		});
		setTimeout(() => this.clickme(), 350);
	}

	componentWillUnmount() {
		this.linksTracker.stop();
	}

	clickme = () => {
		if(this.state.values[(this.state.values.length)-1]) {
			this.setState({Test1Attempts: this.state.values[(this.state.values.length)-1].Test1Attempts});
			this.setState({Test1Correct: this.state.values[(this.state.values.length)-1].Test1TotalCorrect});
			
			this.setState({Test2Attempts: this.state.test2[(this.state.test2.length)-1].Test2Attempts});
			this.setState({Test2Correct: this.state.test2[(this.state.test2.length)-1].Test2TotalCorrect});
		}


		if(!this.state.values[(this.state.values.length)-1]) {
			console.log("here!");
			this.setState({Test1Link: '/Test1Level0'});
			this.setState({Test1Correct: 0});
			this.setState({Test1Attempts: 0});
		} else {
				console.log("INCOMPLETE LEVEL: ", this.state.values[(this.state.values.length)-1].incompleteLevel);
				switch(this.state.values[(this.state.values.length)-1].incompleteLevel) {
				case 0: this.setState({Test1Link: Test1Links[0]});
						this.setState({Test1Level: " 0 "});
						console.log("Case 0");
						break;

				case 1: this.setState({Test1Link: Test1Links[1]});
						this.setState({Test1Level: " 1 "});
						console.log("Case 1");
						break;
						
				case 2: this.setState({Test1Link: Test1Links[2]});
						this.setState({Test1Level: " 2 "});
						console.log("Case 2");
						break;
						
				case 3: this.setState({Test1Link: Test1Links[3]});
						this.setState({Test1Level: " 3 "});
						console.log("Case 3");
						break;
						
				case 4: this.setState({Test1Link: Test1Links[4]});
						this.setState({Test1Level: " 4 "});
						console.log("Case 4");
						break;
				default: this.setState({Test1Link: Test1Links[0]});
						this.setState({Test1Level: " 0 "});
						console.log("Case default");
						
			}
		}

		
		if(!this.state.test2[(this.state.test2.length)-1]) {
			console.log("here!");
			this.setState({Test2Link: '/Test2Level0'});
			this.setState({Test2Correct: 0});
			this.setState({Test2Attempts: 0});
		} else {
				console.log("INCOMPLETE LEVEL: ", this.state.test2[(this.state.test2.length)-1].Test2IncompleteLevel);
				switch(this.state.test2[(this.state.test2.length)-1].Test2IncompleteLevel) {
				case 0: this.setState({Test2Link: Test2Links[0]});
						this.setState({Test2Level: " 0 "});
						console.log("Case 0");
						break;

				case 1: this.setState({Test2Link: Test2Links[1]});
						this.setState({Test2Level: " 1 "});
						console.log("Case 1");
						break;
						
				case 2: this.setState({Test2Link: Test2Links[2]});
						this.setState({Test2Level: " 2 "});
						console.log("Case 2");
						break;
						
				case 3: this.setState({Test2Link: Test2Links[3]});
						this.setState({Test2Level: " 3 "});
						console.log("Case 3");
						break;
						
				case 4: this.setState({Test2Link: Test2Links[4]});
						this.setState({Test2Level: " 4 "});
						console.log("Case 4");
						break;
				default: this.setState({Test2Link: Test2Links[0]});
						 this.setState({Test2Level: " 0 "});
						 console.log("Case default");
						
			}
		}
		
	}

  	render() {

    	return (
        	<div>
        		<PrivateHeader title="DashBoard"/>
        		<div>
          			<Link to={this.state.Test1Link}>Test1</Link> <span>Level: {this.state.Test1Level}</span><span>Trials: {this.state.Test1Attempts}</span> <span> Accuracy: {100*(this.state.Test1Correct)/(this.state.Test1Attempts)}% </span>
          		</div>	

          		<div>
          			<Link to={this.state.Test2Link}>Test2</Link> <span>Level: {this.state.Test2Level}</span><span>Trials: {this.state.Test2Attempts}</span> <span> Accuracy: {100*(this.state.Test2Correct)/(this.state.Test2Attempts)}% </span>
          		</div>	

        	</div>
    );
  }
}