//imports
import React, { Component } from 'react';
import video from '../../assets/main-page-video.mp4';
import './mainscreen.css';
import scroll from '../../assets/scroll.png';




//main screen, import component add title
class MainScreen extends Component {

  scrollWscroll() {
    window.scroll({
      top: 1000,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="mainscreen-component">
        <div className="first-mainscreen-component">
          <video width="100%" autoPlay loop className="videoContainer">
            <source src={video} type="video/mp4" />
          </video>
          <div className="second-mainscreen-component">
            <p className="title-mainscreen">BITCOIN, BLOCKCHAIN, FUTURE OF FINANCE, DISRUPT, REVOLUTIONIZE, AUTOMATE, AI</p>
            <img className='scroll' src={scroll} onClick={() => this.scrollWscroll()}/>
          </div>
        </div>
        <div className="about">

        </div>
      </div>
    );
  }
}

//exports
export default MainScreen;
// fw3rAQeGFkI;
