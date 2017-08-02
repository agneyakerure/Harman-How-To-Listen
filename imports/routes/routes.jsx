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

import Test2Level0 from '../ui/Graph/Test2Level0';
import Test2Level1 from '../ui/Graph/Test2Level1';
import Test2Level2 from '../ui/Graph/Test2Level2';
import Test2Level3 from '../ui/Graph/Test2Level3';
import Test2Level4 from '../ui/Graph/Test2Level4';
import Test2Level5 from '../ui/Graph/Test2Level5';

const history = createBrowserHistory({forceRefresh: true});
const unauthenticatedPages = ['/','/signup','/login','/Login','/SignUp', '/Home'];
const authenticatedPages = ['/Dashboard', '/Test1Level0','/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4','/Test2Level0','/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10'];
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
          <Route path="/login" render={() => {return Meteor.userId() ? <Redirect to="/Dashboard" /> : <Login />}} />
          <Route path="/SignUp" render={() => {return Meteor.userId() ? <Redirect to="/Dashboard" /> : <SignUp />}} />
          <Route exact path='/Test1Level0' component={Test1Level0}/>
          <Route exact path='/Test1Level1' component={Test1Level1}/>
          <Route exact path='/Test1Level2' component={Test1Level2}/>
          <Route exact path='/Test1Level3' component={Test1Level3}/>
          <Route exact path='/Test1Level4' component={Test1Level4}/>

          <Route exact path='/Test2Level0' component={Test2Level0}/>
          <Route exact path='/Test2Level1' component={Test2Level1}/>
          <Route exact path='/Test2Level2' component={Test2Level2}/>
          <Route exact path='/Test2Level3' component={Test2Level3}/>
          <Route exact path='/Test2Level4' component={Test2Level4}/>
          <Route exact path='/Test2Level5' component={Test2Level5}/>
          
        </div>
      </Router>
    );
