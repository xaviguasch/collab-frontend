import React,  { Component } from 'react'
// import arrow-up from '../../assets/arrow-up.png'
// import arrow-up from '../../assets/arrow-up.png'

class BTCTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
      movement: 0,
    }
  }


  componentDidMount() {
    let price = 0
    let movement = 0
    this.state.rate = setInterval( async () => {
      price = await fetch('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR')
      price = await price.json()
      movement = price.data.quotes["EUR"].percent_change_1h
      this.setState({movement})
      price = price.data.quotes["EUR"].price.toFixed(2)
      // if (movement > 0) {this.setState({arrow: ↑})}
      // if (movement < 0) {this.setState({arrow: ↓})}
      this.setState({rate: price})
    }, 1000)

  }

  render() {

    return (
      <p className="price"> ₿ = €{this.state.rate}</p>
    )
  }

}

export default BTCTicker
