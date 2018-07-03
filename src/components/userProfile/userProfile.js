//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectedWallet from '../../containers/selectedWallet';
import { Layout, Menu } from 'antd';
import {API} from '../../store/middlewares/apiService';
import CreateWallet from '../createWallet';
import CreateWalletView from '../CreateWalletView';
import { Redirect } from 'react-router';

const { Sider } = Layout;


//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.getWallets();
    this.state = {
      view: 'addWalletView',
      form: false,
    };
  }

  getWallets = () => {
    this.props.fetchGetWallets();
  }

  handleOnClick = (e) => {
    this.setState({
      view:e
    });
  }

  handleAddWallet = () => {
    this.setState({
      form: true,
      view: 'addWalletView'
    });
  }

  renderSideWallets = () => {
    if(this.props.renderWallets.wallets && this.props.renderWallets.wallets.length) {
      return this.props.renderWallets.wallets.map(e => {
        return (
          <Menu.Item key={e.publickey} >
            <a onClick={() => this.handleOnClick(e)}>
              <div className='userprofile-menuitem'>
                <p >{e.alias}</p>
                <p>{(e.balance/1000000000).toFixed(4)}</p>
                {/* <p>{(e.balance/1000000000) * this.state.rate}</p> */}
              </div>
            </a>
          </Menu.Item>
        );
      });
    }
  }

  renderMainWallet = () => {
    if(this.state.view==='addWalletView') return (
      <CreateWalletView handleOnClick={this.handleAddWallet}
        form={this.state.form} />);
    return <SelectedWallet wallet={this.state.view}></SelectedWallet>;
  }

  renderCreateWallet = () => {
    if(this.state.form===false) return;
    return <CreateWallet/>;
  }



  render() {
    if (!this.props.userLogged.username) return <Redirect to='/' />;
    return (
      <div className ='userprofile-father'>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              {this.renderSideWallets()}
              <button onClick={() => this.handleAddWallet()} primary
                className='addwallet' theme="dark">Add Wallet</button>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            {this.renderMainWallet()}
          </Layout>
        </Layout>
      </div>
    );
  }
}


UserProfile.propTypes = {
  userLogged: PropTypes.object.isRequired,
  renderWallets: PropTypes.object.isRequired,
  getWallets: PropTypes.object.isRequired,
  fetchGetWallets: PropTypes.func.isRequired,
};



const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets
});

const mapDispatchToProps = (dispatch) => ({
  fetchGetWallets: () => dispatch({
    type: 'FETCH_GET_WALLETS',
    [API]: {
      path: '/wallet'
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
