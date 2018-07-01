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
import ProposeOperation from '../../components/ProposeOperation';
import Graph from '../../components/Graph/graph.js'



const { Header, Content, Footer, Sider } = Layout;





//user logged component, small div on right side of the navbar that onclick redirects you user profile
class SelectedWallet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPK:false
    };
  }

  addUser = (data) => {
    this.props.fetchAddUser(data)
  }

  proposeOperation = (data) => {
    this.props.fetchProposeOperation(data);
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
            {/* <ProposeOperation wallet={this.props.wallet} proposeOperation={this.proposeOperation}/> */}
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
  fetchAddUser: PropTypes.func.isRequired,
  fetchProposeOperation: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,

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
      data
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
