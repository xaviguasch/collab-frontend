//imports
import React, { Component } from 'react';
import video from '../../assets/main-page-video.mp4';
import './mainscreen.css';
import scroll from '../../assets/scroll.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';




//main screen, import component add title
class MainScreen extends Component {


  scrollWscroll() {

    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  render() {
    if (this.props.userLogged.username) return <Redirect to='/user' />;
    return (
      <div className="ms-mainscreen-component">
        <div className="ms-first-mainscreen-component">
          <video width="100%" autoPlay loop className="ms-videoContainer">
            <source src={video} type="video/mp4" />
          </video>
          <div className="ms-second-mainscreen-component">
            <p className="ms-title-mainscreen">THE FIRST DEMOCRATIC BLOCKCHAIN SHARED WALLET APP</p>
            <p className="ms-title-mainscreen-text">A transparency based solution to group expenses</p>

            <img className='ms-scroll' src={scroll} onClick={() => this.scrollWscroll()}/>
          </div>
        </div>

        <div className="ms-header">
          <h1 className="ms-big-title">ABOUT COLLAB</h1>
        </div>
        <div className="ms-center-bit">
          <div className="ms-center-inner">
            <p className="ms-first-title">Rapidly agree and execute assembly-based expenses through unanimous voting</p>
            <div className="ms-inner-text">
              <p>Are you planning a faraway party for one of your office colleagues?</p>
              <p>Putting together your neighborhood BBQ?</p>
              <p>Organizing the next holiday trip with your friends?</p>
              <p>Collab gives you the ability to easily create and manage a shared account</p>
            </div>
            <div className="ms-padding-space"></div>
            <p className="ms-first-title">Who is it for?</p>
            <div className="ms-inner-text">
              <p>Roommates splitting rent, utilities and household supplies</p>
              <p>Partners pooling money together for a special event</p>
              <p>Small business co-ops</p>
              <p>Non-profit community organizations</p>
            </div>
            <div className="ms-padding-space"></div>
            <p className="ms-first-title">Participate in every decision</p>
            <div className="ms-inner-text">
              <p>Send notifications to your wallet partners with every new vote proposal</p>
              <p>Ability to veto, avoid getting blindsided if there's no consensus</p>
              <p>If the vote gets approved, the transaction will automatically get sent</p>
            </div>
            <div className="ms-padding-space"></div>
            <p className="ms-first-title">Track all the movements</p>
            <div className="ms-inner-text">
              <p>Consult every past operation</p>
              <p>Check the current balance and its evolution through time </p>
            </div>
          </div>
        </div>




      </div>

    );
  }
}

MainScreen.propTypes = {
  userLogged: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userLogged: state.userLogged
});

//exports
export default connect(mapStateToProps, null)(MainScreen);
// fw3rAQeGFkI;
