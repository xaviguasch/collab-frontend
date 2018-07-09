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
      operations: [],
      showOperations: false
    };

  }

  handleVoteOperation = (operation_id, publicKey, vote) => {
    const data = {
      operation_id,
      publicKey,
      valueOfVote: vote
    };
    this.props.fetchVoteOperation(data);
  }

  renderOperations = () => {
    return (this.props.operations.length > 0)
      ? this.props.operations.map(el => {
        return <UserVoteCard key={el.operation_id} operation={el} handleVoteOperation={this.handleVoteOperation} />;})
      : null;
  }

  render() {
    return (
      <div className="vote">
        <div className='uservotepage-click-title' onClick={()=>this.setState({
          showOperations:!this.state.showOperations
        })}>
          {/* <h2>{`Pending Operations: ${this.filterOperations().length}`}</h2>; */}
        </div>
        {this.props.showOperations
          ? <div className='uservotepage-renderoperations'>
            {this.renderOperations()}
          </div>
          : null}
      </div>
    );
  }
}

UserVotePage.propTypes = {
  operations: PropTypes.array.isRequired,
  wallet: PropTypes.object.isRequired,
  fetchVoteOperation: PropTypes.func.isRequired,
  showOperations: PropTypes.bool.isRequired
};

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

export default connect(null ,mapDispatchToProps)(UserVotePage);
