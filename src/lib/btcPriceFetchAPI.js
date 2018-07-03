const coinmarketAPI = 'https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR'



export const rateBTCtoEUR = () => {
  return fetch('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR')
  .then(res => res.json())
  .then(res => res = res.data.quotes["EUR"].price)
  // .then(res => res = Math.ceil(Math.pow(10, 8)/res, 1)) // return exchange rate in Satoshis
}
