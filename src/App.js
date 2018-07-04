//imports

import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import MainScreen from './components/mainscreen/mainscreen';
import NavBar from './containers/navbar/navbar';
import UserProfile from './components/userProfile/userProfile';
import UserVotePage from './containers/UserVotePage';
// import ValidationPage from './components/ValidationPage';
// import ErrorValidation from './components/ErrorValidation';
// import ThanksMessageVote from './components/ThanksMessageVote';
// import ErrorVoting from './components/ErrorVoting';


//app component: append navbar component and router to all routes
class App extends Component {
  render() {
    return (
      <div className="father">
        <NavBar />
        <Switch>
          <Route path="/vote" component={UserVotePage} />
          <Route exact path="/" component={MainScreen} />
          <Route path="/user" component={UserProfile} />
          {/* <Route exact path="/validationpage" component={ValidationPage} />
         <Route exact path="/errorvalidation" component={ErrorValidation} />
         <Route exact path="/thanksmessage" component={ThanksMessageVote} />
         <Route exact path="/errorvoting" component={ErrorVoting} /> */}
        </Switch>
      </div>
    );
  }
}

//exports
export default App;
