import React, { Component } from 'react';
import CreateWallet from '../createWallet/createWallet';
import PropTypes from 'prop-types';
import './CreateWalletView.css';


class CreateWalletView extends Component {
  render () {
    return (
      <div className="cwv-CreateWalletView">
        {this.props.form
          ? <CreateWallet />
          : <button className='cwv-create-wallet-button' onClick={this.props.handleOnClick}>Create Wallet</button>}
      </div>
    );
  }
}

CreateWalletView.propTypes = {
  form: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

export default CreateWalletView;
