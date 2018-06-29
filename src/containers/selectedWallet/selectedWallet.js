//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';
import {getTransactions} from '../../actions';




//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      wallet: this.props.renderWallets.wallets[this.props.match.params.walletId]
    }
    this.getTransactions()
  }

  getTransactions = () =>{
    fetch('http://192.168.1.241:3030/operations/history',
      {
        headers:{

          'Authorization':'Bearer '+this.props.userLogged.jwt
        }
      }
    )
      .then(data => data.json())
      .then(data => this.props.getTransactions(data));
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

  // renderTransactions = () => {
  //   if(this.props.renderTransactions && this.props.renderTransactions.length){
  //     console.log(this.props.renderTransactions, 'XXXXXX');
  //   }
  //
  // }



  render() {
    console.log(this.state.wallet);
    return (
      <div className='selectedWallet-father'>
        <div className='selectedWallet-top'>
          <h3>{this.state.wallet.alias}</h3>
          <p>Available Balance: {this.state.wallet.balance}</p>
          <button>Withdrawal Request</button>
          <p>Public Key: {this.state.wallet.publickey}</p>
        </div>

        <div className = 'selectedWallet-bottom'>
              <div className= 'selectedWallet-transaction'>
            <div className= 'selectedWallet-transaction-title'>
              <h3>Transactions</h3>
            </div>
            <div className= 'selectedWallet-transaction-history'>
              {/* {this.renderTransactions()} */}
            </div>
          </div>
          <div className='selectedWallet-collaborators'>
            <div className='selectedWallet-collaborators-title'>
            <h3>Collaborators</h3>
            </div>
            <div className='selectedWallet-collaborators-list'>
            {this.renderUsers()}
            </div>
          </div>
        </div>


      </div>
    );
  }
}


SelectedWallet.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderTransactions: PropTypes.array.isRequired
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
  renderTransactions:state.userTransaction

});

const mapDispatchToProps = (dispatch) => ({
  getTransactions: data => dispatch(getTransactions(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
