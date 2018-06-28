//import
import React, { Component } from 'react';
import './walletItem.css';
import { Link } from 'react-router-dom';
import icon from '../../assets/user_icon.jpg';


//individual comopenent for each wallet that the user has, must show basic information

class WalletItem extends Component {

  constructor (props) {
    super(props);

  }
  //
  renderUsers = () => {
    return this.props.wallet.users.map( e => {
      if (this.props.wallet.users.length<5){
        return (
          <div className='walletItem-userName'>
            <img src={icon} height='30' width='30' />
            <p>{e.username}</p>
          </div>
        );
      }
      else {
        return <p>{this.props.wallet.users.length} other collaborators</p>;
      }
    });
  }

  render() {
    // console.log(this.props.wallet)
    // console.log(this.props.id);
    return (
      <Link to={`/selectedWallet/${this.props.id}`} className='walletItem-father' >
        <div className='walletItem-child-top'>
          <p>{this.props.wallet.alias}</p>
          {/* <p>Public Key: {this.props.wallet.publickey}</p> */}
        </div>
        <div className='walletItem-child-bottom'>
          <div className='walletItem-users'>
            {this.renderUsers()}
          </div>
          <div className='walletItem-amount'>
            <p> Available Balance: {this.props.wallet.balance}</p>
          </div>
        </div>

      </Link>
    );
  }
}

export default WalletItem;
