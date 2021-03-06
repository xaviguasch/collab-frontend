import React, { Component } from 'react';
import './NewUserView.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import { Redirect } from 'react-router';


class NewUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      pubkey: '',
      password: '',
      confirmedpassword: '',
      email: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmedpassword) throw Error;
    let data = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      public_key: this.state.pubkey,
      password: this.state.password,
      email: this.state.email
    };
    this.props.fetchCreateUser(data);
  }

  render() {
    if (this.state.redirectToUserView) return <Redirect to='/user' />;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="formfield" >
          <p className="form-name">FIRST NAME</p>
          <input
            className="inputfield"
            placeholder="enter your name..."
            onChange={this.handleChange}
            type="text"
            name="firstname"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">LAST NAME</p>
          <input
            className="inputfield"
            placeholder="enter your lastname..."
            onChange={this.handleChange}
            type="text"
            name="lastname"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">USERNAME</p>
          <input
            className="inputfield"
            placeholder="choose a username..."
            onChange={this.handleChange}
            type="text"
            name="username"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">PUBLIC KEY</p>
          <input
            className="inputfield"
            placeholder="enter your public key..."
            onChange={this.handleChange}
            type="text"
            name="pubkey"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">PASSWORD</p>
          <input
            className="inputfield"
            placeholder="choose your password..."
            onChange={this.handleChange}
            type="password"
            name="password"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">CONFIRM PASSWORD</p>
          <input
            className="inputfield"
            placeholder="confirm your password..."
            onChange={this.handleChange}
            type="password"
            name="confirmedpassword"
            required
          />
        </label>
        <label className="formfield" >
          <p className="form-name">E-MAIL</p>
          <input
            className="inputfield"
            placeholder="enter your e-mail..."
            onChange={this.handleChange}
            type="email"
            name="email"
            required
          />
        </label>
        <input className="submitbutton" type="submit" value="Submit" />
      </form>
    );
  }
}

NewUserView.propTypes = {
  fetchCreateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchCreateUser: (data) => dispatch ({
    type: 'FETCH_CREATE_USER',
    [API]: {
      path: '/register/',
      method: 'POST',
      body: data
    }
  })
});

export default connect(null, mapDispatchToProps)(NewUserView);
