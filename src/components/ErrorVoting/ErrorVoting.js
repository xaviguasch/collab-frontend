import React, { Component } from 'react';
import './ErrorVoting.css';
import correct from '../../assets/cancel-music.png';





//main screen, import component add title
class ErrorVoting extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="error-page-container">

        <div className="error-inner-page">
          <div className="error-message-container">
            <div className="error-second-mainscreen-component">
              <p className="error-title-validation-component">AN ERROR OCCURRED DURING THE VOTING PROCESS</p>
            </div>
          </div>

          <div className="error-message-validation">
            <h1 className="error-text-validation">Please try again</h1>
          </div>

          <div className="error-icon-div">
            <div className="error-icon-div-image">
              <img className="error-icon-one" src={src} />
            </div>
          </div>
        </div>



      </div>





    );
  }
}

export default ErrorVoting;