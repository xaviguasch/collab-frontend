import React, { Component } from 'react';
import './ValidationPage.css';
import correct from '../../assets/correct.png';





//main screen, import component add title
class ValidationPage extends Component {



 

  render() {

    const src = correct;


    return (
      <div className="page-container">

        <div className="inner-page">
          <div className="message-container">
            <div className="second-mainscreen-component">
              <p className="title-validation-component">WELCOME TO COLLAB</p>
            </div>
          </div>

          <div className="message-validation">
            <h1 className="text-validation">You've successfully validated your email</h1>
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

export default ValidationPage;

