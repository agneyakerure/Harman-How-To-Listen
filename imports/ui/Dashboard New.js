import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';

Test1Links = ['/Test1Level0', '/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
Test2Links = ['/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4'];

export var audioContext = new (window.AudioContext || window.webkitAudioContext)();

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [],
			Test1Link: Test1Links[0],
			Test2Link: Test2Links[0],
			Test1Level: " 0 ",
			Test1attempts: " 0 ",
			Test1correct: " 0 ",
			Test2Level: " 0 ",
			Test2attempts: " 0 ",
			Test2correct: " 0 "
		}
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('values');
			const values = Links.find({userId: Meteor.userId()}).fetch();
			this.setState({ values });
		});
		setTimeout(() => this.clickme(), 350);
	}

	componentWillUnmount() {
		this.linksTracker.stop();
	}

	clickme = () => {
		if(this.state.values[(this.state.values.length)-1]) {
			console.log("Test 1 Attempts : ",this.state.values[(this.state.values.length)-1].Test1Attempts);
			console.log("Test 1 Correct : ",this.state.values[(this.state.values.length)-1].Test1TotalCorrect);
			console.log("Test 1 Wrong : ",this.state.values[(this.state.values.length)-1].Test1TotalWrong);
		}
		this.setState({test1attempts: this.state.values[(this.state.values.length)-1].Test1Attempts});
		this.setState({test1correct: this.state.values[(this.state.values.length)-1].Test1TotalCorrect});
		if(this.state.values[(this.state.values.length)-1].incompleteLevel == null) {
			this.setState({Test1Link: '/Test1Level0'})
		} else {
			switch(this.state.values[(this.state.values.length)-1].incompleteLevel) {
			case 0: this.setState({Test1Link: Test1Links[0]});
					this.setState({Test1Level: " 0 "});
					break;

			case 1: this.setState({Test1Link: Test1Links[1]});
					this.setState({Test1Level: " 1 "});
					break;
					
			case 2: this.setState({Test1Link: Test1Links[2]});
					this.setState({Test1Level: " 2 "});
					break;
					
			case 3: this.setState({Test1Link: Test1Links[3]});
					this.setState({Test1Level: " 3 "});
					break;
					
			case 4: this.setState({Test1Link: Test1Links[4]});
					this.setState({Test1Level: " 4 "});
					break;
			default: this.setState({Test1Link: Test1Links[0]});
					this.setState({Test1Level: " 0 "});
					
		}
		}

		if(this.state.values[(this.state.values.length)-1]) {
			console.log("Test 2 Attempts : ",this.state.values[(this.state.values.length)-1].Test2Attempts);
			console.log("Test 2 Correct : ",this.state.values[(this.state.values.length)-1].Test2TotalCorrect);
			console.log("Test 2 Wrong : ",this.state.values[(this.state.values.length)-1].Test2TotalWrong);
		}
		this.setState({test2attempts: this.state.values[(this.state.values.length)-1].Test2Attempts});
		this.setState({test2correct: this.state.values[(this.state.values.length)-1].Test2TotalCorrect});
		if(this.state.values[(this.state.values.length)-1].Test2IncompleteLevel == null) {
			this.setState({Test2Link: '/Test2Level1'})
		} else {
			switch(this.state.values[(this.state.values.length)-1].incompleteLevel) {
			case 0: this.setState({Test2Link: Test2Links[0]});
					this.setState({Test2Level: " 1 "});
					break;

			case 1: this.setState({Test2Link: Test2Links[1]});
					this.setState({Test2Level: " 2 "});
					break;
					
			case 2: this.setState({Test2Link: Test2Links[2]});
					this.setState({Test2Level: " 3 "});
					break;
					
			case 3: this.setState({Test2Link: Test2Links[3]});
					this.setState({Test2Level: " 4 "});
					break;
					
			case 4: this.setState({Test2Link: Test2Links[4]});
					this.setState({Test2Level: " 5 "});
					break;
			default: this.setState({Test2Link: Test2Links[0]});
					this.setState({Test2Level: " 1 "});
					
		}
		}
		
	}

  	render() {

    	return (
        	<div>
        		<PrivateHeader title="DashBoard"/>
        		<div>
          			<Link to={this.state.Test1Link}>Test1</Link> <span>Level: {this.state.Test1Level}</span><span>Trials: {this.state.Test1attempts}</span> <span> Accuracy: {100*(this.state.Test1correct)/(this.state.Test1attempts)}% </span>
          			<div><Link to={this.state.Test2Link}>Test2</Link> <span>Level: {this.state.Test2Level}</span><span>Trials: {this.state.Test2attempts}</span> <span> Accuracy: {100*(this.state.Test2correct)/(this.state.Test2attempts)}% </span></div>

          		</div>	
        	</div>
    );
  }
}






if(this.state.values[(this.state.values.length)-1].Test2Attempts == null) {
			Test2Attempts = 0;
		} else {
			Test2Attempts = this.state.values[(this.state.values.length)-1].Test2Attempts;
		}
		if(this.state.values[(this.state.values.length)-1].Test2TotalCorrect == null) {
			Test2TotalCorrect = 0;
		} else {
			Test2TotalCorrect = this.state.values[(this.state.values.length)-1].Test2TotalCorrect;
		}
		if(this.state.values[(this.state.values.length)-1].Test2TotalWrong == null) {
			Test2TotalWrong = 0;
		} else {
			Test2TotalWrong = this.state.values[(this.state.values.length)-1].Test2TotalWrong;
		}
		Test2Attempts +=1;
		if(this.state.isCorrect == "Correct") {
			Test2TotalCorrect +=1;
			if(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber >= 2) {
				console.log("Answer is correct :-D");
				incompleteLevel = 2;
				if(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber == null)
				{
					correctNumber = 1;
					wrongNumber = 0;
				} else {
					correctNumber=Number(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber) +1;
					wrongNumber = 0;
				}
				Meteor.call('links.Test2Level1Insert',correctNumber, wrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				//this.setState({wrongNumber: 0});
				setTimeout(() => history.push('/Dashboard'), 0);
			} else {
				console.log("Answer is correct :-D");
				// this.setState({attemptNumber: this.state.attemptNumber + 1});
				if(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber == null)
				{
					correctNumber = 1;
					wrongNumber = 0;
				} else {
					correctNumber=Number(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber) +1;
					wrongNumber = 0;
				}
				Meteor.call('links.Test2Level1Insert',correctNumber, wrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				//this.setState({wrongNumber: 0});
			}
			setTimeout(() => window.location.reload(), 0);
		} else {
			Test2TotalWrong +=1;
			if(this.state.values[(this.state.values.length)-1].Test2Level1WrongNumber >= 2) {
				console.log("Answer is incorrect :-(");
				incompleteLevel = 1;
				if(this.state.values[(this.state.values.length)-1].Test2Level1WrongNumber == null)
				{
					correctNumber = 0;
					wrongNumber = 1;
				} else {
					wrongNumber=Number(this.state.values[(this.state.values.length)-1].Test2Level1WrongNumber) +1;
					correctNumber = 0;
				}
				Meteor.call('links.Test2Level1Insert',correctNumber, wrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				//this.setState({wrongNumber: 0});
				setTimeout(() => history.push('/Dashboard'), 0);
			} else {
				console.log("Answer is incorrect :-(");
				// this.setState({attemptNumber: this.state.attemptNumber + 1});
				if(this.state.values[(this.state.values.length)-1].Test2Level1CorrectNumber == null)
				{
					correctNumber = 0;
					wrongNumber = 1;
				} else {
					wrongNumber=Number(this.state.values[(this.state.values.length)-1].Test2Level1WrongNumber) +1;
					correctNumber = 0;
				}
				Meteor.call('links.Test2Level1Insert',correctNumber, wrongNumber, incompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong);
				//this.setState({wrongNumber: 0});
			}
			setTimeout(() => window.location.reload(), 0);
		}