//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reducers } from '../reducers/reducers';
import { userLogged } from '../actions';

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
  };

  getUser = event => {
    event.preventDefault();
    event.target.reset();
    fetch(' http://private-d75f9-collab5.apiary-mock.com/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.props.userLogged(data));
  };

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
        />
        <input
          name="password"
          type="text"
          className="login-component-item"
          placeholder="Password..."
          size="20"
          onChange={this.captureInput}
        />
        <input type="submit" value="Submit" style={{ display: 'none' }} />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  userLogged: state.user
});

const mapDispatchToProps = dispatch => ({
  userLogged: data => dispatch(userLogged(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
