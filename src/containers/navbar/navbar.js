//imports
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from '../login';
import UserLogged from '../userLogged';
import icon from '../../assets/users-group.png';
import './navbar.css';

// import { isEmpty } from 'lodash';
//navbar component, add links (routes) and append component of login
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isHiddenLogIn: true
      // isHiddenSubmit: true
    };
  }

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
          <img src={icon} className="logo" />
          <p className='title'>
            COLLAB
          </p>
        </Link>
        <div className="nav-bar-links">
          <Link className="nav-bar-links-items" to="/about">
            ABOUT US
          </Link>
          <Link className="nav-bar-links-items" to="/register">
            SIGN UP
          </Link>
          {this.state.isHiddenLogIn &&
            !this.props.userLogged.username && (
              <a onClick={this.toggleHidden}>LOG IN</a>
            )}

          {!this.state.isHiddenLogIn &&
            !this.props.userLogged.username && <LogIn />}

          {this.props.userLogged.username && <UserLogged />}
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
