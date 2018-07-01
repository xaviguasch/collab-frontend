import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';
import PropTypes from 'prop-types';


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
            className="createWallet_form_wallet-name"
            placeholder="Name of the wallet to create"
            size="30"
            onChange={this.captureInput}
          />
          <input
            type='submit'
            value='Create Wallet'
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
