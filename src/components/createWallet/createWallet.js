import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import PropTypes from 'prop-types';


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
      <div className="createWallet">
        <form className="createWallet_form" onSubmit={this.handleOnSubmit}>
          <input
            name="alias"
            type="text"
            className="createWallet_form_wallet-name"
            placeholder="Name of the wallet to create"
            size="30"
            onChange={this.captureInput}
            required
          />
          <input
            type='submit'
            value='Create Wallet'
          />
        </form>
        <button onClick={this.pushUser}>Add User</button>
        <input
          name="users"
          type="text"
          placeholder="Add username to the wallet"
          onChange={this.captureUser}
        >
        </input>
        <ul>
          {this.state.users.length > 0
            ? this.state.users.map(user => {
              return <div key={user}>
                <button onClick={() => this.deleteUser(user)}>❌</button>
                <li>{user}</li>
              </div>;})
            : null}
        </ul>
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
