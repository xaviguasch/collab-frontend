//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './userLogged.css';
import PropTypes from 'prop-types'; // ES6


//user logged component, small div on right side of the navbar that onclick redirects you user profile
class UserLogged extends Component {
  render() {
    return (
      <Link to="/user" className="userlogged-component">
        <em>User: </em>
        {this.props.userLogged.username.toUpperCase()}
      </Link>
    );
  }
}


UserLogged.propTypes = {
  userLogged: PropTypes.object.isRequired,
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogged);
