import React, { Component } from 'react';
import './usersList.css';
import PropTypes from 'prop-types';
//main screen, import component add title
class UsersList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      addUser:false,
      userInput: '',
    };
  }

  getUsers = () => {
    return this.props.users.map( e =>{
      return <li className='usersList-user'><p>{e.username}</p></li>
    });
  }

  onChange = (e) => {
    this.setState({userInput: e.target.value});
  }



  addUser = () => {
    if(this.state.addUser) return (
      <div className='usersList-addUser'>
        <form onSubmit={this.submitUser}>
          <input onChange={this.onChange} name='userInput' className='usersList-addUser-input' value={this.state.userInput} type='text'></input>
        </form>
      </div>
    );
    return;
  }

  submitUser = (e) => {
    if(e) e.preventDefault();
    const data = {
      username: this.state.userInput,
      publicKey: this.props.publickey
    };
    // console.lsog(data);
    this.props.addUser(data);
    this.setState({
      userInput:''
    });
  }

  render() {
    return (
      <div className='usersList-father'>
        <div className='usersList-title'>
          <p>{this.props.alias} Collaborators</p>
        </div>
        {this.addUser()}
        <button className='addUser-button' onClick={() => this.setState({addUser:!this.state.addUser})}>Add User</button>
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

//exports
export default UsersList;
