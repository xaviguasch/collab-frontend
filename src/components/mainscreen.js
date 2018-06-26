//imports
import React, { Component } from "react";
import { connect } from "react-redux";

//main screen, import component add title
class MainScreen extends Component {
  render() {
    return (
      <div className="mainscreen-component">
        <div className="first-mainscreen-component">
          {/* <p id="title">mainscreen</p> */}
          {/* <LogInInputs user={{ ...this.props }} /> */}
          {/* <iframe
            className="videoContainer__video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/fw3rAQeGFkI?showinfo=0&disablekb=1&wmode=opaque&autoplay=1&controls=0&loop=1&playlist=fw3rAQeGFkI"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          /> */}
          <iframe
            src="//gifs.com/embed/cny-companies-landing-page-video-7LmzJw"
            frameborder="0"
            scrolling="no"
            width="100%"
            height="100%"
            style="-webkit-backface-visibility: hidden;-webkit-transform: scale(1);"
          />
        </div>
        <div className="second-mainscreen-component" />
      </div>
    );
  }
}

//exports
export default MainScreen;
// fw3rAQeGFkI;
