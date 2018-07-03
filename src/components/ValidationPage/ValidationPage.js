import React, { Component } from 'react';
import './ValidationPage.css';
import correct from '../../assets/correct.png';





//main screen, import component add title
class ValidationPage extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="validation-page-container">

        <div className="validation-inner-page">
          <div className="validation-message-container">
            <div className="validation-second-mainscreen-component">
              <p className="validation-title-validation-component">WELCOME TO COLLAB</p>
            </div>
          </div>

          <div className="validation-message-validation">
            <h1 className="validation-text-validation">You've successfully validated your email</h1>
          </div>

          <div className="validation-icon-div">
            <div className="validation-icon-div-image">
              <img className='validation-icon-one' src={src} />
            </div>
          </div>
        </div>



      </div>





    );
  }
}

export default ValidationPage;

