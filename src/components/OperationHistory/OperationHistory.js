import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OperationHistory.css';

class OperationHistory extends Component {

  renderOperationResultIcon = (result) => {
    switch (result) {
    case 'Approved':
      return 'Approved';
      // return '✅';
    case 'Rejected':
      return 'Rejected';
      // return '❌';
    case 'pending':
      return 'Pending';
      // return '⌛️';
    case 'Failed':
    return 'Failed Operation';
    default:
      return 'Pending';
      // return '⌛️';
    }
  }

  renderOperationType = (type) => {
    switch (type) {
    case 'adduser':
      return 'Add Collaborator';
    case 'transfer':
      return 'Transaction';
    default:
      return 'Undefined type';
    }
  }

  render () {
    if (this.props.operations.length < 1) return <h3 id='no-operations'>No operations yet</h3>;
    return (
      <div className="OperationHistory">
        <div className='OperationHistory'>
          <h2>History of operations</h2>
        </div>
        <div className='OperationHistory-grid'>
          {this.props.operations.map(operation => {
            return <div key={operation.operation_id + operation.closed_at}
              className={(operation.result==='Approved') ? 'OperationHistory_operation3':(operation.result==='Rejected') ? 'OperationHistory_operation1':'OperationHistory_operation2'}>
              <h3>{`Type: ${this.renderOperationType(operation.type)}`}</h3>
              <p>{`Amount: ${operation.amount / 100000000}BTC`}</p>
              <p>{`Description: '${operation.message}'`}</p>
              <div className='OperationHistory-operation-bottom'>
                <p>{(operation.closed_at) ? `Date: ${operation.closed_at.slice(0,10)}`: 'To be determined'}</p>
                <div>
                  <span>{this.renderOperationResultIcon(operation.result)}</span>
                  <p>{`${operation.numberOfVotes} votes:
                    ${operation.numberOfAccepted} yes |
                    ${operation.numberOfRejected} no`}</p>
                </div>
              </div>
            </div>;
          })}
        </div>
      </div>
    );
  }
}

OperationHistory.propTypes = {
  operations: PropTypes.array.isRequired,
};

export default OperationHistory;
