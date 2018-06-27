//imports

import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainScreen from "./components/mainscreen";
import NavBar from "./containers/navbar";
import NewUserView from './components/NewUserView'
import UserVote from './components/UserVote'
import UserProfile from './components/userProfile';

//app component: append navbar component and router to all routes
class App extends Component {
  render() {
    return (
      <div className="father">

        <NavBar />
        <Switch>

          <Route path="/register" component={NewUserView} />
          <Route path="/vote" component={UserVote} />
          <Route exact path="/" component={MainScreen} />
          <Route path="/user" component={UserProfile} />

        </Switch>

      </div>
    );
  }
}

//exports
export default App;
