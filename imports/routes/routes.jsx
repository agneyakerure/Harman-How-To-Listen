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
import Test2Level6 from '../ui/Graph/Test2Level6';
import Test2Level7 from '../ui/Graph/Test2Level7';
import Test2Level8 from '../ui/Graph/Test2Level8';
import Test2Level9 from '../ui/Graph/Test2Level9';
import Test2Level10 from '../ui/Graph/Test2Level10';

import Test3Level0 from '../ui/Test3/Test3Level0';
import Test3Level1 from '../ui/Test3/Test3Level1';
import Test3Level2 from '../ui/Test3/Test3Level2';
import Test3Level3 from '../ui/Test3/Test3Level3';
import Test3Level4 from '../ui/Test3/Test3Level4';
import Test3Level5 from '../ui/Test3/Test3Level5';
import Test3Level6 from '../ui/Test3/Test3Level6';
import Test3Level7 from '../ui/Test3/Test3Level7';
import Test3Level8 from '../ui/Test3/Test3Level8';
import Test3Level9 from '../ui/Test3/Test3Level9';
import Test3Level10 from '../ui/Test3/Test3Level10';

const history = createBrowserHistory({forceRefresh: true});
const unauthenticatedPages = ['/','/signup','/login','/Login','/SignUp', '/Home'];
const authenticatedPages = 
[
'/Dashboard', 
'/Test1Level0','/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4',
'/Test2Level0','/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10', 
'/Test3Level0','/Test3Level1', '/Test3Level2', '/Test3Level3', '/Test3Level4', '/Test3Level5', '/Test3Level6', '/Test3Level7', '/Test3Level8', '/Test3Level9', '/Test3Level10'];
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
          <Route exact path='/Test2Level6' component={Test2Level6}/>
          <Route exact path='/Test2Level7' component={Test2Level7}/>
          <Route exact path='/Test2Level8' component={Test2Level8}/>
          <Route exact path='/Test2Level9' component={Test2Level9}/>
          <Route exact path='/Test2Level10' component={Test2Level10}/>
          
          <Route exact path='/Test3Level0' component={Test3Level0}/>
          <Route exact path='/Test3Level1' component={Test3Level1}/>
          <Route exact path='/Test3Level2' component={Test3Level2}/>
          <Route exact path='/Test3Level3' component={Test3Level3}/>
          <Route exact path='/Test3Level4' component={Test3Level4}/>
          <Route exact path='/Test3Level5' component={Test3Level5}/>
          <Route exact path='/Test3Level6' component={Test3Level6}/>
          <Route exact path='/Test3Level7' component={Test3Level7}/>
          <Route exact path='/Test3Level8' component={Test3Level8}/>
          <Route exact path='/Test3Level9' component={Test3Level9}/>
          <Route exact path='/Test3Level10' component={Test3Level10}/>
        </div>
      </Router>
    );
