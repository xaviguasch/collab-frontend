//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import bitcoin from '../../assets/bitcoin-logo.png';
import usericon from '../../assets/user-silhouette.png';
import approved from '../../assets/verified-text-paper.png';
import { Layout } from 'antd';
import UsersList from '../../components/usersList/usersList';
import {API} from '../../store/middlewares/apiService';
import ProposeOperation from '../../components/ProposeOperation';
import UserVotePage from '../../containers/UserVotePage';
import Graph from '../../components/Graph/graph.js';
import TransactionList from '../../components/TransactionList';
import OperationHistory from '../../components/OperationHistory';



const { Header, Content, Footer, Sider } = Layout;


//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPK:false,
      showAddTrans: false,
      price:null
    };
    this.fetchBTC();
  }

  //FUNCTIONALITIES
  fetchBTC = () => {
    fetch('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR')
      .then(price =>price.json())
      .then(price => price = price.data.quotes['EUR'].price.toFixed(2))
      .then(price => this.setState({
        price:price
      }));
  }

  addTransactions = () => {
    let totalTransactions = 0;
    this.props.wallet.transactions.forEach(e => {
      if (e.type==='outbound') {
        totalTransactions = totalTransactions - (e.amount/1000000000);
      } else {
        totalTransactions = totalTransactions + (e.amount/1000000000);
      }
    }
    );
    return (totalTransactions*Number(this.state.price)).toFixed(2);
  }

  addTransactionButton = () => {
    this.setState({showAddTrans:!this.showAddTrans});
  }

  percentageOperation = () => {
    let approved = 0;
    let rejected = 0;
    this.props.wallet.operations.forEach(e=>{
      if(e.result==='Approved') approved++;
      if(e.result==='Rejected') rejected++;
    });

    return ((approved/(approved+rejected))*100).toFixed(2);
  }

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
    console.log(this.addTransactions());
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
          <UserVotePage wallet={this.props.wallet} />
          <div className='selectedWallet-graph-usersList'>
            <div className='selectedWallet-graph'>
              <Graph wallet={this.props.wallet}></Graph>
            </div>
            <div className='selectedWallet-usersList'>
              <UsersList addUser={this.addUser} users={this.props.wallet.users}
                publickey={this.props.wallet.publickey} alias={this.props.wallet.alias}></UsersList>
            </div>
            <ProposeOperation wallet={this.props.wallet} proposeOperation={this.proposeOperation}/>
          </div>

          <div className='selectedWallet-icons'>

            <div className='selectedWallet-icons-bitcoin-father'>
              <div className='selectedWallet-icons-bitcoin'>
                <img src={bitcoin} />
              </div>
              <div className='selectedWallet-icon-each-info'>
                <p>{(this.props.wallet.balance/1000000000).toFixed(4)}</p>
                <h8>BTC</h8>
              </div>
              <div className='selectedWallet-icon-each-info-hover'>
                <p>{((this.props.wallet.balance/1000000000)*Number(this.state.price)).toFixed(2)}</p>
                <h8>EUR/BTC</h8>
              </div>
            </div>


            <div className='selectedWallet-icons-user-father'>
              <div className='selectedWallet-icons-user'>
                <img src={usericon} />
              </div>
              <div className='selectedWallet-icon-each-info'>
                <p id='userinfo'>{this.props.wallet.users.length}</p>
                <h8>Collaborators</h8>
              </div>
              <div className='selectedWallet-icon-each-info-hover'>
                <p>{this.props.wallet.users[0].username}</p>
                <h8>Admin</h8>
              </div>
            </div>

            <div className='selectedWallet-icons-approved-father'>
              <div className='selectedWallet-icons-approved'>
                <img src={approved} />
              </div>
              <div className='selectedWallet-icon-each-info'>
                <p>{this.props.wallet.transactions.length}</p>
                <h8>Transactions</h8>
              </div>
              <div className='selectedWallet-icon-each-info-hover'>
                <p>{(this.addTransactions()>=0) ? `+${this.addTransactions()}`:`-${this.addTransactions()}`}</p>
                <h8>Total EUR</h8>
              </div>
            </div>

            <div className='selectedWallet-icons-operation-father'>
              <div className='selectedWallet-icons-operation'>
                <img src={approved} />
              </div>
              <div className='selectedWallet-icon-each-info'>
                <p>{this.props.wallet.operations.length}</p>
                <h8>Operations</h8>
              </div>
              <div className='selectedWallet-icon-each-info-hover'>
                <p>{this.percentageOperation()}%</p>
                <h8>Successful Ops.</h8>
              </div>
            </div>
          </div>

          <TransactionList wallet={this.props.wallet}/>
          <div className='ProposeOperation-button'>
            {this.state.showAddTrans && <ProposeOperation wallet={this.props.wallet} proposeOperation={this.proposeOperation}/> }
            <button onClick={this.addTransactionButton} className='addTransactionButton'>Create Transaction</button>
          </div>
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
  operations: PropTypes.array.isRequired
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
      body: data
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
