//imports
import React, { Component } from 'react';
import './userProfile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getWallets} from '../../actions';
import { Layout, Menu } from 'antd';
import CreateWallet from '../createWallet';
import SelectedWallet from '../../containers/selectedWallet';
const { Header, Content, Footer, Sider } = Layout;

//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {

  constructor (props) {
    super(props);
    this.getWallets();
    this.state = {
      view : null
    };
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

  handleOnClick = (e) => {
    this.setState({
      view:e
    })
  }

  renderWallets = () => {
    if(this.props.renderWallets.wallets && this.props.renderWallets.wallets.length) {
      return this.props.renderWallets.wallets.map(e => {
        return (

          <Menu.Item key={e.publickey} >
            <div onClick={() => this.handleOnClick(e)}>
              <div className='userprofile-menuitem'>
                <p >{e.alias}</p>
                <p>{e.balance/1000000000}</p>
              </div>
            </div>
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
            {this.selectedWallet()}
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
