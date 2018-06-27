//imports
import React, { Component } from 'react';

//users profile component, create a link to a creation of new wallet and its redirect, append all existing wallets of user
class UserProfile extends Component {
  render() {
    return (
      <div className="userprofile-father">
        <div className="userprofile-child-one">
          <div className="userprofile-background-image">
            <button className="button-create-wallet">
              Create a new Wallet
            </button>
          </div>
        </div>
        <div className="userprofile-child-two" />
      </div>
    );
  }
}

//exports
export default UserProfile;
