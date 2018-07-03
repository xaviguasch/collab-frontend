import React, { Component } from 'react';
import './UserVoteCard.css';
import PropTypes from 'prop-types';

class UserVoteCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      voted: false
    };
  }

  handleClick = (vote) => {
    this.props.handleVoteOperation(this.props.operation.operation_id, this.props.operation.publicKey, vote);
    this.setState({voted:true});
  }

  render() {
    return this.props.operation
      ? <div className="voteCard" key={this.props.operation.operation_id}>
        <h1>OPERATION</h1>
        <div className="info">
          <p className ="wallet">Wallet: {this.props.operation.publicKey}</p>
          <p className ="amount">Amount: {this.props.operation.amount}</p>
          <p className ="message">{this.props.operation.message}</p>
        </div>
        {this.state.voted
          ? <h3>Vote registered!</h3>
          : <div>
            <div>
              <button onClick={() => this.handleClick(1)}className="vote">👍</button>
            </div>
            <div>
              <button onClick={() => this.handleClick(2)}className="vote">👎</button>
            </div>
          </div>
        }
      </div>
      : null;
  }
}

UserVoteCard.propTypes = {
  operation: PropTypes.object.isRequired,
  handleVoteOperation: PropTypes.func.isRequired
};


export default UserVoteCard;
