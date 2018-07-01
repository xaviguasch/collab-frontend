//imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './selectedWallet.css';
import PropTypes from 'prop-types'; // ES6
import icon from '../../assets/user_icon.jpg';
import { Layout, Menu } from 'antd';
import Chart from 'chart.js';
import UsersList from '../../components/usersList/usersList';
import {API} from '../../store/middlewares/apiService';


const { Header, Content, Footer, Sider } = Layout;





//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.props.fetchGetTransactions(this.props.wallet.publickey);
    this.state = {
      showPK:false
    };
  }

  addUser = (data) => {
    this.props.fetchAddUser(data)
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

            </div>
            <div className='selectedWallet-usersList'>
              <UsersList addUser={this.addUser} users={this.props.wallet.users}
                publickey={this.props.wallet.publickey} alias={this.props.wallet.alias}></UsersList>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


SelectedWallet.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderTransactions: PropTypes.array.isRequired,
  fetchGetTransactions: PropTypes.func.isRequired,
  fetchAddUser: PropTypes.func.isRequired
};

//exports
const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
  transactions:state.transactions
});

const mapDispatchToProps = (dispatch) => ({
  fetchGetTransactions: (publickey) => dispatch ({
    type: 'FETCH_GET_TRANSACTIONS',
    [API]: {
      path: `/transactions/${publickey}`
    }
  }),
  fetchAddUser: (data) => dispatch({
    type: 'FETCH_ADD_USER',
    [API] : {
      method: 'POST',
      path: '/wallet/add_user',
      data
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
