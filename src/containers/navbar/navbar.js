//imports
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from '../login';
import icon from '../../assets/users-group.png';
import './navbar.css';
import NewUserView from '../../components/NewUserView';
import BTCTicker from '../../components/btcTicker';
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

  handleLogout = () => {
    this.props.logout();
    this.props.resetWallets();
  }

  renderLogin = () => {
    if (this.props.userLogged.username) return (
      <div cLassName= 'nav-bar-loggedIn-container' >
        <Link className='nav-bar-loggedIn' to='/user'>
          MY WALLETS
        </Link>
        <button className='nav-bar-logOut' onClick={() => this.handleLogout()}>LOG OUT</button>
      </div>
    );
    return (<div className="nav-bar-links">
      <button

        style={
          this.state.signUpDrawer
            ? {'color': 'rgba(0, 94, 255)'}
            : {'color': 'rgba(255, 255, 255)'}
        }
        onClick={() => this.handleClickSignup()}
        className="nav-bar-userenter"
        value="nav-bar-signup">
        SIGN UP
      </button>
      <button

        style={
          this.state.logInDrawer
            ? {'color': 'rgba(0, 94, 255)'}
            : {'color': 'rgba(255, 255, 255)'}
        }
        onClick={() => this.handleClickLogin()}
        className="nav-bar-userenter"
        value="nav-bar-login">
        LOG IN
      </button>
      <div
        className="nav-bar-signup"
        style={
          this.state.signUpDrawer
            ? {left: '80%'}
            : {display:'none'}
        }>
        <NewUserView />
      </div>
      <div
        className="nav-bar-login"
        style={
          this.state.logInDrawer
            ? {
              left: '80%',
            }
            : {display:'none'}

        }>
        <LogIn />
      </div>
    </div>);
  }
  render() {
    return (
      <div className={(window.location.href.includes('user')) ? 'navbar-container2':'navbar-container'}>
        <Link className="navbar-title" to="/">
          <img src={icon} className="logo" />
          <p className='nav-bar-title'>
            COLLAB
          </p>
        </Link>
        <div className='nav-bar-ticker'>
          <BTCTicker/>
        </div>
        {this.renderLogin()}
      </div>
    );
  }
}

NavBar.propTypes = {
  userLogged: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  resetWallets: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch ({
    type: 'USER_LOGOUT'
  }),
  resetWallets: () => dispatch ({
    type: 'RESET_WALLETS'
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
