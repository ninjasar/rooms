import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import './App.css';
import './index.css';
import API from './utils';
import AppName from './components/topBar/AppName.js';
import Btn from './containers/Btn.js';
import HomePg from './containers/HomePg.js';
import Routes from './Routes';
import LoginForm from './containers/LoginForm.js';

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
      if(currentRoute == '/currentReservation') {
        console.log(currentRoute);
        this.setState({
          currRsrve: true,
        });
      }
    }
    const showPosition = (position) => {
      // console.log("Latitude: " + position.coords.latitude +
      // "<br>Longitude: " + position.coords.longitude);
      this.setState({
        location: [position.coords.latitude, position.coords.longitude]
      });
      //console.log(this.state.location);
    }

    const loginFn = (userNm, passWd) => {
      // make login api req
      navigator.geolocation.getCurrentPosition(showPosition);

      API.loginUser(userNm, passWd)
        .then((name) => {
          // set login state and set name
          this.setLoginState(name);

          // redirect to hompage
        })
        .catch((error) => {
          // if failed display invalid login
          console.log(error);
          this.setState({
            eMessage: error
          });
        });
    };


    const btnCompnent = () => <Btn />;
    const homePg = () => (
      <HomePg
        loggedIn={this.state.loggedIn}
        uName={this.state.currentUser}
        login={loginFn}
        location={this.state.location}
      />
    );

    const logFrm = () => <LoginForm loginClicked={loginFn} />;
    // console.log(this.state.loggedIn);

    return (
      <div id="homeLayout">
        <Navbar className="topBar">
          <div className="flexy">

              <AppName
                uName={this.state.currentUser}
                loggedIn={this.state.loggedIn}
                url={currentRoute}
                curr={currentRoute === '/currentReservation'}
                setNav={setNav}
                newRs={currentRoute !== '/currentReservation'}
              />

          </div>
        </Navbar>
        <div className="rts">
          {this.state.eMessage && (
            <div className="error">{this.state.eMessage}</div>
          )}
          <Routes
            loggedIn={this.state.loggedIn}
            homecmp={homePg}
            btncmp={btnCompnent}
            logcmp={logFrm}
          />
        </div>
      </div>
    );
  }
}

export default App;
