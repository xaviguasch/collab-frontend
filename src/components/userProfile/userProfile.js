//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getWallets} from '../../actions';
<<<<<<< HEAD
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
=======
import WalletItem from '../walletItem/walletItem';
import CreateWallet from '../createWallet';
>>>>>>> development

//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {

  constructor (props) {
    super(props);
    this.getWallets();
  }

  getWallets = () => {
    fetch('http://192.168.1.241:3030/wallet',
      {
        headers:{

          'Authorization':'Bearer '+this.props.userLogged.jwt
        }
      }
    )
      .then(data => data.json())
      .then(data => this.props.getWallets(data));

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
    console.log('CLICKED');
      // <SelectedWallet></SelectedWallet>
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
};



const mapStateToProps = state => ({
  userLogged: state.userLogged,
  renderWallets: state.getWallets,
});

const mapDispatchToProps = (dispatch) => ({

  getWallets: data => dispatch(getWallets(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

//exports
