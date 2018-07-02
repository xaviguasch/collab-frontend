import React, { Component } from 'react';
import CreateWallet from '../createWallet/createWallet';

class CreateWalletView extends Component {
  render () {
    return (
      <div className="CreateWalletView">
        <CreateWallet />
      </div>
    );
  }
}

export default CreateWalletView;
