import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Links } from '../api/links';
import { Test2 } from '../api/Test2';
import { Test3 } from '../api/Test3';
import PrivateHeader from './PrivateHeader';

Test1Links = ['/Test1Level0', '/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
Test2Links = ['/Test2Level0', '/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10'];
Test3Links = ['/Test3Level0', '/Test3Level1', '/Test3Level2', '/Test3Level3', '/Test3Level4', '/Test3Level5', '/Test3Level6', '/Test3Level7', '/Test3Level8', '/Test3Level9', '/Test3Level10'];
//Test4Links = ['/Test4Level0', '/Test4Level1', '/Test4Level2', '/Test4Level3', '/Test4Level4', '/Test4Level5', '/Test4Level6', '/Test4Level7', '/Test4Level8', '/Test4Level9', '/Test4Level10'];
//Test5Links = ['/Test5Level0', '/Test5Level1', '/Test5Level2', '/Test5Level3', '/Test5Level4', '/Test5Level5', '/Test5Level6', '/Test5Level7', '/Test5Level8', '/Test5Level9', '/Test5Level10'];

export var audioContext = new (window.AudioContext || window.webkitAudioContext)();

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [],
			test2: [],
			test3: [],
			test3: [],

			Test1Link: Test1Links[0],
			Test2Link: Test2Links[0],
			Test3Link: Test3Links[0],

			Test1Level: 0,
			Test1Attempts: 0,
			Test1Correct: 0,

			Test2Level: 0,
			Test2Attempts: 0,
			Test2Correct: 0,

			Test3Level: 0,
			Test3Attempts: 0,
			Test3Correct: 0,
		}
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('values');
			Meteor.subscribe('test2');
			Meteor.subscribe('test3');
			const values = Links.find({userId: Meteor.userId()}).fetch();
			const test2 = Test2.find({userId: Meteor.userId()}).fetch();
			const test3 = Test3.find({userId: Meteor.userId()}).fetch();
			this.setState({ values });
			this.setState({ test2 });
			this.setState({ test3 });
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
		}
		if(this.state.test2[(this.state.test2.length)-1]) {
			this.setState({Test2Attempts: this.state.test2[(this.state.test2.length)-1].Test2Attempts});
			this.setState({Test2Correct: this.state.test2[(this.state.test2.length)-1].Test2TotalCorrect});
		}
		if(this.state.test3[(this.state.test3.length)-1]) {
			this.setState({Test3Attempts: this.state.test3[(this.state.test3.length)-1].Test3Attempts});
			this.setState({Test3Correct: this.state.test3[(this.state.test3.length)-1].Test3TotalCorrect});
		}

		//START ADDING TEST 3 HERE


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
				case 5: this.setState({Test2Link: Test2Links[5]});
						this.setState({Test2Level: " 5 "});
						//console.log("Case 4");
						break;

				case 6: this.setState({Test2Link: Test2Links[6]});
						this.setState({Test2Level: " 6 "});
						//console.log("Case 4");
						break;

				case 7: this.setState({Test2Link: Test2Links[7]});
						this.setState({Test2Level: " 7 "});
						//console.log("Case 4");
						break;

				case 8: this.setState({Test2Link: Test2Links[8]});
						this.setState({Test2Level: " 8 "});
						//console.log("Case 4");
						break;

				case 9: this.setState({Test2Link: Test2Links[9]});
						this.setState({Test2Level: " 9 "});
						//console.log("Case 4");
						break;

				case 10: this.setState({Test2Link: Test2Links[10]});
						this.setState({Test2Level: " 10 "});
						//console.log("Case 4");
						break;

				default: this.setState({Test2Link: Test2Links[0]});
						 this.setState({Test2Level: " 0 "});
						 console.log("Case default");
						
			}
		}


		if(!this.state.test3[(this.state.test3.length)-1]) {
			console.log("here - undefined hai!");
			this.setState({Test3Link: '/Test3Level0'});
			this.setState({Test3Correct: 0});
			this.setState({Test3Attempts: 0});
		} else {
				console.log("INCOMPLETE LEVEL: ", this.state.test3[(this.state.test3.length)-1].Test3IncompleteLevel);
				switch(this.state.test3[(this.state.test3.length)-1].Test3IncompleteLevel) {
				case 0: this.setState({Test3Link: Test3Links[0]});
						this.setState({Test3Level: " 0 "});
						console.log("Case 0");
						break;

				case 1: this.setState({Test3Link: Test3Links[1]});
						this.setState({Test3Level: " 1 "});
						console.log("Case 1");
						break;
						
				case 2: this.setState({Test3Link: Test3Links[2]});
						this.setState({Test3Level: " 2 "});
						console.log("Case 2");
						break;
						
				case 3: this.setState({Test3Link: Test3Links[3]});
						this.setState({Test3Level: " 3 "});
						console.log("Case 3");
						break;
						
				case 4: this.setState({Test3Link: Test3Links[4]});
						this.setState({Test3Level: " 4 "});
						console.log("Case 4");
						break;
				case 5: this.setState({Test3Link: Test3Links[5]});
						this.setState({Test3Level: " 5 "});
						//console.log("Case 4");
						break;

				case 6: this.setState({Test3Link: Test3Links[6]});
						this.setState({Test3Level: " 6 "});
						//console.log("Case 4");
						break;

				case 7: this.setState({Test3Link: Test3Links[7]});
						this.setState({Test3Level: " 7 "});
						//console.log("Case 4");
						break;

				case 8: this.setState({Test3Link: Test3Links[8]});
						this.setState({Test3Level: " 8 "});
						//console.log("Case 4");
						break;

				case 9: this.setState({Test3Link: Test3Links[9]});
						this.setState({Test3Level: " 9 "});
						//console.log("Case 4");
						break;

				case 10: this.setState({Test3Link: Test3Links[10]});
						this.setState({Test3evel: " 10 "});
						//console.log("Case 4");
						break;

				default: this.setState({Test3Link: Test3Links[0]});
						 this.setState({Test3Level: " 0 "});
						 console.log("Case default");
						
			}
		}
		
	}

  	render() {

    	return (
        	<div>
        		<PrivateHeader title="DashBoard"/>
        		<div className = "page-content">
	        		<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test1Link}>Test1</Link> 
	          			<span className = "item--level">Level: {this.state.Test1Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test1Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test1Correct)/(this.state.Test1Attempts) * 100)/100}% </span>
	          		</div>	

	          		<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test2Link}>Test2</Link> 
	          			<span className = "item--level">Level: {this.state.Test2Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test2Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test2Correct)/(this.state.Test2Attempts) * 100)/100}% </span>
	          		</div>	

	          		<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test3Link}>Test3</Link> 
	          			<span className = "item--level">Level: {this.state.Test3Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test3Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test3Correct)/(this.state.Test3Attempts) * 100)/100}% </span>
	          		</div>
          		</div>

        	</div>
    );
  }
}