//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {API} from '../../store/middlewares/apiService';

import SelectedWallet from '../../containers/selectedWallet';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.getWallets();
  }

  getWallets = () => {
    this.props.fetchGetWallets();
  }

  handleOnClick = (e) => {
    this.setState({
      view:e
    });
  }

  renderWallets = () => {
    if(this.props.renderWallets.wallets && this.props.renderWallets.wallets.length) {
      return this.props.renderWallets.wallets.map(e => {
        return (
          <Menu.Item key={Math.random()} >
            <a onClick={this.selectedWallet}>
              <div className='userprofile-menuitem'>
                <p>{e.alias}</p>
                <p>{e.balance/1000000000}</p>
              </div>
            </a>
          </Menu.Item>
        );
      });
    }
  }

  selectedWallet = () => {
    if(this.state.view===null) return;//createWallet Component
    return <SelectedWallet wallet = {this.state.view} ></SelectedWallet>;
  }

  render() {
    return (
      <div className ='userprofile-father'>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              {this.renderWallets()}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
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
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
          </Layout>
        </Layout>
      </div>
      // <div className="userprofile-father">
      //   <div className="userprofile-child-one">
      //     <div className="userprofile-background-image">
      //
      //       <button className="button-create-wallet">
      //         Create a new Wallet
      //       </button>
      //     </div>
      //   </div>
      //   <div className="userprofile-child-two">
      //     {this.renderWallets()}
      //   </div>
      // </div>
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
  renderWallets: state.getWallets,
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

//exports
