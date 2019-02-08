import React from 'react';
import { Navbar } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel, faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './index.css';
import API from './utils';
import TopBar from './components/topBar/TopBar.js';
import HomePg from './containers/HomePg.js';
import Routes from './Routes';
import LoginForm from './containers/LoginForm.js';

library.add(faStroopwafel);
library.add(faTimes);
library.add(faCalendar);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: '',
      eMessage: '',
      newRsrve: false,
      currRsrve: false,
      closestIndividual: {},
      closestGroup: {},
      location: [0,0],
      showModal: false,
    };
  }

  setLoginState(name) {
    this.setState({
      loggedIn: true,
      currentUser: name,
      eMessage: '',
    });
  }

  render() {
    const currentRoute = window.location.pathname;


    const setNav = () => {
      if(currentRoute === '/currentReservation') {
        console.log(currentRoute);
        this.setState({
          currRsrve: true,
        });
      }
    }
    const getPosition = (position) => {
      // console.log("Latitude: " + position.coords.latitude +
      // "<br>Longitude: " + position.coords.longitude);
      this.setState({
        location: [position.coords.latitude, position.coords.longitude]
      });
      //console.log(this.state.location);
    }

    const loginFn = (userNm, passWd) => {
      // make login api req
      navigator.geolocation.getCurrentPosition(getPosition);

      // API.loginUser(userNm, passWd)
      //   .then((name) => {
      //     // set login state and set name
      //     this.setLoginState(name);
      //
      //     // redirect to hompage
      //   })
      //   .catch((error) => {
      //     // if failed display invalid login
      //     console.log(error);
      //     this.setState({
      //       eMessage: error
      //     });
      //   });
      this.setLoginState('sarah');
    };

    const homePg = () => (
      <HomePg
        loggedIn={this.state.loggedIn}
        uName={this.state.currentUser}
        login={loginFn}
        location={this.state.location}
        history={this.props.history}
      />
    );

    const logFrm = () => <LoginForm loginClicked={loginFn} />;

    return (

      <div className="everyContain">
          {(this.state.loggedIn) ? (
            <Navbar className="topBar">
              <div className="flexy">
                <TopBar
                  uName={this.state.currentUser}
                  loggedIn={this.state.loggedIn}
                  url={currentRoute}
                  curr={currentRoute === '/currentReservation'}
                  setNav={setNav}
                  newRs={currentRoute !== '/currentReservation'}
                />
              </div>
            </Navbar>
          ): (
            <div></div>
          )}


        <div className={this.state.loggedIn ? ("rts") : ('rtsLanding')}>
          {this.state.eMessage && (
            <div className="error">{this.state.eMessage}</div>
          )}
          <Routes
            loggedIn={this.state.loggedIn}
            homecmp={homePg}
            logcmp={logFrm}
          />
        </div>
      </div>
    );
  }
}

export default App;
