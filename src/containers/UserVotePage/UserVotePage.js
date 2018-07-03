import React from 'react';
import { Component } from 'react';
import './UserVotePage.css';
// import ApiClient from '../../lib/ApiClient'
import UserVoteCard from '../../components/UserVoteCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {API} from '../../store/middlewares/apiService';

class UserVotePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      operations: []
    };
    this.filterOperations();
  }

  handleVoteOperation = (operation_id, publicKey, vote) => {
    const data = {
      operation_id,
      publicKey,
      valueOfVote: vote
    };
    this.props.fetchVoteOperation(data);
  }

  filterOperations = () => {
    const ops = [];
    this.props.operations.forEach(op => {
      if (op.publicKey === this.props.wallet.publickey
      && op.votingState == 0) ops.push(op);
    });
    return ops;
  }

  renderOperations = () => {
    return this.props.operations.length > 0
      ? this.filterOperations().map(el => {
        return <UserVoteCard key={el.operation_id} operation={el} handleVoteOperation={this.handleVoteOperation} />;})
      : <h3>There are no pending operations</h3>;
  }

  render() {
    return (
      <div className="vote">
        <h2>Pending Operations</h2>;
        {this.renderOperations()}
      </div>
    );
  }
}

UserVotePage.propTypes = {
  operations: PropTypes.array.isRequired,
  wallet: PropTypes.object.isRequired,
  fetchVoteOperation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  operations: state.operations
});

const mapDispatchToProps = (dispatch) => ({
  fetchVoteOperation: (data) => dispatch ({
    type: 'FETCH_VOTE_OPERATION',
    [API]: {
      path: '/vote',
      method: 'POST',
      body: data
    }
  })
});

export default connect(mapStateToProps ,mapDispatchToProps)(UserVotePage);
