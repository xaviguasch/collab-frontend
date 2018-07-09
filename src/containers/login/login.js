//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.css';
import PropTypes from 'prop-types'; // ES6
import {API} from '../../store/middlewares/apiService';

//login component, add two text-areas one for username and another for password
//get method to check validation, if response is positive append user component on navbar
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getUser = async event => {
    event.preventDefault();
    event.target.reset();
    this.props.fetchLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <form autoComplete='off' className="login-component" onSubmit={this.getUser}>
        <input
          name="username"
          type="text"
          className="login-component-item"
          placeholder="Username..."
          size="20"
          onChange={this.captureInput}
          required
        />
        <input
          name="password"
          type="password"
          className="login-component-item"
          placeholder="Password..."
          size="20"
          onChange={this.captureInput}
          required
        />
        <input type="submit" value="Submit" className='login-button'/>
      </form>
    );
  }
}

LogIn.propTypes = {
  fetchLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  fetchLogin: (user,password) => dispatch ({
    type: 'FETCH_LOGIN',
    [API]: {
      path: '/login',
      method: 'POST',
      headers: {
        'Authorization':'Basic '+ btoa(`${user}:${password}`)
      }
    }
  })
});

export default connect(null, mapDispatchToProps)(LogIn);
