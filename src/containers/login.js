//imports
import React, { Component } from "react";
import { connect } from "react-redux";

//login component, add two text-areas one for username and another for password
//get method to check validation, if response is positive append user component on navbar
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getUser = () => {
    fetch("http://localhost:8000/loginUser", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => this.props.userLogged(data));
  };

  render() {
    return (
      <form className="login-component" onSubmit="getUser">
        <input
          type="text"
          className="login-component-item"
          placeholder="Username..."
          size="20"
          onChange={this.captureInput}
        />
        <input
          type="text"
          className="login-component-item"
          placeholder="Password..."
          size="20"
          onChange={this.captureInput}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  userLogged: data => dispatch(userLogged(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
