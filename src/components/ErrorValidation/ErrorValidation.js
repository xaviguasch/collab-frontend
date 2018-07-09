import React, { Component } from 'react';
import './ErrorValidation.css';
import correct from '../../assets/cancel-music.png';





//main screen, import component add title
class ErrorValidation extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="ev-page-container">

        <div className="ev-inner-page">
          <div className="ev-message-container">
            <div className="ev-second-mainscreen-component">
              <p className="ev-title-validation-component">AN ERROR OCCURRED DURING VALIDATION</p>
            </div>
          </div>

          <div className="ev-message-validation">
            <h1 className="ev-text-validation">Please try again</h1>
          </div>

          <div className="ev-icon-div">
            <div className="ev-icon-div-image">
              <img className='ev-icon-one' src={src} />
            </div>
          </div>
        </div>



      </div>





    );
  }
}

export default ErrorValidation;
