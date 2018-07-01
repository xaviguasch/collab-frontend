import React, { Component } from 'react';
import './TransactionList.css';
import PropTypes from 'prop-types'; // ES6

class TransactionList extends Component {

  render() {
    return (
      <div className='TransactionList'>
        <h1>Transaction list</h1>
        {this.props.transactions.map(transaction => {
          return (
            <div className='transaction' key={transaction.transaction_str}>
              <h1>transaction</h1>
              <p>
                <span>{transaction.amount/1000000000} BTC</span>
                <span>{transaction.date.slice(0,10)}</span>
                <span>ID: {transaction.transaction_str}</span>
                <span>{transaction.type}</span>
                {transaction.counter_party ? <span>{transaction.counter_party}</span> : null}
                <span>{transaction.message}</span>
              </p>
            </div>
          );})}
      </div>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;
