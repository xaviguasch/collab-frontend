//imports
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainScreen from "./components/mainscreen";
import NavBar from "./containers/navbar";
import NewUserView from './components/NewUserView'
import UserVote from './components/UserVote'

//app component: append navbar component and router to all routes
class App extends Component {
  render() {
    return (
      <div className="father">
        {/* <NavBar /> */}
        <Router>
          <div className="App">
            <Route exact path="/" component={MainScreen} />
            <Route path="/register" component={NewUserView} />
            <Route path="/vote" component={UserVote} />

          </div>
        </Router>
      </div>
    );
  }
}

//exports
export default App;
