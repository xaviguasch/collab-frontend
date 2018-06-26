import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NewUserView.css'
const jwt = require('jsonwebtoken')


class NewUserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pubkey: "",
      password: "",
      confirmedpassword: "",
      email: ""
    }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    if (this.state.password !== this.state.confirmedpassword) throw Error;
    let data = {
      'username': this.state.username,
      'pubkey': this.state.pubkey,
      'password': this.state.password,
      'email': this.state.email
    }


  }


  render() {
    return (

          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label className="formfield" id="username">
                Username<br></br>
                <input
                  className="inputfield"
                  placeholder="choose a username..."
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  id="username-input"/>
              </label><br></br>
              <label className="formfield" id="pubkey">
                Public Key<br></br>
                <input
                  className="inputfield"
                  placeholder="enter your public key..."
                  onChange={this.handleChange}
                  type="text"
                  name= "pubkey"
                  id="pubkey-input"/>
              </label><br></br>
              <label className="formfield" id="password">
                Password<br></br>
                <input
                  className="inputfield"
                  placeholder="choose your password..."
                  onChange={this.handleChange}
                  type="password"
                  name= "password"
                  id="password-input"/>
              </label><br></br>
              <label className="formfield" id="confirmpassword">
                Confirm Password<br></br>
                <input
                  className="inputfield"
                  placeholder="confirm your password..."
                  onChange={this.handleChange}
                  type="password"
                  name="confirmedpassword"
                  id="confirmpassword-input"/>
              </label><br></br>
              <label className="formfield" id="email">
                e-mail<br></br>
                <input
                  className="inputfield"
                  placeholder="enter your e-mail..."
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="email-input"/>
              </label><br></br>
              <input className="submitbutton" type="submit" value="Submit" />
            </form>
          </div>
    );
  }
}



export default NewUserView
