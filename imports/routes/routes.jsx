import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tracker } from 'meteor/tracker';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from '../ui/Home';
import Dashboard from '../ui/Dashboard';
import SignUp from '../ui/SignUp';
import Login from '../ui/Login';
import Test1Level0 from '../ui/Test1/Test1Level0';
import Test1Level1 from '../ui/Test1/Test1Level1';
import Test1Level2 from '../ui/Test1/Test1Level2';
import Test1Level3 from '../ui/Test1/Test1Level3';
import Test1Level4 from '../ui/Test1/Test1Level4';
import Graph from '../ui/Graph/Graph';

const history = createBrowserHistory({forceRefresh: true});
const unauthenticatedPages = ['/','/signup','/login','/Login','/SignUp', '/Home'];
const authenticatedPages = ['/Dashboard', '/Test1Level0','/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4'];
export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  // const pathname = location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    <Redirect to ='/Dashboard'/>
    history.push('/Dashboard');
    
  } else if(isAuthenticatedPage && !isAuthenticated) {
    <Redirect to='/Login'/>
    history.push('/Login');
  }
  console.log("isAuthenticated:", isAuthenticated); 
  console.log("isUnauthenticatedPage:", isUnauthenticatedPage); 
  console.log("isAuthenticatedPage:", isAuthenticatedPage); 
};

export const routes = 
    (
      <Router history={history}>
        <div>       
          <Route exact path='/' component={Home}/>
          <Route path='/Home' component={Home}/>
          <Route path='/Dashboard' component={Dashboard}/>
          <Route path="/login" render={() => {return Meteor.userId() ? <Redirect to="/Test1Level0" /> : <Login />}} />
          <Route path="/SignUp" render={() => {return Meteor.userId() ? <Redirect to="/Test1Level0" /> : <SignUp />}} />
          <Route exact path='/Test1Level0' component={Test1Level0}/>
          <Route exact path='/Test1Level1' component={Test1Level1}/>
          <Route exact path='/Test1Level2' component={Test1Level2}/>
          <Route exact path='/Test1Level3' component={Test1Level3}/>
          <Route exact path='/Test1Level4' component={Test1Level4}/>
          <Route exact path='/Graph' component={Graph}/>
        </div>
      </Router>
    );
