import React, { Component } from 'react';
import './usersList.css';

//main screen, import component add title
class UsersList extends Component {
  getUsers = () => {
    return this.props.users.map( e =>{
      return <li>{e.username}</li>
    })
  }

  render() {
    return (
      <div className='usersList-father'>
        <button className='addUser-button'></button>
        <ul>

        </ul>
      </div>
    );
  }
}

//exports
export default MainScreen;
