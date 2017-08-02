import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }    });

  }
  render() {
    return (
        <div className = "boxed-view">
          <div className = "boxed-view__box">
            <h1>Login!</h1>

            {this.state.error ? <p>{this.state.error}</p>:undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className = "boxed-view__form">
              <p><input type="email" name="email" placeholder="email" ref="email"/> </p>
              <p><input type="password" name="password" placeholder="password" ref="password"/></p>
              <p><button className = "button"> Login </button></p>
            </form>

            <Link to="/SignUp">Create Account!</Link>
          </div>
        </div>
    );
  }
}



	
