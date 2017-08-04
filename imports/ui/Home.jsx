import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  render() {

    return (
    	<div>
	    	<div className = "header">
				<div className = "header">
					<div className = "header__content">
						<h1 className = "header__title">How To Listen</h1>
					</div>
				</div>
			</div>
			<div className = "page-content">
				
				<p>How to Listen is an application developed by the Harman International R&D group for the purpose of training and selecting
				listeners used in audio product research, development, and testing. The software consists of a number of training exercises
				 where different kinds of filters and effects commonly found within the recording and audio chains are
				  simulated and added to music. </p>
				<p>The listener’s task is to identify, classify or rate these effects according to a number of well-defined perceptual
				 attributes and scales. The software automatically adjusts the difficulty of each training task based on the listener’s
				  performance.</p>
				<div className="graph-form">
					<p><button className = "button"><Link to="/Login" className="linked-button">App </Link></button></p>
				</div>
				<footer className="home-footer">
						© 2017 HARMAN International. All Rights Reserved.
				</footer>
			</div>
		</div>
    );
  }
}