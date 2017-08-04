import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import LoginHeader from './LoginHeader';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length <9) {
      return this.setState({error: 'Password must be more than 8 characters'});
    }

    Accounts.createUser({email, password}, (err) => {
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
        Meteor.loginWithPassword({email}, password, (err) => {
          if(err) {
            this.setState({error: err.reason});
          } else {
            this.setState({error: ''});
          }
        });
      }
    });

  }
  render() {
    return (
      <div>
      <LoginHeader/>
        <div className = "boxed-view">
          <div className = "boxed-view__box">
            <h1>Join!</h1>

            {this.state.error ? <p>{this.state.error}</p>:undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className = "boxed-view__form">
              <p><input type="email" name="email" placeholder="email" ref="email"/> </p>
              <p><input type="password" name="password" placeholder="password" ref="password"/></p>
              <p><button className = "button">Create Account</button></p>
            </form>
            <Link to="/Login">Already have an account? </Link>
          </div>
        </div>
      </div>
    );
  }
}