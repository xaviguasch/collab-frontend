//imports
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from '../login';
import UserLogged from '../userLogged';
import icon from '../../assets/users-group.png';
import './navbar.css';
import NewUserView from '../../components/NewUserView'
// import { isEmpty } from 'lodash';
//navbar component, add links (routes) and append component of login
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isHiddenLogIn: true,
      signUpDrawer: false,
      logInDrawer: false,
      }
      // isHiddenSubmit: true
    };


  toggleHidden = () => {
    this.setState({
      isHiddenLogIn: !this.state.isHiddenLogIn
    });
  }

  getLogInComponent = () => {
    return <LogIn />;
  }


  render() {
    return (
      <div className="navbar-container">
        <Link className="navbar-title" to="/">
          <img src={icon} />
          <p>
            <b>COLLAB</b>
          </p>
        </Link>
        <div className="nav-bar-links">
          <button
            style={{
              'background-color': 'transparent',
              'border-style': 'none'
            },
              this.state.signUpDrawer
              ? {'font-weight': 'normal'}
              : {'font-weight': 'lighter'}
            }
            onClick={() => this.setState({signUpDrawer: !this.state.signUpDrawer})}
            className="userenter"
            value="signup">
            SIGN UP
          </button>
          <button
            style={{
              'background-color': 'transparent',
              'border-style': 'none'
            },
              this.state.logInDrawer
              ? {'font-weight': 'normal'}
              : {'font-weight': 'lighter'}
            }
            onClick={() => this.setState({logInDrawer: !this.state.logInDrawer})}
            className="userenter"
            value="login">
            LOG IN
          </button>

      </div>

      <div
        className="signup"
        style={
          this.state.signupDrawer
          ? {left: "80%"}
          : {left: "100vw"}
        }>
        <NewUserView />
      </div>

      <div
        className="login"
        style={
          this.state.logInDrawer
          ? {left: "80%"}
          : {left: "100vw"}
        }>
        <LogIn />
      </div>


    </div>
    );
  }
}

//manage state to props and dispatch all actions needed in navbar

NavBar.propTypes = {
  userLogged: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
