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

// import Test4Level0 from '../ui/Test4/Test4Level0';
// import Test4Level1 from '../ui/Test4/Test4Level1';
// import Test4Level2 from '../ui/Test4/Test4Level2';
// import Test4Level3 from '../ui/Test4/Test4Level3';
// import Test4Level4 from '../ui/Test4/Test4Level4';
// import Test4Level5 from '../ui/Test4/Test4Level5';
// import Test4Level6 from '../ui/Test4/Test4Level6';
// import Test4Level7 from '../ui/Test4/Test4Level7';
// import Test4Level8 from '../ui/Test4/Test4Level8';
// import Test4Level9 from '../ui/Test4/Test4Level9';
// import Test4Level10 from '../ui/Test4/Test4Level10';

// import Test5Level0 from '../ui/Test5/Test5Level0';
// import Test5Level1 from '../ui/Test5/Test5Level1';
// import Test5Level2 from '../ui/Test5/Test5Level2';
// import Test5Level3 from '../ui/Test5/Test5Level3';
// import Test5Level4 from '../ui/Test5/Test5Level4';
// import Test5Level5 from '../ui/Test5/Test5Level5';
// import Test5Level6 from '../ui/Test5/Test5Level6';
// import Test5Level7 from '../ui/Test5/Test5Level7';
// import Test5Level8 from '../ui/Test5/Test5Level8';
// import Test5Level9 from '../ui/Test5/Test5Level9';
// import Test5Level10 from '../ui/Test5/Test5Level10';

// import Test6Level0 from '../ui/Test6/Test6Level0';
// import Test6Level1 from '../ui/Test6/Test6Level1';
// import Test6Level2 from '../ui/Test6/Test6Level2';
// import Test6Level3 from '../ui/Test6/Test6Level3';
// import Test6Level4 from '../ui/Test6/Test6Level4';
// import Test6Level5 from '../ui/Test6/Test6Level5';
// import Test6Level6 from '../ui/Test6/Test6Level6';
// import Test6Level7 from '../ui/Test6/Test6Level7';
// import Test6Level8 from '../ui/Test6/Test6Level8';
// import Test6Level9 from '../ui/Test6/Test6Level9';
// import Test6Level10 from '../ui/Test6/Test6Level10';

// import Test7Level0 from '../ui/Test7/Test7Level0';
// import Test7Level1 from '../ui/Test7/Test7Level1';
// import Test7Level2 from '../ui/Test7/Test7Level2';
// import Test7Level3 from '../ui/Test7/Test7Level3';
// import Test7Level4 from '../ui/Test7/Test7Level4';
// import Test7Level5 from '../ui/Test7/Test7Level5';
// import Test7Level6 from '../ui/Test7/Test7Level6';
// import Test7Level7 from '../ui/Test7/Test7Level7';
// import Test7Level8 from '../ui/Test7/Test7Level8';
// import Test7Level9 from '../ui/Test7/Test7Level9';
// import Test7Level10 from '../ui/Test7/Test7Level10';

// import Test8Level0 from '../ui/Test8/Test8Level0';
// import Test8Level1 from '../ui/Test8/Test8Level1';
// import Test8Level2 from '../ui/Test8/Test8Level2';
// import Test8Level3 from '../ui/Test8/Test8Level3';
// import Test8Level4 from '../ui/Test8/Test8Level4';
// import Test8Level5 from '../ui/Test8/Test8Level5';
// import Test8Level6 from '../ui/Test8/Test8Level6';
// import Test8Level7 from '../ui/Test8/Test8Level7';
// import Test8Level8 from '../ui/Test8/Test8Level8';
// import Test8Level9 from '../ui/Test8/Test8Level9';
// import Test8Level10 from '../ui/Test8/Test8Level10';

const history = createBrowserHistory({forceRefresh: true});
const unauthenticatedPages = ['/','/signup','/login','/Login','/SignUp', '/Home'];
const authenticatedPages = 
[
'/Dashboard', 
'/Test1Level0','/Test1Level1', '/Test1Level2', '/Test1Level3', '/Test1Level4',
'/Test2Level0','/Test2Level1', '/Test2Level2', '/Test2Level3', '/Test2Level4', '/Test2Level5', '/Test2Level6', '/Test2Level7', '/Test2Level8', '/Test2Level9', '/Test2Level10', 
'/Test3Level0','/Test3Level1', '/Test3Level2', '/Test3Level3', '/Test3Level4', '/Test3Level5', '/Test3Level6', '/Test3Level7', '/Test3Level8', '/Test3Level9', '/Test3Level10',
'/Test4Level0','/Test4Level1', '/Test4Level2', '/Test4Level3', '/Test4Level4', '/Test4Level5', '/Test4Level6', '/Test4Level7', '/Test4Level8', '/Test4Level9', '/Test4Level10',
'/Test5Level0','/Test5Level1', '/Test5Level2', '/Test5Level3', '/Test5Level4', '/Test5Level5', '/Test5Level6', '/Test5Level7', '/Test5Level8', '/Test5Level9', '/Test5Level10',
'/Test6Level0','/Test6Level1', '/Test6Level2', '/Test6Level3', '/Test6Level4', '/Test6Level5', '/Test6Level6', '/Test6Level7', '/Test6Level8', '/Test6Level9', '/Test6Level10',
'/Test7Level0','/Test7Level1', '/Test7Level2', '/Test7Level3', '/Test7Level4', '/Test7Level5', '/Test7Level6', '/Test7Level7', '/Test7Level8', '/Test7Level9', '/Test7Level10',
'/Test8Level0','/Test8Level1', '/Test8Level2', '/Test8Level3', '/Test8Level4', '/Test8Level5', '/Test8Level6', '/Test8Level7', '/Test8Level8', '/Test8Level9', '/Test8Level10',
];
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

          {/*
          <Route exact path='/Test4Level0' component={Test4Level0}/>
          <Route exact path='/Test4Level1' component={Test4Level1}/>
          <Route exact path='/Test4Level2' component={Test4Level2}/>
          <Route exact path='/Test4Level3' component={Test4Level3}/>
          <Route exact path='/Test4Level4' component={Test4Level4}/>
          <Route exact path='/Test4Level5' component={Test4Level5}/>
          <Route exact path='/Test4Level6' component={Test4Level6}/>
          <Route exact path='/Test4Level7' component={Test4Level7}/>
          <Route exact path='/Test4Level8' component={Test4Level8}/>
          <Route exact path='/Test4Level9' component={Test4Level9}/>
          <Route exact path='/Test4Level10' component={Test4Level10}/>

          <Route exact path='/Test5Level0' component={Test4Level0}/>
          <Route exact path='/Test5Level1' component={Test4Level1}/>
          <Route exact path='/Test5Level2' component={Test4Level2}/>
          <Route exact path='/Test5Level3' component={Test4Level3}/>
          <Route exact path='/Test5Level4' component={Test4Level4}/>
          <Route exact path='/Test5Level5' component={Test4Level5}/>
          <Route exact path='/Test5Level6' component={Test4Level6}/>
          <Route exact path='/Test5Level7' component={Test4Level7}/>
          <Route exact path='/Test5Level8' component={Test4Level8}/>
          <Route exact path='/Test5Level9' component={Test4Level9}/>
          <Route exact path='/Test5Level10' component={Test4Level10}/>

          <Route exact path='/Test6Level0' component={Test5Level0}/>
          <Route exact path='/Test6Level1' component={Test5Level1}/>
          <Route exact path='/Test6Level2' component={Test5Level2}/>
          <Route exact path='/Test6Level3' component={Test5Level3}/>
          <Route exact path='/Test6Level4' component={Test5Level4}/>
          <Route exact path='/Test6Level5' component={Test5Level5}/>
          <Route exact path='/Test6Level6' component={Test5Level6}/>
          <Route exact path='/Test6Level7' component={Test5Level7}/>
          <Route exact path='/Test6Level8' component={Test5Level8}/>
          <Route exact path='/Test6Level9' component={Test5Level9}/>
          <Route exact path='/Test6Level10' component={Test5Level10}/>

          <Route exact path='/Test7Level0' component={Test6Level0}/>
          <Route exact path='/Test7Level1' component={Test6Level1}/>
          <Route exact path='/Test7Level2' component={Test6Level2}/>
          <Route exact path='/Test7Level3' component={Test6Level3}/>
          <Route exact path='/Test7Level4' component={Test6Level4}/>
          <Route exact path='/Test7Level5' component={Test6Level5}/>
          <Route exact path='/Test7Level6' component={Test6Level6}/>
          <Route exact path='/Test7Level7' component={Test6Level7}/>
          <Route exact path='/Test7Level8' component={Test6Level8}/>
          <Route exact path='/Test7Level9' component={Test6Level9}/>
          <Route exact path='/Test7Level10' component={Test6Level10}/>

          <Route exact path='/Test8Level0' component={Test7Level0}/>
          <Route exact path='/Test8Level1' component={Test7Level1}/>
          <Route exact path='/Test8Level2' component={Test7Level2}/>
          <Route exact path='/Test8Level3' component={Test7Level3}/>
          <Route exact path='/Test8Level4' component={Test7Level4}/>
          <Route exact path='/Test8Level5' component={Test7Level5}/>
          <Route exact path='/Test8Level6' component={Test7Level6}/>
          <Route exact path='/Test8Level7' component={Test7Level7}/>
          <Route exact path='/Test8Level8' component={Test7Level8}/>
          <Route exact path='/Test8Level9' component={Test7Level9}/>
          <Route exact path='/Test8Level10' component={Test7Level10}/>

        */}
        
        </div>
      </Router>
    );
