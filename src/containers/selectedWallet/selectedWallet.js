//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';
import {getTransactions} from '../../actions';
import { Layout, Menu } from 'antd';
import Chart from 'chart.js';
import UsersList from '../../components/usersList/usersList';


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
    this.setState({showPK:!this.state.showPK});
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
            {this.props.wallet.users}
          </div>
          <div className='selectedWallet-header-publickey-button'>
            {!this.state.showPK && <button className='selectedWallet-header-button' onClick={this.showPublicKey}>Show Public Key</button>}
            {this.state.showPK &&
               <div className='selectedWallet-header-publickey'>
                 <p>{this.props.wallet.publickey}</p>
                 <button className='x' onClick={this.showPublicKey} ><p>X</p></button>
               </div>
            }
          </div>
        </header>
        {/* <div className='selectedWallet-body'>
          <div className='selectedWallet-graph-usersList'>
<<<<<<< Updated upstream
            <div className='selectedWallet-graph'>
            </div>
            <div className='selectedWallet-usersList'>

            </div>
=======
            <UsersList users ={this.props.wallet.users}></UsersList>
>>>>>>> Stashed changes
          </div>

        </div>



        */}
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
