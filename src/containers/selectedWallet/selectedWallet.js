//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import bitcoin from '../../assets/bitcoin-logo.png';
import usericon from '../../assets/user-silhouette.png';
import approved from '../../assets/verified-text-paper.png';
import UsersList from '../../components/usersList/usersList';
import {API} from '../../store/middlewares/apiService';
import ProposeOperation from '../../components/ProposeOperation';
import UserVotePage from '../../containers/UserVotePage';
import Graph from '../../components/Graph/graph.js';
import TransactionList from '../../components/TransactionList';
import OperationHistory from '../../components/OperationHistory';




//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPK:false,
      showAddTrans: false,
      price:null,
      showOperations: false
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

  calcProportionInbOutbTransactions = () => {
    if (this.props.wallet.transactions.length < 1) return (
      <div className='in-out'>
        <p>0% | 0%</p>
        <h8>inbound | outbound </h8>
      </div>
    );
    let totalTx = this.props.wallet.transactions.length;
    let outboundTx = 0;
    let inboundTx = 0;
    this.props.wallet.transactions.forEach(e => {
      if (e.type==='outbound') outboundTx++;
      if (e.type==='inbound') inboundTx++;
    });

    return (
      <div className='in-out'>
        <p>{`${((inboundTx / totalTx) * 100).toFixed()}% | ${((outboundTx / totalTx) * 100).toFixed()}%`}</p>
        <h8>inbound | outbound </h8>
      </div>
    );
  }

  addTransactionButton = () => {
    this.setState({showAddTrans:!this.showAddTrans});
  }

  percentageOperation = () => {
    let approved = 0;
    let rejected = 0;
    if (this.props.wallet.operations.length < 1) return 0;
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

  fetchPendingOperations = () => {
    this.props.fetchPendingOperations();
  }

  fetchGetWallets = () => {
    this.props.fetchGetWallets();
  }

  filterOperations = () => {
    const ops = [];
    //console.log('=======',this.props.operations);
    if (this.props.operations.length < 1) return ops;
    this.props.operations.forEach(op => {
      if (op.publicKey === this.props.wallet.publickey
      && op.votingState == 0) ops.push(op);
    });
    return ops;
  }


  renderOperationsNotification = () => {
    const ops = this.filterOperations();
    return ops.length > 0
      ? <button id='jons-button' onClick={() => this.setState({showOperations: !this.state.showOperations})}>
        {`Pending Operations: ${this.filterOperations().length}`}
      </button>
      : <p id='no-pending-ops'>No pending operations</p>;
  }

  render() {
    return (
      <div className='selectedWallet-father' >
        <header className='selectedWallet-header'>
          <div className='selectedWallet-header-alias'>
            {this.props.wallet.alias}
          </div>
          {this.renderOperationsNotification()}
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
          <UserVotePage wallet={this.props.wallet}
            operations={this.filterOperations()}
            className='selectedWallet-header-operations'
            showOperations={this.state.showOperations}/>
          <div className='selectedWallet-graph-usersList'>
            <div className='selectedWallet-graph'>
              <Graph wallet={this.props.wallet}></Graph>
            </div>
            <div className='selectedWallet-usersList'>
              <UsersList addUser={this.addUser} users={this.props.wallet.users}
                publickey={this.props.wallet.publickey} alias={this.props.wallet.alias}></UsersList>
            </div>
          </div>

          <div className='selectedWallet-icons'>

            <div className='selectedWallet-icons-bitcoin-father'>
              <div className='selectedWallet-icons-bitcoin'>
                <img src={bitcoin} />
              </div>
              <div className='selectedWallet-icon-each-info'>
                <p>{(this.props.wallet.balance/100000000).toFixed(4)}</p>
                <h8>BTC</h8>
              </div>
              <div className='selectedWallet-icon-each-info-hover'>
                <p>{((this.props.wallet.balance/100000000)*Number(this.state.price)).toFixed(2)}</p>
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
                {this.calcProportionInbOutbTransactions()}
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
            {this.state.showAddTrans && <ProposeOperation wallet={this.props.wallet}
              proposeOperation={this.proposeOperation}
              fetchPendingOperations={this.fetchPendingOperations}
              fetchGetWallets={this.fetchGetWallets}/> }
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
  fetchPendingOperations: PropTypes.func.isRequired,
  fetchGetWallets: PropTypes.func.isRequired,
  operations: PropTypes.array.isRequired
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
  operations: state.operations
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
  }),
  fetchPendingOperations: () => dispatch({
    type: 'FETCH_ALL_PENDING_OPERATIONS',
    [API]: {
      path: '/operations/pending'
    }
  }),
  fetchGetWallets: () => dispatch({
    type: 'FETCH_GET_WALLETS',
    [API]: {
      path: '/wallet'
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
