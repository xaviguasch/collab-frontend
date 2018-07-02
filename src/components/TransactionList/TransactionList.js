import React, { Component } from 'react';
import './TransactionList.css';
import PropTypes from 'prop-types'; // ES6

class TransactionList extends Component {
  render() {
    if (this.props.wallet.transactions.length < 1) return <h3>No transactions yet</h3>;
    return (
      <div className='TransactionList'>
        <h1>Transaction list</h1>
        {this.props.wallet.transactions.map(transaction => {
          return (
            <div className='transaction' key={transaction.transaction_str+Math.random()}> {/*change this*/}
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
  wallet: PropTypes.object.isRequired,
};

export default TransactionList;
