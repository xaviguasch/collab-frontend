//imports

import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import MainScreen from './components/mainscreen/mainscreen';
import NavBar from './containers/navbar/navbar';
import UserProfile from './components/userProfile/userProfile';
import UserVotePage from './containers/UserVotePage';


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
        </Switch>
      </div>
    );
  }
}

//exports
export default App;
