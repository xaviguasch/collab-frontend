// Inspired by https://dribbble.com/shots/1821178-Sales-Report/
import React, { Component } from 'react';
import './graph.css'
import Chart from 'chart.js'

class Graph extends Component {


  showGraph = (balance) => {

    const calculateGraph = () => {
      let date = new Date;
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getYear();
      let arr = [];
      for (let i = 0; i < 4; i++) {
        if (day - 7 > 0) {
          day = day - 7;
          arr.push((day).toString() + '/' + month.toString());
        } else {
          if (month == 5 | 7 | 10 | 12 ) {
            day = day + 24;
            month = month - 1;
            arr.push(day.toString() + '/' + month.toString());
          } else if (month == 3) {
            if (year % 4 == 0) {
              day = day + 23;
              month = month - 1;
              arr.push(day.toString() + '/' + month.toString());
            } else {
              day = day + 22;
              month = month - 1;
              arr.push(day.toString() + '/' + month.toString());
            }
          } else {
            day = day + 25;
            month = month - 1;
            arr.push(day.toString() + '/' + month.toString());
          }
        }
      }
      return arr;
    }

    let months = calculateGraph()
    let currentBalance = balance
    console.log('CURRENT BALANCE:     ', currentBalance)
    currentBalance = currentBalance / 100000 // convert Satoshis to mBTC
    let data = {
      labels: [
        months[3],
        months[2],
        months[1],
        months[0]
      ],
      datasets: [
        {
          // label: `Balance in`, // +`${this.props.alias}`, // 1 mBTC ~ 0.15 $
          data: [
            20,
            17,
            22,
            currentBalance
            ],
          // xAxisID: 'mBTC',
          showLabel: false,
          backgroundColor: "rgba(255, 0, 178, 0.2)",
          borderColor: "rgb(255, 0, 178)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(255, 0, 178)",
          pointRadius: 3
        },
      ]
    }

    let ctx = document.getElementById("c1")
    let chart1 = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: true,
          text: `Balance`,
          fontStyle: 'lighter',
          fontSize: 30,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }],
        }
       }
    })
    return chart1
  }

  componentDidMount() {
    this.showGraph()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.showGraph(this.props.wallet.balance)
  }


  render() {
    return (
      <div className="chart">
        <canvas id="c1" width="900" height="300"></canvas>
      </div>
    );
  }
}

export default Graph
