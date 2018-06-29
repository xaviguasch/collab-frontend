//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-enter.css';
import PropTypes from 'prop-types'; // ES6
import LogIn from '../login'
import NewUserView from '../../components/NewUserView'

// import { reducers } from '../reducers/reducers';
import { userLogged } from '../../actions';

//login component, add two text-areas one for username and another for password
//get method to check validation, if response is positive append user component on navbar
class UserEnter extends Component {



    whatYouSee(props) {
    const userEnter = this.props.userenter
    if (userEnter === 'login') {
      console.log('im here')
      return <LogIn />
    } else if (userEnter === 'signup')
      console.log('im there')
      return <NewUserView />
    }

  render() {
    return (
      <div>
        <whatYouSee isState={this.props.userenter} />
        <p>HELLLO HELLO</p>
      </div>
    );
  }
}






export default UserEnter;
