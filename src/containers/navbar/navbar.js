//imports
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from '../login';
import icon from '../../assets/users-group.png';
import './navbar.css';
import NewUserView from '../../components/NewUserView';
import BTCTicker from '../../components/btcTicker'
// import { isEmpty } from 'lodash';
//navbar component, add links (routes) and append component of login
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpDrawer: false,
      logInDrawer: false
    };
  }

  handleClickSignup = () => {
    this.setState({
      signUpDrawer: !this.state.signUpDrawer,
      logInDrawer: false
    });
  }
  handleClickLogin = () => {
    this.setState({
      logInDrawer: !this.state.logInDrawer,
      signUpDrawer: false
    });
  }

  hideAll = () => {
    this.setState({
      logInDrawer: false,
      signUpDrawer: false
    });
  }

  handleLogout = () => {
    this.props.logout();
  }



  renderLogin = () => {
    if (this.props.userLogged.username) return (
      <div>
        <Link to='/user'>
          My wallets
        </Link>
        <button onClick={() => this.handleLogout()}>Log out</button>
      </div>
    );
    return (<div className="nav-bar-links">
      <button
        style={{
          backgroundColor: 'transparent',
          'borderStyle': 'none',
        }}
        onClick={() => this.handleClickSignup()}
        className="userenter"
        value="signup">
        SIGN UP
      </button>
      <button
        style={{
          'backgroundColor': 'transparent',
          'borderStyle': 'none'
        }}
        onClick={() => this.handleClickLogin()}
        className="userenter"
        value="login">
        LOG IN
      </button>
    </div>);
  }
  render() {
    return (
      <div className="navbar-container">
        <Link className="navbar-title" to="/">
          <img src={icon} className="logo" />
          <p className='title'>
            COLLAB
          </p>
        </Link>
        <BTCTicker/>
        {this.renderLogin()}

        <div
          className="signup"
          style={
            this.state.signUpDrawer
              ? {left: '80%'}
              : {left: '100vw'}
          }>
          <NewUserView hideAll={this.hideAll}/>
        </div>

        <div
          className="login"
          style={
            this.state.logInDrawer
              ? {left: '80%'}
              : {left: '100vw'}
          }>
          <LogIn hideAll={this.hideAll}/>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  userLogged: PropTypes.object,
  logout: PropTypes.func
};

const mapStateToProps = (state) => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch ({
    type: 'USER_LOGOUT'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
