import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import PropTypes from 'prop-types';
import './createWallet.css';


class CreateWallet extends Component {
  constructor (props) {
    super (props);
    this.state = {
      alias: '',
      user: null,
      users: []
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    const data = {
      alias: this.state.alias,
      users: this.state.users
    };
    this.props.fetchCreateWallet(data);
  }

  captureUser = e => {
    this.setState({
      user: e.target.value
    });
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  pushUser = () => {
    this.setState({
      users: [...this.state.users, this.state.user]
    });
  }

  deleteUser = (userToDelete) => {
    this.setState({
      users: this.state.users.filter(user => user !== userToDelete)
    });
  }

  render () {
    return (
      <div className="createwallet-createWallet">
        <form className="createwallet-createWallet_form" onSubmit={this.handleOnSubmit}>
          <input
            name="alias"
            type="text"
            className="createwallet-create_wallet_input"
            placeholder="Name of the wallet to create"
            size="30"
            value={this.state.alias}
            onChange={this.captureInput}
            required
          />
          <div className='createwallet-addUserDiv'>
            <input
              name="users"
              type="text"
              className="createwallet-create_wallet_input"
              placeholder="Add username to the wallet"
              onChange={this.captureUser}
            />
            <button className='createwallet-addUser' onClick={this.pushUser}>Add User</button>
          </div>
          <div className='createwallet-result'>
            <div className='createwallet-aliasName'>
              <p className='createwallet-wallet'>WALLET |</p>
              <p className='createwallet-alias'>{this.state.alias}</p>
            </div>
            <ul className='createwallet-users'>
              {this.state.users.length > 0
                ? this.state.users.map(user => {
                  return <div className='createwallet-user-and-remove' key={user}>
                    <li className='createwallet-user'>{user}</li>
                    <button className='createwallet-remove' onClick={() => this.deleteUser(user)}>❌</button>
                  </div>;})
                : null}
            </ul>
          </div>
          <input
            type='submit'
            value='Create Wallet'
            className='createwallet-create-button'
          />
        </form>
      </div>
    );
  }
}

CreateWallet.propTypes = {
  fetchCreateWallet: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  fetchCreateWallet: (data) => dispatch ({
    type: 'FETCH_CREATE_WALLET',
    [API]: {
      path: '/wallet',
      method: 'POST',
      body: data
    }
  })
});

export default connect(null, mapDispatchToProps)(CreateWallet);
