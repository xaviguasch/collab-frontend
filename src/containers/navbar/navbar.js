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
      drawer: false
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
            }}
            onClick={() => this.setState({drawer: !this.state.drawer})}
            value="signup">
            SIGN UP
          </button>
          <button
            onClick={() => this.getLogInComponent}
            value="login">
            LOG IN
          </button>
      </div>
      {/* <div className="login">
        <LogIn />
      </div> */}

      <div
        className="signup"
        style={
          this.state.drawer
          ? {right: "0%"}
          : {right: "100vw"}
        }>
        <NewUserView />
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
