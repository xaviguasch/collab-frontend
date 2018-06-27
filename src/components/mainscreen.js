//imports
import React, { Component } from 'react';
import video from '../assets/main-page-video.mp4';

//main screen, import component add title
class MainScreen extends Component {
  render() {
    return (
      <div className="mainscreen-component">
        <div className="first-mainscreen-component">
          {/* <p id="title">mainscreen</p> */}
          {/* <LogInInputs user={{ ...this.props }} /> */}
          <video height="100%" width="100%" autoPlay loop>
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
