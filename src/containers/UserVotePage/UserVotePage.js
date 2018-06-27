import React from 'react';
import { Component } from 'react'
import './UserVotePage.css'
// import ApiClient from '../../lib/ApiClient'
import UserVoteCard from '../../components/UserVoteCard'
import { connect } from 'react-redux'

import {API} from '../../store/middlewares/apiService'

class UserVotePage extends React.Component {

  componentDidMount() {
    this.props.fetchPendingOperations()
  }

  render() {
    console.log(this.props)
    return (
        <div className="vote">
        { this.props.pendingOperations.length
          ? this.props.pendingOperations.map((el, i) =>
          <UserVoteCard key={Math.random()} operation={el} />)
          : <h4>loading...</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pendingOperations: state.operations
})
const mapDispatchToProps = (dispatch) => ({
  fetchPendingOperations: () => dispatch ({
    type: 'FETCH_PENDING_OPERATIONS',
    [API]: {
      path: '/vote/',
      method: 'GET'
    }
  })
})

export default connect(mapStateToProps ,mapDispatchToProps)(UserVotePage)
