//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//user logged component, small div on right side of the navbar that onclick redirects you user profile
class UserLogged extends Component {
  render() {
    return (
      <Link to="/user" className="userlogged-component">
        {this.props.userLogged.username}
      </Link>
    );
  }
}

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogged);
