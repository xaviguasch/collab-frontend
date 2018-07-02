import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OperationHistory extends Component {

  renderOperationResultIcon = (result) => result === 'Approved' ? '✅' : '❌'

  render () {
    if (this.props.operations.length < 1) return <h3>No operations yet</h3>;
    return (
      <div className="OperationHistory">
        <h2>History of operations</h2>
        {this.props.operations.map(operation => {
          return <div key={operation.operation_id + operation.closed_at}
            className="OperationHistory_operation">
            <h3>{`Type: ${operation.type || 'Transaction'}`}</h3>
            <p>{`Amount: ${operation.amount / 1000000000}BTC`}</p>
            <p>{`Description: '${operation.message}'`}</p>
            <p>{`Date: ${operation.closed_at.slice(0,10)}`}</p>
            <span>{this.renderOperationResultIcon(operation.result)}</span>
            <p>{`${operation.numberOfVotes} votes:
              ${operation.numberOfAccepted} yes |
              ${operation.numberOfRejected} no`}</p>
          </div>;
        })}
      </div>
    );
  }
}

OperationHistory.propTypes = {
  operations: PropTypes.array.isRequired,
};

export default OperationHistory;
