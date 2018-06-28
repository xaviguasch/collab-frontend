import React, { Component } from 'react'
import './UserVoteCard.css'
import ApiClient from '../../lib/ApiClient'

class UserVoteCard extends React.Component {



  render() {
    // console.log('HEY ITS ME', this.props.operation[0])
        return this.props.operation
        ? <div className="voteCard" id={this.props.operation}>
          <div className="info">
            <p className ="wallet">Wallet: {this.props.operation.publicKey}</p>
            <p className ="amount">Amount: {this.props.operation.amount}</p>
            <p className ="message">{this.props.operation.message}</p>
          </div>
          <div>
            <button onClick={() => this.props.handleVoteOperation(this.props.operation.operation_id, this.props.operation.publicKey, 1)}className="vote">👍</button>
          </div>
          <div>
            <button onClick={() => this.props.handleVoteOperation(this.props.operation.operation_id, this.props.operation.publicKey, 0)}className="vote">👎</button>
          </div>
          </div>
        : null
  }
}



export default UserVoteCard
