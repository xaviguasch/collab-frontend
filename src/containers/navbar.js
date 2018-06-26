//imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LogIn from "./login";

//navbar component, add links (routes) and append component of login
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true
    };
  }
  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  getLogInComponent = () => {
    console.log("clicked");
    return <LogIn />;
  };

  render() {
    return (
      <div className="navbar-container">
        <Link id="logo" to="/">
          COLLAB
        </Link>
        <div className="nav-bar-links">
          <Link className="nav-bar-links-items" to="/about">
            ABOUT US
          </Link>
          <Link className="nav-bar-links-items" to="/signup">
            SIGN UP
          </Link>
          {this.state.isHidden && <a onClick={this.toggleHidden}>LOG IN</a>}
          {!this.state.isHidden && <LogIn />}
        </div>
      </div>
    );
  }
}

//manage state to props and dispatch all actions needed in navbar
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
