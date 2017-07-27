import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Meteor } from 'meteor/meteor';
// import { Links } from '../imports/api/links';

Tracker.autorun(() => {
  	const isAuthenticated = !!Meteor.userId();
  	onAuthChange(isAuthenticated);
});


Meteor.startup(() => {
  render(routes,document.getElementById('render-target'));

});