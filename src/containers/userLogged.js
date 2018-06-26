//imports
import React, { Component } from "react";
import { connect } from "react-redux";

//main screen, import component add title
class UserLogged extends Component {
  render() {
    return <div className="userlogged-component">{this.props.UserLogged}</div>;
  }
}

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogged);
