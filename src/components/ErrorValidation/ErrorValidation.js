import React, { Component } from 'react';
import './ErrorValidation.css';
import correct from '../../assets/cancel-music.png';





//main screen, import component add title
class ErrorValidation extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="page-container">

        <div className="inner-page">
          <div className="message-container">
            <div className="second-mainscreen-component">
              <p className="title-validation-component">AN ERROR OCCURRED DURING VALIDATION</p>
            </div>
          </div>

          <div className="message-validation">
            <h1 className="text-validation">Please try again</h1>
          </div>

          <div className="icon-div">
            <div className="icon-div-image">
              <img className='icon-one' src={src} />
            </div>
          </div>
        </div>



      </div>





    );
  }
}

export default ErrorValidation;
