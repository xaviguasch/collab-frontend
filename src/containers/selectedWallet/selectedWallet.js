//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import bitcoin from '../../assets/bitcoin-logo.png';
import usericon from '../../assets/user-silhouette.png';
import approved from '../../assets/verified-text-paper.png';
import { Layout, Menu } from 'antd';
import UsersList from '../../components/usersList/usersList';
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

  addUser = (data) => {
    this.props.fetchAddUser(data);
  }

  proposeOperation = (data) => {
    this.props.fetchProposeOperation(data);
  }

  showPublicKey = () =>{
    this.setState({showPK:!this.state.showPK});
  }

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
            <div className='selectedWallet-graph'>
              <Graph wallet={this.props.wallet}></Graph>
            </div>
            <div className='selectedWallet-usersList'>
              <UsersList addUser={this.addUser} users={this.props.wallet.users}
                publickey={this.props.wallet.publickey} alias={this.props.wallet.alias}></UsersList>
            </div>
            {/* <ProposeOperation wallet={this.props.wallet} proposeOperation={this.proposeOperation}/> */}
          </div>
          <div className='selectedWallet-icons'>
            <div className='selectedWallet-icons-bitcoin'>
              <img src={bitcoin} />

            </div>
            <p>{this.props.wallet.balance/1000000000} BTC</p>
            <div className='selectedWallet-icons-user'>
              <img src={usericon} />
            </div>
            <p>{this.props.wallet.users.length} users</p>
            <div className='selectedWallet-icons-approved'>
              <img src={approved} />
            </div>
            <p>{this.props.wallet.transactions.length} transactions</p>
          </div>
          <div>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
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
  fetchGetTransactions: PropTypes.func.isRequired,
  fetchAddUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
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
  }),
  fetchAddUser: (data) => dispatch({
    type: 'FETCH_ADD_USER',
    [API] : {
      method: 'POST',
      path: '/wallet/add_user',
      body: data
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
