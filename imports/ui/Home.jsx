import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  render() {
    return (
        <div>
          <h1>How to Listen!</h1>
          <div><Link to="/SignUp">Signup!</Link></div>
          <div><Link to="/Login">Login!</Link></div>
        </div>
    );
  }
}