//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';



//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      wallet: this.props.renderWallets.wallets[this.props.match.params.walletId]
    }
  }

  renderUsers = () => {
    return this.state.wallet.users.map( e => {
      if (this.state.wallet.users.length<10){
        return (
          <div className='walletItem-userName'>
            <img src={icon} height='30' width='30' />
            <p>{e.username}</p>
          </div>
        );
      }
      else {
        return <p>{this.state.wallet.users.length} other collaborators</p>;
      }
    });
  }


  render() {
    console.log(this.state.wallet);
    return (
      <div className='selectedWallet-father'>
        <div className='selectedWallet-top'>
          <p>{this.state.wallet.alias}</p>
          <p>Available Balance: {this.state.wallet.balance}</p>
          <button>Withdrawal Request</button>
          <p>Public Key: {this.state.wallet.publickey}</p>
        </div>

        <div className = 'selectedWallet-bottom'>
          <div className= 'selectedWallet-transaction'>

          </div>
          <div className='selectedWallet-collaborators'>
            {this.renderUsers()}
          </div>
        </div>


      </div>
    );
  }
}


SelectedWallet.propTypes = {
  userLogged: PropTypes.object.isRequired,
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,

});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
