//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.css';
import PropTypes from 'prop-types'; // ES6

// import { reducers } from '../reducers/reducers';
// import { userLogged } from '../../actions';
import API from '../../store/middlewares/apiService';

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

  getUser = event => {
    event.preventDefault();
    event.target.reset();
    // fetch(' http://192.168.1.241:3030/login', {
    //   method: 'POST',
    //   // body: JSON.stringify(this.state),
    //   headers: {
    //     'Authorization':'Basic '+ btoa(this.state.username+':'+this.state.password),
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .then(data => this.props.userLogged(data));
    this.props.fetchLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <form className="login-component" onSubmit={this.getUser}>
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
          type="text"
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
  userLogged: PropTypes.object.isRequired,
  fetchLogin: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({
  fetchLogin: (user, password) => dispatch({
    type: 'FETCH_LOGIN',
    [API]: {
      method: 'POST',
      headers: {
        'Authorization':'Basic '+ btoa(`${user}:${password}`)
      }
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
