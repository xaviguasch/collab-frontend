import React,  { Component } from 'react';
import arrowup from '../../assets/arrowup.png';
import arrowdown from '../../assets/arrowdown.png';
import line from '../../assets/substract.png';
import './btcticker.css';

class BTCTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      movement: 0,
    };
  }


  componentDidMount() {
    let price = 0;
    let movement = 0;
    this.state.rate = setInterval( async () => {
      price = await fetch('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR');
      price = await price.json();
      movement = price.data.quotes['EUR'].percent_change_1h;
      this.setState({movement});
      price = price.data.quotes['EUR'].price.toFixed(2);
      this.setState({rate: price});
    }, 1000);

  }

  render() {
    const ticker = this.state.movement;
    let src;

    if (ticker > 0) {
      src = arrowup;
    } else if (ticker < 0){
      src = arrowdown;
    } else src = line;

    return (
      <div className='btc-ticker'>
        <p className="btc-price"> ₿ = €{this.state.rate}</p>
        <p className='btc-movement'> {this.state.movement}%</p>
        <img className='btc-arrow' src={src} />
      </div>
    );
  }

}

export default BTCTicker;
