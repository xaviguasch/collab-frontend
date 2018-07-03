import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import PropTypes from 'prop-types';
import './createWallet.css'


class CreateWallet extends Component {
  handleOnSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.props.fetchCreateWallet(this.state.walletName);
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    return (
      <div className="createWallet">
        <form className="createWallet_form" onSubmit={this.handleOnSubmit}>
          <input
            name="walletName"
            type="text"
            className="create_wallet_input"
            placeholder="Name of the wallet to create"
            size="30"
            onChange={this.captureInput}
          />
          <div className='addUserDiv'>
          <input
            name="users"
            type="text"
            className="create_wallet_input"
            placeholder="Add username to the wallet"
            onChange={this.captureUser}
          />
          <button className='addUser' onClick={this.pushUser}>Add User</button>
          </div>
        <div className='result'>
          <div className='aliasName'>
            <p className='wallet'>WALLET |</p>
            <p className='alias'>{this.state.alias}</p>
          </div>
          <ul className='users'>
            {this.state.users.length > 0
              ? this.state.users.map(user => {
                return <div className='user-and-remove' key={user}>
                  <li className='user'>{user}</li>
                  <button className='remove' onClick={() => this.deleteUser(user)}>❌</button>
                </div>;})
                : null}
              </ul>
        </div>
        <input
          type='submit'
          value='Create Wallet'
          className='create-button'
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
      body: {
        alias: data
      }
    }
  })
});

export default connect(null, mapDispatchToProps)(CreateWallet);
