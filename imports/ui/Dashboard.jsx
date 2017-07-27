import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';

Test1Links = ['/Test1Level0', '/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
var a;
export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [],
			link: Test1Links[0],
			level: " 0 ",
			test1attempts: " 0 ",
			test1correct: " 0 "
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
			this.setState({link: '/Test1Level0'})
		} else {
			switch(this.state.values[(this.state.values.length)-1].incompleteLevel) {
			case 0: this.setState({link: Test1Links[0]});
					this.setState({level: " 0 "});
					break;

			case 1: this.setState({link: Test1Links[1]});
					this.setState({level: " 1 "});
					break;
					
			case 2: this.setState({link: Test1Links[2]});
					this.setState({level: " 2 "});
					break;
					
			case 3: this.setState({link: Test1Links[3]});
					this.setState({level: " 3 "});
					break;
					
			case 4: this.setState({link: Test1Links[4]});
					this.setState({level: " 4 "});
					break;
			default: this.setState({link: Test1Links[0]});
					this.setState({level: " 0 "});
					
		}
		}
		
	}

  	render() {

    	return (
        	<div>
        		<PrivateHeader title="DashBoard"/>
        		<div>
          			<Link to={this.state.link}>Test1</Link> <span>Level: {this.state.level}</span><span>Trials: {this.state.test1attempts}</span> <span> Accuracy: {100*(this.state.test1correct)/(this.state.test1attempts)}% </span>
          		</div>	
        	</div>
    );
  }
}