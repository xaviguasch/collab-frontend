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
    event.preventDefault()
    if (this.state.password !== this.state.confirmedpassword) throw Error;
    let data = {
      'username': this.state.username,
      'pubkey': this.state.pubkey,
      'password': this.state.password,
      'email': this.state.email
    }
    fetch("http://private-eb9653-collab5.apiary-mock.com/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res))


  }


  render() {
    return (
            <form className="form" onSubmit={this.handleSubmit}>
              <label className="formfield" id="username">
                <p className="form-name">Username</p>
                <input
                  className="inputfield"
                  placeholder="choose a username..."
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  id="username-input"/>
              </label>
              <label className="formfield" id="pubkey">
                <p className="form-name">Public Key</p>
                <input
                  className="inputfield"
                  placeholder="enter your public key..."
                  onChange={this.handleChange}
                  type="text"
                  name= "pubkey"
                  id="pubkey-input"/>
              </label>
              <label className="formfield" id="password">
              <p className="form-name">Password</p>
                <input
                  className="inputfield"
                  placeholder="choose your password..."
                  onChange={this.handleChange}
                  type="password"
                  name= "password"
                  id="password-input"/>
              </label>
              <label className="formfield" id="confirmpassword">
                <p className="form-name">Confirm Password</p>
                <input
                  className="inputfield"
                  placeholder="confirm your password..."
                  onChange={this.handleChange}
                  type="password"
                  name="confirmedpassword"
                  id="confirmpassword-input"/>
              </label>
              <label className="formfield" id="email">
                <p className="form-name">e-mail</p>
                <input
                  className="inputfield"
                  placeholder="enter your e-mail..."
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="email-input"/>
              </label>
              <input className="submitbutton" type="submit" value="Submit" />
            </form>
    );
  }
}



export default NewUserView
