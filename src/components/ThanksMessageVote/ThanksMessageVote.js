import React, { Component } from 'react';
import './ThanksMessageVote.css';
import correct from '../../assets/correct.png';





//main screen, import component add title
class ThanksMessageVote extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="thanks-page-container">

        <div className="thanks-inner-page">
          <div className="thanks-message-container">
            <div className="thanks-second-mainscreen-component">
              <p className="thanks-title-validation-component">THANKS FOR VOTING</p>
            </div>
          </div>

          <div className="thanks-message-validation">
            <h1 className="thanks-text-validation">We got your vote</h1>
          </div>

          <div className="thanks-icon-div">
            <div className="thanks-icon-div-image">
              <img className="thanks-icon-one" src={src} />
            </div>
          </div>
        </div>



      </div>





    );
  }
}

export default ThanksMessageVote;
