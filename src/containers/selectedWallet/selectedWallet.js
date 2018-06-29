//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';
import {getTransactions} from '../../actions';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;





//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.getTransactions();
    this.state = {
      showPK:false
    };
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

  //FUNCTIONALITIES
  showPublicKey = () =>{
    if (!this.state.showPK){
      // this.setState({showPK:true})
      return <button className='selectedWallet-header-button'>Show Public Key</button>
    }
    return (
      <div className='selectedWallet-header-publickey'>
        <p>{this.props.wallet.publickey}</p>
        <button className='selectedWallet-header-button' onClick={this.setState({
          showPK:false
        })}>X</button>
      </div>
    )
  }

  //RENDER USERS AND TRANSACTIONS

  // renderUsers = () => {
  //   return this.state.wallet.users.map( e => {
  //     if (this.state.wallet.users.length<10){
  //       return (
  //         <div className='walletItem-userName'>
  //           <img src={icon} height='30' width='30' />
  //           <p>{e.username}</p>
  //         </div>
  //       );
  //     }
  //     else {
  //       return <p>{this.state.wallet.users.length} other collaborators</p>;
  //     }
  //   });
  // }

  // renderTransactions = () => {
  //   if(this.props.renderTransactions && this.props.renderTransactions.length){
  //     console.log(this.props.renderTransactions, 'XXXXXX');
  //   }
  //
  // }



  render() {
    return (
      <div className='selectedWallet-father' >
        <header className='selectedWallet-header'>
          <div className='selectedWallet-header-alias'>
            {this.props.wallet.alias}
          </div>
          <div className='selectedWallet-header-publickey-button'>
            {this.showPublicKey()}
          </div>
        </header>



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
