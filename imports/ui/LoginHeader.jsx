import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const LoginHeader = (props) => {
	return(
		<div className = "header">
			<div className = "header__content">
				<h1 className = "header__title"><Link className = "linked-button"to="/Home">How To Listen</Link></h1>
			</div>
		</div>
	)
};


// LoginHeader.propTypes = {
// 	title: PropTypes.string.isRequired
// };

export default LoginHeader;