import React, { Component } from 'react';
import {Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const PrivateHeader = (props) => {
	return(
		<div className = "header">
			<div className = "header__content">
				<h1 className = "header__title">How To Listen</h1>
				<button className = "button--link-text" onClick={() => Accounts.logout()}>Logout</button>
			</div>
		</div>
	)
};


PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired
};

export default PrivateHeader;