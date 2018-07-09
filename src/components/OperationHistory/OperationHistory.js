import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OperationHistory.css';

class OperationHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        Approved: true,
        Pending: true,
        Rejected: true
      },
    }
  }

  operationStateSwitcher = (state) => {
    let stateCopy;
    switch (state) {
    case 'Approved':
      stateCopy = Object.assign({}, this.state);
      stateCopy.filter.Approved = !this.state.filter.Approved;
      this.setState(stateCopy);
    break;
    case 'Pending':
      stateCopy = Object.assign({}, this.state);
      stateCopy.filter.Pending = !this.state.filter.Pending;
      this.setState(stateCopy);
    break;
    case 'Rejected':
      stateCopy = Object.assign({}, this.state);
      stateCopy.filter.Rejected = !this.state.filter.Rejected;
      this.setState(stateCopy);
    break;
    }
  }

  renderOperationFilterer = () => {
    let filter = []
    this.props.operations.forEach(operation => {
      if(this.state.filter[operation.result] === true) filter.push(operation)
    })
    return filter;
  }

  renderOperationResultIcon = (result) => {
    switch (result) {
    case 'Approved':
      return '. Approved';
      // return '✅';
    case 'Rejected':
      return '. Rejected';
      // return '❌';
    case 'pending':
      return '. Pending';
      // return '⌛️';
    case 'Failed':
      return '. Failed Operation';
    default:
      return '. Pending';
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

  renderOperationAmount = (op) => {
    return op.type === 'transfer'
      ? `Amount: ${op.amount / 100000000}BTC`
      : `User to add: ${op.user_to_act}`;
  }

  render () {
    if (this.props.operations.length < 1) return <h3 id='no-operations'>No operations yet</h3>;
    return (
      <div className="OperationHistory">
        <div className='OperationHistoryTitle'>
          <h2>History of operations</h2>
          <div className='filterButtons'>
          <div className='Approved'>
            <button
              className='operationHistory-filerButton-approved'
              name='Approved'
              style={this.state.filter.Approved
                    ? {'background-color': 'rgba(56,175,91,0.7)'}
                    : {'background-color': 'transparent'}
                    }
              onClick={() => this.operationStateSwitcher('Approved')}
            >
            </button>
          </div>
          <div className='Pending'>
            <button
              className='operationHistory-filerButton-pending'
              name='Pending'
              style={this.state.filter.Pending
                    ? {'background-color': 'rgba(234,142,5, 0.7)'}
                    : {'background-color': 'transparent'}
                    }
              onClick={() => this.operationStateSwitcher('Pending')}
              >
              </button>
          </div>
          <div className='Rejected'>
            <button
              className='operationHistory-filerButton-rejected'
              name='Rejected'
              style={this.state.filter.Rejected
                    ? {'background-color': 'rgba(236,72,127,0.7)'}
                    : {'background-color': 'transparent'}
                    }
              onClick={() => this.operationStateSwitcher('Rejected')}
              >
              </button>
          </div>
          </div>
        </div>

        <div className='OperationHistory-grid'>
          {this.renderOperationFilterer().map(operation => {
            return <div key={operation.operation_id + operation.closed_at}
              className={(operation.result==='Approved') ? 'OperationHistory_operation3':(operation.result==='Rejected') ? 'OperationHistory_operation1':'OperationHistory_operation2'}>
              <h3>{`Type: ${this.renderOperationType(operation.type)}`}</h3>
              <p>{this.renderOperationAmount(operation)}</p>
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
