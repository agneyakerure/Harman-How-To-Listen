import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Links } from '../api/links';
import { Test2 } from '../api/Test2';
import { Test3 } from '../api/Test3';
import { Test4 } from '../api/Test4';
import PrivateHeader from './PrivateHeader';

Test1Links = ['/Test1Level0', '/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
Test2Links = ['/Test2Level0', '/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10'];
Test3Links = ['/Test3Level0', '/Test3Level1', '/Test3Level2', '/Test3Level3', '/Test3Level4', '/Test3Level5', '/Test3Level6', '/Test3Level7', '/Test3Level8', '/Test3Level9', '/Test3Level10'];
Test4Links = ['/Test4Level0', '/Test4Level1', '/Test4Level2', '/Test4Level3', '/Test4Level4', '/Test4Level5', '/Test4Level6', '/Test4Level7', '/Test4Level8', '/Test4Level9', '/Test4Level10'];
//Test5Links = ['/Test5Level0', '/Test5Level1', '/Test5Level2', '/Test5Level3', '/Test5Level4', '/Test5Level5', '/Test5Level6', '/Test5Level7', '/Test5Level8', '/Test5Level9', '/Test5Level10'];
//Test6Links = ['/Test6Level0', '/Test6Level1', '/Test6Level2', '/Test6Level3', '/Test6Level4', '/Test6Level5', '/Test6Level6', '/Test6Level7', '/Test6Level8', '/Test6Level9', '/Test6Level10'];

export var audioContext = new (window.AudioContext || window.webkitAudioContext)();

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [],
			test2: [],
			test3: [],
			test3: [],
			test4: [],
			//test5: [],
			//test6: [],

			Test1Link: Test1Links[0],
			Test2Link: Test2Links[0],
			Test3Link: Test3Links[0],
			Test4Link: Test4Links[0],
			//Test5Link: Test4Links[0],
			//Test6Link: Test4Links[0],

			Test1Level: 0,
			Test1Attempts: 0,
			Test1Correct: 0,

			Test2Level: 0,
			Test2Attempts: 0,
			Test2Correct: 0,

			Test3Level: 0,
			Test3Attempts: 0,
			Test3Correct: 0,

			Test4Level: 0,
			Test4Attempts: 0,
			Test4Correct: 0,

			// Test5Level: 0,
			// Test5Attempts: 0,
			// Test5Correct: 0,

			// Test6Level: 0,
			// Test6Attempts: 0,
			// Test6Correct: 0,
		}
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('values');
			Meteor.subscribe('test2');
			Meteor.subscribe('test3');
			Meteor.subscribe('test4');
			//Meteor.subscribe('test5');
			//Meteor.subscribe('test6');
			const values = Links.find({userId: Meteor.userId()}).fetch();
			const test2 = Test2.find({userId: Meteor.userId()}).fetch();
			const test3 = Test3.find({userId: Meteor.userId()}).fetch();
			const test4 = Test4.find({userId: Meteor.userId()}).fetch();
			//const test5 = Test5.find({userId: Meteor.userId()}).fetch();
			//const test6 = Test5.find({userId: Meteor.userId()}).fetch();
			this.setState({ values });
			this.setState({ test2 });
			this.setState({ test3 });
			this.setState({ test4 });
			//this.setState({ test5 });
			//this.setState({ test6 });
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
		if(this.state.test4[(this.state.test4.length)-1]) {
			this.setState({Test4Attempts: this.state.test4[(this.state.test4.length)-1].Test4Attempts});
			this.setState({Test4Correct: this.state.test4[(this.state.test4.length)-1].Test4TotalCorrect});
		}
		// if(this.state.test5[(this.state.test5.length)-1]) {
		// 	this.setState({Test5Attempts: this.state.test5[(this.state.test5.length)-1].Test5Attempts});
		// 	this.setState({Test5Correct: this.state.test5[(this.state.test5.length)-1].Test5TotalCorrect});
		// }
		// if(this.state.test6[(this.state.test6.length)-1]) {
		// 	this.setState({Test6Attempts: this.state.test6[(this.state.test6.length)-1].Test6Attempts});
		// 	this.setState({Test6Correct: this.state.test6[(this.state.test6.length)-1].Test6TotalCorrect});
		// }

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
						this.setState({Test3Level: " 10 "});
						//console.log("Case 4");
						break;

				default: this.setState({Test3Link: Test3Links[0]});
						 this.setState({Test3Level: " 0 "});
						 console.log("Case default");
						
			}
		}

		if(!this.state.test4[(this.state.test4.length)-1]) {
			console.log("here - undefined hai!");
			this.setState({Test4Link: '/Test4Level0'});
			this.setState({Test4Correct: 0});
			this.setState({Test4Attempts: 0});
		} else {
				console.log("INCOMPLETE LEVEL: ", this.state.test4[(this.state.test4.length)-1].Test4IncompleteLevel);
				switch(this.state.test4[(this.state.test4.length)-1].Test4IncompleteLevel) {
				case 0: this.setState({Test4Link: Test4Links[0]});
						this.setState({Test4Level: " 0 "});
						console.log("Case 0");
						break;

				case 1: this.setState({Test4Link: Test4Links[1]});
						this.setState({Test4Level: " 1 "});
						console.log("Case 1");
						break;
						
				case 2: this.setState({Test4Link: Test4Links[2]});
						this.setState({Test4Level: " 2 "});
						console.log("Case 2");
						break;
						
				case 3: this.setState({Test4Link: Test4Links[3]});
						this.setState({Test4Level: " 3 "});
						console.log("Case 3");
						break;
						
				case 4: this.setState({Test4Link: Test4Links[4]});
						this.setState({Test4Level: " 4 "});
						console.log("Case 4");
						break;
				case 5: this.setState({Test4Link: Test4Links[5]});
						this.setState({Test4Level: " 5 "});
						//console.log("Case 4");
						break;

				case 6: this.setState({Test4Link: Test4Links[6]});
						this.setState({Test4Level: " 6 "});
						//console.log("Case 4");
						break;

				case 7: this.setState({Test4Link: Test4Links[7]});
						this.setState({Test4Level: " 7 "});
						//console.log("Case 4");
						break;

				case 8: this.setState({Test4Link: Test4Links[8]});
						this.setState({Test4Level: " 8 "});
						//console.log("Case 4");
						break;

				case 9: this.setState({Test4Link: Test4Links[9]});
						this.setState({Test4Level: " 9 "});
						//console.log("Case 4");
						break;

				case 10: this.setState({Test4Link: Test4Links[10]});
						this.setState({Test4Level: " 10 "});
						//console.log("Case 4");
						break;

				default: this.setState({Test4Link: Test4Links[0]});
						 this.setState({Test4Level: " 0 "});
						 console.log("Case default");
						
			}
		}


		// if(!this.state.test5[(this.state.test5.length)-1]) {
		// 	console.log("here - undefined hai!");
		// 	this.setState({Test5Link: '/Test5Level0'});
		// 	this.setState({Test5Correct: 0});
		// 	this.setState({Test5Attempts: 0});
		// } else {
		// 		console.log("INCOMPLETE LEVEL: ", this.state.test5[(this.state.test5.length)-1].Test5IncompleteLevel);
		// 		switch(this.state.test5[(this.state.test5.length)-1].Test5IncompleteLevel) {
		// 		case 0: this.setState({Test5Link: Test5Links[0]});
		// 				this.setState({Test5Level: " 0 "});
		// 				console.log("Case 0");
		// 				break;

		// 		case 1: this.setState({Test5Link: Test5Links[1]});
		// 				this.setState({Test5Level: " 1 "});
		// 				console.log("Case 1");
		// 				break;
						
		// 		case 2: this.setState({Test5Link: Test5Links[2]});
		// 				this.setState({Test5Level: " 2 "});
		// 				console.log("Case 2");
		// 				break;
						
		// 		case 3: this.setState({Test5Link: Test5Links[3]});
		// 				this.setState({Test5Level: " 3 "});
		// 				console.log("Case 3");
		// 				break;
						
		// 		case 4: this.setState({Test5Link: Test5Links[4]});
		// 				this.setState({Test5Level: " 4 "});
		// 				console.log("Case 4");
		// 				break;
		// 		case 5: this.setState({Test5Link: Test5Links[5]});
		// 				this.setState({Test5Level: " 5 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 6: this.setState({Test5Link: Test5Links[6]});
		// 				this.setState({Test5Level: " 6 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 7: this.setState({Test5Link: Test5Links[7]});
		// 				this.setState({Test5Level: " 7 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 8: this.setState({Test5Link: Test5Links[8]});
		// 				this.setState({Test5Level: " 8 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 9: this.setState({Test5Link: Test5Links[9]});
		// 				this.setState({Test5Level: " 9 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 10: this.setState({Test5Link: Test5Links[10]});
		// 				this.setState({Test5Level: " 10 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		default: this.setState({Test5Link: Test5Links[0]});
		// 				 this.setState({Test5Level: " 0 "});
		// 				 console.log("Case default");
						
		// 	}
		// }

		// if(!this.state.test6[(this.state.test6.length)-1]) {
		// 	console.log("here - undefined hai!");
		// 	this.setState({Test6Link: '/Test6Level0'});
		// 	this.setState({Test6Correct: 0});
		// 	this.setState({Test6Attempts: 0});
		// } else {
		// 		console.log("INCOMPLETE LEVEL: ", this.state.test6[(this.state.test6.length)-1].Test6IncompleteLevel);
		// 		switch(this.state.test6[(this.state.test6.length)-1].Test6IncompleteLevel) {
		// 		case 0: this.setState({Test6Link: Test6Links[0]});
		// 				this.setState({Test6Level: " 0 "});
		// 				console.log("Case 0");
		// 				break;

		// 		case 1: this.setState({Test6Link: Test6Links[1]});
		// 				this.setState({Test6Level: " 1 "});
		// 				console.log("Case 1");
		// 				break;
						
		// 		case 2: this.setState({Test6Link: Test6Links[2]});
		// 				this.setState({Test6Level: " 2 "});
		// 				console.log("Case 2");
		// 				break;
						
		// 		case 3: this.setState({Test6Link: Test6Links[3]});
		// 				this.setState({Test6Level: " 3 "});
		// 				console.log("Case 3");
		// 				break;
						
		// 		case 4: this.setState({Test6Link: Test6Links[4]});
		// 				this.setState({Test6Level: " 4 "});
		// 				console.log("Case 4");
		// 				break;
		// 		case 5: this.setState({Test6Link: Test6Links[5]});
		// 				this.setState({Test6Level: " 5 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 6: this.setState({Test6Link: Test6Links[6]});
		// 				this.setState({Test6Level: " 6 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 7: this.setState({Test6Link: Test6Links[7]});
		// 				this.setState({Test6Level: " 7 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 8: this.setState({Test6Link: Test6Links[8]});
		// 				this.setState({Test6Level: " 8 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 9: this.setState({Test6Link: Test6Links[9]});
		// 				this.setState({Test6Level: " 9 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		case 10: this.setState({Test6Link: Test6Links[10]});
		// 				this.setState({Test6Level: " 10 "});
		// 				//console.log("Case 4");
		// 				break;

		// 		default: this.setState({Test6Link: Test6Links[0]});
		// 				 this.setState({Test6Level: " 0 "});
		// 				 console.log("Case default");
						
		// 	}
		// }
		
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

	          		<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test4Link}>Test4</Link> 
	          			<span className = "item--level">Level: {this.state.Test4Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test4Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test4Correct)/(this.state.Test4Attempts) * 100)/100}% </span>
	          		</div>

	          		{/*<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test5Link}>Test5</Link> 
	          			<span className = "item--level">Level: {this.state.Test5Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test5Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test5Correct)/(this.state.Test5Attempts) * 100)/100}% </span>
	          		</div>

	          		<div className = "item">
	          			<Link className = "button button--pill" to={this.state.Test6Link}>Test6</Link> 
	          			<span className = "item--level">Level: {this.state.Test6Level}</span>
	          			<span className = "item--trials">Trials: {this.state.Test6Attempts}</span> 
	          			<span className = "item--accuracy"> Accuracy: {Math.round(100*(this.state.Test6Correct)/(this.state.Test6Attempts) * 100)/100}% </span>
	          		</div>*/}
          		</div>

        	</div>
    );
  }
}