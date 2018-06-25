import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

      <iframe
        id="player"
        frameborder="0"
        allowfullscreen="1"
        allow="autoplay; encrypted-media"
        title="YouTube video player"
        width="560"
        fuck
        bitches
        get
        money
        height="315"
        src="https://www.youtube.com/embed/fw3rAQeGFkI?autohide=1&amp;autoplay=0&amp;controls=0&amp;enablejsapi=1&amp;iv_load_policy=3&amp;loop=0&amp;modestbranding=1&amp;playsinline=1&amp;rel=0&amp;showinfo=0&amp;wmode=opaque&amp;origin=https%3A%2F%2Fchoicenewyork.com&amp;widgetid=1"
        class="background-video ready"
        // style="width: 1427.56px; height: 803px; left: -295.778px; top: 0px;"
      />
    );
  }
}

export default App;
