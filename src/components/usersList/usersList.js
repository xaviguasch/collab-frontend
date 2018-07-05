import React, { Component } from 'react';
import './usersList.css';
import PropTypes from 'prop-types';

class UsersList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addUser:false,
      userInput: '',
      message: ''
    };
  }

  getUsers = () => {
    return this.props.users.map( e =>{
      return <li className='usersList-user' key={e.username}><p>{e.username}</p></li>;
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleOnClick = () => {
    if (!this.state.addUser) this.setState({addUser: true});
    else {
      this.submitUser();
      this.setState({addUser: false});
    }
  }

  addUser = () => {
    if(this.state.addUser) return (
      <div className='usersList-addUser'>
        <form autoComplete='off' onSubmit={this.submitUser}>
          <input onChange={this.onChange} name='userInput'
            className='usersList-addUser-input'
            value={this.state.userInput} type='text' placeholder='Username' ></input>
          <br/>
          <input onChange={this.onChange} name='message'
            className='usersList-addUser-input'
            value={this.state.message} type='text' placeholder='Description'></input>
        </form>
      </div>
    );
    return;
  }

  submitUser = (e) => {
    if(e) e.preventDefault();
    const data = {
      publicKey: this.props.publickey,
      username: this.state.userInput,
      message: this.state.message
    };
    this.props.addUser(data);
    this.setState({
      userInput:'',
      message: ''
    });
  }

  render() {
    return (
      <div className='usersList-father'>
        <div className='usersList-title'>
          <p>{this.props.alias} Collaborators</p>
        </div>
        {this.addUser()}
        <button className='addUser-button' onClick={this.handleOnClick}>Add User</button>
        {this.getUsers()}
        <ul className='usersList-list'>
          {this.getUsers}
        </ul>
      </div>
    );
  }
}

UsersList.propTypes = {
  addUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  alias: PropTypes.string.isRequired,
  publickey: PropTypes.string.isRequired
};

export default UsersList;
