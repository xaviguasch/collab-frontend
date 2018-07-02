//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';
import { Layout, Menu } from 'antd';
import Chart from 'chart.js';
import {API} from '../../store/middlewares/apiService';
import ProposeOperation from '../../components/ProposeOperation';
import Graph from '../../components/Graph/graph.js';
import TransactionList from '../../components/TransactionList';
import OperationHistory from '../../components/OperationHistory';



const { Header, Content, Footer, Sider } = Layout;





//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPK:false
    };
  }

  //FUNCTIONALITIES
  showPublicKey = () =>{
    this.setState({showPK:!this.state.showPK});
  }

  proposeOperation = (data) => {
    this.props.fetchProposeOperation(data);
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
            {!this.state.showPK && <button className='selectedWallet-header-button' onClick={this.showPublicKey}>Show Public Key</button>}
            {this.state.showPK &&
               <div className='selectedWallet-header-publickey'>
                 <p>{this.props.wallet.publickey}</p>
                 <button className='x' onClick={this.showPublicKey} ><p>X</p></button>
               </div>
            }
          </div>
        </header>
        <div className='selectedWallet-body'>
          <div className='selectedWallet-graph-usersList'>
            <ProposeOperation wallet={this.props.wallet} proposeOperation={this.proposeOperation}/>
          </div>
          <TransactionList wallet={this.props.wallet}/>
          <OperationHistory operations={this.props.wallet.operations}/>

        </div>



      </div>

    );
  }
}


SelectedWallet.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderTransactions: PropTypes.array.isRequired,
  fetchProposeOperation: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets
});

const mapDispatchToProps = (dispatch) => ({
  fetchProposeOperation: (data) => dispatch ({
    type: 'FETCH_PROPOSE_OPERATION',
    [API]: {
      path: '/operations',
      method: 'POST',
      data
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
