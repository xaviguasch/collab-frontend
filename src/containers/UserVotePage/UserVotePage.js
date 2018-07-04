import React from 'react';
import { Component } from 'react';
import './UserVotePage.css';
// import ApiClient from '../../lib/ApiClient'
import UserVoteCard from '../../components/UserVoteCard';
import { connect } from 'react-redux';
import {API} from '../../store/middlewares/apiService';

class UserVotePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      operations: []
    };

  }


  componentDidMount() {
    this.props.fetchPendingOperations();

  }

  handleVoteOperation = (operation_id, publicKey, vote) => {
    const data = {
      operation_id,
      publicKey,

      vote
    }
    this.props.fetchVoteOperation(data);

  }

  render() {
    return (
      <div className="vote">
        { this.props.pendingOperations.length > 1
          ? this.props.pendingOperations.map((el, i) => {
            return <UserVoteCard key={el.operation_id} operation={el} handleVoteOperation={this.handleVoteOperation} />}) // marke sure to fix Math.random
          : <h4>loading...</h4>
        }
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

  pendingOperations: state.operations
});

const mapDispatchToProps = (dispatch) => ({
  fetchPendingOperations: () => dispatch ({
    type: 'FETCH_PENDING_OPERATIONS',
    [API]: {
      path: '/operations/pending',
      method: 'GET'
    }
  }),

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
