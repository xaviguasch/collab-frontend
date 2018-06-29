//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getWallets} from '../../actions';
import WalletItem from '../walletItem/walletItem';

//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {

  constructor (props) {
    super(props);
    this.getWallets();
  }

  getWallets = () => {
    fetch('http://192.168.1.241:3030/wallet',
      {
        headers:{

          'Authorization':'Bearer '+this.props.userLogged.jwt
        }
      }
    )
      .then(data => data.json())
      .then(data => this.props.getWallets(data));

    // this.props.userLogged.wallets.map( e =>{
    //   <walletItem wallet = {e}/>;
    // });
  }

  renderWallets = () => {
    if(this.props.renderWallets.wallets && this.props.renderWallets.wallets.length) {
      let id = -1;
      return this.props.renderWallets.wallets.map(e => {
        id++;
        return <WalletItem key={Math.random()} wallet = {e} id = {id}/>;
      });
    }
  }

  render() {
    return (
      <div className="userprofile-father">
        <div className="userprofile-child-one">
          <div className="userprofile-background-image">
            <button className="button-create-wallet">
              Create a new Wallet
            </button>
          </div>
        </div>
        <div className="userprofile-child-two">
          {this.renderWallets()}
        </div>
      </div>
    );
  }
}


UserProfile.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderWallets: PropTypes.object.isRequired,
  getWallets: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
});

const mapDispatchToProps = (dispatch) => ({

  getWallets: data => dispatch(getWallets(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

//exports
