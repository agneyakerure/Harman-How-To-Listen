import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  render() {

    return (
    	<div className = "header">
			<header>
				<div class = "container">
					<div id = "branding">
						<h1>Harman International</h1>
					</div>
					<nav>
						<ul>
							
							<li>Sign Up</li>
							<li>Log In</li>
						</ul>
					</nav>
				</div>
			</header>

		</div>
    );
  }
}