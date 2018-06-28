//imports
import React, { Component } from 'react';
import video from '../../assets/main-page-video.mp4';
import './mainscreen.css';

//main screen, import component add title
class MainScreen extends Component {
  render() {
    return (
      <div className="mainscreen-component">
        <div className="first-mainscreen-component">
          <video width="100%" autoPlay loop className="videoContainer">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="second-mainscreen-component" />
      </div>
    );
  }
}

//exports
export default MainScreen;
// fw3rAQeGFkI;
